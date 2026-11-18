import { ArrowRight, Calendar, ExternalLink } from "./Icons";

interface NewsItem {
  id: string;
  category: string;
  date: string;
  source?: string;
  title: string;
  description: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    category: "Campaign",
    date: "Autumn 2025",
    title: "16 Days of Activism Campaign",
    description:
      "Joining global action to end violence against women and girls. Explore our local events and workshops taking place across Leicestershire.",
    link: "#news-1",
  },
  {
    id: "news-2",
    category: "Community Action",
    date: "Winter 2025",
    title: "Reduce Child Poverty in Leicestershire",
    description:
      "Our targeted winter grants and essential food/goods support initiatives aiding families impacted by the rising cost of living.",
    link: "#news-2",
  },
  {
    id: "news-3",
    category: "Press & Media",
    date: "Recent News",
    source: "📰 Leicester Mercury",
    title: "Major Concerns Over Domestic Abuse",
    description:
      "The Zinthiya Trust featured in the Leicester Mercury highlighting rising demand for domestic abuse refuge and advice in Leicester.",
    link: "#news-3",
  },
];

export function News() {
  return (
    <section
      id="news"
      className="py-12 sm:py-16 lg:py-24 bg-[#FDF1F6] relative overflow-hidden border-t border-magenta/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and "View All News" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm">
              News &amp; Media Coverage
            </span>
            <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl">
              Latest Campaign &amp; Leicestershire Updates
            </h2>
            <p className="text-ink-muted text-sm sm:text-lg leading-relaxed">
              Follow our advocacy, community campaigns, press releases, and Leicester Mercury feature articles.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#news-all"
              className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-magenta-blush shadow-sm border border-ink/10"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Responsive Horizontal Scroll on mobile / 3-Column Grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-5 sm:gap-6 pb-6 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[88vw] sm:w-[360px] md:w-auto bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
              style={{ opacity: 1, transform: "none" }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs text-ink-muted font-medium">
                    <Calendar className="w-3.5 h-3.5 text-magenta" aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {item.source && (
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold text-ink-muted uppercase tracking-wider bg-blush px-2.5 py-0.5 rounded-md mb-2">
                    {item.source}
                  </span>
                )}

                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink mb-3 group-hover:text-magenta transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  {item.description}
                </p>
              </div>

              <a
                href={item.link}
                className="inline-flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep pt-4 border-t border-ink/5 w-full group/link"
              >
                <span>Read article</span>
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default News;

