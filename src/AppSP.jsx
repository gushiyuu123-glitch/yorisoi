// src/AppSP.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      <main className="scroll-smooth relative">
        {/* 予約 & ロゴ（最前面） */}
        <LogoYorisoiFloatingSP />
        <ReserveFloatingSP />

        <Routes>
          {/* ===============================
              SP トップページ（LP）
          =============================== */}
          <Route
            path="/"
            element={
              <>
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

                {/* ★ NEWSトップ3件（SP） */}
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

                <section id="access">
                  <AccessSP />
                </section>

                <section id="reserve">
                  <FinalCTA_SP />
                </section>

                <FooterSP />
              </>
            }
          />

          {/* ===============================
              NEWS 全件一覧 / 詳細ページ
          =============================== */}
          <Route path="/news" element={<NewsListSP />} />
          <Route path="/news/:id" element={<NewsDetailSP />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
