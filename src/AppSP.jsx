// src/AppSP.jsx
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

import NewsSP from "./sections_sp/NewsSP.jsx";

import LogoYorisoiFloatingSP from "./components_sp/LogoYorisoiFloatingSP";
import NavYorisoiFloatingSP from "./components_sp/NavYorisoiFloatingSP";
import ReserveFloatingSP from "./components_sp/ReserveFloatingSP";

export default function AppSP() {
  return (
    <main className="scroll-smooth relative">

      {/* 予約 & ロゴ（最前面） */}
      <LogoYorisoiFloatingSP />
      <ReserveFloatingSP />

      {/* HERO */}
      <section id="home">
        <HeroSP />
      </section>

      {/* HERO のあとにナビ（スマホはここが自然） */}
      <NavYorisoiFloatingSP />

      {/* ABOUT */}
      <section id="about">
        <AboutSP />
      </section>

            <section id="profile">
        <ProfileSP />
      </section>

      <section id="news"><NewsSP /></section>

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
    </main>
  );
}
