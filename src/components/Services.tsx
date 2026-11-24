import { Link } from "react-router-dom";
import {
  Shield,
  CircleCheck,
  HeartHandshake,
  Zap,
  ExternalLink,
  ArrowRight,
} from "./Icons";

export function Services() {
  return (
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
            We work directly alongside individuals and families to deliver practical solutions, emotional safety, and financial empowerment.
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
                Bespoke one-to-one support, confidential crisis advice, mentoring, and specialized recovery sessions to help survivors rebuild their lives in safety.
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
                to="/contact?service=domestic-abuse"
                className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
                Comprehensive support to reduce household expenses, access emergency welfare grants for essential white goods, furniture, and employment pathways.
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
                to="/contact?service=poverty-alleviation"
                className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
                Expert debt management advice, benefit entitlement assessments, and household energy efficiency optimization.
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
                to="/contact?service=money-debt-energy"
                className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors pt-4 border-t border-ink/5 w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;

