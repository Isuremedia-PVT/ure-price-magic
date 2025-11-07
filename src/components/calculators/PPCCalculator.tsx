import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const PPCCalculator = () => {
  const [adSpend, setAdSpend] = useState<number>(5000);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Google Ads"]);
  const [activePlatform, setActivePlatform] = useState<string | null>("Google Ads");
  const [budgetType, setBudgetType] = useState<"single" | "separate" | "combined">("single");
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
    if (selectedPlatforms.includes(platform)) {
      // Clicking on a selected platform - make it active
      setActivePlatform(platform);
    } else {
      // Adding a new platform
      const newPlatforms = [...selectedPlatforms, platform];
      setSelectedPlatforms(newPlatforms);
      // Initialize budget for new platform
      setPlatformBudgets({...platformBudgets, [platform]: 5000});
      // Set this as the active platform
      setActivePlatform(platform);
      // Set default budget type when first platform is selected
      if (newPlatforms.length === 1) {
        setBudgetType("combined");
      } else if (newPlatforms.length >= 2 && budgetType === "single") {
        setBudgetType("separate");
      }
    }
  };

  const removePlatform = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newPlatforms = selectedPlatforms.filter(p => p !== platform);
    setSelectedPlatforms(newPlatforms);
    
    const newBudgets = {...platformBudgets};
    delete newBudgets[platform];
    setPlatformBudgets(newBudgets);
    
    // If we removed the active platform, set another as active or null
    if (activePlatform === platform) {
      setActivePlatform(newPlatforms.length > 0 ? newPlatforms[0] : null);
    }
    
    // If only one platform left, switch to single mode
    if (newPlatforms.length <= 1) {
      setBudgetType("single");
    }
  };

  const setPlatformBudget = (platform: string, budget: number) => {
    setPlatformBudgets({...platformBudgets, [platform]: budget});
  };

  // Calculate pricing based on budget type
  const calculateTotalPricing = () => {
    if (selectedPlatforms.length === 0) return {
      totalMonthlyFee: 0,
      totalSetupFee: 0,
      baseManagementFee: 0,
      multiPlatformDiscount: 0,
      platformBreakdown: []
    };

    if (selectedPlatforms.length === 1 || budgetType === "single") {
      const singleFee = calculatePPCFee(adSpend);
      return {
        totalMonthlyFee: singleFee.managementFee,
        totalSetupFee: setupFee,
        baseManagementFee: singleFee.managementFee,
        multiPlatformDiscount: 0,
        platformBreakdown: [{
          platform: selectedPlatforms[0],
          adSpend: adSpend,
          managementFee: singleFee.managementFee,
          percentage: singleFee.percentage
        }]
      };
    }

    if (budgetType === "separate") {
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
      const discount = (selectedPlatforms.length - 1) * 50;
      return {
        totalMonthlyFee: baseTotal - discount,
        totalSetupFee: setupFee * selectedPlatforms.length,
        baseManagementFee: baseTotal,
        multiPlatformDiscount: discount,
        platformBreakdown: breakdown
      };
    }

    // Combined budget
    const totalBudget = adSpend;
    const baseFee = calculatePPCFee(totalBudget);
    const discount = (selectedPlatforms.length - 1) * 50;
    const perPlatformBudget = Math.floor(totalBudget / selectedPlatforms.length);
    const breakdown = selectedPlatforms.map(platform => ({
      platform,
      suggestedSpend: perPlatformBudget,
      adSpend: totalBudget
    }));
    
    return {
      totalMonthlyFee: baseFee.managementFee - discount,
      totalSetupFee: setupFee * selectedPlatforms.length,
      baseManagementFee: baseFee.managementFee,
      multiPlatformDiscount: discount,
      platformBreakdown: breakdown,
      percentage: baseFee.percentage
    };
  };

  const pricing = calculateTotalPricing();
  const { totalMonthlyFee, totalSetupFee, baseManagementFee, multiPlatformDiscount } = pricing;

  const handleGetStarted = () => {
    const serviceData: ServiceData = {
      serviceType: "PPC Management",
      platforms: selectedPlatforms.join(","),
      platformCount: selectedPlatforms.length,
      adSpend: adSpend,
      setupFee: totalSetupFee,
      monthlyTotal: totalMonthlyFee,
      baseManagementFee: baseManagementFee,
      multiPlatformDiscount: multiPlatformDiscount,
      managementPercentage: pricing.percentage || calculatePPCFee(adSpend).percentage,
      budgetType: budgetType,
      platformBudgets: budgetType === "separate" ? JSON.stringify(platformBudgets) : undefined,
      platformBreakdown: JSON.stringify(pricing.platformBreakdown)
    };
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
                    const isActive = platform === activePlatform;
                    
                    let buttonStyle = {};
                    if (isActive) {
                      // Currently active - orange
                      buttonStyle = { 
                        backgroundColor: '#faa033', 
                        color: '#ffffff',
                        borderColor: '#faa033'
                      };
                    } else if (isSelected) {
                      // Previously selected - dark blue
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
                            style={{ backgroundColor: isActive ? '#ffffff' : '#faa033', color: isActive ? '#faa033' : '#ffffff' }}
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
                  Click to select platforms. Click again to view/edit budget for that platform.
                </p>
              </div>

              {selectedPlatforms.length >= 2 && (
                <div className="border rounded-lg p-4 bg-secondary/20">
                  <Label className="text-base mb-3 block">Budget Configuration</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Do you have separate budgets for each platform, or one combined budget?
                  </p>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={budgetType === "separate" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setBudgetType("separate")}
                    >
                      Separate Budgets
                    </Button>
                    <Button
                      type="button"
                      variant={budgetType === "combined" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setBudgetType("combined")}
                    >
                      Combined Budget
                    </Button>
                  </div>
                </div>
              )}

              {/* Budget Configuration - Always show when there's an active platform */}
              {activePlatform && (
                <div className="border rounded-lg p-4 bg-secondary/20">
                  <Label className="text-base mb-3 block">Budget Configuration for {activePlatform}</Label>
                  {budgetType === "combined" && selectedPlatforms.length >= 2 ? (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <Label htmlFor="ad-spend" className="text-base">
                          Total Monthly Ad Spend Budget
                        </Label>
                        <span className="text-sm font-semibold">
                          ${adSpend.toLocaleString()}/month
                        </span>
                      </div>
                      <Slider
                        id="ad-spend"
                        min={1000}
                        max={150000}
                        step={1000}
                        value={[adSpend]}
                        onValueChange={(value) => setAdSpend(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>$1K</span>
                        <span>$150K+</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        We'll optimize allocation across {selectedPlatforms.length} platforms based on performance
                      </p>
                    </div>
                  ) : budgetType === "separate" && selectedPlatforms.length >= 2 ? (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-secondary/10">
                        <div className="flex justify-between items-center mb-3">
                          <Label className="font-medium">{activePlatform}</Label>
                          <span className="text-sm font-semibold">
                            ${(platformBudgets[activePlatform] || 5000).toLocaleString()}/month
                          </span>
                        </div>
                        <Slider
                          min={1000}
                          max={150000}
                          step={1000}
                          value={[platformBudgets[activePlatform] || 5000]}
                          onValueChange={(value) => setPlatformBudget(activePlatform, value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                          <span>$1K</span>
                          <span>Management: ${calculatePPCFee(platformBudgets[activePlatform] || 5000).managementFee}/month</span>
                          <span>$150K+</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Click on other platform buttons above to configure their budgets
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <Label htmlFor="ad-spend" className="text-base">
                          What's Your Monthly Ad Spend Budget?
                        </Label>
                        <span className="text-sm font-semibold">
                          ${adSpend.toLocaleString()}/month
                        </span>
                      </div>
                      <Slider
                        id="ad-spend"
                        min={1000}
                        max={150000}
                        step={1000}
                        value={[adSpend]}
                        onValueChange={(value) => setAdSpend(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>$1K</span>
                        <span>$150K+</span>
                      </div>
                    </div>
                  )}
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
                        
                        {budgetType === "separate" && selectedPlatforms.length >= 2 ? (
                          <>
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
                          </>
                        ) : (
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-sm">Monthly Ad Spend</span>
                            <span className="font-semibold text-primary-dark">${adSpend.toLocaleString()}</span>
                          </div>
                        )}
                        
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
                        {pricing.percentage && (
                          <p className="text-xs text-muted-foreground">
                            Management rate: {pricing.percentage}
                          </p>
                        )}

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
                          Get Started with PPC
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
          adSpend: adSpend,
          setupFee: totalSetupFee,
          monthlyTotal: totalMonthlyFee,
          baseManagementFee: baseManagementFee,
          multiPlatformDiscount: multiPlatformDiscount,
          managementPercentage: pricing.percentage || calculatePPCFee(adSpend).percentage,
          budgetType: budgetType,
          platformBreakdown: JSON.stringify(pricing.platformBreakdown)
        }}
      />
    </section>
  );
};

export default PPCCalculator;
