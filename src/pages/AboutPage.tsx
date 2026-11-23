import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  HandHeart,
  Users,
  Compass,
  Building2,
} from "../components/Icons";

// High-resolution compassionate counseling/support session image fallback
const defaultImage =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF0F5]/40 text-ink antialiased flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-magenta/15 via-[#FFF0F5]/60 to-transparent border-b border-magenta/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-magenta/10 text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-magenta" />
              <span>UK Registered Charity No. 1144123</span>
            </div>
            <h1 className="font-heading font-black text-ink text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
              About The Zinthiya Trust
            </h1>
            <p className="mt-4 sm:mt-6 text-ink-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
              Empowering women, children, and families to alleviate poverty and abuse in
              Leicester and Leicestershire through compassionate, confidential action.
            </p>
          </div>
        </section>

        {/* Core Section (From User Specification) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-blush relative overflow-hidden border-b border-magenta/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-card border border-magenta/10 relative">
              {/* Top-right Decorative Sparkle */}
              <div
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gold text-xl sm:text-2xl font-bold opacity-70 pointer-events-none select-none"
                aria-hidden="true"
              >
                ✦
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    Open to everyone across Leicester and Leicestershire
                  </span>

                  <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl leading-tight">
                    Welcome to The Zinthiya Trust
                  </h2>

                  <div className="space-y-4 text-ink-muted text-base sm:text-lg leading-relaxed font-normal">
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
                    <div className="bg-blush/60 p-4 rounded-2xl border border-magenta/10 flex items-center gap-3 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                        <Heart className="w-5 h-5 fill-white" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block font-heading font-bold text-xl text-ink">
                          5,000+
                        </span>
                        <span className="text-xs font-semibold text-ink-muted">
                          Families Supported
                        </span>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-blush/60 p-4 rounded-2xl border border-magenta/10 flex items-center gap-3 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                        <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block font-heading font-bold text-xl text-ink">
                          100%
                        </span>
                        <span className="text-xs font-semibold text-ink-muted">
                          Leicester &amp; County
                        </span>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-blush/60 p-4 rounded-2xl border border-magenta/10 flex items-center gap-3 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-magenta text-white flex items-center justify-center shrink-0 shadow-md">
                        <Award className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block font-heading font-bold text-xl text-ink">
                          Free
                        </span>
                        <span className="text-xs font-semibold text-ink-muted">
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
                      className="w-full h-72 sm:h-96 lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-500"
                      src="/assets/support-guidance-BJM1vg-C.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
                          Safe &amp; Confidential Environment
                        </span>
                        <p className="text-sm font-semibold leading-snug">
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

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-magenta bg-magenta/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Our Purpose &amp; Values
              </span>
              <h2 className="font-heading font-extrabold text-ink text-3xl sm:text-4xl lg:text-5xl">
                Restoring Hope, Dignity &amp; Security
              </h2>
              <p className="mt-4 text-ink-muted text-base sm:text-lg">
                We believe that nobody should have to choose between heating their home, feeding
                their children, or escaping dangerous environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <div className="bg-[#FFF0F5]/50 border border-magenta/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-magenta text-white flex items-center justify-center mb-5 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-2">
                  Crisis Alleviation
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Immediate emergency assistance including food parcels, heating vouchers, utility
                  debt relief, and crisis shelter guidance.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#FFF0F5]/50 border border-magenta/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-magenta text-white flex items-center justify-center mb-5 shadow-md">
                  <HandHeart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-2">
                  Domestic Abuse Support
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Confidential sanctuary casework, safety planning, and trauma-informed legal &amp;
                  housing advocacy for survivors.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#FFF0F5]/50 border border-magenta/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-magenta text-white flex items-center justify-center mb-5 shadow-md">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-2">
                  Financial Independence
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Budgeting advice, debt management support, welfare benefit checks, and workshops
                  to foster long-term self-reliance.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#FFF0F5]/50 border border-magenta/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-magenta text-white flex items-center justify-center mb-5 shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-2">
                  Community Advocacy
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Community cafes, clothing banks, uniform drives, and multilingual assistance for
                  migrant and vulnerable families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder & Roots Section */}
        <section className="py-16 sm:py-20 bg-blush border-t border-magenta/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-magenta/10 shadow-card flex flex-col md:flex-row items-center gap-8 lg:gap-12">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-magenta/10 border-2 border-magenta/30 flex items-center justify-center shrink-0">
                <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-magenta" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-magenta bg-magenta/10 px-3 py-1 rounded-full inline-block">
                  Our Community Heritage
                </span>
                <h3 className="font-heading font-extrabold text-ink text-2xl sm:text-3xl">
                  Rooted in Compassion and Grassroots Dedication
                </h3>
                <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
                  Founded by Zinthiya Ganeshpanchan MBE, The Zinthiya Trust was established to fill
                  the critical gap between statutory public services and real-world community
                  emergencies. Over more than a decade, our passionate team of caseworkers and
                  advocates has helped thousands rebuild their lives with dignity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-magenta-deep via-magenta to-magenta-deep text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight">
              Get Support Today or Help Us Change a Life
            </h2>
            <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you need private confidential advice for yourself or wish to donate towards
              our crisis relief funds, we are here for you.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/beneficiary"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-magenta font-extrabold text-sm sm:text-base hover:bg-white/90 shadow-lg hover:scale-105 transition-all"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 text-magenta" />
              </Link>
              <Link
                to="/donor/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-magenta-blush/20 text-white font-extrabold text-sm sm:text-base border border-white/30 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <span>Donate to Causes</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
