import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ServiceForm from "@/components/ServiceForm";
import { ServiceData } from "@/lib/formSubmission";

const GHLPricing = () => {
  const [buildoutHours, setBuildoutHours] = useState(10);
  const [onboardingSessions, setOnboardingSessions] = useState(1);
  const [selectedSubAccountPlan, setSelectedSubAccountPlan] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [currentServiceData, setCurrentServiceData] = useState<ServiceData | null>(null);

  const hourlyRate = 35;
  const onboardingBaseRate = 50;
  const flatDiscount = 10;

  // Calculate onboarding pricing with discounts
  const calculateOnboardingPrice = (quantity: number) => {
    const freeOnboardings = Math.floor(quantity / 6);
    const paidOnboardings = quantity - freeOnboardings;
    
    let subtotal = paidOnboardings * onboardingBaseRate;
    let discount = 0;
    
    if (paidOnboardings >= 2) {
      discount = flatDiscount;
    }
    
    const total = subtotal - discount;
    const regularPrice = quantity * onboardingBaseRate;
    const savings = regularPrice - total;
    
    let upsellMessage = '';
    if (quantity === 1) {
      upsellMessage = '💡 Add 1 more onboarding and save $10!';
    } else if (quantity >= 2 && quantity <= 4) {
      const needMore = 6 - quantity;
      upsellMessage = `💡 Add ${needMore} more to get your 6th onboarding FREE!`;
    } else if (quantity === 5) {
      upsellMessage = '💡 Add just 1 more and get it completely FREE!';
    } else if (quantity === 6) {
      upsellMessage = '🎉 Amazing! You got 1 onboarding FREE + $10 discount!';
    } else if (quantity > 6) {
      upsellMessage = `🎉 You're getting ${freeOnboardings} onboarding${freeOnboardings > 1 ? 's' : ''} FREE!`;
    }
    
    return {
      quantity,
      paidOnboardings,
      freeOnboardings,
      subtotal,
      discount,
      total,
      regularPrice,
      savings,
      upsellMessage
    };
  };

  const onboardingPricing = calculateOnboardingPrice(onboardingSessions);
  const buildoutCost = buildoutHours * hourlyRate;

  const subAccountPlans = [
    {
      name: "Starter",
      subAccounts: "10",
      regularPrice: 299,
      specialPrice: 99,
      savings: 200,
      value: "starter"
    },
    {
      name: "Growth",
      subAccounts: "20",
      regularPrice: 399,
      specialPrice: 199,
      savings: 200,
      popular: true,
      value: "growth"
    },
    {
      name: "Scale",
      subAccounts: "40",
      regularPrice: 599,
      specialPrice: 399,
      savings: 200,
      value: "scale"
    },
    {
      name: "Unlimited",
      subAccounts: "∞",
      regularPrice: 999,
      specialPrice: 599,
      savings: 400,
      value: "unlimited"
    },
  ];

  const retainerPlans = [
    {
      name: "Monthly Support",
      price: 599,
      hours: 20,
      hourlyEquiv: 29.95,
      hourlyComparison: 700,
      savings: 101,
      features: [
        "20 hours for GHL tasks per month",
        "⚠️ Hours DON'T carry over to next month",
        "🎁 FREE: 20 sub-account ticket support",
        "White label support & onboarding",
        "GHL technical support",
        "Email, Zoom, Slack, MS Teams",
        "Bi-monthly strategy meetings",
        "GHL funnel & website design",
        "Website/funnel on-page SEO",
        "Membership & community creation",
        "Custom snapshot builds",
        "AI Chatbot & Voice AI setup",
        "ClickUp task tracking",
        "Month-to-month, cancel anytime",
        "7-day money-back guarantee"
      ]
    },
    {
      name: "Growing",
      price: 1699,
      hours: 80,
      hourlyEquiv: 21.24,
      hourlyComparison: 2800,
      savings: 1101,
      popular: true,
      features: [
        "80 hours per month",
        "⚠️ Hours DON'T carry over to next month",
        "🎁 FREE: 20 sub-account ticket support",
        "4 hours daily dedicated VA",
        "5 days per week coverage",
        "Dedicated Project Manager",
        "Everything in Monthly Support PLUS:",
        "Zapier integrations",
        "Closebot setup & management",
        "3rd party API integrations",
        "Priority response times (12 hours)",
        "Direct PM access",
        "Weekly strategy calls"
      ]
    },
    {
      name: "Enterprise",
      price: 2999,
      hours: 160,
      hourlyEquiv: 18.74,
      hourlyComparison: 5600,
      savings: 2601,
      features: [
        "160 hours per month (full-time)",
        "⚠️ Hours DON'T carry over to next month",
        "🎁 FREE: 20 sub-account ticket support",
        "8 hours daily dedicated VA",
        "5 days per week coverage",
        "Dedicated Project Manager",
        "Everything in Growing PLUS:",
        "Graphics design (5 hrs/month)",
        "Video editing (5 hrs/month)",
        "WordPress development (Elementor Pro)",
        "WordPress to GHL migration",
        "Multi-platform support (Kajabi, ClickFunnels, Kartra)",
        "Course/membership migrations",
        "Priority response time (6 hours)",
        "Complete white label support"
      ]
    },
  ];

  const handleSubAccountSelect = (plan: typeof subAccountPlans[0]) => {
    const serviceData: ServiceData = {
      serviceType: "GHL Sub-Account Support",
      planName: `${plan.name} (${plan.subAccounts} Sub-Accounts)`,
      monthlyTotal: plan.specialPrice,
      regularPrice: plan.regularPrice,
      savings: plan.savings,
      subAccountCount: plan.subAccounts
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  const handleRetainerSelect = (plan: typeof retainerPlans[0]) => {
    const serviceData: ServiceData = {
      serviceType: "GHL Monthly Retainer",
      planName: plan.name,
      monthlyTotal: plan.price,
      hoursIncluded: plan.hours,
      hourlyRate: plan.hourlyEquiv,
      regularPrice: plan.hourlyComparison,
      savings: plan.savings
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  const handleOnboardingSubmit = () => {
    const serviceData: ServiceData = {
      serviceType: "GHL Client Onboarding",
      quantity: onboardingPricing.quantity,
      monthlyTotal: onboardingPricing.total,
      regularPrice: onboardingPricing.regularPrice,
      savings: onboardingPricing.savings,
      paidOnboardings: onboardingPricing.paidOnboardings,
      freeOnboardings: onboardingPricing.freeOnboardings
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  const handleHourlySubmit = () => {
    const serviceData: ServiceData = {
      serviceType: "GHL Hourly Buildout",
      hours: buildoutHours,
      hourlyRate: hourlyRate,
      monthlyTotal: buildoutCost
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  return (
    <section id="ghl" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">GoHighLevel Support</h2>
            
            <div className="mt-6 inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-lg">
              <Check className="h-5 w-5" />
              <span className="font-semibold">FREE Ticket Support Included | Live Chat Coming Soon</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="text-muted-foreground">
                Ticket-based support system for seamless client communication (Gray Label Support
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold">📧 Gray Label Support Explained</p>
                      <p className="text-sm">Your clients will communicate through:</p>
                      <p className="text-sm font-mono">support@clienthelpdesks.com</p>
                      <ul className="text-xs space-y-1 mt-2">
                        <li>✓ Generic, professional support email</li>
                        <li>✓ No third-party branding visible</li>
                        <li>✓ White label ticketing system</li>
                        <li>✓ All support tracked & documented</li>
                        <li>✓ Your brand, our backend support</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-muted-foreground">)</span>
            </div>
          </div>

          <Tabs defaultValue="sub-accounts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="sub-accounts">Sub-Account Support Only</TabsTrigger>
              <TabsTrigger value="retainer">Support + Buildouts</TabsTrigger>
              <TabsTrigger value="hourly">Flexible Hourly Projects</TabsTrigger>
            </TabsList>

            {/* Tab 1: Sub-Account Support Only */}
            <TabsContent value="sub-accounts" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Ticket-Based Support for Your GHL Sub-Accounts</h3>
                <p className="text-muted-foreground">Choose the plan that fits your agency size</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subAccountPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative ${
                      plan.name === "Unlimited" ? "border-primary shadow-medium" : "shadow-soft"
                    }`}
                  >
                    {plan.name === "Unlimited" && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <Badge variant="default">
                          🔥 BEST VALUE
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name.toUpperCase()}</CardTitle>
                      <div className="space-y-1">
                        <p className="text-3xl font-bold">${plan.specialPrice}</p>
                        <p className="text-sm text-muted-foreground line-through">~~${plan.regularPrice}~~</p>
                        <Badge variant="secondary" className="text-xs">SAVE ${plan.savings}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">{plan.subAccounts} Sub-Account{plan.subAccounts !== "∞" && "s"}</p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>✅ Gray Label Support</li>
                          <li>✅ {plan.name === "Scale" || plan.name === "Unlimited" ? `Priority ${plan.name === "Unlimited" ? "6hr" : "12hr"} response` : "24hr response"}</li>
                          <li>✅ {plan.name === "Unlimited" ? "Email + Phone + Slack" : plan.name === "Scale" ? "Email + Phone" : "Email ticketing"}</li>
                          <li>✅ Month-to-month</li>
                        </ul>
                      </div>
                      <Button
                        variant={plan.name === "Unlimited" ? "default" : "outline"}
                        className="w-full"
                        onClick={() => handleSubAccountSelect(plan)}
                      >
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-secondary/20 border rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold mb-2">All Plans Include:</p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>✅ Gray Label ticket support (support@clienthelpdesks.com)</li>
                  <li>✅ No third-party branding</li>
                  <li>✅ Month-to-month, no long-term contracts</li>
                  <li>✅ Cancel anytime</li>
                  <li>✅ 7-day money-back guarantee</li>
                </ul>
              </div>
            </TabsContent>

            {/* Tab 2: Support + Buildouts (Monthly Retainer) */}
            <TabsContent value="retainer" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Monthly Retainer & VA Support</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="secondary" className="px-4 py-2">🏆 Certified GHL Administrators</Badge>
                  <Badge variant="secondary" className="px-4 py-2">📅 Month-to-Month (No Commitment)</Badge>
                  <Badge variant="secondary" className="px-4 py-2">💰 7-Day Money-Back Guarantee</Badge>
                  <Badge variant="default" className="px-4 py-2">🎁 FREE: 20 Sub-Account Support Included</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {retainerPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative ${
                      plan.popular ? "border-accent shadow-medium" : "shadow-soft"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <Badge variant="default" className="bg-accent">
                          🔥 Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.popular ? "🚀 " : "💼 "}{plan.name}</CardTitle>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-accent">
                          ${plan.price.toLocaleString()}/mo
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${plan.hourlyEquiv}/hour equivalent
                        </div>
                        <div className="text-xs bg-accent/10 text-accent px-3 py-2 rounded">
                          Compare: ${plan.hourlyComparison.toLocaleString()} at $35/hr
                          <br />
                          <span className="font-semibold">You save ${plan.savings.toLocaleString()}/month</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">📦 What's Included:</p>
                        <ul className="space-y-1.5 text-sm">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              <span className={feature.includes("PLUS") || feature.includes("Everything") ? "font-semibold" : ""}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        variant={plan.popular ? "hero" : "outline"}
                        className="w-full"
                        onClick={() => handleRetainerSelect(plan)}
                      >
                        Get Started - ${plan.price.toLocaleString()}/mo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3: Flexible Hourly Projects */}
            <TabsContent value="hourly" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Custom GHL Buildout</h3>
                <p className="text-muted-foreground">Perfect for one-time projects or testing our services</p>
              </div>

              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>⚡ Flexible Hourly Rate</CardTitle>
                  <CardDescription>
                    <div className="space-y-1 mt-2">
                      <div className="text-xl font-bold text-accent">$35 per hour</div>
                      <div className="text-sm">Minimum: 10 hours ($350) • Add in blocks of 5 hours</div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-secondary/30 rounded-lg p-6">
                    <h4 className="font-semibold mb-3">Services We Provide (Hourly):</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {[
                        "Funnel Building",
                        "Complex Workflow Automation",
                        "Troubleshooting & Bug Fixes",
                        "Website Building (GHL)",
                        "Website Migration to GHL",
                        "Graphic Design",
                        "Video Editing",
                        "Email Templates",
                        "Custom GHL Integrations",
                        "N8N Workflow Automation",
                        "Make.com & Zapier Integrations"
                      ].map((service) => (
                        <div key={service} className="flex items-start">
                          <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="hours" className="text-base">
                        📊 Hour Calculator
                      </Label>
                      <span className="text-sm font-semibold">{buildoutHours} hours</span>
                    </div>
                    <Slider
                      id="hours"
                      min={10}
                      max={100}
                      step={5}
                      value={[buildoutHours]}
                      onValueChange={(value) => setBuildoutHours(value[0])}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Minimum 10 hours • 5-hour increments
                    </p>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Cost:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${buildoutCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-accent/5 rounded-lg p-4">
                    <p className="font-semibold mb-2">Typical Project Estimates:</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Simple Funnel:</span>
                        <span>5-10 hours ($175-350)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complex Funnel:</span>
                        <span>15-25 hours ($525-875)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Website Build:</span>
                        <span>20-40 hours ($700-1,400)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Advanced Automation:</span>
                        <span>10-20 hours ($350-700)</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-full" onClick={handleHourlySubmit}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Client Onboarding Section - Always visible below tabs */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">GHL Client Onboarding Services</h3>
            <Card className="shadow-medium max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Client Onboarding</CardTitle>
                <CardDescription>
                  Personalized onboarding experience for your clients - $50 per Client Onboarding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      ONE 1:1 consultation call (60 minutes)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Account setup guidance
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Platform walkthrough
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Best practices training
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Extra consultation calls: $50 per hour
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="font-semibold mb-2">💰 Volume Discount:</p>
                  <ul className="space-y-1 text-sm">
                    <li>💰 Book 2+ Onboardings: Save $10 total</li>
                    <li>🎁 Book 5 Onboardings: Get the 6th FREE!</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="onboarding" className="text-base">
                      Number of Client Onboardings
                    </Label>
                    <span className="text-sm font-semibold">
                      {onboardingSessions} Client Onboarding{onboardingSessions > 1 ? 's' : ''}
                    </span>
                  </div>
                  <Slider
                    id="onboarding"
                    min={1}
                    max={12}
                    step={1}
                    value={[onboardingSessions]}
                    onValueChange={(value) => setOnboardingSessions(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="border-t pt-6">
                  <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Current selection:</span>
                      <span className="font-medium">{onboardingPricing.quantity} onboardings</span>
                    </div>
                    {onboardingPricing.freeOnboardings > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Free onboardings:</span>
                        <span className="font-medium text-accent">{onboardingPricing.freeOnboardings}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Pricing breakdown:</span>
                      <span className="font-medium">
                        {onboardingPricing.paidOnboardings} × $50 = ${onboardingPricing.subtotal}
                      </span>
                    </div>
                    {onboardingPricing.discount > 0 && (
                      <div className="flex justify-between items-center text-sm text-accent">
                        <span>Volume discount:</span>
                        <span className="font-semibold">-${onboardingPricing.discount}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">${onboardingPricing.total}</div>
                        {onboardingPricing.savings > 0 && (
                          <div className="text-sm">
                            <span className="line-through text-muted-foreground">
                              ${onboardingPricing.regularPrice}
                            </span>
                            <span className="text-accent ml-2">Save ${onboardingPricing.savings}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {onboardingPricing.upsellMessage && (
                      <div className="bg-accent/10 text-accent px-4 py-2 rounded text-sm font-medium text-center">
                        {onboardingPricing.upsellMessage}
                      </div>
                    )}
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={handleOnboardingSubmit}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {currentServiceData && (
        <ServiceForm
          open={formOpen}
          onOpenChange={setFormOpen}
          serviceData={currentServiceData}
        />
      )}
    </section>
  );
};

export default GHLPricing;
