import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="https://isuremedia.com/wp-content/uploads/2022/07/Isuremedia-logo.webp"
              alt="iSure Media"
              className="h-12 mb-4 brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80">
              Transparent pricing for exceptional digital marketing and technical services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("ppc")}
                  className="hover:text-accent transition-smooth"
                >
                  PPC Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("smm")}
                  className="hover:text-accent transition-smooth"
                >
                  Social Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("seo")}
                  className="hover:text-accent transition-smooth"
                >
                  SEO Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ghl")}
                  className="hover:text-accent transition-smooth"
                >
                  GoHighLevel
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("custom")}
                  className="hover:text-accent transition-smooth"
                >
                  Custom Development
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Ready to grow your digital presence?
            </p>
            <Button
              variant="accent"
              onClick={() => scrollToSection("custom")}
              className="w-full"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2025 iSure Media. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-smooth">
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
