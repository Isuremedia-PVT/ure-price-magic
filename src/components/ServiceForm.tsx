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
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row max-h-[90vh]">
          {/* LEFT SECTION: Package Summary (40% width on desktop) */}
          {(serviceData.serviceType === "PPC Management" && serviceData.platformBreakdown) || 
           (serviceData.serviceType === "Social Media Management" && serviceData.smmBreakdown) ||
           serviceData.serviceType === "SEO Services" ||
           serviceData.serviceType === "GHL Client Onboarding" ||
           serviceData.serviceType === "GHL Hourly Buildout" ||
           serviceData.serviceType === "GHL Sub-Account Support" ||
           serviceData.serviceType === "GHL Monthly Retainer" ? (
             <div className="md:w-[40%] bg-[#FFF9F0] border-r border-border overflow-y-auto p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#000047' }}>
                📊 YOUR {serviceData.serviceType.toUpperCase()} BREAKDOWN
              </h3>
              
              {/* PPC Management Breakdown */}
              {serviceData.serviceType === "PPC Management" && serviceData.platformBreakdown && (
                <>
              {/* MOBILE ONLY - Simplified View */}
              <div className="block md:hidden space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold" style={{ color: '#000047' }}>Monthly Total:</span>
                  <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                    ${(serviceData.monthlyTotal || 0).toLocaleString()}/mo
                  </span>
                </div>
              </div>

              {/* DESKTOP/TABLET - Full Breakdown */}
              <div className="hidden md:block">
                {/* Selected Platforms List */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                    Selected Platform(s):
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {(() => {
                      try {
                        const breakdown = typeof serviceData.platformBreakdown === 'string' 
                          ? JSON.parse(serviceData.platformBreakdown) 
                          : serviceData.platformBreakdown;
                        return breakdown.map((p: any) => p.platform).join(', ');
                      } catch (e) {
                        return 'N/A';
                      }
                    })()}
                  </p>
                </div>

                <div className="border-t border-border my-4"></div>

                {/* Total Ad Spend & Allocation */}
                <div className="mb-4">
                  <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                    Total Ad Spend: ${serviceData.adSpend?.toLocaleString()}/month
                  </p>
                  <p className="text-sm font-semibold mb-2 text-muted-foreground">
                    Suggested allocation per platform:
                  </p>
                  <div className="space-y-1 ml-2">
                    {(() => {
                      try {
                        const breakdown = typeof serviceData.platformBreakdown === 'string' 
                          ? JSON.parse(serviceData.platformBreakdown) 
                          : serviceData.platformBreakdown;
                        const totalAdSpend = breakdown.reduce((sum: number, p: any) => sum + (p.adSpend || 0), 0);
                        
                        return breakdown.map((platform: any, index: number) => {
                          const percentage = totalAdSpend > 0 ? ((platform.adSpend / totalAdSpend) * 100).toFixed(0) : 0;
                          return (
                            <div key={index} className="text-sm text-muted-foreground">
                              • {platform.platform}: ~${platform.adSpend?.toLocaleString()} ({percentage}%)
                            </div>
                          );
                        });
                      } catch (e) {
                        return null;
                      }
                    })()}
                  </div>
                </div>

                <div className="border-t border-border my-4"></div>

                {/* Fees Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Setup Fee:</span>
                    <span className="font-semibold">${serviceData.setupFee?.toLocaleString() || 0}</span>
                  </div>
                  {serviceData.baseManagementFee && typeof serviceData.baseManagementFee === 'number' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Management:</span>
                      <span className="font-semibold">${serviceData.baseManagementFee}/month</span>
                    </div>
                  )}
                  {serviceData.multiPlatformDiscount && typeof serviceData.multiPlatformDiscount === 'number' && serviceData.multiPlatformDiscount > 0 && (
                    <div className="flex justify-between text-sm font-semibold" style={{ color: '#faa033' }}>
                      <span>Multi-Platform Discount:</span>
                      <span>-${serviceData.multiPlatformDiscount}/month</span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-border my-4"></div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span style={{ color: '#000047' }}>💰 First Month Total:</span>
                    <span style={{ color: '#faa033' }}>
                      ${((serviceData.setupFee || 0) + (serviceData.monthlyTotal || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span style={{ color: '#000047' }}>💰 Monthly Ongoing:</span>
                    <span style={{ color: '#faa033' }}>
                      ${(serviceData.monthlyTotal || 0).toLocaleString()}/month
                    </span>
                  </div>
                  {serviceData.managementPercentage && typeof serviceData.managementPercentage === 'string' && (
                    <p className="text-xs text-muted-foreground italic mt-2">
                      Management rate: {serviceData.managementPercentage} of ad spend
                    </p>
                  )}
                </div>
              </div>
              </>
              )}

              {/* SMM Breakdown */}
              {serviceData.serviceType === "Social Media Management" && serviceData.smmBreakdown && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Monthly Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${serviceData.monthlyTotal.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Platforms List */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected Platform(s):
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: '#000047' }}>
                        {typeof serviceData.platforms === 'string' ? serviceData.platforms : ''}
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Base Package */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        Base Package Includes:
                      </p>
                      <div className="space-y-1 ml-2 text-sm" style={{ color: '#000047' }}>
                        <div>• {typeof serviceData.platformCount === 'number' ? serviceData.platformCount : 3} Platforms (Instagram, Facebook, YouTube)</div>
                        <div>• 2 Posts per week</div>
                        <div>• 1 Carousel/Reel per week</div>
                        <div>• 2 Stories per week</div>
                        <div>• Content creation and scheduling</div>
                        <div>• Community management</div>
                        <div>• Monthly performance reports</div>
                      </div>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Content Breakdown */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        Your Content Package:
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Posts per week: {serviceData.smmBreakdown.postsPerWeek}</span>
                          {serviceData.smmBreakdown.postsCost > 0 && (
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${serviceData.smmBreakdown.postsCost}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Reels/Carousels per week: {serviceData.smmBreakdown.carouselsPerWeek}</span>
                          {serviceData.smmBreakdown.carouselsCost > 0 && (
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${serviceData.smmBreakdown.carouselsCost}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Stories per week: {serviceData.smmBreakdown.storiesPerWeek}</span>
                          {serviceData.smmBreakdown.storiesCost > 0 && (
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${serviceData.smmBreakdown.storiesCost}
                            </span>
                          )}
                        </div>
                        {serviceData.smmBreakdown.longVideos > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>YouTube Long Videos: {serviceData.smmBreakdown.longVideos}</span>
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${serviceData.smmBreakdown.longVideosCost}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Fees Breakdown */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Package:</span>
                        <span className="font-semibold">${serviceData.smmBreakdown.basePrice}</span>
                      </div>
                      {serviceData.smmBreakdown.platformAddOns > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Additional Platforms ({serviceData.smmBreakdown.additionalPlatforms}):</span>
                          <span className="font-semibold">+${serviceData.smmBreakdown.platformAddOns}</span>
                        </div>
                      )}
                      {serviceData.smmBreakdown.includeGMB && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">GMB Optimization:</span>
                          <span className="font-semibold">+${serviceData.smmBreakdown.gmbAddOn}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Monthly Total:</span>
                        <span style={{ color: '#faa033' }}>
                          ${serviceData.monthlyTotal.toLocaleString()}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SEO Services Breakdown */}
              {serviceData.serviceType === "SEO Services" && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Monthly Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/mo
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Services Section */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected SEO Service:
                      </p>
                      <p className="text-sm" style={{ color: '#000047' }}>
                        SEO Services Package
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        • SEO Services Package:
                      </p>
                      <div className="ml-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Base Package (8 keywords):</span>
                          <span className="font-semibold" style={{ color: '#faa033' }}>
                            ${typeof serviceData.basePackage === 'number' ? serviceData.basePackage : 350}/month
                          </span>
                        </div>
                        {typeof serviceData.keywords === 'number' && serviceData.keywords > 8 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Additional Keywords ({serviceData.keywords - 8}):</span>
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${(serviceData.keywords - 8) * 25}/month
                            </span>
                          </div>
                        )}
                        {typeof serviceData.blogPosts === 'number' && serviceData.blogPosts > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Blog Posts ({serviceData.blogPosts}):</span>
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              +${serviceData.blogPosts * 80}/month
                            </span>
                          </div>
                        )}
                        <div className="border-t border-border my-2"></div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span style={{ color: '#000047' }}>Service Subtotal:</span>
                          <span style={{ color: '#faa033' }}>
                            ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Base Package Includes */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        What's Included:
                      </p>
                      <div className="ml-2 space-y-1 text-sm" style={{ color: '#000047' }}>
                        <div>✓ Keyword research and optimization</div>
                        <div>✓ On-page SEO improvements</div>
                        <div>✓ Technical SEO audit and fixes</div>
                        <div>✓ Monthly performance reports</div>
                        <div>✓ Competitor analysis</div>
                        {typeof serviceData.keywords === 'number' && (
                          <div>✓ {serviceData.keywords} Keywords tracked</div>
                        )}
                        {typeof serviceData.blogPosts === 'number' && serviceData.blogPosts > 0 && (
                          <div>✓ {serviceData.blogPosts} SEO-optimized blog posts/month</div>
                        )}
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Monthly Total:</span>
                        <span style={{ color: '#faa033' }}>
                          ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* GHL Client Onboarding Breakdown */}
              {serviceData.serviceType === "GHL Client Onboarding" && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Services Section */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected Onboarding Service:
                      </p>
                      <p className="text-sm" style={{ color: '#000047' }}>
                        GoHighLevel Client Onboarding
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        • Client Onboarding Package:
                      </p>
                      <div className="ml-4 space-y-2">
                        {typeof serviceData.quantity === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Quantity:</span>
                            <span className="font-semibold" style={{ color: '#000047' }}>
                              {serviceData.quantity} onboarding{serviceData.quantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                        {typeof serviceData.paidOnboardings === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Paid Onboardings:</span>
                            <span className="font-semibold" style={{ color: '#faa033' }}>
                              {serviceData.paidOnboardings} × $50 = ${serviceData.paidOnboardings * 50}
                            </span>
                          </div>
                        )}
                        {typeof serviceData.freeOnboardings === 'number' && serviceData.freeOnboardings > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>🎁 Free Onboardings:</span>
                            <span className="font-semibold" style={{ color: '#10b981' }}>
                              {serviceData.freeOnboardings} (FREE!)
                            </span>
                          </div>
                        )}
                        {typeof serviceData.savings === 'number' && serviceData.savings > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Multi-Purchase Discount:</span>
                            <span className="font-semibold" style={{ color: '#10b981' }}>
                              -${serviceData.savings}
                            </span>
                          </div>
                        )}
                        <div className="border-t border-border my-2"></div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span style={{ color: '#000047' }}>Total:</span>
                          <span style={{ color: '#faa033' }}>
                            ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                          </span>
                        </div>
                        {typeof serviceData.regularPrice === 'number' && typeof serviceData.monthlyTotal === 'number' && serviceData.regularPrice > serviceData.monthlyTotal && (
                          <div className="text-xs text-muted-foreground">
                            Regular Price: ${serviceData.regularPrice} • You Save: ${serviceData.regularPrice - serviceData.monthlyTotal}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* What's Included */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        Each Onboarding Includes:
                      </p>
                      <div className="ml-2 space-y-1 text-sm" style={{ color: '#000047' }}>
                        <div>✓ Complete GHL account setup</div>
                        <div>✓ Pipeline configuration</div>
                        <div>✓ User training session</div>
                        <div>✓ Email integration setup</div>
                        <div>✓ Custom workflow creation</div>
                        <div>✓ Gray label support email</div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Total Project Cost:</span>
                        <span style={{ color: '#faa033' }}>
                          ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* GHL Hourly Buildout Breakdown */}
              {serviceData.serviceType === "GHL Hourly Buildout" && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Project Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Services Section */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected Service:
                      </p>
                      <p className="text-sm" style={{ color: '#000047' }}>
                        Flexible Hourly Projects
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Hourly Rate & Estimate */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        Hourly Rate & Estimate:
                      </p>
                      <div className="ml-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Hourly Rate:</span>
                          <span className="font-semibold" style={{ color: '#faa033' }}>
                            ${typeof serviceData.hourlyRate === 'number' ? serviceData.hourlyRate : 35}/hour
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#000047' }}>Estimated Hours:</span>
                          <span className="font-semibold" style={{ color: '#000047' }}>
                            {typeof serviceData.hours === 'number' ? serviceData.hours : 0} hours
                          </span>
                        </div>
                        <div className="border-t border-border my-2"></div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span style={{ color: '#000047' }}>Total Estimated Cost:</span>
                          <span style={{ color: '#faa033' }}>
                            ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        What You Get:
                      </p>
                      <div className="ml-2 space-y-1 text-sm" style={{ color: '#000047' }}>
                        <div>✓ Custom GHL buildout work</div>
                        <div>✓ Workflow automation setup</div>
                        <div>✓ Integration configuration</div>
                        <div>✓ Technical support</div>
                        <div>✓ Testing & quality assurance</div>
                        <div>✓ Documentation included</div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Project Estimate:</span>
                        <span style={{ color: '#faa033' }}>
                          ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span style={{ color: '#000047' }}>Hourly Rate:</span>
                        <span style={{ color: '#000047' }}>
                          ${typeof serviceData.hourlyRate === 'number' ? serviceData.hourlyRate : 35}/hour
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic mt-2">
                        Note: Final cost based on actual hours worked
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* GHL Sub-Account Support Breakdown */}
              {serviceData.serviceType === "GHL Sub-Account Support" && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Monthly Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/mo
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Services Section */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected Plan:
                      </p>
                      <p className="text-sm font-bold" style={{ color: '#000047' }}>
                        {typeof serviceData.planName === 'string' ? serviceData.planName : 'Sub-Account Support Plan'}
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        • {typeof serviceData.planName === 'string' ? serviceData.planName : 'Support Plan'}:
                      </p>
                      <div className="ml-4 space-y-2">
                        {typeof serviceData.subAccountCount === 'string' && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Sub-Accounts Supported:</span>
                            <span className="font-semibold" style={{ color: '#000047' }}>
                              {serviceData.subAccountCount}
                            </span>
                          </div>
                        )}
                        {typeof serviceData.regularPrice === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground line-through">Regular Price:</span>
                            <span className="text-muted-foreground line-through">${serviceData.regularPrice}/month</span>
                          </div>
                        )}
                        {typeof serviceData.savings === 'number' && serviceData.savings > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#10b981' }}>💰 You Save:</span>
                            <span className="font-semibold" style={{ color: '#10b981' }}>
                              ${serviceData.savings}/month
                            </span>
                          </div>
                        )}
                        <div className="border-t border-border my-2"></div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span style={{ color: '#000047' }}>Special Price:</span>
                          <span style={{ color: '#faa033' }}>
                            ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* What's Included */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        All Plans Include:
                      </p>
                      <div className="ml-2 space-y-1 text-sm" style={{ color: '#000047' }}>
                        <div>✓ Gray Label ticket support</div>
                        <div>✓ No third-party branding</div>
                        <div>✓ Month-to-month billing</div>
                        <div>✓ Cancel anytime</div>
                        <div>✓ 7-day money-back guarantee</div>
                        <div>✓ Professional response times</div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Monthly Total:</span>
                        <span style={{ color: '#faa033' }}>
                          ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* GHL Monthly Retainer Breakdown */}
              {serviceData.serviceType === "GHL Monthly Retainer" && (
                <>
                  {/* MOBILE ONLY - Simplified View */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: '#000047' }}>Monthly Total:</span>
                      <span className="text-2xl font-bold" style={{ color: '#faa033' }}>
                        ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/mo
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP/TABLET - Full Breakdown */}
                  <div className="hidden md:block">
                    {/* Selected Services Section */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: '#000047' }}>
                        Selected Retainer Plan:
                      </p>
                      <p className="text-sm font-bold" style={{ color: '#000047' }}>
                        {typeof serviceData.planName === 'string' ? serviceData.planName : 'Monthly Retainer'}
                      </p>
                    </div>

                    <div className="border-t border-border my-4"></div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        • {typeof serviceData.planName === 'string' ? serviceData.planName : 'Retainer'} Plan:
                      </p>
                      <div className="ml-4 space-y-2">
                        {typeof serviceData.hoursIncluded === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Hours Included:</span>
                            <span className="font-semibold" style={{ color: '#000047' }}>
                              {serviceData.hoursIncluded} hours/month
                            </span>
                          </div>
                        )}
                        {typeof serviceData.hourlyRate === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#000047' }}>Effective Hourly Rate:</span>
                            <span className="font-semibold" style={{ color: '#000047' }}>
                              ${serviceData.hourlyRate}/hour
                            </span>
                          </div>
                        )}
                        {typeof serviceData.regularPrice === 'number' && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Compare to $35/hr:</span>
                            <span className="text-muted-foreground">${serviceData.regularPrice}/month</span>
                          </div>
                        )}
                        {typeof serviceData.savings === 'number' && serviceData.savings > 0 && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: '#10b981' }}>💰 Monthly Savings:</span>
                            <span className="font-semibold" style={{ color: '#10b981' }}>
                              ${serviceData.savings}
                            </span>
                          </div>
                        )}
                        <div className="border-t border-border my-2"></div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span style={{ color: '#000047' }}>Monthly Total:</span>
                          <span style={{ color: '#faa033' }}>
                            ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* What's Included */}
                    <div className="mb-4">
                      <p className="text-base font-bold mb-3" style={{ color: '#000047' }}>
                        Retainer Includes:
                      </p>
                      <div className="ml-2 space-y-1 text-sm" style={{ color: '#000047' }}>
                        <div>✓ Dedicated GHL support team</div>
                        <div>✓ 🎁 FREE: 40 sub-account ticket support</div>
                        <div>✓ Priority response times</div>
                        <div>✓ Custom workflow automation</div>
                        <div>✓ Integration setup & management</div>
                        <div>✓ Monthly strategy meetings</div>
                        <div>✓ Month-to-month, cancel anytime</div>
                        <div>✓ 7-day money-back guarantee</div>
                      </div>
                    </div>

                    <div className="border-t-2 border-border my-4"></div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span style={{ color: '#000047' }}>💰 Monthly Total:</span>
                        <span style={{ color: '#faa033' }}>
                          ${typeof serviceData.monthlyTotal === 'number' ? serviceData.monthlyTotal.toLocaleString() : 0}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : null}

          {/* RIGHT SECTION: Form Fields (60% or full width on desktop) */}
          <div className={`${(serviceData.serviceType === "PPC Management" && serviceData.platformBreakdown) || 
                              (serviceData.serviceType === "Social Media Management" && serviceData.smmBreakdown) ||
                              serviceData.serviceType === "SEO Services" ||
                              serviceData.serviceType === "GHL Client Onboarding" ||
                              serviceData.serviceType === "GHL Hourly Buildout" ||
                              serviceData.serviceType === "GHL Sub-Account Support" ||
                              serviceData.serviceType === "GHL Monthly Retainer"
                              ? "md:w-[60%]" : "w-full"} bg-white overflow-y-auto p-6`}>
            <DialogHeader className="mb-6">
              <DialogTitle>Complete Your Package Details</DialogTitle>
              <DialogDescription>
                Review your package summary and fill out your information below
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Email & Phone - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Company Name - Full Width */}
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Billing Address (70%) & Zip Code (30%) - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <div className="min-w-0">
                  <Label htmlFor="billingAddress">Billing Address *</Label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    required
                    placeholder="123 Main St, City, State"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="md:w-[120px]">
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    required
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Preferred Start Date - Full Width */}
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

              {/* Additional Notes - Full Width */}
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions?"
                />
              </div>

              {/* Only show simple summary for services without detailed breakdown */}
              {serviceData.serviceType !== "PPC Management" && 
               serviceData.serviceType !== "Social Media Management" &&
               serviceData.serviceType !== "SEO Services" &&
               serviceData.serviceType !== "GHL Client Onboarding" &&
               serviceData.serviceType !== "GHL Hourly Buildout" &&
               serviceData.serviceType !== "GHL Sub-Account Support" &&
               serviceData.serviceType !== "GHL Monthly Retainer" && (
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Package Summary:</h4>
                  <div className="text-sm space-y-3">
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
                    {serviceData.setupFee && typeof serviceData.setupFee === 'number' && serviceData.setupFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Setup Fee:</span>
                        <span className="font-medium">
                          ${serviceData.setupFee.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12"
                disabled={isSubmitting}
                style={{ backgroundColor: '#faa033' }}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
