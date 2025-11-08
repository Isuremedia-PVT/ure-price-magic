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
    <section className="py-24 gradient-subtle relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-primary">Client Success Stories</span>
            <Star className="w-4 h-4 fill-accent text-accent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
            Trusted by <span className="text-gradient">Agencies & Businesses</span> Worldwide
          </h2>
          <div className="w-24 h-1.5 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how we've helped businesses scale their digital marketing services
          </p>
        </div>

        {/* Video Testimonial */}
        <div className="max-w-5xl mx-auto mb-20 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full shadow-xl rounded-3xl overflow-hidden border-4 border-primary/10" 
               style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ARaEiSO5tXE"
              title="Client Success Story - Digital Marketing Agency Partnership"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} 
                 className="fade-in-up" 
                 style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <Card className="h-full shadow-medium hover:shadow-xl border-2 border-border/50 hover:border-primary/20 bg-gradient-card card-hover group">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-accent/10 group-hover:text-accent/20 transition-smooth">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} - ${testimonial.title}`}
                        className="relative w-20 h-20 rounded-full object-cover border-4 border-background shadow-medium"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{testimonial.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-lg italic leading-relaxed relative z-10">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
