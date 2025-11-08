import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CertificationBadges from "./CertificationBadges";

const Hero = () => {
  const scrollToGHL = () => {
    const ghlSection = document.getElementById("ghl");
    ghlSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="container mx-auto px-5 py-10 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-[28px] leading-tight sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 mt-12 md:mt-0 px-2">
            B2B White Label Digital Marketing Agency
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 max-w-2xl px-3">
            Transparent, Flexible Pricing for Growing Agencies
          </p>

          <CertificationBadges />

          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl px-3">
            Customize your package and see pricing in real-time. No hidden fees, no surprises—just clear, honest pricing
            for exceptional digital marketing services.
          </p>

          <Button 
            onClick={scrollToGHL} 
            variant="hero" 
            size="xl" 
            className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 h-auto w-[90%] max-w-xs md:max-w-md shadow-orange hover:shadow-strong"
          >
            Explore Services
            <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
