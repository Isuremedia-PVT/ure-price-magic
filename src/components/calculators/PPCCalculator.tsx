import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const PPCCalculator = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Google Ads"]);
  const [platformBudgets, setPlatformBudgets] = useState<{[key: string]: number}>({"Google Ads": 5000});
  const [formOpen, setFormOpen] = useState(false);

  const setupFee = 350;
  
  const calculatePPCFee = (spend: number) => {
    let managementFee: number;
    let percentage: string;
    
    if (spend <= 2000) {
      managementFee = 250;
      percentage = "~12.5%";
    } else if (spend <= 5000) {
      managementFee = 400;
      percentage = "~8%";
    } else if (spend <= 10000) {
      managementFee = 400;
      percentage = "~4-8%";
    } else if (spend <= 15000) {
      managementFee = Math.max(600, spend * 0.06);
      percentage = "6%";
    } else if (spend <= 20000) {
      managementFee = Math.max(750, spend * 0.05);
      percentage = "5%";
    } else if (spend <= 50000) {
      managementFee = spend * 0.04;
      percentage = "4%";
    } else if (spend <= 75000) {
      managementFee = spend * 0.03;
      percentage = "3%";
    } else if (spend <= 100000) {
      managementFee = spend * 0.02;
      percentage = "2%";
    } else {
      managementFee = spend * 0.01;
      percentage = "1%";
    }
    
    return {
      managementFee: Math.round(managementFee),
      percentage: percentage,
      setupFee: 350,
      firstMonthTotal: Math.round(managementFee) + 350
    };
  };

  const platforms = [
    "Google Ads",
    "Meta Ads",
    "Google LSA",
    "YouTube Ads",
    "Snapchat Ads",
    "TikTok Ads",
    "LinkedIn Ads"
  ];

  const togglePlatform = (platform: string) => {
    if (!selectedPlatforms.includes(platform)) {
      // Adding a new platform
      const newPlatforms = [...selectedPlatforms, platform];
      setSelectedPlatforms(newPlatforms);
      // Initialize budget for new platform
      setPlatformBudgets({...platformBudgets, [platform]: 5000});
    }
  };

  const removePlatform = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newPlatforms = selectedPlatforms.filter(p => p !== platform);
    setSelectedPlatforms(newPlatforms);
    
    const newBudgets = {...platformBudgets};
    delete newBudgets[platform];
    setPlatformBudgets(newBudgets);
  };

  const setPlatformBudget = (platform: string, budget: number) => {
    setPlatformBudgets({...platformBudgets, [platform]: budget});
  };

  // Calculate pricing - always use separate budgets per platform
  const calculateTotalPricing = () => {
    if (selectedPlatforms.length === 0) return {
      totalMonthlyFee: 0,
      totalSetupFee: 0,
      baseManagementFee: 0,
      multiPlatformDiscount: 0,
      platformBreakdown: []
    };

    const breakdown = selectedPlatforms.map(platform => {
      const budget = platformBudgets[platform] || 5000;
      const fee = calculatePPCFee(budget);
      return {
        platform,
        adSpend: budget,
        managementFee: fee.managementFee,
        percentage: fee.percentage
      };
    });
    
    const baseTotal = breakdown.reduce((sum, p) => sum + p.managementFee, 0);
    const discount = selectedPlatforms.length > 1 ? (selectedPlatforms.length - 1) * 50 : 0;
    
    return {
      totalMonthlyFee: baseTotal - discount,
      totalSetupFee: setupFee * selectedPlatforms.length,
      baseManagementFee: baseTotal,
      multiPlatformDiscount: discount,
      platformBreakdown: breakdown
    };
  };

  const pricing = calculateTotalPricing();
  const { totalMonthlyFee, totalSetupFee, baseManagementFee, multiPlatformDiscount } = pricing;

  const handleGetStarted = () => {
    const totalAdSpend = selectedPlatforms.reduce((sum, platform) => 
      sum + (platformBudgets[platform] || 5000), 0
    );
    
    setFormOpen(true);
  };

  return (
    <section id="ppc" className="py-20 bg-background-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Calculate Your Advertisement Investment</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your monthly ad spend budget and platforms to see your pricing
            </p>
          </div>

          {/* Split-screen layout: 70% left controls + 30% right summary */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 max-w-[1400px] mx-auto">
            {/* LEFT SECTION - Calculator Controls (70%) */}
            <Card className="shadow-strong border-2 border-border bg-card card-hover">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Calculate Your Advertisement Investment</CardTitle>
                <CardDescription className="text-base">
                  Select your monthly ad spend budget and platforms to see your pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                <Label className="text-base mb-3 block">Choose Your Advertising Platform(s)</Label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => {
                    const isSelected = selectedPlatforms.includes(platform);
                    
                    let buttonStyle = {};
                    if (isSelected) {
                      // Selected - navy blue
                      buttonStyle = { 
                        backgroundColor: '#000047', 
                        color: '#ffffff',
                        borderColor: '#000047'
                      };
                    } else {
                      // Unselected - white with orange border
                      buttonStyle = { 
                        backgroundColor: '#ffffff', 
                        color: '#000047',
                        borderColor: '#faa033'
                      };
                    }
                    
                    return (
                      <button
                        key={platform}
                        className="relative cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 rounded-full border-2 font-medium"
                        style={buttonStyle}
                        onClick={() => togglePlatform(platform)}
                      >
                        {platform}
                        {isSelected && (
                          <span
                            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:opacity-80"
                            style={{ backgroundColor: '#faa033', color: '#ffffff' }}
                            onClick={(e) => removePlatform(platform, e)}
                          >
                            ×
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Click to select platforms. Each platform will have its own budget configuration.
                </p>
              </div>

              {/* Budget Configuration - Show for each selected platform */}
              {selectedPlatforms.length > 0 && (
                <div className="space-y-4">
                  {selectedPlatforms.map((platform) => (
                    <div key={platform} className="border rounded-lg p-4 bg-secondary/20">
                      <Label className="text-base mb-3 block">Budget Configuration for {platform}</Label>
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">{platform}</Label>
                        <span className="text-sm font-semibold">
                          ${(platformBudgets[platform] || 5000).toLocaleString()}/month
                        </span>
                      </div>
                      <Slider
                        min={1000}
                        max={150000}
                        step={1000}
                        value={[platformBudgets[platform] || 5000]}
                        onValueChange={(value) => setPlatformBudget(platform, value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                        <span>$1K</span>
                        <span>Management: ${calculatePPCFee(platformBudgets[platform] || 5000).managementFee}/month</span>
                        <span>$150K+</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </CardContent>
            </Card>

            {/* RIGHT SECTION - Sticky Package Summary (30%) */}
            <div className="lg:sticky lg:top-24 lg:self-start h-fit">
              <Card className="shadow-strong border-l-4 border-l-accent border-2 border-accent/30 bg-background-cream">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-primary mb-6">📊 Your Pricing Breakdown</h3>
                  
                  {selectedPlatforms.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">Please select a platform to see pricing</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-sm">Selected Platform(s)</span>
                          <span className="font-semibold text-primary-dark text-xs">{selectedPlatforms.join(", ")}</span>
                        </div>
                        
                        {pricing.platformBreakdown.map((p: any) => (
                          <div key={p.platform} className="pb-3 border-b">
                            <div className="font-medium text-sm mb-2">{p.platform}</div>
                            <div className="flex justify-between text-xs text-muted-foreground ml-3">
                              <span>Ad Spend:</span>
                              <span>${p.adSpend.toLocaleString()}/mo</span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground ml-3">
                              <span>Management:</span>
                              <span>${p.managementFee}/mo</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-sm">Setup Fee (one-time)</span>
                          <span className="font-semibold text-accent">+${totalSetupFee.toLocaleString()}</span>
                        </div>
                        
                        {multiPlatformDiscount > 0 && (
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-sm">Multi-Platform Discount</span>
                            <span className="font-semibold text-green-600">-${multiPlatformDiscount}/mo</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t-2 border-accent/30 pt-6 mt-6 bg-accent/5 -mx-6 px-6 pb-6 rounded-b-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-primary">💰 First Month:</span>
                          <span className="text-2xl font-bold text-accent">
                            ${(totalSetupFee + totalMonthlyFee).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-primary">💰 Monthly Ongoing:</span>
                          <span className="text-3xl font-bold text-accent">
                            ${totalMonthlyFee.toLocaleString()}/mo
                          </span>
                        </div>

                        {multiPlatformDiscount > 0 && (
                          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                            <p className="text-xs font-semibold text-accent">
                              🎉 Multi-Platform Discount Applied!
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Save $50/mo per additional platform
                            </p>
                          </div>
                        )}

                        <Button 
                          variant="hero" 
                          size="xl" 
                          className="w-full shadow-orange" 
                          onClick={handleGetStarted}
                        >
                          Get Started with Ads
                        </Button>
                      </div>
                    </>
                  )}
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
          serviceType: "PPC Management",
          platforms: selectedPlatforms.join(","),
          platformCount: selectedPlatforms.length,
          adSpend: selectedPlatforms.reduce((sum, platform) => sum + (platformBudgets[platform] || 5000), 0),
          setupFee: totalSetupFee,
          monthlyTotal: totalMonthlyFee,
          baseManagementFee: baseManagementFee,
          multiPlatformDiscount: multiPlatformDiscount,
          managementPercentage: pricing.platformBreakdown[0]?.percentage || "",
          platformBudgets: JSON.stringify(platformBudgets),
          platformBreakdown: JSON.stringify(pricing.platformBreakdown)
        }}
      />
    </section>
  );
};

export default PPCCalculator;
