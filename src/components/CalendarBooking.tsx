const CalendarBooking = () => {
  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Schedule a Free Consultation
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground">
              Let's discuss your marketing goals and build a custom package
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,71,0.12)] border-2 border-border p-5 md:p-6 lg:p-10">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>
              <iframe 
                src="https://crm.isuremedia.com/widget/booking/NSq50To86cmaAFjyIwrN" 
                style={{ width: "100%", height: "705px", border: "none", overflow: "visible" }} 
                scrolling="no" 
                id="NSq50To86cmaAFjyIwrN_1761930562551"
                title="Schedule a Consultation"
              />
              <script src="https://crm.isuremedia.com/js/form_embed.js" type="text/javascript"></script>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarBooking;
