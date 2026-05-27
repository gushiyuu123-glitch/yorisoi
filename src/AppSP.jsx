import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import HashScroll from "./components/HashScroll";
import Seo from "./components/Seo"; // ✅ 追加

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
import NewsTopSP from "./pages_sp/NewsTopSP";
import NewsListSP from "./pages_sp/NewsListSP";
import NewsDetailSP from "./pages_sp/NewsDetailSP";

// ---- Floating UI ----
import LogoYorisoiFloatingSP from "./components_sp/LogoYorisoiFloatingSP";
import NavYorisoiFloatingSP from "./components_sp/NavYorisoiFloatingSP";
import ReserveFloatingSP from "./components_sp/ReserveFloatingSP";

export default function AppSP() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScroll />

      <main className="relative">
        <LogoYorisoiFloatingSP />
        <ReserveFloatingSP />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo
                  title="浦添のメンズ専門理容室。朝7時から。"
                  description="沖縄県浦添市内間のメンズ専門理容室ヨリソイ Hair＆Spa。静かで落ち着く1対1の空間で、似合わせ×再現性を重視したメンズカット。フェード/パーマ/シェービング/ヘッドスパ対応。駐車場あり。"
                  path="/"
                />

                <section id="home">
                  <HeroSP />
                </section>

                <NavYorisoiFloatingSP />

                <section id="about">
                  <AboutSP />
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

                <section id="menu">
                  <MenuSP />
                </section>

                <section id="gallery">
                  <HareStyleSP />
                </section>

                <section id="review">
                  <ReviewSP />
                </section>
{/* ✅ 追加：FAQ（Accessの前） */}
<section id="faq">
  <FAQSP />
</section>

                <section id="access">
                  <AccessSP />
                </section>

                {/* ✅ wrapperにidがあるので、FinalCTA_SP側にid reserveは持たせない */}
                <section id="reserve">
                  <FinalCTA_SP />
                </section>

                <FooterSP />
              </>
            }
          />

          <Route
            path="/news"
            element={
              <>
                <Seo
                  title="NEWS"
                  description="ヨリソイの営業情報・空き状況・お知らせをまとめています。"
                  path="/news"
                />
                <NewsListSP />
              </>
            }
          />

          <Route path="/news/:id" element={<NewsDetailSP />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}