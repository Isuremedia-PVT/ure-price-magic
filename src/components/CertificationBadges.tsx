const CertificationBadges = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Certified & Trusted
      </p>
      <div className="flex items-center justify-center gap-6 md:gap-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRio7GoabFYaWgbkgnANx3SCnoxzeZuf1dTFQ&s"
          alt="GoHighLevel Certified Administrators"
          className="h-20 md:h-24 object-contain drop-shadow-md transition-transform hover:scale-105"
        />
        <img
          src="https://www.netforthtech.com/assets/img/upwork.png"
          alt="Upwork Top Rated Plus Agency"
          className="h-20 md:h-24 object-contain drop-shadow-md transition-transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default CertificationBadges;
