import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "ppc", label: "PPC" },
    { id: "smm", label: "Social Media" },
    { id: "seo", label: "SEO" },
    { id: "ghl", label: "GoHighLevel" },
    { id: "custom", label: "Custom Dev" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-smooth ${
        isScrolled
          ? "glass-card shadow-medium backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="cursor-pointer transition-spring hover:scale-105">
            <img
              src={
                isScrolled
                  ? "https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909d04aaa138d222aa92e78.webp"
                  : "https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909c977119a8222889c10da.png"
              }
              alt="iSure Media - B2B Digital Marketing Agency"
              className="h-12 md:h-14"
            />
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold hover:text-accent transition-spring relative group"
                style={{ color: isScrolled ? "#1A2E54" : "#ffffff" }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <Button
              onClick={() => scrollToSection("booking")}
              variant="hero"
              size="default"
              className="shadow-orange hover:scale-105 transition-spring"
            >
              Get Started
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:scale-110 transition-spring"
              >
                <Menu className="h-8 w-8" style={{ color: isScrolled ? "#1A2E54" : "#ffffff" }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-gradient-subtle">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-lg font-semibold text-left hover:text-accent transition-spring hover:translate-x-2"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("booking")}
                  variant="hero"
                  className="w-full mt-4"
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
