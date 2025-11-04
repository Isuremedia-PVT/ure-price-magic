const CertificationBadges = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="text-xl md:text-2xl font-bold uppercase tracking-wide text-primary-foreground drop-shadow-lg">
        Certified & Trusted
      </p>
      <div className="flex items-center justify-center">
        <img
          src="https://storage.googleapis.com/msgsndr/jnLK3WXibjhfqnyON1Ru/media/6909d632e85db56f34942b78.webp"
          alt="Certifications"
          className="max-w-full h-auto object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default CertificationBadges;
