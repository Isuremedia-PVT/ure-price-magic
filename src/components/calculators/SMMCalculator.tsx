import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const SMMCalculator = () => {
  const [postsPerWeek, setPostsPerWeek] = useState(2);
  const [carouselsPerWeek, setCarouselsPerWeek] = useState(1);
  const [storiesPerWeek, setStoriesPerWeek] = useState(2);
  const [longVideos, setLongVideos] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "Facebook", "YouTube"]);
  const [includeGMB, setIncludeGMB] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formServiceData, setFormServiceData] = useState<ServiceData | null>(null);

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

  const handleGetStarted = () => {
    const serviceData: ServiceData = {
      serviceType: "Social Media Management",
      basePackage: basePrice,
      platforms: selectedPlatforms.join(","),
      platformCount: selectedPlatforms.length,
      postsPerWeek: postsPerWeek,
      reelsPerWeek: carouselsPerWeek,
      storiesPerWeek: storiesPerWeek,
      longVideos: longVideos,
      gmbAddon: includeGMB,
      monthlyTotal: totalPrice,
      smmBreakdown: {
        basePrice,
        postsPerWeek,
        postsCost: getPostsCost(),
        carouselsPerWeek,
        carouselsCost: getCarouselsCost(),
        storiesPerWeek,
        storiesCost: getStoriesCost(),
        longVideos,
        longVideosCost: getLongVideosCost(),
        platformAddOns,
        additionalPlatforms,
        gmbAddOn,
        includeGMB,
      },
    };
    setFormServiceData(serviceData);
    setFormOpen(true);
  };

  return (
    <section id="smm" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive social media management with content creation, scheduling, and community engagement.
            </p>
          </div>

          {/* Split-screen layout: 70% left controls + 30% right summary */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 max-w-[1400px] mx-auto">
            {/* LEFT SECTION - Calculator Controls (70%) */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Customize Your SMM Package</CardTitle>
                <CardDescription className="text-base">
                  Starting at $500/month
                </CardDescription>
                <div className="p-6 bg-secondary/20 rounded-lg mt-6">
                  <div className="text-base font-semibold mb-3">Base Package Includes:</div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start"><span className="mr-2">✓</span>3 Platforms (Instagram, Facebook, YouTube)</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>2 Posts per week</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>1 Carousel/Reel per week</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>2 Stories per week</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Content creation and scheduling</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Community management</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Monthly performance reports</li>
                  </ul>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base mb-4 block font-semibold">Select Platforms</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((platform) => (
                        <label 
                          key={platform.id} 
                          htmlFor={platform.id}
                          className={`flex items-center space-x-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedPlatforms.includes(platform.id) ? 'bg-secondary/30 border-accent' : 'hover:bg-secondary/10'
                          } ${platform.included ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                          <Checkbox
                            id={platform.id}
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={() => togglePlatform(platform.id, platform.included)}
                            disabled={platform.included}
                          />
                          <span className="text-sm font-medium leading-none flex-1">
                            {platform.name}
                            {platform.included && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Included
                              </Badge>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <label
                      htmlFor="gmb"
                      className="flex items-start space-x-3 p-4 border-2 rounded-lg bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors"
                    >
                      <Checkbox
                        id="gmb"
                        checked={includeGMB}
                        onCheckedChange={(checked) => setIncludeGMB(checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="text-base font-semibold leading-none flex items-center gap-2">
                          📍 Google My Business (GMB) Optimization
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            +$100/mo
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Complete GMB profile optimization, reputation management, review responses, and monthly reporting
                        </p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="posts" className="text-base font-semibold">Posts per Week</Label>
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
                      <Label htmlFor="carousels" className="text-base font-semibold">Carousel/Reels per Week</Label>
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
                      <Label htmlFor="stories" className="text-base font-semibold">Stories per Week</Label>
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
                      <Label htmlFor="longVideos" className="text-base font-semibold">YouTube Long Videos (up to 3 min)</Label>
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
                </div>
              </CardContent>
            </Card>

            {/* RIGHT SECTION - Sticky Package Summary (30%) */}
            <div className="lg:sticky lg:top-24 lg:self-start h-fit">
              <Card className="shadow-medium border-2">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-primary-dark mb-6">Package Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-sm">Base Package</span>
                      <span className="font-semibold text-primary-dark">${basePrice}</span>
                    </div>
                    
                    {platformAddOns > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Additional Platforms ({additionalPlatforms})</span>
                        <span className="font-semibold text-accent">+${platformAddOns}</span>
                      </div>
                    )}
                    
                    {getPostsCost() > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Extra Posts</span>
                        <span className="font-semibold text-accent">+${getPostsCost()}</span>
                      </div>
                    )}
                    
                    {getCarouselsCost() > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Extra Reels/Carousels</span>
                        <span className="font-semibold text-accent">+${getCarouselsCost()}</span>
                      </div>
                    )}
                    
                    {getStoriesCost() > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Extra Stories</span>
                        <span className="font-semibold text-accent">+${getStoriesCost()}</span>
                      </div>
                    )}
                    
                    {longVideosAddOn > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">Long-Form Videos ({longVideos})</span>
                        <span className="font-semibold text-accent">+${longVideosAddOn}</span>
                      </div>
                    )}
                    
                    {gmbAddOn > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm">GMB Optimization</span>
                        <span className="font-semibold text-accent">+${gmbAddOn}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t-2 pt-4 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-base font-semibold">Total Monthly:</span>
                      <span className="text-3xl font-bold text-accent">
                        ${totalPrice.toLocaleString()}/mo
                      </span>
                    </div>

                    <Button variant="hero" size="lg" className="w-full" onClick={handleGetStarted}>
                      Get Started with Social Media
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {formServiceData && (
        <ServiceForm
          open={formOpen}
          onOpenChange={setFormOpen}
          serviceData={formServiceData}
        />
      )}
    </section>
  );
};

export default SMMCalculator;
