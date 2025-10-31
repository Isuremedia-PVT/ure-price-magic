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
    <section id="seo" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SEO Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive search engine optimization to improve your rankings and drive organic traffic.
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Build Your SEO Package</CardTitle>
              <CardDescription>
                Base package starts at $350/month with 8 keywords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="keywords" className="text-base">Number of Keywords</Label>
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
                  <Label htmlFor="blogs" className="text-base">Monthly Blog Posts (300-500 words each)</Label>
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

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-semibold mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Keyword research and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>On-page SEO improvements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Technical SEO audit and fixes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Monthly performance reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Competitor analysis</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Package (8 keywords):</span>
                    <span className="font-semibold">${basePrice}</span>
                  </div>
                  {additionalKeywords > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Additional Keywords ({additionalKeywords}):
                      </span>
                      <span className="font-semibold">+${keywordCost}</span>
                    </div>
                  )}
                  {blogPosts > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Blog Posts ({blogPosts}):
                      </span>
                      <span className="font-semibold">+${blogCost}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Monthly Price:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${totalPrice.toLocaleString()}/month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" onClick={() => setFormOpen(true)}>
                Get Started with SEO
              </Button>
            </CardContent>
          </Card>
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
