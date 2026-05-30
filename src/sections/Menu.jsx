// src/sections/Menu.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

gsap.registerPlugin(ScrollTrigger);

const PAPER = "/yorisoi/menu-paper2.png"; // 透過PNG推奨（2016x1300目安）
const RESERVE_URL = "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

const MICROCMS_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const MICROCMS_MENU_API_ID = import.meta.env.VITE_MICROCMS_MENU_API_ID ?? "menu";

async function fetchMenuPatch({ signal } = {}) {
  if (!MICROCMS_DOMAIN || !MICROCMS_KEY) return null;

  const url = `https://${MICROCMS_DOMAIN}.microcms.io/api/v1/${MICROCMS_MENU_API_ID}`;
  const r = await fetch(url, {
    method: "GET",
    headers: { "X-MICROCMS-API-KEY": MICROCMS_KEY },
    signal,
  });

  if (!r.ok) return null;
  return r.json();
}

function pickStr(obj, keys) {
  if (!obj) return undefined;
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  return undefined;
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
  if (typeof group?.summary === "string" && group.summary.trim())
    return group.summary.trim();
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
        relative block w-[18px] h-[18px]
        after:absolute after:left-1/2 after:top-1/2 after:w-[14px] after:h-[1px]
        after:bg-ink/70 after:-translate-x-1/2 after:-translate-y-1/2
        before:absolute before:left-1/2 before:top-1/2 before:w-[1px] before:h-[14px]
        before:bg-ink/70 before:-translate-x-1/2 before:-translate-y-1/2
        transition-transform duration-300
        ${open ? "before:scale-y-0" : ""}
      `}
      aria-hidden="true"
    />
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
        className="w-full flex items-start justify-between gap-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <p className="text-[12px] tracking-[0.18em] text-ink/46 mb-1">
            {group.title.toUpperCase()}
          </p>
          <h3 className="text-[18px] text-ink/90 font-medium">{group.jp}</h3>

          {!!summary && (
            <p className="mt-2 text-[13px] leading-[1.75] text-ink/60">
              <span className="mr-2 text-ink/35" aria-hidden>
                └
              </span>
              {summary}
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-4 pt-[2px]">
          <span className="text-[13px] text-ink/52">{isOpen ? "閉じる" : "開く"}</span>
          <PlusIcon open={isOpen} />
        </div>
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"}
        `}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            {group.items.map(([name, price], i) => (
              <div
                key={`${group.key}-${i}`}
                className="
                  flex justify-between gap-6
                  py-3
                  border-b border-ink/10
                  text-[15px] leading-[1.9]
                "
              >
                <span className="pr-6 text-ink/84">{name}</span>
                <span className="shrink-0 font-semibold text-ink/88">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCell({ item, dense = false }) {
  return (
    <article
      className={`
        bg-[rgba(255,255,255,0.14)]
        ${dense ? "px-[16px] py-[14px]" : "px-[clamp(14px,1.25vw,18px)] py-[clamp(12px,1.1vw,15px)]"}
      `}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="min-w-0">
          <p className="text-[9px] tracking-[0.18em] text-ink/48 mb-1.5">{item.label}</p>
          <h4 className="text-[14px] leading-[1.55] text-ink/88 font-semibold">
            {item.title}
          </h4>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] text-ink/52 mb-0.5">{item.note}</p>
          <p className="text-[17px] tracking-[0.01em] text-ink/88 font-bold">{item.price}</p>
        </div>
      </div>

      <p className="text-[12.8px] leading-[1.78] text-ink/78">{item.desc}</p>

      <div className="mt-3">
        <span
          className="
            inline-flex items-center
            text-[9px]
            tracking-[0.22em]
            text-ink/56
            border border-ink/14
            bg-[rgba(255,255,255,0.18)]
            px-2.5 py-[3px]
          "
        >
          RECOMMENDED
        </span>
      </div>
    </article>
  );
}

export default function Menu() {
  const sectionRef = useRef(null);

  const [openKey, setOpenKey] = useState(null);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    fetchMenuPatch({ signal: ac.signal })
      .then((data) => setCms(data))
      .catch(() => {});
    return () => ac.abort();
  }, []);

  const featuredUI = FEATURED.map((it, i) => {
    const p = cms?.featured?.[i];
    if (!p) return it;

    const title = pickStr(p, ["title", "menuName", "name"]) ?? it.title;
    const price = pickStr(p, ["price"]) ?? it.price;
    const note = pickStr(p, ["note", "sub", "caption"]) ?? it.note;

    return { ...it, title, price, note };
  });

  const groupsUI = GROUPS.map((g) => {
    const rows = cms?.[g.key];
    if (!Array.isArray(rows) || rows.length === 0) return g;

    const patched = g.items.map(([name, price], i) => {
      const r = rows[i];
      if (!r) return [name, price];
      const n = pickStr(r, ["name", "menuName", "title"]) ?? name;
      const p = pickStr(r, ["price"]) ?? price;
      return [n, p];
    });

    for (let i = g.items.length; i < rows.length; i++) {
      const r = rows[i];
      const n = pickStr(r, ["name", "menuName", "title"]);
      const p = pickStr(r, ["price"]);
      if (n && p) patched.push([n, p]);
    }

    return { ...g, items: patched };
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".mn"),
        { opacity: 0, y: 18, filter: "blur(0.16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="w-full bg-base pt-[18vh] pb-[16vh] px-[6vw]"
      aria-label="メニュー"
    >
      <div className="mn mx-auto max-w-[980px] mb-12">
        <div className="mb-6 overflow-hidden">
          <div
            style={{
              width: "min(32vw, 440px)",
              minWidth: 240,
              opacity: 0.92,
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

        <p className="text-[12px] tracking-[0.32em] text-ink/55 mb-1">料金</p>
        <p className="text-[10px] tracking-[0.34em] text-ink/35 mb-5">PRICE</p>

        <h2 className="text-[clamp(28px,2.8vw,38px)] leading-[1.5] text-ink/90 font-medium max-w-[860px]">
          迷いやすい方のために、よく選ばれるメニューを先にまとめました。
        </h2>

        <p className="mt-4 text-[14.5px] leading-[1.92] text-ink/72 max-w-[740px]">
          上によく選ばれるメニュー、下にカテゴリ別の一覧をご用意しています。
          <span className="inline-block w-[0.35em]" />
          空席確認・予約はHotPepperから進められます。
        </p>
      </div>

      <div className="mn mx-auto max-w-[1040px] mb-[10vh]">
        <div className="grid grid-cols-[auto,1fr,auto] items-end gap-6 mb-6">
          <div>
            <p className="text-[12px] tracking-[0.24em] text-ink/46 mb-2">PICK UP</p>
            <h3 className="text-[22px] text-ink/90 font-medium">人気メニュー</h3>
          </div>

          <div aria-hidden className="h-px bg-ink/12 mb-[10px]" />

          <p className="text-[12.5px] text-ink/50 tracking-[0.02em] whitespace-nowrap mb-[6px]">
            よく選ばれるものから見やすく
          </p>
        </div>

        <div className="relative overflow-hidden border border-ink/12 bg-[rgba(255,255,255,0.58)]">
          <img
            src={PAPER}
            alt=""
            aria-hidden="true"
            className="
              absolute inset-0 w-full h-full object-cover
              opacity-[0.26]
              scale-[1.035]
              [filter:brightness(1.04)_contrast(0.90)_saturate(0.92)]
            "
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_26%_18%,rgba(255,253,249,0.68),rgba(255,253,249,0.26)_56%,rgba(255,253,249,0.52)_100%)]
            "
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] pointer-events-none"
          />

          <div className="relative p-[clamp(14px,1.8vw,22px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/12 border border-ink/12">
              {featuredUI.map((item, idx) => (
                <FeaturedCell key={item.label ?? idx} item={item} dense />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mn mx-auto max-w-[980px] mb-[10vh]">
        <div className="mb-6">
          <p className="text-[12px] tracking-[0.24em] text-ink/46 mb-2">ALL MENU</p>
          <h3 className="text-[22px] text-ink/90 font-medium">その他のメニュー</h3>
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

      <div className="mn mx-auto max-w-[980px] text-center">
        <a
          href={RESERVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-3
            px-9 py-4
            bg-[rgba(124,78,91,0.72)]
            text-white/92
            text-[14px]
            tracking-[0.10em]
            shadow-[0_10px_26px_rgba(0,0,0,0.10)]
            hover:bg-[rgba(124,78,91,0.82)]
            active:scale-[0.99]
            transition-all
          "
          aria-label="HotPepperで空席を確認して予約する"
        >
          <span className="tracking-[0.22em] text-white/70 text-[12px]">HOTPEPPER</span>
          <span className="font-semibold">空席を確認して予約する</span>
        </a>

        <p className="text-[12px] mt-5 leading-[1.8] text-ink/48">
          ※ 表示価格は税込です。内容は変更になる場合があります。<br />
          予約内容はHotPepper側で確定します。
        </p>
      </div>
    </section>
  );
}