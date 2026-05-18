import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { Products } from "../components/products";
import { AiProducts } from "../components/ai-products";
import { Services } from "../components/services";
import { HowWeWork } from "../components/how-we-work";
import { Clients } from "../components/clients";
import { TechStack } from "../components/tech-stack";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Background effects */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 line-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Products />
        <AiProducts />
        <Services />
        <HowWeWork />
        <Clients />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
