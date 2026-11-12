import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Promo, Categories, Featured, Brands } from './components/Sections.jsx';
import { Socials, Newsletter, Footer } from './components/Footer.jsx';
import StoreFinder from './components/StoreFinder.jsx';

export default function App() {
  // Fade sections in as they enter the viewport.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <Promo />
        <Featured />
        <StoreFinder />
        <Brands />
        <Socials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
