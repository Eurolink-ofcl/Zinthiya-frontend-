import { Heart, ShieldCheck, Award } from "./Icons";

// High-resolution compassionate counseling/support session image fallback
const defaultImage =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80";

export function About() {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-24 bg-blush relative overflow-hidden border-y border-magenta/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-10 lg:p-14 shadow-card border border-magenta/10 relative">
          {/* Top-right Decorative Sparkle */}
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gold text-xl sm:text-2xl font-bold opacity-70 pointer-events-none select-none"
            aria-hidden="true"
          >
            ✦
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                Open to everyone across Leicester and Leicestershire
              </span>

              <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl leading-tight">
                Welcome to The Zinthiya Trust
              </h2>

              <div className="space-y-3.5 sm:space-y-4 text-ink-muted text-sm sm:text-lg leading-relaxed font-normal">
                <p>
                  The Zinthiya Trust is a registered UK charity dedicated to providing
                  information, advice, and practical support to alleviate poverty and abuse for
                  everyone living in Leicester and Leicestershire.
                </p>
                <p>
                  Our services are aimed at making service users more secure financially,
                  emotionally, and physically. Whether you are seeking refuge from domestic abuse,
                  dealing with debt, or struggling with energy bills, our experienced team is here
                  for you.
                </p>
              </div>

              {/* 3 Metric Cards */}
              <div className="pt-2 sm:pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Metric 1 */}
                <div className="bg-blush/60 p-3.5 sm:p-4 rounded-2xl border border-magenta/10 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-lg sm:text-xl text-ink">
                      5,000+
                    </span>
                    <span className="text-[11px] font-semibold text-ink-muted">
                      Families Supported
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-blush/60 p-3.5 sm:p-4 rounded-2xl border border-magenta/10 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-lg sm:text-xl text-ink">
                      100%
                    </span>
                    <span className="text-[11px] font-semibold text-ink-muted">
                      Leicester &amp; County
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-blush/60 p-3.5 sm:p-4 rounded-2xl border border-magenta/10 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-lg sm:text-xl text-ink">
                      Free
                    </span>
                    <span className="text-[11px] font-semibold text-ink-muted">
                      Confidential Advice
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Guidance Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blush group">
                <img
                  alt="Compassionate support session at The Zinthiya Trust Leicester"
                  className="w-full h-64 sm:h-96 lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/support-guidance-BJM1vg-C.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent flex items-end p-5 sm:p-6">
                  <div className="text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
                      Safe &amp; Confidential Environment
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Providing warmth, understanding, and actionable steps towards emotional and
                      financial security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

