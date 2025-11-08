import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2%, transparent 0%), 
                                radial-gradient(circle at 75px 75px, currentColor 2%, transparent 0%)`,
               backgroundSize: '100px 100px'
             }} 
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
            <img
              src="https://isuremedia.com/wp-content/uploads/2022/07/Isuremedia-logo.webp"
              alt="iSure Media - Digital Marketing Agency"
              className="h-14 mb-6 brightness-0 invert mx-auto md:mx-0"
            />
            <p className="text-base text-primary-foreground/80 leading-relaxed mb-6">
              Transparent pricing for exceptional digital marketing and technical services.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://facebook.com/isuremedia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-spring hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/isuremedia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-spring hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/isuremedia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-spring hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li>
                <button
                  onClick={() => scrollToSection("ppc")}
                  className="hover:text-accent transition-spring hover:translate-x-1 inline-block"
                >
                  PPC Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("smm")}
                  className="hover:text-accent transition-spring hover:translate-x-1 inline-block"
                >
                  Social Media Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("seo")}
                  className="hover:text-accent transition-spring hover:translate-x-1 inline-block"
                >
                  SEO Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ghl")}
                  className="hover:text-accent transition-spring hover:translate-x-1 inline-block"
                >
                  GoHighLevel Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("custom")}
                  className="hover:text-accent transition-spring hover:translate-x-1 inline-block"
                >
                  Custom Development
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li>
                <a href="#" className="hover:text-accent transition-spring hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-spring hover:translate-x-1 inline-block">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-spring hover:translate-x-1 inline-block">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-spring hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-6">Get Started</h4>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Ready to transform your digital presence?
            </p>
            <Button
              variant="accent"
              onClick={() => scrollToSection("booking")}
              className="w-full mb-4 group"
            >
              Schedule Consultation
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>© 2025 iSure Media. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-spring">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-spring">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
