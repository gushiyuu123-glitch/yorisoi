// src/sections_sp/ProfileSP.jsx
import { Reveal } from "../components/Reveal";

export default function ProfileSP() {
  const REVIEW_URL = "https://beauty.hotpepper.jp/slnH000706136/review/";

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

        {/* ✅ SPはPCと同文を避ける */}
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
          印象が締まる、<br />
          その一手。
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
            東京で副店長を経験し、担当歴は18年。<br />
            メンズのカットとパーマを中心に積み重ねてきました。
          </p>

          <p>
            最初に、変えたい所と毎朝の手入れの癖を押さえます。<br />
            骨格と毛流れから、落ち着く輪郭へ落とします。
          </p>

          <p>
            パーマは必要なときだけ。<br />
            強さは段階で選べます。
          </p>

          <p className="text-ink/70">
            会話の量はお任せください。<br />
            要点だけ確認して、そのまま進めます。
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
              <dd>★5.0（61件）※2026年3月時点</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}