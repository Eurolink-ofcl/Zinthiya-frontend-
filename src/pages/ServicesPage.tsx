import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Shield,
  CircleCheck,
  HeartHandshake,
  Zap,
  ExternalLink,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  Heart,
  Users,
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
        <section id="services" className="py-12 sm:py-16 lg:py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                Our Core Service Areas
              </span>
              <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl">
                Tailored Support &amp; Guidance for Leicestershire
              </h2>
              <p className="text-ink-muted text-sm sm:text-lg leading-relaxed">
                We work directly alongside individuals and families to deliver practical solutions,
                emotional safety, and financial empowerment.
              </p>
            </div>

            {/* 3 Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: Domestic Abuse */}
              <div
                id="domestic-abuse"
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ink/10 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Hover Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-magenta to-magenta-deep flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                      Safety &amp; Recovery
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                    Domestic Abuse, Honour-Based Violence &amp; FGM
                  </h3>

                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    Bespoke one-to-one support, confidential crisis advice, mentoring, and
                    specialized recovery sessions to help survivors rebuild their lives in safety.
                  </p>

                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Bespoke 1-to-1 crisis &amp; ongoing support</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Honour-based violence &amp; FGM specialist advice</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>The Freedom Programme &amp; group empowerment sessions</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Emotional recovery and safety planning</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <Link
                    to="/beneficiary"
                    className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full cursor-pointer"
                  >
                    <span>Request Support</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Card 2: Poverty Alleviation */}
              <div
                id="poverty-alleviation"
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ink/10 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Hover Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-magenta to-magenta-deep flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                      Essential Welfare
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                    Poverty Alleviation &amp; Practical Grants
                  </h3>

                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    Comprehensive support to reduce household expenses, access emergency welfare
                    grants for essential white goods, furniture, and employment pathways.
                  </p>

                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Advice on energy, money, debt &amp; benefits</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Income maximisation &amp; household bill reduction</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Grants for essential white goods &amp; furniture</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Skills development, volunteering &amp; employment support</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <Link
                    to="/beneficiary"
                    className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full cursor-pointer"
                  >
                    <span>Request Support</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Card 3: Money, Debt & Energy Support */}
              <div
                id="money-debt-energy"
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ink/10 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Hover Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-magenta to-magenta-deep flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                      Financial Wellbeing
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                    Money, Debt &amp; Energy Support
                  </h3>

                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    Expert debt management advice, benefit entitlement assessments, and household
                    energy efficiency optimization.
                  </p>

                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>FCA authorized debt &amp; money management advice</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Emergency fuel &amp; energy bill assistance</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Benefit applications &amp; appeal guidance</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                      <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Household budget structuring</span>
                    </li>
                  </ul>
                </div>

                <div>
                  {/* Highlight callout box */}
                  <div className="mt-2 sm:mt-4 mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-gold/15 border border-gold/30">
                    <p className="text-xs font-bold text-ink mb-2">
                      💡 Big Energy Saving Network: "Check, switch and save on your energy bills today"
                    </p>
                    <a
                      href="#energy-support"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-magenta-deep hover:text-magenta transition-colors"
                    >
                      <span>Find out more</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <Link
                    to="/beneficiary"
                    className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full cursor-pointer"
                  >
                    <span>Request Support</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                to="/beneficiary"
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
