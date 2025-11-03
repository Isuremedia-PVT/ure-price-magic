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
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const singlePlatformFee = calculatePPCFee(adSpend);
  
  // Calculate management fees with multi-platform discount
  const getManagementFeeWithDiscounts = () => {
    if (selectedPlatforms.length === 0) return 0;
    if (selectedPlatforms.length === 1) return singlePlatformFee.managementFee;
    
    // First platform full price, each additional platform gets $50 discount
    const firstPlatformFee = singlePlatformFee.managementFee;
    const additionalPlatformsFee = (selectedPlatforms.length - 1) * (singlePlatformFee.managementFee - 50);
    return firstPlatformFee + additionalPlatformsFee;
  };
  
  const totalMonthlyFee = getManagementFeeWithDiscounts();
  const totalSetupFee = setupFee * selectedPlatforms.length;
  const baseManagementFee = singlePlatformFee.managementFee * selectedPlatforms.length;
  const multiPlatformDiscount = selectedPlatforms.length > 1 
    ? (selectedPlatforms.length - 1) * 50 
    : 0;

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
      managementPercentage: singlePlatformFee.percentage
    };
    setFormOpen(true);
  };

  return (
    <section id="ppc" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">PPC Campaign Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional pay-per-click advertising management across multiple platforms with transparent, performance-driven pricing.
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

              <div>
                <Label className="text-base mb-3 block">Choose Your Platform(s)</Label>
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

              <div className="border rounded-lg p-6 bg-accent/5">
                <h4 className="font-semibold mb-4">📊 YOUR PRICING BREAKDOWN</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Selected Platform{selectedPlatforms.length > 1 ? 's' : ''}:</span>
                    <span className="font-medium">{selectedPlatforms.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Monthly Ad Spend:</span>
                    <span className="font-semibold">${adSpend.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">One-Time Setup Fee:</span>
                      <span className="font-semibold">${totalSetupFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Base Management Fee:</span>
                      <span className="font-semibold">
                        ${baseManagementFee.toLocaleString()}/month
                      </span>
                    </div>
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
                    <p className="text-xs text-muted-foreground mt-2">
                      Management rate: {singlePlatformFee.percentage} of ad spend
                    </p>
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
