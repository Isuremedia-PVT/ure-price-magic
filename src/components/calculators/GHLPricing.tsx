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
import TestimonialSection from "@/components/TestimonialSection";

const GHLPricing = () => {
  const [buildoutHours, setBuildoutHours] = useState(10);
  const [onboardingSessions, setOnboardingSessions] = useState(1);
  const [selectedSubAccountPlan, setSelectedSubAccountPlan] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [currentServiceData, setCurrentServiceData] = useState<ServiceData | null>(null);

  const hourlyRate = 35;
  const onboardingBaseRate = 50;
  const flatDiscount = 10;

  // Calculate onboarding pricing with cumulative volume discount + every 6th free
  const calculateOnboardingPrice = (quantity: number) => {
    // Pricing pattern per 6-client cycle: $50, $40, $40, $40, $40, $0 (FREE) = $210 per cycle
    // Pattern: 1st client costs $50, clients 2-5 cost $40 each, 6th is FREE
    
    const completeCycles = Math.floor(quantity / 6);
    const remainingClients = quantity % 6;
    const costPerCompleteCycle = 210; // $50 + $40 + $40 + $40 + $40 + $0
    
    // Calculate cost for complete 6-client cycles
    let total = completeCycles * costPerCompleteCycle;
    
    // Calculate cost for remaining clients (1-5)
    if (remainingClients > 0) {
      if (remainingClients === 1) {
        total += 50; // First client of new cycle
      } else {
        total += 50 + ((remainingClients - 1) * 40); // First at $50, rest at $40 each
      }
    }
    
    const freeOnboardings = completeCycles; // 1 free per complete cycle
    const regularPrice = quantity * onboardingBaseRate;
    const savings = regularPrice - total;
    
    // Calculate average price per client for display
    const avgPricePerClient = quantity > 0 ? Math.round(total / quantity) : 0;

    let upsellMessage = "";
    if (quantity === 1) {
      upsellMessage = "💡 Add 1 more to save $10 total!";
    } else if (quantity >= 2 && quantity <= 4) {
      const needMore = 6 - quantity;
      upsellMessage = `💡 Add ${needMore} more to get your 6th onboarding FREE!`;
    } else if (quantity === 5) {
      upsellMessage = "💡 Add just 1 more and get it completely FREE!";
    } else if (quantity === 6) {
      upsellMessage = "🎉 You got 1 onboarding FREE!";
    } else if (freeOnboardings > 0) {
      upsellMessage = `🎉 ${freeOnboardings} FREE onboarding${freeOnboardings > 1 ? "s" : ""} included!`;
    }

    return {
      quantity,
      freeOnboardings,
      avgPricePerClient,
      total,
      regularPrice,
      savings,
      upsellMessage,
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
      value: "starter",
    },
    {
      name: "Growth",
      subAccounts: "20",
      regularPrice: 399,
      specialPrice: 199,
      savings: 200,
      popular: true,
      value: "growth",
    },
    {
      name: "Scale",
      subAccounts: "40",
      regularPrice: 599,
      specialPrice: 399,
      savings: 200,
      value: "scale",
    },
    {
      name: "Unlimited",
      subAccounts: "∞",
      regularPrice: 999,
      specialPrice: 599,
      savings: 400,
      value: "unlimited",
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
        "🎁 FREE: 10 sub-account ticket support",
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
        "7-day money-back guarantee",
      ],
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
        "🎁 FREE: 40 sub-account ticket support",
        "4 hours daily dedicated VA",
        "5 days per week coverage",
        "Dedicated Project Manager",
        "Everything in Monthly Support PLUS:",
        "Zapier integrations",
        "Closebot setup & management",
        "3rd party API integrations",
        "Priority response times (12 hours)",
        "Direct PM access",
        "Weekly strategy calls",
      ],
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
        "🎁 FREE: Unlimited sub-account ticket support",
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
        "Complete white label support",
      ],
    },
  ];

  const handleSubAccountSelect = (plan: (typeof subAccountPlans)[0]) => {
    const serviceData: ServiceData = {
      serviceType: "GHL Sub-Account Support",
      planName: `${plan.name} (${plan.subAccounts} Sub-Accounts)`,
      monthlyTotal: plan.specialPrice,
      regularPrice: plan.regularPrice,
      savings: plan.savings,
      subAccountCount: plan.subAccounts,
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  const handleRetainerSelect = (plan: (typeof retainerPlans)[0]) => {
    const serviceData: ServiceData = {
      serviceType: "GHL Monthly Retainer",
      planName: plan.name,
      monthlyTotal: plan.price,
      hoursIncluded: plan.hours,
      hourlyRate: plan.hourlyEquiv,
      regularPrice: plan.hourlyComparison,
      savings: plan.savings,
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
      freeOnboardings: onboardingPricing.freeOnboardings,
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  const handleHourlySubmit = () => {
    const serviceData: ServiceData = {
      serviceType: "GHL Hourly Buildout",
      hours: buildoutHours,
      hourlyRate: hourlyRate,
      monthlyTotal: buildoutCost,
    };
    setCurrentServiceData(serviceData);
    setFormOpen(true);
  };

  return (
    <section id="ghl" className="py-20 bg-gradient-to-b from-[#F8F9FC] to-[#F0F4FF]">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[42px] font-bold mb-4 text-primary leading-tight">
              GoHighLevel Support
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>

            <div className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-[#FFF5EB] to-white border-l-4 border-accent px-6 py-4 rounded-lg shadow-sm">
              <Check className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="font-semibold text-accent text-sm md:text-base">
                FREE Ticket Support Included | Live Chat Coming Soon
              </span>
            </div>

            <div className="mt-4 max-w-[800px] mx-auto">
              <p className="text-[#6B7280] text-sm md:text-base leading-relaxed text-center">
                Ticket-based support system for seamless client communication (Gray Label Support)
              </p>
            </div>
          </div>

          <Tabs defaultValue="sub-accounts" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-3 md:gap-1 mb-8 p-1 bg-white border-2 border-primary/20 rounded-xl h-auto md:h-14">
              <TabsTrigger
                value="sub-accounts"
                className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-[0_2px_8px_rgba(250,160,51,0.3)] data-[state=inactive]:bg-white data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-[#FFF3E6] data-[state=inactive]:border-2 data-[state=inactive]:border-primary/30 rounded-lg py-4 md:py-2 px-6 transition-all duration-300 text-sm md:text-base font-semibold min-h-[52px] md:min-h-0 z-10"
              >
                Sub-Account Support Only
              </TabsTrigger>
              <TabsTrigger
                value="retainer"
                className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-[0_2px_8px_rgba(250,160,51,0.3)] data-[state=inactive]:bg-white data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-[#FFF3E6] data-[state=inactive]:border-2 data-[state=inactive]:border-primary/30 rounded-lg py-4 md:py-2 px-6 transition-all duration-300 text-sm md:text-base font-semibold min-h-[52px] md:min-h-0 z-10"
              >
                Support + Buildouts
              </TabsTrigger>
              <TabsTrigger
                value="hourly"
                className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-[0_2px_8px_rgba(250,160,51,0.3)] data-[state=inactive]:bg-white data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-[#FFF3E6] data-[state=inactive]:border-2 data-[state=inactive]:border-primary/30 rounded-lg py-4 md:py-2 px-6 transition-all duration-300 text-sm md:text-base font-semibold min-h-[52px] md:min-h-0 z-10"
              >
                Flexible Hourly Projects
              </TabsTrigger>
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
                    className={`relative bg-white border-t-4 border-t-accent rounded-xl shadow-[0_4px_20px_rgba(0,0,71,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,71,0.18)] hover:-translate-y-2 transition-all duration-300 ${
                      plan.name === "Unlimited" ? "ring-2 ring-accent/30" : ""
                    }`}
                  >
                    {plan.name === "Unlimited" && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <Badge variant="default">🔥 BEST VALUE</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name.toUpperCase()}</CardTitle>
                      <div className="space-y-1">
                        <p className="text-3xl font-bold">${plan.specialPrice}</p>
                        <p className="text-sm text-muted-foreground line-through">~~${plan.regularPrice}~~</p>
                        <Badge variant="secondary" className="text-xs">
                          SAVE ${plan.savings}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">
                          {plan.subAccounts} Sub-Account{plan.subAccounts !== "∞" && "s"}
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>✅ Gray Label Support</li>
                          <li>
                            ✅{" "}
                            {plan.name === "Scale" || plan.name === "Unlimited"
                              ? `Priority ${plan.name === "Unlimited" ? "6hr" : "12hr"} response`
                              : "24hr response"}
                          </li>
                          <li>
                            ✅{" "}
                            {plan.name === "Unlimited"
                              ? "Email + Phone + Slack"
                              : plan.name === "Scale"
                                ? "Email + Phone"
                                : "Email ticketing"}
                          </li>
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
                  <Badge variant="secondary" className="px-4 py-2">
                    🏆 Certified GHL Administrators
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    📅 Month-to-Month (No Commitment)
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    💰 7-Day Money-Back Guarantee
                  </Badge>
                  <Badge variant="default" className="px-4 py-2">
                    🎁 FREE: 40 Sub-Account Support Included
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {retainerPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative bg-white border-t-4 border-t-accent rounded-xl shadow-[0_4px_20px_rgba(0,0,71,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,71,0.18)] hover:-translate-y-2 transition-all duration-300 ${
                      plan.popular ? "ring-2 ring-accent/30" : ""
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
                      <CardTitle>
                        {plan.popular ? "🚀 " : "💼 "}
                        {plan.name}
                      </CardTitle>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-accent">${plan.price.toLocaleString()}/mo</div>
                        <div className="text-sm text-muted-foreground">${plan.hourlyEquiv}/hour equivalent</div>
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
                              <span
                                className={
                                  feature.includes("PLUS") || feature.includes("Everything") ? "font-semibold" : ""
                                }
                              >
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

              <Card className="max-w-full bg-white border-t-4 border-t-accent rounded-xl shadow-[0_4px_20px_rgba(0,0,71,0.12)]">
                <CardHeader>
                  <CardTitle>⚡ Flexible Hourly Rate</CardTitle>
                  <CardDescription>
                    <div className="space-y-1 mt-2">
                      <div className="text-xl font-bold text-accent">$35 per hour</div>
                      <div className="text-sm">Minimum: 10 hours ($350) • Add in blocks of 5 hours</div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Split-screen layout for hourly tab */}
                  <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 md:gap-8 p-4 md:p-6">
                    {/* LEFT: Services and Hour Slider */}
                    <div className="space-y-6">
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
                            "Make.com & Zapier Integrations",
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
                          <Label htmlFor="hours" className="text-base font-semibold">
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
                        <p className="text-xs text-muted-foreground mt-2">Minimum 10 hours • 5-hour increments</p>
                      </div>

                      <div className="bg-accent/5 rounded-lg p-4">
                        <p className="font-semibold mb-2 text-sm">Typical Project Estimates:</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
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
                    </div>

                    {/* RIGHT: Pricing Summary */}
                    <div className="lg:sticky lg:top-6 lg:self-start">
                      <Card className="border-2 border-orange-500 bg-white shadow-xl overflow-hidden rounded-lg">
                        <div className="bg-white p-6 pb-4 border-b border-border/20">
                          <h3 className="text-xl font-bold text-[#0A1F44] mb-0 flex items-center gap-2">📦 Package Summary</h3>
                        </div>
                        <div className="bg-white p-6 pt-4 pb-0">
                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-gray-600">Hourly Rate</span>
                              <span className="font-semibold text-[#0A1F44]">$35/hr</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-gray-600">Selected Hours</span>
                              <span className="font-semibold text-[#0A1F44]">{buildoutHours} hrs</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-500 p-6">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-white text-xl font-semibold flex items-center gap-2">💰 Total Cost:</span>
                            <span className="text-white text-4xl font-bold">${buildoutCost.toLocaleString()}</span>
                          </div>

                          <button className="w-full bg-white text-[#0A1F44] font-bold text-lg py-4 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2" onClick={handleHourlySubmit}>
                            Get Started →
                          </button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Client Onboarding Section - Always visible below tabs */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-primary">GHL Client Onboarding Services</h3>
            <div className="w-20 h-1 bg-accent mx-auto mb-8 rounded-full"></div>

            {/* Split-screen layout: 70% left controls + 30% right summary */}
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 max-w-[1400px] mx-auto">
              {/* LEFT SECTION - Calculator Controls (70%) */}
              <Card className="shadow-strong border-2 border-border bg-card card-hover">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Customize Your Onboarding Package</CardTitle>
                  <CardDescription className="text-base">Starting at $50 per client onboarding</CardDescription>
                  <div className="p-6 bg-secondary/20 rounded-lg mt-6">
                    <div className="text-base font-semibold mb-3">What's Included:</div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>ONE 1:1 consultation call (60 minutes)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>Account setup guidance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>Platform walkthrough</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>Best practices training</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>Extra consultation calls: $50 per hour</span>
                      </li>
                    </ul>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <p className="font-semibold mb-2">💰 Volume Discount Structure:</p>
                    <ul className="space-y-1 text-sm">
                      <li>1 client: $50 total</li>
                      <li>2 clients: $90 total (save $10!)</li>
                      <li>3 clients: $130 total (save $20!)</li>
                      <li>4 clients: $170 total (save $30!)</li>
                      <li>5 clients: $210 total (save $40!)</li>
                      <li className="font-bold text-accent">🎁 Every 6th onboarding is FREE!</li>
                      <li>6 clients: $210 total (1 FREE!)</li>
                      <li>12 clients: $420 total (2 FREE!)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="onboarding" className="text-base font-semibold">
                        Number of Client Onboardings
                      </Label>
                      <span className="text-sm font-semibold">
                        {onboardingSessions} Client Onboarding{onboardingSessions > 1 ? "s" : ""}
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
                </CardContent>
              </Card>

              {/* RIGHT SECTION - Sticky Package Summary (30%) */}
              <div className="lg:sticky lg:top-24 lg:self-start h-fit">
                <Card className="shadow-strong border-l-4 border-l-accent border-2 border-accent/30 bg-background-cream overflow-hidden">
                  <div className="bg-background p-6 pb-4 border-b border-border/20">
                    <h3 className="text-xl font-bold text-primary mb-0">📦 Package Summary</h3>
                  </div>
                  <CardContent className="p-6 pt-4 space-y-4 pb-0">

                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-sm font-medium">Onboarding ({onboardingPricing.quantity} client{onboardingPricing.quantity > 1 ? 's' : ''})</span>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            ${onboardingPricing.avgPricePerClient}/client avg × {onboardingPricing.quantity}
                          </div>
                          {onboardingPricing.savings > 0 && (
                            <div className="text-xs text-green-600 font-semibold">
                              Save ${onboardingPricing.savings}!
                            </div>
                          )}
                        </div>
                      </div>

                      {onboardingPricing.freeOnboardings > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-sm">Free Onboardings</span>
                          <span className="font-semibold text-green-600">{onboardingPricing.freeOnboardings}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-accent/30 pt-6 mt-6 gradient-accent-glow -mx-6 px-6 pb-6 rounded-b-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-lg font-semibold flex items-center gap-2">💰 Total:</span>
                        <span className="text-white text-4xl font-bold">${onboardingPricing.total}</span>
                      </div>
                      {onboardingPricing.savings > 0 && (
                        <div className="text-right mb-4">
                          <span className="line-through text-white/70 text-sm">
                            ${onboardingPricing.regularPrice}
                          </span>
                          <span className="text-white ml-2 text-sm font-semibold">
                            Save ${onboardingPricing.savings}
                          </span>
                        </div>
                      )}

                      {onboardingPricing.upsellMessage && (
                        <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm font-medium text-center mb-4 border border-white/30">
                          {onboardingPricing.upsellMessage}
                        </div>
                      )}

                      <button
                        className="w-full bg-white text-[#0A1F44] font-bold text-lg py-4 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        onClick={handleOnboardingSubmit}
                      >
                        Get Started →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentServiceData && (
        <ServiceForm open={formOpen} onOpenChange={setFormOpen} serviceData={currentServiceData} />
      )}
      
      <TestimonialSection serviceType="GoHighLevel Support" />
    </section>
  );
};

export default GHLPricing;
