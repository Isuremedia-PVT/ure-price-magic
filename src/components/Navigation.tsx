import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <img
            src="https://isuremedia.com/wp-content/uploads/2022/07/Isuremedia-logo.webp"
            alt="iSure Media"
            className="h-10 md:h-12"
          />
          
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("ppc")}
              className="text-sm font-medium hover:text-accent transition-smooth"
            >
              PPC
            </button>
            <button
              onClick={() => scrollToSection("smm")}
              className="text-sm font-medium hover:text-accent transition-smooth"
            >
              Social Media
            </button>
            <button
              onClick={() => scrollToSection("seo")}
              className="text-sm font-medium hover:text-accent transition-smooth"
            >
              SEO
            </button>
            <button
              onClick={() => scrollToSection("ghl")}
              className="text-sm font-medium hover:text-accent transition-smooth"
            >
              GoHighLevel
            </button>
            <button
              onClick={() => scrollToSection("custom")}
              className="text-sm font-medium hover:text-accent transition-smooth"
            >
              Custom Dev
            </button>
            
            <Button
              onClick={() => scrollToSection("custom")}
              variant="hero"
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
