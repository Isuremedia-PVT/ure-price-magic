import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const PPCCalculator = () => {
  const [adSpendBudget, setAdSpendBudget] = useState<string>("2k");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn Ads"]);
  const [formOpen, setFormOpen] = useState(false);

  const setupFee = 350;
  
  const getMonthlyFee = (budget: string) => {
    switch (budget) {
      case "2k": return 250;
      case "5k": return 400;
      case "5k+": return 400;
      default: return 250;
    }
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
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const monthlyFeePerPlatform = getMonthlyFee(adSpendBudget);
  
  // Calculate management fees with multi-platform discount
  const getManagementFeeWithDiscounts = () => {
    if (selectedPlatforms.length === 0) return 0;
    if (selectedPlatforms.length === 1) return monthlyFeePerPlatform;
    
    // First platform full price, each additional platform gets $50 discount
    const firstPlatformFee = monthlyFeePerPlatform;
    const additionalPlatformsFee = (selectedPlatforms.length - 1) * (monthlyFeePerPlatform - 50);
    return firstPlatformFee + additionalPlatformsFee;
  };
  
  const totalMonthlyFee = getManagementFeeWithDiscounts();
  const totalSetupFee = setupFee * selectedPlatforms.length;
  const multiPlatformDiscount = selectedPlatforms.length > 1 
    ? (selectedPlatforms.length - 1) * 50 
    : 0;

  const handleGetStarted = () => {
    const serviceData: ServiceData = {
      serviceType: "PPC Management",
      platforms: selectedPlatforms.join(","),
      platformCount: selectedPlatforms.length,
      adSpendBudget: adSpendBudget,
      setupFee: totalSetupFee,
      monthlyTotal: totalMonthlyFee,
      baseManagementFee: monthlyFeePerPlatform * selectedPlatforms.length,
      multiPlatformDiscount: multiPlatformDiscount,
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
                <Label htmlFor="ad-spend" className="text-base mb-3 block">
                  Monthly Ad Spend Budget
                </Label>
                <Select value={adSpendBudget} onValueChange={setAdSpendBudget}>
                  <SelectTrigger id="ad-spend" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="2k">Up to $2,000</SelectItem>
                    <SelectItem value="5k">$2,001 - $5,000</SelectItem>
                    <SelectItem value="5k+">Above $5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base mb-3 block">Select Platforms</Label>
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
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">One-Time Setup Fee:</span>
                    <span className="font-semibold">${totalSetupFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Management Fee:</span>
                    <span className="font-semibold">
                      ${(monthlyFeePerPlatform * selectedPlatforms.length).toLocaleString()}/month
                    </span>
                  </div>
                  {multiPlatformDiscount > 0 && (
                    <div className="flex justify-between items-center text-accent">
                      <span>Multi-Platform Discount:</span>
                      <span className="font-semibold">-${multiPlatformDiscount}/month</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Monthly Total:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${totalMonthlyFee.toLocaleString()}/month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

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
          setupFee: totalSetupFee,
          monthlyTotal: totalMonthlyFee,
        }}
      />
    </section>
  );
};

export default PPCCalculator;
