// src/sections_sp/ProfileSP.jsx
import { Reveal } from "../components/Reveal";

export default function ProfileSP() {
  return (
    <div
      className="
        relative w-full overflow-hidden bg-base
        pt-[12vh]
        px-[6vw]
        pb-[calc(18vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="店主プロフィール"
    >
      <div className="mx-auto max-w-[520px]">
        <Reveal
          delay={0.0}
          y={12}
          blur={0.12}
          duration={0.62}
          className="relative mb-9"
        >
          <img
            src="/yorisoi/profile2.jpg"
            alt="ヨリソイ Hair＆Spa 店主 照喜名一樹"
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-[4px]
              shadow-[0_8px_22px_rgba(72,55,40,0.11)]
              [filter:brightness(1.035)_contrast(0.95)_saturate(0.96)]
              object-[center_18%]
              aspect-[4/5]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute inset-0 pointer-events-none rounded-[4px]
              bg-[linear-gradient(
                to_bottom,
                rgba(255,255,255,0.20) 0%,
                rgba(255,255,255,0.08) 40%,
                rgba(255,255,255,0) 100%
              )]
            "
          />
        </Reveal>

        <Reveal
          as="p"
          data-kicker
          delay={0.06}
          y={12}
          blur={0.12}
          duration={0.62}
          className="
            text-[12px]
            tracking-[0.22em]
            text-ink/55
            mb-3
          "
        >
          店主について
        </Reveal>

        <Reveal
          as="h2"
          delay={0.12}
          y={12}
          blur={0.12}
          duration={0.62}
          className="
            text-[clamp(22px,6.2vw,28px)]
            leading-[1.48]
            tracking-[0.005em]
            text-ink/90
            font-medium
            mb-7
          "
        >
          似合う形を、
          <br />
          きれいに仕上げる。
        </Reveal>

        <Reveal
          delay={0.18}
          y={12}
          blur={0.12}
          duration={0.62}
          className="
            text-[16px]
            leading-[1.98]
            text-ink/80
            space-y-6
          "
        >
          <p>
            東京で副店長として18年。
            <br />
            カットとパーマの現場で経験を <br />重ねてきました。
          </p>

          <p>
            まず、直したい部分と 日頃の手入れの <br />癖を把握し、
           
            骨格と毛流れを見ながら、 <br />顔まわりが落ち着く形へ収めます。
          </p>

          <p className="text-ink/72">
            よくしゃべる日も、静かな日も、その場の <br />空気を読んでペースを切り替えます。
            <br /> <br />
            言い忘れがあれば、 <br />途中で追加してもらえれば大丈夫です。
          </p>
        </Reveal>

        <Reveal
          delay={0.26}
          y={12}
          blur={0.10}
          duration={0.62}
          className="
            mt-9
            pt-6
            border-t border-ink/10
          "
        >
          <dl
            className="
              text-[16px]
              leading-[1.95]
              text-ink/76
              space-y-3
            "
          >
            <div className="grid grid-cols-[4.6em_1fr] gap-3">
              <dt className="text-ink/88 font-medium">名前</dt>
              <dd>照喜名 一樹</dd>
            </div>

            <div className="grid grid-cols-[4.6em_1fr] gap-3">
              <dt className="text-ink/88 font-medium">得意</dt>
              <dd>メンズカット／メンズパーマ</dd>
            </div>

            <div className="grid grid-cols-[4.6em_1fr] gap-3">
              <dt className="text-ink/88 font-medium">評価</dt>
              <dd>★5.0（61件）／2026.03時点</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </div>
  );
}