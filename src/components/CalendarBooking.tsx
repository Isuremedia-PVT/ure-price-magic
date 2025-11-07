const CalendarBooking = () => {
  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Schedule a Free Consultation
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground">
              Let's discuss your marketing goals and build a custom package
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-strong border-2 border-border p-4 md:p-8 min-h-[900px]">
            <iframe 
              src="https://crm.isuremedia.com/widget/booking/NSq50To86cmaAFjyIwrN" 
              style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "850px", height: "850px" }} 
              scrolling="no" 
              id="NSq50To86cmaAFjyIwrN_1761930562551"
              title="Schedule a Consultation"
            />
            <script src="https://crm.isuremedia.com/js/form_embed.js" type="text/javascript"></script>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarBooking;
