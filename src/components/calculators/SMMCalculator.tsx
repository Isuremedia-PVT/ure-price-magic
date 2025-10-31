import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const SMMCalculator = () => {
  const [postsPerWeek, setPostsPerWeek] = useState(2);
  const [carouselsPerWeek, setCarouselsPerWeek] = useState(1);
  const [storiesPerWeek, setStoriesPerWeek] = useState(2);
  const [longVideos, setLongVideos] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "Facebook", "YouTube"]);
  const [includeGMB, setIncludeGMB] = useState(false);

  const basePrice = 500;
  const basePosts = 2;
  const baseCarousels = 1;
  const baseStories = 2;
  const additionalPlatformPrice = 100;
  const gmbPrice = 100;
  const longVideoPrice = 75;
  
  const getPostsCost = () => {
    const extraPosts = Math.max(0, postsPerWeek - basePosts);
    return extraPosts * 40;
  };
  
  const getCarouselsCost = () => {
    const extraCarousels = Math.max(0, carouselsPerWeek - baseCarousels);
    return extraCarousels * 60;
  };
  
  const getStoriesCost = () => {
    const extraStories = Math.max(0, storiesPerWeek - baseStories);
    return extraStories * 20;
  };

  const getLongVideosCost = () => {
    return longVideos * longVideoPrice;
  };

  const platforms = [
    { id: "Instagram", name: "Instagram", included: true },
    { id: "Facebook", name: "Facebook/Meta", included: true },
    { id: "YouTube", name: "YouTube", included: true },
    { id: "Twitter", name: "Twitter/X", included: false },
    { id: "LinkedIn", name: "LinkedIn", included: false },
    { id: "TikTok", name: "TikTok", included: false },
    { id: "Pinterest", name: "Pinterest", included: false },
    { id: "Threads", name: "Threads", included: false },
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
  const longVideosAddOn = getLongVideosCost();
  const gmbAddOn = includeGMB ? gmbPrice : 0;
  const totalPrice = basePrice + contentAddOns + platformAddOns + longVideosAddOn + gmbAddOn;

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
                Starting at $500/month
              </CardDescription>
              <div className="p-4 bg-muted/30 rounded-lg mt-4">
                <div className="text-sm font-medium mb-2">Base Package Includes:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ 3 Platforms (Instagram, Facebook, YouTube)</li>
                  <li>✓ 2 Posts per week</li>
                  <li>✓ 1 Carousel/Reel per week</li>
                  <li>✓ 2 Stories per week</li>
                  <li>✓ Content creation and scheduling</li>
                  <li>✓ Community management</li>
                  <li>✓ Monthly performance reports</li>
                </ul>
              </div>
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

              <div className="border-t pt-6 mt-6">
                <div className="flex items-start space-x-3 p-4 border rounded-lg bg-secondary/20">
                  <Checkbox
                    id="gmb"
                    checked={includeGMB}
                    onCheckedChange={(checked) => setIncludeGMB(checked as boolean)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="gmb"
                      className="text-base font-semibold leading-none cursor-pointer flex items-center gap-2"
                    >
                      📍 Google My Business (GMB) Optimization
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        +$100/mo
                      </Badge>
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete GMB profile optimization, reputation management, review responses, and monthly reporting
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="posts" className="text-base">Posts per Week</Label>
                  <span className="text-sm font-semibold">
                    {postsPerWeek} {postsPerWeek > basePosts && <span className="text-accent">(+{postsPerWeek - basePosts})</span>}
                  </span>
                </div>
                <Slider
                  id="posts"
                  min={2}
                  max={10}
                  step={1}
                  value={[postsPerWeek]}
                  onValueChange={(value) => setPostsPerWeek(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Base: 2 posts included • +$40 per additional post/week
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="carousels" className="text-base">Carousel/Reels per Week</Label>
                  <span className="text-sm font-semibold">
                    {carouselsPerWeek} {carouselsPerWeek > baseCarousels && <span className="text-accent">(+{carouselsPerWeek - baseCarousels})</span>}
                  </span>
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
                  Base: 1 carousel included • +$60 per additional carousel/week
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="stories" className="text-base">Stories per Week</Label>
                  <span className="text-sm font-semibold">
                    {storiesPerWeek} {storiesPerWeek > baseStories && <span className="text-accent">(+{storiesPerWeek - baseStories})</span>}
                  </span>
                </div>
                <Slider
                  id="stories"
                  min={2}
                  max={15}
                  step={1}
                  value={[storiesPerWeek]}
                  onValueChange={(value) => setStoriesPerWeek(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Base: 2 stories included • +$20 per additional story/week
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="longVideos" className="text-base">YouTube Long Videos (up to 3 min)</Label>
                  <span className="text-sm font-semibold">{longVideos} videos</span>
                </div>
                <Slider
                  id="longVideos"
                  min={0}
                  max={12}
                  step={1}
                  value={[longVideos]}
                  onValueChange={(value) => setLongVideos(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  $75 per video • Includes basic editing, intro/outro
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Package (3 platforms, standard content)</span>
                    <span className="font-semibold">${basePrice}</span>
                  </div>
                  {platformAddOns > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Additional Platforms ({additionalPlatforms} × $100)</span>
                      <span className="font-semibold">+${platformAddOns}</span>
                    </div>
                  )}
                  {getPostsCost() > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Extra Posts ({postsPerWeek - basePosts} × $40/week)</span>
                      <span className="font-semibold">+${getPostsCost()}</span>
                    </div>
                  )}
                  {getCarouselsCost() > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Extra Reels/Carousels ({carouselsPerWeek - baseCarousels} × $60/week)</span>
                      <span className="font-semibold">+${getCarouselsCost()}</span>
                    </div>
                  )}
                  {getStoriesCost() > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Extra Stories ({storiesPerWeek - baseStories} × $20/week)</span>
                      <span className="font-semibold">+${getStoriesCost()}</span>
                    </div>
                  )}
                  {longVideosAddOn > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Long-Form Videos ({longVideos} × $75)</span>
                      <span className="font-semibold">+${longVideosAddOn}</span>
                    </div>
                  )}
                  {gmbAddOn > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">GMB Optimization & Reputation Management</span>
                      <span className="font-semibold">+${gmbAddOn}</span>
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
