import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CertificationBadges from "./CertificationBadges";

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            B2B White Label Digital Marketing Agency
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-2xl">
            Transparent, Flexible Pricing for Growing Agencies
          </p>

          <CertificationBadges />

          <p className="text-md text-primary-foreground/70 mb-10 max-w-2xl">
            Customize your package and see pricing in real-time. No hidden fees, no surprises—just clear, honest pricing
            for exceptional digital marketing services.
          </p>

          <Button onClick={scrollToServices} variant="accent" size="lg" className="text-lg px-8 py-6 h-auto">
            Explore Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
