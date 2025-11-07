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
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md shadow-strong border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="cursor-pointer">
            <img
              src={
                isScrolled
                  ? "https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909d04aaa138d222aa92e78.webp"
                  : "https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909c977119a8222889c10da.png"
              }
              alt="iSure Media"
              className="h-10 md:h-12"
            />
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-accent transition-smooth"
                style={{ color: isScrolled ? "#000047" : "#ffffff" }}
              >
                {item.label}
              </button>
            ))}
            
            <Button
              onClick={() => scrollToSection("booking")}
              variant="hero"
              size="sm"
            >
              Get Started
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-10 w-10" style={{ color: isScrolled ? "#000047" : "#ffffff" }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-lg font-medium text-left hover:text-accent transition-smooth"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("booking")}
                  variant="hero"
                  className="w-full"
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
