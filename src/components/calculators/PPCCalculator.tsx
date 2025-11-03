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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn Ads"]);
  const [budgetType, setBudgetType] = useState<"single" | "separate" | "combined">("single");
  const [platformBudgets, setPlatformBudgets] = useState<{[key: string]: number}>({});
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
    "LinkedIn Ads",
    "Google Ads",
    "Meta Ads",
    "Google LSA",
    "YouTube Ads",
    "Snapchat Ads",
    "TikTok Ads"
  ];

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        const newPlatforms = selectedPlatforms.filter(p => p !== platform);
        setSelectedPlatforms(newPlatforms);
        // Remove budget for this platform
        const newBudgets = {...platformBudgets};
        delete newBudgets[platform];
        setPlatformBudgets(newBudgets);
        // Reset to single budget if only one platform left
        if (newPlatforms.length === 1) {
          setBudgetType("single");
        }
      }
    } else {
      const newPlatforms = [...selectedPlatforms, platform];
      setSelectedPlatforms(newPlatforms);
      // Initialize budget for new platform
      setPlatformBudgets({...platformBudgets, [platform]: 5000});
      // Show budget type selector if we now have 2+ platforms
      if (newPlatforms.length >= 2 && budgetType === "single") {
        setBudgetType("separate");
      }
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
      platformBudgets: budgetType === "separate" ? JSON.stringify(platformBudgets) : undefined
    };
    setFormOpen(true);
  };

  return (
    <section id="ppc" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Advertisement Investment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your monthly ad spend budget and platforms to see your pricing
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Calculate Your PPC Investment</CardTitle>
              <CardDescription>
                Select your monthly ad spend budget and platforms to see your pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Choose Your Advertising Platform(s)</Label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm transition-smooth hover:scale-105"
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Select at least one platform (click to toggle)
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

              {selectedPlatforms.length === 1 || budgetType === "single" || budgetType === "combined" ? (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="ad-spend" className="text-base">
                      {selectedPlatforms.length >= 2 && budgetType === "combined" 
                        ? "Total Monthly Ad Spend Budget"
                        : "What's Your Monthly Ad Spend Budget?"}
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
                  {selectedPlatforms.length >= 2 && budgetType === "combined" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll optimize allocation across {selectedPlatforms.length} platforms based on performance
                    </p>
                  )}
                </div>
              ) : budgetType === "separate" && (
                <div className="space-y-4">
                  <Label className="text-base block">Set Budget for Each Platform</Label>
                  {selectedPlatforms.map(platform => (
                    <div key={platform} className="border rounded-lg p-4 bg-secondary/10">
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

              <div className="border rounded-lg p-6 bg-accent/5">
                <h4 className="font-semibold mb-4">📊 YOUR PRICING BREAKDOWN</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Selected Platform{selectedPlatforms.length > 1 ? 's' : ''}:</span>
                    <span className="font-medium">{selectedPlatforms.join(", ")}</span>
                  </div>
                  
                  {budgetType === "separate" && selectedPlatforms.length >= 2 ? (
                    <div className="space-y-3 border-t pt-3">
                      <p className="text-sm font-medium">Platform Breakdown:</p>
                      {pricing.platformBreakdown.map((p: any) => (
                        <div key={p.platform} className="ml-4 space-y-1 text-sm">
                          <div className="font-medium">{p.platform}:</div>
                          <div className="flex justify-between text-muted-foreground ml-4">
                            <span>Ad Spend:</span>
                            <span>${p.adSpend.toLocaleString()}/month</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground ml-4">
                            <span>Management:</span>
                            <span>${p.managementFee}/month ({p.percentage})</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground ml-4">
                            <span>Setup:</span>
                            <span>$350 (one-time)</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm border-t pt-2">
                        <span className="text-muted-foreground">Total Ad Spend:</span>
                        <span className="font-semibold">
                          ${pricing.platformBreakdown.reduce((sum: number, p: any) => sum + p.adSpend, 0).toLocaleString()}/month
                        </span>
                      </div>
                    </div>
                  ) : budgetType === "combined" && selectedPlatforms.length >= 2 ? (
                    <div className="space-y-2 border-t pt-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Total Ad Spend:</span>
                        <span className="font-semibold">${adSpend.toLocaleString()}/month</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Suggested allocation per platform:</p>
                      {pricing.platformBreakdown.map((p: any) => (
                        <div key={p.platform} className="flex justify-between text-xs text-muted-foreground ml-4">
                          <span>{p.platform}:</span>
                          <span>~${p.suggestedSpend.toLocaleString()} ({Math.round((p.suggestedSpend / adSpend) * 100)}%)</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-sm border-t pt-2">
                      <span className="text-muted-foreground">Monthly Ad Spend:</span>
                      <span className="font-semibold">${adSpend.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Setup Fee:</span>
                      <span className="font-semibold">${totalSetupFee.toLocaleString()}</span>
                    </div>
                    {budgetType === "separate" || budgetType === "combined" ? (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Base Management:</span>
                        <span className="font-semibold">
                          ${baseManagementFee.toLocaleString()}/month
                        </span>
                      </div>
                    ) : null}
                    {multiPlatformDiscount > 0 && (
                      <div className="flex justify-between items-center text-accent">
                        <span>Multi-Platform Discount:</span>
                        <span className="font-semibold">-${multiPlatformDiscount}/month</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">💰 First Month Total:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${(totalSetupFee + totalMonthlyFee).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">💰 Monthly Ongoing:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${totalMonthlyFee.toLocaleString()}/month
                      </span>
                    </div>
                    {pricing.percentage && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Management rate: {pricing.percentage} of ad spend
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {multiPlatformDiscount > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-accent">
                    🎉 Multi-Platform Discount Applied!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Save $50/month on each additional platform beyond the first
                  </p>
                </div>
              )}

              <Button variant="hero" size="lg" className="w-full" onClick={handleGetStarted}>
                Get Started with PPC
              </Button>
            </CardContent>
          </Card>
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
        }}
      />
    </section>
  );
};

export default PPCCalculator;
