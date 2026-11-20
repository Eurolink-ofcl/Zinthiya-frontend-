import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Globe, Menu, X, User, ChevronDown, Check } from "./Icons";
import zinthiyaLogo from "../images/zinthiya-logo-DrNqELQE.svg";

interface LanguageOption {
  code: string;
  name: string;
  short: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", short: "EN", flag: "🇬🇧" },
  { code: "es", name: "Español", short: "ES", flag: "🇪🇸" },
  { code: "pl", name: "Polski", short: "PL", flag: "🇵🇱" },
  { code: "ro", name: "Română", short: "RO", flag: "🇷🇴" },
  { code: "ta", name: "தமிழ்", short: "TA", flag: "🇱🇰" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(languages[0]);

  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-blush/40 backdrop-blur-lg border-b border-white/30 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Language Selector */}
          <div className="flex items-center shrink-0 z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  aria-expanded={langDropdownOpen}
                  aria-label="Select Language"
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-xs font-semibold border border-ink/10 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-magenta cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-magenta shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">
                    {selectedLang.flag} {selectedLang.name}
                  </span>
                  <span className="sm:hidden">
                    {selectedLang.flag} {selectedLang.short}
                  </span>
                  <ChevronDown className="w-3 h-3 text-ink/60" />
                </button>

                {/* Language Dropdown */}
                {langDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-44 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-ink/10 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/40">
                      Select Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                          selectedLang.code === lang.code
                            ? "bg-magenta/10 text-magenta font-bold"
                            : "text-ink hover:bg-blush/60 font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {selectedLang.code === lang.code && (
                          <Check className="w-3.5 h-3.5 text-magenta" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <Link
            to="/"
            className="flex items-center justify-center shrink-0 transition-transform hover:scale-105 my-1"
          >
            <img
              alt="The Zinthiya Trust Logo"
              className="h-10 sm:h-12 nav:h-14 w-auto object-contain drop-shadow-sm"
              src={zinthiyaLogo}
            />
          </Link>

          {/* Right: Desktop Navigation & Action Buttons */}
          <div className="hidden nav:flex items-center gap-3">
            {/* Dark Navigation Capsule */}
            <nav className="bg-ink/85 backdrop-blur-xl text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_32px_0_rgba(36,18,33,0.3)] flex items-center space-x-1 font-semibold text-sm border border-white/20 transition-all">
              <a
                href="#"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold"
              >
                Home
              </a>
              <a
                href="#about"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold"
              >
                About
              </a>
              <a
                href="#services"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold whitespace-nowrap"
              >
                Our Service
              </a>
              <a
                href="/donor/dashboard"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold whitespace-nowrap"
              >
                Donation
              </a>
              <a
                href="/beneficiary"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold whitespace-nowrap"
              >
                Beneficiary
              </a>
              <a
                href="#chapel-cafe"
                className="nav-shutter-link px-3.5 py-1.5 rounded-full text-white/90 hover:scale-105 font-bold whitespace-nowrap"
              >
                Chapel Cafe
              </a>
            </nav>

            {/* Direct Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-ink text-sm font-bold border border-ink/10 shadow-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-magenta cursor-pointer"
              aria-label="Sign In"
            >
              <User className="w-4 h-4 text-magenta" />
              <span>Login</span>
            </Link>

            {/* Contact CTA Button */}
            <a
              href="#contact"
              className="btn-3d-magenta px-6 py-2.5 rounded-full font-bold text-white shadow-pill-3d transition-transform hover:scale-105 shrink-0 inline-block text-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="nav:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-full text-ink hover:text-magenta hover:bg-white/60 backdrop-blur-md focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="nav:hidden mt-3 pt-3 pb-4 border-t border-white/40 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-ink/95 backdrop-blur-2xl text-white rounded-3xl p-4 shadow-2xl border border-white/10 space-y-3">
              <nav className="flex flex-col space-y-1">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition-colors"
                >
                  About
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition-colors"
                >
                  Our Service
                </a>
                <a
                  href="/donor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition-colors"
                >
                  Donation
                </a>
                <a
                  href="/beneficiary"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition-colors"
                >
                  Beneficiary
                </a>
                <a
                  href="#chapel-cafe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition-colors"
                >
                  Chapel Cafe
                </a>
              </nav>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/20 text-white font-bold text-sm transition-colors"
                >
                  <User className="w-4 h-4 text-magenta" />
                  <span>Login</span>
                </Link>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-3d-magenta flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-white text-sm shadow-pill-3d"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
