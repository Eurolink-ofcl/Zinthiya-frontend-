import { MapPin, Clock, Phone, Mail } from "./Icons";
import zinthiyaLogo from "../images/zinthiya-logo-DrNqELQE.svg";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white pt-16 pb-12 relative border-t border-magenta/20">
      {/* Top Gradient Border Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-gold to-magenta" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Charity Information & Logo */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
              <img
                alt="The Zinthiya Trust Logo"
                className="h-10 w-auto"
                src={zinthiyaLogo}
              />
            </div>
            
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              The Zinthiya Trust is a registered charity in England and Wales.
            </p>

            <div className="space-y-1 text-xs text-gold font-semibold">
              <p>Charity No: 1137350</p>
              <p>Financial Conduct Authority (FCA) Authorisation Line</p>
              <p>FCA Reference Number: 626897</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-white tracking-wide border-b border-magenta/40 pb-2 inline-block">
              Quick Links
            </h3>
            
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  About The Trust
                </a>
              </li>
              <li>
                <a href="#domestic-abuse" className="hover:text-gold transition-colors">
                  Domestic Abuse &amp; Violence Support
                </a>
              </li>
              <li>
                <a href="#poverty-alleviation" className="hover:text-gold transition-colors">
                  Poverty Alleviation &amp; Household Grants
                </a>
              </li>
              <li>
                <a href="#money-debt-energy" className="hover:text-gold transition-colors">
                  Money, Debt &amp; Energy Advice
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-gold transition-colors">
                  Online Booking Portal
                </a>
              </li>
              <li>
                <a href="#truth-travel" className="hover:text-gold transition-colors">
                  Truth Before Travel
                </a>
              </li>
              <li>
                <a href="#chapel-cafe" className="hover:text-gold transition-colors">
                  Chapel Café
                </a>
              </li>
              <li className="pt-1 border-t border-white/10">
                <a
                  href="/admin/login"
                  className="hover:text-gold transition-colors text-white/70 font-semibold flex items-center gap-1"
                >
                  <span>Staff &amp; Administrator Login</span>
                  <span className="text-[10px] text-gold">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Opening Hours */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-white tracking-wide border-b border-magenta/40 pb-2 inline-block">
              Contact &amp; Hours
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-magenta shrink-0 mt-0.5" aria-hidden="true" />
                <span>12 Bishop Street, Leicester, LE1 6AF</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-magenta shrink-0" aria-hidden="true" />
                <span>Office Hours: Monday - Friday, 9:30am - 4:00pm</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a href="tel:01162545168" className="hover:text-gold font-bold">
                  0116 254 5168
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-magenta shrink-0" aria-hidden="true" />
                <a href="mailto:info@zinthiyatrust.org" className="hover:text-gold">
                  info@zinthiyatrust.org
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 The Zinthiya Trust. All rights reserved. Registered UK Charity No. 1137350.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="/admin/login" className="hover:text-white transition-colors text-white/50 text-[11px]">
              Staff &amp; Administrator Login
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

