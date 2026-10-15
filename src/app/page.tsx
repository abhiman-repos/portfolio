import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="top">
        <ScrollVideoHero />
        <Work />
      </main>
      <Contact />
    </>
  );
}
