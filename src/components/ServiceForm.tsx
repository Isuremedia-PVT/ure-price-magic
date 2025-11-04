import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { redirectToCheckout, FormData, ServiceData } from "@/lib/formSubmission";
import { Loader2 } from "lucide-react";

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceData: ServiceData;
}

const ServiceForm = ({ open, onOpenChange, serviceData }: ServiceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    billingAddress: "",
    zipCode: "",
    startDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Build the JSON payload
      const timestamp = new Date().toISOString();
      
      // Parse platform breakdown if it exists (for PPC Calculator)
      let platformDetails = null;
      if (serviceData.platformBreakdown && typeof serviceData.platformBreakdown === 'string') {
        try {
          platformDetails = JSON.parse(serviceData.platformBreakdown);
        } catch (e) {
          console.error('Error parsing platform breakdown:', e);
        }
      }
      
      const payload = {
        // Form Identification
        form_name: serviceData.serviceType === "PPC Management" 
          ? "Calculate Your Advertisement Investment" 
          : serviceData.serviceType,
        form_id: serviceData.serviceType === "PPC Management" 
          ? "ppc_calculator" 
          : serviceData.serviceType.toLowerCase().replace(/\s+/g, '_'),
        
        // Service Details
        service_type: serviceData.serviceType,
        plan_name: serviceData.planName || null,
        quantity: serviceData.quantity || null,
        price_monthly: serviceData.monthlyTotal || null,
        price_one_time: serviceData.setupFee || null,
        total: serviceData.monthlyTotal,
        regular_price: serviceData.regularPrice || null,
        savings: serviceData.savings || null,
        
        // Specific Service Data
        hours_included: serviceData.hoursIncluded || serviceData.hours || null,
        hourly_rate: serviceData.hourlyRate || null,
        ad_spend: serviceData.adSpend || null,
        platform: serviceData.platforms || null,
        platform_count: serviceData.platformCount || null,
        sub_account_count: serviceData.subAccountCount || null,
        paid_onboardings: serviceData.paidOnboardings || null,
        free_onboardings: serviceData.freeOnboardings || null,
        budget_type: serviceData.budgetType || null,
        base_management_fee: serviceData.baseManagementFee || null,
        multi_platform_discount: serviceData.multiPlatformDiscount || null,
        management_percentage: serviceData.managementPercentage || null,
        
        // Platform breakdown for PPC
        selected_platforms: platformDetails || null,
        
        // Totals (for PPC)
        totals: platformDetails ? {
          total_ad_spend: platformDetails.reduce((sum: number, p: any) => sum + (p.adSpend || 0), 0),
          total_management_fees: serviceData.monthlyTotal || 0,
          total_setup_fees: serviceData.setupFee || 0,
          grand_total: (serviceData.monthlyTotal || 0) + (serviceData.setupFee || 0)
        } : null,
        
        // Contact Info
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company || null,
        billing_address: formData.billingAddress || null,
        zip_code: formData.zipCode || null,
        project_start: formData.startDate || null,
        additional_notes: formData.notes || null,
        
        // Tracking
        timestamp: timestamp,
        page_source: "marketplace.isuremedia.com"
      };

      // Submit to webhook
      const response = await fetch('https://n8n.srv871295.hstgr.cloud/webhook/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Redirect to thank you page with service type
        window.location.href = `/thank-you?service=${encodeURIComponent(serviceData.serviceType)}`;
      } else {
        console.error('Webhook submission failed');
        alert('Something went wrong. Please try again or contact us at hello@isuremedia.com');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Connection error. Please check your internet and try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Package Details</DialogTitle>
          <DialogDescription>
            Fill out your information to get started with {serviceData.serviceType}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="billingAddress">Billing Address *</Label>
            <Input
              id="billingAddress"
              name="billingAddress"
              required
              placeholder="123 Main St, City, State"
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="zipCode">Zip Code *</Label>
            <Input
              id="zipCode"
              name="zipCode"
              required
              placeholder="12345"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="startDate">Preferred Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Package Summary:</h4>
            <div className="text-sm space-y-3">
              {serviceData.platformBreakdown && typeof serviceData.platformBreakdown === 'string' ? (
                // PPC Calculator with platform breakdown
                <>
                  {(() => {
                    try {
                      const platforms = JSON.parse(serviceData.platformBreakdown as string);
                      return platforms.map((platform: any, index: number) => (
                        <div key={index} className="border-b border-muted pb-2 last:border-0">
                          <div className="font-semibold text-base mb-1">{platform.platform}:</div>
                          <div className="ml-3 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Ad Spend:</span>
                              <span>${platform.adSpend?.toLocaleString() || 'N/A'}/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Management:</span>
                              <span>
                                ${platform.managementFee?.toLocaleString() || 'N/A'}/month 
                                {platform.percentage && ` (~${platform.percentage})`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ));
                    } catch (e) {
                      return null;
                    }
                  })()}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Monthly Management:</span>
                      <span className="text-accent">
                        ${serviceData.monthlyTotal.toLocaleString()}/month
                      </span>
                    </div>
                    {serviceData.setupFee && serviceData.setupFee > 0 && (
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Total Setup Fee:</span>
                        <span>${serviceData.setupFee.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Other services - standard summary
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{serviceData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Total:</span>
                    <span className="font-semibold text-accent">
                      ${serviceData.monthlyTotal.toLocaleString()}/month
                    </span>
                  </div>
                  {serviceData.setupFee && serviceData.setupFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Setup Fee:</span>
                      <span className="font-medium">
                        ${serviceData.setupFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue to Checkout"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
