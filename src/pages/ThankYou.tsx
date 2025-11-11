import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail, Phone, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [serviceType, setServiceType] = useState<string>("");

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setServiceType(service);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-accent/10 p-6">
                    <CheckCircle2 className="h-16 w-16 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl">✅ Thank You!</CardTitle>
                <CardDescription className="text-lg">We've Received Your Request</CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {serviceType && (
                  <div className="bg-secondary/30 rounded-lg p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Your Selected Service:</p>
                    <p className="text-xl font-bold text-accent">{serviceType}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <h3 className="font-bold text-xl">📧 What Happens Next:</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Check Your Email</h4>
                        <p className="text-sm text-muted-foreground">
                          We'll send an invoice to your email
                          <br />
                          <span className="font-medium text-foreground">Expected: Within 2 hours</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Review & Pay Invoice</h4>
                        <p className="text-sm text-muted-foreground">Secure Stripe payment link included in email</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Book Your Onboarding Call</h4>
                        <p className="text-sm text-muted-foreground">
                          After payment, we'll send a calendar link to schedule your onboarding
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="font-bold text-xl mb-4">💬 Questions?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                      <Mail className="h-5 w-5 text-accent" />
                      <a
                        href="mailto:support@isuremedia.com"
                        className="text-sm font-medium hover:text-accent transition-colors"
                      >
                        support@isuremedia.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                      <Phone className="h-5 w-5 text-accent" />
                      <a
                        href="tel:+16465881430"
                        className="text-sm font-medium hover:text-accent transition-colors"
                      >
                        +1 646-588-1430
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to Homepage
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default ThankYou;
