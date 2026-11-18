import { Lock, Clock, PhoneCall } from "./Icons";

export function SupportBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#A80C5B] via-[#E6127E] to-[#A80C5B] text-white py-10 sm:py-14 lg:py-18">
      {/* Decorative Large Heart Watermarks on Left & Right with 3D Rotation Animation */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-between overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Left Heart - 3D rotating */}
        <div
          className="transform -translate-x-1/4"
          style={{ perspective: "1000px" }}
        >
          <div className="animate-rotate-heart-1">
            <svg
              width="420"
              height="420"
              viewBox="0 0 200 200"
              fill="currentColor"
              className="text-white drop-shadow-md"
            >
              <path d="M100 175 C40 120 10 90 10 55 C10 25 35 10 65 10 C82 10 95 20 100 30 C105 20 118 10 135 10 C165 10 190 25 190 55 C190 90 160 120 100 175 Z" />
            </svg>
          </div>
        </div>

        {/* Right Heart - 3D rotating */}
        <div
          className="transform translate-x-1/4"
          style={{ perspective: "1000px" }}
        >
          <div className="animate-rotate-heart-2">
            <svg
              width="420"
              height="420"
              viewBox="0 0 200 200"
              fill="currentColor"
              className="text-white drop-shadow-md"
            >
              <path d="M100 175 C40 120 10 90 10 55 C10 25 35 10 65 10 C82 10 95 20 100 30 C105 20 118 10 135 10 C165 10 190 25 190 55 C190 90 160 120 100 175 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          
          {/* Left Text Content */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-gold-light text-xs font-extrabold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Safe &amp; Confidential Support</span>
            </div>

            <h2 className="font-heading font-extrabold text-xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Confidential support for survivors and those at risk of abuse and violence
            </h2>

            <p className="text-white/90 text-xs sm:text-base font-normal leading-relaxed">
              You are not alone. Our specialist support team in Leicester is ready to listen and help safely.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs text-white/80 pt-1">
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <span>Monday - Friday, 9:30am - 4:00pm</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-semibold text-gold-light">Free, Discreet &amp; Non-judgmental</span>
            </div>
          </div>

          {/* Right Action Helpline Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="tel:01162545168"
              className="btn-shutter-gold w-full sm:w-auto bg-gold hover:bg-gold-light text-ink font-heading font-bold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <PhoneCall className="w-5 h-5 text-ink fill-ink shrink-0" aria-hidden="true" />
              <span>Call 0116 254 5168</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SupportBanner;
