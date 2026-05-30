// src/sections_sp/ProfileSP.jsx
import { Reveal } from "../components/Reveal";

export default function ProfileSP() {
  return (
    <section
      className="
        w-full bg-base
        pt-[12vh]
        px-[6vw]
        pb-[calc(18vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="店主プロフィール"
    >
      <div className="mx-auto max-w-[520px]">
        <Reveal delay={0.0} y={12} blur={0.14} duration={0.62} className="relative mb-8">
          <img
            src="/yorisoi/profile2.jpg"
            alt="店主 照喜名一樹の写真"
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-[6px]
              shadow-[0_8px_22px_rgba(0,0,0,0.12)]
              [filter:brightness(1.02)_contrast(0.95)]
              object-[center_18%]
              aspect-[4/5]
            "
          />
          <div
            aria-hidden="true"
            className="
              absolute inset-0 pointer-events-none rounded-[6px]
              bg-[linear-gradient(
                to_bottom,
                rgba(255,255,255,0.28) 0%,
                rgba(255,255,255,0.12) 42%,
                rgba(255,255,255,0) 100%
              )]
            "
          />
        </Reveal>

        <Reveal
          as="p"
          delay={0.06}
          y={12}
          blur={0.14}
          duration={0.62}
          className="text-[11px] tracking-[0.24em] text-ink/55 mb-3"
        >
          店主について
        </Reveal>

        <Reveal
          as="h2"
          delay={0.12}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[clamp(20px,6vw,26px)]
            leading-[1.48]
            tracking-[0.005em]
            text-ink/90
            font-medium
            mb-6
          "
        >
          似合う形を、
          <br />
          きれいに仕上げる。
        </Reveal>

        <Reveal
          delay={0.18}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[15px]
            leading-[1.95]
            text-ink/78
            space-y-5
          "
        >
          <p>
            東京で副店長として18年。
            <br />
            カットとパーマの現場で経験を重ねてきました。
          </p>

          {/* ✅ 修正③（落とします削減：収める） */}
          <p>
            まず、直したい部分と日頃の手入れの癖を把握します。
            <br />
            骨格と毛流れから、顔まわりが落ち着く形へ収めます。
          </p>

          <p className="text-ink/70">
            よくしゃべる日も、静かな日も。その場の空気を読んでペースを切り替えます。
            <br />
            言い忘れがあれば、途中で追加してもらえれば大丈夫です。
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          y={12}
          blur={0.12}
          duration={0.62}
          className="mt-8 pt-6 border-t border-ink/10"
        >
          <dl className="text-[13.6px] leading-[1.9] text-ink/74 space-y-2">
            <div className="flex gap-3">
              <dt className="w-[5.5em] text-ink/88 font-medium">名前</dt>
              <dd>照喜名 一樹</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[5.5em] text-ink/88 font-medium">得意</dt>
              <dd>メンズカット／メンズパーマ</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[5.5em] text-ink/88 font-medium">評価</dt>
              <dd>★5.0（61件）／2026.03時点</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}