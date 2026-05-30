// src/sections/FAQ.jsx
import { Reveal } from "../components/Reveal";

const FAQS = [
  {
    q: "初めてでも大丈夫ですか？",
    a: "はい。はじめに「直したい部分」と「日頃のスタイリング」を聞き取り、方向をその場で決めます。",
  },
  {
    q: "所要時間はどれくらい？",
    // ✅ 店主指定：パーマ 120〜150分
    a: "目安は、カットのみで約40〜50分。パーマ込みで約120〜150分です。",
  },
  {
    q: "カットだけでも予約できますか？",
    a: "もちろん可能です。空席やメニューはHotPepperからご確認いただけます。",
  },
  {
    q: "当日予約はできますか？",
    a: "空きがあれば可能です。朝7時の枠のみWEB予約で受け付けています。",
  },
  {
    q: "何を伝えればいいですか？",
    a: "「なりたい雰囲気」「手を入れたい箇所」「毎朝の手入れの癖」——この3つで十分です。写真があれば見せてください（なくても問題ありません）。",
  },
];

const pad2 = (n) => String(n).padStart(2, "0");

export default function FAQ() {
  return (
    <section
      className="w-full bg-base pt-[16vh] pb-[16vh] px-[6vw]"
      aria-label="よくある質問"
    >
      <div className="mx-auto max-w-[980px]">
        {/* Head */}
        <header className="mx-auto max-w-[820px] text-center">
          <Reveal
            as="p"
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[12px] tracking-[0.28em] text-ink/55 mb-6"
          >
            FAQ
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[clamp(26px,3vw,34px)] text-ink/90 leading-[1.42] font-medium"
          >
            予約前に確認しておきたいこと
          </Reveal>

          <Reveal
            delay={0.12}
            y={12}
            blur={0.14}
            duration={0.66}
            className="mt-6 text-[14.5px] leading-[1.95] text-ink/72"
          >
            予約前に迷いがちな点を、先にまとめました。
          </Reveal>

          {/* 仕切り線 */}
          <Reveal
            delay={0.18}
            y={10}
            blur={0.12}
            duration={0.60}
            className="mx-auto mt-10 h-px w-[58%] bg-ink/14"
            aria-hidden
          />
        </header>

        {/* List */}
        <div className="mt-12 border-y border-ink/14">
          {FAQS.map((item, i) => (
            <Reveal
              key={item.q}
              delay={0.02 * i}
              y={12}
              blur={0.12}
              duration={0.66}
              className="py-9 md:py-10 border-b border-ink/12 last:border-b-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-y-4 md:gap-10 items-start">
                {/* Question */}
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.22em] text-ink/48 mb-2">
                    {pad2(i + 1)} / QUESTION
                  </p>
                  <h3 className="text-[15.5px] md:text-[16px] leading-[1.8] text-ink/90 font-medium">
                    {item.q}
                  </h3>
                </div>

                {/* Answer */}
                <div className="min-w-0 md:border-l md:border-ink/10 md:pl-10">
                  <p className="text-[15px] leading-[2.0] text-ink/80">
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 余韻 */}
        <Reveal
          delay={0.10}
          y={10}
          blur={0.10}
          duration={0.62}
          className="mt-10 text-center text-[12px] tracking-[0.16em] text-ink/50"
        >
          ほかに確認したいことがあれば、ご予約時に一言で大丈夫です。
        </Reveal>
      </div>
    </section>
  );
}