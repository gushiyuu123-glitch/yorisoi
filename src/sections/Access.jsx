// src/sections/Access.jsx
import { Reveal } from "../components/Reveal";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("沖縄県浦添市内間2丁目20-3 ヨリソイ Hair＆Spa");

const HOTPEPPER_MAP_URL = "https://beauty.hotpepper.jp/slnH000706136/map/";
const HOTPEPPER_RESERVE_URL = "https://beauty.hotpepper.jp/slnH000706136/";

const Icon = ({ children }) => (
  <span
    className="
      inline-flex items-center justify-center
      w-[34px] h-[34px]
      rounded-[999px]
      bg-surface/70
      border border-ink/10
      text-ink/60
    "
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

function DlRow({ dt, dd }) {
  return (
    <div
      className="
        grid grid-cols-1 md:grid-cols-[140px,1fr]
        gap-y-2 md:gap-6
        py-5
        border-b border-ink/12
      "
    >
      <div className="text-[12px] tracking-[0.22em] text-ink/55">{dt}</div>
      <div className="text-[14.5px] leading-[1.9] text-ink/82">{dd}</div>
    </div>
  );
}

const Pill = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center justify-center
      px-7 py-3.5
      rounded-[999px]
      text-[14px]
      text-ink/90
      bg-surface/70
      border border-ink/14
      shadow-[0_6px_18px_rgba(0,0,0,0.05)]
      hover:bg-surface/90
      transition-all
    "
  >
    {children}
  </a>
);

export default function Access() {
  return (
    <section
      id="access"
      className="w-full bg-base pt-[18vh] pb-[18vh] px-[6vw]"
      aria-label="アクセス"
    >
      <div className="mx-auto max-w-[980px]">
        {/* TITLE */}
        <div className="mx-auto max-w-[780px] text-center mb-14">
          <Reveal
            as="p"
            delay={0.0}
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[12px] tracking-[0.28em] text-ink/55 mb-6"
          >
            ACCESS / アクセス
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[clamp(26px,3vw,34px)] text-ink/90 leading-[1.42] font-medium"
          >
            お店への行き方と、受付時間
          </Reveal>
        </div>

        {/* TOP INFO（SPでも崩れない） */}
        <Reveal delay={0.12} y={12} blur={0.12} duration={0.66}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 text-center mb-16">
            {/* ADDRESS */}
            <div className="mx-auto max-w-[320px]">
              <div className="flex justify-center mb-4">
                <Icon>
                  <PinIcon />
                </Icon>
              </div>
              <div className="text-[12px] tracking-[0.24em] text-ink/55 mb-2">
                ADDRESS
              </div>
              <div className="text-[15px] leading-[1.85] text-ink/84">
                沖縄県浦添市内間2丁目20-3
                <br />
                <span className="text-ink/62">（パイプライン沿い）</span>
              </div>
            </div>

            {/* HOURS（ここだけ少し強く） */}
            <div className="mx-auto max-w-[320px]">
              <div className="flex justify-center mb-4">
                <Icon>
                  <ClockIcon />
                </Icon>
              </div>
              <div className="text-[12px] tracking-[0.24em] text-ink/55 mb-2">
                HOURS
              </div>
              <div className="text-[15px] leading-[1.85] text-ink/84">
                <span className="text-[17px] font-semibold text-ink/90">
                  7:00〜19:00
                </span>
                <br />
                <span className="text-ink/62">
                  最終受付：カット18:00 / カラー17:00 / パーマ16:30
                </span>
              </div>
            </div>

            {/* PARKING */}
            <div className="mx-auto max-w-[320px]">
              <div className="flex justify-center mb-4">
                <Icon>
                  <CarIcon />
                </Icon>
              </div>
              <div className="text-[12px] tracking-[0.24em] text-ink/55 mb-2">
                PARKING
              </div>
              <div className="text-[15px] leading-[1.85] text-ink/84">
                駐車場 2台 + バイク1台
                <br />
                <span className="text-ink/62">（満車時は近隣P）</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* DETAILS */}
        <Reveal delay={0.18} y={12} blur={0.12} duration={0.66}>
          <div className="border-y border-ink/14 mb-14">
            <DlRow
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

            <DlRow
              dt="朝7時の予約"
              dd={
                <>
                  朝7時のご予約のみ <b>WEB予約</b>。<br />
                  朝8時以降は 電話 / WEB どちらも可能。
                </>
              }
            />

            <DlRow dt="定休日" dd="毎週 月曜日" />
            <DlRow
              dt="支払い"
              dd="現金 / 各種カード / 電子マネー / QR決済（PayPay ほか）"
            />
            <DlRow dt="サロン情報" dd="セット面2席 / スタイリスト1名" />
            <DlRow
              dt="備考"
              dd="＜理容室＞ メンズカット / メンズパーマ / フェード / シェービング"
            />
          </div>
        </Reveal>

        {/* LINKS（Google + HotPepper地図 + 予約） */}
        <Reveal delay={0.24} y={12} blur={0.10} duration={0.66}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Pill href={GOOGLE_MAPS_URL}>Google Mapsで開く</Pill>
          </div>

          <p className="text-center text-[12px] leading-[1.8] text-ink/50">
            ※ 営業時間・受付・支払いは変更になる場合があります。最新情報はHotPepperをご確認ください。
          </p>
        </Reveal>

        {/* PHOTO */}
        <Reveal delay={0.30} y={12} blur={0.10} duration={0.66}>
          <div className="mt-12 relative w-full overflow-hidden rounded-[6px] shadow-[0_10px_34px_rgba(0,0,0,0.06)] aspect-[16/9]">
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