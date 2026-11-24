import { Link } from "react-router-dom";
import {
  Shield,
  CircleCheck,
  HeartHandshake,
  Zap,
  ArrowRight,
  ExternalLink,
} from "./Icons";

const fallbackImages = {
  domesticAbuse:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  povertyAlleviation:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  moneyDebtEnergy:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
};

export function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-[#FFF0F5]/50 relative">
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
            We work directly alongside individuals and families across Leicester and Leicestershire to deliver practical solutions, emotional safety, and financial empowerment.
          </p>
        </div>

        {/* 3 Core Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Domestic Abuse, Honour-Based Violence & FGM */}
          <div
            id="domestic-abuse"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group relative"
          >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div>
              {/* Card Photo Header with Gradient & Location Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-ink/5">
                <img
                  alt="Domestic Abuse & Violence Support"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={fallbackImages.domesticAbuse}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/85 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  Leicester &amp; Leicestershire Hub
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Safety &amp; Recovery
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Specialist Crisis Advocacy &amp; Protection
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Domestic Abuse, Honour-Based Violence &amp; FGM
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5">
                  Bespoke one-to-one support, confidential crisis advice, survivor safety planning, and specialized recovery sessions to help women and families rebuild their lives safely.
                </p>

                <ul className="space-y-2 sm:space-y-2.5 mb-2">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Bespoke 1-to-1 crisis &amp; ongoing survivor advocacy</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Honour-based violence &amp; FGM specialist intervention</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>The Freedom Programme &amp; group empowerment sessions</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Confidential emotional recovery &amp; safety planning</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <Link
                to="/contact?service=domestic-abuse"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 text-magenta group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Card 2: Poverty Alleviation & Practical Grants */}
          <div
            id="poverty-alleviation"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group relative"
          >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div>
              {/* Card Photo Header with Gradient & Location Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-ink/5">
                <img
                  alt="Poverty Alleviation & Essential Welfare"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={fallbackImages.povertyAlleviation}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/85 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  Emergency Welfare Support
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Essential Welfare
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Practical Relief &amp; Hardship Grants
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Poverty Alleviation &amp; Practical Grants
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5">
                  Comprehensive practical support to alleviate acute hardship, secure essential emergency white goods, furniture grants, emergency food vouchers, and employment pathways.
                </p>

                <ul className="space-y-2 sm:space-y-2.5 mb-2">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Grants for essential white goods &amp; household furniture</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Emergency food bank vouchers &amp; immediate hardship relief</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Income maximisation &amp; reducing everyday living costs</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Skills development, CV coaching &amp; employment access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <Link
                to="/contact?service=poverty-alleviation"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 text-magenta group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Card 3: Money, Debt & Energy Support */}
          <div
            id="money-debt-energy"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group relative"
          >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div>
              {/* Card Photo Header with Gradient & Location Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-ink/5">
                <img
                  alt="Money, Debt & Energy Advice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={fallbackImages.moneyDebtEnergy}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/85 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  FCA Authorised · Firm Ref: 626897
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-magenta fill-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Financial Wellbeing
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Regulated Debt &amp; Energy Relief
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Money, Debt &amp; Energy Support
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5">
                  Free, confidential FCA-authorised debt advice, emergency prepayment meter fuel vouchers, welfare benefit appeal representation, and household budgeting guidance.
                </p>

                <ul className="space-y-2 sm:space-y-2.5 mb-5">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>FCA-authorised free, confidential debt solutions</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Emergency fuel vouchers &amp; prepayment utility credits</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Benefit entitlement checks &amp; tribunal appeal support</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                    <CircleCheck className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Structured household budgeting &amp; energy tariff guidance</span>
                  </li>
                </ul>

                {/* Big Energy Saving Network Callout */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-gold/15 border border-gold/30">
                  <p className="text-[11px] font-bold text-ink mb-1">
                    💡 Big Energy Saving Network: "Check, switch and save on your energy bills today"
                  </p>
                  <Link
                    to="/contact?service=money-debt-energy"
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-magenta-deep hover:text-magenta transition-colors"
                  >
                    <span>Get energy assistance</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <Link
                to="/contact?service=money-debt-energy"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Request Support</span>
                <ArrowRight className="w-4 h-4 text-magenta group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;
