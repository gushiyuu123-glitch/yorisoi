// src/AppPC.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---- LP（固定ページ） ----
import Hero from "./sections/Hero";
import About from "./sections/About";
import Profile from "./sections/Profile";
import Concept from "./sections/Concept";
import Menu from "./sections/Menu";
import Gallery from "./sections/Gallery";
import Review from "./sections/Review";
import Access from "./sections/Access";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

import LogoYorisoiFloating from "./components/LogoYorisoiFloating";
import ReserveFloating from "./components/ReserveFloating";

// ---- NEWS ページ ----
import NewsTop from "./pages/NewsTop";      // トップ3件
import NewsList from "./pages/NewsList";    // 全件一覧
import NewsDetail from "./pages/NewsDetail"; // 詳細ページ

export default function AppPC() {
  return (
    <BrowserRouter>
      <main className="scroll-smooth">
        <LogoYorisoiFloating />
        <ReserveFloating />

        <Routes>
          {/* ================================
              LP（通常トップページ）
          ================================= */}
          <Route
            path="/"
            element={
              <>
                <section id="home"><Hero /></section>
                <section id="about"><About /></section>
                <section id="profile"><Profile /></section>
                <section id="news-top"><NewsTop /></section>
                <section id="concept"><Concept /></section>
                <section id="menu"><Menu /></section>
                <section id="gallery"><Gallery /></section>
                <section id="review"><Review /></section>
                <section id="access"><Access /></section>
                <section id="reserve"><FinalCTA /></section>
                <Footer />
              </>
            }
          />

          {/* ================================
              NEWS（一覧 / 詳細）
          ================================= */}
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
