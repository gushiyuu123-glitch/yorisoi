// src/AppSP.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Seo from "./components/Seo";

// ---- LP Sections ----
import HeroSP from "./sections_sp/HeroSP";
import AboutSP from "./sections_sp/AboutSP";
import ProfileSP from "./sections_sp/ProfileSP";
import ConceptSP from "./sections_sp/ConceptSP";
import MenuSP from "./sections_sp/MenuSP";
import HareStyleSP from "./sections_sp/HareStyleSP";
import ReviewSP from "./sections_sp/ReviewSP";
import AccessSP from "./sections_sp/AccessSP";
import FinalCTA_SP from "./sections_sp/FinalCTA_SP";
import FooterSP from "./sections_sp/FooterSP";
import FAQSP from "./sections_sp/FAQSP";

// ---- NEWS Pages ----
import NewsTopSP from "./pages_sp/NewsTopSP";
import NewsListSP from "./pages_sp/NewsListSP";
import NewsDetailSP from "./pages_sp/NewsDetailSP";

// ---- Floating UI ----
import LogoYorisoiFloatingSP from "./components_sp/LogoYorisoiFloatingSP";
import NavYorisoiFloatingSP from "./components_sp/NavYorisoiFloatingSP";
import ReserveFloatingSP from "./components_sp/ReserveFloatingSP";

const TOP_TITLE =
  "浦添・内間のメンズ専門理容室｜朝7時からメンズカット・パーマ・フェード｜ヨリソイ Hair＆Spa 公式";

const TOP_DESCRIPTION =
  "浦添市内間のメンズ専門理容室「ヨリソイ Hair＆Spa」公式サイト。朝7時から営業。メンズカット、フェード、メンズパーマ、眉シェービング、顔剃り、ヘッドスパ、白髪ぼかしに対応。那覇・宜野湾からも通いやすい、マンツーマン×半個室の理容室です。";

const NEWS_TITLE = "お知らせ・営業情報";

const NEWS_DESCRIPTION =
  "ヨリソイ Hair＆Spaの営業情報・メニュー・ホームページ更新などのお知らせを掲載しています。ご来店前の確認にご利用ください。";

export default function AppSP() {
  return (
    <main className="relative">
      <LogoYorisoiFloatingSP />
      <ReserveFloatingSP />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                title={TOP_TITLE}
                description={TOP_DESCRIPTION}
                path="/"
                appendSiteName={false}
              />

              <section id="home">
                <HeroSP />
              </section>

              <div data-sp-root>
                <NavYorisoiFloatingSP />

                <section id="about">
                  <AboutSP />
                </section>

                <section id="menu">
                  <MenuSP />
                </section>

                <section id="profile">
                  <ProfileSP />
                </section>

                <section id="news">
                  <NewsTopSP />
                </section>

                <section id="concept">
                  <ConceptSP />
                </section>

                <section id="gallery">
                  <HareStyleSP />
                </section>

                <section id="review">
                  <ReviewSP />
                </section>

                <section id="faq">
                  <FAQSP />
                </section>

                <section id="access">
                  <AccessSP />
                </section>

                <section id="reserve">
                  <FinalCTA_SP />
                </section>

                <FooterSP />
              </div>
            </>
          }
        />

        <Route
          path="/news"
          element={
            <>
              <Seo
                title={NEWS_TITLE}
                description={NEWS_DESCRIPTION}
                path="/news"
                breadcrumbs={[
                  { name: "ホーム", path: "/" },
                  { name: "お知らせ", path: "/news" },
                ]}
              />

              <NewsListSP />
            </>
          }
        />

        <Route path="/news/:id" element={<NewsDetailSP />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}