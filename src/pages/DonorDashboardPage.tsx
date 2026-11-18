import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, DonorUser, DonorStats, DonationRecord, CampaignRecord } from "../lib/api";
import { downloadReceiptPdf } from "../lib/pdfReceipt";
import {
  Heart,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  X,
  Menu,
  LayoutDashboard,
  Compass,
  FileText,
  Settings,
  LogOut,
  PhoneCall,
  History,
  Search,
  Target,
  Info,
  CreditCard,
  AlertCircle,
  Lock,
  Download,
  Printer
} from "../components/Icons";

function ZinthiyaLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 160"
      style={{ height: "32px", width: "auto" }}
      fill="none"
    >
      <g transform="translate(10, 20)">
        <text
          x="0"
          y="90"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="800"
          fontSize="92"
          fill="#E6127E"
          letterSpacing="-2"
        >
          Zinth
        </text>

        <g transform="translate(245, 10) scale(1.2)">
          <circle cx="28" cy="18" r="6.5" fill="#E6127E" />
          <path d="M 28 24 C 20 16, 8 10, 0 12 C 10 16, 20 22, 26 28 Z" fill="#E6127E" />
          <path d="M 28 24 C 36 16, 48 10, 56 12 C 46 16, 36 22, 30 28 Z" fill="#E6127E" />
          <path d="M 28 28 C 22 36, 16 46, 6 56 C 18 54, 28 48, 30 42 C 34 50, 42 62, 50 68 C 42 58, 36 46, 32 36 Z" fill="#E6127E" />
          <path d="M 30 42 C 26 55, 20 72, 14 85 C 20 75, 26 62, 28 50 Z" fill="#E6127E" />
        </g>

        <text
          x="325"
          y="90"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="800"
          fontSize="92"
          fill="#E6127E"
          letterSpacing="-2"
        >
          ya
        </text>

        <text
          x="65"
          y="125"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="#E6127E"
          letterSpacing="1"
        >
          Ganeshpanchan
        </text>
        <text
          x="350"
          y="125"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="#E6127E"
          letterSpacing="2"
        >
          Trust
        </text>
      </g>
    </svg>
  );
}

// Helper to parse narrative description and structured key objectives from database description
function parseCampaignContent(desc: string) {
  if (!desc) return { overview: "", objectives: [] as string[] };
  const parts = desc.split(/Key Objectives:?/i);
  const overview = parts[0]?.trim() || "";
  let objectives: string[] = [];
  if (parts[1]) {
    objectives = parts[1]
      .split("\n")
      .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
      .filter(Boolean);
  }
  return { overview, objectives };
}

export function DonorDashboardPage() {
  const navigate = useNavigate();

  // Navigation tab state: Dashboard -> Active Campaigns -> Make a Donation -> Donation History -> Profile & Settings
  const [activeTab, setActiveTab] = useState<"dashboard" | "campaigns" | "donate" | "donations" | "profile">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Real Database State (ZERO mock data)
  const [donor, setDonor] = useState<DonorUser | null>(null);
  const [stats, setStats] = useState<DonorStats | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);

  // Loading & Error State
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Campaign Detailed View State
  const [detailedCampaign, setDetailedCampaign] = useState<CampaignRecord | null>(null);
  const [campaignSearch, setCampaignSearch] = useState("");
  const [campaignCategoryFilter, setCampaignCategoryFilter] = useState("ALL");

  // Quick Donation Modal State
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [donateAmount, setDonateAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donateType, setDonateType] = useState<"ONE_OFF" | "RECURRING">("ONE_OFF");
  const [giftAid, setGiftAid] = useState(true);
  const [submittingDonation, setSubmittingDonation] = useState(false);
  const [donationSuccessMsg, setDonationSuccessMsg] = useState("");

  // --- DEDICATED "MAKE A DONATION" PAGE STATE ---
  const [pageDonateCampaignId, setPageDonateCampaignId] = useState<string>("");
  const [pageDonateAmount, setPageDonateAmount] = useState<number>(25);
  const [pageCustomAmount, setPageCustomAmount] = useState<string>("");
  const [pageDonateType, setPageDonateType] = useState<"ONE_OFF" | "RECURRING">("ONE_OFF");
  const [pageRecurringFrequency, setPageRecurringFrequency] = useState<"MONTHLY" | "QUARTERLY" | "ANNUALLY">("MONTHLY");
  const [pageGiftAid, setPageGiftAid] = useState<boolean>(true);
  const [showSwitchCampaign, setShowSwitchCampaign] = useState<boolean>(false);

  // Donor Confirmation Details
  const [donorNameConfirm, setDonorNameConfirm] = useState<string>("");
  const [donorEmailConfirm, setDonorEmailConfirm] = useState<string>("");
  const [donorPhoneConfirm, setDonorPhoneConfirm] = useState<string>("");
  const [donorAddressConfirm, setDonorAddressConfirm] = useState<string>("");
  const [donorTownConfirm, setDonorTownConfirm] = useState<string>("");
  const [donorPostcodeConfirm, setDonorPostcodeConfirm] = useState<string>("");

  // Payment Gateway Form Simulation
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "BANK" | "PAYPAL">("CARD");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState<string>("12/28");
  const [cardCvc, setCardCvc] = useState<string>("888");

  // Payment Execution & Status
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<"IDLE" | "SUCCESS" | "FAILURE">("IDLE");
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentReceipt, setPaymentReceipt] = useState<any>(null);

  // Donation History & Receipt View State
  const [viewReceiptDonation, setViewReceiptDonation] = useState<DonationRecord | null>(null);
  const [historySearch, setHistorySearch] = useState<string>("");
  const [historyTypeFilter, setHistoryTypeFilter] = useState<"ALL" | "ONE_OFF" | "RECURRING">("ALL");
  const [historyStatusFilter, setHistoryStatusFilter] = useState<"ALL" | "COMPLETED" | "PENDING">("ALL");

  // Profile Form State
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileTown, setProfileTown] = useState("");
  const [profilePostcode, setProfilePostcode] = useState("");
  const [profileNewsletter, setProfileNewsletter] = useState(true);
  const [profileSms, setProfileSms] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [profileErrMsg, setProfileErrMsg] = useState("");

  // Fetch real data on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    const token = api.getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // Parallel fetch of real database entities
      const [profileRes, statsRes, donationsRes, campaignsRes] = await Promise.all([
        api.getDonorProfile(),
        api.getDonorStats(),
        api.getMyDonations(),
        api.getCampaigns(),
      ]);

      setDonor(profileRes);
      setStats(statsRes);
      setDonations(donationsRes);
      setCampaigns(campaignsRes);

      // Populate profile form fields
      setProfileName(profileRes.fullName || "");
      setProfilePhone(profileRes.phoneNumber || "");
      setProfileAddress(profileRes.address || "");
      setProfileTown(profileRes.townCity || "");
      setProfilePostcode(profileRes.postcode || "");
      setProfileNewsletter(profileRes.emailNewsletter ?? true);
      setProfileSms(profileRes.smsAlerts ?? false);

      // Populate donor confirmation defaults for Make a Donation page
      setDonorNameConfirm(profileRes.fullName || "");
      setDonorEmailConfirm(profileRes.email || "");
      setDonorPhoneConfirm(profileRes.phoneNumber || "");
      setDonorAddressConfirm(profileRes.address || "");
      setDonorTownConfirm(profileRes.townCity || "");
      setDonorPostcodeConfirm(profileRes.postcode || "");
      setCardName(profileRes.fullName || "");

      if (campaignsRes.length > 0) {
        if (!selectedCampaignId) setSelectedCampaignId(campaignsRes[0].id);
        if (!pageDonateCampaignId) setPageDonateCampaignId(campaignsRes[0].id);
      }
    } catch (err: any) {
      if (err.status === 401) {
        api.clearSession();
        navigate("/login");
      } else {
        setErrorMsg(err.message || "Unable to fetch donor dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    api.clearSession();
    navigate("/login");
  }

  function _openDonateModal(campaignId?: string) {
    if (campaignId) setSelectedCampaignId(campaignId);
    setDonationSuccessMsg("");
    setShowDonateModal(true);
  }

  function navigateToMakeDonation(campaignId?: string) {
    if (campaignId) setPageDonateCampaignId(campaignId);
    setPaymentStatus("IDLE");
    setPaymentError("");
    setActiveTab("donate");
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Handle Quick Modal Donation
  async function handleProcessDonation(e: React.FormEvent) {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : donateAmount;
    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a donation amount of at least £1.00");
      return;
    }

    setSubmittingDonation(true);
    try {
      await api.makeDonation({
        amount: finalAmount,
        type: donateType,
        giftAid,
        campaignId: selectedCampaignId || undefined,
        paymentMethod: "Credit/Debit Card",
      });

      setDonationSuccessMsg(
        `Thank you! Your donation of £${finalAmount.toFixed(2)} was recorded successfully.`
      );

      // Refresh real statistics and history from PostgreSQL
      await loadDashboardData();

      setTimeout(() => {
        setShowDonateModal(false);
        setCustomAmount("");
      }, 1500);
    } catch (err: any) {
      alert(err.message || "Failed to process donation. Please try again.");
    } finally {
      setSubmittingDonation(false);
    }
  }

  // Handle Dedicated Page Donation (Full Flow with Gateway & Receipt)
  async function handleProcessPageDonation(e: React.FormEvent) {
    e.preventDefault();
    const finalAmount = pageCustomAmount ? parseFloat(pageCustomAmount) : pageDonateAmount;
    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a donation amount of at least £1.00");
      return;
    }

    if (!donorNameConfirm.trim()) {
      alert("Please confirm your full name for the donation receipt.");
      return;
    }

    setPaymentProcessing(true);
    setPaymentError("");

    try {
      const selectedCamp = campaigns.find((c) => c.id === pageDonateCampaignId) || campaigns[0];
      const targetCampId = selectedCamp?.id || pageDonateCampaignId;
      const generatedTxn = `TXN${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedRef = `ZT-${Date.now().toString(36).toUpperCase()}`;

      // Execute live PostgreSQL donation via backend API
      const res = await api.makeDonation({
        amount: finalAmount,
        type: pageDonateType,
        frequency: pageDonateType === "RECURRING" ? pageRecurringFrequency : undefined,
        giftAid: pageGiftAid,
        campaignId: targetCampId || undefined,
        paymentMethod:
          paymentMethod === "CARD"
            ? "Credit/Debit Card"
            : paymentMethod === "BANK"
            ? "Direct Debit / Bank"
            : "PayPal",
        reference: generatedRef,
        donorName: donorNameConfirm,
        donorEmail: donorEmailConfirm,
        notes: `${pageDonateType === "RECURRING" ? `Recurring (${pageRecurringFrequency})` : "One-time"} donation to ${selectedCamp?.title || "Campaign"}`,
      });

      // Update donor contact details in database if they modified them
      if (
        donorNameConfirm !== donor?.fullName ||
        donorPhoneConfirm !== donor?.phoneNumber ||
        donorAddressConfirm !== donor?.address ||
        donorTownConfirm !== donor?.townCity ||
        donorPostcodeConfirm !== donor?.postcode
      ) {
        await api
          .updateDonorProfile({
            fullName: donorNameConfirm,
            phoneNumber: donorPhoneConfirm,
            address: donorAddressConfirm,
            townCity: donorTownConfirm,
            postcode: donorPostcodeConfirm,
          })
          .catch(() => {});
      }

      // Prepare verified receipt state
      setPaymentReceipt({
        id: res.donation?.id,
        reference: res.donation?.reference || generatedRef,
        transactionId: generatedTxn,
        amount: finalAmount,
        type: pageDonateType,
        frequency: pageDonateType === "RECURRING" ? pageRecurringFrequency : undefined,
        giftAid: pageGiftAid,
        campaignTitle: selectedCamp?.title || "shelter",
        campaignDescription: selectedCamp?.description || "shelter for homeless people",
        donorName: donorNameConfirm || donor?.fullName || "Valued Supporter",
        donorEmail: donorEmailConfirm || donor?.email || "",
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        paymentMethod:
          paymentMethod === "CARD"
            ? "Credit/Debit Card"
            : paymentMethod === "BANK"
            ? "Direct Debit"
            : "PayPal",
        status: "Successful",
        rawDonation: res.donation,
      });

      setPaymentStatus("SUCCESS");

      // Reload live PostgreSQL records
      await loadDashboardData();
    } catch (err: any) {
      setPaymentError(
        err.message || "Payment gateway could not process this transaction. Please verify card details and try again."
      );
      setPaymentStatus("FAILURE");
    } finally {
      setPaymentProcessing(false);
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccessMsg("");
    setProfileErrMsg("");
    try {
      const updated = await api.updateDonorProfile({
        fullName: profileName,
        phoneNumber: profilePhone,
        address: profileAddress,
        townCity: profileTown,
        postcode: profilePostcode,
        emailNewsletter: profileNewsletter,
        smsAlerts: profileSms,
      });
      setDonor(updated);
      setProfileSuccessMsg("Profile details updated successfully.");
      setTimeout(() => setProfileSuccessMsg(""), 4000);
    } catch (err: any) {
      setProfileErrMsg(err.message || "Failed to update profile details.");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleDownloadReceipt(d: DonationRecord | any) {
    downloadReceiptPdf(d, donor);
  }

  function handlePrintReceipt() {
    window.print();
  }

  // Filtered donations for the Donation History Tab
  const filteredDonations = donations.filter((d) => {
    if (historyTypeFilter !== "ALL" && d.type !== historyTypeFilter) return false;
    if (historyStatusFilter !== "ALL" && (d.status || "COMPLETED") !== historyStatusFilter) return false;
    if (historySearch.trim()) {
      const q = historySearch.toLowerCase().trim();
      const ref = (d.reference || "").toLowerCase();
      const camp = (d.campaign?.title || "").toLowerCase();
      const amt = String(d.amount);
      if (!ref.includes(q) && !camp.includes(q) && !amt.includes(q)) return false;
    }
    return true;
  });

  // Filtered campaigns for the Campaigns Tab
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(campaignSearch.toLowerCase());
    if (campaignCategoryFilter === "WARMTH") {
      return matchesSearch && c.title.toLowerCase().includes("warmth");
    }
    if (campaignCategoryFilter === "FOOD") {
      return matchesSearch && (c.title.toLowerCase().includes("cafe") || c.title.toLowerCase().includes("kitchen"));
    }
    if (campaignCategoryFilter === "SANCTUARY") {
      return matchesSearch && (c.title.toLowerCase().includes("sanctuary") || c.title.toLowerCase().includes("women"));
    }
    return matchesSearch;
  });

  // Total funds raised across all campaigns
  const totalCampaignTarget = campaigns.reduce((acc, c) => acc + Number(c.targetAmount || 0), 0);
  const totalCampaignRaised = campaigns.reduce((acc, c) => acc + Number(c.raisedAmount || 0), 0);
  const totalCampaignPercent = totalCampaignTarget > 0 ? Math.min(100, Math.round((totalCampaignRaised / totalCampaignTarget) * 100)) : 0;

  // Sidebar navigation items: Dashboard -> Active Campaigns -> Make a Donation -> Donation History -> Profile & Settings
  const navItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "campaigns" as const, label: "Active Campaigns", icon: Compass, badge: campaigns.length },
    { id: "donate" as const, label: "Make a Donation", icon: Heart },
    { id: "donations" as const, label: "Donation History", icon: Clock, badge: donations.length },
    { id: "profile" as const, label: "Profile & Settings", icon: User },
  ];

  // Currently selected campaign object for Make a Donation
  const activeSelectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);
  const pageSelectedCampaign = campaigns.find((c) => c.id === pageDonateCampaignId) || campaigns[0];

  // Calculate live amount for the Make a Donation Page
  const currentDonationAmount = pageCustomAmount ? parseFloat(pageCustomAmount) || 0 : pageDonateAmount;
  const currentGiftAidAmount = pageGiftAid ? currentDonationAmount * 0.25 : 0;
  const currentTotalCharityValue = currentDonationAmount + currentGiftAidAmount;

  return (
    <div
      style={{
        backgroundColor: "#FBF7F9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        color: "#241221",
        position: "relative"
      }}
    >
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(36, 18, 33, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 40
          }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside
        style={{
          width: "270px",
          minWidth: "270px",
          height: "100vh",
          position: "sticky",
          top: 0,
          backgroundColor: "#ffffff",
          borderRight: "1px solid rgba(230, 18, 126, 0.12)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 16px",
          boxShadow: "2px 0 16px rgba(36, 18, 33, 0.03)",
          zIndex: 50,
          overflowY: "auto",
          flexShrink: 0,
          transform: mobileSidebarOpen ? "translateX(0)" : undefined,
        }}
        className={`${mobileSidebarOpen ? "fixed left-0 top-0" : "hidden lg:flex"}`}
      >
        <div>
          {/* Logo & Portal Badge */}
          <div style={{ padding: "0 6px 20px 6px", borderBottom: "1px solid rgba(230, 18, 126, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link to="/" title="The Zinthiya Trust Homepage" style={{ display: "block" }}>
                <ZinthiyaLogo />
              </Link>
              {/* Close Button on Mobile Drawer */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden"
                style={{
                  background: "none",
                  border: "none",
                  color: "#8E7287",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                <X size={20} style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  backgroundColor: "#FCE8F3",
                  color: "#B80C64"
                }}
              >
                <Sparkles size={11} style={{ width: "11px", height: "11px" }} />
                <span>Donor Portal</span>
              </span>
              <span style={{ fontSize: "10px", color: "#8E7287", fontWeight: 600 }}>
                Charity #1137350
              </span>
            </div>
          </div>

          {/* Navigation Menu (Dashboard -> Active Campaigns -> Make a Donation -> Donation History -> Profile & Settings) */}
          <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8E7287",
                padding: "0 12px 6px 12px"
              }}
            >
              Donor Navigation
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === "donate") {
                      setPaymentStatus("IDLE");
                      setPaymentError("");
                    }
                    setMobileSidebarOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "14px",
                    border: "none",
                    backgroundColor: isActive ? "#FCE8F3" : "transparent",
                    color: isActive ? "#B80C64" : "#5C475A",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    borderLeft: isActive ? "4px solid #E6127E" : "4px solid transparent"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconComp
                      size={18}
                      style={{
                        width: "18px",
                        height: "18px",
                        color: isActive ? "#E6127E" : "#8E7287"
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                  {typeof item.badge === "number" && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "1px 7px",
                        borderRadius: "9999px",
                        backgroundColor: isActive ? "#E6127E" : "rgba(36, 18, 33, 0.08)",
                        color: isActive ? "#ffffff" : "#5C475A"
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button in Sidebar */}
          <div style={{ marginTop: "24px", padding: "0 4px" }}>
            <button
              type="button"
              onClick={() => navigateToMakeDonation()}
              className="btn-3d-magenta"
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(230, 18, 126, 0.25)"
              }}
            >
              <Heart size={16} style={{ width: "16px", height: "16px" }} />
              <span>Make a Donation</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: User Card, Helpline & Logout */}
        <div style={{ borderTop: "1px solid rgba(230, 18, 126, 0.08)", paddingTop: "16px", marginTop: "auto" }}>
          {donor && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "14px",
                backgroundColor: "rgba(253, 240, 244, 0.6)",
                marginBottom: "12px",
                border: "1px solid rgba(230, 18, 126, 0.12)"
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#E6127E",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  flexShrink: 0
                }}
              >
                {donor.fullName ? donor.fullName.charAt(0).toUpperCase() : "D"}
              </div>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#241221",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {donor.fullName}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      backgroundColor: "#FCE8F3",
                      color: "#B80C64",
                      padding: "1px 6px",
                      borderRadius: "9999px"
                    }}
                  >
                    {stats?.donationTier || donor.donationTier || "SUPPORTER"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            <span style={{ fontSize: "10px", color: "#8E7287" }}>
              Helpline: <strong>0116 254 5168</strong>
            </span>
            <button
              onClick={handleLogout}
              title="Sign out"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                border: "none",
                background: "none",
                fontSize: "12px",
                fontWeight: 700,
                color: "#8E7287",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "8px"
              }}
            >
              <LogOut size={14} style={{ width: "14px", height: "14px" }} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, minHeight: "100vh" }}>
        {/* Top Header Bar */}
        <header
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(230, 18, 126, 0.12)",
            position: "sticky",
            top: 0,
            zIndex: 30,
            padding: "12px 24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            {/* Mobile Menu Toggle & Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden"
                style={{
                  background: "none",
                  border: "1px solid rgba(36, 18, 33, 0.15)",
                  borderRadius: "8px",
                  padding: "6px",
                  color: "#241221",
                  cursor: "pointer"
                }}
              >
                <Menu size={20} style={{ width: "20px", height: "20px" }} />
              </button>

              <div>
                <h1 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                  {activeTab === "dashboard" && "Donor Dashboard"}
                  {activeTab === "campaigns" && "All Available Relief Campaigns"}
                  {activeTab === "donate" && "Make a Donation"}
                  {activeTab === "donations" && "Donation History & Receipts"}
                  {activeTab === "profile" && "Profile & Communication Preferences"}
                </h1>
                <p style={{ fontSize: "11px", color: "#8E7287", margin: 0 }}>
                  The Zinthiya Trust • Verified Giving Record
                </p>
              </div>
            </div>

            {/* Quick Actions & Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => navigateToMakeDonation()}
                className="btn-3d-magenta"
                style={{
                  height: "36px",
                  padding: "0 16px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer"
                }}
              >
                <Heart size={14} style={{ width: "14px", height: "14px" }} />
                <span>Donate</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(36, 18, 33, 0.15)",
                  color: "#5C475A",
                  cursor: "pointer"
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <main style={{ flex: 1, padding: "28px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "3px solid #E6127E",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  margin: "0 auto 16px auto",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#5C475A" }}>
                Loading real donor metrics...
              </p>
            </div>
          ) : errorMsg ? (
            <div
              style={{
                padding: "24px",
                borderRadius: "16px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                color: "#991B1B",
                textAlign: "center"
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: "8px" }}>Failed to load donor data</p>
              <p style={{ fontSize: "13px", marginBottom: "16px" }}>{errorMsg}</p>
              <button
                onClick={loadDashboardData}
                className="px-4 py-2 rounded-full font-bold text-xs text-white"
                style={{ backgroundColor: "#E6127E" }}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD (Overview with KPI stats, quick actions, campaigns preview, recent donations) */}
              {activeTab === "dashboard" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {/* Welcome Greeting Banner */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #241221 0%, #401838 100%)",
                      borderRadius: "24px",
                      padding: "28px 32px",
                      color: "#ffffff",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 12px 30px -8px rgba(36, 18, 33, 0.25)"
                    }}
                  >
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#F59E0B",
                          marginBottom: "8px"
                        }}
                      >
                        Donor Dashboard
                      </span>
                      <h2 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                        Welcome back, {donor?.fullName || "Valued Supporter"}!
                      </h2>
                      <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.8)", maxWidth: "600px", lineHeight: "1.5" }}>
                        Thank you for standing with The Zinthiya Trust. Your generosity directly alleviates poverty and supports domestic abuse survivors across Leicestershire.
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Row: Total Amount Donated, Number of Donations & Quick Action */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "20px"
                    }}
                  >
                    {/* Item 1: Total Amount Donated */}
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        border: "1px solid rgba(230, 18, 126, 0.15)",
                        boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Total Amount Donated
                        </span>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "12px",
                            backgroundColor: "#FCE8F3",
                            color: "#E6127E",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Heart size={18} style={{ width: "18px", height: "18px" }} />
                        </div>
                      </div>

                      <div style={{ fontSize: "32px", fontWeight: 800, color: "#241221", letterSpacing: "-0.02em" }}>
                        £{Number(stats?.totalDonated || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                        <span style={{ fontSize: "12px", color: "#5C475A" }}>Giving Tier:</span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            backgroundColor: "#FCE8F3",
                            color: "#B80C64",
                            padding: "2px 8px",
                            borderRadius: "9999px"
                          }}
                        >
                          {stats?.donationTier || "SUPPORTER"}
                        </span>
                      </div>
                    </div>

                    {/* Item 2: Number of Donations */}
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        border: "1px solid rgba(230, 18, 126, 0.15)",
                        boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Number of Donations
                        </span>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "12px",
                            backgroundColor: "#ECFDF5",
                            color: "#059669",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <HeartHandshake size={18} style={{ width: "18px", height: "18px" }} />
                        </div>
                      </div>

                      <div style={{ fontSize: "32px", fontWeight: 800, color: "#241221", letterSpacing: "-0.02em" }}>
                        {stats?.totalDonations ?? 0}
                        <span style={{ fontSize: "16px", fontWeight: 600, color: "#8E7287", marginLeft: "6px" }}>
                          {stats?.totalDonations === 1 ? "gift" : "gifts"}
                        </span>
                      </div>

                      <div style={{ fontSize: "12px", color: "#5C475A", marginTop: "8px" }}>
                        {stats?.lastDonationDate
                          ? `Last gift: ${new Date(stats.lastDonationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                          : "No gifts recorded yet"}
                      </div>
                    </div>

                    {/* Item 3: Quick Action to Make a Donation */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #FCE8F3 0%, #FFFFFF 100%)",
                        borderRadius: "20px",
                        padding: "24px",
                        border: "1.5px dashed #E6127E",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "#B80C64"
                          }}
                        >
                          Quick Action
                        </span>
                        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", marginTop: "4px" }}>
                          Make a Donation
                        </h3>
                        <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "4px" }}>
                          Support Leicester families facing emergency energy poverty or crisis.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateToMakeDonation()}
                        className="btn-3d-magenta rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4 transition-transform hover:scale-[1.02]"
                        style={{ height: "42px", width: "100%" }}
                      >
                        <span>+ Donate Now</span>
                        <ArrowRight size={15} style={{ width: "15px", height: "15px" }} />
                      </button>
                    </div>
                  </div>

                  {/* Active Campaigns Preview Section */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <div>
                        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#241221" }}>
                          Active Fundraising Campaigns
                        </h2>
                        <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "2px" }}>
                          Current relief initiatives operating across Leicester and Leicestershire.
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#059669",
                            backgroundColor: "#ECFDF5",
                            padding: "4px 12px",
                            borderRadius: "9999px"
                          }}
                        >
                          {campaigns.length} Active Causes
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("campaigns")}
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#E6127E",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <span>View all</span>
                          <ArrowRight size={12} style={{ width: "12px", height: "12px" }} />
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px"
                      }}
                    >
                      {campaigns.slice(0, 3).map((camp) => {
                        const raised = Number(camp.raisedAmount || 0);
                        const target = Number(camp.targetAmount || 1);
                        const pct = Math.min(100, Math.round((raised / target) * 100));
                        const { overview } = parseCampaignContent(camp.description);

                        return (
                          <div
                            key={camp.id}
                            style={{
                              borderRadius: "20px",
                              border: "1px solid rgba(36, 18, 33, 0.1)",
                              backgroundColor: "#FDF9FB",
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              boxShadow: "0 4px 12px rgba(36, 18, 33, 0.03)"
                            }}
                          >
                            {camp.imageUrl && (
                              <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
                                <img
                                  src={camp.imageUrl}
                                  alt={camp.title}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  loading="lazy"
                                />
                                <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: 800,
                                      padding: "3px 8px",
                                      borderRadius: "9999px",
                                      backgroundColor: "rgba(36, 18, 33, 0.75)",
                                      color: "#ffffff"
                                    }}
                                  >
                                    Leicester Cause
                                  </span>
                                </div>
                              </div>
                            )}

                            <div style={{ padding: "18px" }}>
                              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", marginBottom: "6px" }}>
                                {camp.title}
                              </h3>
                              <p style={{ fontSize: "12px", color: "#5C475A", lineHeight: "1.5", marginBottom: "16px" }}>
                                {overview || camp.description}
                              </p>

                              <div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>
                                  <span style={{ color: "#E6127E" }}>
                                    £{raised.toLocaleString()} raised
                                  </span>
                                  <span style={{ color: "#8E7287" }}>
                                    Goal: £{target.toLocaleString()} ({pct}%)
                                  </span>
                                </div>

                                <div
                                  style={{
                                    width: "100%",
                                    height: "8px",
                                    backgroundColor: "rgba(36, 18, 33, 0.08)",
                                    borderRadius: "9999px",
                                    overflow: "hidden",
                                    marginBottom: "16px"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${pct}%`,
                                      height: "100%",
                                      backgroundColor: "#E6127E",
                                      borderRadius: "9999px"
                                    }}
                                  />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                  <button
                                    type="button"
                                    onClick={() => setDetailedCampaign(camp)}
                                    style={{
                                      padding: "8px",
                                      borderRadius: "9999px",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                      color: "#5C475A",
                                      backgroundColor: "#ffffff",
                                      border: "1px solid rgba(36, 18, 33, 0.2)",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Objectives
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => navigateToMakeDonation(camp.id)}
                                    style={{
                                      padding: "8px",
                                      borderRadius: "9999px",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                      color: "#B80C64",
                                      backgroundColor: "#FCE8F3",
                                      border: "1px solid rgba(230, 18, 126, 0.3)",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Donate Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Donations & Receipts Section */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <div>
                        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#241221" }}>
                          Recent Donations &amp; Receipts
                        </h2>
                        <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "2px" }}>
                          Audited record of contributions registered to your donor account.
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                          {donations.length} {donations.length === 1 ? "Record" : "Records"}
                        </span>
                        {donations.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setActiveTab("donations")}
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#E6127E",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            <span>Full history</span>
                            <ArrowRight size={12} style={{ width: "12px", height: "12px" }} />
                          </button>
                        )}
                      </div>
                    </div>

                    {donations.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "48px 20px",
                          backgroundColor: "rgba(253, 240, 244, 0.3)",
                          borderRadius: "16px",
                          border: "1px dashed rgba(230, 18, 126, 0.2)"
                        }}
                      >
                        <Heart size={32} style={{ width: "32px", height: "32px", color: "#E6127E", margin: "0 auto 12px auto" }} />
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", marginBottom: "6px" }}>
                          No donations yet
                        </h3>
                        <p style={{ fontSize: "12px", color: "#5C475A", maxWidth: "380px", margin: "0 auto 18px auto" }}>
                          Your official gift receipts, donation references, and allocations will appear here once you make your first contribution.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigateToMakeDonation()}
                          className="btn-3d-magenta rounded-full font-bold text-xs text-white px-5 py-2.5 cursor-pointer"
                        >
                          Make your first donation
                        </button>
                      </div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                          <thead>
                            <tr style={{ borderBottom: "1.5px solid rgba(36, 18, 33, 0.08)", color: "#8E7287", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                              <th style={{ padding: "12px 14px" }}>Date</th>
                              <th style={{ padding: "12px 14px" }}>Reference</th>
                              <th style={{ padding: "12px 14px" }}>Cause / Campaign</th>
                              <th style={{ padding: "12px 14px" }}>Type</th>
                              <th style={{ padding: "12px 14px" }}>Gift Aid</th>
                              <th style={{ padding: "12px 14px", textAlign: "right" }}>Amount</th>
                              <th style={{ padding: "12px 14px", textAlign: "center" }}>Status</th>
                              <th style={{ padding: "12px 14px", textAlign: "right" }}>Receipt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donations.map((d) => (
                              <tr key={d.id} style={{ borderBottom: "1px solid rgba(36, 18, 33, 0.05)", color: "#241221" }}>
                                <td style={{ padding: "14px", fontWeight: 600 }}>
                                  {new Date(d.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                </td>
                                <td style={{ padding: "14px", fontFamily: "monospace", fontSize: "12px", color: "#5C475A" }}>
                                  {d.reference || "ZT-ONLINE"}
                                </td>
                                <td style={{ padding: "14px", fontWeight: 600 }}>
                                  {d.campaign?.title || "Zinthiya Trust General Relief"}
                                </td>
                                <td style={{ padding: "14px", color: "#5C475A" }}>
                                  {d.type === "RECURRING" ? "Monthly" : "One-off"}
                                </td>
                                <td style={{ padding: "14px" }}>
                                  {d.giftAid ? (
                                    <span style={{ color: "#059669", fontWeight: 700, fontSize: "11px" }}>✓ 25% Tax Reclaim</span>
                                  ) : (
                                    <span style={{ color: "#8E7287", fontSize: "11px" }}>No</span>
                                  )}
                                </td>
                                <td style={{ padding: "14px", textAlign: "right", fontWeight: 800, color: "#241221", fontSize: "14px" }}>
                                  £{Number(d.amount).toFixed(2)}
                                </td>
                                <td style={{ padding: "14px", textAlign: "center" }}>
                                  <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#ECFDF5", color: "#059669", padding: "2px 8px", borderRadius: "9999px" }}>
                                    {d.status || "Completed"}
                                  </span>
                                </td>
                                <td style={{ padding: "14px", textAlign: "right" }}>
                                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                    <button
                                      type="button"
                                      onClick={() => setViewReceiptDonation(d)}
                                      style={{
                                        padding: "6px 12px",
                                        borderRadius: "8px",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        backgroundColor: "#FCE8F3",
                                        color: "#B80C64",
                                        border: "1px solid rgba(230, 18, 126, 0.25)",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px"
                                      }}
                                    >
                                      <FileText size={12} style={{ width: "12px", height: "12px" }} />
                                      <span>Receipt</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDownloadReceipt(d)}
                                      title="Download PDF Receipt"
                                      style={{
                                        padding: "6px 8px",
                                        borderRadius: "8px",
                                        backgroundColor: "#ffffff",
                                        color: "#5C475A",
                                        border: "1px solid rgba(36, 18, 33, 0.2)",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center"
                                      }}
                                    >
                                      <Download size={12} style={{ width: "12px", height: "12px" }} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ACTIVE CAMPAIGNS */}
              {activeTab === "campaigns" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                      <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#FCE8F3", color: "#B80C64", fontSize: "11px", fontWeight: 800, padding: "3px 10px", borderRadius: "9999px", marginBottom: "8px", textTransform: "uppercase" }}>
                          <Compass size={12} style={{ width: "12px", height: "12px" }} />
                          <span>Active Projects • Leicester &amp; Leicestershire</span>
                        </div>
                        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#241221" }}>
                          All Available Relief Campaigns
                        </h2>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginTop: "4px", maxWidth: "680px", lineHeight: "1.5" }}>
                          Browse active charity initiatives operating across Leicestershire. Review measurable objectives, monitor fundraising progress, and select a cause to support with 100% financial transparency.
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#059669", backgroundColor: "#ECFDF5", padding: "6px 14px", borderRadius: "9999px" }}>
                          {campaigns.length} Active Causes
                        </span>
                      </div>
                    </div>

                    {/* Live Financial Summary Bar */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "16px",
                        padding: "18px 20px",
                        backgroundColor: "#FDF9FB",
                        borderRadius: "16px",
                        border: "1px solid rgba(230, 18, 126, 0.1)",
                        marginBottom: "24px"
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                          Combined Raised Across Causes
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: "#E6127E", marginTop: "2px" }}>
                          £{totalCampaignRaised.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                          Total Annual Funding Goal
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: "#241221", marginTop: "2px" }}>
                          £{totalCampaignTarget.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                          Overall Funding Progress
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: "#059669", marginTop: "2px" }}>
                          {totalCampaignPercent}% Reached
                        </div>
                      </div>
                    </div>

                    {/* Search & Category Filter Toolbar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ position: "relative", minWidth: "260px", flex: "1 1 280px" }}>
                        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8E7287" }}>
                          <Search size={16} style={{ width: "16px", height: "16px" }} />
                        </div>
                        <input
                          type="text"
                          placeholder="Search campaigns by title, keywords, or objectives..."
                          value={campaignSearch}
                          onChange={(e) => setCampaignSearch(e.target.value)}
                          style={{
                            width: "100%",
                            height: "42px",
                            paddingLeft: "40px",
                            paddingRight: "14px",
                            borderRadius: "12px",
                            border: "1px solid rgba(36, 18, 33, 0.2)",
                            fontSize: "13px",
                            backgroundColor: "#ffffff",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        {[
                          { id: "ALL", label: "All Causes" },
                          { id: "WARMTH", label: "Energy & Warmth" },
                          { id: "FOOD", label: "Food & Cafe" },
                          { id: "SANCTUARY", label: "Refuge & Safety" },
                        ].map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setCampaignCategoryFilter(f.id)}
                            style={{
                              padding: "7px 14px",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              border: campaignCategoryFilter === f.id ? "1.5px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                              backgroundColor: campaignCategoryFilter === f.id ? "#FCE8F3" : "#ffffff",
                              color: campaignCategoryFilter === f.id ? "#B80C64" : "#5C475A",
                              transition: "all 0.15s"
                            }}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Cards Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                      gap: "24px"
                    }}
                  >
                    {filteredCampaigns.map((camp) => {
                      const raised = Number(camp.raisedAmount || 0);
                      const target = Number(camp.targetAmount || 1);
                      const pct = Math.min(100, Math.round((raised / target) * 100));
                      const remaining = Math.max(0, target - raised);
                      const { overview, objectives } = parseCampaignContent(camp.description);

                      return (
                        <div
                          key={camp.id}
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "24px",
                            border: "1px solid rgba(230, 18, 126, 0.15)",
                            boxShadow: "0 6px 18px rgba(36, 18, 33, 0.04)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                          }}
                        >
                          <div>
                            {camp.imageUrl && (
                              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                                <img
                                  src={camp.imageUrl}
                                  alt={camp.title}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  loading="lazy"
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(180deg, rgba(36, 18, 33, 0.2) 0%, rgba(36, 18, 33, 0.6) 100%)"
                                  }}
                                />
                                <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                                  <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 0.92)", color: "#B80C64", padding: "4px 10px", borderRadius: "9999px" }}>
                                    Leicestershire Cause
                                  </span>
                                </div>
                                <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                                  <span style={{ fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "9999px", backgroundColor: "#ECFDF5", color: "#065F46" }}>
                                    ● Active
                                  </span>
                                </div>
                              </div>
                            )}

                            <div style={{ padding: "24px 24px 16px 24px" }}>
                              <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#241221", marginBottom: "8px", lineHeight: "1.3" }}>
                                {camp.title}
                              </h3>
                              <p style={{ fontSize: "13px", color: "#5C475A", lineHeight: "1.6", marginBottom: "16px" }}>
                                {overview || camp.description}
                              </p>

                              {objectives.length > 0 && (
                                <div style={{ padding: "12px 14px", backgroundColor: "#FDF9FB", borderRadius: "14px", border: "1px solid rgba(230, 18, 126, 0.12)", marginBottom: "20px" }}>
                                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#B80C64", textTransform: "uppercase", marginBottom: "6px" }}>
                                    Key Objectives Preview:
                                  </div>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    {objectives.slice(0, 2).map((obj, idx) => (
                                      <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "12px", color: "#241221" }}>
                                        <span style={{ color: "#059669", fontWeight: 800 }}>✓</span>
                                        <span>{obj}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid rgba(36, 18, 33, 0.06)", paddingTop: "18px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                              <div>
                                <span style={{ fontSize: "18px", fontWeight: 800, color: "#E6127E" }}>
                                  £{raised.toLocaleString()}
                                </span>
                                <span style={{ fontSize: "12px", color: "#8E7287", marginLeft: "4px" }}>raised</span>
                              </div>
                              <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221" }}>
                                {pct}% of £{target.toLocaleString()}
                              </div>
                            </div>

                            <div style={{ width: "100%", height: "10px", backgroundColor: "rgba(36, 18, 33, 0.08)", borderRadius: "9999px", overflow: "hidden", marginBottom: "8px" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #E6127E 0%, #F59E0B 100%)", borderRadius: "9999px" }} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8E7287", marginBottom: "18px" }}>
                              <span>£{remaining.toLocaleString()} needed</span>
                              <span>Verified ZT Cause</span>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setDetailedCampaign(camp)}
                                style={{
                                  height: "42px",
                                  padding: "0 12px",
                                  borderRadius: "12px",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  backgroundColor: "#ffffff",
                                  color: "#5C475A",
                                  border: "1px solid rgba(36, 18, 33, 0.2)",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "6px"
                                }}
                              >
                                <Info size={14} style={{ width: "14px", height: "14px", color: "#E6127E" }} />
                                <span>View Details</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => navigateToMakeDonation(camp.id)}
                                className="btn-3d-magenta"
                                style={{
                                  height: "42px",
                                  padding: "0 14px",
                                  borderRadius: "12px",
                                  fontSize: "12px",
                                  fontWeight: 800,
                                  color: "#ffffff",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "6px",
                                  cursor: "pointer"
                                }}
                              >
                                <Heart size={14} style={{ width: "14px", height: "14px" }} />
                                <span>Donate to Cause</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: MAKE A DONATION (Dedicated Full Step-by-Step Donation Checkout Page) */}
              {activeTab === "donate" && (
                <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Page Title & Reassurance Banner */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#FCE8F3", color: "#B80C64", fontSize: "11px", fontWeight: 800, padding: "3px 10px", borderRadius: "9999px", marginBottom: "8px", textTransform: "uppercase" }}>
                      <Heart size={12} style={{ width: "12px", height: "12px" }} />
                      <span>Official Giving Checkout</span>
                    </div>
                    <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#241221" }}>
                      Campaign Donation Checkout
                    </h2>
                    <p style={{ fontSize: "13px", color: "#5C475A", marginTop: "4px", lineHeight: "1.6" }}>
                      You are contributing directly to <strong style={{ color: "#E6127E" }}>{pageSelectedCampaign?.title || "Zinthiya Trust Relief"}</strong>. Your donation is linked to your verified donor profile and will instantly update campaign funding goals and your charitable giving tier.
                    </p>
                  </div>

                  {/* 4. PAYMENT SUCCESS CONFIRMATION SCREEN */}
                  {paymentStatus === "SUCCESS" && paymentReceipt && (
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "24px",
                        padding: "36px 32px",
                        border: "2px solid #10B981",
                        boxShadow: "0 12px 30px -8px rgba(16, 185, 129, 0.2)",
                        textAlign: "center"
                      }}
                    >
                      {/* Big Circular Green Checkmark */}
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          backgroundColor: "#10B981",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px auto",
                          boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)"
                        }}
                      >
                        <Check size={40} style={{ width: "40px", height: "40px" }} />
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          backgroundColor: "#ECFDF5",
                          color: "#065F46",
                          padding: "4px 14px",
                          borderRadius: "9999px"
                        }}
                      >
                        Payment Status: Successful
                      </span>

                      <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#241221", marginTop: "12px", marginBottom: "6px" }}>
                        Donation Successful!
                      </h3>

                      <p style={{ fontSize: "14px", color: "#5C475A", maxWidth: "540px", margin: "0 auto 24px auto", lineHeight: "1.6" }}>
                        Thank you for supporting <strong>The Zinthiya Trust</strong>. Your contribution has been verified by the payment gateway and saved in our official charitable records.
                      </p>

                      {/* Official Transaction & Receipt Summary Card */}
                      <div
                        style={{
                          backgroundColor: "#FDF9FB",
                          borderRadius: "20px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          padding: "22px 26px",
                          maxWidth: "540px",
                          margin: "0 auto 28px auto",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Campaign
                          </span>
                          <span style={{ fontSize: "14px", fontWeight: 800, color: "#241221" }}>
                            {paymentReceipt.campaignTitle}
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Donation amount
                          </span>
                          <span style={{ fontSize: "22px", fontWeight: 800, color: "#10B981" }}>
                            £{Number(paymentReceipt.amount).toFixed(2)}
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Donation type
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: 800, color: "#241221" }}>
                            {paymentReceipt.type === "RECURRING" ? `Recurring (${paymentReceipt.frequency || "Monthly"})` : "One-time"}
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Payment status
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: 800, color: "#059669", backgroundColor: "#ECFDF5", padding: "2px 8px", borderRadius: "9999px" }}>
                            ● Successful
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Transaction ID
                          </span>
                          <span style={{ fontSize: "13px", fontWeight: 800, fontFamily: "monospace", color: "#E6127E" }}>
                            {paymentReceipt.transactionId || paymentReceipt.reference}
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            Donor Account
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#241221" }}>
                            {paymentReceipt.donorName} ({paymentReceipt.donorEmail})
                          </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#8E7287" }}>
                            UK Gift Aid (+25%)
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: paymentReceipt.giftAid ? "#059669" : "#8E7287" }}>
                            {paymentReceipt.giftAid ? "✓ Reclaimed (+25% HMRC Relief)" : "Not Claimed"}
                          </span>
                        </div>
                      </div>

                      {/* Post-Payment Action Buttons */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => {
                            const recObj: DonationRecord = {
                              id: paymentReceipt.id || paymentReceipt.reference,
                              amount: paymentReceipt.amount,
                              currency: "GBP",
                              status: "COMPLETED",
                              type: paymentReceipt.type,
                              giftAid: paymentReceipt.giftAid,
                              paymentMethod: paymentReceipt.paymentMethod,
                              reference: paymentReceipt.reference,
                              createdAt: new Date().toISOString(),
                              campaign: {
                                id: paymentReceipt.campaignId || "general",
                                title: paymentReceipt.campaignTitle || "General Support Fund"
                              }
                            };
                            handleDownloadReceipt(recObj);
                          }}
                          className="btn-3d-magenta"
                          style={{
                            height: "44px",
                            padding: "0 22px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#ffffff",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          <Download size={16} style={{ width: "16px", height: "16px" }} />
                          <span>Download Receipt (PDF)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("donations")}
                          style={{
                            height: "44px",
                            padding: "0 20px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 700,
                            backgroundColor: "#ffffff",
                            border: "1px solid rgba(36, 18, 33, 0.2)",
                            color: "#241221",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          <History size={16} style={{ width: "16px", height: "16px" }} />
                          <span>View in Donation History</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setPaymentStatus("IDLE");
                            setPageCustomAmount("");
                          }}
                          style={{
                            height: "44px",
                            padding: "0 18px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 700,
                            backgroundColor: "#FDF4F8",
                            border: "1px solid rgba(230, 18, 126, 0.25)",
                            color: "#B80C64",
                            cursor: "pointer"
                          }}
                        >
                          Make Another Donation
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("dashboard")}
                          style={{
                            height: "44px",
                            padding: "0 16px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 600,
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#8E7287",
                            cursor: "pointer"
                          }}
                        >
                          Return to Dashboard
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 5. PAYMENT FAILURE STATUS ALERT */}
                  {paymentStatus === "FAILURE" && (
                    <div
                      style={{
                        backgroundColor: "#FEF2F2",
                        borderRadius: "20px",
                        padding: "24px",
                        border: "1.5px solid #FCA5A5",
                        color: "#991B1B"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <AlertCircle size={22} style={{ width: "22px", height: "22px", color: "#DC2626" }} />
                        <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
                          Payment Failed
                        </h3>
                      </div>
                      <p style={{ fontSize: "13px", margin: "0 0 16px 0", lineHeight: "1.5" }}>
                        {paymentError || "We could not process this transaction through the payment gateway. Please verify your details and try again."}
                      </p>
                      <button
                        type="button"
                        onClick={() => setPaymentStatus("IDLE")}
                        className="btn-3d-magenta"
                        style={{
                          height: "38px",
                          padding: "0 18px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#ffffff",
                          cursor: "pointer"
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* ACTIVE DONATION FLOW FORM */}
                  {paymentStatus === "IDLE" && (
                    <form onSubmit={handleProcessPageDonation} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      
                      {/* SECTION A: CAMPAIGN DETAILS */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span
                              style={{
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                backgroundColor: "#FCE8F3",
                                color: "#B80C64",
                                fontSize: "12px",
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              A
                            </span>
                            <div>
                              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                                Campaign Details
                              </h3>
                              <span style={{ fontSize: "12px", color: "#5C475A" }}>
                                Review the cause you are supporting before completing payment.
                              </span>
                            </div>
                          </div>

                          {/* Switch Campaign Toggle */}
                          <button
                            type="button"
                            onClick={() => setShowSwitchCampaign(!showSwitchCampaign)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#E6127E",
                              border: "1px solid rgba(230, 18, 126, 0.3)",
                              backgroundColor: "#FDF4F8",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                          >
                            <Compass size={13} />
                            <span>{showSwitchCampaign ? "Close Campaign List" : "Switch Campaign"}</span>
                          </button>
                        </div>

                        {/* Collapsible Campaign Picker */}
                        {showSwitchCampaign && (
                          <div style={{ marginBottom: "20px", padding: "16px", backgroundColor: "#FDF9FB", borderRadius: "16px", border: "1px dashed rgba(230, 18, 126, 0.25)" }}>
                            <div style={{ fontSize: "12px", fontWeight: 800, color: "#241221", marginBottom: "10px" }}>
                              Select another relief cause:
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                              {campaigns.map((camp) => {
                                const isSelected = pageSelectedCampaign?.id === camp.id;
                                return (
                                  <div
                                    key={camp.id}
                                    onClick={() => {
                                      setPageDonateCampaignId(camp.id);
                                      setShowSwitchCampaign(false);
                                    }}
                                    style={{
                                      padding: "12px 14px",
                                      borderRadius: "12px",
                                      border: isSelected ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                                      backgroundColor: isSelected ? "#FDF4F8" : "#ffffff",
                                      cursor: "pointer",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center"
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#241221" }}>{camp.title}</div>
                                      <div style={{ fontSize: "11px", color: "#8E7287" }}>Target: £{Number(camp.targetAmount || 0).toLocaleString()}</div>
                                    </div>
                                    {isSelected && <Check size={16} style={{ color: "#E6127E" }} />}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Prominent Selected Campaign Card */}
                        {pageSelectedCampaign ? (
                          <div
                            style={{
                              padding: "20px 24px",
                              borderRadius: "18px",
                              border: "2px solid #E6127E",
                              backgroundColor: "#FEF7FA",
                              boxShadow: "0 4px 16px rgba(230, 18, 126, 0.08)"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", backgroundColor: "#E6127E", color: "#ffffff", padding: "3px 12px", borderRadius: "9999px" }}>
                                  Selected Campaign
                                </span>
                                {pageSelectedCampaign.campaignCode && (
                                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", fontFamily: "monospace" }}>
                                    Ref: {pageSelectedCampaign.campaignCode}
                                  </span>
                                )}
                              </div>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669", backgroundColor: "#ECFDF5", padding: "2px 10px", borderRadius: "9999px" }}>
                                ● Active &amp; Verified by Zinthiya Trust
                              </span>
                            </div>

                            <h4 style={{ fontSize: "22px", fontWeight: 800, color: "#241221", margin: "6px 0" }}>
                              {pageSelectedCampaign.title}
                            </h4>

                            <p style={{ fontSize: "14px", color: "#5C475A", lineHeight: "1.6", margin: "0 0 18px 0" }}>
                              {pageSelectedCampaign.description || "Relief campaign directly administered by The Zinthiya Trust for Leicestershire vulnerable families."}
                            </p>

                            {/* Campaign Metrics */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", padding: "14px 16px", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid rgba(230, 18, 126, 0.15)", marginBottom: "14px" }}>
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Amount Raised</div>
                                <div style={{ fontSize: "18px", fontWeight: 800, color: "#10B981" }}>
                                  £{Number(pageSelectedCampaign.raisedAmount || 0).toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Fundraising Target</div>
                                <div style={{ fontSize: "18px", fontWeight: 800, color: "#241221" }}>
                                  £{Number(pageSelectedCampaign.targetAmount || 0).toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Progress</div>
                                <div style={{ fontSize: "18px", fontWeight: 800, color: "#E6127E" }}>
                                  {Math.min(100, Math.round((Number(pageSelectedCampaign.raisedAmount || 0) / Math.max(1, Number(pageSelectedCampaign.targetAmount || 1))) * 100))}%
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ width: "100%", height: "8px", backgroundColor: "rgba(36, 18, 33, 0.1)", borderRadius: "9999px", overflow: "hidden" }}>
                              <div
                                style={{
                                  width: `${Math.min(100, Math.round((Number(pageSelectedCampaign.raisedAmount || 0) / Math.max(1, Number(pageSelectedCampaign.targetAmount || 1))) * 100))}%`,
                                  height: "100%",
                                  backgroundColor: "#E6127E",
                                  borderRadius: "9999px"
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: "20px", textAlign: "center", color: "#8E7287" }}>
                            No active campaign selected. Please pick a cause.
                          </div>
                        )}
                      </div>

                      {/* SECTION B: CHOOSE DONATION AMOUNT */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              backgroundColor: "#FCE8F3",
                              color: "#B80C64",
                              fontSize: "12px",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            B
                          </span>
                          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                            Choose Donation Amount
                          </h3>
                        </div>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginBottom: "18px" }}>
                          Select a suggested contribution or enter a custom amount.
                        </p>

                        {/* Presets */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                          {[
                            { amt: 10, label: "Warm essentials pack" },
                            { amt: 25, label: "Food pantry box" },
                            { amt: 50, label: "Fuel voucher" },
                            { amt: 100, label: "Emergency shelter kit" },
                            { amt: 250, label: "Recovery grant" },
                          ].map((item) => {
                            const isSelected = pageDonateAmount === item.amt && !pageCustomAmount;
                            return (
                              <button
                                key={item.amt}
                                type="button"
                                onClick={() => {
                                  setPageDonateAmount(item.amt);
                                  setPageCustomAmount("");
                                }}
                                style={{
                                  padding: "14px 12px",
                                  borderRadius: "16px",
                                  border: isSelected ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                                  backgroundColor: isSelected ? "#FDF4F8" : "#ffffff",
                                  color: isSelected ? "#B80C64" : "#241221",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  boxShadow: isSelected ? "0 4px 12px rgba(230, 18, 126, 0.15)" : "none",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                <div style={{ fontSize: "20px", fontWeight: 800 }}>
                                  £{item.amt}
                                </div>
                                <div style={{ fontSize: "11px", color: isSelected ? "#B80C64" : "#8E7287", marginTop: "3px" }}>
                                  {item.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom Amount Field */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Enter a custom amount
                          </label>
                          <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", fontWeight: 800, color: "#241221" }}>
                              £
                            </span>
                            <input
                              type="number"
                              min="1"
                              step="any"
                              placeholder="Enter amount..."
                              value={pageCustomAmount}
                              onChange={(e) => setPageCustomAmount(e.target.value)}
                              style={{
                                width: "100%",
                                height: "48px",
                                paddingLeft: "36px",
                                paddingRight: "16px",
                                borderRadius: "14px",
                                border: pageCustomAmount ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.2)",
                                fontSize: "15px",
                                fontWeight: 700,
                                outline: "none",
                                backgroundColor: pageCustomAmount ? "#FDF4F8" : "#ffffff"
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* SECTION C: CHOOSE DONATION TYPE */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              backgroundColor: "#FCE8F3",
                              color: "#B80C64",
                              fontSize: "12px",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            C
                          </span>
                          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                            Select Donation Type
                          </h3>
                        </div>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginBottom: "18px" }}>
                          Choose between a single contribution or an automatic recurring commitment.
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: pageDonateType === "RECURRING" ? "18px" : "0" }}>
                          {/* One-time donation */}
                          <button
                            type="button"
                            onClick={() => setPageDonateType("ONE_OFF")}
                            style={{
                              padding: "18px 16px",
                              borderRadius: "16px",
                              border: pageDonateType === "ONE_OFF" ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                              backgroundColor: pageDonateType === "ONE_OFF" ? "#FDF4F8" : "#ffffff",
                              cursor: "pointer",
                              textAlign: "left",
                              boxShadow: pageDonateType === "ONE_OFF" ? "0 4px 12px rgba(230, 18, 126, 0.12)" : "none",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                              <div style={{ fontSize: "15px", fontWeight: 800, color: pageDonateType === "ONE_OFF" ? "#B80C64" : "#241221" }}>
                                One-time donation
                              </div>
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  border: pageDonateType === "ONE_OFF" ? "5px solid #E6127E" : "2px solid rgba(36, 18, 33, 0.3)",
                                  backgroundColor: "#ffffff"
                                }}
                              />
                            </div>
                            <div style={{ fontSize: "12px", color: "#5C475A" }}>
                              Make a donation once.
                            </div>
                          </button>

                          {/* Recurring donation */}
                          <button
                            type="button"
                            onClick={() => setPageDonateType("RECURRING")}
                            style={{
                              padding: "18px 16px",
                              borderRadius: "16px",
                              border: pageDonateType === "RECURRING" ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                              backgroundColor: pageDonateType === "RECURRING" ? "#FDF4F8" : "#ffffff",
                              cursor: "pointer",
                              textAlign: "left",
                              boxShadow: pageDonateType === "RECURRING" ? "0 4px 12px rgba(230, 18, 126, 0.12)" : "none",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                              <div style={{ fontSize: "15px", fontWeight: 800, color: pageDonateType === "RECURRING" ? "#B80C64" : "#241221" }}>
                                Recurring donation
                              </div>
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  border: pageDonateType === "RECURRING" ? "5px solid #E6127E" : "2px solid rgba(36, 18, 33, 0.3)",
                                  backgroundColor: "#ffffff"
                                }}
                              />
                            </div>
                            <div style={{ fontSize: "12px", color: "#5C475A" }}>
                              Set up a donation that repeats automatically.
                            </div>
                          </button>
                        </div>

                        {/* Recurring Frequency options */}
                        {pageDonateType === "RECURRING" && (
                          <div style={{ padding: "16px", backgroundColor: "#FEF7FA", borderRadius: "14px", border: "1px dashed #E6127E" }}>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "#B80C64", textTransform: "uppercase", marginBottom: "8px" }}>
                              Select Recurring Frequency
                            </label>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                              {[
                                { id: "MONTHLY", label: "Monthly", desc: "Every month" },
                                { id: "QUARTERLY", label: "Quarterly", desc: "Every 3 months" },
                                { id: "ANNUALLY", label: "Annually", desc: "Once a year" },
                              ].map((freq) => {
                                const isSelected = pageRecurringFrequency === freq.id;
                                return (
                                  <button
                                    key={freq.id}
                                    type="button"
                                    onClick={() => setPageRecurringFrequency(freq.id as any)}
                                    style={{
                                      padding: "10px",
                                      borderRadius: "10px",
                                      border: isSelected ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                                      backgroundColor: isSelected ? "#ffffff" : "transparent",
                                      color: isSelected ? "#E6127E" : "#241221",
                                      fontWeight: isSelected ? 800 : 600,
                                      fontSize: "12px",
                                      cursor: "pointer"
                                    }}
                                  >
                                    <div>{freq.label}</div>
                                    <div style={{ fontSize: "10px", color: "#8E7287" }}>{freq.desc}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SECTION D: DONOR INFORMATION */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              backgroundColor: "#FCE8F3",
                              color: "#B80C64",
                              fontSize: "12px",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            D
                          </span>
                          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                            Donor Information (Logged-in Account)
                          </h3>
                        </div>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginBottom: "16px" }}>
                          Since you are logged in, your details have been retrieved automatically. Review them below before proceeding.
                        </p>

                        {/* Authenticated Supporter Banner */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", backgroundColor: "#ECFDF5", borderRadius: "14px", border: "1px solid #A7F3D0", marginBottom: "20px" }}>
                          <ShieldCheck size={20} style={{ color: "#059669", flexShrink: 0 }} />
                          <div style={{ fontSize: "12px", color: "#065F46" }}>
                            <strong>Account Verified:</strong> Logged in as <strong>{donor?.fullName || "Supporter"}</strong> ({donor?.email}) • Giving Tier: <strong>{donor?.donationTier || "SUPPORTER"}</strong>. This gift will be linked directly to your donor record.
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={donorNameConfirm}
                              onChange={(e) => {
                                setDonorNameConfirm(e.target.value);
                                setCardName(e.target.value);
                              }}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Email Address (for receipt) *
                            </label>
                            <input
                              type="email"
                              required
                              value={donorEmailConfirm}
                              onChange={(e) => setDonorEmailConfirm(e.target.value)}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+44 7123 456789"
                              value={donorPhoneConfirm}
                              onChange={(e) => setDonorPhoneConfirm(e.target.value)}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Home Address (for Gift Aid)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 12 New Walk"
                              value={donorAddressConfirm}
                              onChange={(e) => setDonorAddressConfirm(e.target.value)}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Town / City
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Leicester"
                              value={donorTownConfirm}
                              onChange={(e) => setDonorTownConfirm(e.target.value)}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                              Postcode
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. LE1 6TF"
                              value={donorPostcodeConfirm}
                              onChange={(e) => setDonorPostcodeConfirm(e.target.value)}
                              style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                            />
                          </div>
                        </div>

                        {/* UK Gift Aid (+25%) Declaration Box */}
                        <label
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "16px",
                            borderRadius: "16px",
                            cursor: "pointer",
                            border: pageGiftAid ? "1.5px solid #10B981" : "1px solid rgba(36, 18, 33, 0.15)",
                            backgroundColor: pageGiftAid ? "#ECFDF5" : "#ffffff"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={pageGiftAid}
                            onChange={(e) => setPageGiftAid(e.target.checked)}
                            style={{ accentColor: "#059669", width: "18px", height: "18px", marginTop: "2px" }}
                          />
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 800, color: "#065F46" }}>
                              Boost your gift by 25p for every £1 with UK Gift Aid (+25%)
                            </div>
                            <p style={{ fontSize: "12px", color: "#047857", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                              I am a UK taxpayer. Please reclaim Gift Aid on my donation. This increases your £{currentDonationAmount.toFixed(2)} contribution to <strong>£{currentTotalCharityValue.toFixed(2)}</strong> for The Zinthiya Trust at zero extra cost to you.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* SECTION E: PAYMENT SUMMARY & SECURE GATEWAY */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid rgba(230, 18, 126, 0.15)",
                          boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              backgroundColor: "#FCE8F3",
                              color: "#B80C64",
                              fontSize: "12px",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            E
                          </span>
                          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                            Payment Summary &amp; Secure Gateway
                          </h3>
                        </div>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginBottom: "20px" }}>
                          Review your donation summary and proceed to the encrypted payment gateway.
                        </p>

                        {/* Donation Summary Table */}
                        <div style={{ backgroundColor: "#FDF9FB", borderRadius: "18px", border: "1px solid rgba(230, 18, 126, 0.15)", padding: "18px 22px", marginBottom: "24px" }}>
                          <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#B80C64", marginBottom: "12px", letterSpacing: "0.05em" }}>
                            Donation Summary
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "8px" }}>
                              <span style={{ color: "#5C475A" }}>Campaign</span>
                              <span style={{ fontWeight: 800, color: "#241221" }}>{pageSelectedCampaign?.title || "shelter"}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "8px" }}>
                              <span style={{ color: "#5C475A" }}>Donation amount</span>
                              <span style={{ fontWeight: 800, color: "#241221" }}>£{currentDonationAmount.toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "8px" }}>
                              <span style={{ color: "#5C475A" }}>Donation type</span>
                              <span style={{ fontWeight: 800, color: "#241221" }}>
                                {pageDonateType === "RECURRING" ? `Recurring (${pageRecurringFrequency})` : "One-time"}
                              </span>
                            </div>
                            {pageGiftAid && (
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", paddingBottom: "8px", color: "#059669" }}>
                                <span>Gift Aid Relief (+25% HMRC)</span>
                                <span style={{ fontWeight: 800 }}>+£{(currentDonationAmount * 0.25).toFixed(2)} (Charity receives £{(currentDonationAmount * 1.25).toFixed(2)})</span>
                              </div>
                            )}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px", paddingTop: "4px" }}>
                              <span style={{ fontWeight: 800, color: "#241221" }}>Total payable</span>
                              <span style={{ fontWeight: 800, color: "#E6127E", fontSize: "22px" }}>£{currentDonationAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Method Selector */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
                          {[
                            { id: "CARD", label: "Credit/Debit Card", icon: CreditCard },
                            { id: "BANK", label: "Direct Debit", icon: ShieldCheck },
                            { id: "PAYPAL", label: "Digital Wallet", icon: Sparkles },
                          ].map((pm) => (
                            <button
                              key={pm.id}
                              type="button"
                              onClick={() => setPaymentMethod(pm.id as any)}
                              style={{
                                padding: "12px",
                                borderRadius: "12px",
                                border: paymentMethod === pm.id ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)",
                                backgroundColor: paymentMethod === pm.id ? "#FDF4F8" : "#ffffff",
                                color: paymentMethod === pm.id ? "#B80C64" : "#5C475A",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "6px"
                              }}
                            >
                              <pm.icon size={18} style={{ width: "18px", height: "18px" }} />
                              <span>{pm.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Card Input Simulation Fields */}
                        {paymentMethod === "CARD" && (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                            <div style={{ gridColumn: "span 2" }}>
                              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#241221", marginBottom: "4px", textTransform: "uppercase" }}>
                                Name on Card
                              </label>
                              <input
                                type="text"
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px" }}
                              />
                            </div>

                            <div style={{ gridColumn: "span 2" }}>
                              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#241221", marginBottom: "4px", textTransform: "uppercase" }}>
                                Card Number
                              </label>
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px", fontFamily: "monospace" }}
                              />
                            </div>

                            <div>
                              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#241221", marginBottom: "4px", textTransform: "uppercase" }}>
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px", fontFamily: "monospace" }}
                              />
                            </div>

                            <div>
                              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#241221", marginBottom: "4px", textTransform: "uppercase" }}>
                                CVC Security Code
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px", fontFamily: "monospace" }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Security notice */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", backgroundColor: "#F9FAFB", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.08)", marginBottom: "20px" }}>
                          <Lock size={16} style={{ width: "16px", height: "16px", color: "#059669" }} />
                          <span style={{ fontSize: "11px", color: "#5C475A" }}>
                            256-bit SSL encrypted • PCI-DSS Level 1 compliant • Directly linked to your donor profile
                          </span>
                        </div>

                        {/* Proceed to Payment Button */}
                        <button
                          type="submit"
                          disabled={paymentProcessing}
                          className="btn-3d-magenta"
                          style={{
                            width: "100%",
                            height: "52px",
                            borderRadius: "9999px",
                            fontSize: "15px",
                            fontWeight: 800,
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            cursor: "pointer",
                            boxShadow: "0 8px 24px rgba(230, 18, 126, 0.3)"
                          }}
                        >
                          {paymentProcessing ? (
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "18px", height: "18px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                              <span>Connecting to Payment Gateway...</span>
                            </span>
                          ) : (
                            <>
                              <CreditCard size={18} style={{ width: "18px", height: "18px" }} />
                              <span>
                                Proceed to Payment (£{currentDonationAmount.toFixed(2)})
                              </span>
                              <ArrowRight size={18} style={{ width: "18px", height: "18px" }} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: DONATION HISTORY (Dedicated view) */}
              {activeTab === "donations" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                      <div>
                        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#241221" }}>
                          Full Donation History
                        </h2>
                        <p style={{ fontSize: "13px", color: "#5C475A", marginTop: "4px" }}>
                          Permanent HMRC-compliant record of your donations, tax relief claims, and project allocations.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateToMakeDonation()}
                        className="btn-3d-magenta"
                        style={{
                          height: "38px",
                          padding: "0 18px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#ffffff",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer"
                        }}
                      >
                        <Heart size={14} style={{ width: "14px", height: "14px" }} />
                        <span>New Donation</span>
                      </button>
                    </div>

                    {/* Summary Counters */}
                    {(() => {
                      const totalGiftAidReclaimed = donations
                        .filter((d) => d.giftAid)
                        .reduce((acc, d) => acc + (Number(d.amount) * 0.25), 0);
                      const recurringCount = donations.filter((d) => d.type === "RECURRING").length;

                      return (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "16px",
                            marginBottom: "24px",
                            padding: "20px",
                            borderRadius: "16px",
                            backgroundColor: "#FDF9FB",
                            border: "1px solid rgba(230, 18, 126, 0.12)"
                          }}
                        >
                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                              Total Donated
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 800, color: "#241221", marginTop: "2px" }}>
                              £{Number(stats?.totalDonated || 0).toFixed(2)}
                            </div>
                            <div style={{ fontSize: "11px", color: "#5C475A", marginTop: "4px" }}>
                              Recorded in live ledger
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                              Total Donations
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 800, color: "#241221", marginTop: "2px" }}>
                              {donations.length}
                            </div>
                            <div style={{ fontSize: "11px", color: "#5C475A", marginTop: "4px" }}>
                              {recurringCount > 0 ? `${recurringCount} monthly recurring` : "All single gifts"}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                              HMRC Gift Aid Boost (+25%)
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 800, color: "#059669", marginTop: "2px" }}>
                              £{totalGiftAidReclaimed.toFixed(2)}
                            </div>
                            <div style={{ fontSize: "11px", color: "#059669", fontWeight: 600, marginTop: "4px" }}>
                              Claimed for community relief
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>
                              Giving Tier
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 800, color: "#E6127E", marginTop: "2px" }}>
                              {stats?.donationTier || "SUPPORTER"}
                            </div>
                            <div style={{ fontSize: "11px", color: "#8E7287", marginTop: "4px" }}>
                              Verified Donor Status
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Filter and Search Bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginBottom: "20px"
                      }}
                    >
                      {/* Search Box */}
                      <div style={{ position: "relative", minWidth: "260px", flex: "1 1 300px" }}>
                        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8E7287" }}>
                          <Search size={16} style={{ width: "16px", height: "16px" }} />
                        </div>
                        <input
                          type="text"
                          placeholder="Search by receipt reference (ZT-...), campaign, or amount..."
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          style={{
                            width: "100%",
                            height: "42px",
                            paddingLeft: "40px",
                            paddingRight: "14px",
                            borderRadius: "12px",
                            border: "1px solid rgba(36, 18, 33, 0.2)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Filter Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", backgroundColor: "rgba(36, 18, 33, 0.05)", padding: "3px", borderRadius: "10px" }}>
                          {(
                            [
                              { key: "ALL", label: "All Gifts" },
                              { key: "ONE_OFF", label: "One-Off" },
                              { key: "RECURRING", label: "Monthly" },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.key}
                              type="button"
                              onClick={() => setHistoryTypeFilter(tab.key)}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: 700,
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: historyTypeFilter === tab.key ? "#ffffff" : "transparent",
                                color: historyTypeFilter === tab.key ? "#E6127E" : "#5C475A",
                                boxShadow: historyTypeFilter === tab.key ? "0 2px 4px rgba(0,0,0,0.06)" : "none"
                              }}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        <select
                          value={historyStatusFilter}
                          onChange={(e) => setHistoryStatusFilter(e.target.value as any)}
                          style={{
                            height: "40px",
                            padding: "0 12px",
                            borderRadius: "10px",
                            border: "1px solid rgba(36, 18, 33, 0.2)",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#241221",
                            backgroundColor: "#ffffff",
                            outline: "none"
                          }}
                        >
                          <option value="ALL">All Statuses</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="PENDING">Pending</option>
                        </select>

                        {(historySearch || historyTypeFilter !== "ALL" || historyStatusFilter !== "ALL") && (
                          <button
                            type="button"
                            onClick={() => {
                              setHistorySearch("");
                              setHistoryTypeFilter("ALL");
                              setHistoryStatusFilter("ALL");
                            }}
                            style={{
                              padding: "6px 12px",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#E6127E",
                              background: "none",
                              border: "1px solid rgba(230, 18, 126, 0.2)",
                              borderRadius: "8px",
                              cursor: "pointer"
                            }}
                          >
                            Reset Filters
                          </button>
                        )}
                      </div>
                    </div>

                    {donations.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "60px 20px",
                          backgroundColor: "rgba(253, 240, 244, 0.3)",
                          borderRadius: "16px",
                          border: "1px dashed rgba(230, 18, 126, 0.2)"
                        }}
                      >
                        <Heart size={32} style={{ width: "32px", height: "32px", color: "#E6127E", margin: "0 auto 12px auto" }} />
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", marginBottom: "4px" }}>
                          No donations recorded yet
                        </h3>
                        <p style={{ fontSize: "12px", color: "#5C475A", maxWidth: "340px", margin: "0 auto 16px auto" }}>
                          Every donation you make will generate an official receipt and appear in this table.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigateToMakeDonation()}
                          className="btn-3d-magenta rounded-full font-bold text-xs text-white px-5 py-2.5 cursor-pointer"
                        >
                          Make your first donation
                        </button>
                      </div>
                    ) : filteredDonations.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "48px 20px",
                          backgroundColor: "#FDF9FB",
                          borderRadius: "16px",
                          border: "1px dashed rgba(36, 18, 33, 0.15)"
                        }}
                      >
                        <Search size={28} style={{ width: "28px", height: "28px", color: "#8E7287", margin: "0 auto 10px auto" }} />
                        <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#241221" }}>
                          No matching donation records found
                        </h4>
                        <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "4px" }}>
                          No contributions match your current search query or active filter settings.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setHistorySearch("");
                            setHistoryTypeFilter("ALL");
                            setHistoryStatusFilter("ALL");
                          }}
                          style={{
                            marginTop: "12px",
                            padding: "6px 14px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 700,
                            backgroundColor: "#FCE8F3",
                            color: "#B80C64",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            cursor: "pointer"
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                          <thead>
                            <tr
                              style={{
                                borderBottom: "1.5px solid rgba(36, 18, 33, 0.08)",
                                color: "#8E7287",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                              }}
                            >
                              <th style={{ padding: "12px 14px" }}>Date &amp; Time</th>
                              <th style={{ padding: "12px 14px" }}>Receipt Reference</th>
                              <th style={{ padding: "12px 14px" }}>Campaign Supported</th>
                              <th style={{ padding: "12px 14px" }}>Type</th>
                              <th style={{ padding: "12px 14px" }}>HMRC Gift Aid</th>
                              <th style={{ padding: "12px 14px", textAlign: "right" }}>Amount</th>
                              <th style={{ padding: "12px 14px", textAlign: "center" }}>Payment Status</th>
                              <th style={{ padding: "12px 14px", textAlign: "right" }}>Receipt &amp; Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredDonations.map((d) => (
                              <tr
                                key={d.id}
                                style={{
                                  borderBottom: "1px solid rgba(36, 18, 33, 0.05)",
                                  color: "#241221"
                                }}
                              >
                                <td style={{ padding: "14px", fontWeight: 600 }}>
                                  <div>
                                    {new Date(d.createdAt).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric"
                                    })}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#8E7287", fontWeight: 500 }}>
                                    {new Date(d.createdAt).toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </div>
                                </td>
                                <td style={{ padding: "14px" }}>
                                  <span
                                    style={{
                                      fontFamily: "monospace",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      backgroundColor: "rgba(36, 18, 33, 0.05)",
                                      color: "#241221",
                                      letterSpacing: "0.03em"
                                    }}
                                  >
                                    {d.reference || `ZT-${d.id.substring(0, 8).toUpperCase()}`}
                                  </span>
                                </td>
                                <td style={{ padding: "14px" }}>
                                  <div style={{ fontWeight: 700, color: "#241221" }}>
                                    {d.campaign?.title || "The Zinthiya Trust General Relief"}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#8E7287" }}>
                                    Verified Charitable Cause
                                  </div>
                                </td>
                                <td style={{ padding: "14px" }}>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      padding: "3px 10px",
                                      borderRadius: "9999px",
                                      fontSize: "11px",
                                      fontWeight: 700,
                                      backgroundColor: d.type === "RECURRING" ? "#FCE8F3" : "#F3F4F6",
                                      color: d.type === "RECURRING" ? "#B80C64" : "#4B5563"
                                    }}
                                  >
                                    {d.type === "RECURRING" ? "Monthly Recurring" : "One-Time"}
                                  </span>
                                </td>
                                <td style={{ padding: "14px" }}>
                                  {d.giftAid ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "3px",
                                        color: "#059669",
                                        fontWeight: 700,
                                        fontSize: "11px",
                                        backgroundColor: "#ECFDF5",
                                        padding: "3px 8px",
                                        borderRadius: "6px"
                                      }}
                                    >
                                      <Check size={12} style={{ width: "12px", height: "12px" }} />
                                      <span>+25% Reclaimed</span>
                                    </span>
                                  ) : (
                                    <span style={{ color: "#8E7287", fontSize: "12px" }}>No</span>
                                  )}
                                </td>
                                <td style={{ padding: "14px", textAlign: "right" }}>
                                  <div style={{ fontWeight: 800, color: "#241221", fontSize: "15px" }}>
                                    £{Number(d.amount).toFixed(2)}
                                  </div>
                                  <div style={{ fontSize: "10px", color: "#8E7287" }}>GBP</div>
                                </td>
                                <td style={{ padding: "14px", textAlign: "center" }}>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: 700,
                                      backgroundColor: "#ECFDF5",
                                      color: "#059669",
                                      padding: "3px 10px",
                                      borderRadius: "9999px",
                                      display: "inline-block"
                                    }}
                                  >
                                    {d.status || "COMPLETED"}
                                  </span>
                                </td>
                                <td style={{ padding: "14px", textAlign: "right" }}>
                                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                                    <button
                                      type="button"
                                      onClick={() => setViewReceiptDonation(d)}
                                      style={{
                                        padding: "6px 12px",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        backgroundColor: "#FCE8F3",
                                        color: "#B80C64",
                                        border: "1px solid rgba(230, 18, 126, 0.25)",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        transition: "all 0.15s ease"
                                      }}
                                      title="View Official Donation Receipt"
                                    >
                                      <FileText size={13} style={{ width: "13px", height: "13px" }} />
                                      <span>Receipt</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDownloadReceipt(d)}
                                      style={{
                                        padding: "6px 10px",
                                        borderRadius: "8px",
                                        backgroundColor: "#ffffff",
                                        color: "#241221",
                                        border: "1px solid rgba(36, 18, 33, 0.2)",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        transition: "all 0.15s ease"
                                      }}
                                      title="Download PDF Receipt File"
                                    >
                                      <Download size={13} style={{ width: "13px", height: "13px" }} />
                                      <span>Download</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: PROFILE & SETTINGS (Dedicated view with DB persist) */}
              {activeTab === "profile" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid rgba(230, 18, 126, 0.15)",
                      boxShadow: "0 4px 14px rgba(36, 18, 33, 0.04)"
                    }}
                  >
                    <div style={{ marginBottom: "24px" }}>
                      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#241221" }}>
                        Profile &amp; Communication Preferences
                      </h2>
                      <p style={{ fontSize: "13px", color: "#5C475A", marginTop: "4px" }}>
                        Manage your contact details and UK GDPR consent preferences. All updates save directly to your profile.
                      </p>
                    </div>

                    {profileSuccessMsg && (
                      <div
                        style={{
                          padding: "14px 18px",
                          borderRadius: "12px",
                          backgroundColor: "#ECFDF5",
                          border: "1px solid #A7F3D0",
                          color: "#065F46",
                          fontSize: "13px",
                          fontWeight: 700,
                          marginBottom: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <Check size={18} style={{ width: "18px", height: "18px" }} />
                        <span>{profileSuccessMsg}</span>
                      </div>
                    )}

                    {profileErrMsg && (
                      <div
                        style={{
                          padding: "14px 18px",
                          borderRadius: "12px",
                          backgroundColor: "#FEF2F2",
                          border: "1px solid #FCA5A5",
                          color: "#991B1B",
                          fontSize: "13px",
                          fontWeight: 700,
                          marginBottom: "20px"
                        }}
                      >
                        {profileErrMsg}
                      </div>
                    )}

                    <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                        {/* Full Name */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.2)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>

                        {/* Email Address (read only) */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Registered Email (Account ID)
                          </label>
                          <input
                            type="email"
                            disabled
                            value={donor?.email || ""}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.1)",
                              backgroundColor: "#F3F4F6",
                              color: "#6B7280",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. +44 7123 456789"
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.2)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>

                        {/* Street Address */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Street Address
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 12 New Walk"
                            value={profileAddress}
                            onChange={(e) => setProfileAddress(e.target.value)}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.2)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>

                        {/* Town / City */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            Town / City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Leicester"
                            value={profileTown}
                            onChange={(e) => setProfileTown(e.target.value)}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.2)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>

                        {/* Postcode */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#241221", marginBottom: "6px" }}>
                            UK Postcode
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. LE1 6TF"
                            value={profilePostcode}
                            onChange={(e) => setProfilePostcode(e.target.value)}
                            style={{
                              width: "100%",
                              height: "42px",
                              padding: "0 14px",
                              borderRadius: "12px",
                              border: "1px solid rgba(36, 18, 33, 0.2)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* UK GDPR Consent Toggles */}
                      <div
                        style={{
                          padding: "20px",
                          borderRadius: "16px",
                          backgroundColor: "#FDF9FB",
                          border: "1px solid rgba(230, 18, 126, 0.12)",
                          marginTop: "8px"
                        }}
                      >
                        <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", marginBottom: "12px" }}>
                          UK GDPR Communication Consent
                        </h4>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#5C475A" }}>
                            <input
                              type="checkbox"
                              checked={profileNewsletter}
                              onChange={(e) => setProfileNewsletter(e.target.checked)}
                              style={{ width: "16px", height: "16px", accentColor: "#E6127E" }}
                            />
                            <span>Receive our monthly community impact email newsletter</span>
                          </label>

                          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#5C475A" }}>
                            <input
                              type="checkbox"
                              checked={profileSms}
                              onChange={(e) => setProfileSms(e.target.checked)}
                              style={{ width: "16px", height: "16px", accentColor: "#E6127E" }}
                            />
                            <span>Receive critical urgent relief campaign SMS alerts</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={savingProfile}
                          className="btn-3d-magenta"
                          style={{
                            height: "44px",
                            padding: "0 28px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#ffffff",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer"
                          }}
                        >
                          {savingProfile ? <span>Saving Changes...</span> : <span>Save Profile Changes</span>}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "16px 24px",
            textAlign: "center",
            borderTop: "1px solid rgba(230, 18, 126, 0.1)",
            fontSize: "11px",
            color: "rgba(92, 71, 90, 0.7)",
            marginTop: "auto"
          }}
        >
          © {new Date().getFullYear()} The Zinthiya Trust • Registered Charity No. 1137350 • 12 New Walk, Leicester LE1 6TF, UK
        </footer>
      </div>

      {/* 3. CAMPAIGN DETAILS & OBJECTIVES MODAL */}
      {detailedCampaign && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(36, 18, 33, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 65,
            padding: "16px"
          }}
          onClick={() => setDetailedCampaign(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 24px 48px rgba(36, 18, 33, 0.25)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {detailedCampaign.imageUrl && (
              <div style={{ position: "relative", height: "230px", overflow: "hidden" }}>
                <img
                  src={detailedCampaign.imageUrl}
                  alt={detailedCampaign.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36, 18, 33, 0.2) 0%, rgba(36, 18, 33, 0.7) 100%)" }} />
                <button
                  type="button"
                  onClick={() => setDetailedCampaign(null)}
                  style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "rgba(0, 0, 0, 0.5)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", cursor: "pointer" }}
                >
                  <X size={18} style={{ width: "18px", height: "18px" }} />
                </button>

                <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", backgroundColor: "#FCE8F3", color: "#B80C64", padding: "3px 10px", borderRadius: "9999px" }}>
                    Leicestershire Relief Cause
                  </span>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", marginTop: "6px" }}>
                    {detailedCampaign.title}
                  </h2>
                </div>
              </div>
            )}

            <div style={{ padding: "24px 28px" }}>
              {!detailedCampaign.imageUrl && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", backgroundColor: "#FCE8F3", color: "#B80C64", padding: "3px 10px", borderRadius: "9999px" }}>
                      Campaign Details
                    </span>
                    <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#241221", marginTop: "8px" }}>
                      {detailedCampaign.title}
                    </h2>
                  </div>
                  <button onClick={() => setDetailedCampaign(null)} style={{ background: "none", border: "none", color: "#8E7287", cursor: "pointer" }}>
                    <X size={20} style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>
              )}

              {(() => {
                const raised = Number(detailedCampaign.raisedAmount || 0);
                const target = Number(detailedCampaign.targetAmount || 1);
                const pct = Math.min(100, Math.round((raised / target) * 100));
                const remaining = Math.max(0, target - raised);
                const { overview, objectives } = parseCampaignContent(detailedCampaign.description);

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                      <div style={{ padding: "14px", backgroundColor: "#FDF9FB", borderRadius: "14px", border: "1px solid rgba(230, 18, 126, 0.12)" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Funds Raised</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "#E6127E", marginTop: "2px" }}>£{raised.toLocaleString()}</div>
                      </div>

                      <div style={{ padding: "14px", backgroundColor: "#FDF9FB", borderRadius: "14px", border: "1px solid rgba(230, 18, 126, 0.12)" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Funding Goal</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "#241221", marginTop: "2px" }}>£{target.toLocaleString()}</div>
                      </div>

                      <div style={{ padding: "14px", backgroundColor: "#FDF9FB", borderRadius: "14px", border: "1px solid rgba(230, 18, 126, 0.12)" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase" }}>Progress</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "#059669", marginTop: "2px" }}>{pct}%</div>
                      </div>
                    </div>

                    <div>
                      <div style={{ width: "100%", height: "10px", backgroundColor: "rgba(36, 18, 33, 0.08)", borderRadius: "9999px", overflow: "hidden", marginBottom: "6px" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #E6127E 0%, #F59E0B 100%)", borderRadius: "9999px" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8E7287" }}>
                        <span>£{remaining.toLocaleString()} needed to complete goal</span>
                        <span>{detailedCampaign._count?.donations ?? 0} verified gifts</span>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", marginBottom: "6px" }}>Campaign Mission &amp; Purpose</h4>
                      <p style={{ fontSize: "13px", color: "#5C475A", lineHeight: "1.6" }}>{overview || detailedCampaign.description}</p>
                    </div>

                    {objectives.length > 0 && (
                      <div style={{ padding: "18px 20px", borderRadius: "16px", backgroundColor: "#FDF9FB", border: "1px solid rgba(230, 18, 126, 0.15)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                          <Target size={16} style={{ width: "16px", height: "16px", color: "#E6127E" }} />
                          <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", margin: 0 }}>Key Objectives &amp; Milestones</h4>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {objectives.map((obj, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", borderRadius: "10px", backgroundColor: "#ffffff", border: "1px solid rgba(36, 18, 33, 0.08)" }}>
                              <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "11px", flexShrink: 0, marginTop: "1px" }}>✓</div>
                              <span style={{ fontSize: "12.5px", color: "#241221", lineHeight: "1.4", fontWeight: 600 }}>{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ borderTop: "1px solid rgba(36, 18, 33, 0.08)", paddingTop: "18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <button
                        type="button"
                        onClick={() => setDetailedCampaign(null)}
                        style={{ padding: "10px 18px", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, backgroundColor: "#F3F4F6", color: "#5C475A", border: "none", cursor: "pointer" }}
                      >
                        Close Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const cid = detailedCampaign.id;
                          setDetailedCampaign(null);
                          navigateToMakeDonation(cid);
                        }}
                        className="btn-3d-magenta"
                        style={{ height: "44px", padding: "0 24px", borderRadius: "9999px", fontSize: "13px", fontWeight: 800, color: "#ffffff", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                      >
                        <Heart size={15} style={{ width: "15px", height: "15px" }} />
                        <span>Select this Campaign to Donate</span>
                        <ArrowRight size={14} style={{ width: "14px", height: "14px" }} />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 4. QUICK ACTION DONATION MODAL (For floating/top bar triggers) */}
      {showDonateModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(36, 18, 33, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 70,
            padding: "16px"
          }}
          onClick={() => setShowDonateModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "480px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDonateModal(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#8E7287", cursor: "pointer", padding: "4px" }}
            >
              <X size={20} style={{ width: "20px", height: "20px" }} />
            </button>

            <div style={{ textAlign: "center", marginBottom: "18px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", backgroundColor: "#FCE8F3", color: "#B80C64", padding: "3px 10px", borderRadius: "9999px" }}>
                Quick Donation
              </span>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#241221", marginTop: "8px" }}>
                Make a Donation
              </h2>
              <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "4px" }}>
                Logged in as <strong>{donor?.fullName}</strong>.
              </p>
            </div>

            {activeSelectedCampaign && (
              <div style={{ padding: "12px 14px", borderRadius: "14px", backgroundColor: "rgba(253, 240, 244, 0.8)", border: "1px solid rgba(230, 18, 126, 0.18)", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#B80C64", textTransform: "uppercase" }}>Selected Campaign</div>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#241221" }}>{activeSelectedCampaign.title}</div>
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "9999px", backgroundColor: "#ffffff", color: "#E6127E" }}>
                  Goal: £{Number(activeSelectedCampaign.targetAmount).toLocaleString()}
                </span>
              </div>
            )}

            {donationSuccessMsg ? (
              <div style={{ padding: "20px", backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "16px", textAlign: "center", color: "#065F46" }}>
                <Check size={28} style={{ width: "28px", height: "28px", margin: "0 auto 8px auto" }} />
                <p style={{ fontWeight: 700, fontSize: "14px" }}>{donationSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleProcessDonation} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#241221", marginBottom: "6px" }}>Frequency</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setDonateType("ONE_OFF")}
                      style={{ padding: "8px", borderRadius: "12px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: donateType === "ONE_OFF" ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)", backgroundColor: donateType === "ONE_OFF" ? "#FCE8F3" : "#ffffff", color: donateType === "ONE_OFF" ? "#B80C64" : "#5C475A" }}
                    >
                      One-off Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonateType("RECURRING")}
                      style={{ padding: "8px", borderRadius: "12px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: donateType === "RECURRING" ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)", backgroundColor: donateType === "RECURRING" ? "#FCE8F3" : "#ffffff", color: donateType === "RECURRING" ? "#B80C64" : "#5C475A" }}
                    >
                      Monthly Recurring
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#241221", marginBottom: "6px" }}>Amount (GBP)</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "8px" }}>
                    {[10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setDonateAmount(amt);
                          setCustomAmount("");
                        }}
                        style={{ padding: "8px", borderRadius: "12px", fontSize: "13px", fontWeight: 800, cursor: "pointer", border: donateAmount === amt && !customAmount ? "2px solid #E6127E" : "1px solid rgba(36, 18, 33, 0.15)", backgroundColor: donateAmount === amt && !customAmount ? "#FCE8F3" : "#ffffff", color: donateAmount === amt && !customAmount ? "#B80C64" : "#241221" }}
                      >
                        £{amt}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Or enter custom amount (£)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#241221", marginBottom: "6px" }}>Allocated Campaign</label>
                  <select
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "12px", border: "1px solid rgba(36, 18, 33, 0.2)", fontSize: "13px", backgroundColor: "#ffffff", outline: "none" }}
                  >
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} (Goal: £{Number(c.targetAmount).toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", borderRadius: "12px", cursor: "pointer", border: giftAid ? "1px solid #A7F3D0" : "1px solid rgba(36, 18, 33, 0.15)", backgroundColor: giftAid ? "#ECFDF5" : "#ffffff" }}>
                  <input type="checkbox" checked={giftAid} onChange={(e) => setGiftAid(e.target.checked)} style={{ accentColor: "#059669", width: "16px", height: "16px", marginTop: "2px" }} />
                  <span style={{ fontSize: "11px", color: "#065F46", lineHeight: "1.4" }}>
                    <strong>Add Gift Aid (+25%)</strong>: I am a UK taxpayer. Boost my donation by 25p for every £1 at no extra cost.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submittingDonation}
                  className="btn-3d-magenta"
                  style={{ width: "100%", height: "46px", borderRadius: "9999px", fontWeight: 800, fontSize: "14px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}
                >
                  {submittingDonation ? <span>Processing Gift...</span> : <span>Complete Donation of £{customAmount ? customAmount : donateAmount}</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. OFFICIAL CHARITY DONATION RECEIPT MODAL */}
      {viewReceiptDonation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(36, 18, 33, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 80,
            padding: "16px"
          }}
          onClick={() => setViewReceiptDonation(null)}
        >
          <div
            id="donation-receipt-card"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(36, 18, 33, 0.25)",
              border: "1px solid rgba(230, 18, 126, 0.2)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setViewReceiptDonation(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "none",
                border: "none",
                color: "#8E7287",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "9999px"
              }}
              title="Close Receipt"
            >
              <X size={20} style={{ width: "20px", height: "20px" }} />
            </button>

            {/* Receipt Header with Charity Branding */}
            <div style={{ textAlign: "center", borderBottom: "1.5px solid rgba(230, 18, 126, 0.15)", paddingBottom: "20px", marginBottom: "20px" }}>
              <div style={{ display: "inline-block", marginBottom: "8px" }}>
                <ZinthiyaLogo />
              </div>
              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B80C64" }}>
                Official Charitable Gift Receipt
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#241221", marginTop: "4px" }}>
                The Zinthiya Ganeshpanchan Trust
              </h2>
              <p style={{ fontSize: "11px", color: "#5C475A", marginTop: "4px", lineHeight: "1.5" }}>
                UK Registered Charity No. <strong>1137350</strong> (England &amp; Wales)<br />
                12 New Walk, Leicester LE1 6TF • Tel: 0116 254 5168 • info@zinthiyatrust.org
              </p>
            </div>

            {/* Receipt Reference & Status Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
                backgroundColor: "#FDF9FB",
                border: "1px solid rgba(230, 18, 126, 0.12)",
                borderRadius: "14px",
                padding: "12px 16px",
                marginBottom: "20px"
              }}
            >
              <div>
                <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287", letterSpacing: "0.05em" }}>
                  Receipt Reference
                </div>
                <div style={{ fontSize: "15px", fontWeight: 800, fontFamily: "monospace", color: "#E6127E", marginTop: "2px" }}>
                  {viewReceiptDonation.reference || `ZT-${viewReceiptDonation.id.substring(0, 8).toUpperCase()}`}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287", letterSpacing: "0.05em" }}>
                  Payment Status
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 800,
                    backgroundColor: "#ECFDF5",
                    color: "#059669",
                    marginTop: "2px"
                  }}
                >
                  <Check size={12} style={{ width: "12px", height: "12px" }} />
                  <span>{viewReceiptDonation.status || "COMPLETED"}</span>
                </span>
              </div>
            </div>

            {/* Donor & Transaction Metadata */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "20px", fontSize: "12px" }}>
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid rgba(36, 18, 33, 0.08)" }}>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#8E7287", textTransform: "uppercase", marginBottom: "4px" }}>
                  Donor Details
                </div>
                <div style={{ fontWeight: 800, color: "#241221", fontSize: "13px" }}>
                  {donor?.fullName || "Valued Supporter"}
                </div>
                <div style={{ color: "#5C475A", marginTop: "2px" }}>{donor?.email || "varsha@gmail.com"}</div>
                {(donor?.address || donor?.postcode) && (
                  <div style={{ color: "#8E7287", fontSize: "11px", marginTop: "2px" }}>
                    {[donor?.address, donor?.townCity, donor?.postcode].filter(Boolean).join(", ")}
                  </div>
                )}
              </div>

              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid rgba(36, 18, 33, 0.08)" }}>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#8E7287", textTransform: "uppercase", marginBottom: "4px" }}>
                  Payment Metadata
                </div>
                <div style={{ color: "#241221", fontWeight: 700 }}>
                  Date: {new Date(viewReceiptDonation.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{ color: "#5C475A", marginTop: "2px" }}>
                  Method: {viewReceiptDonation.paymentMethod || "Credit/Debit Card"}
                </div>
                <div style={{ color: "#5C475A", marginTop: "2px" }}>
                  Type: {viewReceiptDonation.type === "RECURRING" ? "Monthly Recurring Gift" : "One-Time Donation"}
                </div>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div
              style={{
                borderRadius: "14px",
                border: "1px solid rgba(36, 18, 33, 0.1)",
                overflow: "hidden",
                marginBottom: "20px"
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#FDF9FB", borderBottom: "1px solid rgba(36, 18, 33, 0.08)", color: "#8E7287", fontSize: "10px", fontWeight: 800, textTransform: "uppercase" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>Description &amp; Allocation</th>
                    <th style={{ padding: "10px 14px", textAlign: "right" }}>Amount (GBP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(36, 18, 33, 0.06)" }}>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontWeight: 800, color: "#241221" }}>
                        {viewReceiptDonation.campaign?.title || "The Zinthiya Trust General Relief Fund"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#5C475A", marginTop: "2px" }}>
                        Direct charitable gift supporting Leicestershire relief projects
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: 800, color: "#241221", fontSize: "14px" }}>
                      £{Number(viewReceiptDonation.amount).toFixed(2)}
                    </td>
                  </tr>

                  {viewReceiptDonation.giftAid && (
                    <tr style={{ borderBottom: "1px solid rgba(36, 18, 33, 0.06)", backgroundColor: "#ECFDF5" }}>
                      <td style={{ padding: "10px 14px", color: "#065F46" }}>
                        <div style={{ fontWeight: 800 }}>UK HMRC Gift Aid Tax Relief (+25%)</div>
                        <div style={{ fontSize: "11px", color: "#047857" }}>
                          Reclaimed under Chapter 2, Part 8, Income Tax Act 2007 at zero cost to donor
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, color: "#059669", fontSize: "13px" }}>
                        +£{(Number(viewReceiptDonation.amount) * 0.25).toFixed(2)}
                      </td>
                    </tr>
                  )}

                  <tr style={{ backgroundColor: "#FDF0F4" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 800, color: "#241221" }}>
                      Total Charitable Value to The Zinthiya Trust
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: 800, color: "#E6127E", fontSize: "16px" }}>
                      £{(Number(viewReceiptDonation.amount) * (viewReceiptDonation.giftAid ? 1.25 : 1.0)).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* HMRC & Charity Disclaimer Note */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                fontSize: "11px",
                color: "#6B7280",
                lineHeight: "1.5",
                marginBottom: "24px"
              }}
            >
              <div style={{ fontWeight: 700, color: "#374151", marginBottom: "2px" }}>
                Official Donor Receipt Notice
              </div>
              The Zinthiya Ganeshpanchan Trust is a registered charity in England &amp; Wales (#1137350). Please retain this receipt for your personal tax or accounting records.
            </div>

            {/* Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={handlePrintReceipt}
                style={{
                  height: "42px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  backgroundColor: "#ffffff",
                  color: "#241221",
                  border: "1px solid rgba(36, 18, 33, 0.2)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <Printer size={14} style={{ width: "14px", height: "14px" }} />
                <span>Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadReceipt(viewReceiptDonation)}
                className="btn-3d-magenta"
                style={{
                  height: "42px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <Download size={14} style={{ width: "14px", height: "14px" }} />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setViewReceiptDonation(null)}
                style={{
                  height: "42px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  backgroundColor: "rgba(36, 18, 33, 0.05)",
                  color: "#5C475A",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorDashboardPage;
