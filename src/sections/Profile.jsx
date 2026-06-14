// src/sections/ProfileC.jsx
import { Reveal } from "../components/Reveal";

export default function ProfileC() {
  return (
    <div
      className="
        relative w-full overflow-hidden bg-base
        pt-[12vh] pb-[18vh] px-[8vw]
      "
      aria-label="店主プロフィール"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-18vw] top-[8vh]
          h-[56vh] w-[44vw] rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.22)_46%,rgba(255,255,255,0)_72%)]
          blur-[38px] opacity-[0.72]
        "
      />

      <div
        className="
          relative z-[2] mx-auto max-w-[1120px]
          grid grid-cols-1 lg:grid-cols-[0.92fr_1fr]
          gap-[7vw] items-start
        "
      >
        <Reveal
          delay={0.0}
          y={14}
          blur={0.14}
          duration={0.68}
          className="w-full"
        >
          <figure className="relative w-full">
            <img
              src="/yorisoi/profile2.jpg"
              alt="ヨリソイ Hair＆Spa 店主 照喜名一樹"
              loading="lazy"
              decoding="async"
              className="
                w-full
                h-[min(72vh,760px)]
                object-cover
                object-[center_18%]
                rounded-[2px]
                shadow-[0_12px_34px_rgba(72,55,40,0.10)]
                [filter:brightness(1.025)_contrast(0.95)_saturate(0.96)]
              "
            />

            <figcaption
              className="
                mt-4
                text-[12px]
                tracking-[0.18em]
                text-ink/58
              "
            >
              店主 / 照喜名 一樹
            </figcaption>
          </figure>
        </Reveal>

        <div className="relative pt-[2.4vh]">
          <Reveal
            as="p"
            delay={0.06}
            y={14}
            blur={0.14}
            duration={0.68}
            className="
              text-[13px]
              tracking-[0.32em]
              text-ink/55
              mb-6
            "
          >
            店主について
          </Reveal>

          <Reveal
            as="h2"
            delay={0.12}
            y={14}
            blur={0.14}
            duration={0.68}
            className="
              text-[clamp(28px,3.15vw,38px)]
              leading-[1.42]
              text-ink/90
              font-medium
              mb-8
              max-w-[580px]
            "
          >
            印象をまとめる、<br />
            確かな一手。
          </Reveal>

          <Reveal
            delay={0.18}
            y={14}
            blur={0.12}
            duration={0.68}
            className="
              h-px w-[68%]
              mb-9
              bg-[linear-gradient(to_right,rgba(96,78,62,0.20),rgba(96,78,62,0.05),rgba(96,78,62,0))]
            "
          />

          <Reveal
            delay={0.20}
            y={14}
            blur={0.14}
            duration={0.68}
            className="
              text-[15.8px]
              leading-[2.05]
              text-ink/80
              max-w-[590px]
            "
          >
            <p className="mb-5">
              東京のサロンで副店長を務め、現場で18年のキャリアを積みました。
              <br />
              カットとパーマを中心に、男性の顔まわりが引き締まる仕上がりを作ってきました。
            </p>

            <p className="mb-5">
              まず、直したい部分と日頃の手入れの癖を把握し、
              <br />
              骨格と毛流れを見ながら、顔の輪郭が落ち着く形を組み立てます。
            </p>

            <p className="mb-0 text-ink/74">
              よくしゃべる日も、静かな日も、 <br />その場の空気を読んでペースを切り替えます。
              <br />
              言い忘れがあれば、途中で追加してもらえれば大丈夫です。
            </p>
          </Reveal>

          <Reveal
            delay={0.28}
            y={14}
            blur={0.12}
            duration={0.68}
            className="mt-10 pt-6 border-t border-ink/10"
          >
            <dl
              className="
                grid grid-cols-1 sm:grid-cols-2
                gap-x-10 gap-y-3
                text-[14.5px]
                leading-[1.9]
                text-ink/76
              "
            >
              <div>
                <dt className="inline text-ink/90 font-medium">名前：</dt>
                <dd className="inline ml-1">照喜名 一樹</dd>
              </div>

              <div>
                <dt className="inline text-ink/90 font-medium">経歴：</dt>
                <dd className="inline ml-1">東京 副店長 / 現場18年</dd>
              </div>

              <div>
                <dt className="inline text-ink/90 font-medium">得意：</dt>
                <dd className="inline ml-1">メンズカット／メンズパーマ</dd>
              </div>

              <div>
                <dt className="inline text-ink/90 font-medium">評価：</dt>
                <dd className="inline ml-1">★5.0（61件）／2026年3月時点</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}