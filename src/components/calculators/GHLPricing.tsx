import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const GHLPricing = () => {
  const [buildoutHours, setBuildoutHours] = useState(10);
  const [onboardingSessions, setOnboardingSessions] = useState(1);

  const hourlyRate = 35;
  const onboardingRate = 50;

  const buildoutCost = buildoutHours * hourlyRate;
  const onboardingCost = onboardingSessions * onboardingRate;

  const subAccountPlans = [
    {
      name: "Starter",
      subAccounts: "10",
      regularPrice: 299,
      specialPrice: 99,
      savings: 200,
    },
    {
      name: "Growth",
      subAccounts: "20",
      regularPrice: 399,
      specialPrice: 199,
      savings: 200,
      popular: true,
    },
    {
      name: "Scale",
      subAccounts: "40",
      regularPrice: 599,
      specialPrice: 399,
      savings: 200,
    },
    {
      name: "Unlimited",
      subAccounts: "∞",
      regularPrice: 999,
      specialPrice: 599,
      savings: 400,
    },
  ];

  const supportPlans = [
    {
      name: "Monthly Support",
      price: 599,
      hours: "20 hours",
      description: "Hours don't carry forward",
      features: ["Email support", "Priority response", "Monthly reports"],
    },
    {
      name: "Part-Time VA",
      price: 1699,
      hours: "80 hours/month",
      description: "4 hours/day",
      features: ["Dedicated VA", "Daily availability", "Task management", "Priority support"],
      popular: true,
    },
    {
      name: "Full-Time VA",
      price: 2999,
      hours: "160 hours/month",
      description: "8 hours/day",
      features: [
        "Dedicated full-time VA",
        "Full business hours",
        "Project management",
        "Priority support",
        "Weekly strategy calls",
      ],
    },
  ];

  return (
    <section id="ghl" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">GoHighLevel Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete GoHighLevel agency support, from sub-accounts to buildout services and ongoing management.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-lg">
              <Check className="h-5 w-5" />
              <span className="font-semibold">FREE Ticket Support Included | Live Chat Coming Soon</span>
            </div>
          </div>

          {/* Sub-Account Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Agency Sub-Account Support</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subAccountPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular ? "border-accent shadow-medium" : "shadow-soft"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge variant="default" className="bg-accent">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold">
                      {plan.subAccounts} Sub-Accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-accent">
                          ${plan.specialPrice}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${plan.regularPrice}
                        </span>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        SAVE ${plan.savings}
                      </Badge>
                    </div>
                    <Button
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Onboarding Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Onboarding Services</h3>
            <Card className="shadow-medium max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>GHL Onboarding Sessions</CardTitle>
                <CardDescription>
                  Expert guidance to get you started with GoHighLevel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Two 1:1 consultation calls
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
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="onboarding" className="text-base">
                      Number of Sessions
                    </Label>
                    <span className="text-sm font-semibold">{onboardingSessions} sessions</span>
                  </div>
                  <Slider
                    id="onboarding"
                    min={1}
                    max={10}
                    step={1}
                    value={[onboardingSessions]}
                    onValueChange={(value) => setOnboardingSessions(value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    $50 per session • Includes two 1:1 calls with client
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Investment:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${onboardingCost}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Book Onboarding Sessions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Buildout Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Hourly Buildout Services
            </h3>
            <Card className="shadow-medium max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Custom GHL Buildout</CardTitle>
                <CardDescription>
                  Perfect for one-time projects or testing our services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Use Cases:</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Custom snapshot setup
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Workflow creation
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Funnel building
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Form & survey setup
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Email/SMS campaigns
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      Custom configurations
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="hours" className="text-base">
                      Buildout Hours
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
                    $35/hour • Minimum 10 hours • 5-hour increments
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Investment:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${buildoutCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Request Buildout Quote
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Support Plans */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">Monthly Retainer & VA Support</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {supportPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular ? "border-accent shadow-medium" : "shadow-soft"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge variant="default" className="bg-accent">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold">
                      {plan.hours}
                    </CardDescription>
                    <div className="text-2xl font-bold text-accent mt-2">
                      ${plan.price.toLocaleString()}/mo
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full"
                    >
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLPricing;
