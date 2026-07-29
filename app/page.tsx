import Navbar from "./components/Navbar";
import BackToTopButton from "./components/BackToTopButton";
import AIChatWidget from "./components/AIChatWidget";
import ParticleCanvas from "./components/ParticleCanvas";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import AIAgents from "./sections/AIAgents";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import CTA from "./sections/CTA";
import Phase3Labs from "./sections/Phase3Labs";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06060a] text-[#e4e4e7]">
      <ParticleCanvas />
      <div className="relative z-10">
        <Navbar locale="en" />
        <Hero locale="en" />
        <Services locale="en" />
        <AIAgents locale="en" />
        <Process locale="en" />
        <Testimonials locale="en" />
        <Pricing locale="en" />
        <Phase3Labs />
        <CTA locale="en" />
        <Footer locale="en" />
      </div>
      <AIChatWidget initialLanguage="en" />
      <BackToTopButton locale="en" />
    </main>
  );
}
