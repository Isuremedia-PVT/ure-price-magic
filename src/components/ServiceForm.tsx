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
    startDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a brief loading state before redirect
    setTimeout(() => {
      redirectToCheckout(formData, serviceData);
    }, 500);
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
            <h4 className="font-semibold mb-2">Package Summary:</h4>
            <div className="text-sm space-y-1">
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
