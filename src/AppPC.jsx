import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import HashScroll from "./components/HashScroll";
import Seo from "./components/Seo"; // ✅ 追加

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

export default function AppPC() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScroll />

      <main>
        <LogoYorisoiFloating />
        <ReserveFloating />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* ✅ TOPのSEO（KWは本文でも効くが、headも強くする） */}
                <Seo
                  title="浦添のメンズ専門理容室。朝7時から。"
                  description="沖縄県浦添市内間のメンズ専門理容室ヨリソイ Hair＆Spa。静かで落ち着く1対1の空間で、似合わせ×再現性を重視したメンズカット。フェード/パーマ/シェービング/ヘッドスパ対応。駐車場あり。"
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

                {/* ✅ ここにidがあるので、FinalCTA側にid reserveは持たせない */}
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
                  description="ヨリソイの営業情報・空き状況・お知らせをまとめています。"
                  path="/news"
                />
                <NewsList />
              </>
            }
          />

          {/* ✅ 詳細は NewsDetail 内で動的にSeoを出す（次の章） */}
          <Route path="/news/:id" element={<NewsDetail />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}