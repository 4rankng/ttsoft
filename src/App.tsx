import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Principles } from './components/Principles';
import { Services } from './components/Services';
import { Solutions } from './components/Solutions';
import { Process } from './components/Process';
import { Stack } from './components/Stack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useReveal, useScrollProgress } from './hooks';

export default function App() {
  // Drives scroll progress bar + header is-scrolled state.
  useScrollProgress();
  // Wires reveal-on-scroll for every `.reveal` node.
  useReveal();

  // Ensure the document language stays Vietnamese (defensive against any
  // stray tooling that might rewrite <html lang>).
  useEffect(() => {
    document.documentElement.lang = 'vi';
  }, []);

  return (
    <>
      <Header />
      <main id="noi-dung">
        <Hero />
        <Principles />
        <Services />
        <Solutions />
        <Process />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
