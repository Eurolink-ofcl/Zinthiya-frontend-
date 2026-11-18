import { Coffee, CalendarCheck, Compass, ArrowUpRight } from "./Icons";

const fallbackImages = {
  chapelCafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  bookingPortal: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  truthBeforeTravel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
};

export function CommunityProjects() {
  return (
    <section id="community-projects" className="py-12 sm:py-16 lg:py-24 bg-blush/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            Community Projects &amp; Access
          </span>
          <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl">
            Specialist Initiatives Building Hope
          </h2>
          <p className="text-ink-muted text-sm sm:text-lg leading-relaxed">
            Discover our welcoming community café, easy online appointment scheduling, and forced marriage prevention programs.
          </p>
        </div>

        {/* Initiatives 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Chapel Café */}
          <div
            id="chapel-cafe"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div>
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  alt="Chapel Café"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/chapel-cafe-CgNlKrsa.png"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.chapelCafe;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  12 Bishop Street, Leicester
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center">
                    <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Community Hub
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Community &amp; Connection
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Chapel Café
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  A welcoming community space in Leicester offering affordable home-cooked meals, warmth, and a friendly ear to reduce social isolation.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <a
                href="#chapel-cafe"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Visit Chapel Café</span>
                <ArrowUpRight className="w-4 h-4 text-magenta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Card 2: Online Booking Portal */}
          <div
            id="booking-portal"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div>
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  alt="Online Booking Portal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/online-booking-portal-TVs0t5ux.png"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.bookingPortal;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  Online Appointment Desk
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    24/7 Access
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Instant Appointment Scheduling
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Online Booking Portal
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  Easily book confidential advice sessions with our trained advisors online from the comfort and privacy of your home.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <a
                href="#booking"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Book An Appointment</span>
                <ArrowUpRight className="w-4 h-4 text-magenta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Card 3: Truth Before Travel */}
          <div
            id="truth-before-travel"
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div>
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  alt="Truth Before Travel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/truth-before-travel-B1qCVMg_.png"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.truthBeforeTravel;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  Specialist Protection Hub
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blush border border-magenta/20 flex items-center justify-center">
                    <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-magenta" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Specialist Initiative
                  </span>
                </div>

                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                  Safe Travel &amp; Forced Marriage Awareness
                </span>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-3 group-hover:text-magenta transition-colors">
                  Truth Before Travel
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  Vital information and support for individuals concerned about forced marriage, overseas travel risks, or honour abuse.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <a
                href="#truth-travel"
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-ink group-hover:text-magenta py-3 px-5 rounded-full bg-blush group-hover:bg-magenta-blush transition-colors w-full"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 text-magenta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CommunityProjects;

