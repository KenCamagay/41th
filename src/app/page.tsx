import Hero from "@/components/Hero";
import Memories from "@/components/Memories";
import Intermission from "@/components/Intermission";
import Observations from "@/components/Observations";
import OurLanguage from "@/components/OurLanguage";
import FinalVoiceNote from "@/components/FinalVoiceNote";
import FloatingBackground from "@/components/FloatingBackground";

export default function Home() {
  return (
    <main className="paper-texture relative isolate">
      <FloatingBackground />

      <div className="relative z-10">
        <Hero />
        <Memories />
        <Intermission />
        <Observations />
        <OurLanguage />
        <FinalVoiceNote />
      </div>
    </main>
  );
}