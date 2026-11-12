import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { StackSection } from "@/components/stack-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <WorkSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
