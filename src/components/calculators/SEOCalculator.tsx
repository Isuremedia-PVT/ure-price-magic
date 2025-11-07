import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const SEOCalculator = () => {
  const [keywords, setKeywords] = useState(8);
  const [blogPosts, setBlogPosts] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const basePrice = 350;
  const keywordPrice = 25;
  const blogPostPrice = 80;

  const additionalKeywords = Math.max(0, keywords - 8);
  const keywordCost = additionalKeywords * keywordPrice;
  const blogCost = blogPosts * blogPostPrice;
  const totalPrice = basePrice + keywordCost + blogCost;

  return (
    <section id="seo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">SEO Services</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive search engine optimization to improve your rankings and drive organic traffic.
            </p>
          </div>

          {/* Split-screen layout: 70% left controls + 30% right summary */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 max-w-[1400px] mx-auto">
            {/* LEFT SECTION - Calculator Controls (70%) */}
            <Card className="shadow-strong border-2 border-border bg-card card-hover">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Customize Your SEO Package</CardTitle>
                <CardDescription className="text-base">
                  Starting at $350/month
                </CardDescription>
                <div className="p-6 bg-secondary/20 rounded-lg mt-6">
                  <div className="text-base font-semibold mb-3">Base SEO Package Includes:</div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start"><span className="mr-2">✓</span>Keyword research and optimization</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>On-page SEO improvements</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Technical SEO audit and fixes</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Monthly performance reports</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Competitor analysis</li>
                  </ul>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="keywords" className="text-base font-semibold">Number of Keywords</Label>
                    <span className="text-sm font-semibold">{keywords} keywords</span>
                  </div>
                  <Slider
                    id="keywords"
                    min={8}
                    max={50}
                    step={1}
                    value={[keywords]}
                    onValueChange={(value) => setKeywords(value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Base: 8 keywords included • +$25 per additional keyword
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="blogs" className="text-base font-semibold">Monthly Blog Posts (300-500 words each)</Label>
                    <span className="text-sm font-semibold">{blogPosts} posts</span>
                  </div>
                  <Slider
                    id="blogs"
                    min={0}
                    max={12}
                    step={1}
                    value={[blogPosts]}
                    onValueChange={(value) => setBlogPosts(value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    300-500 words each • $80/post • SEO-optimized content
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT SECTION - Sticky Package Summary (30%) */}
            <div className="lg:sticky lg:top-24 lg:self-start h-fit">
              <Card className="shadow-strong border-l-4 border-l-accent border-2 border-accent/30 bg-background-cream">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-primary mb-6">Package Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm font-medium">Base Package (8 keywords)</span>
                      <span className="font-bold text-primary">${basePrice}</span>
                    </div>
                    
                    {additionalKeywords > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Additional Keywords ({additionalKeywords})</span>
                        <span className="font-semibold text-accent">+${keywordCost}</span>
                      </div>
                    )}
                    
                    {blogPosts > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Blog Posts ({blogPosts})</span>
                        <span className="font-semibold text-accent">+${blogCost}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t-2 border-accent/30 pt-6 mt-6 bg-accent/5 -mx-6 px-6 pb-6 rounded-b-lg">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-primary">Total Monthly:</span>
                      <span className="text-4xl font-bold text-accent">
                        ${totalPrice.toLocaleString()}/mo
                      </span>
                    </div>

                    <Button variant="hero" size="xl" className="w-full shadow-orange" onClick={() => setFormOpen(true)}>
                      Get Started with SEO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <ServiceForm
        open={formOpen}
        onOpenChange={setFormOpen}
        serviceData={{
          serviceType: "SEO Services",
          basePackage: basePrice,
          keywords: keywords,
          blogPosts: blogPosts,
          monthlyTotal: totalPrice,
        }}
      />
    </section>
  );
};

export default SEOCalculator;
