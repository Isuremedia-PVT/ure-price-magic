import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CustomDevelopment = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    clientType: "",
    serviceType: "",
    timeline: "",
    budget: "",
    description: "",
    loomVideo: "",
    designType: "",
    videoType: "",
    deliverables: "",
    references: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted!",
      description: "Thanks! We'll review your requirements and get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      clientType: "",
      serviceType: "",
      timeline: "",
      budget: "",
      description: "",
      loomVideo: "",
      designType: "",
      videoType: "",
      deliverables: "",
      references: "",
    });
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <section id="custom" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Development & Creative Services</h2>
            <p className="text-lg text-muted-foreground">
              Need something unique? We provide custom development, graphics design, video editing, and bespoke solutions.
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Request a Custom Quote</CardTitle>
              <CardDescription>
                Tell us about your project and we'll create a tailored solution for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Client Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Are you an agency or need help with a single account? *
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div
                      onClick={() => setFormData({ ...formData, clientType: "agency" })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.clientType === "agency"
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="font-semibold">Agency</div>
                      <div className="text-sm text-muted-foreground">Managing multiple clients</div>
                    </div>
                    <div
                      onClick={() => setFormData({ ...formData, clientType: "single" })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.clientType === "single"
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="font-semibold">Single Business/Account</div>
                      <div className="text-sm text-muted-foreground">One account setup</div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Service Type */}
                <div>
                  <Label htmlFor="service-type" className="text-base font-semibold">
                    What type of custom work do you need? *
                  </Label>
                  <Select
                    required
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger id="service-type" className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="webapp">Custom Web Application</SelectItem>
                      <SelectItem value="shopify">Shopify Development/Customization</SelectItem>
                      <SelectItem value="graphics">Graphics Design Services</SelectItem>
                      <SelectItem value="video">Video Editing Services</SelectItem>
                      <SelectItem value="ghl-api">GHL API Integration</SelectItem>
                      <SelectItem value="ghl-whitelabel">GHL White Label Support</SelectItem>
                      <SelectItem value="ghl-b2b">GHL Agency B2B Services</SelectItem>
                      <SelectItem value="automation">Custom Automation/Workflow</SelectItem>
                      <SelectItem value="integration">Third-party Integration</SelectItem>
                      <SelectItem value="other">Other (please specify)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional: Graphics Design Type */}
                {formData.serviceType === "graphics" && (
                  <div>
                    <Label htmlFor="design-type" className="text-base font-semibold">
                      What type of design work do you need? *
                    </Label>
                    <Select
                      required
                      value={formData.designType}
                      onValueChange={(value) => setFormData({ ...formData, designType: value })}
                    >
                      <SelectTrigger id="design-type" className="mt-2">
                        <SelectValue placeholder="Select design type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="logo">Logo Design</SelectItem>
                        <SelectItem value="brand-identity">Brand Identity Package</SelectItem>
                        <SelectItem value="social-media">Social Media Graphics</SelectItem>
                        <SelectItem value="marketing-materials">Marketing Materials (Brochures, Flyers)</SelectItem>
                        <SelectItem value="presentation">Presentation Design</SelectItem>
                        <SelectItem value="infographics">Infographics</SelectItem>
                        <SelectItem value="ui-design">Website/App UI Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Conditional: Video Editing Type */}
                {formData.serviceType === "video" && (
                  <div>
                    <Label htmlFor="video-type" className="text-base font-semibold">
                      What type of video editing do you need? *
                    </Label>
                    <Select
                      required
                      value={formData.videoType}
                      onValueChange={(value) => setFormData({ ...formData, videoType: value })}
                    >
                      <SelectTrigger id="video-type" className="mt-2">
                        <SelectValue placeholder="Select video type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="social-media-short">Social Media Videos (Short-form)</SelectItem>
                        <SelectItem value="youtube-long">YouTube Videos (Long-form)</SelectItem>
                        <SelectItem value="marketing">Marketing/Promotional Videos</SelectItem>
                        <SelectItem value="product-demo">Product Demo Videos</SelectItem>
                        <SelectItem value="testimonial">Testimonial Videos</SelectItem>
                        <SelectItem value="video-ads">Video Ads</SelectItem>
                        <SelectItem value="podcast">Podcast Editing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Additional fields for Graphics/Video */}
                {(formData.serviceType === "graphics" || formData.serviceType === "video") && (
                  <>
                    <div>
                      <Label htmlFor="deliverables" className="text-base font-semibold">
                        Number of deliverables needed
                      </Label>
                      <Input
                        id="deliverables"
                        type="number"
                        min="1"
                        value={formData.deliverables}
                        onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                        placeholder="e.g., 5"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="references" className="text-base font-semibold">
                        Reference/Inspiration Links
                      </Label>
                      <Textarea
                        id="references"
                        value={formData.references}
                        onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                        placeholder="Share links to designs/videos you like or that inspire your project..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}

                {/* Step 3: Project Details */}
                <div>
                  <Label htmlFor="description" className="text-base font-semibold">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project requirements, goals, and any specific features needed..."
                    rows={6}
                    className="mt-2"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="file-upload" className="text-base font-semibold">
                    Upload Files (Optional)
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Briefs, mockups, documents (PDF, DOC, DOCX, PNG, JPG, ZIP • Max 25MB per file)
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-secondary/30 rounded"
                        >
                          <span className="text-sm truncate">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Loom Video */}
                <div>
                  <Label htmlFor="loom-video" className="text-base font-semibold">
                    Loom Video (Optional but Recommended)
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    📹 Record a quick Loom video walking us through your needs - this helps us understand
                    your vision better!
                  </p>
                  <Input
                    id="loom-video"
                    type="url"
                    value={formData.loomVideo}
                    onChange={(e) => setFormData({ ...formData, loomVideo: e.target.value })}
                    placeholder="https://www.loom.com/share/..."
                  />
                  <a
                    href="https://www.loom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline mt-1 inline-block"
                  >
                    Don't have Loom? Get it free →
                  </a>
                </div>

                {/* Step 4: Timeline & Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeline" className="text-base font-semibold">
                      {formData.serviceType === "graphics" || formData.serviceType === "video" 
                        ? "Turnaround Time Preference *" 
                        : "Estimated Timeline *"}
                    </Label>
                    <Select
                      required
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger id="timeline" className="mt-2">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="rush">Rush (1-2 weeks)</SelectItem>
                        <SelectItem value="standard">Standard (3-4 weeks)</SelectItem>
                        <SelectItem value="flexible">Flexible (5+ weeks)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-base font-semibold">
                      Budget Range *
                    </Label>
                    <Select
                      required
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    >
                      <SelectTrigger id="budget" className="mt-2">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-2.5k">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2.5k-5k">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k+">$10,000+</SelectItem>
                        <SelectItem value="unsure">Not sure / Need consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Step 5: Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-base font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website (if applicable)</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Request Custom Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomDevelopment;
