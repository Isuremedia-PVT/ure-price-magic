import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import PPCCalculator from "@/components/calculators/PPCCalculator";
import SMMCalculator from "@/components/calculators/SMMCalculator";
import SEOCalculator from "@/components/calculators/SEOCalculator";
import GHLPricing from "@/components/calculators/GHLPricing";
import CustomDevelopment from "@/components/CustomDevelopment";
import CalendarBooking from "@/components/CalendarBooking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="services" className="pt-20">
        <Hero />
        <Testimonials />
        <PPCCalculator />
        <SMMCalculator />
        <SEOCalculator />
        <GHLPricing />
        <CustomDevelopment />
        <CalendarBooking />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
