import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CertificationBadges from "./CertificationBadges";

const Hero = () => {
  const scrollToGHL = () => {
    const ghlSection = document.getElementById("ghl");
    ghlSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground min-h-[85vh] flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--accent-foreground)) 2%, transparent 0%), 
                                radial-gradient(circle at 75px 75px, hsl(var(--accent-foreground)) 2%, transparent 0%)`,
               backgroundSize: '100px 100px'
             }} 
        />
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-primary-glow/20 rounded-full blur-[100px] animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-5 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Badge/Pill with Animation */}
          <div className="mb-6 md:mb-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ Agencies</span>
            </div>
          </div>

          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 px-2 fade-in-up" 
              style={{ animationDelay: '0.1s' }}>
            B2B White Label<br />
            <span className="text-gradient">Digital Marketing</span> Agency
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-8 max-w-3xl px-3 font-medium fade-in-up" 
             style={{ animationDelay: '0.2s' }}>
            Transparent, Flexible Pricing for Growing Agencies
          </p>

          <div className="mt-6 md:mt-0 mb-10 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CertificationBadges />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl px-3 leading-relaxed fade-in-up" 
             style={{ animationDelay: '0.4s' }}>
            Customize your package and see pricing in real-time. No hidden fees, no surprises—just clear, honest pricing
            for exceptional digital marketing services.
          </p>

          <div className="fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button 
              onClick={scrollToGHL} 
              variant="hero" 
              size="xl" 
              className="text-lg md:text-xl px-10 md:px-12 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Services
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
