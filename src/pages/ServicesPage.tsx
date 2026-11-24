import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Services } from "../components/Services";
import {
  Sparkles,
  PhoneCall,
  ArrowRight,
} from "../components/Icons";

export function ServicesPage() {
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
              <span>Comprehensive Community Relief</span>
            </div>
            <h1 className="font-heading font-black text-ink text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
              Our Core Services
            </h1>
            <p className="mt-4 sm:mt-6 text-ink-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
              Practical solutions, emotional safety, and financial empowerment tailored to everyone
              living across Leicester and Leicestershire.
            </p>
          </div>
        </section>

        {/* Core Services Section (Specified By User) */}
        <Services />

        {/* How It Works Step-By-Step */}
        <section className="py-16 sm:py-20 lg:py-24 bg-blush border-t border-magenta/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-magenta bg-magenta/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Clear &amp; Compassionate Journey
              </span>
              <h2 className="font-heading font-extrabold text-ink text-3xl sm:text-4xl">
                How Our Support Process Works
              </h2>
              <p className="mt-3 text-ink-muted text-base sm:text-lg">
                We make reaching out easy, secure, and completely confidential at every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-magenta/15 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-magenta text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  01
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-2">
                  Reach Out Securely
                </h4>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  Submit an online assistance request or phone our team. Your identity and
                  circumstances are protected under strict confidentiality.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-magenta/15 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-magenta text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  02
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-2">
                  Caseworker Triage
                </h4>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  A dedicated crisis advocate assesses your urgency, safely coordinates with you, and
                  identifies immediate needs like fuel, food, or safety.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-magenta/15 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-magenta text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  03
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-2">
                  Practical Delivery
                </h4>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  We distribute emergency grants, vouchers, white goods, and direct debt/FCA advice
                  directly to relieve hardship.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-magenta/15 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-magenta text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  04
                </div>
                <h4 className="font-heading font-bold text-lg text-ink mb-2">
                  Empowerment &amp; Growth
                </h4>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  Ongoing emotional recovery, skills workshops, and benefits advocacy ensure you
                  achieve lasting security and independence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Assistance Callout */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-magenta-deep via-magenta to-magenta-deep text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight">
              In Need of Urgent Help?
            </h2>
            <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              If you or someone you know is in immediate crisis, facing domestic violence, or unable
              to afford basic heating and food, please contact us immediately.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-magenta font-extrabold text-sm sm:text-base hover:bg-white/90 shadow-lg hover:scale-105 transition-all"
              >
                <span>Request Support Online</span>
                <ArrowRight className="w-4 h-4 text-magenta" />
              </Link>
              <a
                href="tel:01162545168"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-magenta-blush/20 text-white font-extrabold text-sm sm:text-base border border-white/30 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Call 0116 254 5168</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ServicesPage;
