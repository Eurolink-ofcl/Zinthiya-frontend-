import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { downloadReceiptPdf } from "../lib/pdfReceipt";
import { CampaignImageUpload } from "../components/CampaignImageUpload";
import {
  api,
  DonorUser,
  AdminDashboardPayload,
  AdminMetrics,
  AdminCampaignPerformance,
  AdminActivity,
  AdminBeneficiaryRequest,
  CrmDonor,
  CampaignRecord,
  DonationRecord,
  BeneficiaryRecord,
  BeneficiaryDocument,
  BeneficiaryCommunication,
  AssistanceAllocationRecord,
  AllocationsResponse,
  SupportCategoryRecord,
  AllocationStatus,
  AssistanceType,
  ReportsData,
  ReportFilters,
  StaffMember,
  StaffStats,
  StaffResponse,
  AuditLogRecord,
  AuditLogsResponse,
  RolesPermissionsResponse
} from "../lib/api";
import {
  LayoutDashboard,
  Compass,
  User,
  CreditCard,
  HeartHandshake,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Activity,
  RefreshCw,
  Clock,
  Check,
  AlertCircle,
  Sparkles,
  UploadCloud,
  Paperclip,
  Menu,
  X,
  PhoneCall,
  Search,
  Users,
  Plus,
  Edit,
  Trash2,
  Download,
  Printer,
  Archive,
  Calendar,
  UserPlus,
  Eye,
  Mail,
  Heart,
  FileText,
  Wallet,
  BarChart3,
  PieChart,
  Layers,
  Key,
  UserCheck,
  UserX,
  Briefcase,
  Sliders,
  History,
  Megaphone,
  Landmark,
  Bell,
  Lock,
  EyeOff,
  Globe,
  ExternalLink,
  ChevronDown,
  Building,
  Building2
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
          x="320"
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

function DonorTierBadge({ tier }: { tier: string }) {
  switch (tier) {
    case "PLATINUM":
      return (
        <span className="admin-tier-badge admin-tier-platinum">
          ★ PLATINUM
        </span>
      );
    case "GOLD":
      return (
        <span className="admin-tier-badge admin-tier-gold">
          ★ GOLD
        </span>
      );
    case "SILVER":
      return (
        <span className="admin-tier-badge admin-tier-silver">
          ★ SILVER
        </span>
      );
    case "BRONZE":
      return (
        <span className="admin-tier-badge admin-tier-bronze">
          ★ BRONZE
        </span>
      );
    default:
      return (
        <span className="admin-tier-badge admin-tier-supporter">
          SUPPORTER
        </span>
      );
  }
}

export function AdminDashboardPage() {
  const navigate = useNavigate();

  
  // ==========================================
  // CAMPAIGN MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState<boolean>(false);
  const [campaignSearch, setCampaignSearch] = useState<string>("");
  const [campaignStatusFilter, setCampaignStatusFilter] = useState<string>("ALL"); // ALL, ACTIVE, DRAFT, COMPLETED, ARCHIVED
  const [campaignTypeFilter, setCampaignTypeFilter] = useState<string>("ALL"); // ALL, INTERNAL, EXTERNAL
  const [campaignSortBy, setCampaignSortBy] = useState<string>("RAISED_DESC");

  // Modals
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState<boolean>(false);
  const [editingCampaign, setEditingCampaign] = useState<CampaignRecord | null>(null);
  const [viewingCampaignDonations, setViewingCampaignDonations] = useState<CampaignRecord | null>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<CampaignRecord | null>(null);

  // Form State for Create Campaign (Supporting Internal & External Types)
  const [newCampType, setNewCampType] = useState<"INTERNAL" | "EXTERNAL">("INTERNAL");
  const [newCampCode, setNewCampCode] = useState<string>("");
  const [newCampTitle, setNewCampTitle] = useState("");
  const [newCampUrl, setNewCampUrl] = useState("");
  const [newCampDescription, setNewCampDescription] = useState("");
  const [newCampTarget, setNewCampTarget] = useState<number | string>(10000);
  const [newCampImageUrl, setNewCampImageUrl] = useState("");
  const [newCampStartDate, setNewCampStartDate] = useState("");
  const [newCampEndDate, setNewCampEndDate] = useState("");
  const [newCampStatus, setNewCampStatus] = useState<"DRAFT" | "ACTIVE" | "COMPLETED" | "ARCHIVED">("ACTIVE");
  const [newCampActive, setNewCampActive] = useState(true);

  // External Campaign Specific Fields
  const [newCampCorporateSponsor, setNewCampCorporateSponsor] = useState("");
  const [newCampFundraisingPageId, setNewCampFundraisingPageId] = useState("");
  const [newCampFundraisingPageName, setNewCampFundraisingPageName] = useState("");
  const [newCampFundraisingPageUrl, setNewCampFundraisingPageUrl] = useState("");
  const [newCampFundraiserName, setNewCampFundraiserName] = useState("");
  const [newCampFundraiserEmail, setNewCampFundraiserEmail] = useState("");
  const [newCampFundraiserContactConsent, setNewCampFundraiserContactConsent] = useState(true);
  const [newCampCustomReference, setNewCampCustomReference] = useState("");
  const [newCampCharityReferences, setNewCampCharityReferences] = useState("");
  const [newCampShowMarketingTracking, setNewCampShowMarketingTracking] = useState(false);
  const [newCampUtmSource, setNewCampUtmSource] = useState("");
  const [newCampUtmMedium, setNewCampUtmMedium] = useState("");
  const [newCampUtmCampaign, setNewCampUtmCampaign] = useState("");
  const [newCampUtmContent, setNewCampUtmContent] = useState("");
  const [newCampUtmTerm, setNewCampUtmTerm] = useState("");
  const [createCampaignError, setCreateCampaignError] = useState("");
  const [submittingCreateCampaign, setSubmittingCreateCampaign] = useState(false);

  // Form State for Edit Campaign
  const [editCampType, setEditCampType] = useState<"INTERNAL" | "EXTERNAL">("INTERNAL");
  const [editCampCode, setEditCampCode] = useState("");
  const [editCampTitle, setEditCampTitle] = useState("");
  const [editCampUrl, setEditCampUrl] = useState("");
  const [editCampDescription, setEditCampDescription] = useState("");
  const [editCampTarget, setEditCampTarget] = useState<number | string>(10000);
  const [editCampImageUrl, setEditCampImageUrl] = useState("");
  const [editCampStartDate, setEditCampStartDate] = useState("");
  const [editCampEndDate, setEditCampEndDate] = useState("");
  const [editCampStatus, setEditCampStatus] = useState<"DRAFT" | "ACTIVE" | "COMPLETED" | "ARCHIVED">("ACTIVE");
  const [editCampActive, setEditCampActive] = useState(true);
  const [editCampArchived, setEditCampArchived] = useState(false);
  const [editCampCorporateSponsor, setEditCampCorporateSponsor] = useState("");
  const [editCampFundraisingPageId, setEditCampFundraisingPageId] = useState("");
  const [editCampFundraisingPageName, setEditCampFundraisingPageName] = useState("");
  const [editCampFundraisingPageUrl, setEditCampFundraisingPageUrl] = useState("");
  const [editCampFundraiserName, setEditCampFundraiserName] = useState("");
  const [editCampFundraiserEmail, setEditCampFundraiserEmail] = useState("");
  const [editCampFundraiserContactConsent, setEditCampFundraiserContactConsent] = useState(true);
  const [editCampCustomReference, setEditCampCustomReference] = useState("");
  const [editCampCharityReferences, setEditCampCharityReferences] = useState("");
  const [editCampShowMarketingTracking, setEditCampShowMarketingTracking] = useState(false);
  const [editCampUtmSource, setEditCampUtmSource] = useState("");
  const [editCampUtmMedium, setEditCampUtmMedium] = useState("");
  const [editCampUtmCampaign, setEditCampUtmCampaign] = useState("");
  const [editCampUtmContent, setEditCampUtmContent] = useState("");
  const [editCampUtmTerm, setEditCampUtmTerm] = useState("");
  const [editCampaignError, setEditCampaignError] = useState("");
  const [submittingEditCampaign, setSubmittingEditCampaign] = useState(false);

  function handleGenerateCampaignCode() {
    return `ZT-CAMP-${Math.floor(10000 + Math.random() * 90000)}`;
  }

  function openCreateCampaignModal() {
    setNewCampType("INTERNAL");
    setNewCampCode(`ZT-CAMP-${Math.floor(10000 + Math.random() * 90000)}`);
    setNewCampTitle("");
    setNewCampUrl("");
    setNewCampDescription("");
    setNewCampTarget(10000);
    setNewCampImageUrl("");
    setNewCampStartDate("");
    setNewCampEndDate("");
    setNewCampStatus("ACTIVE");
    setNewCampActive(true);
    setNewCampCorporateSponsor("");
    setNewCampFundraisingPageId("");
    setNewCampFundraisingPageName("");
    setNewCampFundraisingPageUrl("");
    setNewCampFundraiserName("");
    setNewCampFundraiserEmail("");
    setNewCampFundraiserContactConsent(true);
    setNewCampCustomReference("");
    setNewCampCharityReferences("");
    setNewCampShowMarketingTracking(false);
    setNewCampUtmSource("");
    setNewCampUtmMedium("");
    setNewCampUtmCampaign("");
    setNewCampUtmContent("");
    setNewCampUtmTerm("");
    setCreateCampaignError("");
    setShowCreateCampaignModal(true);
  }

  async function loadCampaignsData(retries = 1) {
    setCampaignsLoading(true);
    try {
      const data = await api.getAdminCampaigns();
      setCampaigns(data);
    } catch (err: any) {
      if (retries > 0) {
        setTimeout(() => loadCampaignsData(retries - 1), 600);
        return;
      }
      setErrorMsg(err.message || "Failed to load campaigns.");
    } finally {
      setCampaignsLoading(false);
    }
  }

  async function handleCreateCampaignSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreateCampaignError("");

    if (!newCampTitle.trim()) {
      setCreateCampaignError("Campaign name is required.");
      return;
    }
    const target = typeof newCampTarget === "string" ? parseFloat(newCampTarget) : newCampTarget;
    if (!target || target <= 0) {
      setCreateCampaignError("Please enter a valid fundraising target greater than £0.");
      return;
    }
    if (!newCampDescription.trim()) {
      setCreateCampaignError("Please provide a description explaining the purpose of this campaign.");
      return;
    }

    setSubmittingCreateCampaign(true);
    try {
      await api.createCampaignAdmin({
        campaignType: newCampType,
        campaignCode: newCampCode.trim() || undefined,
        title: newCampTitle.trim(),
        campaignUrl: newCampUrl.trim() || undefined,
        description: newCampDescription.trim(),
        targetAmount: target,
        imageUrl: newCampImageUrl.trim() || undefined,
        status: newCampStatus,
        active: newCampStatus === "ACTIVE",
        startDate: newCampStartDate || undefined,
        endDate: newCampEndDate || undefined,
        corporateSponsor: newCampCorporateSponsor.trim() || undefined,
        fundraisingPageId: newCampFundraisingPageId.trim() || undefined,
        fundraisingPageName: newCampFundraisingPageName.trim() || undefined,
        fundraisingPageUrl: newCampFundraisingPageUrl.trim() || undefined,
        fundraiserName: newCampFundraiserName.trim() || undefined,
        fundraiserEmail: newCampFundraiserEmail.trim() || undefined,
        fundraiserContactConsent: newCampFundraiserContactConsent,
        customReference: newCampCustomReference.trim() || undefined,
        charityReferences: newCampCharityReferences.trim() || undefined,
        utmSource: newCampUtmSource.trim() || undefined,
        utmMedium: newCampUtmMedium.trim() || undefined,
        utmCampaign: newCampUtmCampaign.trim() || undefined,
        utmContent: newCampUtmContent.trim() || undefined,
        utmTerm: newCampUtmTerm.trim() || undefined,
      });

      setActionSuccessMsg(`${newCampType === "EXTERNAL" ? "External" : "Internal"} campaign "${newCampTitle}" created successfully!`);
      setShowCreateCampaignModal(false);
      await Promise.all([loadCampaignsData(), loadDashboardData()]);
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setCreateCampaignError(err.message || "Failed to create campaign.");
    } finally {
      setSubmittingCreateCampaign(false);
    }
  }

  function openEditCampaign(campaign: CampaignRecord) {
    setEditingCampaign(campaign);
    setEditCampType(campaign.campaignType || "INTERNAL");
    setEditCampCode(campaign.campaignCode || "");
    setEditCampTitle(campaign.title);
    setEditCampUrl(campaign.campaignUrl || "");
    setEditCampDescription(campaign.description);
    setEditCampTarget(Number(campaign.targetAmount));
    setEditCampImageUrl(campaign.imageUrl || "");
    setEditCampStartDate(campaign.startDate ? campaign.startDate.slice(0, 10) : "");
    setEditCampEndDate(campaign.endDate ? campaign.endDate.slice(0, 10) : "");
    setEditCampStatus(campaign.status || (campaign.archived ? "ARCHIVED" : campaign.active ? "ACTIVE" : "DRAFT"));
    setEditCampActive(campaign.active);
    setEditCampArchived(Boolean(campaign.archived));
    setEditCampCorporateSponsor(campaign.corporateSponsor || "");
    setEditCampFundraisingPageId(campaign.fundraisingPageId || "");
    setEditCampFundraisingPageName(campaign.fundraisingPageName || "");
    setEditCampFundraisingPageUrl(campaign.fundraisingPageUrl || "");
    setEditCampFundraiserName(campaign.fundraiserName || "");
    setEditCampFundraiserEmail(campaign.fundraiserEmail || "");
    setEditCampFundraiserContactConsent(Boolean(campaign.fundraiserContactConsent));
    setEditCampCustomReference(campaign.customReference || "");
    setEditCampCharityReferences(campaign.charityReferences || "");
    setEditCampShowMarketingTracking(false);
    setEditCampUtmSource(campaign.utmSource || "");
    setEditCampUtmMedium(campaign.utmMedium || "");
    setEditCampUtmCampaign(campaign.utmCampaign || "");
    setEditCampUtmContent(campaign.utmContent || "");
    setEditCampUtmTerm(campaign.utmTerm || "");
    setEditCampaignError("");
  }

  async function handleEditCampaignSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCampaign) return;

    const target = typeof editCampTarget === "string" ? parseFloat(editCampTarget) : editCampTarget;
    if (!target || target <= 0) {
      setEditCampaignError("Please enter a valid target amount greater than £0.");
      return;
    }

    setSubmittingEditCampaign(true);
    setEditCampaignError("");
    try {
      await api.updateCampaignAdmin(editingCampaign.id, {
        campaignType: editCampType,
        campaignCode: editCampCode.trim() || undefined,
        campaignUrl: editCampUrl.trim() || undefined,
        title: editCampTitle.trim(),
        description: editCampDescription.trim(),
        targetAmount: target,
        imageUrl: editCampImageUrl.trim() || null,
        status: editCampStatus,
        startDate: editCampStartDate || null,
        endDate: editCampEndDate || null,
        active: editCampStatus === "ACTIVE",
        archived: editCampStatus === "ARCHIVED" || editCampArchived,
        corporateSponsor: editCampCorporateSponsor.trim() || null,
        fundraisingPageId: editCampFundraisingPageId.trim() || null,
        fundraisingPageName: editCampFundraisingPageName.trim() || null,
        fundraisingPageUrl: editCampFundraisingPageUrl.trim() || null,
        fundraiserName: editCampFundraiserName.trim() || null,
        fundraiserEmail: editCampFundraiserEmail.trim() || null,
        fundraiserContactConsent: editCampFundraiserContactConsent,
        customReference: editCampCustomReference.trim() || null,
        charityReferences: editCampCharityReferences.trim() || null,
        utmSource: editCampUtmSource.trim() || null,
        utmMedium: editCampUtmMedium.trim() || null,
        utmCampaign: editCampUtmCampaign.trim() || null,
        utmContent: editCampUtmContent.trim() || null,
        utmTerm: editCampUtmTerm.trim() || null,
      });

      setActionSuccessMsg(`Campaign "${editCampTitle}" updated successfully!`);
      setEditingCampaign(null);
      await Promise.all([loadCampaignsData(), loadDashboardData()]);
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setEditCampaignError(err.message || "Failed to update campaign.");
    } finally {
      setSubmittingEditCampaign(false);
    }
  }

  async function handleToggleCampaignStatus(campaign: CampaignRecord, e: React.MouseEvent) {
    e.stopPropagation();
    const newStatus = !campaign.active;
    try {
      await api.toggleCampaignStatusAdmin(campaign.id, newStatus);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaign.id ? { ...c, active: newStatus } : c))
      );
      setActionSuccessMsg(`Campaign "${campaign.title}" is now ${newStatus ? "ACTIVE" : "PAUSED"}.`);
      setTimeout(() => setActionSuccessMsg(""), 3500);
      loadDashboardData();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to toggle campaign status.");
    }
  }

  async function handleArchiveCampaign(campaign: CampaignRecord, archived: boolean) {
    try {
      await api.archiveCampaignAdmin(campaign.id, archived);
      setActionSuccessMsg(`Campaign "${campaign.title}" has been ${archived ? "archived" : "restored"}.`);
      await loadCampaignsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update archive status.");
    }
  }

  async function handleDeleteCampaign(campaign: CampaignRecord) {
    try {
      await api.deleteCampaignAdmin(campaign.id);
      setActionSuccessMsg(`Campaign "${campaign.title}" was successfully processed.`);
      setDeletingCampaign(null);
      await loadCampaignsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete campaign .");
    }
  }

  
  // ==========================================
  // DONATION MANAGEMENT (LEDGER) STATE & HANDLERS
  // ==========================================
  const [donationsList, setDonationsList] = useState<DonationRecord[]>([]);
  const [donationsLoading, setDonationsLoading] = useState<boolean>(false);
  const [donationSearch, setDonationSearch] = useState<string>("" );
  const [donationTypeFilter, setDonationTypeFilter] = useState<string>("ALL"); // ALL, ONE_OFF, RECURRING
  const [donationStatusFilter, setDonationStatusFilter] = useState<string>("ALL"); // ALL, COMPLETED, PENDING, FAILED, REFUNDED
  const [donationMethodFilter, setDonationMethodFilter] = useState<string>("ALL");
  const [donationGiftAidFilter, setDonationGiftAidFilter] = useState<string>("ALL");
  const [donationSortBy, setDonationSortBy] = useState<string>("DATE_DESC");

  // Modals
  const [showRecordOfflineModal, setShowRecordOfflineModal] = useState<boolean>(false);
  const [viewingReceiptDonation, setViewingReceiptDonation] = useState<DonationRecord | null>(null);
  const [viewingDonationDetail, setViewingDonationDetail] = useState<DonationRecord | null>(null);
  const [editingStatusDonation, setEditingStatusDonation] = useState<DonationRecord | null>(null);
  const [newStatusValue, setNewStatusValue] = useState<string>("COMPLETED");
  const [submittingStatusChange, setSubmittingStatusChange] = useState<boolean>(false);
  const [deletingDonation, setDeletingDonation] = useState<DonationRecord | null>(null);

  // Form State for Record Offline Donation (5-Section Flow)
  const [offlineDonorMode, setOfflineDonorMode] = useState<"EXISTING" | "NEW">("EXISTING");
  const [offlineSelectedDonorId, setOfflineSelectedDonorId] = useState<string>("");
  const [offlineDonorSearch, setOfflineDonorSearch] = useState<string>("");
  const [offlineNewDonorName, setOfflineNewDonorName] = useState<string>("");
  const [offlineNewDonorEmail, setOfflineNewDonorEmail] = useState<string>("");
  const [offlineNewDonorPhone, setOfflineNewDonorPhone] = useState<string>("");
  const [offlineAmount, setOfflineAmount] = useState<number | string>(100);
  const [offlineCampaignId, setOfflineCampaignId] = useState<string>("");
  const [offlinePaymentMethod, setOfflinePaymentMethod] = useState<string>("Bank Transfer");
  const [offlineType, setOfflineType] = useState<"ONE_OFF" | "RECURRING">("ONE_OFF");
  const [offlineStatus, setOfflineStatus] = useState<string>("COMPLETED");
  const [offlineGiftAid, setOfflineGiftAid] = useState<boolean>(false);
  const [offlineGiftAidDate, setOfflineGiftAidDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [offlineReference, setOfflineReference] = useState<string>("");
  const [offlineDateReceived, setOfflineDateReceived] = useState<string>(new Date().toISOString().slice(0, 10));
  const [offlineNotes, setOfflineNotes] = useState<string>("");
  const [offlineIssueReceipt, setOfflineIssueReceipt] = useState<boolean>(true);
  const [submittingOfflineDonation, setSubmittingOfflineDonation] = useState<boolean>(false);

  async function loadDonationsData() {
    setDonationsLoading(true);
    try {
      const data = await api.getAdminDonations();
      setDonationsList(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load donations ledger successfully.");
    } finally {
      setDonationsLoading(false);
    }
  }

  async function handleRecordOfflineSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = typeof offlineAmount === "string" ? parseFloat(offlineAmount) : offlineAmount;
    if (!amt || amt <= 0) {
      setErrorMsg("Please enter a valid donation amount greater than £0.");
      return;
    }

    if (offlineDonorMode === "NEW" && !offlineNewDonorName.trim()) {
      setErrorMsg("Please enter supporter full name for new donor.");
      return;
    }

    if (offlineDonorMode === "EXISTING" && !offlineSelectedDonorId) {
      setErrorMsg("Please select an existing supporter from the CRM list.");
      return;
    }

    setSubmittingOfflineDonation(true);
    setErrorMsg("");
    try {
      const res = await api.recordOfflineDonationAdmin({
        amount: amt,
        userId: offlineDonorMode === "EXISTING" ? offlineSelectedDonorId || undefined : undefined,
        donorName: offlineDonorMode === "NEW" ? offlineNewDonorName.trim() : undefined,
        donorEmail: offlineDonorMode === "NEW" ? offlineNewDonorEmail.trim() : undefined,
        donorPhone: offlineDonorMode === "NEW" ? offlineNewDonorPhone.trim() : undefined,
        campaignId: offlineCampaignId || undefined,
        paymentMethod: offlinePaymentMethod,
        type: offlineType,
        status: offlineStatus,
        giftAid: offlineGiftAid,
        reference: offlineReference.trim() || undefined,
        dateReceived: offlineDateReceived || undefined,
        notes: offlineNotes.trim() || undefined,
      });

      const recorded = (res as any)?.data || res;
      setActionSuccessMsg(`Offline donation of £${amt.toFixed(2)} recorded successfully! Reference: ${recorded?.reference || offlineReference || "SAVED"}`);
      setShowRecordOfflineModal(false);

      // Reset form
      setOfflineAmount(100);
      setOfflineSelectedDonorId("");
      setOfflineDonorSearch("");
      setOfflineNewDonorName("");
      setOfflineNewDonorEmail("");
      setOfflineNewDonorPhone("");
      setOfflineCampaignId("");
      setOfflinePaymentMethod("Bank Transfer");
      setOfflineType("ONE_OFF");
      setOfflineStatus("COMPLETED");
      setOfflineGiftAid(false);
      setOfflineReference("");
      setOfflineNotes("");

      await Promise.all([
        loadDonationsData(),
        loadDonorsData(),
        loadCampaignsData(),
        loadDashboardData()
      ]);
      setTimeout(() => setActionSuccessMsg(""), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to record offline donation.");
    } finally {
      setSubmittingOfflineDonation(false);
    }
  }

  async function handleUpdateStatusSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingStatusDonation) return;

    setSubmittingStatusChange(true);
    setErrorMsg("");
    try {
      await api.updateDonationStatusAdmin(editingStatusDonation.id, newStatusValue);
      setActionSuccessMsg(`Donation ${editingStatusDonation.reference || editingStatusDonation.id} status updated to ${newStatusValue} successfully!`);
      setEditingStatusDonation(null);
      await loadDonationsData();
      await loadDonorsData();
      await loadCampaignsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update donation status .");
    } finally {
      setSubmittingStatusChange(false);
    }
  }

  async function handleDeleteDonation(donation: DonationRecord) {
    try {
      await api.deleteDonationAdmin(donation.id);
      setActionSuccessMsg(`Donation record ${donation.reference || donation.id} deleted .`);
      setDeletingDonation(null);
      await loadDonationsData();
      await loadDonorsData();
      await loadCampaignsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete donation .");
    }
  }

  function handleExportCsv() {
    if (filteredDonations.length === 0) {
      setErrorMsg("No donations available to export with current filters.");
      return;
    }

    const headers = [
      "Reference",
      "Date",
      "Donor Name",
      "Donor Email",
      "Donor Phone",
      "Donor Tier",
      "Campaign / Cause",
      "Amount (GBP)",
      "Currency",
      "Giving Type",
      "Payment Method",
      "Payment Status",
      "Gift Aid Declared",
      "Notes"
    ];

    const rows = filteredDonations.map((dn) => {
      const donorName = dn.user?.fullName || dn.donorName || "Anonymous";
      const donorEmail = dn.user?.email || dn.donorEmail || "";
      const donorPhone = dn.user?.phoneNumber || "";
      const donorTier = dn.user?.donationTier || "SUPPORTER";
      const campaignTitle = dn.campaign?.title || "General Relief Fund";
      const dateStr = new Date(dn.createdAt).toLocaleDateString("en-GB");
      const notes = (dn.notes || "").replace(/\n/g, " ");

      return [
        `"${dn.reference || dn.id}"`,
        `"${dateStr}"`,
        `"${donorName.replace(/"/g, '""')}"`,
        `"${donorEmail.replace(/"/g, '""')}"`,
        `"${donorPhone}"`,
        `"${donorTier}"`,
        `"${campaignTitle.replace(/"/g, '""')}"`,
        Number(dn.amount).toFixed(2),
        "GBP",
        `"${dn.type}"`,
        `"${dn.paymentMethod || 'Card'}"`,
        `"${dn.status}"`,
        dn.giftAid ? "Yes" : "No",
        `"${notes.replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zinthiya-donations-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ==========================================
  // BENEFICIARY MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [beneficiariesList, setBeneficiariesList] = useState<BeneficiaryRecord[]>([]);
  const [beneficiariesLoading, setBeneficiariesLoading] = useState<boolean>(false);
  const [beneficiarySearchQuery, setBeneficiarySearchQuery] = useState<string>("");
  const [beneficiaryAccountStatusFilter, setBeneficiaryAccountStatusFilter] = useState<string>("ALL"); // ALL, ACTIVE, INACTIVE
  const [beneficiaryRequestStatusFilter, setBeneficiaryRequestStatusFilter] = useState<string>("ALL"); // ALL, PENDING, IN_PROGRESS, APPROVED, REJECTED
  const [beneficiaryUrgencyFilter, setBeneficiaryUrgencyFilter] = useState<string>("ALL"); // ALL, EMERGENCY, HIGH, MEDIUM, LOW
  const [beneficiaryAdvocateFilter, setBeneficiaryAdvocateFilter] = useState<string>("ALL");
  const [beneficiarySortBy, setBeneficiarySortBy] = useState<string>("NEWEST"); // NEWEST, OLDEST, NAME_ASC, NAME_DESC, URGENCY_DESC

  // Modals
  const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState<boolean>(false);
  const [viewingBeneficiary, setViewingBeneficiary] = useState<BeneficiaryRecord | null>(null);
  const [beneficiaryActiveTabModal, setBeneficiaryActiveTabModal] = useState<"OVERVIEW" | "REQUESTS" | "DOCUMENTS" | "COMMS">("OVERVIEW");
  const [editingBeneficiary, setEditingBeneficiary] = useState<BeneficiaryRecord | null>(null);
  const [reviewingRequestItem, setReviewingRequestItem] = useState<{ beneficiary: BeneficiaryRecord; request: AdminBeneficiaryRequest } | null>(null);
  const [assigningAdvocateBeneficiary, setAssigningAdvocateBeneficiary] = useState<BeneficiaryRecord | null>(null);

  const [addingDocBeneficiary, setAddingDocBeneficiary] = useState<BeneficiaryRecord | null>(null);
  const [creatingReqBeneficiary, setCreatingReqBeneficiary] = useState<BeneficiaryRecord | null>(null);
  const [deletingBeneficiary, setDeletingBeneficiary] = useState<BeneficiaryRecord | null>(null);

  // =========================================================================
  // ADD BENEFICIARY WORKFLOW: Individual & Organisation Registration
  // =========================================================================
  const [addBenStep, setAddBenStep] = useState<1 | 2 | 3 | 4>(1);
  const [addBenType, setAddBenType] = useState<"INDIVIDUAL" | "ORGANISATION">("INDIVIDUAL");

  // Individual Form States
  const [newBenFirstName, setNewBenFirstName] = useState("");
  const [newBenLastName, setNewBenLastName] = useState("");
  const [newBenFullName, setNewBenFullName] = useState("");
  const [newBenDob, setNewBenDob] = useState("");
  const [newBenGender, setNewBenGender] = useState("Female");
  const [newBenPreferredLanguage, setNewBenPreferredLanguage] = useState("English");
  const [newBenPhone, setNewBenPhone] = useState("");
  const [newBenEmail, setNewBenEmail] = useState("");
  const [newBenAddress, setNewBenAddress] = useState("");
  const [newBenTownCity, setNewBenTownCity] = useState("Leicester");
  const [newBenPostcode, setNewBenPostcode] = useState("");
  const [newBenCountry, setNewBenCountry] = useState("United Kingdom");
  const [newBenEmergencyContact, setNewBenEmergencyContact] = useState("");
  const [newBenHouseholdSize, setNewBenHouseholdSize] = useState<number | string>(1);
  const [newBenSupportCategory, setNewBenSupportCategory] = useState("Emergency Food Parcel & Essentials");
  const [newBenInitialUrgency, setNewBenInitialUrgency] = useState("HIGH");
  const [newBenReasonForSupport, setNewBenReasonForSupport] = useState("");
  const [newBenAssistanceDescription, setNewBenAssistanceDescription] = useState("");
  const [newBenSupportingDocsNote, setNewBenSupportingDocsNote] = useState("");
  const [newBenInitialNotes, setNewBenInitialNotes] = useState("");
  const [newBenAssignedAdvocate, setNewBenAssignedAdvocate] = useState("");
  const [newBenCreatePortalAccount, setNewBenCreatePortalAccount] = useState(true);
  const [newBenActiveStatus, setNewBenActiveStatus] = useState(true);
  const [newBenPassword, setNewBenPassword] = useState("Beneficiary@123");
  const [showBenPassword, setShowBenPassword] = useState(false);
  const [newBenUploadedFiles, setNewBenUploadedFiles] = useState<Array<{ id: string; name: string; size: string; type: string; dataUrl?: string }>>([]);

  // Organisation Form States
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgType, setNewOrgType] = useState("Registered Charity");
  const [newOrgRegNumber, setNewOrgRegNumber] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [newOrgContactPerson, setNewOrgContactPerson] = useState("");
  const [newOrgContactRole, setNewOrgContactRole] = useState("Community Outreach Coordinator");
  const [newOrgContactEmail, setNewOrgContactEmail] = useState("");
  const [newOrgContactPhone, setNewOrgContactPhone] = useState("");
  const [newOrgPassword, setNewOrgPassword] = useState("Beneficiary@123");
  const [showOrgPassword, setShowOrgPassword] = useState(false);
  const [newOrgUploadedFiles, setNewOrgUploadedFiles] = useState<Array<{ id: string; name: string; size: string; type: string; dataUrl?: string }>>([]);
  const [newOrgAddress, setNewOrgAddress] = useState("");
  const [newOrgTownCity, setNewOrgTownCity] = useState("Leicester");
  const [newOrgPostcode, setNewOrgPostcode] = useState("");
  const [newOrgCountry, setNewOrgCountry] = useState("United Kingdom");
  const [newOrgSupportCategory, setNewOrgSupportCategory] = useState("Community Food Distribution & Pantry Stock");
  const [newOrgUrgency, setNewOrgUrgency] = useState("HIGH");
  const [newOrgBeneficiaryReach, setNewOrgBeneficiaryReach] = useState<number | string>(50);
  const [newOrgReasonForSupport, setNewOrgReasonForSupport] = useState("");
  const [newOrgAssistanceDescription, setNewOrgAssistanceDescription] = useState("");
  const [newOrgSupportingDocsNote, setNewOrgSupportingDocsNote] = useState("");
  const [newOrgInternalNotes, setNewOrgInternalNotes] = useState("");
  const [newOrgAssignedAdvocate, setNewOrgAssignedAdvocate] = useState("");
  const [newOrgCreatePortalAccount, setNewOrgCreatePortalAccount] = useState(true);
  const [newOrgActiveStatus, setNewOrgActiveStatus] = useState(true);

  const [submittingAddBeneficiary, setSubmittingAddBeneficiary] = useState(false);

  function handleFileUploadBeneficiary(e: React.ChangeEvent<HTMLInputElement>, isOrg = false) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        const formattedSize = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
        const docObj = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          size: formattedSize,
          type: file.type || "Document",
          dataUrl,
        };
        if (isOrg) {
          setNewOrgUploadedFiles((prev) => [...prev, docObj]);
        } else {
          setNewBenUploadedFiles((prev) => [...prev, docObj]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function handleRemoveUploadedFile(docId: string, isOrg = false) {
    if (isOrg) {
      setNewOrgUploadedFiles((prev) => prev.filter((d) => d.id !== docId));
    } else {
      setNewBenUploadedFiles((prev) => prev.filter((d) => d.id !== docId));
    }
  }

  function resetAddBeneficiaryForm() {
    setAddBenStep(1);
    setAddBenType("INDIVIDUAL");
    setNewBenFirstName("");
    setNewBenLastName("");
    setNewBenFullName("");
    setNewBenDob("");
    setNewBenGender("Female");
    setNewBenPreferredLanguage("English");
    setNewBenPhone("");
    setNewBenEmail("");
    setNewBenPassword("Beneficiary@123");
    setShowBenPassword(false);
    setNewBenUploadedFiles([]);
    setNewBenAddress("");
    setNewBenTownCity("Leicester");
    setNewBenPostcode("");
    setNewBenCountry("United Kingdom");
    setNewBenEmergencyContact("");
    setNewBenHouseholdSize(1);
    setNewBenSupportCategory("Emergency Food Parcel & Essentials");
    setNewBenInitialUrgency("HIGH");
    setNewBenReasonForSupport("");
    setNewBenAssistanceDescription("");
    setNewBenSupportingDocsNote("");
    setNewBenInitialNotes("");
    setNewBenAssignedAdvocate("");
    setNewBenCreatePortalAccount(true);
    setNewBenActiveStatus(true);

    setNewOrgName("");
    setNewOrgType("Registered Charity");
    setNewOrgRegNumber("");
    setNewOrgDescription("");
    setNewOrgContactPerson("");
    setNewOrgContactRole("Community Outreach Coordinator");
    setNewOrgContactEmail("");
    setNewOrgContactPhone("");
    setNewOrgPassword("Beneficiary@123");
    setShowOrgPassword(false);
    setNewOrgUploadedFiles([]);
    setNewOrgAddress("");
    setNewOrgTownCity("Leicester");
    setNewOrgPostcode("");
    setNewOrgCountry("United Kingdom");
    setNewOrgSupportCategory("Community Food Distribution & Pantry Stock");
    setNewOrgUrgency("HIGH");
    setNewOrgBeneficiaryReach(50);
    setNewOrgReasonForSupport("");
    setNewOrgAssistanceDescription("");
    setNewOrgSupportingDocsNote("");
    setNewOrgInternalNotes("");
    setNewOrgAssignedAdvocate("");
    setNewOrgCreatePortalAccount(true);
    setNewOrgActiveStatus(true);
  }

  function handleNextStep(e?: React.MouseEvent | React.FormEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setErrorMsg("");
    if (addBenStep === 1) {
      setAddBenStep(2);
      return;
    }
    if (addBenStep === 2) {
      if (addBenType === "INDIVIDUAL") {
        const computed = (newBenFullName.trim() || `${newBenFirstName.trim()} ${newBenLastName.trim()}`).trim();
        if (!computed) {
          setErrorMsg("Please enter first name and last name.");
          return;
        }
        if (!newBenEmail.trim()) {
          setErrorMsg("Please enter a valid email address.");
          return;
        }
        if (!newBenPassword.trim()) {
          setErrorMsg("Please enter a portal login password.");
          return;
        }
      } else {
        if (!newOrgName.trim()) {
          setErrorMsg("Please enter organisation name.");
          return;
        }
        if (!newOrgContactEmail.trim()) {
          setErrorMsg("Please enter contact email address.");
          return;
        }
        if (!newOrgPassword.trim()) {
          setErrorMsg("Please enter a portal login password.");
          return;
        }
      }
      setAddBenStep(3);
      return;
    }
    if (addBenStep === 3) {
      setAddBenStep(4);
      return;
    }
  }

  // Form states for Edit Beneficiary
  const [editBenFullName, setEditBenFullName] = useState("");
  const [editBenEmail, setEditBenEmail] = useState("");
  const [editBenPhone, setEditBenPhone] = useState("");
  const [editBenAddress, setEditBenAddress] = useState("");
  const [editBenTownCity, setEditBenTownCity] = useState("Leicester");
  const [editBenPostcode, setEditBenPostcode] = useState("");
  const [editBenEmergencyContact, setEditBenEmergencyContact] = useState("");
  const [editBenAssignedAdvocate, setEditBenAssignedAdvocate] = useState("");
  const [editBenActive, setEditBenActive] = useState(true);
  const [submittingEditBeneficiary, setSubmittingEditBeneficiary] = useState(false);
  const [submittingDeleteBeneficiary, setSubmittingDeleteBeneficiary] = useState(false);

  // Form states for Application Review
  const [reviewStatusValue, setReviewStatusValue] = useState("APPROVED");
  const [reviewNotesValue, setReviewNotesValue] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Form states for Assign Advocate
  const [selectedAdvocateValue, setSelectedAdvocateValue] = useState("Sarah Davies (Senior Crisis Caseworker)");
  const [submittingAssignAdvocate, setSubmittingAssignAdvocate] = useState(false);



  // Form states for Add Document
  const [docNameValue, setDocNameValue] = useState("");
  const [docTypeValue, setDocTypeValue] = useState("Proof of Address");
  const [docStatusValue, setDocStatusValue] = useState("VERIFIED");
  const [submittingDoc, setSubmittingDoc] = useState(false);

  // Form states for Create Request for existing beneficiary
  const [newReqServiceType, setNewReqServiceType] = useState("Emergency Heating & Fuel Voucher");
  const [newReqUrgency, setNewReqUrgency] = useState("HIGH");
  const [newReqHouseholdSize, setNewReqHouseholdSize] = useState<number | string>(1);
  const [newReqNotes, setNewReqNotes] = useState("");
  const [submittingNewReq, setSubmittingNewReq] = useState(false);

  async function loadBeneficiariesData() {
    setBeneficiariesLoading(true);
    try {
      const data = await api.getAllBeneficiariesAdmin();
      setBeneficiariesList(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load beneficiaries successfully.");
    } finally {
      setBeneficiariesLoading(false);
    }
  }

  async function handleCreateBeneficiary(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Guard: Prevent any submission unless user is explicitly on Step 4
    if (addBenStep !== 4) {
      setAddBenStep(4);
      return;
    }

    // Mandatory advocate validation: Admin MUST select an advocate on Step 4
    const chosenAdvocate = (addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate).trim();
    if (!chosenAdvocate) {
      setErrorMsg("Please select an assigned advocate / caseworker on Step 4 before submitting.");
      return;
    }

    if (addBenType === "INDIVIDUAL") {
      const computedFullName = (newBenFullName.trim() || `${newBenFirstName.trim()} ${newBenLastName.trim()}`).trim();
      if (!computedFullName) {
        setErrorMsg("Please provide beneficiary first name and last name.");
        return;
      }
      if (!newBenEmail.trim()) {
        setErrorMsg("Valid email address is required for beneficiary casework record.");
        return;
      }

      setSubmittingAddBeneficiary(true);
      try {
        await api.createBeneficiaryAdmin({
          beneficiaryType: "INDIVIDUAL",
          firstName: newBenFirstName.trim(),
          lastName: newBenLastName.trim(),
          fullName: computedFullName,
          dob: newBenDob || undefined,
          gender: newBenGender || undefined,
          preferredLanguage: newBenPreferredLanguage || "English",
          email: newBenEmail.trim().toLowerCase(),
          phoneNumber: newBenPhone.trim() || undefined,
          address: newBenAddress.trim() || undefined,
          townCity: newBenTownCity.trim() || "Leicester",
          postcode: newBenPostcode.trim() || undefined,
          country: newBenCountry.trim() || "United Kingdom",
          emergencyContact: newBenEmergencyContact.trim() || undefined,
          householdSize: Number(newBenHouseholdSize) || 1,
          supportCategory: newBenSupportCategory,
          initialService: newBenSupportCategory,
          initialUrgency: newBenInitialUrgency,
          reasonForSupport: newBenReasonForSupport.trim() || undefined,
          assistanceDescription: newBenAssistanceDescription.trim() || undefined,
          supportingDocsNote: newBenSupportingDocsNote.trim() || undefined,
          initialNotes: newBenInitialNotes.trim() || undefined,
          assignedAdvocate: newBenAssignedAdvocate,
          createPortalAccount: newBenCreatePortalAccount,
          active: newBenActiveStatus,
          password: newBenPassword.trim() || "Beneficiary@123",
          uploadedDocuments: newBenUploadedFiles,
        });

        setActionSuccessMsg(`Beneficiary profile for "${computedFullName}" created successfully with login credentials (${newBenEmail.trim()}). They can now directly sign in to the Beneficiary Portal!`);
        setShowAddBeneficiaryModal(false);
        resetAddBeneficiaryForm();

        await loadBeneficiariesData();
        await loadDashboardData();
        setTimeout(() => setActionSuccessMsg(""), 4500);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to register beneficiary.");
      } finally {
        setSubmittingAddBeneficiary(false);
      }
    } else {
      // Organisation
      if (!newOrgName.trim()) {
        setErrorMsg("Organisation name is required.");
        return;
      }
      if (!newOrgContactPerson.trim()) {
        setErrorMsg("Primary contact person name is required.");
        return;
      }
      if (!newOrgContactEmail.trim()) {
        setErrorMsg("Organisation contact email address is required.");
        return;
      }

      setSubmittingAddBeneficiary(true);
      try {
        await api.createBeneficiaryAdmin({
          beneficiaryType: "ORGANISATION",
          organisationName: newOrgName.trim(),
          organisationType: newOrgType,
          registrationNumber: newOrgRegNumber.trim() || undefined,
          orgDescription: newOrgDescription.trim() || undefined,
          contactPersonName: newOrgContactPerson.trim(),
          contactRole: newOrgContactRole.trim(),
          contactEmail: newOrgContactEmail.trim().toLowerCase(),
          contactPhone: newOrgContactPhone.trim() || undefined,
          beneficiaryReach: Number(newOrgBeneficiaryReach) || 50,
          fullName: newOrgName.trim(),
          email: newOrgContactEmail.trim().toLowerCase(),
          phoneNumber: newOrgContactPhone.trim() || undefined,
          address: newOrgAddress.trim() || undefined,
          townCity: newOrgTownCity.trim() || "Leicester",
          postcode: newOrgPostcode.trim() || undefined,
          country: newOrgCountry.trim() || "United Kingdom",
          emergencyContact: `Contact: ${newOrgContactPerson.trim()} (${newOrgContactRole.trim()}) - ${newOrgContactPhone.trim()}`,
          householdSize: Number(newOrgBeneficiaryReach) || 50,
          supportCategory: newOrgSupportCategory,
          initialService: newOrgSupportCategory,
          initialUrgency: newOrgUrgency,
          reasonForSupport: newOrgReasonForSupport.trim() || undefined,
          assistanceDescription: newOrgAssistanceDescription.trim() || undefined,
          supportingDocsNote: newOrgSupportingDocsNote.trim() || undefined,
          initialNotes: newOrgInternalNotes.trim() || undefined,
          assignedAdvocate: newOrgAssignedAdvocate,
          createPortalAccount: newOrgCreatePortalAccount,
          active: newOrgActiveStatus,
          password: newOrgPassword.trim() || "Beneficiary@123",
          uploadedDocuments: newOrgUploadedFiles,
        });

        setActionSuccessMsg(`Partner organisation profile for "${newOrgName.trim()}" registered successfully with login credentials (${newOrgContactEmail.trim()}). They can now directly sign in to the Beneficiary Portal!`);
        setShowAddBeneficiaryModal(false);
        resetAddBeneficiaryForm();

        await loadBeneficiariesData();
        await loadDashboardData();
        setTimeout(() => setActionSuccessMsg(""), 4500);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to register organisation.");
      } finally {
        setSubmittingAddBeneficiary(false);
      }
    }
  }

  function openEditBeneficiary(b: BeneficiaryRecord) {
    setEditingBeneficiary(b);
    setEditBenFullName(b.fullName);
    setEditBenEmail(b.email);
    setEditBenPhone(b.phoneNumber || "");
    setEditBenAddress(b.address || "");
    setEditBenTownCity(b.townCity || "Leicester");
    setEditBenPostcode(b.postcode || "");
    setEditBenEmergencyContact(b.emergencyContact || "");
    setEditBenAssignedAdvocate(b.assignedAdvocate || "Sarah Davies (Senior Crisis Caseworker)");
    setEditBenActive(b.active);
  }

  async function handleUpdateBeneficiary(e: React.FormEvent) {
    e.preventDefault();
    if (!editingBeneficiary) return;

    setSubmittingEditBeneficiary(true);
    setErrorMsg("");
    try {
      await api.updateBeneficiaryAdmin(editingBeneficiary.id, {
        fullName: editBenFullName.trim(),
        email: editBenEmail.trim(),
        phoneNumber: editBenPhone.trim() || null,
        address: editBenAddress.trim() || null,
        townCity: editBenTownCity.trim() || "Leicester",
        postcode: editBenPostcode.trim() || null,
        emergencyContact: editBenEmergencyContact.trim() || null,
        assignedAdvocate: editBenAssignedAdvocate,
        active: editBenActive,
      });

      setActionSuccessMsg(`Beneficiary profile for "${editBenFullName}" updated successfully!`);
      setEditingBeneficiary(null);

      await loadBeneficiariesData();
      await loadDashboardData();
      if (viewingBeneficiary && viewingBeneficiary.id === editingBeneficiary.id) {
        const updated = await api.getBeneficiaryByIdAdmin(editingBeneficiary.id);
        setViewingBeneficiary(updated);
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update beneficiary details.");
    } finally {
      setSubmittingEditBeneficiary(false);
    }
  }

  async function handleToggleBeneficiaryActive(beneficiary: BeneficiaryRecord, newActiveState: boolean) {
    try {
      await api.toggleBeneficiaryActiveAdmin(beneficiary.id, newActiveState);
      setActionSuccessMsg(`Beneficiary "${beneficiary.fullName}" is now ${newActiveState ? "ACTIVE" : "DEACTIVATED"} successfully.`);
      await loadBeneficiariesData();
      await loadDashboardData();
      if (viewingBeneficiary && viewingBeneficiary.id === beneficiary.id) {
        setViewingBeneficiary({ ...viewingBeneficiary, active: newActiveState });
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update account active status.");
    }
  }

  async function handleAssignAdvocateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!assigningAdvocateBeneficiary) return;

    setSubmittingAssignAdvocate(true);
    try {
      await api.assignBeneficiaryAdvocateAdmin(assigningAdvocateBeneficiary.id, selectedAdvocateValue);
      setActionSuccessMsg(`Advocate ${selectedAdvocateValue} assigned to ${assigningAdvocateBeneficiary.fullName}!`);
      setAssigningAdvocateBeneficiary(null);
      await loadBeneficiariesData();
      await loadDashboardData();
      if (viewingBeneficiary && viewingBeneficiary.id === assigningAdvocateBeneficiary.id) {
        setViewingBeneficiary({ ...viewingBeneficiary, assignedAdvocate: selectedAdvocateValue });
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to assign advocate.");
    } finally {
      setSubmittingAssignAdvocate(false);
    }
  }

  async function handleReviewRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewingRequestItem) return;

    setSubmittingReview(true);
    try {
      await api.updateBeneficiaryRequestStatus(
        reviewingRequestItem.request.id,
        reviewStatusValue,
        reviewNotesValue.trim() || undefined
      );

      setActionSuccessMsg(`Application for ${reviewingRequestItem.beneficiary.fullName} (${reviewingRequestItem.request.serviceType}) updated to ${reviewStatusValue} successfully!`);
      setReviewingRequestItem(null);
      setReviewNotesValue("");

      await loadBeneficiariesData();
      await loadDashboardData();
      if (viewingBeneficiary && viewingBeneficiary.id === reviewingRequestItem.beneficiary.id) {
        const updated = await api.getBeneficiaryByIdAdmin(viewingBeneficiary.id);
        setViewingBeneficiary(updated);
      }
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update application review status.");
    } finally {
      setSubmittingReview(false);
    }
  }

  async function handleAddDocumentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!addingDocBeneficiary || !docNameValue.trim()) return;

    setSubmittingDoc(true);
    try {
      const updated = await api.addBeneficiaryDocumentAdmin(addingDocBeneficiary.id, {
        name: docNameValue.trim(),
        type: docTypeValue,
        status: docStatusValue,
      });

      setActionSuccessMsg(`Document "${docNameValue}" recorded for ${addingDocBeneficiary.fullName}!`);
      setAddingDocBeneficiary(null);
      setDocNameValue("");

      await loadBeneficiariesData();
      if (viewingBeneficiary && viewingBeneficiary.id === addingDocBeneficiary.id) {
        setViewingBeneficiary(updated);
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to add document record.");
    } finally {
      setSubmittingDoc(false);
    }
  }

  async function handleDeleteDocument(beneficiaryId: string, docId: string) {
    try {
      const updated = await api.deleteBeneficiaryDocumentAdmin(beneficiaryId, docId);
      setActionSuccessMsg("Document removed from case file.");
      await loadBeneficiariesData();
      if (viewingBeneficiary && viewingBeneficiary.id === beneficiaryId) {
        setViewingBeneficiary(updated);
      }
      setTimeout(() => setActionSuccessMsg(""), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to remove document.");
    }
  }



  async function handleCreateRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!creatingReqBeneficiary) return;

    setSubmittingNewReq(true);
    try {
      await api.createBeneficiaryRequestAdmin(creatingReqBeneficiary.id, {
        serviceType: newReqServiceType,
        urgency: newReqUrgency,
        status: "PENDING",
        householdSize: Number(newReqHouseholdSize) || 1,
        notes: newReqNotes.trim() || undefined,
      });

      setActionSuccessMsg(`New assistance request for "${newReqServiceType}" created for ${creatingReqBeneficiary.fullName}!`);
      setCreatingReqBeneficiary(null);
      setNewReqNotes("");

      await loadBeneficiariesData();
      await loadDashboardData();
      if (viewingBeneficiary && viewingBeneficiary.id === creatingReqBeneficiary.id) {
        const updated = await api.getBeneficiaryByIdAdmin(viewingBeneficiary.id);
        setViewingBeneficiary(updated);
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create support request.");
    } finally {
      setSubmittingNewReq(false);
    }
  }

  async function handleDeleteBeneficiarySubmit(beneficiary: BeneficiaryRecord) {
    setSubmittingDeleteBeneficiary(true);
    try {
      await api.deleteBeneficiaryAdmin(beneficiary.id);
      setActionSuccessMsg(`Beneficiary profile for "${beneficiary.fullName}" deleted successfully.`);
      setDeletingBeneficiary(null);
      if (viewingBeneficiary && viewingBeneficiary.id === beneficiary.id) {
        setViewingBeneficiary(null);
      }
      if (editingBeneficiary && editingBeneficiary.id === beneficiary.id) {
        setEditingBeneficiary(null);
      }
      await loadBeneficiariesData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete beneficiary.");
    } finally {
      setSubmittingDeleteBeneficiary(false);
    }
  }

  function handleExportBeneficiariesCsv() {
    if (filteredBeneficiaries.length === 0) {
      setErrorMsg("No beneficiaries match the current filters.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Address",
      "City",
      "Postcode",
      "Emergency Contact",
      "Account Status",
      "Assigned Advocate",
      "Active Requests Count",
      "Latest Service Requested",
      "Latest Request Urgency",
      "Latest Request Status",
      "Documents Stored",
      "Comms Logged",
      "Registered Date"
    ];

    const rows = filteredBeneficiaries.map((b) => {
      const latestReq = b.beneficiaryRequests?.[0];
      return [
        `"${b.id}"`,
        `"${b.fullName.replace(/"/g, '""')}"`,
        `"${b.email.replace(/"/g, '""')}"`,
        `"${(b.phoneNumber || "").replace(/"/g, '""')}"`,
        `"${(b.address || "").replace(/"/g, '""')}"`,
        `"${(b.townCity || "").replace(/"/g, '""')}"`,
        `"${(b.postcode || "").replace(/"/g, '""')}"`,
        `"${(b.emergencyContact || "").replace(/"/g, '""')}"`,
        `"${b.active ? "Active" : "Inactive"}"`,
        `"${(b.assignedAdvocate || "Unassigned").replace(/"/g, '""')}"`,
        `"${b.beneficiaryRequests?.length || 0}"`,
        `"${(latestReq?.serviceType || "None").replace(/"/g, '""')}"`,
        `"${latestReq?.urgency || "N/A"}"`,
        `"${latestReq?.status || "N/A"}"`,
        `"${b.documents?.length || 0}"`,
        `"${b.communicationLogs?.length || 0}"`,
        `"${new Date(b.createdAt).toLocaleDateString("en-GB")}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zinthiya-beneficiaries-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Beneficiary Filters
  const filteredBeneficiaries = beneficiariesList.filter((b) => {
    if (beneficiarySearchQuery.trim()) {
      const q = beneficiarySearchQuery.toLowerCase();
      const nameMatch = b.fullName.toLowerCase().includes(q);
      const emailMatch = b.email.toLowerCase().includes(q);
      const phoneMatch = (b.phoneNumber || "").toLowerCase().includes(q);
      const cityMatch = (b.townCity || "").toLowerCase().includes(q);
      const postMatch = (b.postcode || "").toLowerCase().includes(q);
      const advocateMatch = (b.assignedAdvocate || "").toLowerCase().includes(q);
      const serviceMatch = b.beneficiaryRequests?.some((r) => r.serviceType.toLowerCase().includes(q));
      if (!nameMatch && !emailMatch && !phoneMatch && !cityMatch && !postMatch && !advocateMatch && !serviceMatch) {
        return false;
      }
    }

    if (beneficiaryAccountStatusFilter === "ACTIVE" && !b.active) return false;
    if (beneficiaryAccountStatusFilter === "INACTIVE" && b.active) return false;

    if (beneficiaryRequestStatusFilter !== "ALL") {
      const hasStatus = b.beneficiaryRequests?.some((r) => r.status === beneficiaryRequestStatusFilter);
      if (!hasStatus) return false;
    }

    if (beneficiaryUrgencyFilter !== "ALL") {
      const hasUrgency = b.beneficiaryRequests?.some((r) => r.urgency === beneficiaryUrgencyFilter);
      if (!hasUrgency) return false;
    }

    if (beneficiaryAdvocateFilter !== "ALL") {
      if (beneficiaryAdvocateFilter === "UNASSIGNED") {
        if (b.assignedAdvocate) return false;
      } else {
        if (!b.assignedAdvocate || !b.assignedAdvocate.includes(beneficiaryAdvocateFilter)) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (beneficiarySortBy === "NEWEST") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (beneficiarySortBy === "OLDEST") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (beneficiarySortBy === "NAME_ASC") {
      return a.fullName.localeCompare(b.fullName);
    }
    if (beneficiarySortBy === "NAME_DESC") {
      return b.fullName.localeCompare(a.fullName);
    }
    if (beneficiarySortBy === "URGENCY_DESC") {
      const urgencyRank: Record<string, number> = { EMERGENCY: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      const aRank = a.beneficiaryRequests?.[0] ? urgencyRank[a.beneficiaryRequests[0].urgency] || 0 : 0;
      const bRank = b.beneficiaryRequests?.[0] ? urgencyRank[b.beneficiaryRequests[0].urgency] || 0 : 0;
      return bRank - aRank;
    }
    return 0;
  });

  const totalBeneficiariesKpi = beneficiariesList.length;
  const pendingRequestsKpi = beneficiariesList.reduce((acc, b) => {
    return acc + (b.beneficiaryRequests?.filter((r) => r.status === "PENDING").length || 0);
  }, 0);
  const inProgressRequestsKpi = beneficiariesList.reduce((acc, b) => {
    return acc + (b.beneficiaryRequests?.filter((r) => r.status === "IN_PROGRESS").length || 0);
  }, 0);
  const approvedRequestsKpi = beneficiariesList.reduce((acc, b) => {
    return acc + (b.beneficiaryRequests?.filter((r) => r.status === "APPROVED").length || 0);
  }, 0);

  // =========================================================================
  // FUND ALLOCATION & ASSISTANCE DISBURSEMENT STATE & HANDLERS
  // =========================================================================
  const [allocationsList, setAllocationsList] = useState<AssistanceAllocationRecord[]>([]);
  const [allocationsLoading, setAllocationsLoading] = useState<boolean>(false);
  const [allocationsFinancialSummary, setAllocationsFinancialSummary] = useState<{
    totalDonationsReceived: number;
    totalAllocated: number;
    totalDistributed: number;
    pendingDistribution: number;
    netAvailableReserves: number;
    totalFundingRequired?: number;
  }>({
    totalDonationsReceived: 0,
    totalAllocated: 0,
    totalDistributed: 0,
    pendingDistribution: 0,
    netAvailableReserves: 0,
    totalFundingRequired: 0,
  });

  // Support Categories State (Dynamic - Not Hardcoded)
  const [supportCategoriesList, setSupportCategoriesList] = useState<SupportCategoryRecord[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [allocationsSubTab, setAllocationsSubTab] = useState<"ledger" | "categories">("ledger");
  const [categorySearch, setCategorySearch] = useState<string>("");

  // Support Category Modals & Forms
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<SupportCategoryRecord | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<SupportCategoryRecord | null>(null);
  const [categoryFormName, setCategoryFormName] = useState<string>("");
  const [categoryFormDescription, setCategoryFormDescription] = useState<string>("");
  const [categoryFormTarget, setCategoryFormTarget] = useState<number | string>(10000);
  const [submittingCategory, setSubmittingCategory] = useState<boolean>(false);

  // Filter & Search
  const [allocationSearch, setAllocationSearch] = useState<string>("");
  const [allocationStatusFilter, setAllocationStatusFilter] = useState<string>("ALL"); // ALL, ALLOCATED, DISTRIBUTED, CANCELLED
  const [allocationTypeFilter, setAllocationTypeFilter] = useState<string>("ALL");
  const [allocationFundFilter, setAllocationFundFilter] = useState<string>("ALL");
  const [allocationMethodFilter, setAllocationMethodFilter] = useState<string>("ALL");
  const [allocationSortBy, setAllocationSortBy] = useState<string>("DATE_DESC");

  // Modals
  const [showCreateAllocationModal, setShowCreateAllocationModal] = useState<boolean>(false);
  const [recordingDistributionItem, setRecordingDistributionItem] = useState<AssistanceAllocationRecord | null>(null);
  const [viewingVoucherAllocation, setViewingVoucherAllocation] = useState<AssistanceAllocationRecord | null>(null);
  const [editingAllocation, setEditingAllocation] = useState<AssistanceAllocationRecord | null>(null);
  const [cancellingAllocation, setCancellingAllocation] = useState<AssistanceAllocationRecord | null>(null);
  const [deletingAllocation, setDeletingAllocation] = useState<AssistanceAllocationRecord | null>(null);

  // Form State: Create Allocation
  const [allocBeneficiaryMode, setAllocBeneficiaryMode] = useState<"EXISTING" | "CUSTOM">("EXISTING");
  const [allocSelectedBeneficiaryId, setAllocSelectedBeneficiaryId] = useState<string>("");
  const [allocCustomName, setAllocCustomName] = useState<string>("");
  const [allocCustomEmail, setAllocCustomEmail] = useState<string>("");
  const [allocCustomPhone, setAllocCustomPhone] = useState<string>("");
  const [allocCategoryId, setAllocCategoryId] = useState<string>("");
  const [allocAssistanceType, setAllocAssistanceType] = useState<string>("Medical Assistance");
  const [allocAmount, setAllocAmount] = useState<number | string>(100);
  const [allocFundSource, setAllocFundSource] = useState<string>("General Relief Fund");
  const [allocCampaignId, setAllocCampaignId] = useState<string>("");
  const [allocDescription, setAllocDescription] = useState<string>("");
  const [allocImmediateDisburse, setAllocImmediateDisburse] = useState<boolean>(false);
  const [allocPaymentMethod, setAllocPaymentMethod] = useState<string>("Prepayment Voucher");
  const [allocDisbursedBy, setAllocDisbursedBy] = useState<string>("Sarah Davies (Senior Crisis Caseworker)");
  const [allocReceiptRef, setAllocReceiptRef] = useState<string>("");
  const [allocDisbursementNotes, setAllocDisbursementNotes] = useState<string>("");
  const [submittingCreateAllocation, setSubmittingCreateAllocation] = useState<boolean>(false);

  // Form State: Record Distribution
  const [distributeAmount, setDistributeAmount] = useState<number | string>(0);
  const [distributeDate, setDistributeDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [distributePaymentMethod, setDistributePaymentMethod] = useState<string>("Prepayment Voucher");
  const [distributeDisbursedBy, setDistributeDisbursedBy] = useState<string>("Sarah Davies (Senior Crisis Caseworker)");
  const [distributeReceiptRef, setDistributeReceiptRef] = useState<string>("");
  const [distributeNotes, setDistributeNotes] = useState<string>("");
  const [submittingDistribution, setSubmittingDistribution] = useState<boolean>(false);

  // Form State: Edit Allocation
  const [editAllocName, setEditAllocName] = useState<string>("");
  const [editAllocType, setEditAllocType] = useState<string>("FOOD");
  const [editAllocAmount, setEditAllocAmount] = useState<number | string>(0);
  const [editAllocFundSource, setEditAllocFundSource] = useState<string>("General Relief Fund");
  const [editAllocDescription, setEditAllocDescription] = useState<string>("");
  const [submittingEditAllocation, setSubmittingEditAllocation] = useState<boolean>(false);


  // =========================================================================
  // STAFF & ADMIN ACTIVITY MANAGEMENT STATE
  // =========================================================================
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [staffStats, setStaffStats] = useState<StaffStats | null>(null);
  const [staffLoading, setStaffLoading] = useState<boolean>(false);
  const [staffSearch, setStaffSearch] = useState<string>("");
  const [staffRoleFilter, setStaffRoleFilter] = useState<string>("ALL");
  const [staffDeptFilter, setStaffDeptFilter] = useState<string>("ALL");
  const [staffSubTab, setStaffSubTab] = useState<"staff_directory" | "roles_permissions" | "audit_history">("staff_directory");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [auditTotalCount, setAuditTotalCount] = useState<number>(0);
  const [auditRecentToday, setAuditRecentToday] = useState<number>(0);
  const [auditLoading, setAuditLoading] = useState<boolean>(false);
  const [auditSearch, setAuditSearch] = useState<string>("");
  const [auditActionFilter, setAuditActionFilter] = useState<string>("ALL");
  const [auditEntityFilter, setAuditEntityFilter] = useState<string>("ALL");
  const [auditActorFilter, setAuditActorFilter] = useState<string>("ALL");
  const [auditStartDate, setAuditStartDate] = useState<string>("");
  const [auditEndDate, setAuditEndDate] = useState<string>("");
  const [viewingAuditDiff, setViewingAuditDiff] = useState<AuditLogRecord | null>(null);

  // Roles & Governance Notice
  const [rolesPermissionsData, setRolesPermissionsData] = useState<RolesPermissionsResponse | null>(null);

  // Modals
  const [showAddStaffModal, setShowAddStaffModal] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<StaffMember | null>(null);

  // Form State for Add Staff
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffPhone, setNewStaffPhone] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("CASEWORKER");
  const [newStaffDept, setNewStaffDept] = useState("Crisis & Domestic Abuse Support");
  const [newStaffJobTitle, setNewStaffJobTitle] = useState("Casework Advocate");
  const [newStaffPassword, setNewStaffPassword] = useState("StaffZinthiya2026!");
  const [newStaffPermissions, setNewStaffPermissions] = useState<string[]>([
    "beneficiaries:read",
    "beneficiaries:write",
    "allocations:read",
    "reports:view"
  ]);
  const [submittingAddStaff, setSubmittingAddStaff] = useState(false);
  const [showAddStaffPassword, setShowAddStaffPassword] = useState(false);

  // Form State for Edit Staff
  const [editStaffName, setEditStaffName] = useState("");
  const [editStaffPhone, setEditStaffPhone] = useState("");
  const [editStaffRole, setEditStaffRole] = useState("CASEWORKER");
  const [editStaffDept, setEditStaffDept] = useState("");
  const [editStaffJobTitle, setEditStaffJobTitle] = useState("");
  const [editStaffActive, setEditStaffActive] = useState(true);
  const [editStaffPermissions, setEditStaffPermissions] = useState<string[]>([]);
  const [submittingEditStaff, setSubmittingEditStaff] = useState(false);

  async function loadStaffData() {
    setStaffLoading(true);
    try {
      const data = await api.getAllStaffAdmin();
      setStaffList(data.staff || []);
      setStaffStats(data.stats || null);
    } catch (err: any) {
      console.error("Failed to load staff list:", err);
    } finally {
      setStaffLoading(false);
    }
  }

  // Dynamic Advocates / Caseworkers derived from active staff in Staff Management
  const activeAdvocatesList = useMemo(() => {
    const activeStaff = (staffList || []).filter((s) => s.active !== false);
    if (activeStaff.length === 0) {
      return [
        { id: "default-1", fullName: "Sarah Davies", jobTitle: "Senior Crisis Caseworker", department: "Crisis & Domestic Abuse Support", display: "Sarah Davies (Senior Crisis Caseworker)" },
        { id: "default-2", fullName: "Zinthiya Ganeshpanchan", jobTitle: "Lead Advocate", department: "Executive & Governance", display: "Zinthiya Ganeshpanchan (Lead Advocate)" },
        { id: "default-3", fullName: "Priya Patel", jobTitle: "Energy Advice Specialist", department: "Energy & Utility Relief", display: "Priya Patel (Energy Advice Specialist)" },
      ];
    }
    // Sort caseworkers and advocates first, then alphabetical
    const sorted = [...activeStaff].sort((a, b) => {
      const isAdvA = a.staffRole === "CASEWORKER" || a.staffRole === "ADVOCATE" || (a.jobTitle && /advocate|caseworker|specialist/i.test(a.jobTitle));
      const isAdvB = b.staffRole === "CASEWORKER" || b.staffRole === "ADVOCATE" || (b.jobTitle && /advocate|caseworker|specialist/i.test(b.jobTitle));
      if (isAdvA && !isAdvB) return -1;
      if (!isAdvA && isAdvB) return 1;
      return a.fullName.localeCompare(b.fullName);
    });
    return sorted.map((s) => ({
      id: s.id,
      fullName: s.fullName,
      jobTitle: s.jobTitle || s.staffRole || "Casework Advocate",
      department: s.department || "General Relief",
      display: `${s.fullName} (${s.jobTitle || s.staffRole || "Casework Advocate"})`,
    }));
  }, [staffList]);

  async function loadAuditLogsData() {
    setAuditLoading(true);
    try {
      const data = await api.getAuditLogsAdmin({
        search: auditSearch || undefined,
        action: auditActionFilter !== "ALL" ? auditActionFilter : undefined,
        entityType: auditEntityFilter !== "ALL" ? auditEntityFilter : undefined,
        actorId: auditActorFilter !== "ALL" ? auditActorFilter : undefined,
        startDate: auditStartDate || undefined,
        endDate: auditEndDate || undefined,
        limit: 100,
      });
      setAuditLogs(data.logs || []);
      setAuditTotalCount(data.totalCount || 0);
      setAuditRecentToday(data.recentTodayCount || 0);
    } catch (err: any) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setAuditLoading(false);
    }
  }

  async function loadRolesPermissionsData() {
    try {
      const data = await api.getRolesPermissionsAdmin();
      setRolesPermissionsData(data);
    } catch (err: any) {
      console.error("Failed to load roles and permissions:", err);
    }
  }

  async function handleCreateStaffSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim()) {
      setErrorMsg("Staff Name and Email are required.");
      return;
    }
    setSubmittingAddStaff(true);
    try {
      await api.createStaffAdmin({
        fullName: newStaffName.trim(),
        email: newStaffEmail.trim().toLowerCase(),
        phoneNumber: newStaffPhone.trim() || null,
        staffRole: newStaffRole,
        department: newStaffDept.trim(),
        jobTitle: newStaffJobTitle.trim(),
        password: newStaffPassword,
        permissions: newStaffPermissions,
      });
      setActionSuccessMsg(`Staff account for ${newStaffName} created successfully!`);
      setShowAddStaffModal(false);
      setNewStaffName("");
      setNewStaffEmail("");
      setNewStaffPhone("");
      await loadStaffData();
      await loadAuditLogsData();
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create staff account.");
    } finally {
      setSubmittingAddStaff(false);
    }
  }

  async function handleEditStaffSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingStaff) return;
    setSubmittingEditStaff(true);
    try {
      await api.updateStaffAdmin(editingStaff.id, {
        fullName: editStaffName.trim(),
        phoneNumber: editStaffPhone.trim() || null,
        staffRole: editStaffRole,
        department: editStaffDept.trim(),
        jobTitle: editStaffJobTitle.trim(),
        active: editStaffActive,
        permissions: editStaffPermissions,
      });
      setActionSuccessMsg(`Staff account for ${editStaffName} updated successfully!`);
      setEditingStaff(null);
      await loadStaffData();
      await loadAuditLogsData();
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update staff account.");
    } finally {
      setSubmittingEditStaff(false);
    }
  }

  async function handleToggleStaffActive(staff: StaffMember) {
    try {
      await api.toggleStaffStatusAdmin(staff.id, !staff.active);
      setActionSuccessMsg(`Staff account for ${staff.fullName} ${!staff.active ? "activated" : "deactivated"}.`);
      await loadStaffData();
      await loadAuditLogsData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to toggle staff status.");
    }
  }

  async function handleDeleteStaffConfirm() {
    if (!deletingStaff) return;
    try {
      await api.deleteStaffAdmin(deletingStaff.id);
      setActionSuccessMsg(`Staff member ${deletingStaff.fullName} removed.`);
      setDeletingStaff(null);
      await loadStaffData();
      await loadAuditLogsData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete staff member.");
    }
  }

  function exportAuditLogsCsv() {
    if (!auditLogs || auditLogs.length === 0) return;
    const header = "Timestamp,Action,Entity Type,Entity Reference,Actor Name,Actor Email,Actor Role,Details,IP Address\n";
    const rows = auditLogs.map(l =>
      `"${new Date(l.createdAt).toLocaleString("en-GB")}",${l.action},"${l.entityType}","${l.entityTitle || ''}","${l.actorName}","${l.actorEmail}",${l.actorRole},"${(l.details || '').replace(/"/g, '""')}",${l.ipAddress || '127.0.0.1'}`
    ).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `zinthiya-audit-trail-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // =========================================================================
  // REPORTS & ANALYTICS STATE & LOADERS
  // =========================================================================
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [reportsLoading, setReportsLoading] = useState<boolean>(false);
  const [reportsPeriod, setReportsPeriod] = useState<string>("all");
  const [reportsStartDate, setReportsStartDate] = useState<string>("");
  const [reportsEndDate, setReportsEndDate] = useState<string>("");
  const [reportsCampaignId, setReportsCampaignId] = useState<string>("all");
  const [reportsDonationType, setReportsDonationType] = useState<string>("all");
  const [reportsActiveSubTab, setReportsActiveSubTab] = useState<
    "overview" | "timeline" | "campaigns" | "donors" | "one_off_recurring" | "beneficiaries" | "allocations"
  >("overview");
  const [showAuditReportModal, setShowAuditReportModal] = useState<boolean>(false);
  const [showCsvDropdown, setShowCsvDropdown] = useState<boolean>(false);

  async function loadReportsData() {
    setReportsLoading(true);
    try {
      const res = await api.getReportsAdmin({
        period: reportsPeriod,
        startDate: reportsStartDate || undefined,
        endDate: reportsEndDate || undefined,
        campaignId: reportsCampaignId !== "all" ? reportsCampaignId : undefined,
        donationType: reportsDonationType !== "all" ? reportsDonationType : undefined,
      });
      setReportsData(res);
    } catch (err: any) {
      console.error("Failed to load reports data:", err);
      setErrorMsg(err.message || "Failed to load reports and analytics .");
    } finally {
      setReportsLoading(false);
    }
  }

  function exportReportsCsv(type: "summary" | "timeline" | "campaigns" | "top_donors" | "beneficiaries" | "allocations") {
    if (!reportsData) return;
    let csvContent = "";
    let filename = `zinthiya-report-${type}-${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === "summary") {
      csvContent = "Metric,Value\n" +
        `"Total Donations Received","£${reportsData.summary.totalDonationsReceived.toFixed(2)}"\n` +
        `"Total Gifts Recorded","${reportsData.summary.donationsCount}"\n` +
        `"Average Donation Size","£${reportsData.summary.averageDonation.toFixed(2)}"\n` +
        `"Total Registered Donors","${reportsData.summary.totalDonorsCount}"\n` +
        `"Repeat Donors Count","${reportsData.summary.repeatDonorsCount}"\n` +
        `"Total Assistance Allocated","£${reportsData.summary.totalAllocatedAmount.toFixed(2)}"\n` +
        `"Total Assistance Actually Distributed","£${reportsData.summary.totalDistributedAmount.toFixed(2)}"\n` +
        `"Pending Relief Payouts","£${reportsData.summary.totalPendingDistribution.toFixed(2)}"\n` +
        `"Total Beneficiary Requests","${reportsData.summary.totalBeneficiaryRequests}"\n` +
        `"Total Household Members Impacted","${reportsData.summary.totalHouseholdImpact}"\n`;
    } else if (type === "timeline") {
      csvContent = "Period,Date,Total Amount (£),Number of Gifts,One-Off Amount (£),Recurring Amount (£),Average Gift (£)\n" +
        reportsData.timeline.map(t => `"${t.label}","${t.date}",${t.totalAmount.toFixed(2)},${t.count},${t.oneOffAmount.toFixed(2)},${t.recurringAmount.toFixed(2)},${(t.count > 0 ? t.totalAmount / t.count : 0).toFixed(2)}`).join("\n");
    } else if (type === "campaigns") {
      csvContent = "Campaign ID,Campaign Title,Target Goal (£),Raised All Time (£),Period Donations (£),Period Gift Count,Share of Period Total (%),Progress towards Target (%),Status\n" +
        reportsData.campaigns.map(c => `"${c.id}","${c.title}",${c.targetAmount.toFixed(2)},${c.raisedAmountAllTime.toFixed(2)},${c.periodDonations.toFixed(2)},${c.periodDonationsCount},${c.percentOfTotalDonations.toFixed(1)}%,${c.progressPercent.toFixed(1)}%,"${c.active ? 'ACTIVE' : 'INACTIVE'}"`).join("\n");
    } else if (type === "top_donors") {
      csvContent = "Rank,Donor Name,Email,Giving Tier,Total Contributed (£),Donations Count,Average Gift (£),Location,Newsletter Consent\n" +
        reportsData.topDonors.map((d, i) => `${i + 1},"${d.name}","${d.email}","${d.tier}",${d.totalContributed.toFixed(2)},${d.donationsCount},${d.averageGift.toFixed(2)},"${d.location}","${d.newsletterConsent ? 'YES' : 'NO'}"`).join("\n");
    } else if (type === "beneficiaries") {
      csvContent = "Service Category,Total Requests,Approved,In Progress,Pending Triage,Rejected,People Reached,Resolution Rate (%)\n" +
        reportsData.beneficiarySupport.byService.map(s => `"${s.serviceType}",${s.total},${s.approved},${s.inProgress},${s.pending},${s.rejected},${s.peopleReached},${s.resolutionRate.toFixed(1)}%`).join("\n");
    } else if (type === "allocations") {
      csvContent = "Assistance Category,Allocated Amount (£),Distributed Amount (£),Pending Payout (£),Recipients Count,Completion Rate (%)\n" +
        reportsData.fundDistribution.byType.map(a => `"${a.type}",${a.allocated.toFixed(2)},${a.distributed.toFixed(2)},${a.pending.toFixed(2)},${a.count},${a.percentDistributed.toFixed(1)}%`).join("\n");
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCsvDropdown(false);
  }


  async function loadAllocationsData(retries = 1) {
    setAllocationsLoading(true);
    try {
      const data = await api.getAllAllocationsAdmin();
      setAllocationsList(data.allocations || []);
      if (data.financialSummary) {
        setAllocationsFinancialSummary(data.financialSummary);
      }
      if (data.categories) {
        setSupportCategoriesList(data.categories);
        if (!allocCategoryId && data.categories.length > 0) {
          setAllocCategoryId(data.categories[0].id);
          setAllocAssistanceType(data.categories[0].name);
        }
      }
    } catch (err: any) {
      if (retries > 0) {
        setTimeout(() => loadAllocationsData(retries - 1), 600);
        return;
      }
      setErrorMsg(err.message || "Failed to load allocation records.");
    } finally {
      setAllocationsLoading(false);
    }
  }

  async function loadSupportCategoriesData() {
    setCategoriesLoading(true);
    try {
      const cats = await api.getSupportCategoriesAdmin();
      setSupportCategoriesList(cats || []);
    } catch (err: any) {
      console.error("Failed to load categories", err);
    } finally {
      setCategoriesLoading(false);
    }
  }

  function openCreateCategoryModal() {
    setCategoryFormName("");
    setCategoryFormDescription("");
    setCategoryFormTarget(10000);
    setShowAddCategoryModal(true);
  }

  function openEditCategoryModal(cat: SupportCategoryRecord) {
    setEditingCategory(cat);
    setCategoryFormName(cat.name);
    setCategoryFormDescription(cat.description || "");
    setCategoryFormTarget(cat.targetFundingRequired || 0);
  }

  async function handleCreateCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!categoryFormName.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }
    const target = typeof categoryFormTarget === "string" ? parseFloat(categoryFormTarget) : categoryFormTarget;
    if (isNaN(target) || target < 0) {
      setErrorMsg("Please specify a valid funding target (>= 0).");
      return;
    }
    setSubmittingCategory(true);
    setErrorMsg("");
    try {
      await api.createSupportCategoryAdmin({
        name: categoryFormName.trim(),
        description: categoryFormDescription.trim() || undefined,
        targetFundingRequired: target,
      });
      setActionSuccessMsg(`Support Category "${categoryFormName.trim()}" created with target £${target.toLocaleString("en-GB", { minimumFractionDigits: 2 })}!`);
      setShowAddCategoryModal(false);
      setCategoryFormName("");
      setCategoryFormDescription("");
      setCategoryFormTarget(10000);
      await loadAllocationsData();
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create support category.");
    } finally {
      setSubmittingCategory(false);
    }
  }

  async function handleEditCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCategory) return;
    if (!categoryFormName.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }
    const target = typeof categoryFormTarget === "string" ? parseFloat(categoryFormTarget) : categoryFormTarget;
    if (isNaN(target) || target < 0) {
      setErrorMsg("Please specify a valid funding target (>= 0).");
      return;
    }
    setSubmittingCategory(true);
    setErrorMsg("");
    try {
      await api.updateSupportCategoryAdmin(editingCategory.id, {
        name: categoryFormName.trim(),
        description: categoryFormDescription.trim() || undefined,
        targetFundingRequired: target,
      });
      setActionSuccessMsg(`Category "${categoryFormName.trim()}" updated successfully!`);
      setEditingCategory(null);
      await loadAllocationsData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update support category.");
    } finally {
      setSubmittingCategory(false);
    }
  }

  async function handleDeleteCategorySubmit(cat: SupportCategoryRecord) {
    try {
      await api.deleteSupportCategoryAdmin(cat.id);
      setActionSuccessMsg(`Category "${cat.name}" removed successfully.`);
      setDeletingCategory(null);
      await loadAllocationsData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete support category.");
    }
  }

  async function handleCreateAllocationSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = typeof allocAmount === "string" ? parseFloat(allocAmount) : allocAmount;
    if (!amt || amt <= 0) {
      setErrorMsg("Please enter an allocated amount greater than £0.");
      return;
    }

    let bName = allocCustomName.trim();
    let bEmail = allocCustomEmail.trim();
    let bPhone = allocCustomPhone.trim();
    let userId: string | undefined = undefined;

    if (allocBeneficiaryMode === "EXISTING") {
      const ben = beneficiariesList.find((b) => b.id === allocSelectedBeneficiaryId);
      if (!ben) {
        setErrorMsg("Please select a registered beneficiary.");
        return;
      }
      bName = ben.fullName;
      bEmail = ben.email;
      bPhone = ben.phoneNumber || "";
      userId = ben.id;
    } else {
      if (!bName) {
        setErrorMsg("Beneficiary name is required.");
        return;
      }
    }

    const selectedCat = supportCategoriesList.find((c) => c.id === allocCategoryId) ||
      supportCategoriesList.find((c) => c.name.toLowerCase() === allocAssistanceType.toLowerCase()) ||
      supportCategoriesList[0];
    const categoryNameVal = selectedCat ? selectedCat.name : allocAssistanceType;
    const categoryIdVal = selectedCat ? selectedCat.id : undefined;

    setSubmittingCreateAllocation(true);
    setErrorMsg("");
    try {
      await api.createAllocationAdmin({
        userId,
        beneficiaryName: bName,
        beneficiaryEmail: bEmail || undefined,
        beneficiaryPhone: bPhone || undefined,
        campaignId: allocCampaignId || undefined,
        categoryId: categoryIdVal,
        categoryName: categoryNameVal,
        fundSource: allocFundSource,
        assistanceType: categoryNameVal,
        description: allocDescription.trim() || undefined,
        allocatedAmount: amt,
        distributedAmount: allocImmediateDisburse ? amt : 0,
        status: allocImmediateDisburse ? "DISTRIBUTED" : "ALLOCATED",
        distributionDate: allocImmediateDisburse ? new Date().toISOString() : undefined,
        paymentMethod: allocImmediateDisburse ? allocPaymentMethod : undefined,
        disbursedBy: allocImmediateDisburse ? allocDisbursedBy : undefined,
        disbursementNotes: allocImmediateDisburse ? allocDisbursementNotes.trim() || undefined : undefined,
        receiptReference: allocImmediateDisburse ? allocReceiptRef.trim() || undefined : undefined,
      });

      setActionSuccessMsg(
        allocImmediateDisburse
          ? `Allocated and disbursed £${amt.toFixed(2)} (${categoryNameVal}) to ${bName}!`
          : `Allocated £${amt.toFixed(2)} (${categoryNameVal}) for ${bName} (Pending distribution)!`
      );
      setShowCreateAllocationModal(false);

      // Reset
      setAllocCustomName("");
      setAllocCustomEmail("");
      setAllocCustomPhone("");
      setAllocAmount(100);
      setAllocDescription("");
      setAllocImmediateDisburse(false);
      setAllocReceiptRef("");
      setAllocDisbursementNotes("");
      setAllocImmediateDisburse(false);
      setAllocReceiptRef("");
      setAllocDisbursementNotes("");

      await loadAllocationsData();
    loadReportsData();
    loadStaffData();
    loadAuditLogsData();
    loadRolesPermissionsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create fund allocation .");
    } finally {
      setSubmittingCreateAllocation(false);
    }
  }

  function openRecordDistributionModal(allocation: AssistanceAllocationRecord) {
    setRecordingDistributionItem(allocation);
    setDistributeAmount(Number(allocation.allocatedAmount));
    setDistributeDate(new Date().toISOString().slice(0, 10));
    setDistributePaymentMethod(allocation.paymentMethod || "Prepayment Voucher");
    setDistributeDisbursedBy(allocation.disbursedBy || "Sarah Davies (Senior Crisis Caseworker)");
    setDistributeReceiptRef(allocation.receiptReference || `RCP-${Date.now().toString(36).toUpperCase()}`);
    setDistributeNotes(allocation.disbursementNotes || "");
  }

  async function handleRecordDistributionSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recordingDistributionItem) return;

    const amt = typeof distributeAmount === "string" ? parseFloat(distributeAmount) : distributeAmount;
    if (!amt || amt <= 0) {
      setErrorMsg("Please enter an actual distributed amount greater than £0.");
      return;
    }

    setSubmittingDistribution(true);
    setErrorMsg("");
    try {
      await api.recordDistributionAdmin(recordingDistributionItem.id, {
        distributedAmount: amt,
        distributionDate: distributeDate,
        paymentMethod: distributePaymentMethod,
        disbursedBy: distributeDisbursedBy,
        receiptReference: distributeReceiptRef.trim() || undefined,
        disbursementNotes: distributeNotes.trim() || undefined,
      });

      setActionSuccessMsg(`Assistance of £${amt.toFixed(2)} marked as DISTRIBUTED to ${recordingDistributionItem.beneficiaryName}!`);
      setRecordingDistributionItem(null);

      await loadAllocationsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to record distribution .");
    } finally {
      setSubmittingDistribution(false);
    }
  }

  function openEditAllocationModal(allocation: AssistanceAllocationRecord) {
    setEditingAllocation(allocation);
    setEditAllocName(allocation.beneficiaryName);
    setEditAllocType(allocation.assistanceType);
    setEditAllocAmount(Number(allocation.allocatedAmount));
    setEditAllocFundSource(allocation.fundSource);
    setEditAllocDescription(allocation.description || "");
  }

  async function handleEditAllocationSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAllocation) return;

    const amt = typeof editAllocAmount === "string" ? parseFloat(editAllocAmount) : editAllocAmount;
    if (!amt || amt <= 0) {
      setErrorMsg("Please enter a valid allocated amount greater than £0.");
      return;
    }

    setSubmittingEditAllocation(true);
    setErrorMsg("");
    try {
      await api.updateAllocationAdmin(editingAllocation.id, {
        beneficiaryName: editAllocName.trim(),
        assistanceType: editAllocType,
        allocatedAmount: amt,
        fundSource: editAllocFundSource,
        description: editAllocDescription.trim() || null,
      });

      setActionSuccessMsg(`Allocation record ${editingAllocation.reference} updated successfully!`);
      setEditingAllocation(null);

      await loadAllocationsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update allocation .");
    } finally {
      setSubmittingEditAllocation(false);
    }
  }

  async function handleCancelAllocationSubmit(allocation: AssistanceAllocationRecord) {
    try {
      await api.cancelAllocationAdmin(allocation.id);
      setActionSuccessMsg(`Allocation ${allocation.reference} has been CANCELLED and uncommitted.`);
      setCancellingAllocation(null);
      await loadAllocationsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to cancel allocation.");
    }
  }

  async function handleDeleteAllocationSubmit(allocation: AssistanceAllocationRecord) {
    try {
      await api.deleteAllocationAdmin(allocation.id);
      setActionSuccessMsg(`Allocation record ${allocation.reference} deleted successfully.`);
      setDeletingAllocation(null);
      await loadAllocationsData();
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete allocation .");
    }
  }

  function handleExportAllocationsCsv() {
    if (filteredAllocations.length === 0) {
      setErrorMsg("No allocation records match current filters to export.");
      return;
    }

    const headers = [
      "Reference",
      "Beneficiary Name",
      "Beneficiary Email",
      "Beneficiary Phone",
      "Assistance Category",
      "Fund Source",
      "Allocated Amount (GBP)",
      "Distributed Amount (GBP)",
      "Financial Status",
      "Allocation Date",
      "Distribution Date",
      "Payment Method",
      "Disbursed By",
      "Receipt / Voucher Ref",
      "Disbursement Notes"
    ];

    const rows = filteredAllocations.map((a) => {
      return [
        `"${a.reference}"`,
        `"${a.beneficiaryName.replace(/"/g, '""')}"`,
        `"${(a.beneficiaryEmail || "").replace(/"/g, '""')}"`,
        `"${(a.beneficiaryPhone || "").replace(/"/g, '""')}"`,
        `"${a.assistanceType}"`,
        `"${a.fundSource.replace(/"/g, '""')}"`,
        `"${Number(a.allocatedAmount).toFixed(2)}"`,
        `"${Number(a.distributedAmount).toFixed(2)}"`,
        `"${a.status}"`,
        `"${new Date(a.allocationDate).toLocaleDateString("en-GB")}"`,
        `"${a.distributionDate ? new Date(a.distributionDate).toLocaleDateString("en-GB") : "Pending"}"`,
        `"${(a.paymentMethod || "Pending").replace(/"/g, '""')}"`,
        `"${(a.disbursedBy || "").replace(/"/g, '""')}"`,
        `"${(a.receiptReference || "").replace(/"/g, '""')}"`,
        `"${(a.disbursementNotes || a.description || "").replace(/\n/g, ' ').replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zinthiya-allocations-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filtered Support Categories
  const filteredCategories = supportCategoriesList.filter((cat) => {
    if (!categorySearch.trim()) return true;
    const q = categorySearch.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      (cat.description || "").toLowerCase().includes(q)
    );
  });

  // Filtered Allocations
  const filteredAllocations = allocationsList.filter((a) => {
    if (allocationSearch.trim()) {
      const q = allocationSearch.toLowerCase();
      const refMatch = a.reference.toLowerCase().includes(q);
      const nameMatch = a.beneficiaryName.toLowerCase().includes(q);
      const emailMatch = (a.beneficiaryEmail || "").toLowerCase().includes(q);
      const sourceMatch = a.fundSource.toLowerCase().includes(q);
      const catMatch = (a.categoryName || "").toLowerCase().includes(q);
      const receiptMatch = (a.receiptReference || "").toLowerCase().includes(q);
      if (!refMatch && !nameMatch && !emailMatch && !sourceMatch && !catMatch && !receiptMatch) {
        return false;
      }
    }

    if (allocationStatusFilter !== "ALL" && a.status !== allocationStatusFilter) return false;
    if (
      allocationTypeFilter !== "ALL" &&
      a.assistanceType !== allocationTypeFilter &&
      a.categoryName !== allocationTypeFilter
    ) {
      return false;
    }
    if (allocationFundFilter !== "ALL" && !a.fundSource.includes(allocationFundFilter)) return false;
    if (allocationMethodFilter !== "ALL" && a.paymentMethod !== allocationMethodFilter) return false;

    return true;
  }).sort((a, b) => {
    if (allocationSortBy === "DATE_DESC") {
      return new Date(b.allocationDate).getTime() - new Date(a.allocationDate).getTime();
    }
    if (allocationSortBy === "DATE_ASC") {
      return new Date(a.allocationDate).getTime() - new Date(b.allocationDate).getTime();
    }
    if (allocationSortBy === "ALLOC_HIGH") {
      return Number(b.allocatedAmount) - Number(a.allocatedAmount);
    }
    if (allocationSortBy === "DIST_HIGH") {
      return Number(b.distributedAmount) - Number(a.distributedAmount);
    }
    return 0;
  });



  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Live Database State (Strictly loaded successfully - zero fallback)
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [data, setData] = useState<AdminDashboardPayload | null>(null);
  const [currentUser, setCurrentUser] = useState<DonorUser | null>(null);

  // Status updating state for beneficiary requests
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>("");

  // ==========================================
  // DONOR CRM (DONOR MANAGEMENT) STATE
  // ==========================================
  const [donors, setDonors] = useState<CrmDonor[]>([]);
  const [donorsLoading, setDonorsLoading] = useState<boolean>(false);
  const [campaignsList, setCampaignsList] = useState<CampaignRecord[]>([]);

  // Search & Filter Toolbar State
  const [crmSearch, setCrmSearch] = useState<string>("");
  const [crmTierFilter, setCrmTierFilter] = useState<string>("ALL");
  const [crmConsentFilter, setCrmConsentFilter] = useState<string>("ALL");
  const [crmSortBy, setCrmSortBy] = useState<string>("TOTAL_DESC");

  // Interactive Modal States
  const [viewingDonor, setViewingDonor] = useState<CrmDonor | null>(null);
  const [showAddDonorModal, setShowAddDonorModal] = useState<boolean>(false);
  const [editingDonor, setEditingDonor] = useState<CrmDonor | null>(null);
  const [recordingDonationDonor, setRecordingDonationDonor] = useState<CrmDonor | null>(null);

  // Add Donor Form State (Matches Donor Registration + Admin Email/Password Assignment)
  const [newDonorName, setNewDonorName] = useState("");
  const [newDonorEmail, setNewDonorEmail] = useState("");
  const [newDonorPhone, setNewDonorPhone] = useState("");
  const [newDonorPassword, setNewDonorPassword] = useState("");
  const [newDonorConfirmPassword, setNewDonorConfirmPassword] = useState("");
  const [showNewDonorPassword, setShowNewDonorPassword] = useState(false);
  const [showNewDonorConfirmPassword, setShowNewDonorConfirmPassword] = useState(false);
  const [addDonorError, setAddDonorError] = useState("");
  const [newDonorAddress, setNewDonorAddress] = useState("");
  const [newDonorCity, setNewDonorCity] = useState("Leicester");
  const [newDonorPostcode, setNewDonorPostcode] = useState("");
  const [newDonorTier, setNewDonorTier] = useState<"SUPPORTER" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM">("SUPPORTER");
  const [newDonorNewsletter, setNewDonorNewsletter] = useState(true);
  const [newDonorConsent, setNewDonorConsent] = useState(true);
  const [newDonorSms, setNewDonorSms] = useState(false);
  const [newDonorPostal, setNewDonorPostal] = useState(false);
  const [submittingAddDonor, setSubmittingAddDonor] = useState(false);

  function handleGenerateDonorPassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let gen = "ZT-";
    for (let i = 0; i < 8; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewDonorPassword(gen);
    setNewDonorConfirmPassword(gen);
  }

  // Edit Donor Form State
  const [editDonorName, setEditDonorName] = useState("");
  const [editDonorPhone, setEditDonorPhone] = useState("");
  const [editDonorAddress, setEditDonorAddress] = useState("");
  const [editDonorCity, setEditDonorCity] = useState("");
  const [editDonorPostcode, setEditDonorPostcode] = useState("");
  const [editDonorTier, setEditDonorTier] = useState<"SUPPORTER" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM">("SUPPORTER");
  const [editDonorNewsletter, setEditDonorNewsletter] = useState(true);
  const [editDonorConsent, setEditDonorConsent] = useState(true);
  const [editDonorSms, setEditDonorSms] = useState(false);
  const [editDonorPostal, setEditDonorPostal] = useState(false);
  const [submittingEditDonor, setSubmittingEditDonor] = useState(false);


  // ==========================================
  // PROFILE, SETTINGS & NEWSLETTER STATE
  // ==========================================
  const [adminProfile, setAdminProfile] = useState<any | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [profileSaving, setProfileSaving] = useState<boolean>(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string>("");
  const [profileErrorMsg, setProfileErrorMsg] = useState<string>("");

  const [profileFullName, setProfileFullName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileDepartment, setProfileDepartment] = useState("");
  const [profileJobTitle, setProfileJobTitle] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileTownCity, setProfileTownCity] = useState("");
  const [profilePostcode, setProfilePostcode] = useState("");
  const [profileEmergencyContact, setProfileEmergencyContact] = useState("");

  // Change Password State
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdShowCurrent, setPwdShowCurrent] = useState(false);
  const [pwdShowNew, setPwdShowNew] = useState(false);
  const [pwdShowConfirm, setPwdShowConfirm] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSuccessMsg, setPwdSuccessMsg] = useState("");
  const [pwdErrorMsg, setPwdErrorMsg] = useState("");

  // Settings State
  const [systemSettings, setSystemSettings] = useState<any | null>(null);
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false);
  const [settingsSaving, setSettingsSaving] = useState<boolean>(false);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState<string>("");
  const [settingsErrorMsg, setSettingsErrorMsg] = useState<string>("");

  const [settingCharityName, setSettingCharityName] = useState("The Zinthiya Ganeshpanchan Trust");
  const [settingRegNumber, setSettingRegNumber] = useState("1137350");
  const [settingCompanyNumber, setSettingCompanyNumber] = useState("07258327");
  const [settingOfficialAddress, setSettingOfficialAddress] = useState("12 New Walk, Leicester, LE1 6TF, United Kingdom");
  const [settingContactEmail, setSettingContactEmail] = useState("info@zinthiyatrust.org");
  const [settingContactPhone, setSettingContactPhone] = useState("0116 254 5168");
  const [settingGiftAidRate, setSettingGiftAidRate] = useState<number>(25);

  const [notifyOnDonation, setNotifyOnDonation] = useState(true);
  const [notifyOnBeneficiary, setNotifyOnBeneficiary] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(true);
  const [notifySecurityAlerts, setNotifySecurityAlerts] = useState(true);

  const [secTwoFactor, setSecTwoFactor] = useState(false);
  const [secSessionTimeout, setSecSessionTimeout] = useState<number>(60);
  const [secEnforceStrongPwd, setSecEnforceStrongPwd] = useState(true);
  const [secStrictAudit, setSecStrictAudit] = useState(true);

  // Newsletter State
  const [newsletterData, setNewsletterData] = useState<any | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false);
  const [newsletterSearch, setNewsletterSearch] = useState<string>("");
  const [newsletterChannelFilter, setNewsletterChannelFilter] = useState<string>("ALL");
  const [showComposeNewsletterModal, setShowComposeNewsletterModal] = useState<boolean>(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeAudience, setComposeAudience] = useState("ALL_CONSENTED");
  const [composeChannel, setComposeChannel] = useState("EMAIL");
  const [composeBody, setComposeBody] = useState("");
  const [dispatchingNewsletter, setDispatchingNewsletter] = useState(false);
  const [newsletterSuccessMsg, setNewsletterSuccessMsg] = useState("");

  // Logout Modal State
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState<boolean>(false);

  async function loadProfileData() {
    setProfileLoading(true);
    setProfileErrorMsg("");
    try {
      const p = await api.getAdminProfile();
      setAdminProfile(p);
      setProfileFullName(p.fullName || "");
      setProfilePhone(p.phoneNumber || "");
      setProfileDepartment(p.department || "");
      setProfileJobTitle(p.jobTitle || "");
      setProfileAddress(p.address || "");
      setProfileTownCity(p.townCity || "");
      setProfilePostcode(p.postcode || "");
      setProfileEmergencyContact(p.emergencyContact || "");
    } catch (err: any) {
      setProfileErrorMsg(err.message || "Failed to load admin profile.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccessMsg("");
    setProfileErrorMsg("");
    try {
      const res = await api.updateAdminProfile({
        fullName: profileFullName,
        phoneNumber: profilePhone,
        department: profileDepartment,
        jobTitle: profileJobTitle,
        address: profileAddress,
        townCity: profileTownCity,
        postcode: profilePostcode,
        emergencyContact: profileEmergencyContact,
      });
      setProfileSuccessMsg("Admin profile updated successfully successfully.");
      if (res.user) {
        setAdminProfile(res.user);
        setCurrentUser(res.user);
      }
      setTimeout(() => setProfileSuccessMsg(""), 4000);
    } catch (err: any) {
      setProfileErrorMsg(err.message || "Failed to update admin profile.");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handleChangePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPwdSuccessMsg("");
    setPwdErrorMsg("");

    if (!pwdCurrent) {
      setPwdErrorMsg("Current password is required.");
      return;
    }
    if (!pwdNew || pwdNew.length < 8) {
      setPwdErrorMsg("New password must be at least 8 characters long.");
      return;
    }
    if (pwdNew !== pwdConfirm) {
      setPwdErrorMsg("New password and confirmation do not match.");
      return;
    }

    setPwdSaving(true);
    try {
      await api.changeAdminPassword({
        currentPassword: pwdCurrent,
        newPassword: pwdNew,
        confirmPassword: pwdConfirm,
      });
      setPwdSuccessMsg("Password changed successfully. Your account credentials have been updated.");
      setPwdCurrent("");
      setPwdNew("");
      setPwdConfirm("");
      setTimeout(() => setPwdSuccessMsg(""), 5000);
    } catch (err: any) {
      setPwdErrorMsg(err.message || "Failed to change password. Please verify your current password.");
    } finally {
      setPwdSaving(false);
    }
  }

  async function loadSettingsData() {
    setSettingsLoading(true);
    setSettingsErrorMsg("");
    try {
      const s = await api.getSystemSettings();
      setSystemSettings(s);
      if (s.charity) {
        setSettingCharityName(s.charity.name || "");
        setSettingRegNumber(s.charity.regNumber || "");
        setSettingCompanyNumber(s.charity.companyNumber || "");
        setSettingOfficialAddress(s.charity.officialAddress || "");
        setSettingContactEmail(s.charity.contactEmail || "");
        setSettingContactPhone(s.charity.contactPhone || "");
        setSettingGiftAidRate(s.charity.giftAidRate || 25);
      }
      if (s.notifications) {
        setNotifyOnDonation(s.notifications.emailOnDonation ?? true);
        setNotifyOnBeneficiary(s.notifications.emailOnBeneficiaryRequest ?? true);
        setNotifyWeeklyDigest(s.notifications.weeklyDigest ?? true);
        setNotifySecurityAlerts(s.notifications.securityAlerts ?? true);
      }
      if (s.security) {
        setSecTwoFactor(s.security.twoFactorAuth ?? false);
        setSecSessionTimeout(s.security.sessionTimeoutMinutes ?? 60);
        setSecEnforceStrongPwd(s.security.enforceStrongPasswords ?? true);
        setSecStrictAudit(s.security.strictAuditLogging ?? true);
      }
    } catch (err: any) {
      setSettingsErrorMsg(err.message || "Failed to load system settings.");
    } finally {
      setSettingsLoading(false);
    }
  }

  async function handleSettingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsSuccessMsg("");
    setSettingsErrorMsg("");
    try {
      const payload = {
        charity: {
          name: settingCharityName,
          regNumber: settingRegNumber,
          companyNumber: settingCompanyNumber,
          officialAddress: settingOfficialAddress,
          contactEmail: settingContactEmail,
          contactPhone: settingContactPhone,
          giftAidRate: Number(settingGiftAidRate),
        },
        notifications: {
          emailOnDonation: notifyOnDonation,
          emailOnBeneficiaryRequest: notifyOnBeneficiary,
          weeklyDigest: notifyWeeklyDigest,
          securityAlerts: notifySecurityAlerts,
        },
        security: {
          twoFactorAuth: secTwoFactor,
          sessionTimeoutMinutes: Number(secSessionTimeout),
          enforceStrongPasswords: secEnforceStrongPwd,
          strictAuditLogging: secStrictAudit,
        },
      };
      const res = await api.updateSystemSettings(payload);
      setSettingsSuccessMsg("System settings saved and applied successfully.");
      setSystemSettings(res.settings || payload);
      setTimeout(() => setSettingsSuccessMsg(""), 4000);
    } catch (err: any) {
      setSettingsErrorMsg(err.message || "Failed to update system settings.");
    } finally {
      setSettingsSaving(false);
    }
  }

  async function loadNewsletterData() {
    setNewsletterLoading(true);
    try {
      const n = await api.getNewsletterAdmin();
      setNewsletterData(n);
    } catch (err: any) {
      console.error("Failed to load newsletter data:", err);
    } finally {
      setNewsletterLoading(false);
    }
  }

  async function handleDispatchNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!composeSubject.trim()) {
      alert("Subject line is required.");
      return;
    }
    if (!composeBody.trim()) {
      alert("Message body is required.");
      return;
    }

    setDispatchingNewsletter(true);
    try {
      await api.dispatchNewsletterAdmin({
        subject: composeSubject,
        audience: composeAudience,
        channel: composeChannel,
        body: composeBody,
      });
      setNewsletterSuccessMsg("Newsletter broadcast dispatched successfully!");
      setShowComposeNewsletterModal(false);
      setComposeSubject("");
      setComposeBody("");
      loadNewsletterData();
      setTimeout(() => setNewsletterSuccessMsg(""), 5000);
    } catch (err: any) {
      alert(err.message || "Failed to dispatch newsletter.");
    } finally {
      setDispatchingNewsletter(false);
    }
  }

  function confirmSignOut() {
    api.clearSession();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("donor_token");
      localStorage.removeItem("current_donor");
    } catch (e) {}
    setShowLogoutConfirmModal(false);
    navigate("/admin");
  }

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "None", color: "bg-slate-200", text: "text-slate-400" };
    let s = 0;
    if (pwd.length >= 8) s += 1;
    if (pwd.length >= 12) s += 1;
    if (/[A-Z]/.test(pwd)) s += 1;
    if (/[0-9]/.test(pwd)) s += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) s += 1;

    if (s <= 1) return { score: 20, label: "Very Weak", color: "bg-red-500", text: "text-red-500" };
    if (s === 2) return { score: 40, label: "Weak", color: "bg-amber-500", text: "text-amber-500" };
    if (s === 3) return { score: 65, label: "Moderate", color: "bg-yellow-500", text: "text-yellow-600" };
    if (s === 4) return { score: 85, label: "Strong", color: "bg-emerald-500", text: "text-emerald-600" };
    return { score: 100, label: "Very Strong", color: "bg-emerald-600", text: "text-emerald-700" };
  };

  // Record Donation Form State
  const [recordAmount, setRecordAmount] = useState<number | string>(50);
  const [recordCampaignId, setRecordCampaignId] = useState<string>("");
  const [recordType, setRecordType] = useState<"ONE_OFF" | "RECURRING">("ONE_OFF");
  const [recordGiftAid, setRecordGiftAid] = useState<boolean>(true);
  const [recordMethod, setRecordMethod] = useState<string>("Credit/Debit Card");
  const [recordReference, setRecordReference] = useState<string>("");
  const [submittingRecordDonation, setSubmittingRecordDonation] = useState(false);

  useEffect(() => {
    // Verify session
    const user = (api.getUser ? api.getUser() : null) || (api.getCurrentDonor ? api.getCurrentDonor() : null);
    const token = api.getToken ? api.getToken() : null;

    if (!user || !token) {
      navigate("/admin");
      return;
    }

    if (user.role !== "ADMIN" && user.role !== "STAFF") {
      navigate("/admin");
      return;
    }

    setCurrentUser(user);
    loadDashboardData();
    // Stagger secondary tab queries to avoid connection spike on mount
    setTimeout(() => {
      loadBeneficiariesData();
      loadStaffData();
    }, 150);
    setTimeout(() => {
      loadCampaignsData();
      loadAllocationsData();
    }, 350);
    setTimeout(() => {
      loadDonorsData();
      loadDonationsData();
    }, 600);
  }, []);

  useEffect(() => {
    if (activeTab === "donors") {
      loadDonorsData();
    } else if (activeTab === "campaigns") {
      loadCampaignsData();
    } else if (activeTab === "donations") {
      loadDonationsData();
    } else if (activeTab === "beneficiaries") {
      loadBeneficiariesData();
      loadStaffData();
    } else if (activeTab === "allocations") {
      loadAllocationsData();
      loadStaffData();
    } else if (activeTab === "newsletter") {
      loadNewsletterData();
    } else if (activeTab === "reports") {
      loadReportsData();
    } else if (activeTab === "staff") {
      loadStaffData();
    } else if (activeTab === "settings") {
      loadSettingsData();
    } else if (activeTab === "profile") {
      loadProfileData();
    }
  }, [activeTab]);

  async function loadDashboardData() {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.getAdminDashboard();
      setData(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to fetch live admin analytics .");
    } finally {
      setLoading(false);
    }
  }

  async function loadDonorsData() {
    setDonorsLoading(true);
    try {
      const [donorsRes, campaignsRes] = await Promise.all([
        api.getAllDonorsAdmin(),
        api.getCampaigns(),
      ]);
      setDonors(donorsRes);
      setCampaignsList(campaignsRes);
      if (campaignsRes.length > 0 && !recordCampaignId) {
        setRecordCampaignId(campaignsRes[0].id);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load donors .");
    } finally {
      setDonorsLoading(false);
    }
  }

  async function handleUpdateRequestStatus(requestId: string, newStatus: string) {
    setUpdatingRequestId(requestId);
    setActionSuccessMsg("");
    try {
      await api.updateBeneficiaryRequestStatus(requestId, newStatus);
      setActionSuccessMsg(`Request marked as ${newStatus} .`);
      await loadDashboardData();
      setTimeout(() => setActionSuccessMsg(""), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update request status .");
    } finally {
      setUpdatingRequestId(null);
    }
  }

  // --- ADD DONOR HANDLER ---
  async function handleAddDonorSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAddDonorError("");

    if (!newDonorName.trim()) {
      setAddDonorError("Please enter the donor's full name.");
      return;
    }
    if (!newDonorEmail.trim()) {
      setAddDonorError("Please enter a valid email address.");
      return;
    }
    if (!newDonorPhone.trim()) {
      setAddDonorError("Please enter a contact phone number.");
      return;
    }
    if (!newDonorPassword) {
      setAddDonorError("Please set a secure password for this donor account.");
      return;
    }
    if (newDonorPassword.length < 8) {
      setAddDonorError("Password must be at least 8 characters long.");
      return;
    }
    if (newDonorPassword !== newDonorConfirmPassword) {
      setAddDonorError("Password and Confirm Password do not match.");
      return;
    }

    setSubmittingAddDonor(true);
    try {
      await api.createDonorAdmin({
        fullName: newDonorName.trim(),
        email: newDonorEmail.trim(),
        password: newDonorPassword.trim(),
        phoneNumber: newDonorPhone.trim() || undefined,
        address: newDonorAddress.trim() || undefined,
        townCity: newDonorCity.trim() || undefined,
        postcode: newDonorPostcode.trim() || undefined,
        donationTier: newDonorTier,
        emailNewsletter: newDonorNewsletter,
        generalConsent: newDonorConsent,
        smsAlerts: newDonorSms,
        postalUpdates: newDonorPostal,
      });

      setActionSuccessMsg(`Donor account "${newDonorName}" created successfully! Login credentials assigned.`);
      setShowAddDonorModal(false);
      // Reset form
      setNewDonorName("");
      setNewDonorEmail("");
      setNewDonorPhone("");
      setNewDonorPassword("");
      setNewDonorConfirmPassword("");
      setAddDonorError("");
      setNewDonorAddress("");
      setNewDonorCity("Leicester");
      setNewDonorPostcode("");
      setNewDonorTier("SUPPORTER");
      setNewDonorNewsletter(true);
      setNewDonorConsent(true);
      setNewDonorSms(false);
      setNewDonorPostal(false);

      await Promise.all([loadDonorsData(), loadDashboardData()]);
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setAddDonorError(err.message || "Failed to create donor account.");
    } finally {
      setSubmittingAddDonor(false);
    }
  }

  // --- OPEN EDIT DONOR ---
  function openEditDonor(donor: CrmDonor) {
    setEditingDonor(donor);
    setEditDonorName(donor.fullName || "");
    setEditDonorPhone(donor.phoneNumber || "");
    setEditDonorAddress(donor.address || "");
    setEditDonorCity(donor.townCity || "");
    setEditDonorPostcode(donor.postcode || "");
    setEditDonorTier(donor.donationTier || "SUPPORTER");
    setEditDonorNewsletter(donor.emailNewsletter ?? true);
    setEditDonorConsent(donor.generalConsent ?? true);
    setEditDonorSms(donor.smsAlerts ?? false);
    setEditDonorPostal(donor.postalUpdates ?? false);
  }

  // --- EDIT DONOR SUBMIT ---
  async function handleEditDonorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingDonor) return;

    setSubmittingEditDonor(true);
    setErrorMsg("");
    try {
      const updated = await api.updateDonorAdmin(editingDonor.id, {
        fullName: editDonorName.trim(),
        phoneNumber: editDonorPhone.trim() || undefined,
        address: editDonorAddress.trim() || undefined,
        townCity: editDonorCity.trim() || undefined,
        postcode: editDonorPostcode.trim() || undefined,
        donationTier: editDonorTier,
        emailNewsletter: editDonorNewsletter,
        generalConsent: editDonorConsent,
        smsAlerts: editDonorSms,
        postalUpdates: editDonorPostal,
      });

      setActionSuccessMsg(`Donor details for "${editDonorName}" updated successfully .`);
      setEditingDonor(null);
      if (viewingDonor?.id === editingDonor.id) {
        setViewingDonor(updated);
      }
      await Promise.all([loadDonorsData(), loadDashboardData()]);
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update donor profile .");
    } finally {
      setSubmittingEditDonor(false);
    }
  }

  // --- OPEN RECORD DONATION ---
  function openRecordDonation(donor: CrmDonor) {
    setRecordingDonationDonor(donor);
    setRecordAmount(50);
    setRecordType("ONE_OFF");
    setRecordGiftAid(true);
    setRecordMethod("Credit/Debit Card");
    setRecordReference(`ZT-CRM-${Date.now().toString(36).toUpperCase()}`);
    if (campaignsList.length > 0 && !recordCampaignId) {
      setRecordCampaignId(campaignsList[0].id);
    }
  }

  // --- RECORD DONATION SUBMIT (Automatic total & tier update) ---
  async function handleRecordDonationSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recordingDonationDonor) return;

    const amt = typeof recordAmount === "string" ? parseFloat(recordAmount) : recordAmount;
    if (!amt || amt <= 0) {
      setErrorMsg("Please enter a valid donation amount greater than £0.00.");
      return;
    }

    setSubmittingRecordDonation(true);
    setErrorMsg("");
    try {
      const res = await api.recordDonorDonationAdmin(recordingDonationDonor.id, {
        amount: amt,
        campaignId: recordCampaignId || undefined,
        type: recordType,
        giftAid: recordGiftAid,
        paymentMethod: recordMethod,
        reference: recordReference || undefined,
      });

      const updatedDonor = res.donor;
      setActionSuccessMsg(
        `Donation of £${amt.toFixed(2)} recorded for ${recordingDonationDonor.fullName}! Total giving updated to £${Number(updatedDonor.totalDonated).toFixed(2)} and Tier set to ${updatedDonor.donationTier}.`
      );
      setRecordingDonationDonor(null);

      if (viewingDonor?.id === recordingDonationDonor.id) {
        setViewingDonor(updatedDonor);
      }

      await Promise.all([loadDonorsData(), loadDashboardData()]);
      setTimeout(() => setActionSuccessMsg(""), 4500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to record donation .");
    } finally {
      setSubmittingRecordDonation(false);
    }
  }

  function handleLogout() {
    api.clearSession();
    navigate("/admin");
  }

  // Filtered and Sorted Donors Pipeline
  const filteredDonors = donors.filter((d) => {
    if (crmSearch.trim()) {
      const q = crmSearch.toLowerCase().trim();
      const name = (d.fullName || "").toLowerCase();
      const email = (d.email || "").toLowerCase();
      const phone = (d.phoneNumber || "").toLowerCase();
      if (!name.includes(q) && !email.includes(q) && !phone.includes(q)) {
        return false;
      }
    }

    if (crmTierFilter !== "ALL" && d.donationTier !== crmTierFilter) {
      return false;
    }

    if (crmConsentFilter === "OPTED_IN" && !d.emailNewsletter) {
      return false;
    }
    if (crmConsentFilter === "OPTED_OUT" && d.emailNewsletter) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (crmSortBy === "TOTAL_DESC") {
      return Number(b.totalDonated || 0) - Number(a.totalDonated || 0);
    }
    if (crmSortBy === "TOTAL_ASC") {
      return Number(a.totalDonated || 0) - Number(b.totalDonated || 0);
    }
    if (crmSortBy === "RECENT") {
      const timeA = a.lastDonationDate ? new Date(a.lastDonationDate).getTime() : 0;
      const timeB = b.lastDonationDate ? new Date(b.lastDonationDate).getTime() : 0;
      return timeB - timeA;
    }
    if (crmSortBy === "NAME_ASC") {
      return (a.fullName || "").localeCompare(b.fullName || "");
    }
    if (crmSortBy === "NAME_DESC") {
      return (b.fullName || "").localeCompare(a.fullName || "");
    }
    // Default: Newest registered first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const sidebarNav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "donors", label: "Donor Management", icon: Users },
    { id: "campaigns", label: "Campaign Management", icon: Megaphone },
    { id: "donations", label: "Donation Management", icon: CreditCard },
    { id: "beneficiaries", label: "Beneficiary Management", icon: HeartHandshake },
    { id: "allocations", label: "Fund Allocation & Distribution", icon: Landmark },
    { id: "newsletter", label: "Newsletter Management", icon: Mail },
    { id: "reports", label: "Reports & Analytics", icon: TrendingUp },
    { id: "staff", label: "Staff & Activity Logs", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const metrics = data?.metrics;
  const sections = data?.sections;

  // CRM Aggregate Metrics
  
  // Filtered & Sorted Campaigns
  const filteredCampaigns = campaigns
    .filter((c) => {
      const q = campaignSearch.toLowerCase();
      const matchSearch =
        !campaignSearch ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.campaignCode || "").toLowerCase().includes(q) ||
        (c.corporateSponsor || "").toLowerCase().includes(q) ||
        (c.fundraiserName || "").toLowerCase().includes(q);

      const type = c.campaignType || "INTERNAL";
      const matchType = campaignTypeFilter === "ALL" ? true : type === campaignTypeFilter;

      const matchStatus =
        campaignStatusFilter === "ALL"
          ? true
          : campaignStatusFilter === "ACTIVE"
          ? (c.status === "ACTIVE" || (!c.status && c.active && !c.archived))
          : campaignStatusFilter === "DRAFT"
          ? c.status === "DRAFT"
          : campaignStatusFilter === "COMPLETED"
          ? c.status === "COMPLETED"
          : campaignStatusFilter === "ARCHIVED"
          ? (c.status === "ARCHIVED" || c.archived)
          : true;

      return matchSearch && matchType && matchStatus;
    })
    .sort((a, b) => {
      if (campaignSortBy === "RAISED_DESC") {
        return Number(b.raisedAmount) - Number(a.raisedAmount);
      }
      if (campaignSortBy === "TARGET_DESC") {
        return Number(b.targetAmount) - Number(a.targetAmount);
      }
      if (campaignSortBy === "PROGRESS_DESC") {
        return (b.progressPercentage || 0) - (a.progressPercentage || 0);
      }
      if (campaignSortBy === "NEWEST") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  
  // Filtered & Sorted Donations
  const filteredDonations = donationsList
    .filter((dn) => {
      const donorName = dn.user?.fullName || dn.donorName || "";
      const donorEmail = dn.user?.email || dn.donorEmail || "";
      const ref = dn.reference || dn.id || "";
      const campaign = dn.campaign?.title || "";
      const notes = dn.notes || "";

      const matchSearch =
        !donationSearch ||
        donorName.toLowerCase().includes(donationSearch.toLowerCase()) ||
        donorEmail.toLowerCase().includes(donationSearch.toLowerCase()) ||
        ref.toLowerCase().includes(donationSearch.toLowerCase()) ||
        campaign.toLowerCase().includes(donationSearch.toLowerCase()) ||
        notes.toLowerCase().includes(donationSearch.toLowerCase());

      const matchType = donationTypeFilter === "ALL" ? true : dn.type === donationTypeFilter;
      const matchStatus = donationStatusFilter === "ALL" ? true : dn.status === donationStatusFilter;
      const matchMethod =
        donationMethodFilter === "ALL"
          ? true
          : (dn.paymentMethod || "").toLowerCase().includes(donationMethodFilter.toLowerCase());
      const matchGiftAid =
        donationGiftAidFilter === "ALL"
          ? true
          : donationGiftAidFilter === "YES"
          ? dn.giftAid === true
          : dn.giftAid === false;

      return matchSearch && matchType && matchStatus && matchMethod && matchGiftAid;
    })
    .sort((a, b) => {
      if (donationSortBy === "DATE_DESC") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (donationSortBy === "DATE_ASC") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (donationSortBy === "AMOUNT_DESC") {
        return Number(b.amount) - Number(a.amount);
      }
      if (donationSortBy === "AMOUNT_ASC") {
        return Number(a.amount) - Number(b.amount);
      }
      return 0;
    });

  const totalDonationsAmountSum = donationsList
    .filter((dn) => dn.status === "COMPLETED")
    .reduce((sum, dn) => sum + Number(dn.amount || 0), 0);
  const completedDonationsCount = donationsList.filter((dn) => dn.status === "COMPLETED").length;
  const oneOffCount = donationsList.filter((dn) => dn.type === "ONE_OFF").length;
  const recurringCount = donationsList.filter((dn) => dn.type === "RECURRING").length;
  const giftAidClaimableAmount = donationsList
    .filter((dn) => dn.status === "COMPLETED" && dn.giftAid)
    .reduce((sum, dn) => sum + Number(dn.amount || 0) * 0.25, 0);

  const totalActiveCampaigns = campaigns.filter((c) => (c.status === "ACTIVE" || (!c.status && c.active)) && !c.archived).length;
  const internalCampaignsCount = campaigns.filter((c) => (c.campaignType || "INTERNAL") === "INTERNAL").length;
  const externalCampaignsCount = campaigns.filter((c) => c.campaignType === "EXTERNAL").length;
  const internalRaisedAmount = campaigns.filter((c) => (c.campaignType || "INTERNAL") === "INTERNAL").reduce((sum, c) => sum + Number(c.raisedAmount || 0), 0);
  const externalRaisedAmount = campaigns.filter((c) => c.campaignType === "EXTERNAL").reduce((sum, c) => sum + Number(c.raisedAmount || 0), 0);
  const totalCampaignTarget = campaigns
    .filter((c) => !c.archived && c.status !== "ARCHIVED")
    .reduce((sum, c) => sum + Number(c.targetAmount || 0), 0);
  const totalCampaignRaised = campaigns
    .reduce((sum, c) => sum + Number(c.raisedAmount || 0), 0);
  const totalCampaignProgress =
    totalCampaignTarget > 0 ? Math.min(100, Math.round((totalCampaignRaised / totalCampaignTarget) * 100)) : 0;

  const totalCrmDonated = donors.reduce((acc, d) => acc + Number(d.totalDonated || 0), 0);
  const totalCrmNewsletterOptIn = donors.filter((d) => d.emailNewsletter).length;
  const newsletterPercentage = donors.length > 0 ? Math.round((totalCrmNewsletterOptIn / donors.length) * 100) : 0;

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50 relative" style={{ backgroundColor: "#F8FAFC" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        /* Global High-End Standard Typography */
        *, *::before, *::after, html, body, button, input, select, textarea, table, th, td {
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          background-color: #F8FAFC !important;
          color: #0F172A !important;
        }

        /* Fixed Full-Height Executive Sidebar */
        @media (min-width: 900px) {
          .admin-desktop-sidebar {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 260px !important;
            min-width: 260px !important;
            flex-shrink: 0 !important;
            height: 100vh !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            background: #FFFFFF !important;
            border-right: 1px solid #F1E3EA !important;
            box-shadow: 1px 0 3px rgba(0, 0, 0, 0.02) !important;
            z-index: 50 !important;
            overflow: hidden !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
          }

          .admin-main-wrapper {
            margin-left: 260px !important;
            width: calc(100% - 260px) !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
          }

          .admin-sidebar-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .admin-sidebar-scroll::-webkit-scrollbar-thumb {
            background-color: #F1E3EA;
            border-radius: 4px;
          }
          .admin-sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .admin-hamburger-btn {
            display: none !important;
          }
          .admin-mobile-nav-close {
            display: none !important;
          }
          .admin-mobile-backdrop {
            display: none !important;
          }
        }

        @media (max-width: 899px) {
          .admin-desktop-sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            z-index: 50 !important;
            width: 270px !important;
            height: 100vh !important;
            background: #FFFFFF !important;
            box-shadow: 4px 0 24px rgba(36, 18, 33, 0.15) !important;
            border-right: 1px solid #F1E3EA !important;
            transition: transform 0.25s ease-in-out !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .admin-sidebar-closed {
            transform: translateX(-100%) !important;
            pointer-events: none !important;
          }
          .admin-sidebar-open {
            transform: translateX(0) !important;
            pointer-events: auto !important;
          }
          .admin-hamburger-btn {
            display: inline-flex !important;
          }
          .admin-mobile-nav-close {
            display: inline-flex !important;
          }
          .admin-mobile-header-logo {
            display: flex !important;
          }
        }

        @media (min-width: 900px) {
          .admin-mobile-header-logo {
            display: none !important;
          }
        }

        /* CRM Header Alignment */
        
        
        /* Grid Column Utility Rules */
        .grid {
          display: grid !important;
        }

        .gap-2 { gap: 0.5rem !important; }
        .gap-3 { gap: 0.75rem !important; }
        .gap-4 { gap: 1rem !important; }
        .gap-5 { gap: 1.25rem !important; }
        .gap-6 { gap: 1.5rem !important; }

        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }

        .admin-campaigns-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 1.25rem !important;
        }
        @media (max-width: 899px) {
          .admin-campaigns-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 640px) {
          .sm\\:grid-cols-1, [class*="sm:grid-cols-1"] { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .sm\\:grid-cols-2, [class*="sm:grid-cols-2"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sm\\:grid-cols-3, [class*="sm:grid-cols-3"] { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .sm\\:grid-cols-4, [class*="sm:grid-cols-4"] { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        }

        @media (min-width: 768px) {
          .md\\:grid-cols-1, [class*="md:grid-cols-1"] { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-2, [class*="md:grid-cols-2"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-3, [class*="md:grid-cols-3"] { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-4, [class*="md:grid-cols-4"] { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        }

        @media (min-width: 1024px) {
          .lg\\:grid-cols-1, [class*="lg:grid-cols-1"] { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .lg\\:grid-cols-2, [class*="lg:grid-cols-2"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .lg\\:grid-cols-3, [class*="lg:grid-cols-3"] { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .lg\\:grid-cols-4, [class*="lg:grid-cols-4"] { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        }

        .col-span-1, [class*="col-span-1"] { grid-column: span 1 / span 1 !important; }
        .col-span-2, [class*="col-span-2"] { grid-column: span 2 / span 2 !important; }
        .col-span-3, [class*="col-span-3"] { grid-column: span 3 / span 3 !important; }

        @media (min-width: 1024px) {
          .lg\\:col-span-1, [class*="lg:col-span-1"] { grid-column: span 1 / span 1 !important; }
          .lg\\:col-span-2, [class*="lg:col-span-2"] { grid-column: span 2 / span 2 !important; }
          .lg\\:col-span-3, [class*="lg:col-span-3"] { grid-column: span 3 / span 3 !important; }
        }

        .admin-subnav-scroll {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          overflow-x: auto !important;
          padding-bottom: 0.75rem !important;
          border-bottom: 1px solid #E2E8F0 !important;
          width: 100% !important;
          max-width: 100% !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .admin-subnav-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .admin-subnav-scroll::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 4px;
        }
        .admin-subnav-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        /* General Spacing & Margin Utility Rules */
        .admin-page-header {
          margin-bottom: 2rem !important;
        }
        .admin-subheading {
          margin-top: 0.375rem !important;
          margin-bottom: 0 !important;
        }
        .mb-1 { margin-bottom: 0.25rem !important; }
        .mb-1\.5 { margin-bottom: 0.375rem !important; }
        .mb-2 { margin-bottom: 0.5rem !important; }
        .mb-3 { margin-bottom: 0.75rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-5 { margin-bottom: 1.25rem !important; }
        .mb-6 { margin-bottom: 1.5rem !important; }
        .mb-8 { margin-bottom: 2rem !important; }
        .mt-0\.5 { margin-top: 0.125rem !important; }
        .mt-1 { margin-top: 0.25rem !important; }
        .mt-1\.5 { margin-top: 0.375rem !important; }
        .mt-2 { margin-top: 0.5rem !important; }
        .mt-3 { margin-top: 0.75rem !important; }
        .mt-4 { margin-top: 1rem !important; }
        .mt-5 { margin-top: 1.25rem !important; }
        .mt-6 { margin-top: 1.5rem !important; }
        .mt-8 { margin-top: 2rem !important; }
        .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem !important; }
        .space-y-1\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.375rem !important; }
        .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem !important; }
        .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem !important; }
        .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem !important; }
        .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem !important; }
        .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 2rem !important; }

        .admin-crm-header {
          margin-bottom: 2rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          gap: 1rem !important;
        }
        @media (max-width: 640px) {
          .admin-crm-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .admin-crm-header-actions {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
        .admin-crm-header-actions {
          display: flex !important;
          align-items: center !important;
          margin-left: auto !important;
        }

        /* Standard SaaS Grid Layouts */
        .admin-kpi-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 1.25rem !important;
        }

        @media (max-width: 1200px) {
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .admin-kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .admin-grid-2col {
          display: grid !important;
          grid-template-columns: 1.8fr 1fr !important;
          gap: 1.5rem !important;
        }

        .admin-grid-1-2col {
          display: grid !important;
          grid-template-columns: 1fr 1.8fr !important;
          gap: 1.5rem !important;
        }

        @media (max-width: 1024px) {
          .admin-grid-2col, .admin-grid-1-2col {
            grid-template-columns: 1fr !important;
          }
        }

        /* Executive Cards & Containers */
        .admin-card {
          background: #FFFFFF !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 1rem !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04) !important;
        }

        /* Professional Tables */
        .admin-table th {
          padding: 0.75rem 1rem !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: #64748B !important;
          background-color: #F8FAFC !important;
          border-bottom: 1px solid #E2E8F0 !important;
        }

        .admin-table td {
          padding: 0.875rem 1rem !important;
          font-size: 0.8125rem !important;
          border-bottom: 1px solid #F1F5F9 !important;
          vertical-align: middle !important;
        }

        .admin-table tr:hover td {
          background-color: #FAFAFB !important;
        }

        /* Search Bar & Filters */
        .admin-search-wrapper {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          flex: 1 !important;
          min-width: 260px !important;
        }

        .admin-search-icon {
          position: absolute !important;
          left: 14px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #94A3B8 !important;
          pointer-events: none !important;
          z-index: 2 !important;
        }

        .admin-search-input {
          width: 100% !important;
          height: 42px !important;
          padding-left: 42px !important;
          padding-right: 36px !important;
          font-size: 0.8125rem !important;
          font-weight: 500 !important;
          color: #0F172A !important;
          background-color: #FFFFFF !important;
          border: 1px solid #CBD5E1 !important;
          border-radius: 0.75rem !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }

        .admin-search-input:focus {
          border-color: #E6127E !important;
          box-shadow: 0 0 0 3px rgba(230, 18, 126, 0.15) !important;
        }

        .admin-search-input::placeholder {
          color: #94A3B8 !important;
          font-weight: 400 !important;
        }

        .admin-search-clear {
          position: absolute !important;
          right: 12px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #94A3B8 !important;
          cursor: pointer !important;
          padding: 4px !important;
          border-radius: 9999px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .admin-search-clear:hover {
          color: #0F172A !important;
          background-color: #F1F5F9 !important;
        }

        .admin-select {
          height: 42px !important;
          padding: 0 2.25rem 0 1rem !important;
          font-size: 0.8125rem !important;
          font-weight: 600 !important;
          color: #334155 !important;
          background-color: #FFFFFF !important;
          border: 1px solid #CBD5E1 !important;
          border-radius: 0.75rem !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 0.75rem center !important;
          background-size: 14px 14px !important;
        }

        .admin-select:focus {
          border-color: #E6127E !important;
          box-shadow: 0 0 0 3px rgba(230, 18, 126, 0.15) !important;
        }

        /* Circular Donor Avatar */
        .admin-avatar {
          width: 40px !important;
          height: 40px !important;
          min-width: 40px !important;
          min-height: 40px !important;
          border-radius: 50% !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 0.875rem !important;
          font-weight: 800 !important;
          background: linear-gradient(135deg, #FCE8F3 0%, #F9D0DC 100%) !important;
          color: #B80C64 !important;
          border: 1.5px solid #F8B4D9 !important;
          box-shadow: 0 1px 3px rgba(230, 18, 126, 0.1) !important;
          flex-shrink: 0 !important;
        }

        /* Giving Tier Badges */
        .admin-tier-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.65rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.04em !important;
          white-space: nowrap !important;
        }

        .admin-tier-platinum {
          background-color: #FAF5FF !important;
          color: #7E22CE !important;
          border: 1px solid #E9D5FF !important;
        }

        .admin-tier-gold {
          background-color: #FEFCE8 !important;
          color: #A16207 !important;
          border: 1px solid #FEF08A !important;
        }

        .admin-tier-silver {
          background-color: #F8FAFC !important;
          color: #475569 !important;
          border: 1px solid #CBD5E1 !important;
        }

        .admin-tier-bronze {
          background-color: #FFF7ED !important;
          color: #C2410C !important;
          border: 1px solid #FFEDD5 !important;
        }

        .admin-tier-supporter {
          background-color: #F1F5F9 !important;
          color: #475569 !important;
          border: 1px solid #E2E8F0 !important;
        }

        /* Communication Consent Status Pills */
        .admin-consent-opted-in {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.75rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #ECFDF5 !important;
          color: #047857 !important;
          border: 1px solid #A7F3D0 !important;
          white-space: nowrap !important;
        }

        .admin-consent-opted-out {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.75rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 600 !important;
          background-color: #F1F5F9 !important;
          color: #64748B !important;
          border: 1px solid #E2E8F0 !important;
          white-space: nowrap !important;
        }

        /* Action Buttons */
        .admin-action-btn {
          width: 32px !important;
          height: 32px !important;
          min-width: 32px !important;
          min-height: 32px !important;
          border-radius: 0.5rem !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: #FFFFFF !important;
          border: 1px solid #E2E8F0 !important;
          color: #475569 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .admin-action-btn:hover {
          background-color: #F8FAFC !important;
          border-color: #CBD5E1 !important;
          color: #E6127E !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
        }

        .admin-action-btn-primary {
          background-color: #FDF2F8 !important;
          border-color: #FCE7ED !important;
          color: #E6127E !important;
        }

        .admin-action-btn-primary:hover {
          background-color: #E6127E !important;
          border-color: #E6127E !important;
          color: #FFFFFF !important;
        }

        
        /* Campaign Management UI Components */
        /* Responsive Campaign Cards Grid */
        .admin-campaigns-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 1.5rem !important;
          width: 100% !important;
          margin-bottom: 2.5rem !important;
        }

        @media (max-width: 1200px) {
          .admin-campaigns-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .admin-campaigns-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .admin-campaign-image-box {
          position: relative !important;
          width: 100% !important;
          height: 185px !important;
          max-height: 185px !important;
          min-height: 185px !important;
          background-color: #F8FAFC !important;
          overflow: hidden !important;
        }

        .admin-campaign-image-box img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block !important;
          transition: transform 0.35s ease !important;
        }

        .admin-performance-image-box {
          position: relative !important;
          width: 100% !important;
          height: 180px !important;
          max-height: 180px !important;
          min-height: 180px !important;
          border-radius: 0.75rem !important;
          overflow: hidden !important;
          background-color: #F1F5F9 !important;
          margin-bottom: 0.75rem !important;
        }

        .admin-performance-image-box img {
          width: 100% !important;
          height: 100% !important;
          max-height: 180px !important;
          min-height: 180px !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          transition: transform 0.3s ease !important;
        }

        .admin-performance-image-box:hover img {
          transform: scale(1.04) !important;
        }

        .admin-campaign-card:hover .admin-campaign-image-box img {
          transform: scale(1.05) !important;
        }

        .admin-campaign-card {
          background: #FFFFFF !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 1rem !important;
          overflow: hidden !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04) !important;
          display: flex !important;
          flex-direction: column !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
        }
        .admin-campaign-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.07) !important;
          border-color: #CBD5E1 !important;
        }
        .admin-progress-bar-bg {
          width: 100% !important;
          height: 8px !important;
          background-color: #F1F5F9 !important;
          border-radius: 9999px !important;
          overflow: hidden !important;
        }
        .admin-progress-bar-fill {
          height: 100% !important;
          border-radius: 9999px !important;
          background: linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%) !important;
          transition: width 0.4s ease !important;
        }
        .admin-badge-active {
          background-color: #ECFDF5 !important;
          color: #047857 !important;
          border: 1px solid #A7F3D0 !important;
        }
        .admin-badge-inactive {
          background-color: #F1F5F9 !important;
          color: #475569 !important;
          border: 1px solid #CBD5E1 !important;
        }
        .admin-badge-archived {
          background-color: #FFFBEB !important;
          color: #B45309 !important;
          border: 1px solid #FDE68A !important;
        }

        
        /* Donation Management Badges & Receipt */
        .admin-badge-completed {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.65rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #ECFDF5 !important;
          color: #047857 !important;
          border: 1px solid #A7F3D0 !important;
          white-space: nowrap !important;
        }
        .admin-badge-pending {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.65rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #FFFBEB !important;
          color: #B45309 !important;
          border: 1px solid #FDE68A !important;
          white-space: nowrap !important;
        }
        .admin-badge-failed {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.65rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #FEF2F2 !important;
          color: #B91C1C !important;
          border: 1px solid #FCA5A5 !important;
          white-space: nowrap !important;
        }
        .admin-badge-refunded {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.25rem 0.65rem !important;
          border-radius: 9999px !important;
          font-size: 0.6875rem !important;
          font-weight: 600 !important;
          background-color: #F1F5F9 !important;
          color: #475569 !important;
          border: 1px solid #CBD5E1 !important;
          white-space: nowrap !important;
        }
        .admin-badge-oneoff {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.2rem 0.55rem !important;
          border-radius: 0.5rem !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #EFF6FF !important;
          color: #1D4ED8 !important;
          border: 1px solid #BFDBFE !important;
          white-space: nowrap !important;
        }
        .admin-badge-recurring {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.2rem 0.55rem !important;
          border-radius: 0.5rem !important;
          font-size: 0.6875rem !important;
          font-weight: 700 !important;
          background-color: #FAF5FF !important;
          color: #7E22CE !important;
          border: 1px solid #E9D5FF !important;
          white-space: nowrap !important;
        }
        .admin-badge-method {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.2rem 0.55rem !important;
          border-radius: 0.5rem !important;
          font-size: 0.6875rem !important;
          font-weight: 600 !important;
          background-color: #F8FAFC !important;
          color: #334155 !important;
          border: 1px solid #E2E8F0 !important;
          white-space: nowrap !important;
        }
        .admin-receipt-box {
          background-color: #FFFFFF !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 1.5rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .admin-printable-receipt, .admin-printable-receipt * {
            visibility: visible;
          }
          .admin-printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }

        /* Modal Inputs & Selects */
        .admin-modal-input, .admin-modal-select {
          width: 100% !important;
          height: 42px !important;
          padding: 0 0.875rem !important;
          font-size: 0.8125rem !important;
          font-weight: 500 !important;
          color: #0F172A !important;
          background-color: #FFFFFF !important;
          border: 1px solid #CBD5E1 !important;
          border-radius: 0.75rem !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }

        .admin-modal-input:focus, .admin-modal-select:focus {
          border-color: #E6127E !important;
          box-shadow: 0 0 0 3px rgba(230, 18, 126, 0.15) !important;
        }

        /* Global Modal & Positioning Utilities Override */
        .fixed { position: fixed !important; }
        .inset-0 { top: 0px !important; right: 0px !important; bottom: 0px !important; left: 0px !important; }
        .z-50 { z-index: 9999 !important; }
        .bg-black\/60, [class*="bg-black/60"], [class*="bg-black/50"], [class*="bg-black/40"] {
          background-color: rgba(0, 0, 0, 0.65) !important;
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(5px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
        }
        .overflow-y-auto { overflow-y: auto !important; }
        .max-h-\[92vh\], [class*="max-h-[92vh]"] { max-height: 92vh !important; }
        .max-w-lg, [class*="max-w-lg"] { max-width: 32rem !important; }
        .max-w-xl, [class*="max-w-xl"] { max-width: 36rem !important; }
        .max-w-2xl, [class*="max-w-2xl"] { max-width: 42rem !important; }
      `}</style>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="admin-mobile-backdrop fixed inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Administrative Navigation Sidebar (Fixed 100vh) */}
      <aside
        className={`admin-desktop-sidebar flex flex-col justify-between ${
          mobileMenuOpen ? "admin-sidebar-open" : "admin-sidebar-closed"
        }`}
        style={{
          background: "#FFFFFF",
          borderColor: "#F1E3EA"
        }}
      >
        {/* Top Brand Section in Sidebar */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <Link to="/" className="flex items-center" title="The Zinthiya Trust">
            <ZinthiyaLogo />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="admin-mobile-nav-close p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Middle Section with Navigation Items */}
        <div className="p-3.5 flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 px-2 flex-shrink-0">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
              Navigation
            </span>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="space-y-1.5 overflow-y-auto flex-1 pr-1 admin-sidebar-scroll">
            {sidebarNav.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  style={isActive ? {
                    background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)",
                    boxShadow: "0 4px 14px 0 rgba(230, 18, 126, 0.35)",
                    color: "#FFFFFF"
                  } : {}}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                    isActive
                      ? "font-bold text-white shadow-md scale-[1.01]"
                      : "text-slate-700 hover:bg-[#FCE8F3]/60 hover:text-magenta font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent
                      size={17}
                      className={isActive ? "text-white" : "text-slate-500"}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Pinned Logout Button in the Marked Space */}
        <div className="p-3.5 border-t border-slate-100 bg-white flex-shrink-0 mt-auto">
          <button
            type="button"
            onClick={() => {
              setShowLogoutConfirmModal(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-semibold group"
          >
            <div className="flex items-center gap-2.5">
              <LogOut
                size={17}
                className="text-slate-500 group-hover:text-rose-600 transition-colors"
              />
              <span className="font-bold">Logout</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Offset by Sidebar Width) */}
      <div className="admin-main-wrapper flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <header
          className="w-full border-b bg-white flex-shrink-0 sticky top-0 z-40"
          style={{
            borderColor: "#E2E8F0",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
            height: "56px"
          }}
        >
          <div className="px-4 sm:px-6 h-full flex items-center justify-between" style={{ maxWidth: "1600px", margin: "0 auto" }}>
            {/* Logo & Portal Authority Badge */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="admin-hamburger-btn p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Menu size={18} />
              </button>

              <Link to="/" className="admin-mobile-header-logo flex items-center" title="The Zinthiya Trust">
                <ZinthiyaLogo />
              </Link>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-900 text-white tracking-wide">
                <ShieldCheck size={12} className="text-amber-400" />
                <span>ADMIN PORTAL</span>
              </span>

              {/* Breadcrumb indicator */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-1">
                <span>/</span>
                <span className="text-slate-800 font-bold capitalize">
                  {activeTab === "donors" ? "Donor Management" : activeTab === "campaigns" ? "Campaign Management" : activeTab === "donations" ? "Donation Management" : activeTab === "beneficiaries" ? "Beneficiary Management" : activeTab === "allocations" ? "Fund Allocation & Distribution" : activeTab === "newsletter" ? "Newsletter Management" : activeTab === "reports" ? "Reports & Analytics" : activeTab === "staff" ? "Staff & Activity Logs" : activeTab === "settings" ? "Settings" : activeTab === "profile" ? "My Profile" : "Dashboard"}
                </span>
              </div>
            </div>

            {/* Right Admin Controls */}
            <div className="flex items-center gap-3">
              {/* Database Sync Status Indicator */}
              <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>System Live</span>
              </div>

              {/* Refresh Data Button */}
              <button
                type="button"
                onClick={() => {
                  loadDashboardData();
                  loadDonorsData();
                  loadCampaignsData();
                  loadDonationsData();
                }}
                disabled={loading || donorsLoading}
                title="Refresh live metrics"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw size={13} className={loading || donorsLoading ? "animate-spin text-magenta" : "text-slate-500"} />
                <span className="hidden md:inline">Refresh</span>
              </button>

              {/* Administrator Profile Pill */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-slate-900 text-white">
                  {currentUser?.fullName?.charAt(0) || "A"}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser?.fullName || "Administrator"}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500">
                    Senior Staff • #1137350
                  </div>
                </div>
              </div>

              {/* Log Out */}
              <button
                type="button"
                onClick={() => setShowLogoutConfirmModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                title="End session"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0" style={{ maxWidth: "1600px", width: "100%", margin: "0 auto" }}>
          {/* Action Success Toast */}
          {actionSuccessMsg && (
            <div
              className="mb-5 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 border shadow-sm animate-fade-in"
              style={{ backgroundColor: "#ECFDF5", borderColor: "#A7F3D0", color: "#065F46" }}
            >
              <Check size={16} className="text-emerald-600" />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* Global Error Banner */}
          {errorMsg && (
            <div
              className="mb-5 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between border shadow-sm"
              style={{ backgroundColor: "#FEF2F2", borderColor: "#FCA5A5", color: "#B91C1C" }}
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMsg("")}
                className="p-1 rounded-md text-red-600 hover:bg-red-100 cursor-pointer"
                title="Dismiss message"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* TAB 1: ADMIN DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Dashboard Title & Meta */}
              <div className="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ marginBottom: "2rem" }}>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 admin-subheading">
                    Real-time charity operations, donations ledger, and CRM analytics.
                  </p>
                </div>
              </div>

              {/* TOP 4 PERFORMANCE METRIC CARDS */}
              <div className="admin-kpi-grid mb-8">
                {/* 1. Total donations */}
                <div className="admin-card p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Total donations
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-magenta">
                      <CreditCard size={18} />
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      £{Number(metrics?.totalDonations || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                        ✓ {metrics?.totalDonationsCount || 0} completed gifts in ledger
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Total donors */}
                <div className="admin-card p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Total donors
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Users size={18} />
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {metrics?.totalDonors || 0}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-2">
                      Registered supporter accounts in CRM
                    </div>
                  </div>
                </div>

                {/* 3. Active campaigns */}
                <div className="admin-card p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Active campaigns
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                      <Compass size={18} />
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {metrics?.activeCampaigns || 0}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-2">
                      Fundraising causes currently operating
                    </div>
                  </div>
                </div>

                {/* 4. Beneficiaries */}
                <div className="admin-card p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Beneficiaries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <HeartHandshake size={18} />
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {metrics?.totalBeneficiaries || 0}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                        {metrics?.pendingRequestsCount || 0} pending assistance requests
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TWO COLUMN GRID: Recent Donations & Activities */}
              <div className="admin-grid-2col mb-8">
                {/* SECTION 1: Recent donations */}
                <div className="admin-card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Recent Donations
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time audit log of donations recorded.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("donations")}
                      className="text-xs font-bold text-magenta hover:underline cursor-pointer"
                    >
                      View all ledger →
                    </button>
                  </div>

                  {sections?.recentDonations?.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No donations recorded yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="admin-table w-full text-left text-xs">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Reference</th>
                            <th>Donor</th>
                            <th>Campaign</th>
                            <th>Type</th>
                            <th className="text-right">Amount</th>
                            <th className="text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sections?.recentDonations?.map((d) => (
                            <tr key={d.id}>
                              <td className="whitespace-nowrap font-medium text-slate-600">
                                {new Date(d.createdAt).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric"
                                })}
                              </td>
                              <td>
                                <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                                  {d.reference}
                                </span>
                              </td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-pink-100 text-magenta font-bold text-[10px] flex items-center justify-center shrink-0">
                                    {d.donor?.fullName?.charAt(0) || "D"}
                                  </div>
                                  <span className="font-semibold text-slate-900">{d.donor?.fullName}</span>
                                </div>
                              </td>
                              <td className="text-slate-600 max-w-[150px] truncate">
                                {d.campaign?.title || "General Fund"}
                              </td>
                              <td>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-magenta border border-pink-100">
                                  {d.type === "RECURRING" ? "Monthly" : "One-off"}
                                </span>
                              </td>
                              <td className="text-right font-black text-slate-900 whitespace-nowrap text-sm">
                                £{Number(d.amount).toFixed(2)}
                              </td>
                              <td className="text-center">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span>{d.status}</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* SECTION 2: Recent activities */}
                <div className="admin-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Recent Activities
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Live audit trail across platform events.
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-magenta flex items-center justify-center">
                        <Activity size={16} />
                      </div>
                    </div>

                    {sections?.recentActivities?.length === 0 ? (
                      <div className="text-center py-10 text-slate-400 text-xs">
                        No activity recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {sections?.recentActivities?.map((act) => (
                          <div key={act.id} className="flex items-start gap-3 text-xs p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 text-magenta flex items-center justify-center shrink-0 mt-0.5">
                              {act.type === "DONATION" && <CreditCard size={13} />}
                              {act.type === "BENEFICIARY_REQUEST" && <HeartHandshake size={13} />}
                              {act.type === "DONOR_REGISTRATION" && <User size={13} />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-slate-900 truncate">
                                {act.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                                {act.description}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium mt-1">
                                {new Date(act.timestamp).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Campaign performance */}
              <div className="admin-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Campaign Performance
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Funding progress and goals of active causes in Leicestershire.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-magenta border border-pink-100">
                    {sections?.campaignPerformance?.length || 0} Active Relief Causes
                  </span>
                </div>

                <div className="admin-campaigns-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                  {sections?.campaignPerformance?.map((camp) => (
                    <div
                      key={camp.id}
                      className="rounded-xl border border-slate-200/80 p-4 bg-slate-50/40 hover:bg-white hover:border-pink-200 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        {camp.imageUrl && (
                          <div className="admin-performance-image-box">
                            <img
                              src={camp.imageUrl}
                              alt={camp.title}
                            />
                          </div>
                        )}

                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                          {camp.title}
                        </h3>

                        <div className="mt-3 space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-900 font-black">
                              £{camp.raisedAmount.toLocaleString()}
                            </span>
                            <span className="text-slate-500">
                              Target: £{camp.targetAmount.toLocaleString()}
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-magenta to-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, camp.percentage)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                        <span className="text-magenta font-bold">{camp.percentage}% reached</span>
                        <span>{camp.donorsCount} direct {camp.donorsCount === 1 ? "gift" : "gifts"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TWO COLUMN GRID: Donation Trends & Pending Beneficiary Requests */}
              <div className="admin-grid-1-2col mb-8">
                {/* SECTION 4: Donation trends */}
                <div className="admin-card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Donation Trends
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Distribution of charitable gifts.
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-magenta flex items-center justify-center">
                      <TrendingUp size={16} />
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Gift Breakdown
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div>
                          <div className="text-xs text-slate-600 font-medium">One-Time Gifts</div>
                          <div className="text-base font-black text-slate-900">
                            £{Number(sections?.donationTrends?.oneOffTotal || 0).toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-600 font-medium">Monthly Subscriptions</div>
                          <div className="text-base font-black text-slate-900">
                            £{Number(sections?.donationTrends?.recurringTotal || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1 tracking-wider">
                        <Check size={12} className="text-emerald-600" />
                        <span>HMRC Gift Aid Reclaim (+25%)</span>
                      </div>
                      <div className="text-xl font-black text-emerald-800 mt-1">
                        £{Number(sections?.donationTrends?.giftAidTaxReclaimed || 0).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-emerald-700/80 mt-1">
                        Claimed under s.414 ITA 2007 for Leicestershire community services.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Processed Transactions
                      </div>
                      <div className="text-lg font-black text-slate-900 mt-1">
                        {sections?.donationTrends?.totalCompletedGifts || 0} Successful Transactions
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Directly recorded in official ledger
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Pending beneficiary requests */}
                <div className="admin-card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">
                        Pending Beneficiary Requests
                      </h2>
                      <p className="text-xs text-gray-500">
                        Community assistance applications pending caseworker approval.
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {sections?.pendingBeneficiaryRequests?.length || 0} Awaiting Action
                    </span>
                  </div>

                  {sections?.pendingBeneficiaryRequests?.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-xs">
                      No pending beneficiary requests.
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {sections?.pendingBeneficiaryRequests?.map((req) => {
                        const isEmergency = req.urgency === "EMERGENCY";
                        const isHigh = req.urgency === "HIGH";

                        return (
                          <div
                            key={req.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              isEmergency
                                ? "bg-red-50/50 border-red-200"
                                : isHigh
                                ? "bg-amber-50/50 border-amber-200"
                                : "bg-gray-50/50 border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-sm text-gray-900">
                                  {req.fullName}
                                </span>
                                <span className="text-xs text-gray-500">
                                  (Household: {req.householdSize})
                                </span>
                                {req.contactPhone && (
                                  <span className="text-xs font-mono text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                                    <PhoneCall size={11} className="text-magenta" />
                                    {req.contactPhone}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                    isEmergency
                                      ? "bg-red-600 text-white"
                                      : isHigh
                                      ? "bg-amber-500 text-white"
                                      : "bg-blue-600 text-white"
                                  }`}
                                >
                                  {req.urgency}
                                </span>
                                <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-full border">
                                  {req.status}
                                </span>
                              </div>
                            </div>

                            <div className="text-xs font-bold text-magenta mb-1">
                              {req.serviceType}
                            </div>

                            {req.notes && (
                              <p className="text-xs text-gray-600 mb-3 bg-white/80 p-2.5 rounded-xl border border-gray-100">
                                {req.notes}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 text-xs">
                              <span className="text-[10px] text-gray-400">
                                Received: {new Date(req.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                              </span>

                              <div className="flex items-center gap-2">
                                {req.status === "PENDING" && (
                                  <>
                                    <button
                                      type="button"
                                      disabled={updatingRequestId === req.id}
                                      onClick={() => handleUpdateRequestStatus(req.id, "IN_PROGRESS")}
                                      className="px-3 py-1 rounded-lg border text-xs font-bold bg-white text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                      Assign Caseworker
                                    </button>
                                    <button
                                      type="button"
                                      disabled={updatingRequestId === req.id}
                                      onClick={() => handleUpdateRequestStatus(req.id, "APPROVED")}
                                      className="btn-3d-magenta px-3 py-1 rounded-lg text-xs font-bold text-white cursor-pointer shadow-sm"
                                    >
                                      Approve Relief
                                    </button>
                                  </>
                                )}
                                {req.status === "IN_PROGRESS" && (
                                  <button
                                    type="button"
                                    disabled={updatingRequestId === req.id}
                                    onClick={() => handleUpdateRequestStatus(req.id, "APPROVED")}
                                    className="btn-3d-magenta px-3 py-1 rounded-lg text-xs font-bold text-white cursor-pointer shadow-sm"
                                  >
                                    Complete &amp; Deliver Relief
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: DONOR MANAGEMENT (DONOR CRM)                                      */}
          {/* ========================================================================= */}
          {activeTab === "donors" && (
            <div className="space-y-6">
              {/* CRM Header & Action Toolbar */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 text-magenta">
                      CRM System
                    </span>
                    <span className="text-xs font-bold text-gray-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      {donors.length} Donors Recorded
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                    Donor Management
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Manage supporter profiles, lifetime contributions, assigned tiers, and communication consent.
                  </p>
                </div>

                <div
                  className="admin-crm-header-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowAddDonorModal(true)}
                    className="btn-3d-magenta px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <UserPlus size={15} />
                    <span>Add New Donor</span>
                  </button>
                </div>
              </div>

              {/* CRM KPI Metrics Summary Bar */}
              <div className="admin-kpi-grid" style={{ marginBottom: "1.75rem" }}>
                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Total Registered Donors
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {donors.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Active registered accounts
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Total Contributed
                  </div>
                  <div className="text-2xl font-black text-magenta mt-1">
                    £{totalCrmDonated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    Direct charitable gifts
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Newsletter Consent Rate
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {newsletterPercentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {totalCrmNewsletterOptIn} of {donors.length} opted in
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Active Tiers Breakdown
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1.5 flex flex-wrap gap-1.5">
                    {["SUPPORTER", "BRONZE", "SILVER", "GOLD", "PLATINUM"].map((t) => {
                      const count = donors.filter((d) => d.donationTier === t).length;
                      if (count === 0) return null;
                      return (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {t.charAt(0) + t.slice(1).toLowerCase()}: {count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SEARCH, FILTER & SORT TOOLBAR */}
              <div className="admin-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ marginBottom: "1.75rem" }}>
                {/* Search Bar */}
                <div className="admin-search-wrapper">
                  <Search size={15} className="admin-search-icon" />
                  <input
                    type="text"
                    placeholder="Search donors by name, email, or phone..."
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    className="admin-search-input"
                  />
                  {crmSearch && (
                    <button
                      type="button"
                      onClick={() => setCrmSearch("")}
                      className="admin-search-clear"
                      title="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Tier Filter */}
                  <select
                    value={crmTierFilter}
                    onChange={(e) => setCrmTierFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Tiers</option>
                    <option value="SUPPORTER">Supporter (&lt;£100)</option>
                    <option value="BRONZE">Bronze (£100+)</option>
                    <option value="SILVER">Silver (£250+)</option>
                    <option value="GOLD">Gold (£500+)</option>
                    <option value="PLATINUM">Platinum (£1,000+)</option>
                  </select>

                  {/* Communication Consent Filter */}
                  <select
                    value={crmConsentFilter}
                    onChange={(e) => setCrmConsentFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Consent Statuses</option>
                    <option value="OPTED_IN">Newsletter Consented</option>
                    <option value="OPTED_OUT">Newsletter Opted Out</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    value={crmSortBy}
                    onChange={(e) => setCrmSortBy(e.target.value)}
                    className="admin-select"
                  >
                    <option value="TOTAL_DESC">Highest Donated (£ High-Low)</option>
                    <option value="TOTAL_ASC">Lowest Donated (£ Low-High)</option>
                    <option value="RECENT">Recently Donated</option>
                    <option value="NAME_ASC">Name (A-Z)</option>
                    <option value="NAME_DESC">Name (Z-A)</option>
                    <option value="DATE_JOINED">Date Joined (Newest)</option>
                  </select>

                  {(crmSearch || crmTierFilter !== "ALL" || crmConsentFilter !== "ALL") && (
                    <button
                      type="button"
                      onClick={() => {
                        setCrmSearch("");
                        setCrmTierFilter("ALL");
                        setCrmConsentFilter("ALL");
                        setCrmSortBy("TOTAL_DESC");
                      }}
                      className="px-2.5 py-2 text-xs font-bold text-magenta hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* DONORS TABLE */}
              <div className="admin-card overflow-hidden">
                {donorsLoading ? (
                  <div className="p-16 text-center text-xs text-gray-500 flex flex-col items-center justify-center gap-2">
                    <RefreshCw size={24} className="animate-spin text-magenta" />
                    <span>Loading registered donors...</span>
                  </div>
                ) : filteredDonors.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <Users size={36} className="mx-auto mb-2 text-gray-300" />
                    <h3 className="text-sm font-bold text-gray-700">No matching donors found</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Try clearing your search query or adjusting active filters.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="admin-table w-full text-left text-xs">
                      <thead>
                        <tr>
                          <th>Donor Name &amp; Contact</th>
                          <th>Location</th>
                          <th>Giving Tier</th>
                          <th className="text-right">Total Donated</th>
                          <th>Most Recent Gift</th>
                          <th className="text-center">Newsletter Consent</th>
                          <th className="text-right">CRM Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDonors.map((donor) => {
                          const initial = donor.fullName?.charAt(0) || "D";
                          const total = Number(donor.totalDonated || 0);

                          return (
                            <tr key={donor.id}>
                              {/* Name & Email */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="admin-avatar">{initial}</div>
                                  <div>
                                    <div className="font-extrabold text-gray-900 text-sm flex items-center gap-1.5">
                                      <span>{donor.fullName}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-500 font-mono">
                                      {donor.email}
                                    </div>
                                    {donor.phoneNumber && (
                                      <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                        <PhoneCall size={10} className="text-gray-400" />
                                        <span>{donor.phoneNumber}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Location */}
                              <td className="py-3.5 px-4 text-gray-600">
                                <div className="font-semibold">
                                  {donor.townCity || "Leicester"}
                                </div>
                                <div className="text-[11px] text-gray-400">
                                  {donor.postcode || "United Kingdom"}
                                </div>
                              </td>

                              {/* Giving Tier */}
                              <td className="py-3.5 px-4">
                                <DonorTierBadge tier={donor.donationTier || "SUPPORTER"} />
                              </td>

                              {/* Total Amount Donated */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="font-black text-sm text-gray-900">
                                  £{total.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-gray-400">
                                  {donor.donationsCount || donor.donations?.length || 0} direct {donor.donationsCount === 1 ? "gift" : "gifts"}
                                </div>
                              </td>

                              {/* Most Recent Donation */}
                              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                                {donor.lastDonationDate ? (
                                  <>
                                    <div className="font-semibold text-gray-800">
                                      {new Date(donor.lastDonationDate).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                      })}
                                    </div>
                                    <div className="text-[10px] text-emerald-600 font-bold">
                                      Verified Contribution
                                    </div>
                                  </>
                                ) : (
                                  <span className="text-[11px] text-gray-400 italic">No gifts yet</span>
                                )}
                              </td>

                              {/* Newsletter Consent */}
                              <td className="py-3.5 px-4 text-center">
                                {donor.emailNewsletter ? (
                                  <span className="admin-consent-opted-in">
                                    <Check size={11} />
                                    <span>Consented</span>
                                  </span>
                                ) : (
                                  <span className="admin-consent-opted-out">
                                    <span>Opted Out</span>
                                  </span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* View Profile & History */}
                                  <button
                                    type="button"
                                    onClick={() => setViewingDonor(donor)}
                                    title="View full donor profile & history"
                                    className="admin-action-btn"
                                  >
                                    <Eye size={14} />
                                  </button>

                                  {/* Record Donation */}
                                  <button
                                    type="button"
                                    onClick={() => openRecordDonation(donor)}
                                    title="Record new donation (auto-updates total & tier)"
                                    className="admin-action-btn admin-action-btn-primary"
                                  >
                                    <Plus size={14} />
                                  </button>

                                  {/* Edit Donor */}
                                  <button
                                    type="button"
                                    onClick={() => openEditDonor(donor)}
                                    title="Edit donor details & consent"
                                    className="admin-action-btn"
                                  >
                                    <Edit size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

                    {/* ========================================================================= */}
          {/* TAB 5: BENEFICIARY MANAGEMENT (Zero Mock - 100% Live PostgreSQL)          */}
          {/* ========================================================================= */}
          {activeTab === "beneficiaries" && (
            <div className="space-y-6">
              {/* Header & Far-Right Action Buttons */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.25rem",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-magenta bg-pink-50 border border-pink-200/80 px-2.5 py-0.5 rounded-full">
                      CASEWORK SYSTEM &bull; {beneficiariesList.length} Beneficiaries Recorded
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Beneficiary Management
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Oversee registered beneficiaries, triage assistance requests, assign advocates, review case files, and track welfare outcomes.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleExportBeneficiariesCsv}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-sm transition-all cursor-pointer"
                    title="Export beneficiary directory to CSV"
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetAddBeneficiaryForm();
                      setShowAddBeneficiaryModal(true);
                    }}
                    className="btn-3d-magenta px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: "#E6127E",
                      color: "#ffffff",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                    }}
                    title="Register a new individual or organisation beneficiary"
                  >
                    <Plus size={15} />
                    <span>+ Add New Beneficiary</span>
                  </button>
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                style={{ marginBottom: "1.75rem" }}
              >
                {/* 1. Total Beneficiaries */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                      Total Beneficiaries
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        minHeight: "36px",
                        borderRadius: "10px",
                        backgroundColor: "#FDF2F8",
                        border: "1px solid #FCE7F3",
                        color: "#E6127E",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Users size={18} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "26px", fontWeight: 900, color: "#0F172A", lineHeight: 1.2 }}>
                      {totalBeneficiariesKpi}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                      Active registered accounts
                    </div>
                  </div>
                </div>

                {/* 2. Pending Applications */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                      Pending Applications
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        minHeight: "36px",
                        borderRadius: "10px",
                        backgroundColor: "#FFFBEB",
                        border: "1px solid #FEF3C7",
                        color: "#D97706",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={18} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "26px", fontWeight: 900, color: "#D97706", lineHeight: 1.2 }}>
                      {pendingRequestsKpi}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                      Awaiting review &amp; triage
                    </div>
                  </div>
                </div>

                {/* 3. In Progress Casework */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                      Active Casework
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        minHeight: "36px",
                        borderRadius: "10px",
                        backgroundColor: "#EFF6FF",
                        border: "1px solid #DBEAFE",
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <HeartHandshake size={18} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "26px", fontWeight: 900, color: "#2563EB", lineHeight: 1.2 }}>
                      {inProgressRequestsKpi}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                      Assigned to advocates
                    </div>
                  </div>
                </div>

                {/* 4. Approved & Resolved */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                      Approved Relief
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        minHeight: "36px",
                        borderRadius: "10px",
                        backgroundColor: "#ECFDF5",
                        border: "1px solid #D1FAE5",
                        color: "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ShieldCheck size={18} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "26px", fontWeight: 900, color: "#059669", lineHeight: 1.2 }}>
                      {approvedRequestsKpi}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                      Assistance successfully dispatched
                    </div>
                  </div>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "14px 18px",
                  border: "1.5px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Search input with integrated icon container (NO overlap) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 14px",
                    height: "42px",
                    backgroundColor: "#F8FAFC",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    flex: 1,
                    minWidth: "260px",
                  }}
                >
                  <Search size={16} style={{ color: "#94A3B8", flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search beneficiaries by name, email, phone, Leicester address, or advocate..."
                    value={beneficiarySearchQuery}
                    onChange={(e) => setBeneficiarySearchQuery(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      fontSize: "13px",
                      width: "100%",
                      color: "#0F172A",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  {/* Account Status Filter */}
                  <select
                    value={beneficiaryAccountStatusFilter}
                    onChange={(e) => setBeneficiaryAccountStatusFilter(e.target.value)}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#334155",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="ALL">All Account Statuses</option>
                    <option value="ACTIVE">Active Accounts</option>
                    <option value="INACTIVE">Deactivated Accounts</option>
                  </select>

                  {/* Application Status Filter */}
                  <select
                    value={beneficiaryRequestStatusFilter}
                    onChange={(e) => setBeneficiaryRequestStatusFilter(e.target.value)}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#334155",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="ALL">All Application Statuses</option>
                    <option value="PENDING">Pending Triage</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>

                  {/* Urgency Filter */}
                  <select
                    value={beneficiaryUrgencyFilter}
                    onChange={(e) => setBeneficiaryUrgencyFilter(e.target.value)}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#334155",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="ALL">All Urgency Levels</option>
                    <option value="EMERGENCY">Emergency Priority</option>
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>

                  {/* Sort By */}
                  <select
                    value={beneficiarySortBy}
                    onChange={(e) => setBeneficiarySortBy(e.target.value)}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#334155",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="NEWEST">Newest Registered</option>
                    <option value="OLDEST">Oldest Registered</option>
                    <option value="NAME_ASC">Name (A &rarr; Z)</option>
                    <option value="NAME_DESC">Name (Z &rarr; A)</option>
                    <option value="URGENCY_DESC">Highest Urgency First</option>
                  </select>

                  {/* Reset Filters */}
                  {(beneficiarySearchQuery ||
                    beneficiaryAccountStatusFilter !== "ALL" ||
                    beneficiaryRequestStatusFilter !== "ALL" ||
                    beneficiaryUrgencyFilter !== "ALL" ||
                    beneficiaryAdvocateFilter !== "ALL") && (
                    <button
                      type="button"
                      onClick={() => {
                        setBeneficiarySearchQuery("");
                        setBeneficiaryAccountStatusFilter("ALL");
                        setBeneficiaryRequestStatusFilter("ALL");
                        setBeneficiaryUrgencyFilter("ALL");
                        setBeneficiaryAdvocateFilter("ALL");
                        setBeneficiarySortBy("NEWEST");
                      }}
                      style={{
                        height: "42px",
                        padding: "0 14px",
                        borderRadius: "12px",
                        border: "1.5px solid #FBCFE8",
                        backgroundColor: "#FFF5F9",
                        color: "#E6127E",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Beneficiaries Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1.5px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  marginBottom: "2.5rem",
                }}
              >
                {beneficiariesLoading ? (
                  <div className="p-12 text-center text-slate-500 text-xs">
                    <RefreshCw size={24} className="animate-spin text-magenta mx-auto mb-2" />
                    <span>Loading beneficiary records...</span>
                  </div>
                ) : filteredBeneficiaries.length === 0 ? (
                  <div className="p-12 text-center">
                    <Users size={32} className="text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-800">
                      No Beneficiaries Found
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      No beneficiary profiles match your current search criteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        resetAddBeneficiaryForm();
                        setShowAddBeneficiaryModal(true);
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-pink-50 text-magenta text-xs font-bold hover:bg-pink-100 transition-colors cursor-pointer"
                    >
                      + Add New Beneficiary
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto", width: "100%" }}>
                    <table
                      style={{
                        width: "100%",
                        minWidth: "1080px",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        fontSize: "12px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#F8FAFC",
                            borderBottom: "1.5px solid #E2E8F0",
                            fontSize: "11px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748B",
                          }}
                        >
                          <th style={{ padding: "14px 16px", width: "22%" }}>Beneficiary &amp; Contact</th>
                          <th style={{ padding: "14px 16px", width: "15%" }}>Location &amp; Household</th>
                          <th style={{ padding: "14px 16px", width: "11%" }}>Account Status</th>
                          <th style={{ padding: "14px 16px", width: "15%" }}>Assigned Advocate</th>
                          <th style={{ padding: "14px 16px", width: "18%" }}>Latest Application &amp; Needs</th>
                          <th style={{ padding: "14px 16px", width: "7%", textAlign: "center" }}>Case Files</th>
                          <th
                            style={{
                              padding: "14px 16px",
                              width: "160px",
                              minWidth: "160px",
                              textAlign: "center",
                              position: "sticky",
                              right: 0,
                              backgroundColor: "#F8FAFC",
                              boxShadow: "-4px 0 8px -2px rgba(0, 0, 0, 0.08)",
                              borderLeft: "1px solid #E2E8F0",
                              zIndex: 2,
                            }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredBeneficiaries.map((b) => {
                          const latestReq = b.beneficiaryRequests?.[0];
                          const docsCount = b.documents?.length || 0;
                          const commsCount = b.communicationLogs?.length || 0;
                          const isOrg = b.documents?.some(d => d.type?.toLowerCase().includes("organisation") || (d as any).metadata?.beneficiaryType === "ORGANISATION") || (b.emergencyContact?.startsWith("Contact:"));

                          return (
                            <tr key={b.id} className="hover:bg-pink-50/20 transition-colors">
                              {/* 1. Beneficiary & Contact */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      minWidth: "40px",
                                      minHeight: "40px",
                                      borderRadius: "12px",
                                      backgroundColor: isOrg ? "#4F46E5" : "#E6127E",
                                      color: "#ffffff",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "14px",
                                      fontWeight: 800,
                                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {isOrg ? <Building2 size={18} /> : b.fullName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>
                                        {b.fullName}
                                      </span>
                                      {isOrg ? (
                                        <span
                                          style={{
                                            fontSize: "9px",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            padding: "2px 6px",
                                            borderRadius: "6px",
                                            backgroundColor: "#EEF2FF",
                                            color: "#4338CA",
                                            border: "1px solid #C7D2FE",
                                          }}
                                        >
                                          Organisation
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "9px",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            padding: "2px 6px",
                                            borderRadius: "6px",
                                            backgroundColor: "#FDF2F8",
                                            color: "#BE185D",
                                            border: "1px solid #FBCFE8",
                                          }}
                                        >
                                          Individual
                                        </span>
                                      )}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#64748B", fontFamily: "monospace", marginTop: "2px" }}>
                                      {b.email}
                                    </div>
                                    {b.phoneNumber && (
                                      <div style={{ fontSize: "11px", color: "#64748B", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                                        <PhoneCall size={10} style={{ color: "#94A3B8" }} />
                                        <span>{b.phoneNumber}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* 2. Location & Household */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}>
                                  {b.townCity || "Leicester"}
                                </div>
                                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                                  {b.postcode || b.address || "United Kingdom"}
                                </div>
                                {b.emergencyContact && (
                                  <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: "2px", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={b.emergencyContact}>
                                    ICE: {b.emergencyContact}
                                  </div>
                                )}
                              </td>

                              {/* 3. Account Status with Toggle */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <button
                                  type="button"
                                  onClick={() => handleToggleBeneficiaryActive(b, !b.active)}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                  }}
                                  title="Click to toggle account activation status"
                                >
                                  {b.active ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        fontSize: "10px",
                                        fontWeight: 800,
                                        backgroundColor: "#ECFDF5",
                                        color: "#047857",
                                        border: "1px solid #A7F3D0",
                                      }}
                                    >
                                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }}></span>
                                      Active Account
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        fontSize: "10px",
                                        fontWeight: 800,
                                        backgroundColor: "#F1F5F9",
                                        color: "#64748B",
                                        border: "1px solid #CBD5E1",
                                      }}
                                    >
                                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#94A3B8" }}></span>
                                      Deactivated
                                    </span>
                                  )}
                                </button>
                              </td>

                              {/* 4. Assigned Advocate */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                  {b.assignedAdvocate ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "5px 10px",
                                        borderRadius: "8px",
                                        backgroundColor: "#FFF5F9",
                                        border: "1px solid #FBCFE8",
                                        color: "#E6127E",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",
                                      }}
                                      title={b.assignedAdvocate}
                                    >
                                      <HeartHandshake size={13} style={{ flexShrink: 0 }} />
                                      <span>{b.assignedAdvocate.split("(")[0].trim()}</span>
                                    </span>
                                  ) : (
                                    <span style={{ fontSize: "11px", color: "#94A3B8", fontStyle: "italic" }}>
                                      Unassigned
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAssigningAdvocateBeneficiary(b);
                                      setSelectedAdvocateValue(b.assignedAdvocate || "Sarah Davies (Senior Crisis Caseworker)");
                                    }}
                                    style={{
                                      padding: "5px",
                                      borderRadius: "6px",
                                      border: "1px solid #E2E8F0",
                                      backgroundColor: "#FFFFFF",
                                      color: "#64748B",
                                      cursor: "pointer",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    title="Assign or change advocate"
                                  >
                                    <Edit size={12} />
                                  </button>
                                </div>
                              </td>

                              {/* 5. Latest Application & Needs */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                {latestReq ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <div
                                      style={{
                                        fontWeight: 700,
                                        fontSize: "12px",
                                        color: "#0F172A",
                                        maxWidth: "200px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                      title={latestReq.serviceType}
                                    >
                                      {latestReq.serviceType}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                                      {/* Urgency Badge (Full, completely visible, no cutting off!) */}
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          padding: "2px 8px",
                                          borderRadius: "6px",
                                          fontSize: "10px",
                                          fontWeight: 800,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.5px",
                                          lineHeight: "14px",
                                          backgroundColor:
                                            latestReq.urgency === "EMERGENCY"
                                              ? "#FEF2F2"
                                              : latestReq.urgency === "HIGH"
                                              ? "#FFF7ED"
                                              : latestReq.urgency === "MEDIUM"
                                              ? "#FFFBEB"
                                              : "#F1F5F9",
                                          color:
                                            latestReq.urgency === "EMERGENCY"
                                              ? "#B91C1C"
                                              : latestReq.urgency === "HIGH"
                                              ? "#C2410C"
                                              : latestReq.urgency === "MEDIUM"
                                              ? "#B45309"
                                              : "#475569",
                                          border: `1px solid ${
                                            latestReq.urgency === "EMERGENCY"
                                              ? "#FECACA"
                                              : latestReq.urgency === "HIGH"
                                              ? "#FED7AA"
                                              : latestReq.urgency === "MEDIUM"
                                              ? "#FDE68A"
                                              : "#E2E8F0"
                                          }`,
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {latestReq.urgency}
                                      </span>

                                      {/* Status Badge */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReviewingRequestItem({ beneficiary: b, request: latestReq });
                                          setReviewStatusValue(latestReq.status);
                                          setReviewNotesValue(latestReq.reviewNotes || latestReq.notes || "");
                                        }}
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          padding: "2px 8px",
                                          borderRadius: "6px",
                                          fontSize: "10px",
                                          fontWeight: 700,
                                          cursor: "pointer",
                                          backgroundColor:
                                            latestReq.status === "APPROVED"
                                              ? "#ECFDF5"
                                              : latestReq.status === "IN_PROGRESS"
                                              ? "#EFF6FF"
                                              : latestReq.status === "REJECTED"
                                              ? "#FEF2F2"
                                              : "#FFFBEB",
                                          color:
                                            latestReq.status === "APPROVED"
                                              ? "#047857"
                                              : latestReq.status === "IN_PROGRESS"
                                              ? "#1D4ED8"
                                              : latestReq.status === "REJECTED"
                                              ? "#B91C1C"
                                              : "#B45309",
                                          border: `1px solid ${
                                            latestReq.status === "APPROVED"
                                              ? "#A7F3D0"
                                              : latestReq.status === "IN_PROGRESS"
                                              ? "#BFDBFE"
                                              : latestReq.status === "REJECTED"
                                              ? "#FECACA"
                                              : "#FDE68A"
                                          }`,
                                          whiteSpace: "nowrap",
                                        }}
                                        title="Click to review and triage application"
                                      >
                                        <span>
                                          {latestReq.status === "APPROVED"
                                            ? "Approved"
                                            : latestReq.status === "IN_PROGRESS"
                                            ? "In Progress"
                                            : latestReq.status === "REJECTED"
                                            ? "Rejected"
                                            : "Pending Triage"}
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <span style={{ color: "#94A3B8", fontStyle: "italic", fontSize: "11px" }}>
                                    No active requests
                                  </span>
                                )}
                              </td>

                              {/* 6. Case Files & Comms Count */}
                              <td style={{ padding: "14px 16px", textAlign: "center", verticalAlign: "middle" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      backgroundColor: "#F1F5F9",
                                      color: "#334155",
                                      border: "1px solid #CBD5E1",
                                    }}
                                    title="Verified case documents stored"
                                  >
                                    <FileText size={11} style={{ color: "#64748B" }} />
                                    <span>{docsCount}</span>
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      backgroundColor: "#FFF5F9",
                                      color: "#E6127E",
                                      border: "1px solid #FBCFE8",
                                    }}
                                    title="Casework interaction logs recorded"
                                  >
                                    <PhoneCall size={11} style={{ color: "#E6127E" }} />
                                    <span>{commsCount}</span>
                                  </span>
                                </div>
                              </td>

                              {/* 7. Actions */}
                              <td
                                style={{
                                  padding: "14px 16px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  position: "sticky",
                                  right: 0,
                                  backgroundColor: "#FFFFFF",
                                  boxShadow: "-4px 0 8px -2px rgba(0, 0, 0, 0.08)",
                                  borderLeft: "1px solid #F1F5F9",
                                  zIndex: 1,
                                }}
                              >
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                                  {/* View Full Profile */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setViewingBeneficiary(b);
                                      setBeneficiaryActiveTabModal("OVERVIEW");
                                    }}
                                    title="View comprehensive profile & history"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "8px",
                                      border: "1px solid #E2E8F0",
                                      backgroundColor: "#FFFFFF",
                                      color: "#475569",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Eye size={13} />
                                  </button>

                                  {/* Review & Approve Application - ONLY shown for beneficiaries requiring approval (e.g. self-registered / pending) */}
                                  {latestReq && (latestReq.status === "PENDING" || !b.active) && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReviewingRequestItem({ beneficiary: b, request: latestReq });
                                        setReviewStatusValue("APPROVED");
                                        setReviewNotesValue(latestReq.reviewNotes || latestReq.notes || "");
                                      }}
                                      title="Review & Approve Pending Application"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "8px",
                                        border: "1.5px solid #FCD34D",
                                        backgroundColor: "#FEF3C7",
                                        color: "#D97706",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      className="hover:bg-amber-400 hover:text-white transition-colors"
                                    >
                                      <Check size={13} />
                                    </button>
                                  )}

                                  {/* Edit Info */}
                                  <button
                                    type="button"
                                    onClick={() => openEditBeneficiary(b)}
                                    title="Edit details"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "8px",
                                      border: "1px solid #E2E8F0",
                                      backgroundColor: "#FFFFFF",
                                      color: "#475569",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Edit size={13} />
                                  </button>

                                  {/* Delete Beneficiary */}
                                  <button
                                    type="button"
                                    onClick={() => setDeletingBeneficiary(b)}
                                    title={`Delete ${b.fullName} permanently`}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "8px",
                                      border: "1.5px solid #FCA5A5",
                                      backgroundColor: "#FEF2F2",
                                      color: "#DC2626",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                      transition: "all 0.15s ease",
                                    }}
                                    className="hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 shadow-sm"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}


          
          {/* ========================================================================= */}
          {/* TAB 6: FUND ALLOCATION & ASSISTANCE DISBURSEMENT (Zero Mock - PostgreSQL) */}
          {/* ========================================================================= */}
          {activeTab === "allocations" && (
            <div className="space-y-6">
              {/* Header & Far-Right Action Buttons */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.25rem",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-magenta bg-pink-50 border border-pink-200/80 px-2.5 py-0.5 rounded-full">
                      FINANCIAL GOVERNANCE &bull; {allocationsList.length} Allocation Records
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Fund Allocation &amp; Assistance Management
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Track incoming charitable donations, allocate relief budgets to beneficiaries, and record verified disbursements with strict financial separation.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleExportAllocationsCsv}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-sm transition-all cursor-pointer"
                    title="Export financial allocation ledger to CSV"
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={openCreateCategoryModal}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm"
                    style={{
                      height: "42px",
                      backgroundColor: "#FFFFFF",
                      color: "#E6127E",
                      border: "2px solid #E6127E",
                      fontWeight: 800,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "12px",
                      padding: "0 16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Plus size={15} />
                    <span>+ Add Support Category</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateAllocationModal(true);
                      setAllocBeneficiaryMode("EXISTING");
                      if (beneficiariesList.length > 0) {
                        setAllocSelectedBeneficiaryId(beneficiariesList[0].id);
                      }
                      if (supportCategoriesList.length > 0 && !allocCategoryId) {
                        setAllocCategoryId(supportCategoriesList[0].id);
                        setAllocAssistanceType(supportCategoriesList[0].name);
                      }
                    }}
                    className="admin-btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer transition-all shadow-md"
                    style={{
                      height: "42px",
                      backgroundColor: "#E6127E",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "12px",
                      padding: "0 18px",
                      boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Wallet size={15} />
                    <span>+ Allocate Funds</span>
                  </button>
                </div>
              </div>

              {/* Top 4 Performance & Financial Tracking Cards (Strict 3 Amounts Separation) */}
              <div
                className="admin-kpi-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                {/* 1. REQUIRED FUNDING - Target Set by Admin */}
                <div className="admin-card p-4 flex flex-col justify-between" style={{ borderLeft: "4px solid #A855F7" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      1. Required Funding Target
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                      <Layers size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-purple-900 mt-1">
                      £{Number(allocationsFinancialSummary.totalFundingRequired || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-purple-700 mt-0.5 font-medium">
                      Admin targets across {supportCategoriesList.length} support categories
                    </div>
                  </div>
                </div>

                {/* 2. ALLOCATED FUNDING - Assigned to Beneficiaries */}
                <div className="admin-card p-4 flex flex-col justify-between" style={{ borderLeft: "4px solid #3B82F6" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      2. Allocated to Beneficiaries
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Wallet size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-blue-600 mt-1">
                      £{Number(allocationsFinancialSummary.totalAllocated || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Assigned to {allocationsList.filter(a => a.status !== "CANCELLED").length} active welfare grants
                    </div>
                  </div>
                </div>

                {/* 3. DISTRIBUTED FUNDING - Actually Provided to Beneficiaries */}
                <div className="admin-card p-4 flex flex-col justify-between" style={{ borderLeft: "4px solid #10B981" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      3. Actually Distributed
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600 mt-1">
                      £{Number(allocationsFinancialSummary.totalDistributed || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Verified disbursed &amp; handed over
                    </div>
                  </div>
                </div>

                {/* 4. TOTAL DONATIONS RECEIVED & RESERVES */}
                <div className="admin-card p-4 flex flex-col justify-between" style={{ borderLeft: "4px solid #E6127E" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-magenta bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      Donation Reserves
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-magenta">
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 mt-1">
                      £{Number(allocationsFinancialSummary.totalDonationsReceived || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Unallocated reserves: £{Number(allocationsFinancialSummary.netAvailableReserves || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Navigation Switcher: Allocations Ledger vs Support Categories */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 w-fit mb-6">
                <button
                  type="button"
                  onClick={() => setAllocationsSubTab("ledger")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    allocationsSubTab === "ledger"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                  style={{
                    border: allocationsSubTab === "ledger" ? "1px solid #E2E8F0" : "1px solid transparent",
                  }}
                >
                  <Wallet size={15} className={allocationsSubTab === "ledger" ? "text-magenta" : "text-slate-400"} />
                  <span>Allocations &amp; Distribution Ledger</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      allocationsSubTab === "ledger"
                        ? "bg-pink-50 text-magenta border border-pink-200"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {allocationsList.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAllocationsSubTab("categories")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    allocationsSubTab === "categories"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                  style={{
                    border: allocationsSubTab === "categories" ? "1px solid #E2E8F0" : "1px solid transparent",
                  }}
                >
                  <Layers size={15} className={allocationsSubTab === "categories" ? "text-magenta" : "text-slate-400"} />
                  <span>Support Categories &amp; Funding Targets</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      allocationsSubTab === "categories"
                        ? "bg-pink-50 text-magenta border border-pink-200"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {supportCategoriesList.length}
                  </span>
                </button>
              </div>

              {/* ============================================================= */}
              {/* VIEW 1: SUPPORT CATEGORIES SECTION (Admin Dynamic Categories) */}
              {/* ============================================================= */}
              {allocationsSubTab === "categories" && (
                <div className="space-y-6">
                  {/* Category Toolbar */}
                  <div
                    className="admin-card p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm border border-slate-200/80 rounded-2xl bg-white"
                  >
                    <div className="relative flex-1" style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#94A3B8",
                          display: "flex",
                          alignItems: "center",
                          pointerEvents: "none",
                          zIndex: 2,
                        }}
                      >
                        <Search size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Search support categories by name or description..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        style={{
                          width: "100%",
                          height: "46px",
                          minHeight: "46px",
                          paddingLeft: "48px",
                          paddingRight: "16px",
                          fontSize: "13px",
                          color: "#0F172A",
                          backgroundColor: "#F8FAFC",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={openCreateCategoryModal}
                        style={{
                          height: "46px",
                          backgroundColor: "#E6127E",
                          color: "#FFFFFF",
                          fontWeight: 800,
                          fontSize: "13px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "14px",
                          padding: "0 22px",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 14px rgba(230, 18, 126, 0.25)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Plus size={16} />
                        <span>+ Add Category</span>
                      </button>
                    </div>
                  </div>

                  {/* Categories Grid */}
                  {categoriesLoading ? (
                    <div className="admin-card p-12 text-center text-slate-500 text-xs rounded-2xl bg-white border border-slate-200">
                      <RefreshCw size={24} className="animate-spin text-magenta mx-auto mb-2" />
                      <span>Loading support categories...</span>
                    </div>
                  ) : filteredCategories.length === 0 ? (
                    <div className="admin-card p-12 text-center rounded-2xl bg-white border border-slate-200">
                      <Layers size={36} className="text-slate-300 mx-auto mb-3" />
                      <h3 className="text-base font-black text-slate-900">No Support Categories Found</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Create your first custom support category with funding targets (e.g. Medical Assistance – £10,000).
                      </p>
                      <button
                        type="button"
                        onClick={openCreateCategoryModal}
                        className="mt-4 px-4 py-2.5 rounded-xl bg-magenta text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
                      >
                        <Plus size={14} />
                        <span>Create Support Category</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                        gap: "1.5rem",
                      }}
                    >
                      {filteredCategories.map((cat) => {
                        const target = Number(cat.targetFundingRequired || 0);
                        const allocated = Number(cat.totalAllocated || 0);
                        const distributed = Number(cat.totalDistributed || 0);
                        const remaining = Number(cat.remainingFundingNeeded || Math.max(0, target - allocated));
                        const allocPct = target > 0 ? Math.min(100, Math.round((allocated / target) * 100)) : 0;
                        const distPct = target > 0 ? Math.min(100, Math.round((distributed / target) * 100)) : 0;

                        return (
                          <div
                            key={cat.id}
                            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
                            style={{
                              position: "relative",
                            }}
                          >
                            {/* Card Header & Badges */}
                            <div>
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0" style={{ flex: 1 }}>
                                  <div
                                    className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-magenta flex-shrink-0 shadow-sm"
                                  >
                                    <Layers size={18} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Active
                                      </span>
                                      <span className="text-[11px] font-bold text-slate-500">
                                        {cat.allocationCount || 0} {cat.allocationCount === 1 ? 'grant' : 'grants'}
                                      </span>
                                    </div>
                                    <h3
                                      className="text-base font-black text-slate-900 tracking-tight truncate leading-snug"
                                      title={cat.name}
                                    >
                                      {cat.name}
                                    </h3>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => openEditCategoryModal(cat)}
                                    title="Edit category details and funding target"
                                    className="w-8 h-8 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeletingCategory(cat)}
                                    title="Delete category"
                                    className="w-8 h-8 rounded-lg border border-rose-200 hover:border-rose-300 bg-rose-50/70 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
                                {cat.description || "Charitable crisis relief and direct assistance category established by Trust administrators."}
                              </p>

                              {/* THE 3 STRICTLY SEPARATE AMOUNTS - CLEAN FINANCIAL BREAKDOWN PANEL */}
                              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5 mb-4">
                                {/* 1. REQUIRED TARGET (TOP HERO) */}
                                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70">
                                  <div>
                                    <div className="text-[10px] font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                                      <span>1. Required Funding Target</span>
                                    </div>
                                    <div className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
                                      £{target.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      Target Gap
                                    </div>
                                    <div className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                                      £{remaining.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                  </div>
                                </div>

                                {/* 2 & 3. ALLOCATED VS DISTRIBUTED (SIDE BY SIDE IN 2 COMFORTABLE COLUMNS) */}
                                <div className="grid grid-cols-2 gap-3">
                                  {/* 2. Allocated */}
                                  <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/70">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-800 mb-0.5">
                                      <span>2. Allocated</span>
                                      <span className="text-[9px] font-black bg-blue-100/80 text-blue-800 px-1.5 py-0.2 rounded">
                                        {allocPct}%
                                      </span>
                                    </div>
                                    <div className="text-sm font-black text-blue-950">
                                      £{allocated.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-blue-600 font-medium mt-0.5">
                                      Assigned budget
                                    </div>
                                  </div>

                                  {/* 3. Distributed */}
                                  <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/70">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800 mb-0.5">
                                      <span>3. Distributed</span>
                                      <span className="text-[9px] font-black bg-emerald-100/80 text-emerald-800 px-1.5 py-0.2 rounded">
                                        {distPct}%
                                      </span>
                                    </div>
                                    <div className="text-sm font-black text-emerald-950">
                                      £{distributed.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                                      Actually provided
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Funding Progress Bar */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                                  <span className="text-slate-600">Allocation Progress</span>
                                  <span className="text-slate-900 font-black">{allocPct}% of Target</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden relative">
                                  <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${allocPct}%` }}
                                    title={`Allocated: £${allocated.toFixed(2)} (${allocPct}%)`}
                                  />
                                  <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500 absolute top-0 left-0"
                                    style={{ width: `${distPct}%` }}
                                    title={`Distributed: £${distributed.toFixed(2)} (${distPct}%)`}
                                  />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                                  <span>£{distributed.toLocaleString("en-GB", { minimumFractionDigits: 0 })} disbursed</span>
                                  <span>Target: £{target.toLocaleString("en-GB", { minimumFractionDigits: 0 })}</span>
                                </div>
                              </div>
                            </div>

                            {/* Card Footer Action */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                              <span className="text-[11px] text-slate-500 font-semibold">
                                Remaining: <strong className="text-slate-800">£{remaining.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  setAllocCategoryId(cat.id);
                                  setAllocAssistanceType(cat.name);
                                  setShowCreateAllocationModal(true);
                                  setAllocBeneficiaryMode("EXISTING");
                                  if (beneficiariesList.length > 0) {
                                    setAllocSelectedBeneficiaryId(beneficiariesList[0].id);
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-sm transition-all cursor-pointer hover:shadow hover:opacity-95"
                                style={{
                                  backgroundColor: "#E6127E",
                                  color: "#FFFFFF",
                                }}
                              >
                                <Wallet size={13} />
                                <span>+ Allocate Funds</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* VIEW 2: ALLOCATIONS & DISTRIBUTION LEDGER                     */}
              {/* ============================================================= */}
              {allocationsSubTab === "ledger" && (
                <>
                  {/* Search & Filter Toolbar */}
                  <div
                    className="admin-card p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
                    style={{ marginBottom: "1.75rem" }}
                  >
                    <div className="relative flex-1" style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#94A3B8",
                          display: "flex",
                          alignItems: "center",
                          pointerEvents: "none",
                          zIndex: 2,
                        }}
                      >
                        <Search size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by allocation reference, beneficiary name, email, fund source, or receipt..."
                        value={allocationSearch}
                        onChange={(e) => setAllocationSearch(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          minHeight: "44px",
                          paddingLeft: "48px",
                          paddingRight: "16px",
                          fontSize: "13px",
                          color: "#0F172A",
                          backgroundColor: "#F8FAFC",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Status Filter */}
                      <select
                        value={allocationStatusFilter}
                        onChange={(e) => setAllocationStatusFilter(e.target.value)}
                        style={{
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "12px",
                          fontWeight: 700,
                          borderRadius: "12px",
                          border: "1.5px solid #CBD5E1",
                          backgroundColor: "#FFFFFF",
                          color: "#334155",
                          outline: "none",
                        }}
                      >
                        <option value="ALL">All Financial Statuses</option>
                        <option value="ALLOCATED">Allocated (Pending Payout)</option>
                        <option value="DISTRIBUTED">Distributed (Completed)</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>

                      {/* Assistance Category Filter (Populated dynamically) */}
                      <select
                        value={allocationTypeFilter}
                        onChange={(e) => setAllocationTypeFilter(e.target.value)}
                        style={{
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "12px",
                          fontWeight: 700,
                          borderRadius: "12px",
                          border: "1.5px solid #CBD5E1",
                          backgroundColor: "#FFFFFF",
                          color: "#334155",
                          outline: "none",
                        }}
                      >
                        <option value="ALL">All Support Categories</option>
                        {supportCategoriesList.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>

                      {/* Payment Method Filter */}
                      <select
                        value={allocationMethodFilter}
                        onChange={(e) => setAllocationMethodFilter(e.target.value)}
                        style={{
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "12px",
                          fontWeight: 700,
                          borderRadius: "12px",
                          border: "1.5px solid #CBD5E1",
                          backgroundColor: "#FFFFFF",
                          color: "#334155",
                          outline: "none",
                        }}
                      >
                        <option value="ALL">All Payment Methods</option>
                        <option value="Prepayment Voucher">Prepayment Voucher</option>
                        <option value="Bank Transfer">Bank Transfer (BACS)</option>
                        <option value="Cash">Cash Handover</option>
                        <option value="Energy Key Code">Energy Key Code</option>
                        <option value="Direct Goods / Hamper">Direct Goods / Hamper</option>
                        <option value="Merchant Payment">Merchant Payment</option>
                      </select>

                      {/* Sort By */}
                      <select
                        value={allocationSortBy}
                        onChange={(e) => setAllocationSortBy(e.target.value)}
                        style={{
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "12px",
                          fontWeight: 700,
                          borderRadius: "12px",
                          border: "1.5px solid #CBD5E1",
                          backgroundColor: "#FFFFFF",
                          color: "#334155",
                          outline: "none",
                        }}
                      >
                        <option value="DATE_DESC">Allocation Date (Newest)</option>
                        <option value="DATE_ASC">Allocation Date (Oldest)</option>
                        <option value="ALLOC_HIGH">Allocated Amount (High &rarr; Low)</option>
                        <option value="DIST_HIGH">Distributed Amount (High &rarr; Low)</option>
                      </select>

                  {/* Clear Button */}
                  {(allocationSearch ||
                    allocationStatusFilter !== "ALL" ||
                    allocationTypeFilter !== "ALL" ||
                    allocationFundFilter !== "ALL" ||
                    allocationMethodFilter !== "ALL") && (
                    <button
                      type="button"
                      onClick={() => {
                        setAllocationSearch("");
                        setAllocationStatusFilter("ALL");
                        setAllocationTypeFilter("ALL");
                        setAllocationFundFilter("ALL");
                        setAllocationMethodFilter("ALL");
                        setAllocationSortBy("DATE_DESC");
                      }}
                      className="text-xs font-bold text-magenta hover:underline px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Allocations Ledger Table */}
              <div
                className="admin-card overflow-hidden"
                style={{ marginBottom: "2.5rem" }}
              >
                {allocationsLoading ? (
                  <div className="p-12 text-center text-slate-500 text-xs">
                    <RefreshCw size={24} className="animate-spin text-magenta mx-auto mb-2" />
                    <span>Loading fund allocation ledger...</span>
                  </div>
                ) : filteredAllocations.length === 0 ? (
                  <div className="p-12 text-center">
                    <Wallet size={32} className="text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-800">
                      No Fund Allocations Found
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      No allocation records match your search criteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowCreateAllocationModal(true)}
                      className="mt-4 px-4 py-2 rounded-xl bg-pink-50 text-magenta text-xs font-bold hover:bg-pink-100 transition-colors cursor-pointer"
                    >
                      + Allocate Funds to Beneficiary
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          <th className="py-3 px-4">Reference &amp; Date</th>
                          <th className="py-3 px-4">Beneficiary</th>
                          <th className="py-3 px-4">Assistance Type &amp; Fund</th>
                          <th className="py-3 px-4">Allocated Amount</th>
                          <th className="py-3 px-4">Actually Distributed</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Disbursement Details</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAllocations.map((a) => {
                          const isDistributed = a.status === "DISTRIBUTED";
                          const isAllocated = a.status === "ALLOCATED";
                          const isCancelled = a.status === "CANCELLED";

                          return (
                            <tr key={a.id} className="hover:bg-pink-50/20 transition-colors">
                              {/* Reference & Date */}
                              <td className="py-3.5 px-4">
                                <div className="font-mono font-bold text-slate-900">
                                  {a.reference}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  Allocated: {new Date(a.allocationDate).toLocaleDateString("en-GB")}
                                </div>
                                {a.distributionDate && (
                                  <div className="text-[10px] text-emerald-600 font-semibold">
                                    Disbursed: {new Date(a.distributionDate).toLocaleDateString("en-GB")}
                                  </div>
                                )}
                              </td>

                              {/* Beneficiary */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-magenta to-pink-600 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                                    {a.beneficiaryName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-extrabold text-slate-900">
                                      {a.beneficiaryName}
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-mono">
                                      {a.beneficiaryEmail || a.beneficiaryPhone || "Support recipient"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Assistance Type & Fund Source */}
                              <td className="py-3.5 px-4">
                                <div>
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                      a.assistanceType === "FOOD"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : a.assistanceType === "ENERGY_FUEL"
                                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                                        : a.assistanceType === "DOMESTIC_ABUSE_REFUGE"
                                        ? "bg-pink-50 text-magenta border border-pink-200"
                                        : a.assistanceType === "CLOTHING_BEDDING"
                                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                                        : a.assistanceType === "MEDICAL"
                                        ? "bg-red-50 text-red-700 border border-red-200"
                                        : a.assistanceType === "EDUCATION"
                                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                        : a.assistanceType === "HOUSING_RENT"
                                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                                        : "bg-slate-50 text-slate-700 border border-slate-200"
                                    }`}
                                  >
                                    {a.assistanceType.replace(/_/g, " ")}
                                  </span>
                                  <div className="text-[11px] text-slate-500 mt-1 font-medium truncate max-w-[180px]" title={a.fundSource}>
                                    {a.fundSource}
                                  </div>
                                </div>
                              </td>

                              {/* Allocated Amount */}
                              <td className="py-3.5 px-4">
                                <div className="text-sm font-black text-slate-900">
                                  £{Number(a.allocatedAmount).toFixed(2)}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  Committed Grant
                                </div>
                              </td>

                              {/* Actually Distributed */}
                              <td className="py-3.5 px-4">
                                {isDistributed ? (
                                  <div>
                                    <div className="text-sm font-black text-emerald-600">
                                      £{Number(a.distributedAmount).toFixed(2)}
                                    </div>
                                    <div className="text-[10px] text-emerald-700 font-semibold">
                                      ✓ 100% Dispatched
                                    </div>
                                  </div>
                                ) : isAllocated ? (
                                  <div>
                                    <div className="text-xs font-bold text-amber-600">
                                      £0.00
                                    </div>
                                    <div className="text-[10px] text-amber-700 font-medium">
                                      Pending distribution
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400 text-xs">—</span>
                                )}
                              </td>

                              {/* Financial Status */}
                              <td className="py-3.5 px-4">
                                {isDistributed ? (
                                  <span className="admin-badge-completed">
                                    ● Distributed
                                  </span>
                                ) : isAllocated ? (
                                  <button
                                    type="button"
                                    onClick={() => openRecordDistributionModal(a)}
                                    className="cursor-pointer"
                                    title="Click to record actual distribution"
                                  >
                                    <span className="admin-badge-pending">
                                      ● Allocated (Pending)
                                    </span>
                                  </button>
                                ) : (
                                  <span className="admin-badge-failed">
                                    ● Cancelled
                                  </span>
                                )}
                              </td>

                              {/* Disbursement Details */}
                              <td className="py-3.5 px-4">
                                {isDistributed ? (
                                  <div>
                                    <div className="font-semibold text-slate-800 text-[11px]">
                                      {a.paymentMethod || "Disbursed"}
                                    </div>
                                    {a.receiptReference && (
                                      <div className="text-[10px] text-slate-500 font-mono">
                                        Ref: {a.receiptReference}
                                      </div>
                                    )}
                                    {a.disbursedBy && (
                                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]" title={a.disbursedBy}>
                                        By: {a.disbursedBy.split('(')[0].trim()}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-slate-400 italic text-[11px]">Awaiting payout</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* Mark/Record Distributed */}
                                  {isAllocated && (
                                    <button
                                      type="button"
                                      onClick={() => openRecordDistributionModal(a)}
                                      title="Record actual assistance distribution"
                                      className="admin-action-btn hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50"
                                    >
                                      <Check size={14} />
                                    </button>
                                  )}

                                  {/* View Disbursement Slip */}
                                  <button
                                    type="button"
                                    onClick={() => setViewingVoucherAllocation(a)}
                                    title="View official assistance disbursement slip"
                                    className="admin-action-btn"
                                  >
                                    <FileText size={14} />
                                  </button>

                                  {/* Edit Allocation */}
                                  <button
                                    type="button"
                                    onClick={() => openEditAllocationModal(a)}
                                    title="Edit allocation record"
                                    className="admin-action-btn"
                                  >
                                    <Edit size={14} />
                                  </button>

                                  {/* Cancel Allocation */}
                                  {isAllocated && (
                                    <button
                                      type="button"
                                      onClick={() => setCancellingAllocation(a)}
                                      title="Cancel allocated funds"
                                      className="admin-action-btn hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50"
                                    >
                                      <X size={14} />
                                    </button>
                                  )}

                                  {/* Delete Allocation */}
                                  <button
                                    type="button"
                                    onClick={() => setDeletingAllocation(a)}
                                    title="Delete allocation record"
                                    className="admin-action-btn hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}


          {/* Placeholder views for other remaining sidebar tabs */}
          
          {/* ========================================================================= */}
          {/* TAB 3: CAMPAIGN MANAGEMENT                                                */}
          {/* ========================================================================= */}
          {activeTab === "campaigns" && (
            <div className="space-y-6">
              {/* Header & Far-Right Action Button */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 text-magenta">
                      Fundraising &amp; Causes
                    </span>
                    <span className="text-xs font-bold text-gray-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      {campaigns.length} Active Causes Recorded
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Campaign Management
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Create, monitor, and manage fundraising causes, track funding goals, set duration dates, and audit received donations.
                  </p>
                </div>

                <div
                  className="admin-crm-header-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <button
                    type="button"
                    onClick={openCreateCampaignModal}
                    className="btn-3d-magenta px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Plus size={15} />
                    <span>Create New Campaign</span>
                  </button>
                </div>
              </div>

              {/* KPI Performance Cards */}
              <div className="admin-kpi-grid" style={{ marginBottom: "1.75rem" }}>
                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Active Campaigns
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {totalActiveCampaigns}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {internalCampaignsCount} Internal • {externalCampaignsCount} External
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Total Funding Target
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    £{totalCampaignTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Combined financial goal
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Total Funds Raised
                  </div>
                  <div className="text-2xl font-black text-magenta mt-1">
                    £{totalCampaignRaised.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    £{internalRaisedAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })} internal • £{externalRaisedAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })} external
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Overall Progress
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-2xl font-black text-slate-900">
                      {totalCampaignProgress}%
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Goal Attained
                    </span>
                  </div>
                  <div className="admin-progress-bar-bg mt-2">
                    <div
                      className="admin-progress-bar-fill"
                      style={{ width: `${totalCampaignProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Search, Filter & Sort Toolbar */}
              <div className="admin-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ marginBottom: "1.75rem" }}>
                {/* Search Bar */}
                <div className="admin-search-wrapper">
                  <Search size={15} className="admin-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, description, sponsor, fundraiser or ID..."
                    value={campaignSearch}
                    onChange={(e) => setCampaignSearch(e.target.value)}
                    className="admin-search-input"
                  />
                  {campaignSearch && (
                    <button
                      type="button"
                      onClick={() => setCampaignSearch("")}
                      className="admin-search-clear"
                      title="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Campaign Type Filter */}
                  <select
                    value={campaignTypeFilter}
                    onChange={(e) => setCampaignTypeFilter(e.target.value)}
                    className="admin-select font-bold"
                  >
                    <option value="ALL">All Types (Internal &amp; External)</option>
                    <option value="INTERNAL">Internal Campaigns Only</option>
                    <option value="EXTERNAL">External Campaigns Only</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={campaignStatusFilter}
                    onChange={(e) => setCampaignStatusFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active Causes</option>
                    <option value="DRAFT">Draft Campaigns</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>

                  {/* Sort Dropdown */}
                  <select
                    value={campaignSortBy}
                    onChange={(e) => setCampaignSortBy(e.target.value)}
                    className="admin-select"
                  >
                    <option value="RAISED_DESC">Most Raised (£ High-Low)</option>
                    <option value="TARGET_DESC">Target Goal (£ High-Low)</option>
                    <option value="PROGRESS_DESC">Highest Progress (%)</option>
                    <option value="NEWEST">Newest Created</option>
                  </select>

                  {(campaignSearch || campaignTypeFilter !== "ALL" || campaignStatusFilter !== "ALL" || campaignSortBy !== "RAISED_DESC") && (
                    <button
                      type="button"
                      onClick={() => {
                        setCampaignSearch("");
                        setCampaignTypeFilter("ALL");
                        setCampaignStatusFilter("ALL");
                        setCampaignSortBy("RAISED_DESC");
                      }}
                      className="px-2.5 py-2 text-xs font-bold text-magenta hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* CAMPAIGNS GRID */}
              {campaignsLoading ? (
                <div className="p-16 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2 admin-card">
                  <RefreshCw size={24} className="animate-spin text-magenta" />
                  <span>Loading fundraising campaigns...</span>
                </div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="p-16 text-center text-slate-400 admin-card">
                  <Compass size={36} className="mx-auto mb-2 text-slate-300" />
                  <h3 className="text-sm font-bold text-slate-700">No campaigns match your filters</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Try adjusting search queries or click "Reset Filters".
                  </p>
                </div>
              ) : (
                <div className="admin-campaigns-grid" style={{ marginBottom: "2.5rem" }}>
                  {filteredCampaigns.map((camp) => {
                    const target = Number(camp.targetAmount || 0);
                    const raised = Number(camp.raisedAmount || 0);
                    const progress = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
                    const isArchived = Boolean(camp.archived);

                    return (
                      <div key={camp.id} className="admin-campaign-card">
                        {/* Image Banner */}
                        <div className="admin-campaign-image-box">
                          {camp.imageUrl ? (
                            <img
                              src={camp.imageUrl}
                              alt={camp.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 text-magenta">
                              <Compass size={36} />
                              <span className="text-[11px] font-bold mt-1">Zinthiya Trust Cause</span>
                            </div>
                          )}

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                            {camp.campaignType === "EXTERNAL" ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm bg-purple-700 text-white flex items-center gap-1">
                                <Globe size={11} />
                                <span>External</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm bg-pink-600 text-white flex items-center gap-1">
                                <Compass size={11} />
                                <span>Internal</span>
                              </span>
                            )}

                            {camp.status === "DRAFT" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                                Draft
                              </span>
                            ) : camp.status === "COMPLETED" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800">
                                Completed
                              </span>
                            ) : isArchived || camp.status === "ARCHIVED" ? (
                              <span className="admin-badge-archived px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm">
                                Archived
                              </span>
                            ) : camp.active ? (
                              <span className="admin-badge-active px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="admin-badge-inactive px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm">
                                Paused
                              </span>
                            )}
                          </div>

                          {/* Progress Percentage Badge */}
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-slate-900/80 backdrop-blur-xs text-white shadow-sm">
                              {progress}% Funded
                            </span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                                {camp.title}
                              </h3>
                              {camp.campaignCode && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-500">
                                  {camp.campaignCode}
                                </span>
                              )}
                            </div>

                            {/* External Campaign Metadata Card */}
                            {camp.campaignType === "EXTERNAL" && (
                              <div className="mt-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] space-y-1">
                                {camp.corporateSponsor && (
                                  <div className="text-purple-950 truncate">
                                    <span className="font-bold text-purple-700">Sponsor:</span> {camp.corporateSponsor}
                                  </div>
                                )}
                                {camp.fundraiserName && (
                                  <div className="text-purple-950 truncate">
                                    <span className="font-bold text-purple-700">Fundraiser:</span> {camp.fundraiserName} {camp.fundraiserEmail ? `(${camp.fundraiserEmail})` : ''}
                                  </div>
                                )}
                                {camp.fundraisingPageUrl && (
                                  <a
                                    href={camp.fundraisingPageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1 text-[10px]"
                                  >
                                    <span>{camp.fundraisingPageName || "External Page Link"}</span>
                                    <ExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Dates indicator */}
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-2">
                              <Calendar size={12} className="text-slate-400" />
                              <span>
                                {camp.startDate || camp.endDate ? (
                                  <>
                                    {camp.startDate ? new Date(camp.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Started"}
                                    {" → "}
                                    {camp.endDate ? new Date(camp.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Ongoing"}
                                  </>
                                ) : (
                                  "Ongoing Charitable Cause"
                                )}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                              {camp.description}
                            </p>
                          </div>

                          {/* Financial Progress Box */}
                          <div className="mt-5 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Raised</span>
                                <span className="font-black text-sm text-magenta">
                                  £{raised.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target Goal</span>
                                <span className="font-black text-sm text-slate-900">
                                  £{target.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="admin-progress-bar-bg my-2">
                              <div
                                className="admin-progress-bar-fill"
                                style={{ width: `${progress}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1">
                              <span>{camp.donationsCount || camp.donations?.length || 0} direct gifts</span>
                              <span className="text-slate-400">
                                {target > raised
                                  ? `£${(target - raised).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} remaining`
                                  : "Goal Achieved! 🎉"}
                              </span>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                              {/* Left: View Donations */}
                              <button
                                type="button"
                                onClick={() => setViewingCampaignDonations(camp)}
                                className="admin-btn-secondary px-3 py-1.5 text-xs font-bold text-slate-700 flex items-center gap-1.5"
                                title="View donations received for this cause"
                              >
                                <Eye size={13} />
                                <span>Donations ({camp.donationsCount || camp.donations?.length || 0})</span>
                              </button>

                              {/* Right Actions */}
                              <div className="flex items-center gap-1.5">
                                {/* Toggle Active / Deactivate */}
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleCampaignStatus(camp, e)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                    camp.active
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                                  }`}
                                  title={camp.active ? "Click to deactivate / pause cause" : "Click to activate cause"}
                                >
                                  {camp.active ? "Active" : "Paused"}
                                </button>

                                {/* Edit Button */}
                                <button
                                  type="button"
                                  onClick={() => openEditCampaign(camp)}
                                  className="admin-action-btn"
                                  title="Edit campaign details, target, and dates"
                                >
                                  <Edit size={14} />
                                </button>

                                {/* Archive Button */}
                                <button
                                  type="button"
                                  onClick={() => handleArchiveCampaign(camp, !camp.archived)}
                                  className="admin-action-btn"
                                  title={camp.archived ? "Restore campaign from archive" : "Archive campaign"}
                                >
                                  <Archive size={14} />
                                </button>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  onClick={() => setDeletingCampaign(camp)}
                                  className="admin-action-btn hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                                  title="Delete campaign"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}


          {/* Placeholder views for other remaining sidebar tabs */}
          
          {/* ========================================================================= */}
          {/* TAB 4: DONATION MANAGEMENT (FINANCIAL LEDGER & TRANSACTIONS)              */}
          {/* ========================================================================= */}
          {activeTab === "donations" && (
            <div className="space-y-6">
              {/* Header & Action Toolbar */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 text-magenta">
                      Financial Ledger
                    </span>
                    <span className="text-xs font-bold text-gray-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      {donationsList.length} Transactions Recorded
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Donation Management
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Audit verified gifts, view donor records, record offline cash and bank transfers, check payment statuses, and issue official receipts.
                  </p>
                </div>

                <div
                  className="admin-crm-header-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginLeft: "auto",
                  }}
                >
                  {/* Export CSV Button */}
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="admin-btn-secondary px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer shadow-xs"
                    title="Export currently filtered donation records to CSV"
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>

                  {/* Record Offline Donation Button */}
                  <button
                    type="button"
                    onClick={() => setShowRecordOfflineModal(true)}
                    className="btn-3d-magenta px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Plus size={15} />
                    <span>Record Offline Donation</span>
                  </button>
                </div>
              </div>

              {/* KPI Performance Cards */}
              <div className="admin-kpi-grid" style={{ marginBottom: "1.75rem" }}>
                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Total Funds Received
                  </div>
                  <div className="text-2xl font-black text-magenta mt-1">
                    £{totalDonationsAmountSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    Verified ledger contributions
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Completed Transactions
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {completedDonationsCount}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {donationsList.length} total records logged
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Giving Type Breakdown
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {oneOffCount} <span className="text-xs font-bold text-slate-400">One-Off</span> • {recurringCount} <span className="text-xs font-bold text-slate-400">Monthly</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    One-time &amp; recurring donors
                  </div>
                </div>

                <div className="admin-card p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    HMRC Gift Aid Boost
                  </div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    £{giftAidClaimableAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    +25% eligible tax reclaim value
                  </div>
                </div>
              </div>

              {/* Search, Filter & Sort Toolbar */}
              <div className="admin-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ marginBottom: "1.75rem" }}>
                {/* Search Bar */}
                <div className="admin-search-wrapper">
                  <Search size={15} className="admin-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by ref (ZT-...), donor name, email, or campaign..."
                    value={donationSearch}
                    onChange={(e) => setDonationSearch(e.target.value)}
                    className="admin-search-input"
                  />
                  {donationSearch && (
                    <button
                      type="button"
                      onClick={() => setDonationSearch("")}
                      className="admin-search-clear"
                      title="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Status Filter */}
                  <select
                    value={donationStatusFilter}
                    onChange={(e) => setDonationStatusFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending Clearance</option>
                    <option value="FAILED">Failed</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>

                  {/* Giving Type Filter */}
                  <select
                    value={donationTypeFilter}
                    onChange={(e) => setDonationTypeFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Types</option>
                    <option value="ONE_OFF">One-Off Giving</option>
                    <option value="RECURRING">Recurring Monthly</option>
                  </select>

                  {/* Payment Method Filter */}
                  <select
                    value={donationMethodFilter}
                    onChange={(e) => setDonationMethodFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Methods</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash (Offline)</option>
                    <option value="Bank Transfer">Bank Transfer (BACS)</option>
                    <option value="Cheque">Cheque</option>
                    <option value="In-Person">In-Person POS</option>
                  </select>

                  {/* Gift Aid Filter */}
                  <select
                    value={donationGiftAidFilter}
                    onChange={(e) => setDonationGiftAidFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="ALL">All Gift Aid</option>
                    <option value="YES">Gift Aid Declared (+25%)</option>
                    <option value="NO">No Gift Aid</option>
                  </select>

                  {/* Sort Dropdown */}
                  <select
                    value={donationSortBy}
                    onChange={(e) => setDonationSortBy(e.target.value)}
                    className="admin-select"
                  >
                    <option value="DATE_DESC">Newest Transaction</option>
                    <option value="DATE_ASC">Oldest Transaction</option>
                    <option value="AMOUNT_DESC">Highest Amount (£ High-Low)</option>
                    <option value="AMOUNT_ASC">Lowest Amount (£ Low-High)</option>
                  </select>

                  {(donationSearch || donationStatusFilter !== "ALL" || donationTypeFilter !== "ALL" || donationMethodFilter !== "ALL" || donationGiftAidFilter !== "ALL" || donationSortBy !== "DATE_DESC") && (
                    <button
                      type="button"
                      onClick={() => {
                        setDonationSearch("");
                        setDonationStatusFilter("ALL");
                        setDonationTypeFilter("ALL");
                        setDonationMethodFilter("ALL");
                        setDonationGiftAidFilter("ALL");
                        setDonationSortBy("DATE_DESC");
                      }}
                      className="px-2.5 py-2 text-xs font-bold text-magenta hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* DONATIONS LEDGER TABLE */}
              <div className="admin-card overflow-hidden" style={{ marginBottom: "2.5rem" }}>
                {donationsLoading ? (
                  <div className="p-16 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
                    <RefreshCw size={24} className="animate-spin text-magenta" />
                    <span>Loading donations ledger...</span>
                  </div>
                ) : filteredDonations.length === 0 ? (
                  <div className="p-16 text-center text-slate-400">
                    <CreditCard size={36} className="mx-auto mb-2 text-slate-300" />
                    <h3 className="text-sm font-bold text-slate-700">No donation transactions match your filters</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Try clearing search parameters or record a new donation.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="admin-table w-full text-left text-xs">
                      <thead>
                        <tr>
                          <th>Transaction Ref &amp; Date</th>
                          <th>Donor Details</th>
                          <th>Allocated Cause / Campaign</th>
                          <th className="text-right">Amount</th>
                          <th>Giving Type</th>
                          <th>Method</th>
                          <th>Payment Status</th>
                          <th className="text-center">Gift Aid</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDonations.map((dn) => {
                          const donorName = dn.user?.fullName || dn.donorName || "Anonymous Supporter";
                          const donorEmail = dn.user?.email || dn.donorEmail || "";
                          const initial = donorName.charAt(0).toUpperCase() || "D";
                          const tier = dn.user?.donationTier || "SUPPORTER";
                          const amt = Number(dn.amount || 0);

                          return (
                            <tr key={dn.id}>
                              {/* Reference & Date */}
                              <td className="py-3.5 px-4">
                                <div className="font-extrabold text-slate-900 font-mono text-xs flex items-center gap-1">
                                  <span>{dn.reference || dn.id.slice(0, 10).toUpperCase()}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  {new Date(dn.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </td>

                              {/* Donor Details */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="admin-avatar">
                                    {initial}
                                  </div>
                                  <div>
                                    <div className="font-extrabold text-slate-900 text-sm">
                                      {donorName}
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-mono">
                                      {donorEmail || "Offline Donor"}
                                    </div>
                                    <div className="mt-1">
                                      <DonorTierBadge tier={tier} />
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Allocated Campaign */}
                              <td className="py-3.5 px-4">
                                {dn.campaign ? (
                                  <div>
                                    <span className="inline-flex items-center gap-1 font-bold text-slate-800 text-xs">
                                      <Compass size={12} className="text-magenta shrink-0" />
                                      <span>{dn.campaign.title}</span>
                                    </span>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                                    General Relief Fund
                                  </span>
                                )}
                              </td>

                              {/* Amount */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="font-black text-sm text-slate-900">
                                  £{amt.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {dn.currency || "GBP"}
                                </div>
                              </td>

                              {/* Type */}
                              <td className="py-3.5 px-4">
                                {dn.type === "RECURRING" ? (
                                  <span className="admin-badge-recurring">
                                    ↻ Recurring
                                  </span>
                                ) : (
                                  <span className="admin-badge-oneoff">
                                    One-Off
                                  </span>
                                )}
                              </td>

                              {/* Payment Method */}
                              <td className="py-3.5 px-4">
                                <span className="admin-badge-method">
                                  {dn.paymentMethod || "Card"}
                                </span>
                              </td>

                              {/* Payment Status with Quick Change */}
                              <td className="py-3.5 px-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingStatusDonation(dn);
                                    setNewStatusValue(dn.status);
                                  }}
                                  className="cursor-pointer"
                                  title="Click to update payment status"
                                >
                                  {dn.status === "COMPLETED" ? (
                                    <span className="admin-badge-completed">
                                      ● Completed
                                    </span>
                                  ) : dn.status === "PENDING" ? (
                                    <span className="admin-badge-pending">
                                      ● Pending
                                    </span>
                                  ) : dn.status === "FAILED" ? (
                                    <span className="admin-badge-failed">
                                      ● Failed
                                    </span>
                                  ) : (
                                    <span className="admin-badge-refunded">
                                      ● Refunded
                                    </span>
                                  )}
                                </button>
                              </td>

                              {/* Gift Aid */}
                              <td className="py-3.5 px-4 text-center">
                                {dn.giftAid ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200" title="+25% Gift Aid claimed from HMRC">
                                    <Check size={11} />
                                    <span>+25%</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">—</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* View Official Receipt */}
                                  <button
                                    type="button"
                                    onClick={() => setViewingReceiptDonation(dn)}
                                    title="View &amp; Print Official Charity Receipt"
                                    className="admin-action-btn"
                                  >
                                    <FileText size={14} />
                                  </button>

                                  {/* View Details */}
                                  <button
                                    type="button"
                                    onClick={() => setViewingDonationDetail(dn)}
                                    title="View transaction metadata"
                                    className="admin-action-btn"
                                  >
                                    <Eye size={14} />
                                  </button>

                                  {/* Delete Transaction */}
                                  <button
                                    type="button"
                                    onClick={() => setDeletingDonation(dn)}
                                    title="Delete donation record"
                                    className="admin-action-btn hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Placeholder views for other remaining sidebar tabs */}
          
          {/* ========================================================================= */}
          {/* TAB 7: REPORTS AND ANALYTICS                                              */}
          {/* ========================================================================= */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              {/* Header & Far-Right Action Buttons */}
              <div
                className="admin-crm-header admin-page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{
                  width: "100%",
                  marginBottom: "2rem"
                }}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 text-magenta">
                      Audit &amp; Intelligence
                    </span>
                    <span className="text-xs font-bold text-gray-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Live System Sync
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Reports &amp; Trust Analytics
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 admin-subheading">
                    Comprehensive reporting across donations, fundraising campaigns, donor growth, beneficiary casework, and fund disbursement.
                  </p>
                </div>

                {/* Far-Right Action Buttons */}
                <div className="flex items-center gap-3 relative flex-shrink-0 self-start md:self-auto">
                  {/* CSV Export Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCsvDropdown(!showCsvDropdown)}
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-slate-700 hover:bg-gray-50 shadow-sm transition-all"
                    >
                      <Download size={14} className="text-magenta" />
                      <span>Export CSV</span>
                    </button>

                    {showCsvDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                          Select Report To Download
                        </div>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("summary")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Executive Summary</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("timeline")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Donations by Period</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("campaigns")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Campaign Breakdown</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("top_donors")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Top Donors Leaderboard</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("beneficiaries")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Beneficiary Support</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => exportReportsCsv("allocations")}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-magenta flex items-center justify-between"
                        >
                          <span>Fund Disbursement</span>
                          <span className="text-[10px] text-gray-400">CSV</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Print / Official Audit Summary Button */}
                  <button
                    type="button"
                    onClick={() => setShowAuditReportModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-magenta text-white text-xs font-bold shadow-md hover:bg-magenta-deep transition-all"
                  >
                    <Printer size={14} />
                    <span>Print Audit Report</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards (admin-kpi-grid) */}
              <div
                className="admin-kpi-grid"
                style={{
                  marginBottom: "1.75rem",
                }}
              >
                {/* 1. Total Donations Received */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Total Donations Received
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    £{(reportsData?.summary?.totalDonationsReceived || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <span>✓ {reportsData?.summary?.donationsCount || 0} gifts recorded</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-medium">Avg £{(reportsData?.summary?.averageDonation || 0).toFixed(2)}</span>
                  </div>
                </div>

                {/* 2. Assistance Allocated */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Funds Allocated (Committed)
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Wallet size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    £{(reportsData?.summary?.totalAllocatedAmount || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-1">
                    Direct grants committed to clients
                  </div>
                </div>

                {/* 3. Actually Distributed */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Actually Distributed Aid
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <HeartHandshake size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    £{(reportsData?.summary?.totalDistributedAmount || 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
                    <span>Disbursed</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-amber-600 font-medium">Pending £{(reportsData?.summary?.totalPendingDistribution || 0).toFixed(2)}</span>
                  </div>
                </div>

                {/* 4. Household Impact */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Community Impact Reach
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-pink-50 text-magenta flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {reportsData?.summary?.totalHouseholdImpact || 0} People
                  </div>
                  <div className="text-[11px] text-magenta font-semibold mt-1">
                    Across {reportsData?.summary?.totalBeneficiaryRequests || 0} casework files
                  </div>
                </div>
              </div>

              {/* Global Filter Toolbar */}
              <div
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3"
                style={{ marginBottom: "1.75rem" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-magenta" />
                    <span className="text-xs font-bold text-slate-700">Analytics Filters:</span>
                  </div>

                  {/* Reset Filters */}
                  {(reportsPeriod !== "all" || reportsCampaignId !== "all" || reportsDonationType !== "all" || reportsStartDate || reportsEndDate) && (
                    <button
                      type="button"
                      onClick={() => {
                        setReportsPeriod("all");
                        setReportsStartDate("");
                        setReportsEndDate("");
                        setReportsCampaignId("all");
                        setReportsDonationType("all");
                      }}
                      className="text-xs font-bold text-magenta hover:underline"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Period Filter */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Time Period</label>
                    <select
                      value={reportsPeriod}
                      onChange={(e) => setReportsPeriod(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                    >
                      <option value="all">All Time (Cumulative)</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="this_month">This Current Month</option>
                      <option value="this_year">This Calendar Year</option>
                      <option value="custom">Custom Date Range...</option>
                    </select>
                  </div>

                  {/* Campaign Filter */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Campaign Filter</label>
                    <select
                      value={reportsCampaignId}
                      onChange={(e) => setReportsCampaignId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                    >
                      <option value="all">All Campaigns (Consolidated)</option>
                      {campaignsList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Donation Type Filter */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Donation Type</label>
                    <select
                      value={reportsDonationType}
                      onChange={(e) => setReportsDonationType(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                    >
                      <option value="all">All Giving Modes (One-off &amp; Recurring)</option>
                      <option value="ONE_OFF">One-Off Direct Gifts Only</option>
                      <option value="RECURRING">Monthly Recurring Pledges Only</option>
                    </select>
                  </div>

                  {/* Quick Refresh */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => loadReportsData()}
                      disabled={reportsLoading}
                      className="w-full py-2 px-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RefreshCw size={13} className={reportsLoading ? "animate-spin text-magenta" : "text-gray-500"} />
                      <span>{reportsLoading ? "Refreshing..." : "Apply Filters"}</span>
                    </button>
                  </div>
                </div>

                {/* Custom Date Range Picker when custom selected */}
                {reportsPeriod === "custom" && (
                  <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex flex-wrap items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">From:</label>
                      <input
                        type="date"
                        value={reportsStartDate}
                        onChange={(e) => setReportsStartDate(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-magenta"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">To:</label>
                      <input
                        type="date"
                        value={reportsEndDate}
                        onChange={(e) => setReportsEndDate(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-magenta"
                      />
                    </div>
                    <span className="text-[11px] text-gray-500 italic">
                      Filters live audit trail within this exact custom calendar interval.
                    </span>
                  </div>
                )}
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="admin-subnav-scroll flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto w-full max-w-full">
                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("overview")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "overview"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <BarChart3 size={14} />
                  <span>Executive Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("timeline")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "timeline"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Calendar size={14} />
                  <span>Donations by Period</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("campaigns")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "campaigns"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Compass size={14} />
                  <span>Campaign Performance</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("donors")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "donors"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Users size={14} />
                  <span>Donor Growth &amp; Top Donors</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("one_off_recurring")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "one_off_recurring"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <TrendingUp size={14} />
                  <span>One-Time vs Recurring</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("beneficiaries")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "beneficiaries"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <ShieldCheck size={14} />
                  <span>Beneficiary Support</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportsActiveSubTab("allocations")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reportsActiveSubTab === "allocations"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Wallet size={14} />
                  <span>Fund Disbursement</span>
                </button>
              </div>

              {/* Sub-Tab 1: Executive Overview */}
              {reportsActiveSubTab === "overview" && (
                <div className="space-y-6">
                  {/* Visual Trends Chart Card */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Donation Trends &amp; Revenue Velocity
                        </h3>
                        <p className="text-xs text-gray-500">
                          Timeline distribution of incoming gifts aggregated by period.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-magenta bg-pink-50 px-3 py-1 rounded-full">
                        {reportsData?.timeline?.length || 0} Data Intervals
                      </span>
                    </div>

                    {/* SVG Bar Chart Visualization */}
                    {reportsData?.timeline && reportsData.timeline.length > 0 ? (
                      <div className="pt-6 pb-2">
                        <div className="h-48 flex items-end gap-3 sm:gap-6 border-b border-gray-100 pb-2">
                          {reportsData.timeline.map((item, idx) => {
                            const maxVal = Math.max(...reportsData.timeline.map(t => t.totalAmount), 1);
                            const heightPct = Math.max(12, Math.round((item.totalAmount / maxVal) * 100));
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                                {/* Tooltip */}
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                                  £{item.totalAmount.toFixed(2)} ({item.count} gifts)
                                </div>
                                <div className="w-full max-w-[48px] bg-pink-100 rounded-t-xl group-hover:bg-magenta transition-colors relative overflow-hidden flex items-end justify-center" style={{ height: `${heightPct}%` }}>
                                  <div className="w-full bg-magenta rounded-t-xl" style={{ height: item.totalAmount > 0 ? '100%' : '0%' }}></div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 truncate max-w-[60px]">
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-xs text-gray-400">
                        No donation timeline events recorded for this selected filter period.
                      </div>
                    )}
                  </div>

                  {/* Two-Column Split: One-off vs Recurring & Trust Balance Integrity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* One-off vs Recurring Split */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                        One-Time vs. Recurring Contributions
                      </h3>
                      <p className="text-xs text-gray-500 mb-5">
                        Breakdown between single gifts and sustainable recurring pledges.
                      </p>

                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                          <div
                            className="bg-magenta h-full transition-all"
                            style={{ width: `${reportsData?.donationTypeSplit?.oneOff?.percentage || 0}%` }}
                            title="One-Off Gifts"
                          ></div>
                          <div
                            className="bg-emerald-500 h-full transition-all"
                            style={{ width: `${reportsData?.donationTypeSplit?.recurring?.percentage || 0}%` }}
                            title="Recurring Pledges"
                          ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="p-3.5 bg-pink-50/50 rounded-xl border border-pink-100">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-magenta mb-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-magenta"></span>
                              <span>One-Time Direct Gifts</span>
                            </div>
                            <div className="text-xl font-black text-slate-900">
                              £{(reportsData?.donationTypeSplit?.oneOff?.totalAmount || 0).toFixed(2)}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              {reportsData?.donationTypeSplit?.oneOff?.count || 0} gifts ({Math.round(reportsData?.donationTypeSplit?.oneOff?.percentage || 0)}%)
                            </div>
                          </div>

                          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                              <span>Recurring Monthly Pledges</span>
                            </div>
                            <div className="text-xl font-black text-slate-900">
                              £{(reportsData?.donationTypeSplit?.recurring?.totalAmount || 0).toFixed(2)}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              {reportsData?.donationTypeSplit?.recurring?.count || 0} pledges ({Math.round(reportsData?.donationTypeSplit?.recurring?.percentage || 0)}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strict 3-Way Financial Balance */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                        Strict 3-Way Financial Integrity
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Separation between Donations Received, Assistance Allocated, and Actually Distributed.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <span className="text-xs font-bold text-slate-700">1. Total Donations Received (Funds In)</span>
                          <span className="text-xs font-black text-emerald-600">
                            £{(reportsData?.summary?.totalDonationsReceived || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <span className="text-xs font-bold text-slate-700">2. Funds Allocated (Committed to Grants)</span>
                          <span className="text-xs font-black text-blue-600">
                            £{(reportsData?.summary?.totalAllocatedAmount || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <span className="text-xs font-bold text-slate-700">3. Actually Distributed (Disbursed Out)</span>
                          <span className="text-xs font-black text-purple-600">
                            £{(reportsData?.summary?.totalDistributedAmount || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50 border border-pink-100 font-bold">
                          <span className="text-xs text-magenta">Pending Disbursement to Clients</span>
                          <span className="text-xs text-magenta">
                            £{(reportsData?.summary?.totalPendingDistribution || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Donations by Period */}
              {reportsActiveSubTab === "timeline" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">Donations Audit by Date / Period</h3>
                      <p className="text-xs text-gray-500">Historical breakdown of funds incoming across intervals.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => exportReportsCsv("timeline")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-700 hover:bg-gray-50"
                    >
                      <Download size={13} className="text-magenta" />
                      <span>Export Period CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                          <th className="py-3 px-4">Period / Date</th>
                          <th className="py-3 px-4">Total Amount Received</th>
                          <th className="py-3 px-4">Number of Gifts</th>
                          <th className="py-3 px-4">One-Off Gifts</th>
                          <th className="py-3 px-4">Recurring Gifts</th>
                          <th className="py-3 px-4 text-right">Average Gift</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {reportsData?.timeline && reportsData.timeline.length > 0 ? (
                          reportsData.timeline.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                <div>{row.label}</div>
                                <div className="text-[10px] text-gray-400 font-mono">{row.date}</div>
                              </td>
                              <td className="py-3.5 px-4 font-black text-emerald-600">
                                £{row.totalAmount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-700">
                                {row.count} gifts
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-magenta">
                                £{row.oneOffAmount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-blue-600">
                                £{row.recurringAmount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 text-right font-bold text-slate-700">
                                £{(row.count > 0 ? row.totalAmount / row.count : 0).toFixed(2)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-400">
                              No donation records found for this period.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Campaign Performance */}
              {reportsActiveSubTab === "campaigns" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">Campaign Fundraising Matrix</h3>
                      <p className="text-xs text-gray-500">Fund distribution across active and completed causes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => exportReportsCsv("campaigns")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-700 hover:bg-gray-50"
                    >
                      <Download size={13} className="text-magenta" />
                      <span>Export Campaigns CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                          <th className="py-3 px-4">Campaign Title</th>
                          <th className="py-3 px-4">Target Goal</th>
                          <th className="py-3 px-4">Total Raised All-Time</th>
                          <th className="py-3 px-4">Period Donations</th>
                          <th className="py-3 px-4">Share of Period Total</th>
                          <th className="py-3 px-4">Target Progress</th>
                          <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {reportsData?.campaigns && reportsData.campaigns.length > 0 ? (
                          reportsData.campaigns.map((camp) => (
                            <tr key={camp.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                <div>{camp.title}</div>
                                <div className="text-[10px] text-gray-400 font-mono">ID: {camp.id}</div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-600">
                                {camp.targetAmount > 0 ? `£${camp.targetAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "Open Pool"}
                              </td>
                              <td className="py-3.5 px-4 font-black text-slate-900">
                                £{camp.raisedAmountAllTime.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-4 font-black text-emerald-600">
                                £{camp.periodDonations.toFixed(2)} ({camp.periodDonationsCount} gifts)
                              </td>
                              <td className="py-3.5 px-4 font-bold text-magenta">
                                {camp.percentOfTotalDonations.toFixed(1)}%
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="bg-magenta h-full rounded-full"
                                      style={{ width: `${Math.min(100, camp.progressPercent)}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-[11px] font-bold text-slate-700">
                                    {camp.progressPercent.toFixed(0)}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    camp.active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  {camp.active ? "ACTIVE" : "INACTIVE"}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-gray-400">
                              No campaign data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Donor Growth & Top Donors */}
              {reportsActiveSubTab === "donors" && (
                <div className="space-y-6">
                  {/* Donor Growth & Retention Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Total Registered Donors
                      </span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {reportsData?.summary?.totalDonorsCount || 0}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Live CRM supporter registry</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Repeat Donors Rate
                      </span>
                      <div className="text-2xl font-black text-emerald-600 mt-1">
                        {reportsData?.summary?.repeatDonorsCount || 0} supporters
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        Multiple gifts given ({Math.round(((reportsData?.summary?.repeatDonorsCount || 0) / Math.max(1, reportsData?.summary?.totalDonorsCount || 1)) * 100)}% retention)
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Single-Gift Donors
                      </span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {reportsData?.summary?.singleGiftDonorsCount || 0}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Prime candidates for stewardship</div>
                    </div>
                  </div>

                  {/* Top Donors Leaderboard */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Top Donors Leaderboard</h3>
                        <p className="text-xs text-gray-500">Highest lifetime and period contributors.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => exportReportsCsv("top_donors")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-700 hover:bg-gray-50"
                      >
                        <Download size={13} className="text-magenta" />
                        <span>Export Top Donors CSV</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <th className="py-3 px-4">Rank</th>
                            <th className="py-3 px-4">Donor Name &amp; Contact</th>
                            <th className="py-3 px-4">Giving Tier</th>
                            <th className="py-3 px-4">Total Contributed</th>
                            <th className="py-3 px-4">Number of Gifts</th>
                            <th className="py-3 px-4">Average Gift</th>
                            <th className="py-3 px-4 text-right">Consent</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {reportsData?.topDonors && reportsData.topDonors.length > 0 ? (
                            reportsData.topDonors.map((donor, idx) => (
                              <tr key={donor.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-3.5 px-4 font-black text-slate-400">
                                  #{idx + 1}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-slate-900">{donor.name}</div>
                                  <div className="text-[10px] text-gray-400">{donor.email} • {donor.location}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-pink-50 text-magenta uppercase">
                                    ★ {donor.tier}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-black text-emerald-600">
                                  £{donor.totalContributed.toFixed(2)}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-slate-700">
                                  {donor.donationsCount} gifts
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-700">
                                  £{donor.averageGift.toFixed(2)}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${donor.newsletterConsent ? "text-emerald-700 bg-emerald-50" : "text-gray-400 bg-gray-50"}`}>
                                    {donor.newsletterConsent ? "Consented" : "Opted-out"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-gray-400">
                                No donor records available for leaderboard.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: One-Off vs Recurring */}
              {reportsActiveSubTab === "one_off_recurring" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* One-off deep dive */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-pink-100 text-magenta flex items-center justify-center font-bold">
                            1x
                          </div>
                          <h3 className="text-sm font-extrabold text-slate-900">One-Time Charitable Gifts</h3>
                        </div>
                        <span className="text-xs font-bold text-magenta bg-pink-50 px-2.5 py-1 rounded-full">
                          {Math.round(reportsData?.donationTypeSplit?.oneOff?.percentage || 0)}% of Revenue
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Total Gift Volume</span>
                            <span className="font-bold text-slate-900">{reportsData?.donationTypeSplit?.oneOff?.count || 0} donations</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Total Revenue Generated</span>
                            <span className="font-black text-slate-900">£{(reportsData?.donationTypeSplit?.oneOff?.totalAmount || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Average Gift Value</span>
                            <span className="font-bold text-emerald-600">£{(reportsData?.donationTypeSplit?.oneOff?.averageGift || 0).toFixed(2)}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed">
                          One-off gifts represent immediate emergency support for specific appeals. Ideal for conversion into recurring supporters.
                        </p>
                      </div>
                    </div>

                    {/* Recurring deep dive */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            ∞
                          </div>
                          <h3 className="text-sm font-extrabold text-slate-900">Recurring Monthly Pledges</h3>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          {Math.round(reportsData?.donationTypeSplit?.recurring?.percentage || 0)}% of Revenue
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Active Monthly Pledges</span>
                            <span className="font-bold text-slate-900">{reportsData?.donationTypeSplit?.recurring?.count || 0} subscriptions</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Monthly Run-Rate (MRR)</span>
                            <span className="font-black text-emerald-600">£{(reportsData?.donationTypeSplit?.recurring?.totalAmount || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Average Recurring Gift</span>
                            <span className="font-bold text-slate-900">£{(reportsData?.donationTypeSplit?.recurring?.averageGift || 0).toFixed(2)} / mo</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed">
                          Recurring pledges form the financial bedrock of the Trust, funding continuous casework, utility grants, and emergency refuge shelter operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 6: Beneficiary Support Reports */}
              {reportsActiveSubTab === "beneficiaries" && (
                <div className="space-y-6">
                  {/* Status & Urgency Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Emergency Urgency</span>
                      <div className="text-xl font-black text-red-600 mt-1">
                        {reportsData?.beneficiarySupport?.byUrgency?.emergency || 0}
                      </div>
                      <span className="text-[10px] text-gray-500">Immediate relief dispatched</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">High Priority</span>
                      <div className="text-xl font-black text-amber-600 mt-1">
                        {reportsData?.beneficiarySupport?.byUrgency?.high || 0}
                      </div>
                      <span className="text-[10px] text-gray-500">Expedited triage queue</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Approved Cases</span>
                      <div className="text-xl font-black text-emerald-600 mt-1">
                        {reportsData?.beneficiarySupport?.byStatus?.approved || 0}
                      </div>
                      <span className="text-[10px] text-gray-500">Grants dispatches verified</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">In Active Casework</span>
                      <div className="text-xl font-black text-blue-600 mt-1">
                        {reportsData?.beneficiarySupport?.byStatus?.inProgress || 0}
                      </div>
                      <span className="text-[10px] text-gray-500">Advocate casework ongoing</span>
                    </div>
                  </div>

                  {/* Service Breakdown Table */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Beneficiary Casework by Support Category</h3>
                        <p className="text-xs text-gray-500">Relief requests triage across emergency services.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => exportReportsCsv("beneficiaries")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-700 hover:bg-gray-50"
                      >
                        <Download size={13} className="text-magenta" />
                        <span>Export Casework CSV</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <th className="py-3 px-4">Support Service</th>
                            <th className="py-3 px-4">Total Cases</th>
                            <th className="py-3 px-4">Approved</th>
                            <th className="py-3 px-4">In Progress</th>
                            <th className="py-3 px-4">Pending</th>
                            <th className="py-3 px-4">People Reached</th>
                            <th className="py-3 px-4 text-right">Resolution Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {reportsData?.beneficiarySupport?.byService && reportsData.beneficiarySupport.byService.length > 0 ? (
                            reportsData.beneficiarySupport.byService.map((service, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-slate-900">
                                  {service.serviceType}
                                </td>
                                <td className="py-3.5 px-4 font-black text-slate-900">
                                  {service.total}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-emerald-600">
                                  {service.approved}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-blue-600">
                                  {service.inProgress}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-amber-600">
                                  {service.pending}
                                </td>
                                <td className="py-3.5 px-4 font-black text-magenta">
                                  {service.peopleReached} family members
                                </td>
                                <td className="py-3.5 px-4 text-right font-bold text-slate-700">
                                  {service.resolutionRate.toFixed(0)}%
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-gray-400">
                                No casework service data recorded.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 7: Fund Allocation & Distribution */}
              {reportsActiveSubTab === "allocations" && (
                <div className="space-y-6">
                  {/* Category Breakdown Table */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Fund Allocation vs. Actual Distribution</h3>
                        <p className="text-xs text-gray-500">Breakdown of committed grants versus disbursed funds by relief category.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => exportReportsCsv("allocations")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-700 hover:bg-gray-50"
                      >
                        <Download size={13} className="text-magenta" />
                        <span>Export Allocations CSV</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <th className="py-3 px-4">Assistance Category</th>
                            <th className="py-3 px-4">Allocated (Committed)</th>
                            <th className="py-3 px-4">Actually Distributed</th>
                            <th className="py-3 px-4">Pending Disbursement</th>
                            <th className="py-3 px-4">Recipients</th>
                            <th className="py-3 px-4 text-right">Completion Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {reportsData?.fundDistribution?.byType && reportsData.fundDistribution.byType.length > 0 ? (
                            reportsData.fundDistribution.byType.map((item, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-slate-900">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-pink-50 text-magenta uppercase">
                                    {item.type.replace(/_/g, " ")}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-blue-600">
                                  £{item.allocated.toFixed(2)}
                                </td>
                                <td className="py-3.5 px-4 font-black text-purple-600">
                                  £{item.distributed.toFixed(2)}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-amber-600">
                                  £{item.pending.toFixed(2)}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-slate-700">
                                  {item.beneficiariesCount} individuals
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="font-bold text-slate-700">{item.percentDistributed.toFixed(0)}%</span>
                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className="bg-purple-600 h-full rounded-full"
                                        style={{ width: `${Math.min(100, item.percentDistributed)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-gray-400">
                                No fund allocation records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment Method Breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                      Assistance Payment Methods Disbursed
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Voucher types, bank transfers, and relief provisions dispatched to beneficiaries.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {reportsData?.fundDistribution?.byPaymentMethod && reportsData.fundDistribution.byPaymentMethod.length > 0 ? (
                        reportsData.fundDistribution.byPaymentMethod.map((pm, idx) => (
                          <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-slate-900">{pm.method}</div>
                              <div className="text-[10px] text-gray-400">{pm.count} distributions</div>
                            </div>
                            <div className="text-sm font-black text-purple-600">
                              £{pm.total.toFixed(2)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-xs text-gray-400 py-3 text-center">
                          No distributions recorded yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          
          {/* ========================================================================= */}
          {/* TAB 8: STAFF AND ADMIN ACTIVITY MANAGEMENT                                */}
          {/* ========================================================================= */}
          {activeTab === "staff" && (
            <div className="space-y-6">
              {/* Header & Far-Right Action Buttons */}
              <div
                className="admin-crm-header admin-page-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 text-magenta">
                      Governance &amp; Oversight
                    </span>
                    <span className="text-xs font-bold text-gray-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Verified Audit History
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Staff &amp; Admin Activity Management
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Manage staff credentials, department roles and permissions, review recent administrative actions, and inspect the immutable audit log.
                  </p>
                </div>

                {/* Far-Right Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={exportAuditLogsCsv}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-slate-700 hover:bg-gray-50 shadow-sm transition-all"
                  >
                    <Download size={14} className="text-magenta" />
                    <span>Export Audit Trail (CSV)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewStaffName("");
                      setNewStaffEmail("");
                      setNewStaffPhone("");
                      setNewStaffRole("CASEWORKER");
                      setNewStaffDept("Crisis & Domestic Abuse Support");
                      setNewStaffJobTitle("Casework Advocate");
                      setNewStaffPermissions([
                        "beneficiaries:read",
                        "beneficiaries:write",
                        "allocations:read",
                        "reports:view"
                      ]);
                      setShowAddStaffModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-magenta text-white text-xs font-bold shadow-md hover:bg-magenta-deep transition-all"
                  >
                    <UserPlus size={14} />
                    <span>+ Add New Staff Member</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Cards (admin-kpi-grid) */}
              <div
                className="admin-kpi-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                {/* 1. Total Staff & Officers */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Staff &amp; Administrators
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-pink-50 text-magenta flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {staffStats?.totalStaff || staffList.length} Accounts
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ✓ {staffStats?.activeStaff || staffList.filter(s => s.active).length} active verified accounts
                  </div>
                </div>

                {/* 2. Active Caseworkers */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Crisis Advocates &amp; Caseworkers
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <HeartHandshake size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {staffStats?.caseworkerCount || staffList.filter(s => s.staffRole === "CASEWORKER" || s.staffRole === "ADVOCATE").length} Officers
                  </div>
                  <div className="text-[11px] text-purple-600 font-semibold mt-1">
                    Assigned to client relief intake
                  </div>
                </div>

                {/* 3. System Administrators */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Executive Governance
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {staffStats?.adminCount || staffList.filter(s => s.role === "ADMIN" || s.staffRole === "SUPER_ADMIN").length} Admins
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-1">
                    Full audit &amp; security authority
                  </div>
                </div>

                {/* 4. Logged Audit Events */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Recorded Audit Events
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <History size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {auditTotalCount} Events
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Verified immutable log
                  </div>
                </div>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setStaffSubTab("staff_directory")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    staffSubTab === "staff_directory"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Users size={14} />
                  <span>Staff Account Directory</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${staffSubTab === "staff_directory" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {staffList.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStaffSubTab("roles_permissions")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    staffSubTab === "roles_permissions"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Key size={14} />
                  <span>Roles &amp; Permissions Matrix</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStaffSubTab("audit_history")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    staffSubTab === "audit_history"
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <History size={14} />
                  <span>Audit History &amp; Recent Activities</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${staffSubTab === "audit_history" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {auditTotalCount}
                  </span>
                </button>
              </div>

              {/* Sub-Tab 1: Staff Account Directory */}
              {staffSubTab === "staff_directory" && (
                <div className="space-y-4">
                  {/* Search & Filter Toolbar */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
                    <div className="flex-1 min-w-[260px] relative">
                      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search staff by name, email, department, or job title..."
                        value={staffSearch}
                        onChange={(e) => setStaffSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={staffRoleFilter}
                        onChange={(e) => setStaffRoleFilter(e.target.value)}
                        className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value="ALL">All Roles</option>
                        <option value="SUPER_ADMIN">Super Administrator</option>
                        <option value="ADMIN">Charity Administrator</option>
                        <option value="CASEWORKER">Senior Caseworker</option>
                        <option value="ADVOCATE">Crisis Advocate</option>
                        <option value="FINANCE_OFFICER">Finance Officer</option>
                        <option value="CAMPAIGN_COORDINATOR">Campaign Coordinator</option>
                      </select>

                      <select
                        value={staffDeptFilter}
                        onChange={(e) => setStaffDeptFilter(e.target.value)}
                        className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value="ALL">All Departments</option>
                        <option value="Executive & Governance">Executive &amp; Governance</option>
                        <option value="Crisis & Domestic Abuse Support">Crisis &amp; Domestic Abuse</option>
                        <option value="Energy & Utility Relief">Energy &amp; Utility Relief</option>
                        <option value="Finance & Compliance">Finance &amp; Compliance</option>
                        <option value="Community Outreach & Campaigns">Community Outreach</option>
                      </select>
                    </div>
                  </div>

                  {/* Staff Table */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <th className="py-3 px-4">Staff Member</th>
                            <th className="py-3 px-4">Role &amp; Authority</th>
                            <th className="py-3 px-4">Department &amp; Title</th>
                            <th className="py-3 px-4">Permissions</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {staffList
                            .filter((s) => {
                              const matchSearch =
                                !staffSearch ||
                                s.fullName.toLowerCase().includes(staffSearch.toLowerCase()) ||
                                s.email.toLowerCase().includes(staffSearch.toLowerCase()) ||
                                (s.department || "").toLowerCase().includes(staffSearch.toLowerCase()) ||
                                (s.jobTitle || "").toLowerCase().includes(staffSearch.toLowerCase());
                              const matchRole =
                                staffRoleFilter === "ALL" ||
                                s.staffRole === staffRoleFilter ||
                                (staffRoleFilter === "ADMIN" && s.role === "ADMIN");
                              const matchDept =
                                staffDeptFilter === "ALL" || s.department === staffDeptFilter;
                              return matchSearch && matchRole && matchDept;
                            })
                            .map((staff) => {
                              const roleKey = staff.staffRole || (staff.role === "ADMIN" ? "SUPER_ADMIN" : "CASEWORKER");
                              let badgeClass = "bg-purple-50 text-purple-700";
                              if (roleKey === "SUPER_ADMIN") badgeClass = "bg-pink-100 text-magenta font-black";
                              else if (roleKey === "ADMIN") badgeClass = "bg-blue-50 text-blue-700 font-bold";
                              else if (roleKey === "FINANCE_OFFICER") badgeClass = "bg-emerald-50 text-emerald-700 font-bold";
                              else if (roleKey === "CAMPAIGN_COORDINATOR") badgeClass = "bg-amber-50 text-amber-700 font-bold";

                              return (
                                <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* Staff Member */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-pink-100 text-magenta font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                                        {staff.fullName.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="font-bold text-slate-900">{staff.fullName}</div>
                                        <div className="text-[10px] text-gray-400 font-medium">{staff.email}</div>
                                        {staff.phoneNumber && (
                                          <div className="text-[10px] text-gray-400">{staff.phoneNumber}</div>
                                        )}
                                      </div>
                                    </div>
                                  </td>

                                  {/* Role */}
                                  <td className="py-3.5 px-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide ${badgeClass}`}>
                                      ★ {roleKey.replace(/_/g, " ")}
                                    </span>
                                  </td>

                                  {/* Department & Job Title */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-semibold text-slate-800">{staff.jobTitle || "Casework Advocate"}</div>
                                    <div className="text-[10px] text-gray-500">{staff.department || "General Relief"}</div>
                                  </td>

                                  {/* Permissions */}
                                  <td className="py-3.5 px-4">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                      {Array.isArray(staff.permissions) ? `${staff.permissions.length} capabilities` : "Full platform"}
                                    </span>
                                  </td>

                                  {/* Status */}
                                  <td className="py-3.5 px-4">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleStaffActive(staff)}
                                      title={staff.active ? "Click to deactivate" : "Click to activate"}
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                                        staff.active
                                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                          : "bg-red-50 text-red-600 hover:bg-red-100"
                                      }`}
                                    >
                                      <span className={`w-1.5 h-1.5 rounded-full ${staff.active ? "bg-emerald-500" : "bg-red-500"}`}></span>
                                      <span>{staff.active ? "Active" : "Inactive"}</span>
                                    </button>
                                  </td>

                                  {/* Actions */}
                                  <td className="py-3.5 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingStaff(staff);
                                          setEditStaffName(staff.fullName);
                                          setEditStaffPhone(staff.phoneNumber || "");
                                          setEditStaffRole(staff.staffRole || (staff.role === "ADMIN" ? "SUPER_ADMIN" : "CASEWORKER"));
                                          setEditStaffDept(staff.department || "");
                                          setEditStaffJobTitle(staff.jobTitle || "");
                                          setEditStaffActive(staff.active);
                                          setEditStaffPermissions(Array.isArray(staff.permissions) ? staff.permissions : []);
                                        }}
                                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-magenta hover:border-magenta hover:bg-pink-50 transition-colors"
                                        title="Edit staff details and permissions"
                                      >
                                        <Edit size={13} />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => setDeletingStaff(staff)}
                                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors"
                                        title="Remove staff member"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Roles & Permissions Governance Matrix */}
              {staffSubTab === "roles_permissions" && (
                <div className="space-y-6">
                  {/* Governance Callout */}
                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-2xl flex items-start gap-3">
                    <ShieldCheck size={20} className="text-magenta flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Charity Commission &amp; Trust Governance Note
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        The exact staff roles and permissions should be finalized with the Trust board and lead caseworkers. Below is the operational baseline established for UK registered charity compliance (UK Charity #1137350), ensuring segregation of duties across donations, approvals, and fund disbursements.
                      </p>
                    </div>
                  </div>

                  {/* Standard Roles Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Role 1: Super Admin */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-100 text-magenta">
                          Super Administrator
                        </span>
                        <ShieldCheck size={16} className="text-magenta" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Executive &amp; Governance Lead</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Unconstrained control across all administrative modules, staff provisioning, reporting exports, and security audit log oversight.
                      </p>
                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                        <div className="font-bold text-slate-800">Assigned Team Members:</div>
                        <div>• Zinthiya Ganeshpanchan (Founder &amp; CEO)</div>
                        <div>• System Administrator</div>
                      </div>
                    </div>

                    {/* Role 2: Caseworker & Advocate */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-50 text-purple-700">
                          Senior Caseworker
                        </span>
                        <HeartHandshake size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Crisis &amp; Hardship Advocacy</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Client intake, urgency assessment, identity &amp; residency verification, relief application review, and emergency voucher dispatch.
                      </p>
                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                        <div className="font-bold text-slate-800">Assigned Team Members:</div>
                        <div>• Sarah Davies (Senior Crisis Caseworker)</div>
                        <div>• Priya Patel (Energy Advice Specialist)</div>
                      </div>
                    </div>

                    {/* Role 3: Finance Officer */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">
                          Finance &amp; Compliance
                        </span>
                        <Wallet size={16} className="text-emerald-600" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Grants &amp; Financial Accounting</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Recording offline gifts (cash, bank transfer), assistance fund allocations, voucher redemption tracking, and Gift Aid tax reconciliations.
                      </p>
                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                        <div className="font-bold text-slate-800">Assigned Team Members:</div>
                        <div>• Marcus Sterling (Finance &amp; Grants Officer)</div>
                      </div>
                    </div>

                    {/* Role 4: Campaign Coordinator */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700">
                          Campaign Lead
                        </span>
                        <Compass size={16} className="text-amber-600" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Fundraising &amp; Outreach</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Authoring public appeal stories, monitoring fundraising targets, coordinating community drives, and auditing campaign progress.
                      </p>
                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                        <div className="font-bold text-slate-800">Assigned Team Members:</div>
                        <div>• David Robinson (Outreach Coordinator)</div>
                      </div>
                    </div>
                  </div>

                  {/* Permission Catalog Matrix */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Standard Functional Permission Catalog
                    </h3>
                    <p className="text-xs text-gray-500">
                      Granular capabilities assigned to staff roles across platform operational modules.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <Users size={14} className="text-magenta" />
                          <span>Donors &amp; CRM</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donors:read</code> - View supporter directory</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donors:write</code> - Create &amp; update donor profiles</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donors:manage</code> - Full CRM management</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <Compass size={14} className="text-magenta" />
                          <span>Fundraising Appeals</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">campaigns:read</code> - View public causes</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">campaigns:write</code> - Author campaign goals</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">campaigns:manage</code> - Archive or deactivate</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <CreditCard size={14} className="text-magenta" />
                          <span>Donation Ledger</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donations:read</code> - Audit ledger entries</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donations:write</code> - Record cash / BACS gifts</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">donations:manage</code> - Status &amp; Gift Aid oversight</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <HeartHandshake size={14} className="text-magenta" />
                          <span>Beneficiaries &amp; Casework</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">beneficiaries:read</code> - View confidential files</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">beneficiaries:write</code> - Log casework notes &amp; documents</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">beneficiaries:approve</code> - Authorize relief grants</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <Wallet size={14} className="text-magenta" />
                          <span>Fund Allocation</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">allocations:read</code> - View committed funds</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">allocations:distribute</code> - Disburse vouchers &amp; cash</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">allocations:cancel</code> - Revert unused grant funds</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <ShieldCheck size={14} className="text-magenta" />
                          <span>Staff &amp; Compliance</span>
                        </div>
                        <ul className="text-[11px] text-gray-600 space-y-1">
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">reports:view</code> - Access board analytics</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">audit:view</code> - Inspect accountability history</li>
                          <li>• <code className="text-[10px] bg-white px-1 py-0.5 rounded">staff:manage</code> - Provision staff accounts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Recent Admin Activities & Audit History */}
              {staffSubTab === "audit_history" && (
                <div className="space-y-4">
                  {/* Filter Toolbar */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <History size={16} className="text-magenta" />
                        <span className="text-xs font-bold text-slate-700">Audit Trail Filters:</span>
                      </div>

                      {(auditSearch || auditActionFilter !== "ALL" || auditEntityFilter !== "ALL" || auditActorFilter !== "ALL" || auditStartDate || auditEndDate) && (
                        <button
                          type="button"
                          onClick={() => {
                            setAuditSearch("");
                            setAuditActionFilter("ALL");
                            setAuditEntityFilter("ALL");
                            setAuditActorFilter("ALL");
                            setAuditStartDate("");
                            setAuditEndDate("");
                          }}
                          className="text-xs font-bold text-magenta hover:underline"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search details, actor, or ref..."
                          value={auditSearch}
                          onChange={(e) => setAuditSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                        />
                      </div>

                      {/* Action Type */}
                      <select
                        value={auditActionFilter}
                        onChange={(e) => setAuditActionFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value="ALL">All Action Types</option>
                        <option value="BENEFICIARY_APPROVED">Beneficiary Approved</option>
                        <option value="BENEFICIARY_REJECTED">Beneficiary Rejected</option>
                        <option value="ALLOCATION_CREATED">Allocation Created</option>
                        <option value="ALLOCATION_DISTRIBUTED">Assistance Distributed</option>
                        <option value="DONATION_RECORDED">Donation Recorded</option>
                        <option value="DONATION_UPDATED">Donation Updated</option>
                        <option value="CAMPAIGN_UPDATED">Campaign Updated</option>
                        <option value="STAFF_CREATED">Staff Created</option>
                        <option value="STAFF_UPDATED">Staff Updated</option>
                      </select>

                      {/* Entity Type */}
                      <select
                        value={auditEntityFilter}
                        onChange={(e) => setAuditEntityFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value="ALL">All Entity Modules</option>
                        <option value="Beneficiary">Beneficiary</option>
                        <option value="Allocation">Allocation</option>
                        <option value="Donation">Donation</option>
                        <option value="Campaign">Campaign</option>
                        <option value="Staff">Staff</option>
                      </select>

                      {/* Actor */}
                      <select
                        value={auditActorFilter}
                        onChange={(e) => setAuditActorFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value="ALL">All Staff Actors</option>
                        {staffList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.fullName} ({s.staffRole || s.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Audit Logs Table */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <th className="py-3 px-4">Timestamp</th>
                            <th className="py-3 px-4">Action Type</th>
                            <th className="py-3 px-4">Staff Actor</th>
                            <th className="py-3 px-4">Target Entity</th>
                            <th className="py-3 px-4">Description of Action</th>
                            <th className="py-3 px-4 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {auditLogs.length > 0 ? (
                            auditLogs.map((log) => {
                              let actionBadge = "bg-blue-50 text-blue-700";
                              if (log.action.includes("APPROVED") || log.action.includes("DISTRIBUTED")) {
                                actionBadge = "bg-emerald-50 text-emerald-700";
                              } else if (log.action.includes("REJECTED") || log.action.includes("CANCELLED") || log.action.includes("DEACTIVATED")) {
                                actionBadge = "bg-red-50 text-red-700";
                              } else if (log.action.includes("RECORDED") || log.action.includes("CREATED")) {
                                actionBadge = "bg-pink-50 text-magenta font-bold";
                              }

                              return (
                                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* Timestamp */}
                                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                                    <div>{new Date(log.createdAt).toLocaleDateString("en-GB")}</div>
                                    <div className="text-[10px] text-gray-400">{new Date(log.createdAt).toLocaleTimeString("en-GB")}</div>
                                  </td>

                                  {/* Action Type */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${actionBadge}`}>
                                      {log.action.replace(/_/g, " ")}
                                    </span>
                                  </td>

                                  {/* Actor */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <div className="font-bold text-slate-900">{log.actorName}</div>
                                    <div className="text-[10px] text-gray-400">{log.actorEmail} • <span className="font-semibold text-magenta">{log.actorRole}</span></div>
                                  </td>

                                  {/* Entity */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <span className="font-bold text-slate-800">{log.entityTitle || log.entityId || log.entityType}</span>
                                    <div className="text-[10px] text-gray-400">{log.entityType}</div>
                                  </td>

                                  {/* Details */}
                                  <td className="py-3.5 px-4 text-slate-600 max-w-md">
                                    <p className="line-clamp-2 leading-relaxed">{log.details}</p>
                                  </td>

                                  {/* Diff / Details Button */}
                                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                    <button
                                      type="button"
                                      onClick={() => setViewingAuditDiff(log)}
                                      className="px-2.5 py-1 text-xs font-bold text-magenta hover:bg-pink-50 rounded-lg border border-pink-100 transition-colors"
                                    >
                                      Inspect Diff
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-gray-400">
                                No audit events matched the selected filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          
          {/* ========================================================================= */}
          {/* TAB 7: NEWSLETTER MANAGEMENT                                             */}
          {/* ========================================================================= */}
          {activeTab === "newsletter" && (
            <div className="space-y-6">
              {/* Notification Banner */}
              {newsletterSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span>{newsletterSuccessMsg}</span>
                  </div>
                  <button type="button" onClick={() => setNewsletterSuccessMsg("")} className="text-emerald-600 hover:text-emerald-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: "2rem" }}>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Mail className="text-magenta" size={24} />
                    <span>Newsletter & Supporter Communications</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage donor communication consent records under UK GDPR/PECR and broadcast newsletters.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadNewsletterData}
                    disabled={newsletterLoading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <RefreshCw size={13} className={newsletterLoading ? "animate-spin text-magenta" : ""} />
                    <span>Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowComposeNewsletterModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                    style={{ background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)" }}
                  >
                    <Plus size={14} />
                    <span>Compose Newsletter</span>
                  </button>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div className="admin-kpi-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Subscribers</span>
                    <div className="w-8 h-8 rounded-xl bg-pink-50 text-magenta flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {newsletterData?.stats?.totalSubscribers ?? 0}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                    <Check size={12} />
                    <span>100% Opt-in Verified</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Donor Audience</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {newsletterData?.stats?.totalAudience ?? 0}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">
                    Registered trust supporters
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">GDPR Consent Rate</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {newsletterData?.stats?.consentRate ?? 100}%
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 mt-1">
                    UK PECR & DPA 2018 Compliant
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Alternative Channels</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <PhoneCall size={16} />
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 space-y-1">
                    <div>SMS: <span className="text-slate-600">{newsletterData?.stats?.smsSubscribers ?? 0}</span></div>
                    <div>Postal: <span className="text-slate-600">{newsletterData?.stats?.postalSubscribers ?? 0}</span></div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Opt-in outreach preferences</div>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search subscriber name or email..."
                    value={newsletterSearch}
                    onChange={(e) => setNewsletterSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={newsletterChannelFilter}
                    onChange={(e) => setNewsletterChannelFilter(e.target.value)}
                    className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  >
                    <option value="ALL">All Communication Channels</option>
                    <option value="EMAIL">Email Newsletter Consented</option>
                    <option value="SMS">SMS Alerts Consented</option>
                    <option value="POSTAL">Postal Mail Consented</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      const csvHeader = "ID,Full Name,Email,Tier,Email Opt-in,SMS Opt-in,Postal Opt-in,Registered Date\n";
                      const csvRows = (newsletterData?.subscribers || [])
                        .map((s: any) => `"${s.id}","${s.fullName}","${s.email}","${s.donationTier}","${s.emailNewsletter}","${s.smsAlerts}","${s.postalUpdates}","${s.createdAt}"`)
                        .join("\n");
                      const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", `zinthiya_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
                      link.click();
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Users size={16} className="text-magenta" />
                    <span>Consented Newsletter Subscribers ({newsletterData?.subscribers?.length || 0})</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Verified System Records</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50/80 text-gray-500 uppercase tracking-wider text-[11px] border-b border-gray-100">
                        <th className="py-3 px-4 font-bold">Subscriber</th>
                        <th className="py-3 px-4 font-bold">Email Address</th>
                        <th className="py-3 px-4 font-bold">Donor Tier</th>
                        <th className="py-3 px-4 font-bold">Opt-In Date</th>
                        <th className="py-3 px-4 font-bold">GDPR Status</th>
                        <th className="py-3 px-4 font-bold">Active Channels</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-slate-700">
                      {(newsletterData?.subscribers || [])
                        .filter((sub: any) => {
                          if (newsletterSearch.trim()) {
                            const q = newsletterSearch.toLowerCase();
                            const matchName = (sub.fullName || "").toLowerCase().includes(q);
                            const matchEmail = (sub.email || "").toLowerCase().includes(q);
                            if (!matchName && !matchEmail) return false;
                          }
                          if (newsletterChannelFilter === "EMAIL" && !sub.emailNewsletter) return false;
                          if (newsletterChannelFilter === "SMS" && !sub.smsAlerts) return false;
                          if (newsletterChannelFilter === "POSTAL" && !sub.postalUpdates) return false;
                          return true;
                        })
                        .map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-pink-100 text-magenta font-black flex items-center justify-center text-xs">
                                {sub.fullName?.charAt(0) || "D"}
                              </div>
                              <div>
                                <div>{sub.fullName}</div>
                                <div className="text-[10px] text-slate-400 font-normal">ID: {sub.id.slice(0, 8)}</div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">{sub.email}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-pink-50 text-magenta border border-pink-100">
                                {sub.donationTier}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">
                              {new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Check size={10} />
                                <span>Consent Verified</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5">
                                {sub.emailNewsletter && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700">Email</span>
                                )}
                                {sub.smsAlerts && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700">SMS</span>
                                )}
                                {sub.postalUpdates && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-50 text-purple-700">Post</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}

                      {(!newsletterData?.subscribers || newsletterData.subscribers.length === 0) && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No newsletter subscribers recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Past Broadcast History */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Megaphone size={16} className="text-magenta" />
                    <span>Recent Broadcast Campaign Dispatches</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">UK PECR Statutory Log</span>
                </div>

                <div className="space-y-3">
                  {(newsletterData?.campaignsHistory || []).map((camp: any) => (
                    <div key={camp.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{camp.subject}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Sent: {new Date(camp.sentAt).toLocaleString("en-GB")} • Delivered to {camp.recipientsCount} verified supporters
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-center px-3 py-1 bg-white rounded-xl border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">Open Rate</div>
                          <div className="text-xs font-black text-emerald-600">{camp.openRate}%</div>
                        </div>

                        <div className="text-center px-3 py-1 bg-white rounded-xl border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">Click Rate</div>
                          <div className="text-xs font-black text-blue-600">{camp.clickRate}%</div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                          {camp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: SETTINGS                                                          */}
          {/* ========================================================================= */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Notification Banner */}
              {settingsSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span>{settingsSuccessMsg}</span>
                  </div>
                  <button type="button" onClick={() => setSettingsSuccessMsg("")} className="text-emerald-600 hover:text-emerald-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {settingsErrorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-600" />
                    <span>{settingsErrorMsg}</span>
                  </div>
                  <button type="button" onClick={() => setSettingsErrorMsg("")} className="text-red-600 hover:text-red-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: "2rem" }}>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Settings className="text-magenta" size={24} />
                    <span>System & Charity Settings</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Charity Commission registration details, Gift Aid reclaim parameters, automated notification hooks, and security policies.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadSettingsData}
                  disabled={settingsLoading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw size={13} className={settingsLoading ? "animate-spin text-magenta" : ""} />
                  <span>Reload Settings</span>
                </button>
              </div>

              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                {/* Section 1: Statutory Charity Profile */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Landmark size={18} className="text-magenta" />
                    <h2 className="text-sm font-black text-slate-900">Charity Statutory Registration (Charity Commission for England & Wales)</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Official Charity Name</label>
                      <input
                        type="text"
                        value={settingCharityName}
                        onChange={(e) => setSettingCharityName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Charity Commission Reg Number</label>
                      <input
                        type="text"
                        value={settingRegNumber}
                        onChange={(e) => setSettingRegNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Companies House Number</label>
                      <input
                        type="text"
                        value={settingCompanyNumber}
                        onChange={(e) => setSettingCompanyNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Registered Headquarters Address</label>
                      <input
                        type="text"
                        value={settingOfficialAddress}
                        onChange={(e) => setSettingOfficialAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">HMRC Gift Aid Rate (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={settingGiftAidRate}
                          onChange={(e) => setSettingGiftAidRate(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">HMRC reclaims 25p per £1 on eligible UK donations.</p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Primary Official Contact Email</label>
                      <input
                        type="email"
                        value={settingContactEmail}
                        onChange={(e) => setSettingContactEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Main Trust Helpline / Telephone</label>
                      <input
                        type="text"
                        value={settingContactPhone}
                        onChange={(e) => setSettingContactPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Automated Notification Hooks */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Bell size={18} className="text-magenta" />
                    <h2 className="text-sm font-black text-slate-900">Notification Preferences & Alerts</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnDonation}
                        onChange={(e) => setNotifyOnDonation(e.target.checked)}
                        className="mt-1 w-4 h-4 text-magenta rounded focus:ring-magenta"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Email on New Donation Received</div>
                        <div className="text-[11px] text-slate-500">Send instant admin alert when a supporter completes a donation.</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnBeneficiary}
                        onChange={(e) => setNotifyOnBeneficiary(e.target.checked)}
                        className="mt-1 w-4 h-4 text-magenta rounded focus:ring-magenta"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Email on Urgent Crisis Grant Application</div>
                        <div className="text-[11px] text-slate-500">Immediately notify duty caseworker on domestic violence or food crisis intake.</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyWeeklyDigest}
                        onChange={(e) => setNotifyWeeklyDigest(e.target.checked)}
                        className="mt-1 w-4 h-4 text-magenta rounded focus:ring-magenta"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Weekly Executive Summary Digest</div>
                        <div className="text-[11px] text-slate-500">Send automated financial and casework progress report every Monday morning.</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifySecurityAlerts}
                        onChange={(e) => setNotifySecurityAlerts(e.target.checked)}
                        className="mt-1 w-4 h-4 text-magenta rounded focus:ring-magenta"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Security & Failed Login Alerts</div>
                        <div className="text-[11px] text-slate-500">Alert administrators on multiple failed staff logins or unrecognized IP addresses.</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 3: Security & Session Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <ShieldCheck size={18} className="text-magenta" />
                    <h2 className="text-sm font-black text-slate-900">Security, Compliance & Session Controls</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Enforce Two-Factor Authentication (2FA)</div>
                          <div className="text-[11px] text-slate-500">Require TOTP code verification for all staff accounts.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={secTwoFactor}
                          onChange={(e) => setSecTwoFactor(e.target.checked)}
                          className="w-4 h-4 text-magenta rounded focus:ring-magenta"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <label className="block font-bold text-slate-900">Session Inactivity Timeout</label>
                      <select
                        value={secSessionTimeout}
                        onChange={(e) => setSecSessionTimeout(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                      >
                        <option value={15}>15 Minutes Inactivity</option>
                        <option value={30}>30 Minutes Inactivity</option>
                        <option value={60}>60 Minutes Inactivity (Recommended)</option>
                        <option value={120}>120 Minutes Inactivity</option>
                      </select>
                      <p className="text-[10px] text-slate-400">Forces staff re-authentication to prevent unauthorized terminal access.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Strict Audit Logging Policy</div>
                          <div className="text-[11px] text-slate-500">Enforce immutable logging of all beneficiary approvals and disbursements.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={secStrictAudit}
                          onChange={(e) => setSecStrictAudit(e.target.checked)}
                          className="w-4 h-4 text-magenta rounded focus:ring-magenta"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Enforce Strong Password Requirements</div>
                          <div className="text-[11px] text-slate-500">Minimum 8 characters with required upper, lower, numbers & symbols.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={secEnforceStrongPwd}
                          onChange={(e) => setSecEnforceStrongPwd(e.target.checked)}
                          className="w-4 h-4 text-magenta rounded focus:ring-magenta"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={settingsSaving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50"
                    style={{ background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)" }}
                  >
                    {settingsSaving ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Saving Settings...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Save System Settings</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: MY PROFILE & SECURITY                                             */}
          {/* ========================================================================= */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Notification Banners */}
              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span>{profileSuccessMsg}</span>
                  </div>
                  <button type="button" onClick={() => setProfileSuccessMsg("")} className="text-emerald-600 hover:text-emerald-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {profileErrorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-600" />
                    <span>{profileErrorMsg}</span>
                  </div>
                  <button type="button" onClick={() => setProfileErrorMsg("")} className="text-red-600 hover:text-red-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {pwdSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span>{pwdSuccessMsg}</span>
                  </div>
                  <button type="button" onClick={() => setPwdSuccessMsg("")} className="text-emerald-600 hover:text-emerald-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {pwdErrorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-600" />
                    <span>{pwdErrorMsg}</span>
                  </div>
                  <button type="button" onClick={() => setPwdErrorMsg("")} className="text-red-600 hover:text-red-800">
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: "2rem" }}>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <User className="text-magenta" size={24} />
                    <span>My Profile & Security</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage your administrator credentials, personal details, contact preferences, and access permissions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadProfileData}
                  disabled={profileLoading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw size={13} className={profileLoading ? "animate-spin text-magenta" : ""} />
                  <span>Refresh Profile</span>
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Profile Overview Card & Edit Details Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Administrator Overview Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                    <div
                      className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none rounded-full"
                      style={{ background: "radial-gradient(circle, #E6127E 0%, transparent 70%)" }}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white font-black text-2xl flex items-center justify-center shadow-md">
                        {adminProfile?.fullName?.charAt(0) || "A"}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-black text-slate-900">{adminProfile?.fullName || "Senior Administrator"}</h2>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-pink-100 text-magenta">
                            {adminProfile?.staffRole || "SUPER_ADMIN"}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Active Session
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {adminProfile?.email} • {adminProfile?.jobTitle || "Systems Administrator"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {adminProfile?.department || "Executive Operations"} • Registered Charity #1137350
                        </div>
                      </div>
                    </div>

                    {/* Permissions summary chips */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Granted RBAC Security Capabilities:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(adminProfile?.permissions || [
                          "donors:manage",
                          "campaigns:manage",
                          "donations:manage",
                          "beneficiaries:manage",
                          "allocations:manage",
                          "reports:view",
                          "staff:manage",
                          "audit:view"
                        ]).map((perm: string) => (
                          <span key={perm} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 text-slate-700">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Edit Personal & Office Information Form */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <User size={18} className="text-magenta" />
                      <h3 className="text-sm font-black text-slate-900">Personal & Operational Details</h3>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={profileFullName}
                            onChange={(e) => setProfileFullName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Primary Email Address</label>
                          <div className="relative">
                            <input
                              type="email"
                              value={adminProfile?.email || ""}
                              disabled
                              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono cursor-not-allowed"
                            />
                            <Lock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">Official login ID (contact Trust Secretary to change).</p>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Direct Contact Phone</label>
                          <input
                            type="text"
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            placeholder="0116 254 5168"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Official Job Title</label>
                          <input
                            type="text"
                            value={profileJobTitle}
                            onChange={(e) => setProfileJobTitle(e.target.value)}
                            placeholder="e.g. Systems Administrator"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Operational Department</label>
                          <input
                            type="text"
                            value={profileDepartment}
                            onChange={(e) => setProfileDepartment(e.target.value)}
                            placeholder="e.g. Executive Operations"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Emergency Contact & Next of Kin</label>
                          <input
                            type="text"
                            value={profileEmergencyContact}
                            onChange={(e) => setProfileEmergencyContact(e.target.value)}
                            placeholder="Name & Contact Phone"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Office / Street Address</label>
                          <input
                            type="text"
                            value={profileAddress}
                            onChange={(e) => setProfileAddress(e.target.value)}
                            placeholder="12 New Walk"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Town / City</label>
                          <input
                            type="text"
                            value={profileTownCity}
                            onChange={(e) => setProfileTownCity(e.target.value)}
                            placeholder="Leicester"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Postcode</label>
                          <input
                            type="text"
                            value={profilePostcode}
                            onChange={(e) => setProfilePostcode(e.target.value)}
                            placeholder="LE1 6TF"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium uppercase focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                        <button
                          type="submit"
                          disabled={profileSaving}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50"
                          style={{ background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)" }}
                        >
                          {profileSaving ? (
                            <>
                              <RefreshCw size={14} className="animate-spin" />
                              <span>Saving Profile...</span>
                            </>
                          ) : (
                            <>
                              <Check size={14} />
                              <span>Save Profile Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right Column: Change Password & Session Controls */}
                <div className="space-y-6">
                  {/* Change Password Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Lock size={18} className="text-magenta" />
                      <h3 className="text-sm font-black text-slate-900">Change Password</h3>
                    </div>

                    <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={pwdShowCurrent ? "text" : "password"}
                            value={pwdCurrent}
                            onChange={(e) => setPwdCurrent(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-3 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setPwdShowCurrent(!pwdShowCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {pwdShowCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={pwdShowNew ? "text" : "password"}
                            value={pwdNew}
                            onChange={(e) => setPwdNew(e.target.value)}
                            placeholder="At least 8 characters"
                            className="w-full pl-3 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setPwdShowNew(!pwdShowNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {pwdShowNew ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>

                        {/* Real-time strength meter */}
                        {pwdNew && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span>Password Strength:</span>
                              <span className={getPasswordStrength(pwdNew).text}>{getPasswordStrength(pwdNew).label}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all ${getPasswordStrength(pwdNew).color}`}
                                style={{ width: `${getPasswordStrength(pwdNew).score}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={pwdShowConfirm ? "text" : "password"}
                            value={pwdConfirm}
                            onChange={(e) => setPwdConfirm(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full pl-3 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setPwdShowConfirm(!pwdShowConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {pwdShowConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>

                      {/* Password Requirements Checklist */}
                      <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                        <div className="font-bold text-slate-800 text-[10px] uppercase tracking-wider mb-1">Security Standards:</div>
                        <div className={`flex items-center gap-1.5 ${pwdNew.length >= 8 ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                          <Check size={12} className={pwdNew.length >= 8 ? "text-emerald-600" : "text-slate-400"} />
                          <span>Minimum 8 characters</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(pwdNew) ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                          <Check size={12} className={/[A-Z]/.test(pwdNew) ? "text-emerald-600" : "text-slate-400"} />
                          <span>At least 1 uppercase letter</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${/[0-9]/.test(pwdNew) || /[^A-Za-z0-9]/.test(pwdNew) ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                          <Check size={12} className={/[0-9]/.test(pwdNew) || /[^A-Za-z0-9]/.test(pwdNew) ? "text-emerald-600" : "text-slate-400"} />
                          <span>At least 1 number or symbol</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${pwdNew && pwdNew === pwdConfirm ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                          <Check size={12} className={pwdNew && pwdNew === pwdConfirm ? "text-emerald-600" : "text-slate-400"} />
                          <span>Passwords match</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={pwdSaving || !pwdCurrent || !pwdNew || pwdNew !== pwdConfirm}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50"
                        style={{ background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)" }}
                      >
                        {pwdSaving ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Securing Account...</span>
                          </>
                        ) : (
                          <>
                            <Key size={14} />
                            <span>Update Password</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Active Session & Quick Sign Out Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <ShieldCheck size={18} className="text-magenta" />
                      <h3 className="text-sm font-black text-slate-900">Session & Sign Out</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <div className="font-bold text-slate-900">Current Session</div>
                          <div className="text-[11px] text-slate-500">Chrome on Windows • Port 4173</div>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirmModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out of Admin Portal</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {activeTab !== "dashboard" && activeTab !== "donors" && activeTab !== "campaigns" && activeTab !== "donations" && activeTab !== "beneficiaries" && activeTab !== "allocations" && activeTab !== "reports" && activeTab !== "staff" && activeTab !== "newsletter" && activeTab !== "settings" && activeTab !== "profile" && (
            <div className="p-12 text-center bg-white rounded-3xl border border-gray-200">
              <h2 className="text-xl font-extrabold text-gray-900 capitalize mb-2">
                {activeTab} Management
              </h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Ready for the next step. Let me know what you want to add here next!
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-pink-50 text-magenta hover:bg-pink-100"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIEW INDIVIDUAL DONOR PROFILE & COMPLETE DONATION HISTORY        */}
      {/* ========================================================================= */}
      {viewingDonor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewingDonor(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setViewingDonor(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-magenta to-pink-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                {viewingDonor.fullName?.charAt(0) || "D"}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-extrabold text-gray-900">
                    {viewingDonor.fullName}
                  </h2>
                  <DonorTierBadge tier={viewingDonor.donationTier || "SUPPORTER"} />
                </div>
                <div className="text-xs text-gray-500 font-mono mt-0.5">
                  {viewingDonor.email}
                </div>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-3 flex-wrap">
                  {viewingDonor.phoneNumber && (
                    <span className="flex items-center gap-1">
                      <PhoneCall size={11} className="text-magenta" />
                      {viewingDonor.phoneNumber}
                    </span>
                  )}
                  <span>
                    {[viewingDonor.address, viewingDonor.townCity, viewingDonor.postcode].filter(Boolean).join(", ") || "Leicester, United Kingdom"}
                  </span>
                  <span>• Joined: {new Date(viewingDonor.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {/* Giving & Consent Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
                <div className="text-[10px] font-extrabold uppercase text-magenta">Lifetime Giving</div>
                <div className="text-lg font-black text-gray-900 mt-1">
                  £{Number(viewingDonor.totalDonated || 0).toFixed(2)}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <div className="text-[10px] font-extrabold uppercase text-gray-500">Total Gifts</div>
                <div className="text-lg font-black text-gray-900 mt-1">
                  {viewingDonor.donations?.length || viewingDonor.donationsCount || 0}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <div className="text-[10px] font-extrabold uppercase text-gray-500">Last Gift Date</div>
                <div className="text-xs font-bold text-gray-900 mt-1.5">
                  {viewingDonor.lastDonationDate
                    ? new Date(viewingDonor.lastDonationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                    : "None"}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <div className="text-[10px] font-extrabold uppercase text-emerald-800">Newsletter</div>
                <div className="text-xs font-black text-emerald-700 mt-1.5">
                  {viewingDonor.emailNewsletter ? "✓ Consented" : "✕ Opted Out"}
                </div>
              </div>
            </div>

            {/* Communication Preferences Badges */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-50/60 border border-gray-100 text-xs">
              <div className="font-extrabold text-gray-700 text-[11px] uppercase mb-2">
                Communication &amp; Consent Preferences
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className={`px-2.5 py-1 rounded-full font-bold ${viewingDonor.emailNewsletter ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                  Email Newsletter: {viewingDonor.emailNewsletter ? "Opted In" : "Opted Out"}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-bold ${viewingDonor.generalConsent ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                  General Consent: {viewingDonor.generalConsent ? "Granted" : "Withheld"}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-bold ${viewingDonor.smsAlerts ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                  SMS Alerts: {viewingDonor.smsAlerts ? "Active" : "Disabled"}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-bold ${viewingDonor.postalUpdates ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                  Postal Mail: {viewingDonor.postalUpdates ? "Active" : "Disabled"}
                </span>
              </div>
            </div>

            {/* Complete Donation History Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                  <CreditCard size={15} className="text-magenta" />
                  <span>Donation History ({viewingDonor.donations?.length || 0})</span>
                </h3>

                <button
                  type="button"
                  onClick={() => openRecordDonation(viewingDonor)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-pink-50 text-magenta hover:bg-magenta hover:text-white transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Record New Donation</span>
                </button>
              </div>

              {!viewingDonor.donations || viewingDonor.donations.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl border border-gray-100">
                  No previous donations recorded for this donor yet.
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] font-extrabold">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Reference</th>
                        <th className="py-2.5 px-3">Campaign</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Gift Aid</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {viewingDonor.donations.map((dn) => (
                        <tr key={dn.id} className="hover:bg-gray-50">
                          <td className="py-2.5 px-3 whitespace-nowrap text-gray-600 font-semibold">
                            {new Date(dn.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-gray-900">
                            {dn.reference || `ZT-${dn.id.substring(0, 8).toUpperCase()}`}
                          </td>
                          <td className="py-2.5 px-3 text-gray-700">
                            {dn.campaign?.title || "General Relief"}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-magenta">
                              {dn.type === "RECURRING" ? "Monthly" : "One-off"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            {dn.giftAid ? (
                              <span className="text-emerald-600 font-bold text-[10px]">✓ +25% Claimed</span>
                            ) : (
                              <span className="text-gray-400 text-[10px]">No</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right font-black text-gray-900">
                            £{Number(dn.amount).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700">
                              {dn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const d = viewingDonor;
                  setViewingDonor(null);
                  openEditDonor(d);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit Donor Details
              </button>
              <button
                type="button"
                onClick={() => setViewingDonor(null)}
                className="btn-3d-magenta px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW DONOR MODAL                                              */}
      {/* ========================================================================= */}
      {showAddDonorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
          onClick={() => setShowAddDonorModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "34rem",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #FCE7F3",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddDonorModal(false)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center mx-auto mb-2">
                <UserPlus size={22} />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Add New Donor
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Register a new supporter directly into the CRM system.
              </p>
            </div>

            <form onSubmit={handleAddDonorSubmit} className="space-y-4 text-xs">
              {addDonorError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{addDonorError}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={newDonorName}
                  onChange={(e) => setNewDonorName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={newDonorEmail}
                  onChange={(e) => setNewDonorEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 07700 900888"
                    value={newDonorPhone}
                    onChange={(e) => setNewDonorPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Initial Giving Tier</label>
                  <select
                    value={newDonorTier}
                    onChange={(e) => setNewDonorTier(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-bold"
                  >
                    <option value="SUPPORTER">Supporter (&lt;£100)</option>
                    <option value="BRONZE">Bronze (£100+)</option>
                    <option value="SILVER">Silver (£250+)</option>
                    <option value="GOLD">Gold (£500+)</option>
                    <option value="PLATINUM">Platinum (£1,000+)</option>
                  </select>
                </div>
              </div>

              {/* Password & Login Credentials Section */}
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold text-gray-900 text-[11px] uppercase tracking-wider">
                    <Lock size={13} className="text-magenta" />
                    <span>Portal Login Credentials</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateDonorPassword}
                    className="text-[11px] font-bold text-magenta hover:underline flex items-center gap-1"
                  >
                    <Key size={12} />
                    Generate Password
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Assign the password the donor will use to log in to their account. Minimum 8 characters.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Set Password *</label>
                    <div className="relative">
                      <input
                        type={showNewDonorPassword ? "text" : "password"}
                        required
                        placeholder="Min. 8 characters"
                        value={newDonorPassword}
                        onChange={(e) => setNewDonorPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-9 rounded-xl border border-gray-200 outline-none focus:border-magenta text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewDonorPassword(!showNewDonorPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showNewDonorPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showNewDonorConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Repeat password"
                        value={newDonorConfirmPassword}
                        onChange={(e) => setNewDonorConfirmPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-9 rounded-xl border border-gray-200 outline-none focus:border-magenta text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewDonorConfirmPassword(!showNewDonorConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showNewDonorConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Home Address</label>
                <input
                  type="text"
                  placeholder="e.g. 15 Clarendon Park Road"
                  value={newDonorAddress}
                  onChange={(e) => setNewDonorAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Town / City</label>
                  <input
                    type="text"
                    value={newDonorCity}
                    onChange={(e) => setNewDonorCity(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    placeholder="e.g. LE2 3AD"
                    value={newDonorPostcode}
                    onChange={(e) => setNewDonorPostcode(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta uppercase"
                  />
                </div>
              </div>

              {/* Communication Preferences Checkboxes */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="font-extrabold text-gray-700 text-[11px] uppercase">
                  Communication Consent
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDonorNewsletter}
                    onChange={(e) => setNewDonorNewsletter(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>Opt-in to Trust Email Newsletter &amp; Relief Updates</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDonorConsent}
                    onChange={(e) => setNewDonorConsent(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>General Contact &amp; Outreach Consent</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDonorSms}
                    onChange={(e) => setNewDonorSms(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>Receive Emergency Relief SMS Alerts</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddDonorModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAddDonor}
                  className="btn-3d-magenta px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
                >
                  {submittingAddDonor ? "Saving..." : "Save Donor Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EDIT DONOR DETAILS & TIER                                       */}
      {/* ========================================================================= */}
      {editingDonor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditingDonor(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingDonor(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center mx-auto mb-2">
                <Edit size={20} />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Edit Donor Profile
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Updating details for <strong>{editingDonor.email}</strong>
              </p>
            </div>

            <form onSubmit={handleEditDonorSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editDonorName}
                  onChange={(e) => setEditDonorName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editDonorPhone}
                    onChange={(e) => setEditDonorPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Assigned Giving Tier</label>
                  <select
                    value={editDonorTier}
                    onChange={(e) => setEditDonorTier(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-extrabold"
                  >
                    <option value="SUPPORTER">Supporter (&lt;£100)</option>
                    <option value="BRONZE">Bronze (£100+)</option>
                    <option value="SILVER">Silver (£250+)</option>
                    <option value="GOLD">Gold (£500+)</option>
                    <option value="PLATINUM">Platinum (£1,000+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editDonorAddress}
                  onChange={(e) => setEditDonorAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Town / City</label>
                  <input
                    type="text"
                    value={editDonorCity}
                    onChange={(e) => setEditDonorCity(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    value={editDonorPostcode}
                    onChange={(e) => setEditDonorPostcode(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta uppercase"
                  />
                </div>
              </div>

              {/* Communication Consent Settings */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="font-extrabold text-gray-700 text-[11px] uppercase">
                  Manage Communication Consent
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDonorNewsletter}
                    onChange={(e) => setEditDonorNewsletter(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>Email Newsletter (Receive charity newsletters &amp; impact stories)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDonorConsent}
                    onChange={(e) => setEditDonorConsent(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>General Contact Permission</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDonorSms}
                    onChange={(e) => setEditDonorSms(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>SMS Emergency Alerts</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDonorPostal}
                    onChange={(e) => setEditDonorPostal(e.target.checked)}
                    className="accent-magenta w-4 h-4"
                  />
                  <span>Postal Updates</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDonor(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEditDonor}
                  className="btn-3d-magenta px-5 py-2.5 rounded-xl font-bold text-white shadow-md"
                >
                  {submittingEditDonor ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: RECORD DONATION (AUTOMATIC TOTAL & TIER RECALCULATION)            */}
      {/* ========================================================================= */}
      {recordingDonationDonor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setRecordingDonationDonor(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRecordingDonationDonor(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center mx-auto mb-2">
                <Heart size={22} className="fill-magenta/20" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Record Donation
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Recording donation for <strong>{recordingDonationDonor.fullName}</strong>.<br />
                <span className="text-magenta font-semibold">
                  Donor's total giving and tier will automatically update.
                </span>
              </p>
            </div>

            <form onSubmit={handleRecordDonationSubmit} className="space-y-4 text-xs">
              {/* Current Status Box */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Current Giving</div>
                  <div className="font-extrabold text-sm text-gray-900">
                    £{Number(recordingDonationDonor.totalDonated || 0).toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Current Tier</div>
                  <DonorTierBadge tier={recordingDonationDonor.donationTier || "SUPPORTER"} />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Donation Amount (GBP £) *</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setRecordAmount(amt)}
                      className={`py-2 rounded-xl border text-xs font-black transition-colors ${
                        Number(recordAmount) === amt
                          ? "bg-magenta text-white border-magenta shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-pink-50"
                      }`}
                    >
                      £{amt}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  step="any"
                  min="1"
                  required
                  placeholder="Or enter custom amount (£)"
                  value={recordAmount}
                  onChange={(e) => setRecordAmount(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-bold text-sm"
                />
              </div>

              {/* Target Campaign */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Allocated Campaign</label>
                <select
                  value={recordCampaignId}
                  onChange={(e) => setRecordCampaignId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-semibold"
                >
                  <option value="">Zinthiya Trust General Relief Fund</option>
                  {campaignsList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Frequency */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Donation Type</label>
                  <select
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-bold"
                  >
                    <option value="ONE_OFF">One-Time Contribution</option>
                    <option value="RECURRING">Monthly Recurring Gift</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={recordMethod}
                    onChange={(e) => setRecordMethod(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta"
                  >
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="Direct Debit">Direct Debit</option>
                    <option value="Bank Transfer">Bank Transfer / BACS</option>
                    <option value="Cheque / Cash">Cheque / Cash Donation</option>
                  </select>
                </div>
              </div>

              {/* Reference */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Receipt Reference</label>
                <input
                  type="text"
                  value={recordReference}
                  onChange={(e) => setRecordReference(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 outline-none focus:border-magenta font-mono text-xs"
                />
              </div>

              {/* Gift Aid */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={recordGiftAid}
                  onChange={(e) => setRecordGiftAid(e.target.checked)}
                  className="accent-emerald-600 w-4 h-4 mt-0.5"
                />
                <span className="text-[11px] text-emerald-800 leading-tight">
                  <strong>UK Gift Aid Claim (+25%)</strong>: Donor confirmed they are a UK taxpayer. An extra 25p for every £1 will be reclaimed from HMRC.
                </span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRecordingDonationDonor(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingRecordDonation}
                  className="btn-3d-magenta px-5 py-2.5 rounded-xl font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  {submittingRecordDonation ? (
                    "Processing & Updating Tier..."
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Record £{Number(recordAmount || 0).toFixed(2)} &amp; Update Tier</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CAMPAIGN MODAL 1: CREATE NEW CAMPAIGN (INTERNAL VS EXTERNAL FLOW)          */}
      {/* ========================================================================= */}
      {showCreateCampaignModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
          onClick={() => setShowCreateCampaignModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "42rem",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #FCE7F3",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCreateCampaignModal(false)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Compass size={22} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Create New Campaign
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Choose the type of fundraising campaign you want to create.
              </p>
            </div>

            {/* Step 1: Campaign Type Selection Cards */}
            <div className="mb-6">
              <label className="block font-bold text-slate-700 text-xs mb-2">
                1. Select Campaign Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Internal Campaign */}
                <div
                  onClick={() => setNewCampType("INTERNAL")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    newCampType === "INTERNAL"
                      ? "border-magenta bg-pink-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      newCampType === "INTERNAL" ? "bg-magenta text-white shadow-xs" : "bg-slate-100 text-slate-500"
                    }`}>
                      <Compass size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-extrabold text-slate-900">Internal Campaign</h4>
                        <input
                          type="radio"
                          name="campaignTypeChoice"
                          checked={newCampType === "INTERNAL"}
                          onChange={() => setNewCampType("INTERNAL")}
                          className="accent-magenta w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Managed directly by the Trust.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Option 2: External Campaign */}
                <div
                  onClick={() => setNewCampType("EXTERNAL")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    newCampType === "EXTERNAL"
                      ? "border-purple-600 bg-purple-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      newCampType === "EXTERNAL" ? "bg-purple-600 text-white shadow-xs" : "bg-slate-100 text-slate-500"
                    }`}>
                      <Globe size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-extrabold text-slate-900">External Campaign</h4>
                        <input
                          type="radio"
                          name="campaignTypeChoice"
                          checked={newCampType === "EXTERNAL"}
                          onChange={() => setNewCampType("EXTERNAL")}
                          className="accent-purple-600 w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Connected to an external fundraising campaign or fundraiser.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {createCampaignError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{createCampaignError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateCampaignSubmit} className="space-y-4 text-xs">
              {/* ========================================================= */}
              {/* INTERNAL CAMPAIGN FIELDS                                  */}
              {/* ========================================================= */}
              {newCampType === "INTERNAL" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Compass size={14} className="text-magenta" />
                      Internal Campaign Details
                    </span>
                    <span className="text-[11px] font-semibold text-magenta bg-pink-50 px-2 py-0.5 rounded-full">
                      Trust Direct
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campaign Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Winter Heat Support & Warm Meals 2026"
                      value={newCampTitle}
                      onChange={(e) => setNewCampTitle(e.target.value)}
                      className="admin-modal-input font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-bold text-slate-700">Campaign ID</label>
                        <button
                          type="button"
                          onClick={() => setNewCampCode(handleGenerateCampaignCode())}
                          className="text-[10px] font-bold text-magenta hover:underline"
                        >
                          Regenerate ID
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Auto-generated ID"
                        value={newCampCode}
                        onChange={(e) => setNewCampCode(e.target.value)}
                        className="admin-modal-input font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Campaign URL</label>
                      <input
                        type="text"
                        placeholder="e.g. /campaigns/winter-warmth-2026"
                        value={newCampUrl}
                        onChange={(e) => setNewCampUrl(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campaign Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explain the purpose of this campaign and how donor funds will directly assist beneficiaries in Leicester..."
                      value={newCampDescription}
                      onChange={(e) => setNewCampDescription(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:border-magenta text-xs leading-relaxed text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraising Target (£) *</label>
                      <input
                        type="number"
                        step="any"
                        min="1"
                        required
                        placeholder="e.g. 15000"
                        value={newCampTarget}
                        onChange={(e) => setNewCampTarget(e.target.value)}
                        className="admin-modal-input font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Status *</label>
                      <select
                        value={newCampStatus}
                        onChange={(e) => setNewCampStatus(e.target.value as any)}
                        className="admin-modal-select font-semibold"
                      >
                        <option value="ACTIVE">Active (Accepting Donations)</option>
                        <option value="DRAFT">Draft (Under Review)</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newCampStartDate}
                        onChange={(e) => setNewCampStartDate(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={newCampEndDate}
                        onChange={(e) => setNewCampEndDate(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>

                  <CampaignImageUpload
                    label="Campaign Image (Upload from Device)"
                    value={newCampImageUrl}
                    onChange={setNewCampImageUrl}
                    showSuggestions={true}
                  />
                </div>
              )}

              {/* ========================================================= */}
              {/* EXTERNAL CAMPAIGN FIELDS                                  */}
              {/* ========================================================= */}
              {newCampType === "EXTERNAL" && (
                <div className="space-y-5">
                  {/* Section A: Campaign Information */}
                  <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-3">
                    <div className="font-extrabold text-purple-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Globe size={13} className="text-purple-600" />
                      Section A: Campaign Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-bold text-slate-700">Campaign ID</label>
                          <button
                            type="button"
                            onClick={() => setNewCampCode(handleGenerateCampaignCode())}
                            className="text-[10px] font-bold text-purple-600 hover:underline"
                          >
                            Regenerate ID
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Campaign identifier"
                          value={newCampCode}
                          onChange={(e) => setNewCampCode(e.target.value)}
                          className="admin-modal-input font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Campaign Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Leicester 10k Charity Run"
                          value={newCampTitle}
                          onChange={(e) => setNewCampTitle(e.target.value)}
                          className="admin-modal-input font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Campaign URL</label>
                        <input
                          type="text"
                          placeholder="Link to the external campaign"
                          value={newCampUrl}
                          onChange={(e) => setNewCampUrl(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Corporate Sponsor Information</label>
                        <input
                          type="text"
                          placeholder="e.g. Leicester Football Trust / Barclays"
                          value={newCampCorporateSponsor}
                          onChange={(e) => setNewCampCorporateSponsor(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Fundraising Target (£) *</label>
                        <input
                          type="number"
                          step="any"
                          min="1"
                          required
                          placeholder="e.g. 5000"
                          value={newCampTarget}
                          onChange={(e) => setNewCampTarget(e.target.value)}
                          className="admin-modal-input font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Status *</label>
                        <select
                          value={newCampStatus}
                          onChange={(e) => setNewCampStatus(e.target.value as any)}
                          className="admin-modal-select font-semibold"
                        >
                          <option value="ACTIVE">Active (Accepting Donations)</option>
                          <option value="DRAFT">Draft</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={newCampStartDate}
                          onChange={(e) => setNewCampStartDate(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">End Date</label>
                        <input
                          type="date"
                          value={newCampEndDate}
                          onChange={(e) => setNewCampEndDate(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Campaign Description *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Explain the background and fundraising goals of this external campaign..."
                        value={newCampDescription}
                        onChange={(e) => setNewCampDescription(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 outline-none focus:border-purple-600 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Section B: Fundraising Page Information */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink size={13} className="text-slate-600" />
                      Section B: Fundraising Page Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Fundraising Page ID</label>
                        <input
                          type="text"
                          placeholder="e.g. JG-PAGE-84920"
                          value={newCampFundraisingPageId}
                          onChange={(e) => setNewCampFundraisingPageId(e.target.value)}
                          className="admin-modal-input font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Fundraising Page Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah's Half Marathon for Zinthiya"
                          value={newCampFundraisingPageName}
                          onChange={(e) => setNewCampFundraisingPageName(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraising Page URL</label>
                      <input
                        type="url"
                        placeholder="e.g. https://www.justgiving.com/fundraising/sarah-half-marathon"
                        value={newCampFundraisingPageUrl}
                        onChange={(e) => setNewCampFundraisingPageUrl(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>

                  {/* Section C: Fundraiser Information */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck size={13} className="text-slate-600" />
                      Section C: Fundraiser Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Fundraiser Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          value={newCampFundraiserName}
                          onChange={(e) => setNewCampFundraiserName(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Fundraiser Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. sarah.jenkins@example.org"
                          value={newCampFundraiserEmail}
                          onChange={(e) => setNewCampFundraiserEmail(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={newCampFundraiserContactConsent}
                        onChange={(e) => setNewCampFundraiserContactConsent(e.target.checked)}
                        className="accent-purple-600 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-700 font-medium">
                        <strong>Contact Permission Status</strong>: Fundraiser has granted consent to be contacted regarding this campaign.
                      </span>
                    </label>
                  </div>

                  {/* Section D: References and Tracking Information */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText size={13} className="text-slate-600" />
                      Section D: References &amp; Tracking Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Custom Reference Fields</label>
                        <input
                          type="text"
                          placeholder="e.g. EXT-REF-2026-UK"
                          value={newCampCustomReference}
                          onChange={(e) => setNewCampCustomReference(e.target.value)}
                          className="admin-modal-input font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Multiple Charity References</label>
                        <input
                          type="text"
                          placeholder="e.g. ZT-UK-1144123, CC-88390"
                          value={newCampCharityReferences}
                          onChange={(e) => setNewCampCharityReferences(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>

                    {/* Expandable Marketing Tracking Section (UTM) */}
                    <div className="pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setNewCampShowMarketingTracking(!newCampShowMarketingTracking)}
                        className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <TrendingUp size={13} />
                          Marketing Tracking Information (UTM Parameters)
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            newCampShowMarketingTracking ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {newCampShowMarketingTracking && (
                        <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 space-y-3">
                          <p className="text-[11px] text-slate-500">
                            Configure digital campaign attribution to measure donor conversion channels.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-600 mb-0.5 text-[11px]">UTM Source</label>
                              <input
                                type="text"
                                placeholder="e.g. facebook / linkedin / newsletter"
                                value={newCampUtmSource}
                                onChange={(e) => setNewCampUtmSource(e.target.value)}
                                className="admin-modal-input font-mono text-[11px]"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-600 mb-0.5 text-[11px]">UTM Medium</label>
                              <input
                                type="text"
                                placeholder="e.g. cpc / social / email"
                                value={newCampUtmMedium}
                                onChange={(e) => setNewCampUtmMedium(e.target.value)}
                                className="admin-modal-input font-mono text-[11px]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-600 mb-0.5 text-[11px]">UTM Campaign</label>
                              <input
                                type="text"
                                placeholder="e.g. winter_warmth_2026"
                                value={newCampUtmCampaign}
                                onChange={(e) => setNewCampUtmCampaign(e.target.value)}
                                className="admin-modal-input font-mono text-[11px]"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-600 mb-0.5 text-[11px]">UTM Content</label>
                              <input
                                type="text"
                                placeholder="e.g. hero_banner_v2"
                                value={newCampUtmContent}
                                onChange={(e) => setNewCampUtmContent(e.target.value)}
                                className="admin-modal-input font-mono text-[11px]"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-600 mb-0.5 text-[11px]">UTM Term</label>
                              <input
                                type="text"
                                placeholder="e.g. charity grant leicester"
                                value={newCampUtmTerm}
                                onChange={(e) => setNewCampUtmTerm(e.target.value)}
                                className="admin-modal-input font-mono text-[11px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateCampaignModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCreateCampaign}
                  className="btn-3d-magenta px-5 py-2.5 rounded-xl font-bold text-white shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  {submittingCreateCampaign ? (
                    "Creating Campaign..."
                  ) : (
                    <>
                      <Plus size={15} />
                      <span>Create {newCampType === "EXTERNAL" ? "External" : "Internal"} Campaign</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CAMPAIGN MODAL 2: EDIT EXISTING CAMPAIGN                                  */}
      {/* ========================================================================= */}
      {editingCampaign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
          onClick={() => setEditingCampaign(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "42rem",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #FCE7F3",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingCampaign(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-magenta flex items-center justify-center mx-auto mb-2">
                <Edit size={22} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Edit Campaign</h2>
              <p className="text-xs text-slate-500 mt-1">
                Update campaign settings, targets, external page links, and attribution.
              </p>
            </div>

            {/* Campaign Type Selector */}
            <div className="mb-4">
              <label className="block font-bold text-slate-700 text-xs mb-1.5">Campaign Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEditCampType("INTERNAL")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    editCampType === "INTERNAL"
                      ? "border-magenta bg-pink-50 text-magenta shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Compass size={14} />
                  <span>Internal Campaign</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditCampType("EXTERNAL")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    editCampType === "EXTERNAL"
                      ? "border-purple-600 bg-purple-50 text-purple-700 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Globe size={14} />
                  <span>External Campaign</span>
                </button>
              </div>
            </div>

            {editCampaignError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{editCampaignError}</span>
              </div>
            )}

            <form onSubmit={handleEditCampaignSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campaign Code / ID</label>
                  <input
                    type="text"
                    value={editCampCode}
                    onChange={(e) => setEditCampCode(e.target.value)}
                    className="admin-modal-input font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editCampStatus}
                    onChange={(e) => setEditCampStatus(e.target.value as any)}
                    className="admin-modal-select font-semibold"
                  >
                    <option value="ACTIVE">Active (Accepting Donations)</option>
                    <option value="DRAFT">Draft</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={editCampTitle}
                  onChange={(e) => setEditCampTitle(e.target.value)}
                  className="admin-modal-input font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fundraising Target (£) *</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={editCampTarget}
                    onChange={(e) => setEditCampTarget(e.target.value as any)}
                    className="admin-modal-input font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campaign URL</label>
                  <input
                    type="text"
                    value={editCampUrl}
                    onChange={(e) => setEditCampUrl(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>
              </div>

              {/* If External: Show external inputs */}
              {editCampType === "EXTERNAL" && (
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                  <div className="font-extrabold text-purple-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Globe size={13} className="text-purple-600" />
                    External Platform &amp; Sponsor Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Corporate Sponsor</label>
                      <input
                        type="text"
                        placeholder="e.g. Leicester Charity Fund"
                        value={editCampCorporateSponsor}
                        onChange={(e) => setEditCampCorporateSponsor(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraising Page ID</label>
                      <input
                        type="text"
                        placeholder="e.g. JG-PAGE-84920"
                        value={editCampFundraisingPageId}
                        onChange={(e) => setEditCampFundraisingPageId(e.target.value)}
                        className="admin-modal-input font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraising Page Name</label>
                      <input
                        type="text"
                        value={editCampFundraisingPageName}
                        onChange={(e) => setEditCampFundraisingPageName(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraising Page URL</label>
                      <input
                        type="url"
                        value={editCampFundraisingPageUrl}
                        onChange={(e) => setEditCampFundraisingPageUrl(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraiser Name</label>
                      <input
                        type="text"
                        value={editCampFundraiserName}
                        onChange={(e) => setEditCampFundraiserName(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fundraiser Email</label>
                      <input
                        type="email"
                        value={editCampFundraiserEmail}
                        onChange={(e) => setEditCampFundraiserEmail(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={editCampFundraiserContactConsent}
                      onChange={(e) => setEditCampFundraiserContactConsent(e.target.checked)}
                      className="accent-purple-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">
                      Fundraiser contact permission verified
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-purple-100">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Custom Reference</label>
                      <input
                        type="text"
                        value={editCampCustomReference}
                        onChange={(e) => setEditCampCustomReference(e.target.value)}
                        className="admin-modal-input font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Multiple Charity References</label>
                      <input
                        type="text"
                        value={editCampCharityReferences}
                        onChange={(e) => setEditCampCharityReferences(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editCampStartDate}
                    onChange={(e) => setEditCampStartDate(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editCampEndDate}
                    onChange={(e) => setEditCampEndDate(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>
              </div>

              <CampaignImageUpload
                label="Campaign Image (Upload from Device)"
                value={editCampImageUrl}
                onChange={setEditCampImageUrl}
                showSuggestions={true}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description &amp; Objectives *</label>
                <textarea
                  rows={3}
                  required
                  value={editCampDescription}
                  onChange={(e) => setEditCampDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:border-magenta text-xs leading-relaxed text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEditCampaign}
                  className="btn-3d-magenta px-5 py-2.5 rounded-xl font-bold text-white shadow-md cursor-pointer"
                >
                  {submittingEditCampaign ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CAMPAIGN MODAL 3: VIEW CAMPAIGN DETAILS & DONATIONS LEDGER                 */}
      {/* ========================================================================= */}
      {viewingCampaignDonations && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
          onClick={() => setViewingCampaignDonations(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "42rem",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #FCE7F3",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingCampaignDonations(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            {/* Campaign Summary Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {viewingCampaignDonations.campaignType === "EXTERNAL" ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Globe size={11} />
                    External Campaign
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-magenta bg-pink-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Compass size={11} />
                    Trust Internal Campaign
                  </span>
                )}
                {viewingCampaignDonations.campaignCode && (
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {viewingCampaignDonations.campaignCode}
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-100 text-slate-700">
                  {viewingCampaignDonations.status || (viewingCampaignDonations.active ? "ACTIVE" : "PAUSED")}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {viewingCampaignDonations.title}
              </h2>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {viewingCampaignDonations.description}
              </p>

              {/* External Metadata if present */}
              {viewingCampaignDonations.campaignType === "EXTERNAL" && (
                <div className="mt-3 p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs space-y-1.5">
                  <div className="font-extrabold text-purple-900 text-[11px] uppercase tracking-wider">
                    External Platform &amp; Fundraiser Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                    {viewingCampaignDonations.corporateSponsor && (
                      <div><strong className="text-purple-900">Corporate Sponsor:</strong> {viewingCampaignDonations.corporateSponsor}</div>
                    )}
                    {viewingCampaignDonations.fundraiserName && (
                      <div><strong className="text-purple-900">Fundraiser:</strong> {viewingCampaignDonations.fundraiserName} {viewingCampaignDonations.fundraiserEmail ? `(${viewingCampaignDonations.fundraiserEmail})` : ''}</div>
                    )}
                    {viewingCampaignDonations.fundraisingPageId && (
                      <div><strong className="text-purple-900">Page ID:</strong> {viewingCampaignDonations.fundraisingPageId}</div>
                    )}
                    {viewingCampaignDonations.fundraisingPageUrl && (
                      <div>
                        <strong className="text-purple-900">External URL:</strong>{" "}
                        <a href={viewingCampaignDonations.fundraisingPageUrl} target="_blank" rel="noreferrer" className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1">
                          Visit Page <ExternalLink size={10} />
                        </a>
                      </div>
                    )}
                    {viewingCampaignDonations.customReference && (
                      <div><strong className="text-purple-900">Ref:</strong> {viewingCampaignDonations.customReference}</div>
                    )}
                    {viewingCampaignDonations.charityReferences && (
                      <div><strong className="text-purple-900">Charity Refs:</strong> {viewingCampaignDonations.charityReferences}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Financial Metrics */}
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <span>Raised: <strong className="text-magenta font-black">£{Number(viewingCampaignDonations.raisedAmount || 0).toFixed(2)}</strong></span>
                <span>•</span>
                <span>Target: <strong className="text-slate-900 font-black">£{Number(viewingCampaignDonations.targetAmount || 0).toFixed(2)}</strong></span>
                <span>•</span>
                <span>Progress: <strong className="text-emerald-600 font-black">{viewingCampaignDonations.progressPercentage || 0}%</strong></span>
              </div>
              <div className="admin-progress-bar-bg mt-2.5">
                <div
                  className="admin-progress-bar-fill"
                  style={{ width: `${viewingCampaignDonations.progressPercentage || 0}%` }}
                />
              </div>
            </div>

            {/* Donations Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Direct Ledger Donations ({viewingCampaignDonations.donations?.length || 0})
                </h3>
              </div>

              {!viewingCampaignDonations.donations || viewingCampaignDonations.donations.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
                  <CreditCard size={28} className="mx-auto mb-1 text-slate-300" />
                  <p className="text-xs font-semibold text-slate-600">No donations recorded for this campaign yet.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Donations recorded via Donors CRM or portal will appear here automatically.</p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="admin-table w-full text-left text-xs">
                    <thead>
                      <tr>
                        <th>Date &amp; Ref</th>
                        <th>Donor</th>
                        <th>Payment Method</th>
                        <th>Gift Aid</th>
                        <th className="text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingCampaignDonations.donations.map((dn: any) => (
                        <tr key={dn.id}>
                          <td>
                            <div className="font-bold text-slate-900">
                              {new Date(dn.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {dn.reference || dn.id.slice(0, 8)}
                            </div>
                          </td>
                          <td>
                            <div className="font-bold text-slate-900">
                              {dn.user?.fullName || "Anonymous Supporter"}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {dn.user?.email || "Direct portal gift"}
                            </div>
                          </td>
                          <td>
                            <span className="text-slate-600 font-medium">
                              {dn.paymentMethod || "Card"}
                            </span>
                          </td>
                          <td>
                            {dn.giftAid ? (
                              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                ✓ Yes
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">No</span>
                            )}
                          </td>
                          <td className="text-right">
                            <span className="font-black text-slate-900">
                              £{Number(dn.amount).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingCampaignDonations(null)}
                className="btn-3d-magenta px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CAMPAIGN MODAL 4: DELETE OR ARCHIVE CONFIRMATION                          */}
      {/* ========================================================================= */}
      {deletingCampaign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDeletingCampaign(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center">
              Delete or Archive Campaign?
            </h3>
            <p className="text-xs text-slate-600 text-center mt-2 leading-relaxed">
              Are you sure you want to remove &quot;<strong>{deletingCampaign.title}</strong>&quot;?
            </p>
            {deletingCampaign.donationsCount && deletingCampaign.donationsCount > 0 ? (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                <strong>Notice:</strong> This campaign has <strong>{deletingCampaign.donationsCount} recorded donation(s)</strong> in the financial audit ledger. To maintain regulatory compliance, it will be safely <strong>Archived</strong> rather than erased.
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 text-center mt-1">
                This cause has zero recorded donations and will be permanently deleted.
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingCampaign(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCampaign(deletingCampaign)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* DONATION MODAL 1: RECORD OFFLINE / EXTERNAL DONATION                      */}
      {/* ========================================================================= */}
      {showRecordOfflineModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowRecordOfflineModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", marginBottom: "16px", borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: "#FDF0F4",
                    color: "#E6127E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <CreditCard size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: 0 }}>
                    Record Offline Donation
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: "3px 0 0 0" }}>
                    Manually record donations received outside the online payment gateway (cash, bank transfer, cheque, in-person, external platforms).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRecordOfflineModal(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9999px",
                  backgroundColor: "#F1F5F9",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginLeft: "12px"
                }}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRecordOfflineSubmit} className="mt-4 space-y-6 text-xs max-h-[75vh] overflow-y-auto pr-1">

              {/* ========================================================= */}
              {/* SECTION A: DONOR INFORMATION                              */}
              {/* ========================================================= */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "9999px",
                        backgroundColor: "#E6127E",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      1
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-xs tracking-tight">
                      Donor Information
                    </h3>
                  </div>

                  {/* Toggle Between Existing and New Supporter */}
                  <div className="inline-flex p-0.5 rounded-xl bg-slate-200/70 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setOfflineDonorMode("EXISTING")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        offlineDonorMode === "EXISTING"
                          ? "bg-white text-magenta shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Search Existing Supporter
                    </button>
                    <button
                      type="button"
                      onClick={() => setOfflineDonorMode("NEW")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        offlineDonorMode === "NEW"
                          ? "bg-white text-magenta shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      + Add New Donor
                    </button>
                  </div>
                </div>

                {offlineDonorMode === "EXISTING" ? (
                  <div className="space-y-2.5">
                    {/* Selected Donor Preview Card */}
                    {(() => {
                      const selectedDonorObj = donors.find((d) => d.id === offlineSelectedDonorId);
                      if (selectedDonorObj) {
                        return (
                          <div className="p-3.5 rounded-xl bg-white border-2 border-magenta/40 shadow-xs flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-magenta/10 text-magenta font-black text-sm flex items-center justify-center border border-magenta/20">
                                {selectedDonorObj.fullName?.slice(0, 2).toUpperCase() || "D"}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-slate-900 text-sm">
                                    {selectedDonorObj.fullName}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-magenta border border-pink-200">
                                    {selectedDonorObj.donationTier || "SUPPORTER"}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                  <span>{selectedDonorObj.email}</span>
                                  {selectedDonorObj.phoneNumber && (
                                    <>
                                      <span>•</span>
                                      <span>Phone: {selectedDonorObj.phoneNumber}</span>
                                    </>
                                  )}
                                  <span>•</span>
                                  <span className="font-bold text-slate-700">Total Given: £{Number(selectedDonorObj.totalDonated || 0).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setOfflineSelectedDonorId("");
                                setOfflineDonorSearch("");
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer"
                            >
                              Change Donor
                            </button>
                          </div>
                        );
                      }

                      // If not selected, show search input and filtered donor list
                      const filteredSearch = donors.filter((d) => {
                        const q = offlineDonorSearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          d.fullName?.toLowerCase().includes(q) ||
                          d.email?.toLowerCase().includes(q) ||
                          (d.phoneNumber && d.phoneNumber.includes(q))
                        );
                      });

                      return (
                        <div className="space-y-2">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "9px 12px",
                              borderRadius: "12px",
                              border: "1px solid #CBD5E1",
                              backgroundColor: "#FFFFFF"
                            }}
                          >
                            <Search size={16} style={{ color: "#94A3B8", flexShrink: 0 }} />
                            <input
                              type="text"
                              placeholder="Search supporter by name, email, or phone number..."
                              value={offlineDonorSearch}
                              onChange={(e) => setOfflineDonorSearch(e.target.value)}
                              style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                backgroundColor: "transparent",
                                fontSize: "12px",
                                color: "#0F172A",
                                padding: 0
                              }}
                            />
                            {offlineDonorSearch && (
                              <button
                                type="button"
                                onClick={() => setOfflineDonorSearch("")}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#94A3B8",
                                  cursor: "pointer",
                                  padding: 0,
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-inner">
                            {filteredSearch.length === 0 ? (
                              <div className="p-3 text-center text-slate-400 text-xs">
                                No registered supporters found matching "{offlineDonorSearch}". Switch to "+ Add New Donor" to create one.
                              </div>
                            ) : (
                              filteredSearch.map((d) => (
                                <button
                                  key={d.id}
                                  type="button"
                                  onClick={() => {
                                    setOfflineSelectedDonorId(d.id);
                                    setOfflineDonorSearch("");
                                  }}
                                  className="w-full text-left p-2.5 hover:bg-pink-50/50 flex items-center justify-between cursor-pointer transition-colors"
                                >
                                  <div>
                                    <div className="font-bold text-slate-900 text-xs">{d.fullName}</div>
                                    <div className="text-[11px] text-slate-500">
                                      {d.email} {d.phoneNumber ? `• ${d.phoneNumber}` : ""}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                    {d.donationTier}
                                  </span>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* New Donor Form */
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Donor Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arsha Suresh"
                        value={offlineNewDonorName}
                        onChange={(e) => setOfflineNewDonorName(e.target.value)}
                        className="admin-modal-input"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address (for receipt &amp; portal)</label>
                        <input
                          type="email"
                          placeholder="e.g. arsha@gmail.com"
                          value={offlineNewDonorEmail}
                          onChange={(e) => setOfflineNewDonorEmail(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="e.g. 0116 254 5168"
                          value={offlineNewDonorPhone}
                          onChange={(e) => setOfflineNewDonorPhone(e.target.value)}
                          className="admin-modal-input"
                        />
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 bg-pink-50/50 p-2 rounded-xl border border-pink-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-magenta flex-shrink-0" />
                      <span>A donor account will be automatically prepared in the CRM and credited with this gift.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================= */}
              {/* SECTION B: DONATION DETAILS                               */}
              {/* ========================================================= */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "9999px",
                      backgroundColor: "#E6127E",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    2
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xs tracking-tight">
                    Donation Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Donation Amount (£) *</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "stretch",
                        borderRadius: "12px",
                        border: "1px solid #CBD5E1",
                        overflow: "hidden",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <span
                        style={{
                          padding: "0 14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F8FAFC",
                          color: "#475569",
                          fontWeight: 800,
                          fontSize: "14px",
                          borderRight: "1px solid #E2E8F0"
                        }}
                      >
                        £
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        required
                        placeholder="100.00"
                        value={offlineAmount}
                        onChange={(e) => setOfflineAmount(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          border: "none",
                          outline: "none",
                          fontWeight: 800,
                          fontSize: "14px",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF"
                        }}
                      />
                    </div>

                    {/* Quick amount presets */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", marginRight: "2px" }}>Quick:</span>
                      {[25, 50, 100, 250, 500].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setOfflineAmount(preset)}
                          style={{
                            padding: "3px 10px",
                            borderRadius: "8px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            backgroundColor: Number(offlineAmount) === preset ? "#E6127E" : "#F8FAFC",
                            color: Number(offlineAmount) === preset ? "#FFFFFF" : "#475569",
                            border: Number(offlineAmount) === preset ? "1px solid #E6127E" : "1px solid #E2E8F0"
                          }}
                        >
                          £{preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Currency</label>
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs flex items-center justify-between">
                      <span>British Pound Sterling</span>
                      <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">GBP (£)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Donation Date *</label>
                    <input
                      type="date"
                      required
                      value={offlineDateReceived}
                      onChange={(e) => setOfflineDateReceived(e.target.value)}
                      className="admin-modal-input font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Donation Type *</label>
                    <select
                      value={offlineType}
                      onChange={(e) => setOfflineType(e.target.value as any)}
                      className="admin-modal-select font-semibold"
                    >
                      <option value="ONE_OFF">One-Off Contribution</option>
                      <option value="RECURRING">Recurring (Standing Order / Monthly)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campaign / Cause Allocation</label>
                  <select
                    value={offlineCampaignId}
                    onChange={(e) => setOfflineCampaignId(e.target.value)}
                    className="admin-modal-select font-semibold"
                  >
                    <option value="">General Relief Fund (Unrestricted / No specific campaign)</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} {c.campaignType === "EXTERNAL" ? "• External Campaign" : "• Internal Campaign"} (Goal: £{Number(c.targetAmount).toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION C: PAYMENT INFORMATION                            */}
              {/* ========================================================= */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "9999px",
                      backgroundColor: "#E6127E",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    3
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xs tracking-tight">
                    Payment Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Payment Method *</label>
                    <select
                      value={offlinePaymentMethod}
                      onChange={(e) => setOfflinePaymentMethod(e.target.value)}
                      className="admin-modal-select font-bold text-slate-800"
                    >
                      <option value="Bank Transfer">Bank Transfer (BACS / Faster Payments)</option>
                      <option value="Cash">Cash (Office / In-Person)</option>
                      <option value="Cheque">Cheque</option>
                      <option value="External Platform">External Fundraising Campaign (e.g. JustGiving)</option>
                      <option value="In-Person Card">In-Person Card / POS Terminal</option>
                      <option value="Standing Order">Standing Order / Direct Debit</option>
                      <option value="Other">Other External Source</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Payment Status *</label>
                    <select
                      value={offlineStatus}
                      onChange={(e) => setOfflineStatus(e.target.value)}
                      className="admin-modal-select font-bold text-emerald-700"
                    >
                      <option value="COMPLETED">Completed (Verified &amp; Cleared in Bank/Cash)</option>
                      <option value="PENDING">Pending Clearance (e.g. uncleared cheque)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Bank Transaction Ref / Cheque # / Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BACS-84920 or leave blank to auto-generate (OFF-XXXX)"
                    value={offlineReference}
                    onChange={(e) => setOfflineReference(e.target.value)}
                    className="admin-modal-input font-mono"
                  />
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION D: GIFT AID INFORMATION                           */}
              {/* ========================================================= */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "9999px",
                        backgroundColor: "#E6127E",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      4
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-xs tracking-tight">
                      UK HMRC Gift Aid Boost (+25%)
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    HMRC Chapter 2, Part 8
                  </span>
                </div>

                <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="offlineGiftAidCheck"
                    checked={offlineGiftAid}
                    onChange={(e) => setOfflineGiftAid(e.target.checked)}
                    className="mt-0.5 rounded text-magenta focus:ring-magenta cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="offlineGiftAidCheck" className="font-bold text-slate-900 text-xs cursor-pointer select-none block">
                      Donor has given an active Gift Aid declaration as a UK taxpayer
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Reclaims 25p for every £1 given at no extra cost to the donor.
                    </p>
                  </div>
                </div>

                {offlineGiftAid && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-900 font-medium">Base Contribution:</span>
                      <span className="font-mono font-bold text-emerald-950">£{Number(offlineAmount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-900 font-medium">HMRC Gift Aid Boost (+25%):</span>
                      <span className="font-mono font-bold text-emerald-600">+£{(Number(offlineAmount || 0) * 0.25).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs font-black">
                      <span className="text-emerald-950">Total Charitable Value to Trust:</span>
                      <span className="font-mono text-sm text-emerald-700">£{(Number(offlineAmount || 0) * 1.25).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================= */}
              {/* SECTION E: RECEIPT & AUDIT REMARKS                        */}
              {/* ========================================================= */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "9999px",
                      backgroundColor: "#E6127E",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    5
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xs tracking-tight">
                    Receipt &amp; Audit Information
                  </h3>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="offlineReceiptCheck"
                    checked={offlineIssueReceipt}
                    onChange={(e) => setOfflineIssueReceipt(e.target.checked)}
                    className="rounded text-magenta focus:ring-magenta cursor-pointer"
                  />
                  <label htmlFor="offlineReceiptCheck" className="text-xs font-semibold text-slate-800 cursor-pointer select-none">
                    Generate &amp; make Official Charity PDF Receipt available for download
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Audit Remarks / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Cash received at Leicester head office desk, counterfoil signed, or external bank reference..."
                    value={offlineNotes}
                    onChange={(e) => setOfflineNotes(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Audited under Zinthiya Trust Charity #1137350
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRecordOfflineModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingOfflineDonation}
                    className="btn-3d-magenta px-6 py-2.5 rounded-xl font-bold text-white shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {submittingOfflineDonation ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving Donation...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Donation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DONATION MODAL 2: OFFICIAL CHARITY RECEIPT (PRINT / DOWNLOAD)             */}
      {/* ========================================================================= */}
      {viewingReceiptDonation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewingReceiptDonation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingReceiptDonation(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            {/* Printable Receipt Area */}
            <div className="admin-printable-receipt p-6 border-2 border-dashed border-pink-200 rounded-2xl bg-white text-slate-900">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <ZinthiyaLogo />
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    UK Registered Charity No. 1137350<br />
                    Leicester, United Kingdom • info@zinthiyatrust.org
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase bg-pink-100 text-magenta">
                    Donation Receipt
                  </span>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-1">
                    {viewingReceiptDonation.reference || viewingReceiptDonation.id}
                  </div>
                </div>
              </div>

              {/* Receipt Details Body */}
              <div className="py-5 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Transaction Date:</span>
                  <span className="font-bold text-slate-900">
                    {new Date(viewingReceiptDonation.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Received From:</span>
                  <span className="font-bold text-slate-900">
                    {viewingReceiptDonation.user?.fullName || viewingReceiptDonation.donorName || "Anonymous Supporter"}
                  </span>
                </div>

                {viewingReceiptDonation.user?.email && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Donor Email:</span>
                    <span className="font-mono text-slate-700">{viewingReceiptDonation.user.email}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Allocated Purpose:</span>
                  <span className="font-bold text-slate-900">
                    {viewingReceiptDonation.campaign?.title || "General Charitable Relief"}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Payment Method:</span>
                  <span className="font-bold text-slate-700">
                    {viewingReceiptDonation.paymentMethod || "Card"}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Payment Status:</span>
                  <span className="font-extrabold text-emerald-700 uppercase">
                    {viewingReceiptDonation.status}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Gift Aid Declared:</span>
                  <span className="font-bold text-slate-900">
                    {viewingReceiptDonation.giftAid ? "Yes (+25% eligible UK taxpayer boost)" : "No"}
                  </span>
                </div>

                {/* Amount Paid Highlight */}
                <div className="p-4 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-between mt-4">
                  <span className="font-black text-sm text-slate-800 uppercase tracking-wide">
                    Total Amount Received:
                  </span>
                  <span className="font-black text-2xl text-magenta">
                    £{Number(viewingReceiptDonation.amount).toFixed(2)}
                  </span>
                </div>

                {viewingReceiptDonation.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                    <strong>Ledger Remarks:</strong> {viewingReceiptDonation.notes}
                  </div>
                )}
              </div>

              {/* Receipt Footer */}
              <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                <p>Thank you for your generous support of The Zinthiya Ganeshpanchan Trust.</p>
                <p className="mt-0.5 font-medium">This document serves as an official confirmation of charitable giving.</p>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="admin-btn-secondary px-4 py-2 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadReceiptPdf(viewingReceiptDonation)}
                  className="btn-3d-magenta px-4 py-2 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setViewingReceiptDonation(null)}
                className="admin-btn-secondary px-5 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DONATION MODAL 3: VIEW TRANSACTION DETAILS                                */}
      {/* ========================================================================= */}
      {viewingDonationDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewingDonationDetail(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingDonationDetail(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                <FileText size={22} />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Transaction Metadata
              </h2>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                {viewingDonationDetail.reference || viewingDonationDetail.id}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">System Ref:</span>
                <span className="font-mono text-[11px] text-slate-700">{viewingDonationDetail.id}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Amount &amp; Currency:</span>
                <span className="font-black text-slate-900">£{Number(viewingDonationDetail.amount).toFixed(2)} {viewingDonationDetail.currency}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Donor Name:</span>
                <span className="font-bold text-slate-900">{viewingDonationDetail.user?.fullName || viewingDonationDetail.donorName || "Anonymous"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Donor Email:</span>
                <span className="font-mono text-slate-700">{viewingDonationDetail.user?.email || viewingDonationDetail.donorEmail || "N/A"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Allocated Campaign:</span>
                <span className="font-bold text-slate-900">{viewingDonationDetail.campaign?.title || "General Relief"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-900">{viewingDonationDetail.paymentMethod || "Card"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-extrabold text-emerald-700">{viewingDonationDetail.status}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Gift Aid:</span>
                <span className="font-bold text-slate-900">{viewingDonationDetail.giftAid ? "Yes (+25%)" : "No"}</span>
              </div>
              {viewingDonationDetail.notes && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-slate-500 font-bold mb-1">Remarks &amp; Audit Trail:</div>
                  <div className="text-slate-700">{viewingDonationDetail.notes}</div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingDonationDetail(null)}
                className="btn-3d-magenta px-5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DONATION MODAL 4: UPDATE PAYMENT STATUS                                   */}
      {/* ========================================================================= */}
      {editingStatusDonation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditingStatusDonation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingStatusDonation(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Update Payment Status
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Transaction: <span className="font-mono font-bold text-slate-700">{editingStatusDonation.reference || editingStatusDonation.id}</span>
            </p>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                <select
                  value={newStatusValue}
                  onChange={(e) => setNewStatusValue(e.target.value)}
                  className="admin-modal-select font-bold"
                >
                  <option value="COMPLETED">Completed (Funds Cleared)</option>
                  <option value="PENDING">Pending (Awaiting Clearance)</option>
                  <option value="FAILED">Failed</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-400">
                Updating to/from COMPLETED automatically reconciles donor total giving and campaign raised amounts.
              </p>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStatusDonation(null)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingStatusChange}
                  className="btn-3d-magenta px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer"
                >
                  {submittingStatusChange ? "Saving..." : "Update Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DONATION MODAL 5: DELETE DONATION CONFIRMATION                            */}
      {/* ========================================================================= */}
      {deletingDonation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDeletingDonation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center">
              Delete Donation Record?
            </h3>
            <p className="text-xs text-slate-600 text-center mt-2 leading-relaxed">
              Are you sure you want to delete transaction &quot;<strong>{deletingDonation.reference || deletingDonation.id}</strong>&quot; for £{Number(deletingDonation.amount).toFixed(2)}?
            </p>
            <p className="text-[11px] text-red-600 font-semibold text-center mt-2">
              This action will permanently remove this donation and reverse its contribution towards donor and campaign totals.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingDonation(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteDonation(deletingDonation)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 1: ADD NEW BENEFICIARY (Zero Mock - PostgreSQL)         */}
      {/* Multi-Step Wizard matching Image 2 with spacious 48px inputs & indicators  */}
      {/* ========================================================================= */}
      {showAddBeneficiaryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAddBeneficiaryModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with generous gap to prevent any icon/text overlap */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    minHeight: "48px",
                    borderRadius: "16px",
                    backgroundColor: addBenType === "ORGANISATION" ? "#4f46e5" : "#E6127E",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.25)",
                    flexShrink: 0,
                  }}
                >
                  {addBenType === "ORGANISATION" ? <Building2 size={24} /> : <UserPlus size={24} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Add New Beneficiary
                    </h2>
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: addBenType === "ORGANISATION" ? "#eef2ff" : "#fdf2f8",
                        color: addBenType === "ORGANISATION" ? "#4338ca" : "#be185d",
                        border: `1px solid ${addBenType === "ORGANISATION" ? "#c7d2fe" : "#fbcfe8"}`,
                      }}
                    >
                      {addBenType === "ORGANISATION" ? "Organisation" : "Individual"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Recommended UI structure &bull; Follow the 4 steps to register a support recipient with the Trust.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowAddBeneficiaryModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Step Progress Bar (Matching Image 2 with magenta active bar) */}
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { num: 1, label: "Step 1", title: "Beneficiary Type" },
                  { num: 2, label: "Step 2", title: "Basic Information" },
                  { num: 3, label: "Step 3", title: "Support Needs" },
                  { num: 4, label: "Step 4", title: "Advocate & Access" },
                ].map((step) => {
                  const isActive = addBenStep === step.num;
                  const isCompleted = addBenStep > step.num;
                  return (
                    <div
                      key={step.num}
                      onClick={() => {
                        setAddBenStep(step.num as any);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                      title={`Go to ${step.label}: ${step.title}`}
                    >
                      {/* Top Bar Indicator */}
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "9999px",
                          backgroundColor: isActive || isCompleted ? "#E6127E" : "#E2E8F0",
                          transition: "all 0.25s ease",
                          marginBottom: "8px",
                          boxShadow: isActive ? "0 2px 8px rgba(230, 18, 126, 0.45)" : "none",
                        }}
                      />
                      {/* Step Label & Title */}
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: isActive ? 800 : isCompleted ? 700 : 500,
                          color: isActive ? "#E6127E" : isCompleted ? "#0F172A" : "#94A3B8",
                        }}
                      >
                        {step.label}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: isActive ? "#0F172A" : "#64748B",
                          fontWeight: isActive ? 700 : 400,
                          marginTop: "2px",
                        }}
                        className="hidden sm:block truncate"
                      >
                        {step.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (addBenStep < 4) {
                  handleNextStep(e);
                } else {
                  handleCreateBeneficiary(e);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
                  e.preventDefault();
                  if (addBenStep < 4) {
                    handleNextStep(e);
                  }
                }
              }}
              className="space-y-6"
            >
              {/* ============================================================== */}
              {/* STEP 1: BENEFICIARY TYPE (Matching Image 2)                    */}
              {/* ============================================================== */}
              {addBenStep === 1 && (
                <div className="space-y-4 py-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Step 1 – Beneficiary Type
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select whether this registration is for an individual or a partner organisation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Individual Card */}
                    <div
                      onClick={() => setAddBenType("INDIVIDUAL")}
                      style={{
                        padding: "20px 24px",
                        borderRadius: "16px",
                        border: addBenType === "INDIVIDUAL" ? "2px solid #E6127E" : "1.5px solid #E2E8F0",
                        backgroundColor: addBenType === "INDIVIDUAL" ? "#FFF5F9" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        transition: "all 0.2s ease",
                        boxShadow: addBenType === "INDIVIDUAL" ? "0 4px 14px rgba(230,18,126,0.15)" : "none",
                      }}
                    >
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          backgroundColor: addBenType === "INDIVIDUAL" ? "#E6127E" : "#F1F5F9",
                          color: addBenType === "INDIVIDUAL" ? "#ffffff" : "#64748B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <User size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
                          Individual
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                          A person or family receiving support from the Trust.
                        </div>
                      </div>
                      <div
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          border: addBenType === "INDIVIDUAL" ? "6px solid #E6127E" : "2px solid #CBD5E1",
                          backgroundColor: "#ffffff",
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* Organisation Card */}
                    <div
                      onClick={() => setAddBenType("ORGANISATION")}
                      style={{
                        padding: "20px 24px",
                        borderRadius: "16px",
                        border: addBenType === "ORGANISATION" ? "2px solid #4F46E5" : "1.5px solid #E2E8F0",
                        backgroundColor: addBenType === "ORGANISATION" ? "#F5F3FF" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        transition: "all 0.2s ease",
                        boxShadow: addBenType === "ORGANISATION" ? "0 4px 14px rgba(79,70,229,0.15)" : "none",
                      }}
                    >
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          backgroundColor: addBenType === "ORGANISATION" ? "#4F46E5" : "#F1F5F9",
                          color: addBenType === "ORGANISATION" ? "#ffffff" : "#64748B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Building2 size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
                          Organisation
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                          An organisation receiving support from the Trust.
                        </div>
                      </div>
                      <div
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          border: addBenType === "ORGANISATION" ? "6px solid #4F46E5" : "2px solid #CBD5E1",
                          backgroundColor: "#ffffff",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 2: BASIC INFORMATION (Spacious 48px Input Fields)         */}
              {/* ============================================================== */}
              {addBenStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Step 2 – Basic &amp; Contact Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {addBenType === "INDIVIDUAL"
                        ? "Enter personal details and contact address for the individual recipient."
                        : "Enter organisation credentials and primary contact representative."}
                    </p>
                  </div>

                  {addBenType === "INDIVIDUAL" ? (
                    <div className="space-y-4">
                      {/* First Name & Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            First name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter first name"
                            value={newBenFirstName}
                            onChange={(e) => {
                              setNewBenFirstName(e.target.value);
                              setNewBenFullName(`${e.target.value} ${newBenLastName}`.trim());
                            }}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Last name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter last name"
                            value={newBenLastName}
                            onChange={(e) => {
                              setNewBenLastName(e.target.value);
                              setNewBenFullName(`${newBenFirstName} ${e.target.value}`.trim());
                            }}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Email address & Phone number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Email address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Enter email address"
                            value={newBenEmail}
                            onChange={(e) => setNewBenEmail(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Phone number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter telephone / mobile number"
                            value={newBenPhone}
                            onChange={(e) => setNewBenPhone(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Beneficiary Portal Login Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Portal Login Password *
                          </label>
                          <span className="text-[11px] text-magenta font-bold">
                            Enables beneficiary to log in directly to portal
                          </span>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showBenPassword ? "text" : "password"}
                            required
                            placeholder="Enter password (e.g. Beneficiary@123)"
                            value={newBenPassword}
                            onChange={(e) => setNewBenPassword(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 48px 0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowBenPassword(!showBenPassword)}
                            style={{
                              position: "absolute",
                              right: "14px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "none",
                              color: "#64748B",
                              cursor: "pointer",
                            }}
                            title={showBenPassword ? "Hide password" : "Show password"}
                          >
                            {showBenPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          The beneficiary can directly log in at <code>/beneficiary/login</code> using this email and password.
                        </p>
                      </div>

                      {/* Date of Birth, Gender, Preferred Language */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Date of birth
                          </label>
                          <input
                            type="date"
                            value={newBenDob}
                            onChange={(e) => setNewBenDob(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Gender
                          </label>
                          <select
                            value={newBenGender}
                            onChange={(e) => setNewBenGender(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Preferred language
                          </label>
                          <select
                            value={newBenPreferredLanguage}
                            onChange={(e) => setNewBenPreferredLanguage(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            <option value="English">English</option>
                            <option value="Gujarati">Gujarati</option>
                            <option value="Punjabi">Punjabi</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Somali">Somali</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Street Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Street address / refuge shelter
                        </label>
                        <input
                          type="text"
                          placeholder="Enter street address or refuge shelter"
                          value={newBenAddress}
                          onChange={(e) => setNewBenAddress(e.target.value)}
                          style={{
                            width: "100%",
                            height: "48px",
                            minHeight: "48px",
                            padding: "0 16px",
                            fontSize: "14px",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      {/* Town / City & Postcode */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Town / City
                          </label>
                          <input
                            type="text"
                            placeholder="Enter town or city"
                            value={newBenTownCity}
                            onChange={(e) => setNewBenTownCity(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Postcode
                          </label>
                          <input
                            type="text"
                            placeholder="Enter postcode (e.g. LE2 0AA)"
                            value={newBenPostcode}
                            onChange={(e) => setNewBenPostcode(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Emergency Contact & Household Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Emergency contact (ICE: Name &amp; Phone)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Zaid Begum (Son) - 07700 901234"
                            value={newBenEmergencyContact}
                            onChange={(e) => setNewBenEmergencyContact(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Household size (dependants)
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={newBenHouseholdSize}
                            onChange={(e) => setNewBenHouseholdSize(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Organisation Basic Details */
                    <div className="space-y-4">
                      {/* Org Name & Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Organisation name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter organisation name (e.g. Leicester Community Food Hub)"
                            value={newOrgName}
                            onChange={(e) => setNewOrgName(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Organisation type *
                          </label>
                          <select
                            value={newOrgType}
                            onChange={(e) => setNewOrgType(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            <option value="Registered Charity">Registered Charity</option>
                            <option value="Community Group / CIC">Community Group / CIC</option>
                            <option value="Primary / Secondary School">Primary / Secondary School</option>
                            <option value="Food Bank / Pantry Hub">Food Bank / Pantry Hub</option>
                            <option value="Faith-Based Organisation">Faith-Based Organisation</option>
                            <option value="Women's Refuge / Shelter">Women's Refuge / Shelter</option>
                            <option value="Other Community Partner">Other Community Partner</option>
                          </select>
                        </div>
                      </div>

                      {/* Reg Number & Reach */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Charity / Registration number
                          </label>
                          <input
                            type="text"
                            placeholder="Enter charity or company number (e.g. 1137350)"
                            value={newOrgRegNumber}
                            onChange={(e) => setNewOrgRegNumber(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Estimated people / families supported
                          </label>
                          <input
                            type="number"
                            min={1}
                            placeholder="e.g. 150"
                            value={newOrgBeneficiaryReach}
                            onChange={(e) => setNewOrgBeneficiaryReach(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Primary Contact Person & Role */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Primary contact full name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter contact person name (e.g. David Miller)"
                            value={newOrgContactPerson}
                            onChange={(e) => setNewOrgContactPerson(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Role / Designation *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Community Outreach Director / Headteacher"
                            value={newOrgContactRole}
                            onChange={(e) => setNewOrgContactRole(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Contact Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Contact email address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Enter contact email address"
                            value={newOrgContactEmail}
                            onChange={(e) => setNewOrgContactEmail(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Contact telephone number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter telephone number (e.g. 0116 254 5168)"
                            value={newOrgContactPhone}
                            onChange={(e) => setNewOrgContactPhone(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Organisation Portal Login Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Set Login Password for Organisation Portal Access *
                          </label>
                          <span className="text-[11px] text-indigo-700 font-bold">
                            Enables organisation to log in directly
                          </span>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showOrgPassword ? "text" : "password"}
                            required
                            placeholder="Enter password (e.g. Beneficiary@123)"
                            value={newOrgPassword}
                            onChange={(e) => setNewOrgPassword(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 48px 0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowOrgPassword(!showOrgPassword)}
                            style={{
                              position: "absolute",
                              right: "14px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "none",
                              color: "#64748B",
                              cursor: "pointer",
                            }}
                            title={showOrgPassword ? "Hide password" : "Show password"}
                          >
                            {showOrgPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Address & Postcode */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Premises / Street address
                          </label>
                          <input
                            type="text"
                            placeholder="Enter premises or street address"
                            value={newOrgAddress}
                            onChange={(e) => setNewOrgAddress(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Postcode
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. LE1 2NZ"
                            value={newOrgPostcode}
                            onChange={(e) => setNewOrgPostcode(e.target.value)}
                            style={{
                              width: "100%",
                              height: "48px",
                              minHeight: "48px",
                              padding: "0 16px",
                              fontSize: "14px",
                              color: "#0F172A",
                              backgroundColor: "#FFFFFF",
                              border: "1.5px solid #CBD5E1",
                              borderRadius: "12px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {/* Mission Summary */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Organisation mission / summary
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief description of organisation objectives and services provided to Leicestershire residents..."
                          value={newOrgDescription}
                          onChange={(e) => setNewOrgDescription(e.target.value)}
                          style={{
                            width: "100%",
                            minHeight: "88px",
                            padding: "12px 16px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                            resize: "vertical",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 3: SUPPORT NEEDS & ASSESSMENT                             */}
              {/* ============================================================== */}
              {addBenStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Step 3 – Support Needs &amp; Assessment
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Specify the assistance category, urgency level, and details of the required aid.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Support Category & Urgency */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Support category *
                        </label>
                        <select
                          value={addBenType === "INDIVIDUAL" ? newBenSupportCategory : newOrgSupportCategory}
                          onChange={(e) => {
                            if (addBenType === "INDIVIDUAL") {
                              setNewBenSupportCategory(e.target.value);
                            } else {
                              setNewOrgSupportCategory(e.target.value);
                            }
                          }}
                          style={{
                            width: "100%",
                            height: "48px",
                            minHeight: "48px",
                            padding: "0 16px",
                            fontSize: "14px",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                            cursor: "pointer",
                          }}
                        >
                          {addBenType === "INDIVIDUAL" ? (
                            <>
                              <option value="Emergency Food Parcel &amp; Essentials">Emergency Food Parcel &amp; Essentials</option>
                              <option value="Emergency Heating &amp; Fuel Voucher">Emergency Heating &amp; Fuel Voucher</option>
                              <option value="Domestic Abuse Crisis Sanctuary Relocation">Domestic Abuse Crisis Sanctuary Relocation</option>
                              <option value="Winter Bedding &amp; Warm Clothing Pack">Winter Bedding &amp; Warm Clothing Pack</option>
                              <option value="Debt &amp; Energy Arrears Advocacy">Debt &amp; Energy Arrears Advocacy</option>
                              <option value="Emergency Cash Welfare Grant (£50 - £250)">Emergency Cash Welfare Grant (£50 - £250)</option>
                              <option value="Tenancy &amp; Housing Injunction Casework">Tenancy &amp; Housing Injunction Casework</option>
                              <option value="Medical &amp; Disability Hardship Relief">Medical &amp; Disability Hardship Relief</option>
                              <option value="Education, School Uniform &amp; Child Support">Education, School Uniform &amp; Child Support</option>
                              <option value="Other Crisis Relief Support">Other Crisis Relief Support</option>
                            </>
                          ) : (
                            <>
                              <option value="Community Food Distribution &amp; Pantry Stock">Community Food Distribution &amp; Pantry Stock</option>
                              <option value="School Breakfast Club &amp; Holiday Meals Grant">School Breakfast Club &amp; Holiday Meals Grant</option>
                              <option value="Warm Hub Fuel &amp; Heating Subsidy">Warm Hub Fuel &amp; Heating Subsidy</option>
                              <option value="Crisis Refuge Relocation Partnership">Crisis Refuge Relocation Partnership</option>
                              <option value="Winter Warmth Clothing &amp; Emergency Packs">Winter Warmth Clothing &amp; Emergency Packs</option>
                              <option value="Capacity Building &amp; Emergency Relief Fund">Capacity Building &amp; Emergency Relief Fund</option>
                              <option value="Other Partner Welfare Support">Other Partner Welfare Support</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Urgency level *
                        </label>
                        <select
                          value={addBenType === "INDIVIDUAL" ? newBenInitialUrgency : newOrgUrgency}
                          onChange={(e) => {
                            if (addBenType === "INDIVIDUAL") {
                              setNewBenInitialUrgency(e.target.value);
                            } else {
                              setNewOrgUrgency(e.target.value);
                            }
                          }}
                          style={{
                            width: "100%",
                            height: "48px",
                            minHeight: "48px",
                            padding: "0 16px",
                            fontSize: "14px",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                            cursor: "pointer",
                          }}
                        >
                          <option value="EMERGENCY">Emergency (Life Safety / Imminent Hazard)</option>
                          <option value="HIGH">High Priority (Immediate Need)</option>
                          <option value="MEDIUM">Medium Priority (Within 48 Hours)</option>
                          <option value="LOW">Low Priority (Routine Support)</option>
                        </select>
                      </div>
                    </div>

                    {/* Reason for Support */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Reason for support *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          addBenType === "INDIVIDUAL"
                            ? "Enter reason for support (e.g. Energy meter disconnected, fleeing domestic crisis, sudden redundancy)"
                            : "Enter reason for support (e.g. Emergency food stock depletion, holiday breakfast club funding shortfall)"
                        }
                        value={addBenType === "INDIVIDUAL" ? newBenReasonForSupport : newOrgReasonForSupport}
                        onChange={(e) => {
                          if (addBenType === "INDIVIDUAL") {
                            setNewBenReasonForSupport(e.target.value);
                          } else {
                            setNewOrgReasonForSupport(e.target.value);
                          }
                        }}
                        style={{
                          width: "100%",
                          height: "48px",
                          minHeight: "48px",
                          padding: "0 16px",
                          fontSize: "14px",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Description of Assistance Required */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Description of assistance required
                      </label>
                      <textarea
                        rows={3}
                        placeholder={
                          addBenType === "INDIVIDUAL"
                            ? "Specify requested items, dietary restrictions, voucher amounts, or court dates..."
                            : "Details of requested grant allocation, bulk pallet delivery, or collaborative casework schedule..."
                        }
                        value={addBenType === "INDIVIDUAL" ? newBenAssistanceDescription : newOrgAssistanceDescription}
                        onChange={(e) => {
                          if (addBenType === "INDIVIDUAL") {
                            setNewBenAssistanceDescription(e.target.value);
                          } else {
                            setNewOrgAssistanceDescription(e.target.value);
                          }
                        }}
                        style={{
                          width: "100%",
                          minHeight: "88px",
                          padding: "12px 16px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    {/* Supporting Documents & Internal Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Supporting documents received
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Proof of address verified, British Gas arrears letter"
                          value={addBenType === "INDIVIDUAL" ? newBenSupportingDocsNote : newOrgSupportingDocsNote}
                          onChange={(e) => {
                            if (addBenType === "INDIVIDUAL") {
                              setNewBenSupportingDocsNote(e.target.value);
                            } else {
                              setNewOrgSupportingDocsNote(e.target.value);
                            }
                          }}
                          style={{
                            width: "100%",
                            height: "48px",
                            minHeight: "48px",
                            padding: "0 16px",
                            fontSize: "14px",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Internal casework notes (Confidential)
                        </label>
                        <input
                          type="text"
                          placeholder="Caseworker assessment notes, intake referral source..."
                          value={addBenType === "INDIVIDUAL" ? newBenInitialNotes : newOrgInternalNotes}
                          onChange={(e) => {
                            if (addBenType === "INDIVIDUAL") {
                              setNewBenInitialNotes(e.target.value);
                            } else {
                              setNewOrgInternalNotes(e.target.value);
                            }
                          }}
                          style={{
                            width: "100%",
                            height: "48px",
                            minHeight: "48px",
                            padding: "0 16px",
                            fontSize: "14px",
                            color: "#0F172A",
                            backgroundColor: "#FFFFFF",
                            border: "1.5px solid #CBD5E1",
                            borderRadius: "12px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>

                    {/* Multiple Supporting Documents Upload */}
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "14px",
                        border: "2px dashed #CBD5E1",
                        backgroundColor: "#F8FAFC",
                        marginTop: "8px",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "10px",
                              backgroundColor: "#FDF2F8",
                              color: "#E6127E",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <UploadCloud size={22} />
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A" }}>
                              Upload Supporting Documents (Multiple Files Option)
                            </div>
                            <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                              Attach proof of identity, tenancy agreement, utility arrears bill, medical proof, or intake notes.
                            </div>
                          </div>
                        </div>

                        <label
                          style={{
                            padding: "9px 16px",
                            borderRadius: "10px",
                            backgroundColor: addBenType === "ORGANISATION" ? "#4F46E5" : "#E6127E",
                            color: "#ffffff",
                            fontSize: "12px",
                            fontWeight: 800,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            flexShrink: 0,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Plus size={14} />
                          <span>Select Files to Attach</span>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUploadBeneficiary(e, addBenType === "ORGANISATION")}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>

                      {/* Attached Documents List */}
                      {(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).length > 0 ? (
                        <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                          <div style={{ fontSize: "11px", fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>
                            Attached Support Documents ({(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).length}):
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).map((file) => (
                              <div
                                key={file.id}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "8px 12px",
                                  borderRadius: "10px",
                                  backgroundColor: "#FFFFFF",
                                  border: "1px solid #CBD5E1",
                                }}
                              >
                                <div className="flex items-center gap-2 truncate" style={{ minWidth: 0 }}>
                                  <FileText size={16} className="text-magenta flex-shrink-0" />
                                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#1E293B" }} className="truncate" title={file.name}>
                                    {file.name}
                                  </span>
                                  <span style={{ fontSize: "10px", color: "#64748B", flexShrink: 0 }}>
                                    ({file.size})
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveUploadedFile(file.id, addBenType === "ORGANISATION")}
                                  style={{
                                    border: "none",
                                    background: "#FEE2E2",
                                    color: "#DC2626",
                                    cursor: "pointer",
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    flexShrink: 0,
                                    marginLeft: "8px",
                                  }}
                                  title="Remove document"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "10px", fontStyle: "italic" }}>
                          No documents attached yet. You can attach multiple PDF, JPG, PNG, or Word documents.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 4: ADVOCATE ASSIGNMENT & PORTAL ACCESS                     */}
              {/* ============================================================== */}
              {addBenStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Step 4 – Assigned Advocate &amp; Portal Access
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Assign a primary caseworker and review profile details before final saving.
                    </p>
                  </div>

                  {/* Caseworker Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select assigned advocate / caseworker *
                    </label>
                    <select
                      value={addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate}
                      onChange={(e) => {
                        if (addBenType === "INDIVIDUAL") {
                          setNewBenAssignedAdvocate(e.target.value);
                        } else {
                          setNewOrgAssignedAdvocate(e.target.value);
                        }
                      }}
                      style={{
                        width: "100%",
                        height: "48px",
                        minHeight: "48px",
                        padding: "0 16px",
                        fontSize: "14px",
                        color: "#0F172A",
                        backgroundColor: "#FFFFFF",
                        border: "1.5px solid #CBD5E1",
                        borderRadius: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">-- Select Assigned Advocate / Caseworker --</option>
                      {activeAdvocatesList.map((adv) => (
                        <option key={adv.id} value={adv.display}>
                          {adv.display} • {adv.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Advocate Badge Callout */}
                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: "14px",
                      backgroundColor: "#FFF5F9",
                      border: "1px solid #FBCFE8",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <HeartHandshake size={20} className={(addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate) ? "text-magenta flex-shrink-0" : "text-amber-600 flex-shrink-0"} />
                    <div style={{ fontSize: "12px", color: (addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate) ? "#9D174D" : "#B45309", lineHeight: 1.5 }}>
                      {(addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate) ? (
                        <>
                          <span className="font-bold">Primary Crisis Caseworker Assigned: </span>
                          <strong>{(addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate)}</strong> will triage relief distributions, maintain communication logs, and monitor case milestones.
                        </>
                      ) : (
                        <>
                          <span className="font-bold">Action Required: </span>
                          Please select an advocate from the dropdown above to take charge of this beneficiary's welfare, triage, and communications.
                        </>
                      )}
                    </div>
                  </div>

                  {/* Portal Account Toggle */}
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "16px",
                      backgroundColor: "#F8FAFC",
                      border: "1.5px solid #E2E8F0",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="portalAccountToggle"
                        checked={addBenType === "INDIVIDUAL" ? newBenCreatePortalAccount : newOrgCreatePortalAccount}
                        onChange={(e) => {
                          if (addBenType === "INDIVIDUAL") {
                            setNewBenCreatePortalAccount(e.target.checked);
                          } else {
                            setNewOrgCreatePortalAccount(e.target.checked);
                          }
                        }}
                        style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "2px",
                          cursor: "pointer",
                          accentColor: "#E6127E",
                        }}
                      />
                      <label htmlFor="portalAccountToggle" className="cursor-pointer" style={{ flex: 1 }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", display: "block" }}>
                          Create Online Portal Access Account
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748B", marginTop: "3px", display: "block", lineHeight: 1.5 }}>
                          Enables secure sign-in at the Beneficiary Portal using their email address to track application status, download receipts, and communicate with caseworkers.
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 pt-4 mt-3 border-t border-slate-200">
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
                        Initial Account Status:
                      </span>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-800 cursor-pointer">
                          <input
                            type="radio"
                            name="activeStatusRadio"
                            checked={addBenType === "INDIVIDUAL" ? newBenActiveStatus : newOrgActiveStatus}
                            onChange={() => {
                              if (addBenType === "INDIVIDUAL") {
                                setNewBenActiveStatus(true);
                              } else {
                                setNewOrgActiveStatus(true);
                              }
                            }}
                            style={{ accentColor: "#E6127E" }}
                          />
                          <span className="font-semibold text-emerald-700">Active Account</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-800 cursor-pointer">
                          <input
                            type="radio"
                            name="activeStatusRadio"
                            checked={addBenType === "INDIVIDUAL" ? !newBenActiveStatus : !newOrgActiveStatus}
                            onChange={() => {
                              if (addBenType === "INDIVIDUAL") {
                                setNewBenActiveStatus(false);
                              } else {
                                setNewOrgActiveStatus(false);
                              }
                            }}
                            style={{ accentColor: "#E6127E" }}
                          />
                          <span className="font-semibold text-slate-500">Inactive / Pending</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card Before Submission */}
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "14px",
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      fontSize: "12px",
                      color: "#334155",
                    }}
                  >
                    <div className="font-bold text-slate-900 mb-2 flex items-center justify-between">
                      <span>Registration Summary Preview</span>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-300">
                        {addBenType}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">Name: </span>
                        <strong className="text-slate-900">
                          {addBenType === "ORGANISATION"
                            ? newOrgName || "Untitled Organisation"
                            : (newBenFullName || `${newBenFirstName} ${newBenLastName}`).trim() || "Untitled"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Portal Login Email: </span>
                        <strong className="text-slate-900 font-mono">
                          {addBenType === "ORGANISATION" ? newOrgContactEmail : newBenEmail}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Login Password: </span>
                        <strong className="text-slate-900 font-mono">
                          {addBenType === "ORGANISATION" ? newOrgPassword : newBenPassword}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Direct Login Access: </span>
                        <strong className={(addBenType === "ORGANISATION" ? newOrgActiveStatus : newBenActiveStatus) ? "text-emerald-700" : "text-amber-700"}>
                          {(addBenType === "ORGANISATION" ? newOrgActiveStatus : newBenActiveStatus) ? "Active (Can log in immediately)" : "Pending Admin Review"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Assigned Advocate: </span>
                        <strong className={(addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate) ? "text-slate-900" : "text-red-600"}>
                          {(addBenType === "INDIVIDUAL" ? newBenAssignedAdvocate : newOrgAssignedAdvocate) || "Not yet assigned (Required)"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Support Category: </span>
                        <strong className="text-slate-900">
                          {addBenType === "ORGANISATION" ? newOrgSupportCategory : newBenSupportCategory}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Urgency Level: </span>
                        <strong className="text-magenta">
                          {addBenType === "ORGANISATION" ? newOrgUrgency : newBenInitialUrgency}
                        </strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500">Supporting Documents: </span>
                        <strong className="text-slate-900">
                          {(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).length > 0
                            ? `${(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).length} files attached (${(addBenType === "INDIVIDUAL" ? newBenUploadedFiles : newOrgUploadedFiles).map(f => f.name).join(", ")})`
                            : "None attached (Intake dossier auto-generated)"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* MODAL NAVIGATION FOOTER (Back, Cancel, Next / Submit)          */}
              {/* ============================================================== */}
              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                {addBenStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setAddBenStep((prev) => (prev > 1 ? (prev - 1 as any) : 1))}
                    style={{
                      height: "44px",
                      padding: "0 20px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      color: "#334155",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    &larr; Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddBeneficiaryModal(false)}
                    style={{
                      height: "44px",
                      padding: "0 20px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#ffffff",
                      color: "#64748B",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}

                <div className="flex items-center gap-3">
                  {addBenStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setShowAddBeneficiaryModal(false)}
                      style={{
                        height: "44px",
                        padding: "0 18px",
                        borderRadius: "12px",
                        border: "1.5px solid #E2E8F0",
                        backgroundColor: "#ffffff",
                        color: "#64748B",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}

                  {addBenStep < 4 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (addBenStep === 3) {
                          setAddBenStep(4);
                        } else {
                          handleNextStep(e);
                        }
                      }}
                      style={{
                        height: "44px",
                        padding: "0 24px",
                        borderRadius: "12px",
                        backgroundColor: "#E6127E",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "pointer",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(230, 18, 126, 0.35)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>
                        {addBenStep === 1
                          ? "Continue to Basic Information"
                          : addBenStep === 2
                          ? "Continue to Support Needs"
                          : "Continue to Step 4: Advocate & Access"}
                      </span>
                      <span>&rarr;</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submittingAddBeneficiary}
                      style={{
                        height: "44px",
                        padding: "0 28px",
                        borderRadius: "12px",
                        backgroundColor: addBenType === "ORGANISATION" ? "#4F46E5" : "#E6127E",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: submittingAddBeneficiary ? "not-allowed" : "pointer",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(230, 18, 126, 0.35)",
                        opacity: submittingAddBeneficiary ? 0.6 : 1,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {submittingAddBeneficiary ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          <span>
                            {addBenType === "ORGANISATION"
                              ? "Submit Organisation Registration"
                              : "Submit Beneficiary Registration"}
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 2: COMPREHENSIVE BENEFICIARY PROFILE & HISTORY MODAL    */}
      {/* ========================================================================= */}
      {viewingBeneficiary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewingBeneficiary(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setViewingBeneficiary(null)}
              style={{
                position: "absolute",
                top: "22px",
                right: "22px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            {/* Profile Header with right padding for close button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100" style={{ paddingRight: "52px" }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-magenta to-pink-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {viewingBeneficiary.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {viewingBeneficiary.fullName}
                    </h2>
                    {viewingBeneficiary.active ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active Casework
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-300">
                        Deactivated Account
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    {viewingBeneficiary.email} &bull; {viewingBeneficiary.phoneNumber || "No phone recorded"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                    <span>{viewingBeneficiary.townCity || "Leicester"}, {viewingBeneficiary.postcode || viewingBeneficiary.address || "UK"}</span>
                    <span>&bull;</span>
                    <span>Registered {new Date(viewingBeneficiary.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => openEditBeneficiary(viewingBeneficiary)}
                  style={{
                    height: "38px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Edit size={13} />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleBeneficiaryActive(viewingBeneficiary, !viewingBeneficiary.active)}
                  style={{
                    height: "38px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: viewingBeneficiary.active ? "1.5px solid #CBD5E1" : "1.5px solid #A7F3D0",
                    backgroundColor: viewingBeneficiary.active ? "#F1F5F9" : "#ECFDF5",
                    color: viewingBeneficiary.active ? "#475569" : "#047857",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <span>{viewingBeneficiary.active ? "Deactivate" : "Activate"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const ben = viewingBeneficiary;
                    setDeletingBeneficiary(ben);
                  }}
                  style={{
                    height: "38px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #FECACA",
                    backgroundColor: "#FEF2F2",
                    color: "#DC2626",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  title="Permanently delete this beneficiary"
                >
                  <Trash2 size={13} />
                  <span>Delete Beneficiary</span>
                </button>
              </div>
            </div>

            {/* Modal Internal Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setBeneficiaryActiveTabModal("OVERVIEW")}
                className={`pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                  beneficiaryActiveTabModal === "OVERVIEW"
                    ? "border-magenta text-magenta"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Profile &amp; Demographics
              </button>

              <button
                type="button"
                onClick={() => setBeneficiaryActiveTabModal("REQUESTS")}
                className={`pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  beneficiaryActiveTabModal === "REQUESTS"
                    ? "border-magenta text-magenta"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Support History</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-pink-100 text-magenta font-black">
                  {viewingBeneficiary.beneficiaryRequests?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBeneficiaryActiveTabModal("DOCUMENTS")}
                className={`pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  beneficiaryActiveTabModal === "DOCUMENTS"
                    ? "border-magenta text-magenta"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Case Documents</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-700 font-black">
                  {viewingBeneficiary.documents?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBeneficiaryActiveTabModal("COMMS")}
                className={`pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  beneficiaryActiveTabModal === "COMMS"
                    ? "border-magenta text-magenta"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Communication Logs</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-700 font-black">
                  {viewingBeneficiary.communicationLogs?.length || 0}
                </span>
              </button>
            </div>

            {/* TAB CONTENT: 1. OVERVIEW */}
            {beneficiaryActiveTabModal === "OVERVIEW" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Assigned Primary Advocate
                    </span>
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <HeartHandshake size={16} className="text-magenta" />
                      <span>{viewingBeneficiary.assignedAdvocate || "Not yet assigned"}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAssigningAdvocateBeneficiary(viewingBeneficiary);
                        setSelectedAdvocateValue(viewingBeneficiary.assignedAdvocate || "Sarah Davies (Senior Crisis Caseworker)");
                      }}
                      className="mt-2 text-xs font-bold text-magenta hover:underline"
                    >
                      Change Advocate &rarr;
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Emergency Contact (ICE)
                    </span>
                    <div className="font-bold text-slate-900 text-sm">
                      {viewingBeneficiary.emergencyContact || "No emergency contact provided"}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Address &amp; Refuge Verification
                  </h4>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong>Street:</strong> {viewingBeneficiary.address || "Confidential or unrecorded"}<br />
                    <strong>Town/City:</strong> {viewingBeneficiary.townCity || "Leicester"}<br />
                    <strong>Postcode:</strong> {viewingBeneficiary.postcode || "LE1"}<br />
                    <strong>Country:</strong> {viewingBeneficiary.country || "United Kingdom"}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. SUPPORT HISTORY & APPLICATIONS */}
            {beneficiaryActiveTabModal === "REQUESTS" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Assistance Applications &amp; Welfare Grants
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setCreatingReqBeneficiary(viewingBeneficiary);
                      setNewReqServiceType("Emergency Heating & Fuel Voucher");
                      setNewReqUrgency("HIGH");
                      setNewReqNotes("");
                    }}
                    className="admin-btn-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                      style={{
                        height: "36px",
                        backgroundColor: "#E6127E",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        borderRadius: "10px",
                        padding: "0 14px",
                        boxShadow: "0 2px 8px rgba(230, 18, 126, 0.25)",
                      }}
                  >
                    <Plus size={13} />
                    <span>+ Log Assistance Request</span>
                  </button>
                </div>

                {(!viewingBeneficiary.beneficiaryRequests || viewingBeneficiary.beneficiaryRequests.length === 0) ? (
                  <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-2xl">
                    No assistance applications currently recorded for this beneficiary.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {viewingBeneficiary.beneficiaryRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-pink-200 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">
                              {req.serviceType}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                req.urgency === "EMERGENCY"
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : req.urgency === "HIGH"
                                  ? "bg-orange-100 text-orange-700 border border-orange-200"
                                  : "bg-amber-100 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {req.urgency}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {req.status === "APPROVED" ? (
                              <span className="admin-badge-completed">● Approved</span>
                            ) : req.status === "IN_PROGRESS" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                In Progress
                              </span>
                            ) : req.status === "REJECTED" ? (
                              <span className="admin-badge-failed">● Rejected</span>
                            ) : (
                              <span className="admin-badge-pending">● Pending Triage</span>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setReviewingRequestItem({ beneficiary: viewingBeneficiary, request: req });
                                setReviewStatusValue(req.status);
                                setReviewNotesValue(req.reviewNotes || req.notes || "");
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-magenta bg-pink-50 hover:bg-pink-100 cursor-pointer"
                            >
                              Review
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-600 leading-relaxed mb-2">
                          {req.notes || "No initial intake notes recorded."}
                        </div>

                        {req.reviewNotes && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                            <strong>Admin Review Notes:</strong> {req.reviewNotes}
                          </div>
                        )}

                        <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                          <span>Caseworker: {req.assignedWorker || "Unassigned"}</span>
                          <span>Filed: {new Date(req.createdAt).toLocaleDateString("en-GB")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 3. CASE DOCUMENTS */}
            {beneficiaryActiveTabModal === "DOCUMENTS" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Stored Verification Documents
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setAddingDocBeneficiary(viewingBeneficiary);
                      setDocNameValue("");
                      setDocTypeValue("Proof of Address");
                      setDocStatusValue("VERIFIED");
                    }}
                    className="admin-btn-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus size={13} />
                    <span>+ Upload Document</span>
                  </button>
                </div>

                {(!viewingBeneficiary.documents || viewingBeneficiary.documents.length === 0) ? (
                  <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-2xl">
                    No case documents recorded yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {viewingBeneficiary.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 hover:border-pink-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-magenta">
                            <FileText size={16} />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900">
                              {doc.name}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {doc.type} &bull; {doc.size} &bull; Uploaded {new Date(doc.uploadedAt).toLocaleDateString("en-GB")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {doc.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(viewingBeneficiary.id, doc.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Remove document"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 4. COMMUNICATION LOGS */}
            {beneficiaryActiveTabModal === "COMMS" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Casework Interaction Audit Trail
                  </h3>
                </div>

                {(!viewingBeneficiary.communicationLogs || viewingBeneficiary.communicationLogs.length === 0) ? (
                  <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-2xl">
                    No communication logs recorded yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {viewingBeneficiary.communicationLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900">
                              {log.staff}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {log.method}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(log.date).toLocaleString("en-GB")}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed mb-2">
                          {log.notes}
                        </p>

                        {log.nextStep && (
                          <div className="text-[11px] text-magenta font-semibold flex items-center gap-1">
                            <span>Next Action:</span>
                            <span>{log.nextStep}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 3: EDIT BENEFICIARY INFORMATION                         */}
      {/* ========================================================================= */}
      {editingBeneficiary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setEditingBeneficiary(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEditingBeneficiary(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Edit Beneficiary Details
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Update contact info, address, advocate assignment, and account status.
            </p>

            <form onSubmit={handleUpdateBeneficiary} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editBenFullName}
                    onChange={(e) => setEditBenFullName(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={editBenEmail}
                    onChange={(e) => setEditBenEmail(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editBenPhone}
                    onChange={(e) => setEditBenPhone(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editBenTownCity}
                    onChange={(e) => setEditBenTownCity(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={editBenPostcode}
                    onChange={(e) => setEditBenPostcode(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={editBenAddress}
                  onChange={(e) => setEditBenAddress(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Emergency Contact (ICE)
                  </label>
                  <input
                    type="text"
                    value={editBenEmergencyContact}
                    onChange={(e) => setEditBenEmergencyContact(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Assigned Advocate
                  </label>
                  <select
                    value={editBenAssignedAdvocate}
                    onChange={(e) => setEditBenAssignedAdvocate(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  >
                    <option value="">-- Unassigned / General Casework --</option>
                    {activeAdvocatesList.map((adv) => (
                      <option key={adv.id} value={adv.display}>
                        {adv.display} • {adv.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Account Status
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {editBenActive ? "Beneficiary is active and eligible for assistance." : "Account is deactivated."}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditBenActive(!editBenActive)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    editBenActive
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {editBenActive ? "ACTIVE" : "DEACTIVATED"}
                </button>
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F1F5F9", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => {
                    const ben = editingBeneficiary;
                    setEditingBeneficiary(null);
                    setDeletingBeneficiary(ben);
                  }}
                  style={{
                    height: "40px",
                    padding: "0 16px",
                    borderRadius: "12px",
                    border: "1.5px solid #FECACA",
                    backgroundColor: "#FEF2F2",
                    color: "#DC2626",
                    fontWeight: 700,
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  title="Delete this beneficiary account"
                >
                  <Trash2 size={14} />
                  <span>Delete Beneficiary</span>
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setEditingBeneficiary(null)}
                    style={{
                      height: "40px",
                      padding: "0 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      backgroundColor: "#FFFFFF",
                      color: "#475569",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEditBeneficiary}
                    style={{
                      height: "40px",
                      minHeight: "40px",
                      padding: "0 22px",
                      borderRadius: "12px",
                      backgroundColor: "#E6127E",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "13px",
                      border: "none",
                      cursor: submittingEditBeneficiary ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                      opacity: submittingEditBeneficiary ? 0.6 : 1,
                    }}
                  >
                    {submittingEditBeneficiary ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 4: REVIEW & TRIAGE APPLICATION (APPROVE / REJECT)       */}
      {/* ========================================================================= */}
      {reviewingRequestItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setReviewingRequestItem(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "540px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setReviewingRequestItem(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Review &amp; Triage Application
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Review assistance request details and update resolution status.
            </p>

            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  {reviewingRequestItem.beneficiary.fullName}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {reviewingRequestItem.beneficiary.email}
                </span>
              </div>
              <div className="text-xs font-semibold text-magenta">
                {reviewingRequestItem.request.serviceType}
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Intake Circumstances:</strong> {reviewingRequestItem.request.notes || "None provided."}
              </div>
            </div>

            <form onSubmit={handleReviewRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Triage Decision / Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewStatusValue("APPROVED")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      reviewStatusValue === "APPROVED"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    ✓ Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatusValue("IN_PROGRESS")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      reviewStatusValue === "IN_PROGRESS"
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    In Progress
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatusValue("PENDING")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      reviewStatusValue === "PENDING"
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"
                    }`}
                  >
                    Pending
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatusValue("REJECTED")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      reviewStatusValue === "REJECTED"
                        ? "bg-red-600 text-white border-red-600 shadow-sm"
                        : "bg-white text-red-700 border-red-200 hover:bg-red-50"
                    }`}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Administrative Review Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. £150 British Gas voucher dispatched via SMS code; food parcel collected at reception..."
                  value={reviewNotesValue}
                  onChange={(e) => setReviewNotesValue(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setReviewingRequestItem(null)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingReview ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingReview ? 0.6 : 1,
                  }}
                >
                  {submittingReview ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Updating Status...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Confirm Decision</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 5: ASSIGN ADVOCATE OR CASEWORKER                        */}
      {/* ========================================================================= */}
      {assigningAdvocateBeneficiary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setAssigningAdvocateBeneficiary(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAssigningAdvocateBeneficiary(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#0F172A", margin: "0 0 4px 0", paddingRight: "44px" }}>
              Assign Advocate / Caseworker
            </h3>
            <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 20px 0" }}>
              Allocate a dedicated staff caseworker to <strong>{assigningAdvocateBeneficiary.fullName}</strong>.
            </p>

            <form onSubmit={handleAssignAdvocateSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "6px" }}>
                  Select Zinthiya Trust Specialist
                </label>
                <select
                  value={selectedAdvocateValue}
                  onChange={(e) => setSelectedAdvocateValue(e.target.value)}
                  style={{
                    width: "100%",
                    height: "46px",
                    minHeight: "46px",
                    padding: "0 14px",
                    fontSize: "14px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  {activeAdvocatesList.map((adv) => (
                    <option key={adv.id} value={adv.display}>
                      {adv.display} • {adv.department}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setAssigningAdvocateBeneficiary(null)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAssignAdvocate}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingAssignAdvocate ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingAssignAdvocate ? 0.6 : 1,
                  }}
                >
                  {submittingAssignAdvocate ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Assign Advocate</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 7: CREATE ADDITIONAL SUPPORT REQUEST                    */}
      {/* ========================================================================= */}
      {creatingReqBeneficiary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setCreatingReqBeneficiary(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "540px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCreatingReqBeneficiary(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              New Assistance Request
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Log a new welfare request for <strong>{creatingReqBeneficiary.fullName}</strong>.
            </p>

            <form onSubmit={handleCreateRequestSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Service Requested *
                </label>
                <select
                  value={newReqServiceType}
                  onChange={(e) => setNewReqServiceType(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                >
                  <option value="Emergency Food Parcel &amp; Essentials">Emergency Food Parcel &amp; Essentials</option>
                  <option value="Emergency Heating &amp; Fuel Voucher">Emergency Heating &amp; Fuel Voucher</option>
                  <option value="Domestic Abuse Crisis Sanctuary Relocation">Domestic Abuse Crisis Sanctuary Relocation</option>
                  <option value="Winter Bedding &amp; Warm Clothing Pack">Winter Bedding &amp; Warm Clothing Pack</option>
                  <option value="Debt &amp; Energy Arrears Advocacy">Debt &amp; Energy Arrears Advocacy</option>
                  <option value="Emergency Cash Welfare Grant (£50 - £250)">Emergency Cash Welfare Grant (£50 - £250)</option>
                  <option value="Tenancy &amp; Housing Injunction Casework">Tenancy &amp; Housing Injunction Casework</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={newReqUrgency}
                    onChange={(e) => setNewReqUrgency(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  >
                    <option value="EMERGENCY">Emergency (Immediate Hazard)</option>
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Household Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newReqHouseholdSize}
                    onChange={(e) => setNewReqHouseholdSize(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Intake Notes / Circumstances
                </label>
                <textarea
                  rows={3}
                  placeholder="Details of new emergency, changes in circumstances, immediate welfare priorities..."
                  value={newReqNotes}
                  onChange={(e) => setNewReqNotes(e.target.value)}
                  style={{
  width: "100%",
  minHeight: "90px",
  padding: "10px 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
  resize: "vertical",
}}
                />
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setCreatingReqBeneficiary(null)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingNewReq}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingNewReq ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingNewReq ? 0.6 : 1,
                  }}
                >
                  {submittingNewReq ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Creating Request...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 8: ADD / RECORD CASE DOCUMENT                           */}
      {/* ========================================================================= */}
      {addingDocBeneficiary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setAddingDocBeneficiary(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAddingDocBeneficiary(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-1">
              Add Case Document
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Record a verified verification file for <strong>{addingDocBeneficiary.fullName}</strong>.
            </p>

            <form onSubmit={handleAddDocumentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Document File Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. British_Gas_Final_Demand.pdf"
                  value={docNameValue}
                  onChange={(e) => setDocNameValue(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Document Type
                </label>
                <select
                  value={docTypeValue}
                  onChange={(e) => setDocTypeValue(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                >
                  <option value="Proof of Address">Proof of Address (Tenancy / Council Tax)</option>
                  <option value="Utility Bill">Utility Bill (Prepayment / Arrears Bill)</option>
                  <option value="Proof of Income / Benefits">Proof of Income / Benefits (Universal Credit)</option>
                  <option value="Proof of ID">Proof of Identity (Passport / Driving Licence)</option>
                  <option value="Police / Safeguarding Report">Police / Safeguarding Incident Report</option>
                  <option value="Safety Relocation Plan">Safety Relocation Plan</option>
                  <option value="Medical / Health Visitor Referral">Medical / Health Visitor Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Verification Status
                </label>
                <select
                  value={docStatusValue}
                  onChange={(e) => setDocStatusValue(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                >
                  <option value="VERIFIED">Verified by Caseworker</option>
                  <option value="PENDING">Pending Verification</option>
                  <option value="RESTRICTED">Restricted (Safety / Safeguarding Sensitive)</option>
                </select>
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setAddingDocBeneficiary(null)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDoc}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingDoc ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingDoc ? 0.6 : 1,
                  }}
                >
                  {submittingDoc ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving Document...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save Document</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BENEFICIARY MODAL 9: DELETE BENEFICIARY CONFIRMATION                      */}
      {/* ========================================================================= */}
      {deletingBeneficiary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setDeletingBeneficiary(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "28px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
              border: "1px solid #F1F5F9",
              position: "relative",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#FEF2F2",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <Trash2 size={26} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#0F172A", margin: "0 0 6px 0" }}>
              Delete Beneficiary Account?
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 10px 0", lineHeight: 1.5 }}>
              Are you sure you want to permanently delete <strong>{deletingBeneficiary.fullName}</strong> ({deletingBeneficiary.email})?
            </p>
            <p style={{ fontSize: "11px", color: "#DC2626", fontWeight: 700, margin: "0 0 24px 0", padding: "10px", backgroundColor: "#FEF2F2", borderRadius: "10px", border: "1px solid #FECACA" }}>
              This action will permanently remove all associated assistance requests and recorded case documents.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}>
              <button
                type="button"
                onClick={() => setDeletingBeneficiary(null)}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submittingDeleteBeneficiary}
                onClick={() => handleDeleteBeneficiarySubmit(deletingBeneficiary)}
                style={{
                  height: "42px",
                  minHeight: "42px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: submittingDeleteBeneficiary ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                  opacity: submittingDeleteBeneficiary ? 0.6 : 1,
                }}
              >
                {submittingDeleteBeneficiary ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Deleting Beneficiary...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Confirm Deletion</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 1: CREATE NEW FUND ALLOCATION                            */}
      {/* ========================================================================= */}
      {showCreateAllocationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCreateAllocationModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCreateAllocationModal(false)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-magenta to-pink-600 text-white flex items-center justify-center shadow-md">
                <Wallet size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Allocate Funds &amp; Assistance
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Commit charitable funds from campaigns or general relief to a beneficiary welfare grant.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAllocationSubmit} className="space-y-4">
              {/* Beneficiary Selection Mode */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Recipient Beneficiary *
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setAllocBeneficiaryMode("EXISTING")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        allocBeneficiaryMode === "EXISTING"
                          ? "bg-magenta text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Registered Beneficiary
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllocBeneficiaryMode("CUSTOM")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        allocBeneficiaryMode === "CUSTOM"
                          ? "bg-magenta text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Walk-in / External Recipient
                    </button>
                  </div>
                </div>

                {allocBeneficiaryMode === "EXISTING" ? (
                  <div>
                    <select
                      value={allocSelectedBeneficiaryId}
                      onChange={(e) => setAllocSelectedBeneficiaryId(e.target.value)}
                      style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                    >
                      {beneficiariesList.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.fullName} ({b.email}) &bull; {b.townCity || "Leicester"}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={allocCustomName}
                        onChange={(e) => setAllocCustomName(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "13px",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={allocCustomEmail}
                        onChange={(e) => setAllocCustomEmail(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "13px",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Phone (optional)"
                        value={allocCustomPhone}
                        onChange={(e) => setAllocCustomPhone(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          minHeight: "44px",
                          padding: "0 14px",
                          fontSize: "13px",
                          color: "#0F172A",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Support Category & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Support Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateAllocationModal(false);
                        openCreateCategoryModal();
                      }}
                      className="text-[11px] font-bold text-magenta hover:underline cursor-pointer"
                    >
                      + New Category
                    </button>
                  </div>
                  <select
                    value={allocCategoryId}
                    onChange={(e) => {
                      setAllocCategoryId(e.target.value);
                      const cat = supportCategoriesList.find((c) => c.id === e.target.value);
                      if (cat) setAllocAssistanceType(cat.name);
                    }}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    {supportCategoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} (Target: £{Number(cat.targetFundingRequired || 0).toLocaleString("en-GB")})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Amount to Allocate (GBP £) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">
                      £
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min={1}
                      required
                      value={allocAmount}
                      onChange={(e) => setAllocAmount(e.target.value)}
                      style={{
                        width: "100%",
                        height: "44px",
                        minHeight: "44px",
                        padding: "0 14px 0 28px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0F172A",
                        backgroundColor: "#FFFFFF",
                        border: "1.5px solid #CBD5E1",
                        borderRadius: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Fund Source Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Budget Source / Campaign Allocation *
                </label>
                <select
                  value={allocFundSource}
                  onChange={(e) => {
                    setAllocFundSource(e.target.value);
                    const matchedCamp = campaigns.find((c) => c.title === e.target.value);
                    setAllocCampaignId(matchedCamp ? matchedCamp.id : "");
                  }}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                >
                  <option value="General Relief Fund">General Relief Fund (Unrestricted Reserves)</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} (Raised: £{Number(c.raisedAmount).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description & Purpose */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Grant Purpose &amp; Allocation Justification
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Approved emergency prepayment voucher for gas meter disconnection threat..."
                  value={allocDescription}
                  onChange={(e) => setAllocDescription(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              {/* Immediate Distribution Toggle */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      Record Immediate Distribution
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Check if this assistance has already been handed over or disbursed today.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={allocImmediateDisburse}
                    onChange={(e) => setAllocImmediateDisburse(e.target.checked)}
                    className="w-4 h-4 text-magenta rounded focus:ring-magenta cursor-pointer"
                  />
                </div>

                {allocImmediateDisburse && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                        Payment / Delivery Method
                      </label>
                      <select
                        value={allocPaymentMethod}
                        onChange={(e) => setAllocPaymentMethod(e.target.value)}
                        className="w-full p-2 rounded-xl border border-emerald-300 text-xs text-slate-900 bg-white"
                      >
                        <option value="Prepayment Voucher">Prepayment Voucher</option>
                        <option value="Bank Transfer">Bank Transfer (BACS)</option>
                        <option value="Cash">Cash Handover</option>
                        <option value="Energy Key Code">Energy Key Code</option>
                        <option value="Direct Goods / Hamper">Direct Goods / Hamper</option>
                        <option value="Merchant Payment">Merchant Direct Payment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                        Receipt / PayPoint Voucher Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. VCH-BG-884910"
                        value={allocReceiptRef}
                        onChange={(e) => setAllocReceiptRef(e.target.value)}
                        className="w-full p-2 rounded-xl border border-emerald-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #F1F5F9", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowCreateAllocationModal(false)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCreateAllocation}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingCreateAllocation ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingCreateAllocation ? 0.6 : 1,
                  }}
                >
                  {submittingCreateAllocation ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving Allocation...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Confirm Fund Allocation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 2: RECORD ACTUAL ASSISTANCE DISTRIBUTION                 */}
      {/* ========================================================================= */}
      {recordingDistributionItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setRecordingDistributionItem(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRecordingDistributionItem(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Record Actual Assistance Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Disburse allocated funds to <strong>{recordingDistributionItem.beneficiaryName}</strong> and record official evidence.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Support Category:</span>
                <span className="font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {recordingDistributionItem.categoryName || recordingDistributionItem.assistanceType}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Allocated Amount (Committed):</span>
                <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  £{Number(recordingDistributionItem.allocatedAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Fund Source:</span>
                <span className="font-medium text-slate-800">{recordingDistributionItem.fundSource}</span>
              </div>
            </div>

            <form onSubmit={handleRecordDistributionSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Actually Distributed Amount (GBP £) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">£</span>
                    <input
                      type="number"
                      step="0.01"
                      min={0.01}
                      required
                      value={distributeAmount}
                      onChange={(e) => setDistributeAmount(e.target.value)}
                      style={{
                        width: "100%",
                        height: "44px",
                        minHeight: "44px",
                        padding: "0 14px 0 28px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0F172A",
                        backgroundColor: "#FFFFFF",
                        border: "1.5px solid #CBD5E1",
                        borderRadius: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Distribution Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={distributeDate}
                    onChange={(e) => setDistributeDate(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Payment / Delivery Method *
                  </label>
                  <select
                    value={distributePaymentMethod}
                    onChange={(e) => setDistributePaymentMethod(e.target.value)}
                    style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                  >
                    <option value="Prepayment Voucher">Prepayment Voucher</option>
                    <option value="Bank Transfer">Bank Transfer (BACS)</option>
                    <option value="Cash">Cash Handover</option>
                    <option value="Energy Key Code">Energy Key Code</option>
                    <option value="Direct Goods / Hamper">Direct Goods / Hamper</option>
                    <option value="Merchant Payment">Merchant Direct Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Receipt / Voucher Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. RCP-BG-77889"
                    value={distributeReceiptRef}
                    onChange={(e) => setDistributeReceiptRef(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 outline-none focus:border-magenta text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Disbursing Staff Officer *
                </label>
                <select
                  value={distributeDisbursedBy}
                  onChange={(e) => setDistributeDisbursedBy(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                >
                  {activeAdvocatesList.map((adv) => (
                    <option key={adv.id} value={adv.display}>
                      {adv.display} • {adv.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Disbursement Notes / Evidence
                </label>
                <textarea
                  rows={2}
                  placeholder="Beneficiary collected voucher in person; energy keycard credited; signed receipt on file..."
                  value={distributeNotes}
                  onChange={(e) => setDistributeNotes(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRecordingDistributionItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDistribution}
                  className="admin-btn-primary px-5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                  }}
                >
                  {submittingDistribution ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Recording...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Confirm Disbursement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 3: OFFICIAL ASSISTANCE DISBURSEMENT VOUCHER / SLIP       */}
      {/* ========================================================================= */}
      {viewingVoucherAllocation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewingVoucherAllocation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingVoucherAllocation(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            {/* Official Header */}
            <div className="text-center pb-4 mb-4 border-b border-slate-200">
              <div className="flex justify-center mb-2">
                <ZinthiyaLogo />
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Zinthiya Ganeshpanchan Trust
              </h2>
              <div className="text-[10px] text-slate-500 font-medium">
                Registered UK Charity No. 1137350 &bull; 12 Bishop Street, Leicester LE1 6AF
              </div>
              <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-magenta text-[10px] font-extrabold uppercase tracking-wider">
                Official Assistance Disbursement Voucher
              </div>
            </div>

            {/* Voucher Details Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Allocation Reference:</span>
                <span className="font-mono font-bold text-slate-900">{viewingVoucherAllocation.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient Beneficiary:</span>
                <span className="font-extrabold text-slate-900">{viewingVoucherAllocation.beneficiaryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assistance Category:</span>
                <span className="font-bold text-slate-900">{viewingVoucherAllocation.assistanceType.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Budget Fund Source:</span>
                <span className="font-medium text-slate-800">{viewingVoucherAllocation.fundSource}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-600">Allocated Amount:</span>
                <span className="text-slate-900">£{Number(viewingVoucherAllocation.allocatedAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-emerald-600">
                <span>Actually Disbursed:</span>
                <span>£{Number(viewingVoucherAllocation.distributedAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment / Delivery:</span>
                <span className="font-semibold text-slate-900">{viewingVoucherAllocation.paymentMethod || "Pending"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Disbursed Date:</span>
                <span className="text-slate-900">{viewingVoucherAllocation.distributionDate ? new Date(viewingVoucherAllocation.distributionDate).toLocaleDateString("en-GB") : "Pending"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorizing Caseworker:</span>
                <span className="text-slate-900">{viewingVoucherAllocation.disbursedBy || "Sarah Davies"}</span>
              </div>
              {viewingVoucherAllocation.receiptReference && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt / PayPoint Ref:</span>
                  <span className="font-mono text-slate-900">{viewingVoucherAllocation.receiptReference}</span>
                </div>
              )}
            </div>

            {viewingVoucherAllocation.disbursementNotes && (
              <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100 text-[11px] text-slate-600 mb-4 leading-relaxed">
                <strong>Casework Notes:</strong> {viewingVoucherAllocation.disbursementNotes}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 print:hidden">
              <button
                type="button"
                onClick={() => setViewingVoucherAllocation(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="admin-btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  style={{
                    height: "40px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    borderRadius: "10px",
                    padding: "0 18px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                  }}
              >
                <Printer size={14} />
                <span>Print Voucher Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 4: EDIT ALLOCATION RECORD                                */}
      {/* ========================================================================= */}
      {editingAllocation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditingAllocation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingAllocation(null)}
              type="button" style={{ position: "absolute", top: "20px", right: "20px", width: "36px", height: "36px", borderRadius: "10px", border: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Edit Fund Allocation
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Update grant allocation parameters for {editingAllocation.reference}.
            </p>

            <form onSubmit={handleEditAllocationSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  required
                  value={editAllocName}
                  onChange={(e) => setEditAllocName(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Support Category
                  </label>
                  <select
                    value={editAllocType}
                    onChange={(e) => setEditAllocType(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    {supportCategoriesList.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Allocated Amount (GBP £)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={1}
                    required
                    value={editAllocAmount}
                    onChange={(e) => setEditAllocAmount(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Budget Source / Fund
                </label>
                <input
                  type="text"
                  value={editAllocFundSource}
                  onChange={(e) => setEditAllocFundSource(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Purpose / Notes
                </label>
                <textarea
                  rows={2}
                  value={editAllocDescription}
                  onChange={(e) => setEditAllocDescription(e.target.value)}
                  style={{
  width: "100%",
  height: "44px",
  minHeight: "44px",
  padding: "0 14px",
  fontSize: "13px",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: "12px",
  outline: "none",
  boxSizing: "border-box",
}}
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAllocation(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEditAllocation}
                  className="admin-btn-primary px-5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submittingEditAllocation ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 5: CANCEL ALLOCATION CONFIRMATION                        */}
      {/* ========================================================================= */}
      {cancellingAllocation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setCancellingAllocation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center">
              Cancel Allocation {cancellingAllocation.reference}?
            </h3>
            <p className="text-xs text-slate-600 text-center mt-2 leading-relaxed">
              Are you sure you want to cancel the allocation of <strong>£{Number(cancellingAllocation.allocatedAmount).toFixed(2)}</strong> for {cancellingAllocation.beneficiaryName}?
            </p>
            <p className="text-[11px] text-amber-700 font-semibold text-center mt-2">
              Cancelling this allocation will immediately restore £{Number(cancellingAllocation.allocatedAmount).toFixed(2)} back into unallocated reserves.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancellingAllocation(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Keep Allocation
              </button>
              <button
                type="button"
                onClick={() => handleCancelAllocationSubmit(cancellingAllocation)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALLOCATION MODAL 6: DELETE ALLOCATION CONFIRMATION                        */}
      {/* ========================================================================= */}
      {deletingAllocation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDeletingAllocation(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center">
              Delete Allocation Record?
            </h3>
            <p className="text-xs text-slate-600 text-center mt-2 leading-relaxed">
              Are you sure you want to delete allocation <strong>{deletingAllocation.reference}</strong> for £{Number(deletingAllocation.allocatedAmount).toFixed(2)}?
            </p>
            <p className="text-[11px] text-red-600 font-semibold text-center mt-2">
              This action will permanently remove this record.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingAllocation(null)}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteAllocationSubmit(deletingAllocation)}
                style={{
                  height: "42px",
                  minHeight: "42px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                }}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUPPORT CATEGORY MODAL 1: CREATE SUPPORT CATEGORY                         */}
      {/* ========================================================================= */}
      {showAddCategoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAddCategoryModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddCategoryModal(false)}
              type="button"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Layers size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Add Support Category
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define a charitable support category and establish its total required funding target.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Medical Assistance, Winter Warmth, Food & Essentials"
                  value={categoryFormName}
                  onChange={(e) => setCategoryFormName(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    minHeight: "44px",
                    padding: "0 14px",
                    fontSize: "13px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Total Funding Required (GBP £ Target) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">
                    £
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    required
                    placeholder="10000"
                    value={categoryFormTarget}
                    onChange={(e) => setCategoryFormTarget(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px 0 28px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Example: Medical Assistance – £10,000.00
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category Purpose &amp; Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the charitable assistance scope, eligible beneficiaries, and delivery guidelines..."
                  value={categoryFormDescription}
                  onChange={(e) => setCategoryFormDescription(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCategory}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingCategory ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingCategory ? 0.6 : 1,
                  }}
                >
                  {submittingCategory ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Creating Category...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Create Support Category</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUPPORT CATEGORY MODAL 2: EDIT SUPPORT CATEGORY                           */}
      {/* ========================================================================= */}
      {editingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditingCategory(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingCategory(null)}
              type="button"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Edit size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Edit Support Category
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update name, target funding requirement, or description for {editingCategory.name}.
                </p>
              </div>
            </div>

            <form onSubmit={handleEditCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryFormName}
                  onChange={(e) => setCategoryFormName(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    minHeight: "44px",
                    padding: "0 14px",
                    fontSize: "13px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Total Funding Required (GBP £ Target) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">
                    £
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    required
                    value={categoryFormTarget}
                    onChange={(e) => setCategoryFormTarget(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px 0 28px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category Purpose &amp; Description
                </label>
                <textarea
                  rows={3}
                  value={categoryFormDescription}
                  onChange={(e) => setCategoryFormDescription(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCategory}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingCategory ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingCategory ? 0.6 : 1,
                  }}
                >
                  {submittingCategory ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save Category Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUPPORT CATEGORY MODAL 3: DELETE SUPPORT CATEGORY                         */}
      {/* ========================================================================= */}
      {deletingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDeletingCategory(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-100 shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Trash2 size={26} />
            </div>

            <h3 className="text-base font-black text-slate-900">
              Delete Support Category?
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to permanently remove category <strong>"{deletingCategory.name}"</strong>?
            </p>
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-3 text-left">
              Note: Existing allocation records tagged under this category will safely retain their historical records and funding amounts.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingCategory(null)}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategorySubmit(deletingCategory)}
                style={{
                  height: "42px",
                  minHeight: "42px",
                  padding: "0 24px",
                  borderRadius: "12px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                }}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* MODAL: COMPOSE NEWSLETTER BROADCAST                                       */}
      {/* ========================================================================= */}
      {showComposeNewsletterModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowComposeNewsletterModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-xl w-full border border-pink-100 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-magenta flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Compose Newsletter Broadcast</h3>
                  <p className="text-[11px] text-slate-500">Dispatches to consented supporters in the registry.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowComposeNewsletterModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDispatchNewsletterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Broadcast Subject Line *</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="e.g. Winter Crisis Grant Impact: 400 Families Supported"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={composeAudience}
                    onChange={(e) => setComposeAudience(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  >
                    <option value="ALL_CONSENTED">All Consented Donors ({newsletterData?.stats?.totalSubscribers || 0})</option>
                    <option value="MAJOR_DONORS">Major Donors (£500+)</option>
                    <option value="REGULAR_DONORS">Monthly Regular Donors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Dispatch Channel</label>
                  <select
                    value={composeChannel}
                    onChange={(e) => setComposeChannel(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  >
                    <option value="EMAIL">Email Newsletter (Standard)</option>
                    <option value="SMS">SMS Emergency Broadcast</option>
                    <option value="MULTICHANNEL">Multichannel (Email & SMS)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Newsletter Message Content *</label>
                <textarea
                  rows={5}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Dear Supporters, on behalf of The Zinthiya Trust we want to share the immense impact your donations have delivered this month..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-magenta/20 focus:border-magenta"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowComposeNewsletterModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={dispatchingNewsletter}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%)" }}
                >
                  {dispatchingNewsletter ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Megaphone size={13} />
                      <span>Send Broadcast Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW STAFF MEMBER                                              */}
      {/* ========================================================================= */}
      {showAddStaffModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex justify-center items-start"
          onClick={() => setShowAddStaffModal(false)}
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAddStaffModal(false)}
              type="button"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
              title="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100" style={{ paddingRight: "44px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(230, 18, 126, 0.25)",
                  flexShrink: 0,
                }}
              >
                <UserPlus size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.3px" }}>
                  Add New Staff Member
                </h2>
                <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>
                  Create an officer account and assign caseworker/advocate eligibility for beneficiaries.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateStaffSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Tariq Mansoor"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Staff Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tariq.mansoor@zinthiyatrust.org"
                    value={newStaffEmail}
                    onChange={(e) => setNewStaffEmail(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Staff Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 07700 900333"
                    value={newStaffPhone}
                    onChange={(e) => setNewStaffPhone(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Platform Staff Role *
                  </label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewStaffRole(val);
                      if (val === "CASEWORKER") {
                        setNewStaffJobTitle("Crisis Caseworker");
                        setNewStaffDept("Crisis & Domestic Abuse Support");
                      } else if (val === "ADVOCATE") {
                        setNewStaffJobTitle("Dedicated Crisis Advocate");
                        setNewStaffDept("Crisis & Domestic Abuse Support");
                      } else if (val === "FINANCE_OFFICER") {
                        setNewStaffJobTitle("Finance & Grants Officer");
                        setNewStaffDept("Finance & Compliance");
                      } else if (val === "CAMPAIGN_COORDINATOR") {
                        setNewStaffJobTitle("Outreach & Campaigns Coordinator");
                        setNewStaffDept("Community Outreach & Food Relief");
                      } else if (val === "MANAGER") {
                        setNewStaffJobTitle("Operations & Service Manager");
                        setNewStaffDept("Welfare & Energy Alleviation");
                      } else if (val === "SUPER_ADMIN") {
                        setNewStaffJobTitle("Executive Officer & Trust Admin");
                        setNewStaffDept("Executive Operations");
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="CASEWORKER">Caseworker (Frontline Casework &amp; Client Support)</option>
                    <option value="ADVOCATE">Advocate (Dedicated Crisis &amp; Legal Advocate)</option>
                    <option value="MANAGER">Operations Manager (Department Oversight)</option>
                    <option value="SUPER_ADMIN">Executive Administrator (Full System Authority)</option>
                    <option value="FINANCE_OFFICER">Finance Officer (Grants &amp; Bank Ledgers)</option>
                    <option value="CAMPAIGN_COORDINATOR">Campaign Coordinator (Outreach &amp; Appeals)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Department & Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Department *
                  </label>
                  <select
                    value={newStaffDept}
                    onChange={(e) => setNewStaffDept(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Crisis & Domestic Abuse Support">Crisis &amp; Domestic Abuse Support</option>
                    <option value="Welfare & Energy Alleviation">Welfare &amp; Energy Alleviation</option>
                    <option value="Refuge & Housing Support">Refuge &amp; Housing Support</option>
                    <option value="Community Outreach & Food Relief">Community Outreach &amp; Food Relief</option>
                    <option value="Finance & Compliance">Finance &amp; Compliance</option>
                    <option value="Executive Operations">Executive Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Job Title / Casework Specialism *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Welfare & Energy Caseworker"
                    value={newStaffJobTitle}
                    onChange={(e) => setNewStaffJobTitle(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Advocate Assignment Callout Box */}
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "16px",
                  backgroundColor: "#FFF5F9",
                  border: "1.5px solid #FBCFE8",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "#FCE7F3",
                    color: "#E6127E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <HeartHandshake size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#9D174D" }}>
                      Beneficiary Advocate Assignment Eligibility
                    </span>
                    <span
                      style={{
                        padding: "2px 10px",
                        borderRadius: "20px",
                        backgroundColor: "#E6127E",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Eligible Advocate
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#831843", margin: "4px 0 0 0", lineHeight: 1.5 }}>
                    Once created, <strong>{newStaffName.trim() || "this staff member"}</strong> will be dynamically selectable across all Beneficiary Advocate assignment dropdowns (including New Beneficiary Registration Step 4, Change Advocate modal, and Relief Disbursement ledgers).
                  </p>
                </div>
              </div>

              {/* Initial Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Initial Account Password *
                </label>
                <div className="relative">
                  <input
                    type={showAddStaffPassword ? "text" : "password"}
                    required
                    value={newStaffPassword}
                    onChange={(e) => setNewStaffPassword(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 44px 0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAddStaffPassword(!showAddStaffPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94A3B8",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={showAddStaffPassword ? "Hide password" : "Show password"}
                  >
                    {showAddStaffPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <span className="block text-[11px] text-slate-400 mt-1">
                  Default: <code className="font-semibold text-slate-600">StaffZinthiya2026!</code> (Staff can change this anytime upon login).
                </span>
              </div>

              {/* System Permissions Grid */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Assigned Platform Permissions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  {[
                    { key: "beneficiaries:read", label: "View Beneficiaries & Case Notes" },
                    { key: "beneficiaries:write", label: "Create & Assign Beneficiaries" },
                    { key: "allocations:read", label: "View Grant Allocations & Targets" },
                    { key: "allocations:write", label: "Disburse Vouchers & Emergency Relief" },
                    { key: "reports:view", label: "Access Analytics & Impact Reports" },
                    { key: "campaigns:manage", label: "Manage Appeals & Public Campaigns" },
                  ].map((perm) => {
                    const isChecked = newStaffPermissions.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewStaffPermissions([...newStaffPermissions, perm.key]);
                            } else {
                              setNewStaffPermissions(newStaffPermissions.filter((p) => p !== perm.key));
                            }
                          }}
                          className="w-4 h-4 text-magenta rounded focus:ring-magenta cursor-pointer"
                        />
                        <span className={isChecked ? "font-bold text-slate-900" : "text-slate-600"}>
                          {perm.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div
                style={{
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  borderTop: "1px solid #F1F5F9",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingAddStaff}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingAddStaff ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingAddStaff ? 0.6 : 1,
                  }}
                >
                  {submittingAddStaff ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Creating Staff Officer...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} />
                      <span>Create Staff &amp; Advocate Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT STAFF MEMBER                                                  */}
      {/* ========================================================================= */}
      {editingStaff && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex justify-center items-start"
          onClick={() => setEditingStaff(null)}
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-pink-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setEditingStaff(null)}
              type="button"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
              title="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100" style={{ paddingRight: "44px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  backgroundColor: "#FCE7F3",
                  color: "#E6127E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(230, 18, 126, 0.15)",
                  flexShrink: 0,
                }}
              >
                <Edit size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                  Edit Staff Details
                </h2>
                <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>
                  Update officer role, department, advocate assignment, and permissions for {editingStaff.fullName}.
                </p>
              </div>
            </div>

            <form onSubmit={handleEditStaffSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editStaffName}
                    onChange={(e) => setEditStaffName(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editStaffPhone}
                    onChange={(e) => setEditStaffPhone(e.target.value)}
                    placeholder="e.g. 07700 900333"
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Staff Role *
                  </label>
                  <select
                    value={editStaffRole}
                    onChange={(e) => setEditStaffRole(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="CASEWORKER">Caseworker (Frontline Casework &amp; Client Support)</option>
                    <option value="ADVOCATE">Advocate (Dedicated Crisis &amp; Legal Advocate)</option>
                    <option value="MANAGER">Operations Manager (Department Oversight)</option>
                    <option value="SUPER_ADMIN">Executive Administrator (Full System Authority)</option>
                    <option value="FINANCE_OFFICER">Finance Officer (Grants &amp; Bank Ledgers)</option>
                    <option value="CAMPAIGN_COORDINATOR">Campaign Coordinator (Outreach &amp; Appeals)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={editStaffDept}
                    onChange={(e) => setEditStaffDept(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      minHeight: "44px",
                      padding: "0 14px",
                      fontSize: "13px",
                      color: "#0F172A",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Job Title / Advocate Specialism *
                </label>
                <input
                  type="text"
                  required
                  value={editStaffJobTitle}
                  onChange={(e) => setEditStaffJobTitle(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    minHeight: "44px",
                    padding: "0 14px",
                    fontSize: "13px",
                    color: "#0F172A",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Status Toggle Card */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  backgroundColor: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Account Status</span>
                  <span className="text-[11px] text-slate-500">
                    {editStaffActive
                      ? "Staff member is active and available for beneficiary advocate assignments."
                      : "Account is deactivated and cannot log in or be assigned cases."}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditStaffActive(!editStaffActive)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    editStaffActive
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {editStaffActive ? "ACTIVE" : "INACTIVE"}
                </button>
              </div>

              {/* Permissions Checklist */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Platform Capabilities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  {[
                    { key: "beneficiaries:read", label: "View Beneficiaries & Documents" },
                    { key: "beneficiaries:write", label: "Create & Assign Beneficiaries" },
                    { key: "allocations:read", label: "View Grant Allocations" },
                    { key: "allocations:write", label: "Disburse Vouchers & Grants" },
                    { key: "reports:view", label: "View Charity Reports" },
                    { key: "campaigns:manage", label: "Fundraising Appeals" },
                  ].map((perm) => {
                    const isChecked = editStaffPermissions.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditStaffPermissions([...editStaffPermissions, perm.key]);
                            } else {
                              setEditStaffPermissions(editStaffPermissions.filter((p) => p !== perm.key));
                            }
                          }}
                          className="w-4 h-4 text-magenta rounded focus:ring-magenta cursor-pointer"
                        />
                        <span className={isChecked ? "font-bold text-slate-900" : "text-slate-600"}>
                          {perm.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div
                style={{
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  borderTop: "1px solid #F1F5F9",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingEditStaff}
                  style={{
                    height: "42px",
                    minHeight: "42px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    backgroundColor: "#E6127E",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13px",
                    border: "none",
                    cursor: submittingEditStaff ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(230, 18, 126, 0.3)",
                    opacity: submittingEditStaff ? 0.6 : 1,
                  }}
                >
                  {submittingEditStaff ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check size={15} />
                      <span>Update Staff Member</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETE STAFF CONFIRMATION                                          */}
      {/* ========================================================================= */}
      {deletingStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDeletingStaff(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "24px",
              backgroundColor: "#FFFFFF",
              padding: "32px 28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1.5px solid #F1F5F9",
              position: "relative",
              textAlign: "center",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                backgroundColor: "#FEE2E2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                boxShadow: "0 6px 14px rgba(220, 38, 38, 0.15)",
              }}
            >
              <Trash2 size={26} />
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Remove Staff Member?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove <strong>{deletingStaff.fullName}</strong> ({deletingStaff.email}) from active staff records? Their access credentials will be revoked.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingStaff(null)}
                style={{
                  height: "42px",
                  padding: "0 18px",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStaffConfirm}
                style={{
                  height: "42px",
                  padding: "0 18px",
                  borderRadius: "12px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  flex: 1,
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
                }}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOGOUT CONFIRMATION                                                */}
      {/* ========================================================================= */}
      {showLogoutConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowLogoutConfirmModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "24px",
              backgroundColor: "#FFFFFF",
              padding: "32px 28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1.5px solid #F1F5F9",
              position: "relative",
              textAlign: "center",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLogoutConfirmModal(false)}
              type="button"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                color: "#64748B",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Close modal"
            >
              <X size={16} />
            </button>

            {/* Logout Icon Badge */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                backgroundColor: "#FFE4E6",
                border: "1px solid #FECDD3",
                color: "#E11D48",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px auto",
                boxShadow: "0 8px 16px rgba(225, 29, 72, 0.15)",
              }}
            >
              <LogOut size={28} style={{ marginLeft: "2px" }} />
            </div>

            <h3 style={{ fontSize: "19px", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0", letterSpacing: "-0.3px" }}>
              Sign Out of Admin Portal?
            </h3>
            <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              Are you sure you want to end your current session? You will be safely signed out of The Zinthiya Trust administrative system.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", width: "100%" }}>
              <button
                type="button"
                onClick={() => setShowLogoutConfirmModal(false)}
                style={{
                  flex: 1,
                  height: "46px",
                  minHeight: "46px",
                  padding: "0 16px",
                  borderRadius: "12px",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                Keep Working
              </button>
              <button
                type="button"
                onClick={confirmSignOut}
                style={{
                  flex: 1,
                  height: "46px",
                  minHeight: "46px",
                  padding: "0 16px",
                  borderRadius: "12px",
                  backgroundColor: "#E11D48",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(225, 29, 72, 0.35)",
                  boxSizing: "border-box",
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboardPage;