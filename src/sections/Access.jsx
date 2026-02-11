// ============================================================================
// Access — 完全統合版（HotPepper情報 × 世界観翻訳 × 2カラム最適化）
// GUSHIKEN DESIGN × NOA
// ============================================================================

import React from "react";

const BirdIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M3 12s4-1 7-6c1.5 3 4 5 8 6-2 2-5 6-10 6-3 0-5-2-5-6z" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M3 13l2-5h14l2 5" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="16.5" cy="16.5" r="1.5" />
    <path d="M5 13h14" />
  </svg>
);

export default function Access() {
  return (
    <section
      id="access"
      className="w-full bg-[#f7f4ef] pt-[18vh] pb-[18vh] px-[6vw]"
    >
      {/* Title */}
      <div className="mx-auto max-w-[760px] mb-14 text-center">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-7">
          ACCESS / アクセス
        </p>
        <h2 className="text-[clamp(26px,3vw,34px)] text-[#5d4c3f] leading-[1.45] font-medium">
          お店へのアクセス・営業時間のご案内
        </h2>
      </div>

      {/* 2カラム（PC）/1カラム（SP） */}
      <div
        className="
          mx-auto max-w-[1100px]
          grid grid-cols-1 md:grid-cols-2
          gap-y-12 md:gap-y-16 md:gap-x-14
          text-[15px] leading-[1.9]
          text-[rgba(96,78,62,0.82)]
        "
      >
        {/* ================= Left Column ================= */}
        <div className="space-y-12">
          {/* 住所 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                住所
              </h3>
              <p>
                沖縄県浦添市内間2丁目20-3<br />
                （パイプライン沿い / 年金事務所向かい）
              </p>
            </div>
          </div>

          {/* アクセス・道案内 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                アクセス・道案内
              </h3>
              <p>
                【青いお店】浦添パイプライン沿い・新都心近く。<br />
                古島駅より徒歩7分。<br />
                並び：セブンイレブン内間2丁目店 / 東公園。<br />
                向かい：年金事務所 / 内間バス停。
              </p>
            </div>
          </div>

          {/* 電話番号 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                電話番号
              </h3>
              <p>090-7357-0926</p>
            </div>
          </div>

          {/* 支払い方法 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                支払い方法
              </h3>
              <p>
                Visa / Mastercard / JCB / American Express / Diners / Discover /
                PayPay / QUICPay / iD / Suica / PASMO / ApplePay
              </p>
            </div>
          </div>
        </div>

        {/* ================= Right Column ================= */}
        <div className="space-y-12 md:pt-[2vh]">
          {/* 営業時間 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                営業時間
              </h3>
              <p>
                AM7:00〜19:00<br />
                最終受付：カット18:00 / カラー17:00 / パーマ16:30<br />
                ※7時台はWEB予約限定（8時以降はTEL・WEBどちらも可）
              </p>
            </div>
          </div>

          {/* 定休日 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                定休日
              </h3>
              <p>毎週月曜日</p>
            </div>
          </div>

          {/* サロン情報（席数・スタッフ） */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                サロン情報
              </h3>
              <p>
                セット面：2席（半個室）<br />
                スタイリスト：1名<br />
                カット価格：¥3,480〜
              </p>
            </div>
          </div>

          {/* 駐車場 */}
          <div className="flex items-start gap-3">
            <CarIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                駐車場
              </h3>
              <p>
                専用駐車場：2台（＋バイク1台）<br />
                ※満車時は近隣パーキングをご利用ください。
              </p>
            </div>
          </div>

          {/* こだわり条件 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                サロンのこだわり
              </h3>
              <p>
                4席以下の小型サロン / 駐車場あり / 1人のスタイリストが仕上げまで担当 /
                朝10時前受付OK / カード決済OK / 男性スタッフ比率高め /
                お子さま同伴OK / 漫画充実 / 半個室あり
              </p>
            </div>
          </div>

          {/* 備考 */}
          <div className="flex items-start gap-3">
            <BirdIcon />
            <div>
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
                備考
              </h3>
              <p>
                ＜理容室＞ / 浦添 / 那覇 / 宜野湾 / 内間 / バーバー / メンズカット / フェード /
                パーマ / シェービング / 早朝OK
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 外観写真 */}
      <div
        className="
          mx-auto mt-[12vh] max-w-[900px]
          relative rounded-[14px] overflow-hidden
          shadow-[0_6px_26px_rgba(0,0,0,0.08)]
        "
      >
        <div
          className="
            absolute inset-0 z-[2] pointer-events-none
            opacity-[0.45]
            [background:linear-gradient(120deg,rgba(255,255,255,0.45),transparent)]
          "
        />
        <img
          src="/yorisoi/outside.png"
          alt="YORISOI 外観"
          className="
            w-full h-[380px] object-cover
            [filter:saturate(0.92)_contrast(0.92)]
            scale-[1.02]
          "
        />
      </div>

      {/* Google ストリートビュー */}
      <div className="mt-[6vh] text-center">
        <a
          href="https://www.google.com/local/place/fid/0x34e56b00429d0c43:0xbc868126ad96636a/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3DHkQ1lQM_aPzh3RonnV-CcA%26cb_client%3Dsearch.gws-prod.gps%26yaw%3D123.6326%26pitch%3D0%26thumbfov%3D100%26w%3D0%26h%3D0&ik=CAISFkhrUTFsUU1fYVB6aDNSb25uVi1DY0E%3D&sa=X&sqi=2&ved=2ahUKEwjGpLCQ19GSAxXVklYBHTKKMeMQpx96BAhOEBI"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block mt-4
            text-[14px] text-[rgba(96,78,62,0.65)]
            underline underline-offset-4
            hover:text-[rgba(96,78,62,0.85)]
            transition-colors
          "
        >
          Google ストリートビュー（360°）を見る →
        </a>
      </div>

      {/* サロン強み */}
      <div className="mt-[10vh] text-center text-[14px] text-[rgba(96,78,62,0.65)] leading-[1.8]">
        <p>口コミ評価 ★5.00（56件）</p>
        <p>完全マンツーマン・半個室サロン</p>
        <p>朝7時OPEN / メンズ専門</p>
      </div>
    </section>
  );
}
