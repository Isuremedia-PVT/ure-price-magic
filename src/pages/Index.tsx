import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PPCCalculator from "@/components/calculators/PPCCalculator";
import SMMCalculator from "@/components/calculators/SMMCalculator";
import SEOCalculator from "@/components/calculators/SEOCalculator";
import GHLPricing from "@/components/calculators/GHLPricing";
import CustomDevelopment from "@/components/CustomDevelopment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="services">
        <Hero />
        <PPCCalculator />
        <SMMCalculator />
        <SEOCalculator />
        <GHLPricing />
        <CustomDevelopment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
