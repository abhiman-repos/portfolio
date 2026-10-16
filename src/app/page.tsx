import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Header />
      <main id="top">
        <ScrollVideoHero />
        <Skills />
        <Work />
      </main>
      <Contact />
    </>
  );
}
