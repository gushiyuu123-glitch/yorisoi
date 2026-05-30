// src/sections/ProfileC.jsx
import { Reveal } from "../components/Reveal";

export default function ProfileC() {
  const REVIEW_URL = "https://beauty.hotpepper.jp/slnH000706136/review/";

  return (
    <section
      className="w-full bg-base pt-[10vh] pb-[18vh] px-[8vw]"
      aria-label="店主プロフィール"
    >
      <div className="mx-auto max-w-[1080px] grid grid-cols-1 lg:grid-cols-2 gap-[7vw] items-start">
        <Reveal delay={0.0} y={14} blur={0.16} duration={0.68} className="w-full">
          <figure className="w-full">
            <img
              src="/yorisoi/profile2.jpg"
              alt="店主 照喜名一樹の写真"
              loading="lazy"
              decoding="async"
              className="
                w-full
                h-[min(72vh,760px)]
                object-cover
                object-[center_18%]
                rounded-[6px]
                shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                [filter:brightness(1.02)_contrast(0.95)]
              "
            />
            <figcaption className="mt-4 text-[12px] tracking-[0.18em] text-ink/58">
              店主 / 照喜名 一樹
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal
            as="p"
            delay={0.06}
            y={14}
            blur={0.16}
            duration={0.68}
            className="text-[13px] tracking-[0.32em] text-ink/55 mb-6"
          >
            店主について
          </Reveal>

          <Reveal
            as="h2"
            delay={0.12}
            y={14}
            blur={0.16}
            duration={0.68}
            className="
              text-[clamp(26px,3vw,34px)]
              leading-[1.42]
              text-ink/90
              font-medium
              mb-7
              max-w-[580px]
            "
          >
            印象をまとめる、<br />
            確かな一手。
          </Reveal>

          <Reveal
            delay={0.18}
            y={14}
            blur={0.16}
            duration={0.68}
            className="text-[15.5px] leading-[2] text-ink/80 max-w-[580px]"
          >
            <p className="mb-5">
              東京のサロンで副店長を務め、現場で18年のキャリアを積みました。<br />
              カットとパーマを中心に、男性の顔まわりが引き締まる仕上がりを作ってきました。
            </p>

            <p className="mb-5">
              まず、直したい部分と日頃の手入れの癖を把握します。<br />
              骨格と毛流れから、顔の輪郭が落ち着く形を組み立てます。
            </p>

            <p className="mb-0 text-ink/74">
              よくしゃべる日も、静かな日も。その場の空気を読んでペースを切り替えます。<br />
              言い忘れがあれば、途中で追加してもらえれば大丈夫です。
            </p>
          </Reveal>

          <Reveal
            delay={0.24}
            y={14}
            blur={0.14}
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
    </section>
  );
}