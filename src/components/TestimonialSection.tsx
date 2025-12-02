import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialSectionProps {
  serviceType?: string;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ serviceType }) => {
  const scrollToTestimonials = () => {
    const testimonialsSection = document.querySelector("#testimonials-main");
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <button
            onClick={scrollToTestimonials}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-medium hover:shadow-xl"
          >
            View All Success Stories →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
