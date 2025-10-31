const CertificationBadges = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Certified & Trusted
      </p>
      <div className="flex items-center justify-center gap-6 md:gap-8">
        <img
          src="https://gohighlevelexpertservice.com/hire/wp-content/uploads/2025/10/Certified-Badges-scaled.webp"
          alt="GoHighLevel Certified Administrator"
          className="h-16 md:h-20 object-contain drop-shadow-md"
        />
        <img
          src="https://gohighlevelexpertservice.com/hire/wp-content/uploads/2025/10/Certified-Badges-scaled.webp"
          alt="Upwork Top Rated Agency"
          className="h-16 md:h-20 object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
};

export default CertificationBadges;
