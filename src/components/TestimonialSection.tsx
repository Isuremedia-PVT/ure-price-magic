import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialSectionProps {
  serviceType?: string;
}

const TestimonialSection = ({ serviceType = "This Service" }: TestimonialSectionProps) => {
  const testimonials = [
    {
      name: "David Goldstein",
      title: "Agency Owner",
      image: "https://gohighlevelexpertservice.com/hire/wp-content/uploads/2025/10/David-Goldstein.webp",
      quote: "Working with iSure Media has transformed how we deliver services to our clients. Their white label solutions are seamless and professional.",
      rating: 5,
    },
    {
      name: "Ken Herbert",
      title: "Marketing Director",
      image: "https://gohighlevelexpertservice.com/hire/wp-content/uploads/2025/10/Ken-Herbert.webp",
      quote: "The transparency in pricing and quality of work is unmatched. They've become an essential partner in our agency's growth.",
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      title: "Business Owner",
      image: "https://gohighlevelexpertservice.com/hire/wp-content/uploads/2025/10/David-Goldstein.webp",
      quote: "Outstanding results! The team consistently delivers high-quality work and excellent communication throughout every project.",
      rating: 5,
    },
  ];

  const scrollToTestimonials = () => {
    const testimonialsSection = document.querySelector('#testimonials-main');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">
            What Our Clients Say About {serviceType}
          </h3>
          <p className="text-muted-foreground">Real results from real clients</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-medium hover:shadow-xl border-2 border-border/50 hover:border-primary/20 bg-gradient-card card-hover group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.title}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-medium"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-primary">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

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
