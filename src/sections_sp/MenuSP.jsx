// src/sections_sp/MenuSP.jsx
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

const PAPER = "/yorisoi/menu-paper2.png"; // ✅ PCと同じ紙

const MICROCMS_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const MICROCMS_MENU_API_ID = import.meta.env.VITE_MICROCMS_MENU_API_ID ?? "menu";

const RESERVE_URL =
  "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";
// ※控えめリンクとして残す（ボタンは1つ）
const COUPON_URL = "https://beauty.hotpepper.jp/slnH000706136/coupon/";

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
    desc: "迷ったらまずこれ。清潔感を整えやすい人気メニューです。",
    note: "人気No.1",
  },
  {
    label: "POPULAR 02",
    title: "カット・シャンプー＋眉・顔全体シェービング",
    price: "¥4,800",
    desc: "顔まわりまで整えて、印象をしっかり整えたい方へ。",
    note: "極上清潔感",
  },
  {
    label: "POPULAR 03",
    title: "極上ヘッドスパ＋カットシャンプー（60分）",
    price: "¥5,880",
    desc: "疲れをほぐしながら、髪も頭も整えたい日に。",
    note: "癒し時間",
  },
  {
    label: "POPULAR 04",
    title: "トップふんわり ボリュームUPパーマ",
    price: "¥9,980",
    desc: "トップの立ち上がりが気になる方へ。大人向けの自然なパーマ。",
    note: "自然な仕上がり",
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
  if (typeof group?.summary === "string" && group.summary.trim())
    return group.summary.trim();
  const first = group?.items?.[0];
  if (!first) return "";
  const [name, price] = first;
  if (!name || !price) return "";
  return `${name} ${price}〜`;
}

function AccordionSP({ group, openKey, setOpenKey }) {
  const isOpen = openKey === group.key;
  const summary = groupSummary(group);

  return (
    <div className="border-t border-ink/10">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : group.key)}
        className="w-full flex items-start justify-between gap-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <p className="text-[10.5px] tracking-[0.18em] text-ink/45 mb-1">
            {group.en}
          </p>
          <h3 className="text-[16px] text-ink/90 font-medium">{group.title}</h3>

          {!!summary && (
            <p className="mt-2 text-[12.6px] leading-[1.75] text-ink/62">
              <span className="mr-2 text-ink/40" aria-hidden>
                └
              </span>
              {summary}
            </p>
          )}
        </div>

        <span
          className={`
            relative block w-[16px] h-[16px] shrink-0 mt-[3px]
            after:absolute after:left-1/2 after:top-1/2 after:w-[12px] after:h-[1px]
            after:bg-ink/70 after:-translate-x-1/2 after:-translate-y-1/2
            before:absolute before:left-1/2 before:top-1/2 before:w-[1px] before:h-[12px]
            before:bg-ink/70 before:-translate-x-1/2 before:-translate-y-1/2
            ${isOpen ? "before:scale-y-0" : ""}
            transition-all duration-300
          `}
          aria-hidden="true"
        />
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-85"}
        `}
      >
        <div className="overflow-hidden">
          <div className="pb-4">
            {group.items.map(([name, price], i) => (
              <div
                key={`${group.key}-${i}`}
                className="flex justify-between gap-4 py-2.5 border-b border-ink/10"
              >
                <span className="text-[13.5px] leading-[1.8] text-ink/82 pr-3">
                  {name}
                </span>
                <span className="shrink-0 text-[13.5px] font-medium text-ink/88">
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

function FeaturedCellSP({ item }) {
  return (
    <article className="spCell bg-[rgba(255,255,255,0.22)] px-4 py-4">
      <div className="flex items-start justify-between gap-4 mb-2.5">
        <div className="min-w-0">
          <p className="text-[9.5px] tracking-[0.18em] text-ink/52 mb-1.5">
            {item.label}
          </p>
          <h3 className="text-[14.6px] leading-[1.55] text-ink/88 font-semibold">
            {item.title}
          </h3>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10.5px] text-ink/56 mb-0.5">{item.note}</p>
          <p className="text-[17.5px] tracking-[0.01em] text-ink/88 font-bold">
            {item.price}
          </p>
        </div>
      </div>

      <p className="text-[12.8px] leading-[1.85] text-ink/80">{item.desc}</p>

      <div className="mt-3">
        <span
          className="
            inline-block
            text-[9.5px]
            tracking-[0.22em]
            text-ink/60
            border border-ink/20
            bg-[rgba(255,255,255,0.30)]
            px-2.5 py-[3px]
          "
        >
          RECOMMENDED
        </span>
      </div>
    </article>
  );
}

export default function MenuSP() {
  const [openKey, setOpenKey] = useState(null);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    fetchMenuPatch({ signal: ac.signal })
      .then((data) => setCms(data))
      .catch(() => {});
    return () => ac.abort();
  }, []);

  const featuredUI = useMemo(() => {
    return FEATURED.map((it, i) => {
      const p = cms?.featured?.[i];
      if (!p) return it;

      const title = pickStr(p, ["title", "menuName", "name"]) ?? it.title;
      const price = pickStr(p, ["price"]) ?? it.price;
      const note = pickStr(p, ["note", "sub", "caption"]) ?? it.note;
      const desc = pickStr(p, ["desc", "description"]) ?? it.desc;

      return { ...it, title, price, note, desc };
    });
  }, [cms]);

  const groupsUI = useMemo(() => {
    return GROUPS.map((g) => {
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
  }, [cms]);

  return (
    <section
      id="menu-sp"
      className="w-full bg-base pt-[18vh] pb-[16vh] px-[6vw]"
      aria-label="メニュー"
    >
      <div className="mx-auto max-w-[560px]">
        {/* Heading */}
        <Reveal y={12} blur={0.12} duration={0.62}>
          <div className="mb-10">
            <div className="mb-5 overflow-hidden">
              <div
                style={{
                  width: "min(72vw, 300px)",
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
                  start="top 90%"
                  once={true}
                  revealY={6}
                  revealBlur={0.08}
                  revealDuration={0.6}
                />
              </div>
            </div>

            <p className="text-[11px] tracking-[0.32em] text-ink/55 mb-4">料金</p>

            <h2 className="text-[clamp(20px,5.8vw,26px)] leading-[1.55] text-ink/90 font-medium">
              迷いやすい方のために、<br />
              よく選ばれるメニューを先にまとめました。
            </h2>

            <p className="mt-4 text-[13.5px] leading-[1.9] text-ink/70">
              上は「人気メニュー」、下は「カテゴリ別一覧」です。
              <br />
              最新の内容・空席はHotPepperでご確認ください。
            </p>
          </div>
        </Reveal>

        {/* Featured */}
        <Reveal delay={0.06} y={12} blur={0.12} duration={0.62}>
          <div className="mb-[9vh]">
            {/* ✅ 押し出され感を消す：右に逃がさない */}
            <div className="mb-5">
              <p className="text-[11px] tracking-[0.24em] text-ink/46 mb-1.5">
                PICK UP
              </p>
              <h3 className="text-[18px] text-ink/90 font-medium">人気メニュー</h3>
              <p className="mt-2 text-[12.5px] text-ink/56">
                よく選ばれるものから見やすく
              </p>
            </div>

            <div className="spFeatured relative overflow-hidden border border-ink/12">
              {/* 紙 */}
              <img
                src={PAPER}
                alt=""
                aria-hidden="true"
                className="
                  absolute inset-0 w-full h-full object-cover
                  opacity-[0.40]
                  scale-[1.06]
                "
                loading="lazy"
                decoding="async"
              />
              {/* ✅ 白モヤを作りすぎない：濃度を落として“紙っぽさ”だけ残す */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-0
                  bg-[radial-gradient(circle_at_28%_18%,rgba(255,253,249,0.72),rgba(255,253,249,0.50)_56%,rgba(255,253,249,0.62)_100%)]
                "
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 shadow-[0_14px_30px_rgba(0,0,0,0.07)]"
              />

              {/* ✅ 余白を削る */}
              <div className="relative p-[clamp(12px,4vw,18px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/12 border border-ink/12">
                  {featuredUI.map((item, idx) => (
                    <FeaturedCellSP key={item.label ?? idx} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={0.08} y={12} blur={0.12} duration={0.62}>
          <div className="mb-[9vh]">
            <div className="mb-5">
              <p className="text-[11px] tracking-[0.22em] text-ink/46 mb-2">
                ALL MENU
              </p>
              <h3 className="text-[20px] text-ink/90 font-medium">その他のメニュー</h3>
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
          </div>
        </Reveal>

        {/* CTA（✅ ボタンは1つ：予約へ） */}
        <Reveal delay={0.10} y={12} blur={0.10} duration={0.62}>
          <div className="text-center">
        
            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-8 py-3.5
                rounded-full
                bg-[rgba(228,170,188,0.22)]
                text-[#7c4e5b]
                text-[13.5px]
                tracking-[0.08em]
                shadow-[0_5px_16px_rgba(0,0,0,0.06)]
                active:scale-[0.985]
                transition-all
              "
              aria-label="HotPepperで空席確認して予約する"
            >
              空席を確認して予約する
            </a>

            {/* 控えめ導線（ボタンにしない） */}
            <div className="mt-4">
              <a
                href={COUPON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[13px]
                  text-ink/72
                  tracking-[0.04em]
                  underline underline-offset-4 decoration-ink/25
                  active:opacity-80
                  transition
                "
              >

              </a>
            </div>

            <p className="text-[11px] mt-5 leading-[1.7] text-ink/45">
              ※ メニュー・価格・クーポン内容は変動する場合があります。
              <br />
              最新情報はHotPepperをご確認ください。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}