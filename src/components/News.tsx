import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Target,
  X,
  Heart,
} from "./Icons";
import { api, type CampaignRecord } from "../lib/api";

interface DisplayItem {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  link: string;
  targetAmount?: number | string;
  raisedAmount?: number | string;
  imageUrl?: string | null;
  rawCampaign: CampaignRecord;
}

function formatCampaignDate(dateStr?: string | null): string {
  if (!dateStr) return "Active Campaign";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Active Campaign";
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "Active Campaign";
  }
}

export function News() {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalCampaign, setModalCampaign] = useState<CampaignRecord | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCampaigns() {
      try {
        const res = await api.getCampaigns();
        const list = Array.isArray(res)
          ? res
          : ((res as any)?.data || (res as any)?.campaigns || []);

        if (isMounted && Array.isArray(list)) {
          // Filter to active campaigns and sort with newest created first
          const sorted = list
            .filter((c) => c.active !== false && c.status !== "ARCHIVED")
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );
          setCampaigns(sorted);
        }
      } catch (err) {
        console.warn("Could not fetch latest campaigns for News section:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCampaigns();
    return () => {
      isMounted = false;
    };
  }, []);

  // ONLY admin-created campaigns (up to 3 latest, sorted newest first)
  const displayItems: DisplayItem[] = campaigns.slice(0, 3).map((c) => ({
    id: c.id,
    category: c.campaignType === "EXTERNAL" ? "Community Campaign" : "Campaign",
    date: formatCampaignDate(c.createdAt || c.startDate),
    title: c.title,
    description: c.description,
    targetAmount: c.targetAmount,
    raisedAmount: c.raisedAmount,
    imageUrl: c.imageUrl,
    link: `/donor/dashboard?campaign=${c.id}`,
    rawCampaign: c,
  }));

  // If no campaigns have been created yet and loading is complete, do not render empty section
  if (!loading && displayItems.length === 0) {
    return null;
  }

  // Dynamic grid class: 1 campaign = centered max-w-xl; 2 = 2-cols max-w-4xl; 3 = 3-cols
  const gridClass =
    displayItems.length === 1
      ? "max-w-xl mx-auto"
      : displayItems.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
      : "flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-5 sm:gap-6 pb-6 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0";

  return (
    <section
      id="news"
      className="py-12 sm:py-16 lg:py-24 bg-[#FDF1F6] relative overflow-hidden border-t border-magenta/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and "View All Campaigns" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-magenta-blush text-magenta-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm">
              Latest Campaign
            </span>
            <h2 className="font-heading font-extrabold text-ink text-2xl sm:text-4xl lg:text-5xl">
              Latest Campaign &amp; Leicestershire Updates
            </h2>
            <p className="text-ink-muted text-sm sm:text-lg leading-relaxed">
              Support our community advocacy, emergency relief funds, and specialist welfare initiatives.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/donor/dashboard"
              className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-magenta-blush shadow-sm border border-ink/10"
            >
              <span>View All Campaigns</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Dynamic Card Container */}
        <div className={gridClass}>
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[88vw] sm:w-[360px] md:w-auto bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-ink/10 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top Hover Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-magenta via-gold to-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              <div>
                {/* Optional Campaign Image Header */}
                {item.imageUrl && (
                  <div className="relative h-44 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-5 overflow-hidden bg-ink/5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-4 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-gold bg-ink/85 px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                      Latest Campaign
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse" />
                    <span>{item.category}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs text-ink-muted font-medium">
                    <Calendar className="w-3.5 h-3.5 text-magenta" aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink mb-3 group-hover:text-magenta transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Target & Raised Progress for Admin Campaigns */}
                {item.targetAmount && Number(item.targetAmount) > 0 && (
                  <div className="mt-3 mb-4 p-3 rounded-2xl bg-blush/60 border border-magenta/15 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-magenta-deep flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-magenta" />
                        <span>Goal: £{Number(item.targetAmount).toLocaleString("en-GB")}</span>
                      </span>
                      <span className="font-extrabold text-xs text-ink">
                        £{Number(item.raisedAmount || 0).toLocaleString("en-GB")} raised
                      </span>
                    </div>
                    <div className="w-full bg-ink/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-magenta to-magenta-deep h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((Number(item.raisedAmount) || 0) / Number(item.targetAmount)) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-4 border-t border-ink/5 mt-auto flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setModalCampaign(item.rawCampaign)}
                  className="font-heading font-bold text-xs sm:text-sm text-ink-muted hover:text-magenta transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 font-heading font-bold text-xs sm:text-sm text-magenta hover:text-magenta-deep transition-colors group/link"
                >
                  <span>Support Campaign</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Detail Modal */}
        {modalCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-magenta/20 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setModalCampaign(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-ink-muted hover:text-magenta hover:bg-blush transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {modalCampaign.imageUrl && (
                <div className="relative h-48 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl bg-ink/5">
                  <img
                    src={modalCampaign.imageUrl}
                    alt={modalCampaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-xs font-extrabold uppercase tracking-wider text-gold bg-ink/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Campaign Details
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-magenta bg-magenta-blush px-3 py-1 rounded-full">
                    Active Charity Campaign
                  </span>
                  <span className="text-xs text-ink-muted font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-magenta" />
                    <span>{formatCampaignDate(modalCampaign.createdAt || modalCampaign.startDate)}</span>
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-ink">
                  {modalCampaign.title}
                </h3>

                <p className="text-ink-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {modalCampaign.description}
                </p>

                {modalCampaign.targetAmount && Number(modalCampaign.targetAmount) > 0 && (
                  <div className="p-4 rounded-2xl bg-blush/60 border border-magenta/15 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-magenta-deep flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-magenta" />
                        <span>Goal: £{Number(modalCampaign.targetAmount).toLocaleString("en-GB")}</span>
                      </span>
                      <span className="font-extrabold text-ink">
                        £{Number(modalCampaign.raisedAmount || 0).toLocaleString("en-GB")} raised
                      </span>
                    </div>
                    <div className="w-full bg-ink/10 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-magenta to-magenta-deep h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((Number(modalCampaign.raisedAmount) || 0) /
                                Number(modalCampaign.targetAmount)) *
                                100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center gap-3">
                  <Link
                    to={`/donor/dashboard?campaign=${modalCampaign.id}`}
                    onClick={() => setModalCampaign(null)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-magenta text-white font-extrabold text-sm hover:bg-magenta-deep shadow-md transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Donate to this Campaign</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setModalCampaign(null)}
                    className="px-5 py-3 rounded-full bg-blush text-ink font-bold text-sm hover:bg-magenta-blush transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default News;
