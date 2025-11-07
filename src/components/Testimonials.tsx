import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
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
  ];

  return (
    <section className="py-20 bg-background-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Trusted by Agencies & Businesses Worldwide
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses grow
          </p>
        </div>

        {/* Video Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative w-full shadow-strong rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ARaEiSO5tXE"
              title="Client Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-strong border-2 border-border bg-card card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
