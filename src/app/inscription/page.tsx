'use client'
import StickyNavigation from "../components/StickyNavigation";
import InscriptionPage from "./components/InscriptionPage";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main>
      <StickyNavigation />
      <InscriptionPage />
      <Footer />
    </main>
  );
}