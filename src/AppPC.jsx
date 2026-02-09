// src/AppPC.jsx
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

export default function AppPC() {
  return (
    <main className="scroll-smooth">
      <LogoYorisoiFloating />
      <ReserveFloating />

      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="profile"><Profile /></section>
      <section id="concept"><Concept /></section>
      <section id="menu"><Menu /></section>
      <section id="gallery"><Gallery /></section>
      <section id="review"><Review /></section>
      <section id="access"><Access /></section>
      <section id="reserve"><FinalCTA /></section>
      <Footer />
    </main>
  );
}
