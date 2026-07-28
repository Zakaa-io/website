import Navbar from "../components/Navbar";
import AIChatWidget from "../components/AIChatWidget";
import ParticleCanvas from "../components/ParticleCanvas";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import AIAgents from "../sections/AIAgents";
import Process from "../sections/Process";
import Testimonials from "../sections/Testimonials";
import Pricing from "../sections/Pricing";
import CTA from "../sections/CTA";
import Phase3Labs from "../sections/Phase3Labs";
import Footer from "../sections/Footer";
import BackToTopButton from "../components/BackToTopButton";

export default function ArabicHome() {
  return (
    <main dir="rtl" lang="ar" className="relative min-h-screen bg-[#0B1120] text-[#F8FAFC]">
      <ParticleCanvas />
      <div className="relative z-10">
        <Navbar locale="ar" />
        <Hero locale="ar" />
        <Services locale="ar" />
        <AIAgents locale="ar" />
        <Process locale="ar" />
        <Testimonials locale="ar" />
        <Pricing locale="ar" />
        <Phase3Labs />
        <CTA locale="ar" />
        <Footer locale="ar" />
      </div>
      <AIChatWidget initialLanguage="ar" />
      <BackToTopButton locale="ar" />
    </main>
  );
}
