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
        {/* 左：写真 */}
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

        {/* 右：本文 */}
        <div>
          <Reveal
            as="p"
            delay={0.06}
            y={14}
            blur={0.16}
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
            似合う形を、<br />
            きれいに仕上げる。
          </Reveal>

          <Reveal
            delay={0.18}
            y={14}
            blur={0.16}
            duration={0.68}
            className="text-[15.5px] leading-[2] text-ink/80 max-w-[580px]"
          >
            <p className="mb-5">
              東京で副店長として18年。
              カットとパーマの現場で経験を重ねてきました。
            </p>

            <p className="mb-5">
              最初に「気になるところ」と「普段のセット」を確認して、<br />
              髪質・骨格に合わせて仕上がりを決めていきます。
            </p>

<p className="mb-0 text-ink/74">
  その日の雰囲気を見ながら、テンポも距離感も合わせます。<br />
  気になるところは、途中でもそのまま言ってください。
</p>
          </Reveal>

          {/* 事実（箱ではなく、線とレイアウトで） */}
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
                <dd className="inline ml-1">東京 副店長 18年</dd>
              </div>
              <div>
                <dt className="inline text-ink/90 font-medium">得意：</dt>
                <dd className="inline ml-1">メンズカット／メンズパーマ</dd>
              </div>
              <div>
                <dt className="inline text-ink/90 font-medium">評価：</dt>
                <dd className="inline ml-1">★5.0（61件）／2026.03時点</dd>
              </div>
            </dl>


          </Reveal>

    
        </div>
      </div>
    </section>
  );
}