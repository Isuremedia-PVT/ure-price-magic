const CertificationBadges = () => {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 py-4 md:py-6">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold uppercase tracking-wider text-primary-foreground drop-shadow-lg">
        Certified & Trusted
      </p>
      <div className="flex items-center justify-center w-full">
        <img
          src="https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909d632e85db56f34942b78.webp"
          alt="Certifications"
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[75%] h-auto object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default CertificationBadges;
