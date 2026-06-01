// src/sections_sp/AccessSP.jsx
import { Reveal } from "../components/Reveal";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("沖縄県浦添市内間2丁目20-3 ヨリソイ Hair＆Spa");

const HOTPEPPER_MAP_URL = "https://beauty.hotpepper.jp/slnH000706136/map/";

// ✅ 店主からの番号
const TEL_DISPLAY = "090-7357-0926";
const TEL_HREF = "tel:09073570926";
const Icon = ({ children }) => (
  <span
    className="
      inline-flex items-center justify-center
      w-[34px] h-[34px] rounded-[999px]
      bg-surface/70
      border border-ink/12
      text-ink/60
    "
    aria-hidden="true"
  >
    {children}
  </span>
);

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-4.6 7-11a7 7 0 10-14 0c0 6.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 13l2-5h14l2 5" />
    <path d="M5 13h14" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="16.5" cy="16.5" r="1.5" />
  </svg>
);

function DlRowSP({ dt, dd }) {
  return (
    <div className="py-5 border-b border-ink/12 last:border-b-0">
      <div className="text-[11px] tracking-[0.22em] text-ink/55 mb-2">{dt}</div>
      <div className="text-[14.5px] leading-[1.95] text-ink/82">{dd}</div>
    </div>
  );
}

function KeyRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-ink/12 last:border-b-0">
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] tracking-[0.24em] text-ink/55 mb-2">{label}</div>
        <div className="text-[14.5px] leading-[1.9] text-ink/84">{value}</div>
      </div>
    </div>
  );
}

const Pill = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-full text-center
      px-7 py-3.5
      rounded-[999px]
      text-[13.5px]
      text-ink/90
      bg-surface/70
      border border-ink/14
      shadow-[0_6px_18px_rgba(0,0,0,0.05)]
      active:scale-[0.99]
      transition-all
    "
  >
    {children}
  </a>
);

export default function AccessSP() {
  return (
    <section
      id="access"
      className="
        w-full bg-base
        pt-[14vh]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
        px-[6vw]
      "
      aria-label="アクセス"
    >
      <div className="mx-auto max-w-[520px]">
        {/* TITLE */}
        <div className="text-center mb-10">
          <Reveal
            as="p"
            delay={0.0}
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[11px] tracking-[0.26em] text-ink/55 mb-5"
          >
            ACCESS / アクセス
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[24px] leading-[1.45] text-ink/90 font-medium"
          >
            お店への行き方と、
            <br />
            受付時間
          </Reveal>
        </div>

        {/* TOP KEY */}
        <Reveal delay={0.12} y={10} blur={0.10} duration={0.62}>
          <div className="border-y border-ink/14 mb-10">
            <KeyRow
              icon={
                <Icon>
                  <PinIcon />
                </Icon>
              }
              label="ADDRESS"
              value={
                <>
                  沖縄県浦添市内間2丁目20-3
                  <br />
                  <span className="text-ink/62">（パイプライン沿い）</span>
                </>
              }
            />

            <KeyRow
              icon={
                <Icon>
                  <ClockIcon />
                </Icon>
              }
              label="HOURS"
              value={
                <>
                  <span className="text-[16px] font-semibold text-ink/90">7:00〜19:00</span>
                  <br />
                  <span className="text-ink/62">
                    最終：カット18:00 / カラー17:00 / パーマ16:30
                  </span>
                </>
              }
            />

            <KeyRow
              icon={
                <Icon>
                  <CarIcon />
                </Icon>
              }
              label="PARKING"
              value={
                <>
                  駐車場 2台 + バイク1台
                  <br />
                </>
              }
            />
          </div>
        </Reveal>

        {/* DETAILS */}
        <Reveal delay={0.18} y={10} blur={0.10} duration={0.62}>
          <div className="border-y border-ink/14 mb-10">
            <DlRowSP
              dt="アクセス・道案内"
              dd={
                <>
                  外観：青い外壁（パイプライン沿い、視認性あり）
                  <br />
                  目印：向かいに年金事務所／内間バス停　隣：セブンイレブン内間2丁目店
                  <br />
                  最寄り：古島駅より車で約7分
                </>
              }
            />

<DlRowSP
  dt="TEL"
  dd={
    <a
      href={TEL_HREF}
      className="underline underline-offset-2 decoration-ink/25"
    >
      TEL {TEL_DISPLAY}
    </a>
  }
/>

            <DlRowSP
              dt="朝7時の予約"
              dd={
                <>
                  朝7時のご予約のみ <b>WEB予約</b>。
                  <br />
                  朝8時以降は{" "}
                  <a
                    href={TEL_HREF}
                    className="underline underline-offset-2 decoration-ink/25"
                  >
                    TEL
                  </a>{" "}
                  / WEB どちらも可能。
                </>
              }
            />

            <DlRowSP dt="定休日" dd="毎週 月曜日" />
            <DlRowSP dt="支払い" dd="現金 / 各種カード / 電子マネー / QR決済（PayPay ほか）" />
            <DlRowSP dt="サロン情報" dd="セット面2席 / スタイリスト1名" />
            <DlRowSP
              dt="備考"
              dd="＜理容室＞ メンズカット / メンズパーマ / フェード / シェービング"
            />
          </div>
        </Reveal>

        {/* LINKS */}
        <Reveal delay={0.24} y={10} blur={0.10} duration={0.62}>
          <div className="grid gap-3">
            <Pill href={GOOGLE_MAPS_URL}>Google Mapsで開く</Pill>
          </div>

          <p className="text-center text-[11px] mt-5 leading-[1.75] text-ink/50">
            ※ 営業時間・受付・支払いは変更になる場合があります。最新情報はHotPepperをご確認ください。
          </p>
        </Reveal>

        {/* PHOTO */}
        <Reveal delay={0.30} y={10} blur={0.10} duration={0.62}>
          <div className="mt-10 relative w-full overflow-hidden rounded-[6px] shadow-[0_10px_34px_rgba(0,0,0,0.06)] aspect-[16/9]">
            <img
              src="/yorisoi/outside1.png"
              alt="ヨリソイ 外観"
              className="w-full h-full object-cover object-top scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}