const CertificationBadges = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 py-4 md:py-6 px-8 rounded-3xl glass-card shadow-soft">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
        <p className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-primary-foreground">
          Certified & Trusted
        </p>
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="flex items-center justify-center w-full animate-float">
        <img
          src="https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909d632e85db56f34942b78.webp"
          alt="Certifications - Google Partner, Meta Partner, and Industry Certified"
          className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[80%] h-auto object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default CertificationBadges;
