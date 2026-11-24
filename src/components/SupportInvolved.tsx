import { useState, type FormEvent } from "react";
import { Sparkles, Heart, ArrowUpRight, Check, RefreshCw } from "./Icons";
import { api } from "../lib/api";

export function SupportInvolved() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await api.subscribeNewsletter({
        email: cleanEmail,
        fullName: name.trim() || undefined,
        source: "WEBSITE_HERO_BANNER",
      });
      setSuccessMsg(res?.message || "Thank you for joining our community newsletter!");
      setSubmitted(true);
    } catch (err: any) {
      console.error("Subscription failed:", err);
      setErrorMsg(err?.message || "Failed to process subscription. Please check your email and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="support" className="py-14 sm:py-20 lg:py-28 bg-ink text-white relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-magenta-deep/20 via-magenta/10 to-gold/10 pointer-events-none" />

      {/* Decorative Sparkles Top Right */}
      <div className="absolute top-6 right-10 pointer-events-none hidden sm:block animate-shimmer">
        <Sparkles className="w-16 h-16 text-gold" aria-hidden="true" />
      </div>

      {/* Decorative Heart Bottom Left */}
      <div className="absolute bottom-6 left-10 pointer-events-none hidden sm:block animate-heartbeat">
        <Heart className="w-20 h-20 text-magenta fill-magenta" aria-hidden="true" />
      </div>

      {/* Left Hand / Arm SVG Illustration with Smooth Reaching Animation */}
      <div
        className="block absolute -left-6 sm:-left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-[110px] sm:w-[220px] md:w-[280px] xl:w-[340px] opacity-75 sm:opacity-100 animate-reach-left"
        aria-hidden="true"
      >
        <div className="relative">
          <svg viewBox="0 0 340 180" className="w-full h-auto drop-shadow-md" fill="none">
            <g transform="translate(-10, 10)">
              <path
                d="M 0 85 C 40 85, 90 88, 140 78 C 170 72, 195 58, 220 50 C 235 45, 245 42, 255 48 C 265 54, 250 68, 235 78 C 210 92, 175 96, 140 98 C 90 100, 40 100, 0 100 Z"
                fill="#2E1B2C"
              />
              <path
                d="M 140 78 C 175 72, 205 60, 235 52 C 255 46, 275 42, 288 48 C 298 52, 295 62, 280 72 C 265 80, 240 88, 215 92 C 185 96, 160 98, 140 98 Z"
                fill="#E8B496"
              />
              <path
                d="M 200 68 C 215 52, 230 35, 242 32 C 250 30, 256 36, 252 44 C 246 54, 232 64, 218 72 Z"
                fill="#F3C3A8"
              />
              <path
                d="M 235 52 C 260 45, 285 40, 305 42 C 315 43, 318 50, 308 55 C 292 62, 268 68, 245 74 Z"
                fill="#FAD4BF"
              />
              <path
                d="M 230 60 C 260 55, 290 50, 312 52 C 322 53, 324 60, 314 65 C 296 72, 268 76, 242 80 Z"
                fill="#F3C3A8"
              />
              <path
                d="M 225 68 C 252 64, 282 60, 302 63 C 312 64, 314 70, 304 75 C 288 80, 260 84, 235 86 Z"
                fill="#E8B496"
              />
              <path
                d="M 218 76 C 242 74, 270 70, 288 74 C 296 76, 297 82, 288 86 C 274 90, 248 92, 225 92 Z"
                fill="#DAA182"
              />
              <path
                d="M 205 76 C 220 78, 235 80, 250 80"
                stroke="#C68C6E"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          </svg>
          <svg
            viewBox="0 0 120 80"
            className="absolute right-0 -top-5 sm:-top-8 text-gold w-[50px] sm:w-[120px] h-auto animate-pulse-arrow"
          >
            <path
              d="M 10 70 C 30 20, 70 80, 100 20"
              stroke="#F2B705"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="105,15 90,20 100,32" fill="#F2B705" />
          </svg>
        </div>
      </div>

      {/* Right Hand / Arm SVG Illustration with Smooth Reaching Animation */}
      <div
        className="block absolute -right-6 sm:-right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-[110px] sm:w-[220px] md:w-[280px] xl:w-[340px] opacity-75 sm:opacity-100 animate-reach-right"
        aria-hidden="true"
      >
        <div className="relative">
          <svg viewBox="0 0 340 180" className="w-full h-auto drop-shadow-md" fill="none">
            <g transform="translate(170, 90) scale(-1, 1) translate(-170, -90)">
              <g transform="translate(-10, 10)">
                <path
                  d="M 0 85 C 40 85, 90 88, 140 78 C 170 72, 195 58, 220 50 C 235 45, 245 42, 255 48 C 265 54, 250 68, 235 78 C 210 92, 175 96, 140 98 C 90 100, 40 100, 0 100 Z"
                  fill="#2E1B2C"
                />
                <path
                  d="M 140 78 C 175 72, 205 60, 235 52 C 255 46, 275 42, 288 48 C 298 52, 295 62, 280 72 C 265 80, 240 88, 215 92 C 185 96, 160 98, 140 98 Z"
                  fill="#E8B496"
                />
                <path
                  d="M 200 68 C 215 52, 230 35, 242 32 C 250 30, 256 36, 252 44 C 246 54, 232 64, 218 72 Z"
                  fill="#F3C3A8"
                />
                <path
                  d="M 235 52 C 260 45, 285 40, 305 42 C 315 43, 318 50, 308 55 C 292 62, 268 68, 245 74 Z"
                  fill="#FAD4BF"
                />
                <path
                  d="M 230 60 C 260 55, 290 50, 312 52 C 322 53, 324 60, 314 65 C 296 72, 268 76, 242 80 Z"
                  fill="#F3C3A8"
                />
                <path
                  d="M 225 68 C 252 64, 282 60, 302 63 C 312 64, 314 70, 304 75 C 288 80, 260 84, 235 86 Z"
                  fill="#E8B496"
                />
                <path
                  d="M 218 76 C 242 74, 270 70, 288 74 C 296 76, 297 82, 288 86 C 274 90, 248 92, 225 92 Z"
                  fill="#DAA182"
                />
                <path
                  d="M 205 76 C 220 78, 235 80, 250 80"
                  stroke="#C68C6E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            </g>
          </svg>
          <svg
            viewBox="0 0 120 80"
            className="absolute left-0 -top-5 sm:-top-8 text-gold w-[50px] sm:w-[120px] h-auto animate-pulse-arrow-mirrored"
          >
            <path
              d="M 10 70 C 30 20, 70 80, 100 20"
              stroke="#F2B705"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="105,15 90,20 100,32" fill="#F2B705" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-5 sm:space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-light text-xs sm:text-sm font-extrabold uppercase tracking-wider sm:tracking-widest">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold fill-gold shrink-0" aria-hidden="true" />
          <span>STAY INFORMED &amp; INVOLVED</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading font-extrabold text-white text-xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl mx-auto px-1">
          Our Doors Are Always Open To More People Who Want To Support Each Other!
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-xs sm:text-base max-w-xl mx-auto font-normal leading-relaxed px-2">
          Join The Zinthiya Trust community newsletter to receive campaign progress updates, Leicestershire emergency relief alerts, and practical guidance.
        </p>

        {/* Interactive Form */}
        {submitted ? (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-gold/40 text-center space-y-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/40">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Thank You for Joining Us!</h3>
            <p className="text-xs sm:text-sm text-white/80">
              {successMsg || `We've registered ${email}. You'll receive our next community update shortly.`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
                setName("");
              }}
              className="mt-3 text-xs text-gold underline hover:text-gold-light"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3.5 sm:space-y-4 pt-2">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs text-center">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="text-left">
                <label
                  htmlFor="news-name-banner"
                  className="block text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-wider mb-1"
                >
                  Your Name
                </label>
                <input
                  id="news-name-banner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 text-xs sm:text-sm focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                  type="text"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="news-email-banner"
                  className="block text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-wider mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="news-email-banner"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 text-xs sm:text-sm focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                  type="email"
                />
              </div>
            </div>

            <div className="pt-2 sm:pt-3 flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="btn-shutter-gold w-auto min-w-[170px] bg-gold hover:bg-gold-light active:scale-95 text-ink font-heading font-extrabold text-xs sm:text-lg px-7 sm:px-9 py-3 sm:py-4 rounded-full shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-ink animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Get Involved</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] sm:text-xs text-white/60 pt-1">
              We respect your confidentiality. Unsubscribe anytime with one click.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}

export default SupportInvolved;

