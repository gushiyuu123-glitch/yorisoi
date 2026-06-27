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
  "浦添・内間のメンズ専門理容室｜朝7時からメンズカット・パーマ・フェード｜ヨリソイ Hair＆Spa 公式";

const TOP_DESCRIPTION =
  "浦添市内間のメンズ専門理容室「ヨリソイ Hair＆Spa」公式サイト。朝7時から営業。メンズカット、フェード、メンズパーマ、眉シェービング、顔剃り、ヘッドスパ、白髪ぼかしに対応。那覇・宜野湾からも通いやすい、マンツーマン×半個室の理容室です。";

const NEWS_TITLE = "お知らせ・営業情報";

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
                appendSiteName={false}
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
                title={NEWS_TITLE}
                description={NEWS_DESCRIPTION}
                path="/news"
                breadcrumbs={[
                  { name: "ホーム", path: "/" },
                  { name: "お知らせ", path: "/news" },
                ]}
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