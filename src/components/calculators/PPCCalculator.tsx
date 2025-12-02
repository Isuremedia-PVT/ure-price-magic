import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";
import TestimonialSection from "@/components/TestimonialSection";

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
      managementFee = Math.max(2250, spend * 0.02);
      percentage = "2%";
    } else {
      managementFee = Math.max(2250, spend * 0.01);
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
    <section id="ppc" className="py-24 gradient-subtle relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">PPC Management</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Calculate Your <span className="text-gradient">Advertisement</span> Investment
            </h2>
            <div className="w-24 h-1.5 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Select your monthly ad spend budget and platforms to see transparent, competitive pricing
            </p>
          </div>

          {/* Split-screen layout: 70% left controls + 30% right summary */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 max-w-[1400px] mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* LEFT SECTION - Calculator Controls (70%) */}
            <Card className="shadow-medium hover:shadow-xl border-2 border-border/50 hover:border-primary/20 bg-gradient-card card-hover">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold text-primary">Build Your Package</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Select your monthly ad spend budget and platforms to see your pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                <Label className="text-lg font-semibold mb-4 block text-primary">Choose Your Advertising Platform(s)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {platforms.map((platform) => {
                    const isSelected = selectedPlatforms.includes(platform);
                    
                    return (
                      <button
                        key={platform}
                        className={`relative cursor-pointer px-6 md:px-5 py-4 md:py-3 text-base md:text-sm font-semibold transition-spring rounded-xl border-2 min-h-[48px] ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground border-primary shadow-soft hover:shadow-medium scale-105' 
                            : 'bg-background text-primary border-accent/40 hover:border-accent hover:bg-accent/5 hover:scale-105'
                        }`}
                        onClick={() => togglePlatform(platform)}
                      >
                        {platform}
                        {isSelected && (
                          <span
                            className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-foreground hover:opacity-80 transition-smooth font-bold"
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
                <div className="space-y-5">
                  <Label className="text-lg font-semibold text-primary">Budget Configuration</Label>
                  {selectedPlatforms.map((platform) => (
                    <div key={platform} className="glass-card rounded-2xl p-6 border-2 border-border/30 hover:border-primary/30 transition-smooth">
                      <div className="flex justify-between items-center mb-4">
                        <Label className="font-bold text-primary">{platform}</Label>
                        <span className="text-lg font-bold text-accent">
                          ${(platformBudgets[platform] || 5000).toLocaleString()}/month
                        </span>
                      </div>
                      <Slider
                        min={1000}
                        max={150000}
                        step={1000}
                        value={[platformBudgets[platform] || 5000]}
                        onValueChange={(value) => setPlatformBudget(platform, value[0])}
                        className="w-full mb-3"
                      />
                      <div className="flex justify-between items-center text-sm text-muted-foreground mt-3">
                        <span className="font-medium">$1K</span>
                        <span className="font-semibold text-primary">Management: ${calculatePPCFee(platformBudgets[platform] || 5000).managementFee}/mo</span>
                        <span className="font-medium">$150K+</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </CardContent>
            </Card>

            {/* RIGHT SECTION - Sticky Package Summary (30%) */}
            <div className="lg:sticky lg:top-24 lg:self-start h-fit">
              <Card className="shadow-xl border-2 border-orange-500 bg-white overflow-hidden rounded-lg">
                <div className="bg-background p-6 pb-4">
                  <h3 className="text-xl font-bold text-primary mb-0">📦 Package Summary</h3>
                </div>
                <CardContent className="p-6 pt-4 space-y-4 pb-0">
                  {selectedPlatforms.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">💡</span>
                      </div>
                      <p className="text-base text-muted-foreground font-medium">Please select a platform to see pricing</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b-2 border-border">
                          <span className="text-base font-semibold text-primary">Selected Platform(s)</span>
                          <span className="font-bold text-primary text-sm">{selectedPlatforms.join(", ")}</span>
                        </div>
                        
                        {pricing.platformBreakdown.map((p: any) => (
                          <div key={p.platform} className="pb-4 border-b border-border/50">
                            <div className="font-bold text-base mb-3 text-primary">{p.platform}</div>
                            <div className="flex justify-between text-sm text-muted-foreground ml-4 mb-2">
                              <span>Ad Spend:</span>
                              <span className="font-semibold">${p.adSpend.toLocaleString()}/mo</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground ml-4">
                              <span>Management:</span>
                              <span className="font-semibold text-primary">${p.managementFee}/mo</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center pb-4 border-b border-border/50">
                          <span className="text-base font-semibold text-primary">Setup Fee (one-time)</span>
                          <span className="font-bold text-accent text-lg">+${totalSetupFee.toLocaleString()}</span>
                        </div>
                        
                        {multiPlatformDiscount > 0 && (
                          <div className="flex justify-between items-center pb-4 border-b border-border/50">
                            <span className="text-base font-semibold text-primary">Multi-Platform Discount</span>
                            <span className="font-bold text-green-600 text-lg">-${multiPlatformDiscount}/mo</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t-2 border-accent/30 pt-6 mt-6 gradient-accent-glow -mx-6 px-6 pb-6 rounded-b-lg space-y-5">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-lg font-semibold flex items-center gap-2">💰 First Month:</span>
                          <span className="text-white text-3xl font-bold">
                            ${Math.round(totalSetupFee + totalMonthlyFee).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-lg font-semibold flex items-center gap-2">💰 Monthly Ongoing:</span>
                          <span className="text-white text-4xl font-bold">
                            ${totalMonthlyFee.toLocaleString()}/mo
                          </span>
                        </div>

                        {multiPlatformDiscount > 0 && (
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-0 border border-white/30">
                            <p className="text-white font-semibold text-sm leading-relaxed">
                              🎉 Multi-Platform Discount Applied!
                            </p>
                            <p className="text-white text-sm mt-1">
                              Save $50/mo per additional platform
                            </p>
                          </div>
                        )}

                         <button 
                          className="w-full bg-white text-[#0A1F44] font-bold text-lg py-4 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          onClick={handleGetStarted}
                        >
                          Get Started →
                        </button>
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
      
      <TestimonialSection serviceType="Advertisement Management" />
    </section>
  );
};

export default PPCCalculator;
