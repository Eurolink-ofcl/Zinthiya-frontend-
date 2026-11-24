import { Link } from "react-router-dom";
import { Sparkles, Mail, ArrowRight, PhoneCall, MapPin } from "./Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] flex items-center justify-center py-12 sm:py-16 lg:py-24 text-center bg-ink">
      {/* Background Video */}
      <video
        src="https://res.cloudinary.com/dkeaigeg2/video/upload/v1786537491/14896163-hd_1920_1080_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
      />

      {/* Deep Plum Overlay with Gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(36, 18, 33, 0.85) 0%, rgba(36, 18, 33, 0.6) 50%, rgba(36, 18, 33, 0.4) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center space-y-4 sm:space-y-6 text-center w-full">
        {/* Top Gold Mission Pill */}
        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-sm text-gold-light text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-wider text-center max-w-[94vw] sm:max-w-full">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" aria-hidden="true" />
          <span className="whitespace-normal leading-tight">
            WORKING TO ALLEVIATE POVERTY AND ABUSE IN LEICESTER AND LEICESTERSHIRE
          </span>
        </div>

        {/* Hero Quote Heading */}
        <h1 className="font-heading font-extrabold text-white text-xl sm:text-4xl lg:text-5xl xl:text-6xl leading-snug sm:leading-[1.18] tracking-tight drop-shadow-md px-1 sm:px-2">
          “The commodity of The Zinthiya Trust may be advice and guidance, but the product is hope”
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-lg lg:text-xl text-white/95 leading-relaxed max-w-2xl font-normal drop-shadow-sm px-1 sm:px-2">
          We provide confidential, compassionate, and non-judgmental information, advice, and practical support to empower individuals and families towards safety and financial independence.
        </p>

        {/* Action Buttons: Contact Us & Helpline */}
        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <Link
            to="/contact"
            className="btn-3d-magenta w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-heading font-bold text-sm sm:text-lg text-white shadow-pill-3d flex items-center justify-center gap-2.5 transition-transform focus:outline-none focus:ring-4 focus:ring-magenta/30"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" aria-hidden="true" />
          </Link>

          <a
            href="tel:01162545168"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 rounded-full font-bold text-white hover:text-magenta bg-white/20 hover:bg-white backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center gap-2 text-xs sm:text-base transition-all"
          >
            <PhoneCall className="w-4 h-4 text-gold" aria-hidden="true" />
            <span>Helpline: 0116 254 5168</span>
          </a>
        </div>

        {/* Bottom Bar: Address & Opening Hours */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-sm text-white/80 border-t border-white/20 w-full text-center">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-white text-center">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" aria-hidden="true" />
            <span className="text-center">12 Bishop Street, Leicester LE1 6AF</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Mon-Fri 9:30am - 4:00pm</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

