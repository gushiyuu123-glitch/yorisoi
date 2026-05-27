// src/sections_sp/FAQSP.jsx
import { Reveal } from "../components/Reveal";

const FAQS = [
  {
    q: "初めてでも大丈夫ですか？",
    a: "はい。最初に「気になるところ」と「普段のセット」だけ確認して、合う形を一緒に決めます。",
  },
  {
    q: "所要時間はどれくらい？",
    a: "目安は、カットのみで約40〜50分。パーマ込みで約90〜120分です。",
  },
  {
    q: "カットだけでも予約できますか？",
    a: "もちろん可能です。空席やメニューはHotPepperからご確認いただけます。",
  },
  {
    q: "当日予約はできますか？",
    a: "空きがあれば可能です。朝7時枠のみWEB予約で受け付けています。",
  },
{
  q: "何を伝えればいいですか？",
  a: "「なりたい雰囲気」「困っているところ」「普段のセット」——この3つで十分です。写真があれば見せてください（なくても大丈夫です）。",
},
];

const pad2 = (n) => String(n).padStart(2, "0");

export default function FAQSP() {
  return (
    <section
      className="
        w-full bg-base
        pt-[14vh]
        pb-[calc(14vh+env(safe-area-inset-bottom))]
        px-[6vw]
      "
      aria-label="よくある質問"
    >
      <div className="mx-auto max-w-[520px]">
        {/* Head */}
        <div className="text-center mb-10">
          <Reveal
            as="p"
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[11px] tracking-[0.26em] text-ink/55 mb-5"
          >
            FAQ
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[24px] leading-[1.45] text-ink/90 font-medium"
          >
            初めての方が
            <br />
            気になるところ
          </Reveal>

          <Reveal
            delay={0.12}
            y={10}
            blur={0.12}
            duration={0.62}
            className="mt-4 text-[13.5px] leading-[1.9] text-ink/72"
          >
            予約前に迷いがちな点を、
            <br />
            先にまとめました。
          </Reveal>

          <Reveal
            delay={0.18}
            y={10}
            blur={0.10}
            duration={0.58}
            className="mx-auto mt-8 h-px w-[62%] bg-ink/14"
            aria-hidden
          />
        </div>

        {/* List */}
        <div className="border-y border-ink/14">
          {FAQS.map((item, i) => (
            <Reveal
              key={i}
              delay={0.03 * i}
              y={10}
              blur={0.10}
              duration={0.62}
              className="py-7 border-b border-ink/12 last:border-b-0"
            >
              {/* Question */}
              <div className="mb-4">
                <p className="text-[10.5px] tracking-[0.22em] text-ink/48 mb-2">
                  {pad2(i + 1)} / QUESTION
                </p>
                <h3 className="text-[15px] leading-[1.85] text-ink/90 font-medium">
                  {item.q}
                </h3>
              </div>

              {/* Answer */}
              <div className="pt-4 border-t border-ink/10">
                <p className="text-[14.5px] leading-[1.95] text-ink/80">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 余韻 */}
        <Reveal
          delay={0.08}
          y={10}
          blur={0.10}
          duration={0.62}
          className="mt-8 text-center text-[11px] tracking-[0.16em] text-ink/50 leading-[1.8]"
        >
          ほかにも気になる点があれば、<br />
          ご予約時に一言で大丈夫です。
        </Reveal>
      </div>
    </section>
  );
}