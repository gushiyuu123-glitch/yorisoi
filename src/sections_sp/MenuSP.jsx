// src/sections_sp/MenuSP.jsx
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

const MICROCMS_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const MICROCMS_MENU_API_ID =
  import.meta.env.VITE_MICROCMS_MENU_API_ID || "menu";

const RESERVE_URL =
  "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

const NAME_KEYS = ["title", "menuName", "name", "menu", "label", "メニュー名"];
const PRICE_KEYS = ["price", "fee", "amount", "価格"];
const NOTE_KEYS = ["note", "sub", "caption", "補足"];

const ARRAY_KEYS = {
  featured: [
    "featured",
    "popular",
    "pickup",
    "pickUp",
    "pickupMenu",
    "popularMenu",
    "popularMenus",
    "recommend",
    "recommended",
    "人気枠",
    "人気メニュー",
    "おすすめ",
  ],
  cut: ["cut", "cuts", "cutMenu", "cutMenus", "カット"],
  perm: ["perm", "perms", "permMenu", "permMenus", "パーマ"],
  color: ["color", "colors", "colorMenu", "colorMenus", "カラー"],
  spa: [
    "spa",
    "face",
    "spaFace",
    "spa_face",
    "spaMenu",
    "spaMenus",
    "スパ",
    "フェイス",
    "スパ・フェイス",
    "スパフェイス",
  ],
};

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

function pickArray(obj, keys) {
  if (!obj || typeof obj !== "object") return [];

  for (const key of keys) {
    const value = obj?.[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function unwrapMicroCmsPayload(raw) {
  if (!raw) return null;

  if (Array.isArray(raw)) {
    return raw[0] ?? null;
  }

  if (typeof raw !== "object") {
    return null;
  }

  if (Array.isArray(raw.contents)) {
    return raw.contents[0] ?? null;
  }

  if (raw.data && typeof raw.data === "object") {
    return unwrapMicroCmsPayload(raw.data);
  }

  return raw;
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];

  return rows
    .filter((row) => row && typeof row === "object")
    .map((row) => ({ ...row }));
}

function normalizeMenuPayload(raw) {
  const source = unwrapMicroCmsPayload(raw);

  if (!source || typeof source !== "object") {
    return null;
  }

  return {
    ...source,
    featured: normalizeRows(pickArray(source, ARRAY_KEYS.featured)),
    cut: normalizeRows(pickArray(source, ARRAY_KEYS.cut)),
    perm: normalizeRows(pickArray(source, ARRAY_KEYS.perm)),
    color: normalizeRows(pickArray(source, ARRAY_KEYS.color)),
    spa: normalizeRows(pickArray(source, ARRAY_KEYS.spa)),
  };
}

async function fetchMicroCmsByApiId(apiId, { signal } = {}) {
  const cleanApiId = String(apiId || "")
    .trim()
    .replace(/^\/+|\/+$/g, "");

  if (!cleanApiId) return null;

  const joiner = cleanApiId.includes("?") ? "&" : "?";
  const url = `https://${MICROCMS_DOMAIN}.microcms.io/api/v1/${cleanApiId}${joiner}limit=1`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-MICROCMS-API-KEY": MICROCMS_KEY,
    },
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    console.warn("MENU SP CMS fetch failed:", {
      apiId: cleanApiId,
      status: res.status,
    });
    return null;
  }

  const raw = await res.json();
  const normalized = normalizeMenuPayload(raw);

  console.log("MENU SP CMS DATA:", {
    apiId: cleanApiId,
    raw,
    normalized,
  });

  return normalized;
}

async function fetchMenuPatch({ signal } = {}) {
  if (!MICROCMS_DOMAIN || !MICROCMS_KEY) {
    console.warn("MENU SP CMS missing env:", {
      domain: MICROCMS_DOMAIN,
      hasKey: Boolean(MICROCMS_KEY),
      apiId: MICROCMS_MENU_API_ID,
    });
    return null;
  }

  const apiIds = uniq([MICROCMS_MENU_API_ID, "menu", "menuPatch"]);

  for (const apiId of apiIds) {
    try {
      const data = await fetchMicroCmsByApiId(apiId, { signal });

      if (data) {
        return data;
      }
    } catch (error) {
      if (error?.name === "AbortError") throw error;

      console.warn("MENU SP CMS fetch error:", {
        apiId,
        error,
      });
    }
  }

  return null;
}

const FEATURED = [
  {
    label: "POPULAR 01",
    title: "カット・シャンプー＋眉シェービング",
    price: "¥4,280",
    note: "迷ったらまずこれ",
  },
  {
    label: "POPULAR 02",
    title: "カット・シャンプー＋眉・顔全体シェービング",
    price: "¥4,800",
    note: "清潔感を整えたい方へ",
  },
  {
    label: "POPULAR 03",
    title: "極上ヘッドスパ＋カットシャンプー（60分）",
    price: "¥5,880",
    note: "頭まわりまですっきり",
  },
  {
    label: "POPULAR 04",
    title: "トップふんわり ボリュームUPパーマ",
    price: "¥9,980",
    note: "自然なボリューム感",
  },
];

const GROUPS = [
  {
    key: "cut",
    title: "カット",
    en: "CUT",
    items: [
      ["カット・シャンプー", "¥3,880"],
      ["カット・シャンプー＋眉シェービング", "¥4,280"],
      ["カット・シャンプー＋眉・うぶ毛中心シェーブ", "¥4,480"],
      ["カット・シャンプー＋眉・顔全体シェービング", "¥4,800"],
      ["平日朝7時限定｜カット・シャンプー＋眉剃り", "¥4,180"],
      ["学割（小〜大）｜カット・シャンプー", "¥3,780"],
    ],
  },
  {
    key: "perm",
    title: "パーマ",
    en: "PERM",
    items: [
      ["パーマ＋カット＋トリートメント", "¥9,980"],
      ["トップふんわり（ボリュームUP）", "¥9,980"],
      ["パーマ＋カット＋顔剃り＋トリートメント", "¥11,400"],
    ],
  },
  {
    key: "color",
    title: "カラー",
    en: "COLOR",
    items: [
      ["黒染め or 白髪ぼかし＋カット＋顔剃り", "¥7,880"],
      ["カラー＋カット＋トリートメント", "¥8,100"],
      ["カラー＋カット＋顔全体シェービング", "¥8,800"],
    ],
  },
  {
    key: "spa",
    title: "スパ・フェイス",
    en: "SPA / FACE",
    items: [
      ["極上ヘッドスパ＋カットシャンプー（60分）", "¥5,880"],
      ["極上ヘッドスパ＋カット＋眉＋顔全体シェービング", "¥6,980"],
      ["フェイスマッサージ＋カット＋顔全体シェービング", "¥6,980"],
    ],
  },
];

function groupSummary(group) {
  const first = group?.items?.[0];
  if (!first) return "";

  const [name, price] = first;
  if (!name || !price) return "";

  return `${name} ${price}〜`;
}

function PlusIcon({ open }) {
  return (
    <span
      className={`
        relative block h-[18px] w-[18px] shrink-0
        after:absolute after:left-1/2 after:top-1/2 after:h-px after:w-[14px]
        after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink/70
        before:absolute before:left-1/2 before:top-1/2 before:h-[14px] before:w-px
        before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink/70
        before:transition-transform before:duration-300
        ${open ? "before:scale-y-0" : ""}
      `}
      aria-hidden="true"
    />
  );
}

function FeaturedRowSP({ item, index }) {
  const no = String(index + 1).padStart(2, "0");

  return (
    <article
      className="
        relative
        py-5 pl-5 pr-1
        border-t border-ink/10
        bg-[linear-gradient(90deg,rgba(255,255,255,0.34),rgba(255,255,255,0.12),rgba(255,255,255,0))]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute left-0 top-5
          h-[calc(100%-40px)] w-px
          bg-[linear-gradient(to_bottom,rgba(124,78,91,0.44),rgba(124,78,91,0.08))]
        "
      />

      <div className="mb-2 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p
            data-kicker
            className="
              mb-1.5
              text-[11px]
              tracking-[0.20em]
              text-ink/44
            "
          >
            POPULAR {no}
          </p>

          <h3
            className="
              text-[16.5px]
              leading-[1.62]
              font-medium
              text-ink/90
            "
          >
            {item.title}
          </h3>
        </div>

        <p
          data-no-scale
          className="
            shrink-0
            pt-[21px]
            text-[18px]
            font-semibold
            tracking-[0.01em]
            text-[#6f4853]
          "
        >
          {item.price}
        </p>
      </div>

      {!!item.note && (
        <p className="text-[14px] leading-[1.75] text-ink/62">{item.note}</p>
      )}
    </article>
  );
}

function AccordionSP({ group, openKey, setOpenKey }) {
  const isOpen = openKey === group.key;
  const summary = groupSummary(group);

  return (
    <div className="border-t border-ink/10">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : group.key)}
        className="
          w-full
          py-5
          text-left
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ink/15
          focus-visible:ring-offset-4
          focus-visible:ring-offset-base
        "
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p data-kicker className="mb-1 text-[11px] tracking-[0.18em] text-ink/45">
              {group.en}
            </p>

            <h3 className="text-[18px] font-medium text-ink/90">{group.title}</h3>

            {!!summary && (
              <p className="mt-2 text-[14px] leading-[1.75] text-ink/60">
                目安：{summary}
              </p>
            )}
          </div>

          <div className="mt-[4px] flex shrink-0 items-center gap-3">
            <span className="text-[13px] text-ink/50">
              {isOpen ? "閉じる" : "見る"}
            </span>
            <PlusIcon open={isOpen} />
          </div>
        </div>
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80"}
        `}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            {group.items.map(([name, price], index) => (
              <div
                key={`${group.key}-${index}-${name}`}
                className="
                  grid grid-cols-[1fr_auto]
                  gap-5
                  border-b border-ink/10
                  py-3
                "
              >
                <span className="text-[15px] leading-[1.75] text-ink/82">
                  {name}
                </span>

                <span data-no-scale className="shrink-0 text-[15px] font-semibold text-ink/88">
                  {price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuSP() {
  const [openKey, setOpenKey] = useState(null);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    fetchMenuPatch({ signal: ac.signal })
      .then((data) => {
        if (!ac.signal.aborted) {
          setCms(data);
        }
      })
      .catch((error) => {
        if (error?.name !== "AbortError") {
          console.warn("MENU SP CMS set error:", error);
        }
      });

    return () => ac.abort();
  }, []);

  const featuredUI = useMemo(() => {
    return FEATURED.map((item, index) => {
      const patch = cms?.featured?.[index];

      if (!patch) return item;

      const title = pickStr(patch, NAME_KEYS) ?? item.title;
      const price = pickStr(patch, PRICE_KEYS) ?? item.price;
      const note = pickStr(patch, NOTE_KEYS) ?? item.note;

      return { ...item, title, price, note };
    });
  }, [cms]);

  const groupsUI = useMemo(() => {
    return GROUPS.map((group) => {
      const rows = cms?.[group.key];

      if (!Array.isArray(rows) || rows.length === 0) return group;

      const patched = group.items.map(([name, price], index) => {
        const row = rows[index];

        if (!row) return [name, price];

        const nextName = pickStr(row, NAME_KEYS) ?? name;
        const nextPrice = pickStr(row, PRICE_KEYS) ?? price;

        return [nextName, nextPrice];
      });

      for (let i = group.items.length; i < rows.length; i += 1) {
        const row = rows[i];

        const nextName = pickStr(row, NAME_KEYS);
        const nextPrice = pickStr(row, PRICE_KEYS);

        if (nextName && nextPrice) {
          patched.push([nextName, nextPrice]);
        }
      }

      return { ...group, items: patched };
    });
  }, [cms]);

  return (
    <section
      id="menu-sp"
      className="
        w-full bg-base
        pt-[18vh]
        px-[6vw]
        pb-[16vh]
      "
      aria-label="メニュー"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaのメニュー料金です。メンズカット、眉シェービング、
        顔全体シェービング、メンズパーマ、白髪ぼかし、ヘッドスパなどの料金を掲載しています。
      </p>

      <div className="mx-auto max-w-[560px]">
        <Reveal y={12} blur={0.1} duration={0.62}>
          <header className="mb-11">
            <div className="mb-5 overflow-hidden">
              <div
                style={{
                  width: "min(66vw, 280px)",
                  minWidth: 180,
                  opacity: 0.9,
                  filter: "contrast(0.92) saturate(0.92)",
                }}
              >
                <HandwrittenSvgTitle
                  src="/yorisoi/menu1.svg"
                  label="MENU"
                  className="block w-full"
                  mode="preserve"
                  start="top 90%"
                  once={true}
                  revealY={6}
                  revealBlur={0.08}
                  revealDuration={0.6}
                />
              </div>
            </div>

            <p data-kicker className="mb-4 text-[12px] tracking-[0.30em] text-ink/55">
              料金
            </p>

            <h2 className="text-[clamp(24px,6.4vw,28px)] leading-[1.55] font-medium text-ink/90">
              迷ったら、
              <br />
              まず人気メニューから。
            </h2>

            <p className="mt-5 text-[16px] leading-[1.9] text-ink/72">
              よく選ばれるメニューを先にまとめています。
              その他の料金は、下のカテゴリから確認できます。
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.06} y={12} blur={0.1} duration={0.62}>
          <section className="mb-[9vh]" aria-labelledby="menu-sp-pickup">
            <div className="mb-4">
              <p data-kicker className="mb-1.5 text-[11px] tracking-[0.24em] text-ink/46">
                PICK UP
              </p>

              <h3 id="menu-sp-pickup" className="text-[20px] font-medium text-ink/90">
                人気メニュー
              </h3>
            </div>

            <div
              className="
                relative
                border-b border-ink/10
                bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.44),rgba(255,255,255,0)_58%)]
              "
            >
              {featuredUI.map((item, index) => (
                <FeaturedRowSP key={item.label ?? index} item={item} index={index} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08} y={12} blur={0.1} duration={0.62}>
          <section className="mb-[9vh]" aria-labelledby="menu-sp-all">
            <div className="mb-4">
              <p data-kicker className="mb-1.5 text-[11px] tracking-[0.22em] text-ink/46">
                ALL MENU
              </p>

              <h3 id="menu-sp-all" className="text-[20px] font-medium text-ink/90">
                その他のメニュー
              </h3>
            </div>

            <div className="border-b border-ink/10">
              {groupsUI.map((group) => (
                <AccordionSP
                  key={group.key}
                  group={group}
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1} y={12} blur={0.08} duration={0.62}>
          <div className="text-center">
            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex w-full max-w-[360px]
                items-center justify-center
                px-7 py-4
                bg-[rgba(124,78,91,0.74)]
                text-white
                text-[15px]
                font-medium
                tracking-[0.08em]
                shadow-[0_8px_22px_rgba(72,55,40,0.10)]
                active:scale-[0.99]
                transition
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgba(124,78,91,0.24)]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-base
              "
              aria-label="HotPepperで空席を確認して予約する"
            >
              空席を確認して予約する
            </a>

            <p data-kicker className="mt-5 text-[12px] leading-[1.8] text-ink/46">
              ※ 表示価格は税込です。
              <br />
              メニュー・価格は変更になる場合があります。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}