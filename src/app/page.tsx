'use client'
import StickyNavigation from "./components/StickyNavigation";
import HeroSection from "./components/HeroSection";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main>
      <StickyNavigation />
      <HeroSection />
      <EventsSection />
      <Footer />
    </main>
  );
}