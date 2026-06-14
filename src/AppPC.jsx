// src/AppPC.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Seo from "./components/Seo";

// ---- LP（固定ページ） ----
import Hero from "./sections/Hero";
import About from "./sections/About";
import Profile from "./sections/Profile";
import Concept from "./sections/Concept";
import Menu from "./sections/Menu";
import Gallery from "./sections/HareStyle";
import Review from "./sections/Review";
import Access from "./sections/Access";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";
import FAQ from "./sections/FAQ";

import LogoYorisoiFloating from "./components/LogoYorisoiFloating";
import ReserveFloating from "./components/ReserveFloating";

// ---- NEWS ページ ----
import NewsTop from "./pages/NewsTop";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";

const TOP_TITLE =
  "浦添・内間のメンズ専門理容室｜メンズカット・パーマ・朝7時から";

const TOP_DESCRIPTION =
  "沖縄県浦添市内間のメンズ専門理容室ヨリソイ Hair＆Spa。メンズカット、フェード、メンズパーマ、眉シェービング、顔剃り、ヘッドスパ、白髪ぼかしに対応。朝7時から、マンツーマン×半個室、駐車場あり。";

const NEWS_DESCRIPTION =
  "ヨリソイ Hair＆Spaの営業情報・メニュー・ホームページ更新などのお知らせを掲載しています。ご来店前の確認にご利用ください。";

export default function AppPC() {
  return (
    <main>
      <LogoYorisoiFloating />
      <ReserveFloating />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                title={TOP_TITLE}
                description={TOP_DESCRIPTION}
                path="/"
              />

              <section id="home">
                <Hero />
              </section>

              <section id="about">
                <About />
              </section>

              <section id="profile">
                <Profile />
              </section>

              <section id="news">
                <NewsTop />
              </section>

              <section id="concept">
                <Concept />
              </section>

              <section id="menu">
                <Menu />
              </section>

              <section id="gallery">
                <Gallery />
              </section>

              <section id="review">
                <Review />
              </section>

              <section id="faq">
                <FAQ />
              </section>

              <section id="access">
                <Access />
              </section>

              <section id="reserve">
                <FinalCTA />
              </section>

              <Footer />
            </>
          }
        />

        <Route
          path="/news"
          element={
            <>
              <Seo
                title="NEWS"
                description={NEWS_DESCRIPTION}
                path="/news"
              />
              <NewsList />
            </>
          }
        />

        <Route path="/news/:id" element={<NewsDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}