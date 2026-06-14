// src/sections/Menu.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

gsap.registerPlugin(ScrollTrigger);

const PAPER = "/yorisoi/menu-paper2.png";
const RESERVE_URL =
  "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

const MICROCMS_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const MICROCMS_MENU_API_ID =
  import.meta.env.VITE_MICROCMS_MENU_API_ID || "menu";

/**
 * microCMS側のフィールドID揺れを吸収
 * スクショ上の表示名が日本語でも、実際のfieldIdが menuName / price / note などの場合があるため広めに拾う。
 */
const NAME_KEYS = ["title", "menuName", "name", "menu", "label", "メニュー名"];
const PRICE_KEYS = ["price", "fee", "amount", "価格"];
const NOTE_KEYS = ["note", "sub", "caption", "補足"];
const DESC_KEYS = ["desc", "description", "body", "text", "説明"];

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

/**
 * microCMSが
 * - オブジェクトAPI: { featured: [...] }
 * - リストAPI: { contents: [{ featured: [...] }] }
 * のどちらでも動くようにする。
 */
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
    console.warn("MENU CMS fetch failed:", {
      apiId: cleanApiId,
      status: res.status,
    });
    return null;
  }

  const raw = await res.json();
  const normalized = normalizeMenuPayload(raw);

  console.log("MENU CMS DATA:", {
    apiId: cleanApiId,
    raw,
    normalized,
  });

  return normalized;
}

async function fetchMenuPatch({ signal } = {}) {
  if (!MICROCMS_DOMAIN || !MICROCMS_KEY) {
    console.warn("MENU CMS missing env:", {
      domain: MICROCMS_DOMAIN,
      hasKey: Boolean(MICROCMS_KEY),
      apiId: MICROCMS_MENU_API_ID,
    });
    return null;
  }

  /**
   * スクショ的にエンドポイントは /apis/menu/... に見える。
   * ただし環境変数に menuPatch を入れていた場合も救うため fallback を持たせる。
   */
  const apiIds = uniq([MICROCMS_MENU_API_ID, "menu", "menuPatch"]);

  for (const apiId of apiIds) {
    try {
      const data = await fetchMicroCmsByApiId(apiId, { signal });

      if (data) {
        return data;
      }
    } catch (error) {
      if (error?.name === "AbortError") throw error;

      console.warn("MENU CMS fetch error:", {
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
    desc: "迷ったらまずこれ。顔まわりの印象をまとめやすい人気メニューです。",
    note: "人気No.1",
  },
  {
    label: "POPULAR 02",
    title: "カット・シャンプー＋眉・顔全体シェービング",
    price: "¥4,800",
    desc: "顔まわりまでしっかり仕上げて、印象を引き締めたい方へ。",
    note: "極上清潔感",
  },
  {
    label: "POPULAR 03",
    title: "極上ヘッドスパ＋カットシャンプー（60分）",
    price: "¥5,880",
    desc: "疲れをほぐしながら、髪も頭もすっきりさせたい日に。",
    note: "癒し時間",
  },
  {
    label: "POPULAR 04",
    title: "トップふんわり ボリュームUPパーマ",
    price: "¥9,980",
    desc: "トップの立ち上がりが気になる方へ。大人向けの自然なパーマ。",
    note: "40代以降にも人気",
  },
];

const GROUPS = [
  {
    key: "cut",
    title: "Cut",
    jp: "カット",
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
    title: "Perm",
    jp: "パーマ",
    items: [
      ["パーマ＋カット＋トリートメント", "¥9,980"],
      ["トップふんわり（ボリュームUP）", "¥9,980"],
      ["パーマ＋カット＋顔剃り＋トリートメント", "¥11,400"],
    ],
  },
  {
    key: "color",
    title: "Color",
    jp: "カラー",
    items: [
      ["黒染め or 白髪ぼかし＋カット＋顔剃り", "¥7,880"],
      ["カラー＋カット＋トリートメント", "¥8,100"],
      ["カラー＋カット＋顔全体シェービング", "¥8,800"],
    ],
  },
  {
    key: "spa",
    title: "Spa / Face",
    jp: "スパ・フェイス",
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
        relative block h-[17px] w-[17px] shrink-0
        after:absolute after:left-1/2 after:top-1/2 after:h-px after:w-[13px]
        after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink/70
        before:absolute before:left-1/2 before:top-1/2 before:h-[13px] before:w-px
        before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink/70
        before:transition-transform before:duration-300
        ${open ? "before:scale-y-0" : ""}
      `}
      aria-hidden="true"
    />
  );
}

function FeaturedRow({ item, index }) {
  const no = String(index + 1).padStart(2, "0");

  return (
    <article
      className="
        group relative
        grid grid-cols-[68px_1fr_auto]
        gap-6
        items-start
        border-t border-ink/10
        py-[clamp(18px,1.85vw,24px)]
      "
    >
      <div>
        <p data-kicker className="text-[10px] tracking-[0.22em] text-ink/38">
          {no}
        </p>

        <div
          aria-hidden="true"
          className="
            mt-4 h-[44px] w-px
            bg-[linear-gradient(to_bottom,rgba(124,78,91,0.34),rgba(124,78,91,0.04))]
          "
        />
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-3">
          <p data-kicker className="text-[10px] tracking-[0.22em] text-ink/42">
            {item.label}
          </p>

          {!!item.note && (
            <span
              className="
                inline-flex items-center
                border border-[rgba(124,78,91,0.16)]
                bg-[rgba(124,78,91,0.045)]
                px-2.5 py-[3px]
                text-[10px]
                tracking-[0.10em]
                text-[#7c4e5b]/78
              "
            >
              {item.note}
            </span>
          )}
        </div>

        <h4
          className="
            text-[clamp(18px,1.55vw,21px)]
            leading-[1.5]
            font-medium
            tracking-[-0.018em]
            text-ink/90
          "
        >
          {item.title}
        </h4>

        {!!item.desc && (
          <p className="mt-2.5 max-w-[560px] text-[13.5px] leading-[1.85] text-ink/62">
            {item.desc}
          </p>
        )}
      </div>

      <p
        data-no-scale
        className="
          shrink-0
          pt-[27px]
          text-[clamp(23px,2.1vw,29px)]
          leading-none
          font-semibold
          tracking-[-0.04em]
          text-[#6f4853]
        "
      >
        {item.price}
      </p>
    </article>
  );
}

function AccordionItem({ group, openKey, setOpenKey }) {
  const isOpen = openKey === group.key;
  const summary = groupSummary(group);

  return (
    <div className="border-t border-ink/10">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : group.key)}
        className="
          w-full py-4 text-left
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ink/15
          focus-visible:ring-offset-4
          focus-visible:ring-offset-base
        "
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <p
              data-kicker
              className="mb-1.5 text-[11px] tracking-[0.20em] text-ink/44"
            >
              {group.title.toUpperCase()}
            </p>

            <h3 className="text-[18px] font-medium text-ink/90">{group.jp}</h3>

            {!!summary && (
              <p className="mt-2 text-[13px] leading-[1.75] text-ink/58">
                目安：{summary}
              </p>
            )}
          </div>

          <div className="mt-[4px] flex shrink-0 items-center gap-3">
            <span className="text-[12.5px] tracking-[0.08em] text-ink/50">
              {isOpen ? "閉じる" : "見る"}
            </span>
            <PlusIcon open={isOpen} />
          </div>
        </div>
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-78"}
        `}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            {group.items.map(([name, price], index) => (
              <div
                key={`${group.key}-${index}-${name}`}
                className="
                  grid grid-cols-[1fr_auto]
                  gap-8
                  border-b border-ink/10
                  py-3
                  text-[14.5px]
                  leading-[1.8]
                "
              >
                <span className="text-ink/82">{name}</span>
                <span data-no-scale className="shrink-0 font-semibold text-ink/88">
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

export default function Menu() {
  const sectionRef = useRef(null);

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
          console.warn("MENU CMS set error:", error);
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
      const desc = pickStr(patch, DESC_KEYS) ?? item.desc;

      return { ...item, title, price, note, desc };
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".mn"),
        { opacity: 0, y: 16, filter: "blur(0.12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.68,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="
        relative isolate w-full overflow-hidden
        bg-base
        pt-[13vh] pb-[14vh] px-[6vw]
      "
      aria-labelledby="menu-title"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaのメニュー料金です。メンズカット、眉シェービング、
        顔全体シェービング、メンズパーマ、白髪ぼかし、ヘッドスパなどの料金を掲載しています。
      </p>

      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_22%_8%,rgba(255,253,249,0.66),rgba(255,253,249,0.09)_48%,rgba(247,244,239,0.98)_100%)]
          "
        />

        <div
          className="
            absolute left-[7vw] top-[8vh]
            h-[62vh] w-px
            bg-[linear-gradient(to_bottom,rgba(96,78,62,0),rgba(96,78,62,0.10),rgba(96,78,62,0))]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1080px]">
        <header className="mn mb-[6.5vh] text-center">
          <div className="mb-5 flex justify-center overflow-hidden">
            <div
              style={{
                width: "min(21vw, 300px)",
                minWidth: 190,
                opacity: 0.9,
                filter: "contrast(0.92) saturate(0.92)",
              }}
            >
              <HandwrittenSvgTitle
                src="/yorisoi/menu1.svg"
                label="MENU"
                className="block w-full"
                mode="preserve"
                start="top 84%"
                once={true}
                revealY={8}
                revealBlur={0.1}
                revealDuration={0.62}
              />
            </div>
          </div>

          <p data-kicker className="mb-3 text-[11px] tracking-[0.30em] text-ink/52">
            料金 / PRICE
          </p>

          <h2
            id="menu-title"
            className="
              mx-auto
              max-w-[660px]
              text-[clamp(26px,2.45vw,34px)]
              leading-[1.44]
              tracking-[-0.03em]
              font-medium
              text-ink/90
            "
          >
            迷いやすい方のために、
            <br />
            よく選ばれる順に。
          </h2>
        </header>

        <section className="mn mb-[9vh]" aria-labelledby="menu-pickup-title">
          <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-end gap-5">
            <div>
              <p data-kicker className="mb-2 text-[11px] tracking-[0.23em] text-ink/44">
                PICK UP
              </p>

              <h3 id="menu-pickup-title" className="text-[20px] font-medium text-ink/90">
                人気メニュー
              </h3>
            </div>

            <div
              aria-hidden="true"
              className="mb-[9px] h-px bg-[linear-gradient(to_right,rgba(96,78,62,0.14),rgba(96,78,62,0.03))]"
            />

            <p className="mb-[4px] whitespace-nowrap text-[12px] tracking-[0.04em] text-ink/46">
              価格と内容を一目で
            </p>
          </div>

          <div
            className="
              relative overflow-hidden
              border border-ink/12
              bg-[rgba(255,255,255,0.46)]
              px-[clamp(24px,2.6vw,38px)]
              py-[clamp(16px,2vw,26px)]
              shadow-[0_10px_28px_rgba(72,55,40,0.055)]
            "
          >
            <img
              src={PAPER}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0 h-full w-full object-cover
                opacity-[0.32]
                scale-[1.04]
                [filter:brightness(1.03)_contrast(0.94)_saturate(0.94)]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_18%_10%,rgba(255,253,249,0.64),rgba(255,253,249,0.30)_54%,rgba(255,253,249,0.50)_100%)]
              "
            />

            <div className="relative">
              {featuredUI.map((item, index) => (
                <FeaturedRow key={item.label ?? index} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="mn mb-[8vh]" aria-labelledby="menu-all-title">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-end gap-5">
              <div>
                <p data-kicker className="mb-2 text-[11px] tracking-[0.23em] text-ink/44">
                  ALL MENU
                </p>

                <h3 id="menu-all-title" className="text-[20px] font-medium text-ink/90">
                  その他のメニュー
                </h3>
              </div>

              <div
                aria-hidden="true"
                className="mb-[9px] h-px bg-[linear-gradient(to_right,rgba(96,78,62,0.14),rgba(96,78,62,0.03))]"
              />

              <p className="mb-[4px] whitespace-nowrap text-[12px] tracking-[0.04em] text-ink/46">
                必要な項目だけ開いて確認
              </p>
            </div>

            <div className="border-b border-ink/10">
              {groupsUI.map((group) => (
                <AccordionItem
                  key={group.key}
                  group={group}
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mn mx-auto max-w-[680px] text-center">
          <p className="mb-5 text-[14px] leading-[1.9] text-ink/64">
            空席確認・予約はHotPepperから進められます。
            メニュー内容は予約画面でも確認できます。
          </p>

          <a
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-3.5
              px-9 py-3.5
              bg-[rgba(124,78,91,0.76)]
              text-white
              text-[13.5px]
              tracking-[0.09em]
              shadow-[0_10px_24px_rgba(72,55,40,0.13)]
              hover:bg-[rgba(124,78,91,0.86)]
              active:scale-[0.99]
              transition-all
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(124,78,91,0.24)]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-base
            "
            aria-label="HotPepperで空席を確認して予約する"
          >
            <span className="text-[11px] tracking-[0.20em] text-white/70">
              HOTPEPPER
            </span>
            <span className="font-semibold">空席を確認して予約する</span>
          </a>

          <p data-kicker className="mt-5 text-[11.5px] leading-[1.8] text-ink/44">
            ※ 表示価格は税込です。内容は変更になる場合があります。
            <br />
            予約内容はHotPepper側で確定します。
          </p>
        </div>
      </div>
    </section>
  );
}