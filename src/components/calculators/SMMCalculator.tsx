import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const SMMCalculator = () => {
  const [postsPerWeek, setPostsPerWeek] = useState(4);
  const [carouselsPerWeek, setCarouselsPerWeek] = useState(2);
  const [storiesPerWeek, setStoriesPerWeek] = useState(4);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "Facebook"]);

  const basePrice = 800;
  const additionalPlatformPrice = 150;
  
  const getPostsCost = () => {
    const extraPosts = Math.max(0, postsPerWeek - 5);
    return extraPosts * 50;
  };
  
  const getCarouselsCost = () => {
    const extraCarousels = Math.max(0, carouselsPerWeek - 2);
    return extraCarousels * 75;
  };
  
  const getStoriesCost = () => {
    const extraStories = Math.max(0, storiesPerWeek - 4);
    return extraStories * 25;
  };

  const platforms = [
    { id: "Instagram", name: "Instagram", included: true },
    { id: "Facebook", name: "Facebook/Meta", included: true },
    { id: "YouTube", name: "YouTube", included: false },
    { id: "Twitter", name: "Twitter/X", included: false },
    { id: "LinkedIn", name: "LinkedIn", included: false },
    { id: "TikTok", name: "TikTok", included: false },
  ];

  const togglePlatform = (platformId: string, included: boolean) => {
    if (included) {
      return; // Can't remove included platforms
    }
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const additionalPlatforms = selectedPlatforms.filter(
    p => !platforms.find(pl => pl.id === p && pl.included)
  ).length;
  
  const contentAddOns = getPostsCost() + getCarouselsCost() + getStoriesCost();
  const platformAddOns = additionalPlatforms * additionalPlatformPrice;
  const totalPrice = basePrice + contentAddOns + platformAddOns;

  return (
    <section id="smm" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive social media management with content creation, scheduling, and community engagement.
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Customize Your SMM Package</CardTitle>
              <CardDescription>
                Base package starts at $800/month (Instagram + Facebook)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="text-base mb-4 block">Select Platforms</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={platform.id}
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={() => togglePlatform(platform.id, platform.included)}
                        disabled={platform.included}
                      />
                      <label
                        htmlFor={platform.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {platform.name}
                        {platform.included && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Included
                          </Badge>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="posts" className="text-base">Posts per Week</Label>
                  <span className="text-sm font-semibold">{postsPerWeek}</span>
                </div>
                <Slider
                  id="posts"
                  min={3}
                  max={10}
                  step={1}
                  value={[postsPerWeek]}
                  onValueChange={(value) => setPostsPerWeek(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Base: 3-5 posts • +$50 per additional post/week
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="carousels" className="text-base">Carousel/Reels per Week</Label>
                  <span className="text-sm font-semibold">{carouselsPerWeek}</span>
                </div>
                <Slider
                  id="carousels"
                  min={1}
                  max={5}
                  step={1}
                  value={[carouselsPerWeek]}
                  onValueChange={(value) => setCarouselsPerWeek(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Base: 1-2 posts • +$75 per additional carousel/week
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="stories" className="text-base">Stories per Week</Label>
                  <span className="text-sm font-semibold">{storiesPerWeek}</span>
                </div>
                <Slider
                  id="stories"
                  min={3}
                  max={15}
                  step={1}
                  value={[storiesPerWeek]}
                  onValueChange={(value) => setStoriesPerWeek(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Base: 3-4 stories • +$25 per additional story/week
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Package:</span>
                    <span className="font-semibold">${basePrice}</span>
                  </div>
                  {contentAddOns > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Content Add-ons:</span>
                      <span className="font-semibold">+${contentAddOns}</span>
                    </div>
                  )}
                  {platformAddOns > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Additional Platforms:</span>
                      <span className="font-semibold">+${platformAddOns}</span>
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

              <Button variant="hero" size="lg" className="w-full">
                Get Started with Social Media
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SMMCalculator;
