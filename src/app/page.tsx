import Hero from "@/components/Hero";
import Memories from "@/components/Memories";
import Intermission from "@/components/Intermission";
import Observations from "@/components/Observations";
import OurLanguage from "@/components/OurLanguage";
import FinalLetter from "@/components/FinalLetter";

export default function Home() {
  return (
    <main className="paper-texture">
      <Hero />
      <Memories />
      <Intermission />
      <Observations />
      <OurLanguage />
      <FinalLetter />
    </main>
  );
}