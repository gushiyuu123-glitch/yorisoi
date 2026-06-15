// src/lib/hairstylesClient.js

export const FALLBACK_HAIRSTYLES = [
  { name: "スペインカール", img: "/yorisoi/style/spanish.png", tag: "PERM" },
  { name: "ツイスト＆ニュアンス", img: "/yorisoi/style/twist-nuance.png", tag: "PERM" },
  { name: "ニュアンスパーマ", img: "/yorisoi/style/nuance.png", tag: "PERM" },
  { name: "スパイラルパーマ", img: "/yorisoi/style/spiral.png", tag: "PERM" },
  { name: "波巻きパーマ", img: "/yorisoi/style/karma.png", tag: "PERM" },
  { name: "ローフェード", img: "/yorisoi/style/lowfade.png", tag: "CUT" },
  { name: "2ブロフェードスタイル", img: "/yorisoi/style/2bro.png", tag: "CUT" },
  { name: "プードルパーマ", img: "/yorisoi/style/poodle.png", tag: "PERM" },
];

const MICROCMS_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const MICROCMS_HAIRSTYLES_API_ID =
  import.meta.env.VITE_MICROCMS_HAIRSTYLES_API_ID || "hairstyles";

/**
 * microCMS側のフィールドID揺れを軽く吸収。
 * 基本は title / image / tag / order / isVisible で作ればOK。
 */
const TITLE_KEYS = ["title", "name", "styleName", "スタイル名"];
const TAG_KEYS = ["tag", "category", "type", "カテゴリ", "タグ"];
const IMAGE_KEYS = ["image", "img", "photo", "styleImage", "写真", "画像"];

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function pickStr(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;

  for (const key of keys) {
    const value = obj?.[key];

    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return undefined;
}

function pickImage(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;

  for (const key of keys) {
    const value = obj?.[key];

    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }

    if (value && typeof value === "object" && typeof value.url === "string") {
      return value.url;
    }
  }

  return undefined;
}

function normalizeRows(raw) {
  if (!raw) return [];

  if (Array.isArray(raw)) return raw;

  if (Array.isArray(raw.contents)) return raw.contents;

  if (raw.data && Array.isArray(raw.data.contents)) {
    return raw.data.contents;
  }

  if (Array.isArray(raw.styles)) return raw.styles;

  if (Array.isArray(raw.hairstyles)) return raw.hairstyles;

  return [];
}

function normalizeHairstyle(row, index) {
  if (!row || typeof row !== "object") return null;

  // microCMS側で非表示にできる保険
  if (row.isVisible === false) return null;
  if (row.visible === false) return null;
  if (row.published === false) return null;

  const fallback = FALLBACK_HAIRSTYLES[index % FALLBACK_HAIRSTYLES.length];

  const name = pickStr(row, TITLE_KEYS) || fallback?.name || "ヘアスタイル";
  const img = pickImage(row, IMAGE_KEYS) || fallback?.img;
  const tag = pickStr(row, TAG_KEYS) || fallback?.tag || "STYLE";

  if (!img) return null;

  return {
    id: row.id || row._id || `${name}-${index}`,
    name,
    img,
    tag,
    order:
      typeof row.order === "number" && Number.isFinite(row.order)
        ? row.order
        : index + 1,
  };
}

async function fetchByApiId(apiId, { signal, limit = 24, withOrder = true } = {}) {
  const cleanApiId = String(apiId || "")
    .trim()
    .replace(/^\/+|\/+$/g, "");

  if (!cleanApiId) return [];

  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (withOrder) {
    params.set("orders", "order,-publishedAt");
  }

  const url = `https://${MICROCMS_DOMAIN}.microcms.io/api/v1/${cleanApiId}?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-MICROCMS-API-KEY": MICROCMS_KEY,
    },
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    console.warn("HAIR STYLE CMS fetch failed:", {
      apiId: cleanApiId,
      status: res.status,
      withOrder,
    });

    return [];
  }

  const raw = await res.json();
  const rows = normalizeRows(raw);

  return rows
    .map((row, index) => normalizeHairstyle(row, index))
    .filter(Boolean)
    .sort((a, b) => {
      const ao = typeof a.order === "number" ? a.order : 9999;
      const bo = typeof b.order === "number" ? b.order : 9999;
      return ao - bo;
    });
}

export async function fetchHairstyles({ signal, limit = 24 } = {}) {
  if (!MICROCMS_DOMAIN || !MICROCMS_KEY) {
    console.warn("HAIR STYLE CMS missing env:", {
      domain: MICROCMS_DOMAIN,
      hasKey: Boolean(MICROCMS_KEY),
      apiId: MICROCMS_HAIRSTYLES_API_ID,
    });

    return [];
  }

  const apiIds = uniq([MICROCMS_HAIRSTYLES_API_ID, "hairstyles", "hairStyle"]);

  for (const apiId of apiIds) {
    try {
      // orderフィールドあり前提
      const ordered = await fetchByApiId(apiId, {
        signal,
        limit,
        withOrder: true,
      });

      if (ordered.length > 0) return ordered;

      // orderフィールド未作成でも落ちない保険
      const plain = await fetchByApiId(apiId, {
        signal,
        limit,
        withOrder: false,
      });

      if (plain.length > 0) return plain;
    } catch (error) {
      if (error?.name === "AbortError") throw error;

      console.warn("HAIR STYLE CMS fetch error:", {
        apiId,
        error,
      });
    }
  }

  return [];
}