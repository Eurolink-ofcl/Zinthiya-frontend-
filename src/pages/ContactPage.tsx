import { useState, type FormEvent } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Check,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Send,
  MessagesSquare,
} from "../components/Icons";
import { api } from "../lib/api";

export function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<{ message: string; contactId?: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (!cleanName) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!cleanEmail) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!cleanMessage || cleanMessage.length < 5) {
      setErrorMsg("Please enter a message (at least 5 characters).");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await api.submitContactMessage({
        fullName: cleanName,
        phoneNumber: phoneNumber.trim() || undefined,
        email: cleanEmail,
        message: cleanMessage,
      });

      setSuccessData({
        message: res.message || "Thank you for contacting The Zinthiya Trust.",
        contactId: res.contactId,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit contact message:", err);
      setErrorMsg(
        err?.message || "Unable to send your message at this time. Please call our helpline directly or try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setSuccessData(null);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
    setErrorMsg("");
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5]/40 text-ink antialiased flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-magenta/15 via-[#FFF0F5]/60 to-transparent border-b border-magenta/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-magenta/10 text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-magenta" />
              <span>We Are Here For You • Confidential &amp; Free</span>
            </div>
            <h1 className="font-heading font-black text-ink text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
              Contact The Zinthiya Trust
            </h1>
            <p className="mt-4 sm:mt-6 text-ink-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you need urgent emergency assistance, information about our poverty relief and domestic abuse
              services, or want to partner with us, our team is ready to help.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Direct Contact Information Dossier (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                    Get in Touch Directly
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Our caseworkers, crisis advocates, and welfare advisors are on hand Monday through Friday to support
                    individuals and families across Leicester and Leicestershire.
                  </p>
                </div>

                {/* Information Cards */}
                <div className="space-y-4">
                  {/* Phone Helpline Card */}
                  <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center shrink-0 border border-pink-100">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Helpline &amp; Crisis Line
                      </div>
                      <a
                        href="tel:01162545168"
                        className="font-heading font-black text-lg text-magenta hover:underline block"
                      >
                        0116 254 5168
                      </a>
                      <p className="text-xs text-slate-500">
                        Direct confidential telephone line for crisis triage &amp; appointments.
                      </p>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center shrink-0 border border-pink-100">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        General &amp; Casework Email
                      </div>
                      <a
                        href="mailto:info@zinthiyatrust.org"
                        className="font-bold text-sm text-slate-900 hover:text-magenta transition-colors block"
                      >
                        info@zinthiyatrust.org
                      </a>
                      <p className="text-xs text-slate-500">
                        Email our team for support requests, partnerships, and enquiries.
                      </p>
                    </div>
                  </div>

                  {/* Office Location Card */}
                  <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center shrink-0 border border-pink-100">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Drop-In Community Hub
                      </div>
                      <div className="font-bold text-sm text-slate-900 leading-snug">
                        128 Evington Road, Leicester, LE2 1HL
                      </div>
                      <p className="text-xs text-slate-500">
                        Leicestershire, United Kingdom
                      </p>
                    </div>
                  </div>

                  {/* Duty Hours Card */}
                  <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center shrink-0 border border-pink-100">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Operating Hours
                      </div>
                      <div className="font-bold text-sm text-slate-900">
                        Mon – Fri: 9:00am – 4:30pm
                      </div>
                      <p className="text-xs text-slate-500">
                        Closed on weekends and UK bank holidays.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Charity Regulatory Badge */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-900 text-xs flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <p className="leading-relaxed">
                    <strong>UK Registered Charity No. 1137350</strong> • Authorized and regulated by the Financial Conduct
                    Authority (FCA No. 626897). All communications are confidential under UK GDPR.
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100 relative overflow-hidden">
                  
                  {/* Subtle decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta" />

                  {submitted ? (
                    /* Submission Success View */
                    <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-emerald-300">
                        <Check className="w-8 h-8" />
                      </div>

                      <h3 className="font-heading font-black text-2xl text-slate-900">
                        Message Sent Successfully!
                      </h3>

                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        {successData?.message ||
                          "Thank you for contacting The Zinthiya Trust. A dedicated caseworker or member of our team will review your message and reach out shortly."}
                      </p>

                      {successData?.contactId && (
                        <div className="inline-block px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-semibold">
                          Reference ID: {successData.contactId}
                        </div>
                      )}

                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2.5 rounded-full bg-magenta text-white font-bold text-xs hover:bg-magenta-deep transition-all shadow-md cursor-pointer"
                        >
                          Send Another Message
                        </button>
                        <a
                          href="tel:01162545168"
                          className="px-6 py-2.5 rounded-full bg-pink-50 text-magenta font-bold text-xs hover:bg-pink-100 transition-all border border-pink-200"
                        >
                          Call Emergency Line: 0116 254 5168
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Contact Form */
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="font-heading font-extrabold text-xl text-slate-900 flex items-center gap-2">
                          <MessagesSquare className="w-5 h-5 text-magenta" />
                          <span>Send Us a Direct Message</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Fill out the form below. We respond to all non-urgent enquiries within 1–2 business days.
                        </p>
                      </div>

                      {/* Error Alert Banner */}
                      {errorMsg && (
                        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* 1. Full Name */}
                      <div>
                        <label
                          htmlFor="contact-fullname"
                          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                          Full Name <span className="text-magenta">*</span>
                        </label>
                        <input
                          id="contact-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Jane Doe"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-magenta focus:ring-4 focus:ring-magenta/10 transition-all"
                        />
                      </div>

                      {/* 2 & 3. Phone Number & Email Address Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone Number */}
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                          >
                            Phone Number
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. 07123 456789"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-magenta focus:ring-4 focus:ring-magenta/10 transition-all"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                          >
                            Email Address <span className="text-magenta">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. jane.doe@example.com"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-magenta focus:ring-4 focus:ring-magenta/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* 4. Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between"
                        >
                          <span>
                            Message <span className="text-magenta">*</span>
                          </span>
                          <span className="text-[11px] font-normal text-slate-400">
                            {message.length}/3000 chars
                          </span>
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          maxLength={3000}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please let us know how we can support you, your family situation, or any questions you have..."
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-magenta focus:ring-4 focus:ring-magenta/10 transition-all resize-none"
                        />
                      </div>

                      {/* 5. Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full btn-3d-magenta py-3.5 sm:py-4 px-8 rounded-full font-heading font-extrabold text-white text-sm sm:text-base shadow-pill-3d transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                        >
                          {submitting ? (
                            <>
                              <RefreshCw className="w-5 h-5 text-white animate-spin" />
                              <span>Sending Your Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Message</span>
                              <ArrowUpRight className="w-5 h-5 text-white" />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center pt-2">
                        <p className="text-[11px] text-slate-400">
                          By submitting, you agree to The Zinthiya Trust contacting you regarding this inquiry. We will
                          never share your information with third parties.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactPage;
