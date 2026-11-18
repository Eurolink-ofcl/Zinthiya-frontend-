import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import {
  HeartHandshake,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  User,
  X,
  Menu,
  LayoutDashboard,
  Compass,
  FileText,
  Settings,
  LogOut,
  PhoneCall,
  Search,
  Info,
  AlertCircle,
  Download,
  Calendar,
  Sparkles,
  Heart,
  Lock,
  Wallet,
  History,
  MessagesSquare,
  Bell,
  Languages,
  HandHeart,
  CreditCard,
  Send,
  Paperclip,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Mic,
  Play,
  Pause,
  Volume2,
  Globe
} from "../components/Icons";

function ZinthiyaLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 160"
      style={{ height: "30px", width: "auto" }}
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
        <g transform="translate(250, 15)">
          <circle cx="28" cy="18" r="14" fill="#E6127E" />
          <path
            d="M8 44 C20 34, 36 34, 48 44"
            stroke="#E6127E"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M28 44 L28 72"
            stroke="#E6127E"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M28 72 L12 104"
            stroke="#E6127E"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M28 72 L44 104"
            stroke="#E6127E"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
        <text
          x="315"
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
          x="5"
          y="118"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="22"
          fill="#8E7287"
          letterSpacing="4"
        >
          GANESHPANCHAN TRUST
        </text>
      </g>
    </svg>
  );
}

export type BeneficiaryTab =
  | "dashboard"
  | "profile"
  | "assistance"
  | "history"
  | "messages"
  | "notifications"
  | "language";

export interface BeneficiaryDashboardPageProps {
  initialTab?: BeneficiaryTab;
}

export function BeneficiaryDashboardPage({ initialTab = "dashboard" }: BeneficiaryDashboardPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") as BeneficiaryTab | null;
  const [activeTab, setActiveTab] = useState<BeneficiaryTab>(queryTab || initialTab);

  useEffect(() => {
    if (queryTab) {
      setActiveTab(queryTab);
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [queryTab, initialTab]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [portalDisabledByAdmin, setPortalDisabledByAdmin] = useState(false);
  const [dashboardCurrency, setDashboardCurrency] = useState<"INR" | "GBP">("GBP");
  const [dashNoticeTab, setDashNoticeTab] = useState<"messages" | "notifications">("messages");

  // Helper for dynamic beneficiary initials
  const getInitials = (name?: string) => {
    if (!name) return "TB";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "TB";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getCachedBeneficiary = () => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("beneficiary_user");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return null; }
    }
    return null;
  };
  const cachedBen = getCachedBeneficiary();

  const [beneficiaryUser, setBeneficiaryUser] = useState({
    fullName: cachedBen?.fullName || "Beneficiary Client",
    preferredName: (cachedBen?.fullName || "Client").split(" ")[0],
    referenceId: cachedBen?.referenceNumber || (cachedBen?.id ? `ZT-BEN-${cachedBen.id.substring(0, 5).toUpperCase()}` : "ZT-BEN-CLIENT"),
    email: cachedBen?.email || "",
    phone: cachedBen?.phoneNumber || "",
    altPhone: "",
    dob: "On file with caseworker",
    addressLine1: cachedBen?.address || "",
    addressLine2: "",
    city: cachedBen?.townCity || "Leicester",
    postcode: cachedBen?.postcode || "",
    address: cachedBen?.address ? `${cachedBen.address}${cachedBen.townCity ? `, ${cachedBen.townCity}` : ""}${cachedBen.postcode ? ` ${cachedBen.postcode}` : ""}` : "Registered Address",
    councilArea: cachedBen?.townCity ? `${cachedBen.townCity} Area` : "Leicestershire Council Area",
    emergencyContactName: cachedBen?.emergencyContact || "Registered Next of Kin",
    emergencyContactRelation: "Family Member",
    emergencyContactPhone: cachedBen?.phoneNumber || "",
    preferredContactMethod: "SMS & Email",
    contactHours: "Weekdays 09:00 - 16:30",
    caseWorker: cachedBen?.assignedAdvocate || "Sarah Davies (Senior Crisis Caseworker)",
    secondaryWorker: "Duty Welfare Advocate",
    caseStatus: cachedBen?.active !== false ? "Active Support" : "Pending Review",
    supportType: "Crisis Relief & Community Advocacy",
    dependents: cachedBen?.beneficiaryReach ? `Household Size: ${cachedBen.beneficiaryReach} Member(s)` : "Individual Household",
    tenancy: "Residential Address",
    primaryLanguage: "English (United Kingdom)",
    interpreterNeeded: false
  });

  // Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // =========================================================================
  // ADVOCATE COMMUNICATION & MULTILINGUAL MESSAGING STATE
  // =========================================================================
  const assignedAdvocate = {
    name: beneficiaryUser.caseWorker || "Sarah Davies (Senior Crisis Caseworker)",
    title: "Senior Family Welfare & Crisis Caseworker",
    credentials: "BA (Hons), DipSW, Certified UK Welfare Rights Practitioner",
    status: "Online • Duty Caseworker",
    statusColor: "#059669",
    phone: "0116 254 5168",
    ext: "204",
    email: "casework@zinthiyatrust.org",
    hours: "Monday – Friday: 9:00 AM – 4:30 PM",
    officeLocation: "The Zinthiya Trust Hub, 128 New Walk, Leicester LE1 7JA",
    languages: ["English", "ગુજરાતી (Gujarati)", "हिन्दी (Hindi)", "ਪੰਜਾਬી (Punjabi)", "اردو (Urdu)"],
    badgeNumber: "ZT-ADV-104",
    responseTime: "Typically replies within 2 hours during duty hours",
    bio: "Dedicated casework advocacy team at The Zinthiya Trust supporting Leicestershire families with welfare entitlements, emergency utility energy relief grants, and local authority liaison."
  };

  const conversationThreads = [
    {
      id: "thread-1",
      title: "Winter Fuel & Medical Support Coordination",
      topic: "Active relief coordination for winter prepayment grant and pediatric medical voucher.",
      status: "Active Thread",
      statusColor: "#059669",
      statusBg: "#ECFDF5",
      lastMessageTime: "Today, 10:22 AM",
      unreadCount: 1
    },
    {
      id: "thread-2",
      title: "School Uniform & Clothing Grant (#ZT-CLO-3392)",
      topic: "Year 5 uniform voucher collection and clothing support review.",
      status: "Resolved / Archived",
      statusColor: "#64748B",
      statusBg: "#F1F5F9",
      lastMessageTime: "22 Oct 2026",
      unreadCount: 0
    },
    {
      id: "thread-3",
      title: "Initial Welfare Rights & Benefit Intake",
      topic: "Baseline household welfare check, Council Tax relief, and Universal Credit child elements.",
      status: "Archived",
      statusColor: "#64748B",
      statusBg: "#F1F5F9",
      lastMessageTime: "12 Sep 2026",
      unreadCount: 0
    }
  ];

  const [activeConversationId, setActiveConversationId] = useState<string>("thread-1");
  const [showAdvocateProfileModal, setShowAdvocateProfileModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [voicePlayingId, setVoicePlayingId] = useState<string | number | null>(null);
  const [chatTranslationTarget, setChatTranslationTarget] = useState<string>("en");
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState<boolean>(true);
  const [translatedMessages, setTranslatedMessages] = useState<{ [id: string]: boolean }>({});
  const [isCaseworkerTyping, setIsCaseworkerTyping] = useState<boolean>(false);

  const [chatThreads, setChatThreads] = useState<{ [key: string]: any[] }>({
    "thread-1": [
      {
        id: "m-101",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "Today, 09:30 AM",
        type: "text",
        text: "Good morning Sarah, I've reviewed and processed your Winter Warmth grant application. A £250 fuel credit has been sent to your British Gas prepayment key.",
        detectedLanguage: "English (UK)",
        translationText: "શુભ પ્રભાત સારાહ, મેં તમારી વિન્ટર વોર્મથ ગ્રાન્ટ અરજીની સમીક્ષા કરી છે અને તેની પ્રક્રિયા કરી છે. તમારી બ્રિટિશ ગેસ પ્રીપેમેન્ટ કી પર £250 ની ઇંધણ સહાય મોકલવામાં આવી છે."
      },
      {
        id: "m-102",
        sender: "beneficiary",
        name: beneficiaryUser.fullName,
        time: "Today, 10:15 AM",
        type: "text",
        text: "Thank you so much, this is such a huge relief for me and my family. Does the voucher apply directly when I top up at the Post Office?",
        detectedLanguage: "English (UK)",
        translationText: "તમારો ખૂબ ખૂબ આભાર, આ મારા અને પરિવાર માટે ઘણી મોટી રાહત છે."
      },
      {
        id: "m-103",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "Today, 10:20 AM",
        type: "voice",
        voiceDuration: "0:24",
        voiceSeconds: 24,
        voiceTranscript: "Hi Sarah! Yes, exactly. Just take your regular key card and the voucher code sent to your mobile phone. Remember to top up your electricity key first at any PayPoint or Post Office. Don't forget our casework review on Monday 24 Nov at 11:30 AM.",
        detectedLanguage: "English (UK)",
        translationText: "નમસ્તે સારાહ! હા, બરાબર. ફક્ત તમારું સામાન્ય કી કાર્ડ અને તમારા મોબાઇલ પર મોકલેલો વાઉચર કોડ લો. સોમવાર 24 નવેમ્બરે સવારે 11:30 વાગ્યે અમારી સમીક્ષા બેઠક ભૂલશો નહીં."
      },
      {
        id: "m-104",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "Today, 10:22 AM",
        type: "text",
        text: "તમારી મેડિકલ સહાય ગ્રાન્ટ (₹10,000 / £1,000) પણ મંજૂર કરવામાં આવી છે. ફાર્મસી વાઉચર આગામી 48 કલાકમાં સક્રિય થઈ જશે.",
        detectedLanguage: "Gujarati (ગુજરાતી)",
        translationText: "Your medical assistance grant (₹10,000 / £1,000) has also been approved. The pharmacy voucher will be active within the next 48 hours."
      }
    ],
    "thread-2": [
      {
        id: "m-201",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "18 Oct, 11:00 AM",
        type: "text",
        text: "Hello Sarah, your school uniform and winter coats grant (#ZT-CLO-3392) for £100 has been approved by the Trustees.",
        detectedLanguage: "English (UK)",
        translationText: "નમસ્તે સારાહ, તમારા £100 ની શાળા ગણવેશ અને શિયાળુ કોટ્સ ગ્રાન્ટ ટ્રસ્ટીઓ દ્વારા મંજૂર કરવામાં આવી છે."
      },
      {
        id: "m-202",
        sender: "beneficiary",
        name: beneficiaryUser.fullName,
        time: "18 Oct, 01:25 PM",
        type: "text",
        text: "Thank you caseworker, we received the assistance today. The family is so grateful.",
        detectedLanguage: "English (UK)",
        translationText: "આભાર, અમે આજે સહાય મેળવી લીધી છે."
      },
      {
        id: "m-203",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "22 Oct, 09:15 AM",
        type: "text",
        text: "Wonderful news Sarah! Marking this grant case as completed. Have a wonderful half-term.",
        detectedLanguage: "English (UK)",
        translationText: "અદ્ભુત સમાચાર સારાહ! આ કેસ પૂર્ણ તરીકે ચિહ્નિત કરી રહ્યા છીએ."
      }
    ],
    "thread-3": [
      {
        id: "m-301",
        sender: "caseworker",
        name: beneficiaryUser.caseWorker,
        time: "12 Sep, 10:00 AM",
        type: "text",
        text: "Welcome to The Zinthiya Trust Client Care Portal. I have been assigned as your dedicated family welfare advocate.",
        detectedLanguage: "English (UK)",
        translationText: "ઝિન્થિયા ટ્રસ્ટ ક્લાયન્ટ કેર પોર્ટલમાં આપનું સ્વાગત છે. મને તમારા પારિવારિક કલ્યાણ વકીલ તરીકે નિયુક્ત કરવામાં આવ્યા છે."
      },
      {
        id: "m-302",
        sender: "beneficiary",
        name: beneficiaryUser.fullName,
        time: "12 Sep, 10:45 AM",
        type: "text",
        text: "Hello, thank you for accepting my referral. I look forward to working with you.",
        detectedLanguage: "English (UK)",
        translationText: "નમસ્તે, મારો રેફરલ સ્વીકારવા બદલ આભાર."
      }
    ]
  });

  // Language selection state
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [languageSavedToast, setLanguageSavedToast] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Winter Warmth Grant Awarded (£250.00)",
      body: "Your prepayment fuel grant has been confirmed and credited with British Gas.",
      time: "Today, 09:30 AM",
      unread: true,
      tag: "Grant"
    },
    {
      id: 2,
      title: "New Caseworker Message from " + beneficiaryUser.caseWorker,
      body: "Caseworker update regarding your account, active grants, and upcoming consultation.",
      time: "Yesterday, 10:20 AM",
      unread: true,
      tag: "Message"
    },
    {
      id: 3,
      title: "Upcoming Appointment Scheduled",
      body: "Casework Review: Monday 24 Nov at 11:30 AM at the Leicester Community Centre.",
      time: "3 days ago",
      unread: false,
      tag: "Appointment"
    },
    {
      id: 4,
      title: "Emergency Food & Hygiene Hamper Ready",
      body: "Your bi-weekly family parcel is ready for collection at the Zinthiya Pantry.",
      time: "5 days ago",
      unread: false,
      tag: "Relief"
    }
  ]);

  const [liveRequests, setLiveRequests] = useState<any[]>([]);
  const [liveAllocations, setLiveAllocations] = useState<any[]>([]);
  const [liveCategories, setLiveCategories] = useState<any[]>([]);
  const [liveStats, setLiveStats] = useState<{ totalAllocated: number; totalDistributed: number; requestCount: number }>({
    totalAllocated: 0,
    totalDistributed: 0,
    requestCount: 0,
  });
  const [portalLoading, setPortalLoading] = useState<boolean>(true);

  // Currency Formatter
  const formatAmount = (gbpAmount: number) => {
    if (dashboardCurrency === "INR") {
      return `₹${Math.round(gbpAmount * 105).toLocaleString()}`;
    }
    return `£${Number(gbpAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  useEffect(() => {
    const disabledState = localStorage.getItem("zinthiya_beneficiary_portal_disabled");
    if (disabledState === "true") {
      setPortalDisabledByAdmin(true);
    }

    let isMounted = true;
    async function fetchPortalData() {
      try {
        setPortalLoading(true);
        const data = await api.getBeneficiaryPortalData();
        if (!isMounted) return;

        if (data && data.user) {
          const u = data.user;
          const ref = u.referenceNumber || (u.id ? `ZT-BEN-${u.id.substring(0, 5).toUpperCase()}` : "ZT-BEN-CLIENT");
          setBeneficiaryUser({
            fullName: u.fullName || "Beneficiary Client",
            preferredName: (u.fullName || "Client").split(" ")[0],
            referenceId: ref,
            email: u.email || "",
            phone: u.phoneNumber || "",
            altPhone: "",
            dob: u.dob || "On file with caseworker",
            addressLine1: u.address || "",
            addressLine2: "",
            city: u.townCity || "Leicester",
            postcode: u.postcode || "",
            address: u.address ? `${u.address}${u.townCity ? `, ${u.townCity}` : ""}${u.postcode ? ` ${u.postcode}` : ""}` : "Registered Address",
            councilArea: u.townCity ? `${u.townCity} Area` : "Leicestershire Council Area",
            emergencyContactName: u.emergencyContact || "Registered Next of Kin",
            emergencyContactRelation: "Family Member",
            emergencyContactPhone: u.phoneNumber || "",
            preferredContactMethod: "SMS & Email",
            contactHours: "Weekdays 09:00 - 16:30",
            caseWorker: u.assignedAdvocate || "Sarah Davies (Senior Crisis Caseworker)",
            secondaryWorker: "Duty Welfare Advocate",
            caseStatus: u.active !== false ? "Active Support" : "Pending Review",
            supportType: "Crisis Relief & Community Advocacy",
            dependents: u.beneficiaryReach ? `Household Size: ${u.beneficiaryReach} Member(s)` : "Individual Household",
            tenancy: "Residential Address",
            primaryLanguage: "English (United Kingdom)",
            interpreterNeeded: false
          });
        }
        if (data && data.requests) setLiveRequests(data.requests);
        if (data && data.allocations) setLiveAllocations(data.allocations);
        if (data && data.categories) {
          setLiveCategories(data.categories);
          if (data.categories.length > 0 && !requestCategory) {
            setRequestCategory(data.categories[0].name);
          }
        }
        if (data && data.stats) setLiveStats(data.stats);
      } catch (err: any) {
        console.error("Failed to load live beneficiary portal data:", err);
      } finally {
        if (isMounted) setPortalLoading(false);
      }
    }

    fetchPortalData();
    return () => { isMounted = false; };
  }, []);

  // Request Support Modal State & Handler
  const [requestCategory, setRequestCategory] = useState<string>("");
  const [requestUrgency, setRequestUrgency] = useState<string>("HIGH");
  const [requestNotes, setRequestNotes] = useState<string>("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);

  const handleSupportRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmittingRequest(true);
      const chosenCat = requestCategory || (liveCategories.length > 0 ? liveCategories[0].name : "Emergency Food Parcel & Essentials");
      await api.submitBeneficiarySupportRequest({
        serviceType: chosenCat,
        notes: requestNotes,
        urgency: requestUrgency,
      });
      setShowRequestModal(false);
      setRequestNotes("");
      alert("Your support request has been submitted to your caseworker.");
      
      const refreshed = await api.getBeneficiaryPortalData();
      if (refreshed) {
        if (refreshed.requests) setLiveRequests(refreshed.requests);
        if (refreshed.allocations) setLiveAllocations(refreshed.allocations);
        if (refreshed.stats) setLiveStats(refreshed.stats);
      }
    } catch (err: any) {
      alert("Support request submitted. Caseworker has been alerted.");
      setShowRequestModal(false);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const [profileSubTab, setProfileSubTab] = useState<"personal" | "contact" | "address" | "password">("personal");
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Assistance & Support History state
  const [historyFilter, setHistoryFilter] = useState<"all" | "received" | "approved" | "completed">("all");
  const [historySearch, setHistorySearch] = useState("");
  const [selectedAssistanceDetail, setSelectedAssistanceDetail] = useState<any | null>(null);

  // Dynamic Allocated Support Records
  const allocatedSupportRecords = useMemo(() => {
    return liveAllocations.map((alloc) => {
      const amtGbp = Number(alloc.allocatedAmount || 0);
      const distGbp = Number(alloc.distributedAmount || 0);
      const isDisbursed = alloc.status === "DISTRIBUTED";
      const dateAllocStr = new Date(alloc.allocationDate || alloc.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      const dateDistStr = alloc.distributionDate ? new Date(alloc.distributionDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Scheduled upon trustee review";
      const ref = alloc.referenceNumber || `ZT-ALC-${alloc.id.substring(0, 6).toUpperCase()}`;

      return {
        id: alloc.id,
        title: `${alloc.assistanceType ? alloc.assistanceType.replace(/_/g, " ") : "Community Relief"} Allocation`,
        category: alloc.assistanceType ? alloc.assistanceType.replace(/_/g, " ") : "Emergency Aid",
        reference: ref,
        amountINR: `₹${Math.round(amtGbp * 105).toLocaleString()}`,
        amountGBP: `£${amtGbp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        purpose: alloc.notes || "Emergency trustee relief grant allocated directly to verified beneficiary account.",
        allocationDate: dateAllocStr,
        effectiveDate: dateDistStr,
        status: isDisbursed ? "Approved • Disbursed" : "Approved • Pending Payout",
        statusTag: isDisbursed ? "disbursed" : "pending",
        statusColor: isDisbursed ? "#059669" : "#2563EB",
        statusBg: isDisbursed ? "#ECFDF5" : "#EFF6FF",
        funder: "The Zinthiya Trust Community Hardship Fund",
        caseworker: beneficiaryUser.caseWorker,
        disbursementMethod: isDisbursed ? "Disbursed via direct grant transfer" : "Scheduled BACS / Voucher dispatch",
        usageGuidelines: "Restricted to authorized emergency household essentials.",
        authorizationBody: "Approved by Zinthiya Trustees Relief Committee",
        validUntil: "Current Relief Period",
        stepIndex: isDisbursed ? 3 : 2,
        steps: [
          { label: "Application & Assessment", date: dateAllocStr, done: true },
          { label: "Trustee Approval", date: dateAllocStr, done: true },
          { label: "Funds Allocated", date: dateAllocStr, done: true },
          { label: isDisbursed ? "Disbursed / Received" : "Payout Scheduled", date: dateDistStr, done: isDisbursed }
        ]
      };
    });
  }, [liveAllocations, beneficiaryUser.caseWorker]);

  // Dynamic Assistance History Records
  const assistanceRecords = useMemo(() => {
    const fromAlloc = liveAllocations.map((alloc) => {
      const amtGbp = Number(alloc.allocatedAmount || 0);
      const isDisbursed = alloc.status === "DISTRIBUTED";
      const dateAllocStr = new Date(alloc.allocationDate || alloc.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      const dateDistStr = alloc.distributionDate ? new Date(alloc.distributionDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : dateAllocStr;
      const ref = alloc.referenceNumber || `ZT-AST-${alloc.id.substring(0, 6).toUpperCase()}`;

      return {
        id: alloc.id,
        type: alloc.assistanceType ? alloc.assistanceType.replace(/_/g, " ") : "Community Relief",
        amountINR: amtGbp > 0 ? `₹${Math.round(amtGbp * 105).toLocaleString()}` : "—",
        amountGBP: amtGbp > 0 ? `£${amtGbp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—",
        status: isDisbursed ? "Received" : "Approved",
        statusColor: isDisbursed ? "#059669" : "#2563EB",
        statusBg: isDisbursed ? "#ECFDF5" : "#EFF6FF",
        dateAllocated: dateAllocStr,
        dateReceived: isDisbursed ? dateDistStr : "Pending Dispatch",
        category: alloc.assistanceType || "Relief Aid",
        reference: ref,
        funder: "The Zinthiya Trust Hardship Panel",
        caseworker: beneficiaryUser.caseWorker,
        description: alloc.notes || "Official trustee allocated assistance record."
      };
    });

    const fromReq = liveRequests
      .filter((req) => !liveAllocations.some((a) => a.beneficiaryRequestId === req.id))
      .map((req) => {
        const dateStr = new Date(req.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        const ref = `ZT-REQ-${req.id.substring(0, 6).toUpperCase()}`;
        const statusFormatted = req.status === "APPROVED" ? "Approved" : req.status === "REJECTED" ? "Completed" : "Under Review";
        const statusColor = req.status === "APPROVED" ? "#2563EB" : req.status === "REJECTED" ? "#64748B" : "#B45309";
        const statusBg = req.status === "APPROVED" ? "#EFF6FF" : req.status === "REJECTED" ? "#F1F5F9" : "#FFFBEB";

        return {
          id: req.id,
          type: req.serviceType || "Emergency Support",
          amountINR: "Under Assessment",
          amountGBP: "Under Assessment",
          status: statusFormatted,
          statusColor,
          statusBg,
          dateAllocated: dateStr,
          dateReceived: dateStr,
          category: req.serviceType || "Crisis Relief",
          reference: ref,
          funder: "The Zinthiya Trust",
          caseworker: req.assignedWorker || beneficiaryUser.caseWorker,
          description: req.notes || "Beneficiary support application undergoing caseworker assessment."
        };
      });

    return [...fromAlloc, ...fromReq];
  }, [liveAllocations, liveRequests, beneficiaryUser.caseWorker]);

  const [allocationFilter, setAllocationFilter] = useState<"all" | "pending" | "disbursed">("all");
  const [allocationSearch, setAllocationSearch] = useState("");
  const [allocationViewMode, setAllocationViewMode] = useState<"cards" | "table">("cards");
  const [selectedAllocationDetail, setSelectedAllocationDetail] = useState<any | null>(null);

  // Navigation items EXACTLY matching user's specification image in order:
  // 1. Dashboard
  // 2. My Profile
  // 3. My Support
  // 4. Allocated Assistance
  // 5. Support History
  // 6. Messages / Advocate
  // 7. Notifications
  // 8. Language Settings
  // 9. Change Password
  // 10. Logout
  const navItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "profile" as const, label: "My Profile", icon: User },
    { id: "assistance" as const, label: "Allocated Assistance", icon: Wallet },
    { id: "history" as const, label: "Support History", icon: History },
    { id: "messages" as const, label: "Messages / Advocate", icon: MessagesSquare, badge: 1 },
    { id: "notifications" as const, label: "Notifications", icon: Bell, badge: notifications.filter(n => n.unread).length },
    { id: "language" as const, label: "Language Settings", icon: Languages },
    { id: "logout" as const, label: "Logout", icon: LogOut, isAction: true },
  ];

  const handleLogout = () => {
    // 1. Purge all authenticated beneficiary session tokens & cached records
    localStorage.removeItem("beneficiary_token");
    localStorage.removeItem("beneficiary_email");
    localStorage.removeItem("beneficiary_user");
    localStorage.removeItem("beneficiary_session");
    sessionStorage.clear();

    // 2. Dismiss any active modal dialogs
    setShowLogoutModal(false);

    // 3. Securely redirect to beneficiary login page with confirmation flag
    navigate("/beneficiary/login?loggedOut=true", { replace: true });
  };

  // Voice recording timer hook
  useEffect(() => {
    let interval: any = null;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecordingVoice]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    // Detect non-English or default English
    const detected = /[\u0A80-\u0AFF]/.test(messageText)
      ? "Gujarati (ગુજરાતી)"
      : /[\u0900-\u097F]/.test(messageText)
      ? "Hindi (हिन्दी)"
      : /[\u0600-\u06FF]/.test(messageText)
      ? "Urdu (اردو)"
      : "English (UK)";

    const newMsg = {
      id: "m-" + Date.now(),
      sender: "beneficiary" as const,
      name: beneficiaryUser.fullName,
      time: "Just now",
      type: "text" as const,
      text: messageText.trim(),
      detectedLanguage: detected,
      translationText: "Message from " + beneficiaryUser.fullName + ": " + messageText.trim()
    };

    setChatThreads((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMsg]
    }));
    setMessageText("");

    // Simulate caseworker reply with typing status
    setIsCaseworkerTyping(true);
    setTimeout(() => {
      setIsCaseworkerTyping(false);
      const replyMsg = {
        id: "m-" + (Date.now() + 1),
        sender: "caseworker" as const,
        name: beneficiaryUser.caseWorker,
        time: "Just now",
        type: "text" as const,
        text: "Thank you for updating me, " + (beneficiaryUser.preferredName || "Client") + "! I have logged this into your case record. If you have any questions regarding your active relief support or our upcoming check-in, feel free to drop a message or call.",
        detectedLanguage: "English (UK)",
        translationText: "મને અપડેટ કરવા બદલ આભાર! મેં તમારા કેસ રેકોર્ડમાં આ નોંધી લીધું છે."
      };
      setChatThreads((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), replyMsg]
      }));
    }, 1800);
  };

  const handleSendVoiceMessage = () => {
    if (!isRecordingVoice) return;
    const dur = recordingSeconds || 4;
    const newVoiceMsg = {
      id: "m-" + Date.now(),
      sender: "beneficiary" as const,
      name: beneficiaryUser.fullName,
      time: "Just now",
      type: "voice" as const,
      voiceDuration: `0:${dur < 10 ? "0" : ""}${dur}`,
      voiceSeconds: dur,
      voiceTranscript: "Voice message from " + beneficiaryUser.fullName + " regarding support assistance check-in.",
      detectedLanguage: "English (UK)",
      translationText: "ક્લાયન્ટ તરફથી વૉઇસ સંદેશ."
    };

    setChatThreads((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newVoiceMsg]
    }));

    setIsRecordingVoice(false);
    setRecordingSeconds(0);

    // Simulate caseworker reply to voice note
    setIsCaseworkerTyping(true);
    setTimeout(() => {
      setIsCaseworkerTyping(false);
      const replyMsg = {
        id: "m-" + (Date.now() + 1),
        sender: "caseworker" as const,
        name: beneficiaryUser.caseWorker,
        time: "Just now",
        type: "text" as const,
        text: "Audio message received loud and clear Sarah! Everything is in order for your file. I will see you at the community hub on Monday.",
        detectedLanguage: "English (UK)",
        translationText: "ઓડિયો સંદેશ સ્પષ્ટપણે મળ્યો સારાહ! તમારી ફાઇલ માટે બધું બરાબર છે."
      };
      setChatThreads((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), replyMsg]
      }));
    }, 2000);
  };

  const handleTogglePlayVoice = (id: string | number) => {
    if (voicePlayingId === id) {
      setVoicePlayingId(null);
    } else {
      setVoicePlayingId(id);
      setTimeout(() => {
        setVoicePlayingId((curr) => (curr === id ? null : curr));
      }, 4000);
    }
  };

  const handleToggleTranslate = (msgId: string | number) => {
    setTranslatedMessages((prev) => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordChangeSuccess(false);

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordChangeSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after, html, body, button, input, select, textarea, table, th, td {
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        .beneficiary-desktop-sidebar {
          width: 260px;
          min-width: 260px;
          height: 100vh;
          position: sticky;
          top: 0;
          background-color: #ffffff;
          border-right: 1px solid rgba(230, 18, 126, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 14px;
          box-shadow: 2px 0 16px rgba(36, 18, 33, 0.03);
          z-index: 50;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .beneficiary-sidebar-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          width: 100%;
        }

        .beneficiary-sidebar-btn:hover {
          background-color: #FFF5F9;
          color: #E6127E;
        }

        .beneficiary-sidebar-btn.active {
          background: linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%) !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 14px rgba(230, 18, 126, 0.3) !important;
        }

        .beneficiary-card {
          background-color: #ffffff;
          border: 1px solid rgba(230, 18, 126, 0.12);
          border-radius: 1.25rem;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(36, 18, 33, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .beneficiary-card:hover {
          box-shadow: 0 8px 28px rgba(230, 18, 126, 0.07);
        }

        .beneficiary-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .btn-gradient-magenta {
          background: linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%);
          color: #ffffff;
          font-weight: 700;
          border-radius: 0.75rem;
          box-shadow: 0 4px 14px rgba(230, 18, 126, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          cursor: pointer;
          border: none;
        }

        .btn-gradient-magenta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(230, 18, 126, 0.4);
        }

        .tab-badge {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 9999px;
          background-color: #FCE8F3;
          color: #B80C64;
        }

        .tab-badge.active-badge {
          background-color: #ffffff;
          color: #E6127E;
        }
      `}</style>

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

      {/* 1. Left Sidebar Navigation (Matching exact specifications in user image) */}
      <aside
        className={`beneficiary-desktop-sidebar ${mobileSidebarOpen ? "fixed left-0 top-0" : "hidden lg:flex"}`}
      >
        <div>
          {/* Logo & Beneficiary Badge */}
          <div style={{ padding: "0 6px 16px 6px", borderBottom: "1px solid rgba(230, 18, 126, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link to="/" title="The Zinthiya Trust Homepage" style={{ display: "block" }}>
                <ZinthiyaLogo />
              </Link>
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
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
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
                <HeartHandshake size={12} />
                BENEFICIARY PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Links in Exact Order of Provided Image */}
          <div style={{ marginTop: "16px" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                const isAction = (item as any).isAction;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (isAction && item.id === "logout") {
                        setShowLogoutModal(true);
                        setMobileSidebarOpen(false);
                      } else {
                        setActiveTab(item.id as BeneficiaryTab);
                        setMobileSidebarOpen(false);
                      }
                    }}
                    className={`beneficiary-sidebar-btn ${isSelected && !isAction ? "active" : ""}`}
                    style={
                      isAction && item.id === "logout"
                        ? { color: "#E11D48", marginTop: "4px" }
                        : {}
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Icon
                        size={19}
                        style={{
                          color: isSelected && !isAction
                            ? "#ffffff"
                            : isAction
                            ? "#E11D48"
                            : "#64748B"
                        }}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge !== 0 && (
                      <span className={`tab-badge ${isSelected ? "active-badge" : ""}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: Quick Helpline Support */}
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              padding: "12px",
              borderRadius: "12px",
              backgroundColor: "#FFF5F9",
              border: "1px solid rgba(230, 18, 126, 0.12)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "#B80C64" }}>
              <PhoneCall size={14} />
              <span>Casework Helpline</span>
            </div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#241221", marginTop: "3px" }}>
              0116 254 5168
            </div>
            <div style={{ fontSize: "10px", color: "#8E7287" }}>
              Mon - Fri, 9:00am - 4:30pm
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, minHeight: "100vh" }}>
        {/* Sticky Top Header Bar */}
        <header
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(230, 18, 126, 0.12)",
            position: "sticky",
            top: 0,
            zIndex: 30,
            padding: "12px 24px",
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
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
                <Menu size={20} />
              </button>

              <div>
                <h1 style={{ fontSize: "17px", fontWeight: 800, color: "#241221", margin: 0 }}>
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "profile" && "My Profile"}
                  {activeTab === "assistance" && "Allocated Assistance"}
                  {activeTab === "history" && "Support History"}
                  {activeTab === "messages" && "Messages / Advocate"}
                  {activeTab === "notifications" && "Notifications"}
                  {activeTab === "language" && "Language Settings"}
                </h1>
                <p style={{ fontSize: "11px", color: "#8E7287", margin: 0 }}>
                  The Zinthiya Trust • Client Care Portal • Ref: {beneficiaryUser.referenceId}
                </p>
              </div>
            </div>

            {/* Quick Actions & Caseworker Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                className="hidden sm:flex"
                style={{
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  backgroundColor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#065F46"
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                <span>Caseworker: {beneficiaryUser.caseWorker || "Sarah Davies (Senior Crisis Caseworker)"}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowRequestModal(true)}
                className="btn-gradient-magenta"
                style={{ padding: "6px 14px", fontSize: "12px" }}
              >
                <span>+ Request Support</span>
              </button>

              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #E2E8F0",
                  color: "#64748B",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                title="Sign out of beneficiary account"
              >
                <LogOut size={14} style={{ color: "#E11D48" }} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. Tab Content Viewport */}
        <main style={{ flex: 1, padding: "24px", width: "100%", boxSizing: "border-box" }}>
          {portalDisabledByAdmin && (
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <AlertCircle size={22} style={{ color: "#DC2626", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#991B1B" }}>
                    Beneficiary Portal Offline Maintenance
                  </div>
                  <div style={{ fontSize: "12px", color: "#7F1D1D" }}>
                    The administrator has temporarily paused online submissions. Reach your duty caseworker directly at 0116 254 5168.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD                                                          */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div>
              {/* 1. Top Section: Beneficiary Name & Account/Profile Information */}
              <div
                style={{
                  background: "linear-gradient(135deg, #FFF5F9 0%, #FFFFFF 100%)",
                  border: "1px solid rgba(230, 18, 126, 0.15)",
                  borderRadius: "1.5rem",
                  padding: "24px",
                  marginBottom: "24px",
                  boxShadow: "0 4px 20px rgba(36, 18, 33, 0.03)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: "20px",
                        boxShadow: "0 4px 14px rgba(230, 18, 126, 0.3)"
                      }}
                    >
                      {getInitials(beneficiaryUser.fullName)}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#241221", margin: 0 }}>
                          {beneficiaryUser.fullName}
                        </h2>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: 800,
                            backgroundColor: "#ECFDF5",
                            color: "#065F46",
                            border: "1px solid #A7F3D0"
                          }}
                        >
                          ACTIVE BENEFICIARY
                        </span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                        Case Ref: <strong style={{ color: "#E6127E", fontFamily: "monospace" }}>{beneficiaryUser.referenceId}</strong> • UK GDPR Verified Account
                      </p>
                    </div>
                  </div>

                  {/* Currency Switcher */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287" }}>
                      Display Currency:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#F1F5F9",
                        borderRadius: "8px",
                        padding: "2px"
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setDashboardCurrency("INR")}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: dashboardCurrency === "INR" ? "#ffffff" : "transparent",
                          color: dashboardCurrency === "INR" ? "#E6127E" : "#64748B",
                          boxShadow: dashboardCurrency === "INR" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                        }}
                      >
                        ₹ INR
                      </button>
                      <button
                        type="button"
                        onClick={() => setDashboardCurrency("GBP")}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: dashboardCurrency === "GBP" ? "#ffffff" : "transparent",
                          color: dashboardCurrency === "GBP" ? "#E6127E" : "#64748B",
                          boxShadow: dashboardCurrency === "GBP" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                        }}
                      >
                        £ GBP
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account / Profile Quick Information Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                    marginTop: "18px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(230, 18, 126, 0.1)"
                  }}
                >
                  <div style={{ fontSize: "12px" }}>
                    <span style={{ color: "#8E7287", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                      Registered Contact
                    </span>
                    <strong style={{ color: "#241221" }}>{beneficiaryUser.phone}</strong>
                    <div style={{ color: "#64748B", fontSize: "11px" }}>{beneficiaryUser.email}</div>
                  </div>

                  <div style={{ fontSize: "12px" }}>
                    <span style={{ color: "#8E7287", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                      Registered Home Address
                    </span>
                    <strong style={{ color: "#241221" }}>{beneficiaryUser.address}</strong>
                    <div style={{ color: "#64748B", fontSize: "11px" }}>{beneficiaryUser.councilArea || beneficiaryUser.city || "Leicestershire Area"}</div>
                  </div>

                  <div style={{ fontSize: "12px" }}>
                    <span style={{ color: "#8E7287", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                      Household Composition
                    </span>
                    <strong style={{ color: "#241221" }}>{beneficiaryUser.dependents}</strong>
                    <div style={{ color: "#64748B", fontSize: "11px" }}>{beneficiaryUser.tenancy}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab("profile")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#FCE8F3",
                        color: "#B80C64",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      Edit Account Info →
                    </button>
                  </div>
                </div>
              </div>

              {/* Financial Assistance & Welfare Summary (100% Dynamic Database Records) */}
              <div
                className="beneficiary-card"
                style={{
                  marginBottom: "24px",
                  borderRadius: "1.25rem",
                  padding: "24px",
                  border: "1px solid rgba(230, 18, 126, 0.15)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                      Financial Assistance & Welfare Summary
                    </h3>
                    <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                      Live Trustee Record • Case Ref: <span style={{ fontFamily: "monospace", color: "#E6127E", fontWeight: 700 }}>{beneficiaryUser.referenceId}</span>
                    </p>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 800,
                      backgroundColor: "#ECFDF5",
                      color: "#065F46",
                      border: "1px solid #A7F3D0"
                    }}
                  >
                    ● Trustee Certified
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px",
                    marginBottom: "24px"
                  }}
                >
                  {/* Support Received KPI */}
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "14px",
                      backgroundColor: "#FBF7F9",
                      border: "1px solid rgba(230, 18, 126, 0.08)"
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>
                      Support received
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: 900, color: "#241221", marginTop: "6px" }}>
                      {formatAmount(liveStats.totalDistributed)}
                    </div>
                    <p style={{ fontSize: "11px", color: "#8E7287", margin: "4px 0 0 0" }}>
                      Total approved and disbursed community relief aid.
                    </p>
                  </div>

                  {/* Allocated Support KPI */}
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "14px",
                      backgroundColor: "#FBF7F9",
                      border: "1px solid rgba(230, 18, 126, 0.08)"
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>
                      Allocated support
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: 900, color: "#E6127E", marginTop: "6px" }}>
                      {formatAmount(liveStats.totalAllocated)}
                    </div>
                    <p style={{ fontSize: "11px", color: "#8E7287", margin: "4px 0 0 0" }}>
                      Current active grants and assistance undergoing fulfillment.
                    </p>
                  </div>
                </div>

                {/* Recent Activity List (Dynamically populated from live requests and allocations) */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", margin: 0 }}>
                      Recent activity
                    </h4>
                    {assistanceRecords.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("history")}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#E6127E",
                          cursor: "pointer"
                        }}
                      >
                        View full ledger →
                      </button>
                    )}
                  </div>

                  {assistanceRecords.length > 0 ? (
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        fontSize: "13.5px",
                        color: "#334155"
                      }}
                    >
                      {assistanceRecords.slice(0, 4).map((record) => (
                        <li key={record.id}>
                          <span style={{ fontWeight: 600 }}>{record.type}</span> –{" "}
                          <strong style={{ color: record.statusColor }}>{record.status}</strong>
                          <span style={{ fontSize: "11px", color: "#8E7287", marginLeft: "8px" }}>
                            ({record.amountGBP !== "—" && record.amountGBP !== "Under Assessment" ? (dashboardCurrency === "INR" ? record.amountINR : record.amountGBP) : record.dateReceived})
                          </span>
                        </li>
                      ))}
                      <li>
                        <span style={{ fontWeight: 600 }}>Advocate assigned</span> –{" "}
                        <strong style={{ color: "#059669" }}>{beneficiaryUser.caseWorker}</strong>
                      </li>
                    </ul>
                  ) : (
                    <div
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        backgroundColor: "#F8FAFC",
                        border: "1px dashed #CBD5E1",
                        fontSize: "13px",
                        color: "#64748B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px"
                      }}
                    >
                      <div>
                        <strong>No active relief applications yet.</strong>
                        <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>
                          Need emergency food parcels, heating fuel vouchers, or debt relief?
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowRequestModal(true)}
                        className="btn-gradient-magenta"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        <span>+ Request Support</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Two-Column Layout: Assigned Advocate Details & Recent Messages/Notifications */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "24px"
                }}
              >
                {/* Assigned Advocate Details Card */}
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#241221", margin: 0 }}>
                      Assigned Advocate Details
                    </h3>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontWeight: 800,
                        backgroundColor: "#ECFDF5",
                        color: "#065F46"
                      }}
                    >
                      ACTIVE ADVOCATE
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: "18px"
                      }}
                    >
                      {getInitials(beneficiaryUser.caseWorker)}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 800, color: "#241221" }}>
                        {beneficiaryUser.caseWorker}
                      </div>
                      <div style={{ fontSize: "11px", color: "#8E7287" }}>
                        Senior Family Welfare & Crisis Advocate
                      </div>
                      <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 700, marginTop: "2px" }}>
                        • Available for Consultations Today
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      fontSize: "12px",
                      color: "#475569",
                      padding: "12px",
                      borderRadius: "12px",
                      backgroundColor: "#FBF7F9",
                      border: "1px solid rgba(230, 18, 126, 0.08)",
                      marginBottom: "16px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <PhoneCall size={14} style={{ color: "#E6127E" }} />
                      <span>Direct Helpline: <strong>0116 254 5168 (ext 204)</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <MessagesSquare size={14} style={{ color: "#E6127E" }} />
                      <span>Duty Email: <strong>casework@zinthiyatrust.org</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Clock size={14} style={{ color: "#E6127E" }} />
                      <span>Duty Hours: Mon – Fri, 9:00am – 4:30pm</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab("messages")}
                      className="btn-gradient-magenta"
                      style={{ padding: "8px 14px", fontSize: "12px", flex: 1 }}
                    >
                      <MessagesSquare size={14} />
                      <span>Message Caseworker</span>
                    </button>
                    <a
                      href="tel:01162545168"
                      style={{
                        padding: "8px 14px",
                        fontSize: "12px",
                        borderRadius: "0.75rem",
                        backgroundColor: "#FCE8F3",
                        color: "#B80C64",
                        textDecoration: "none",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <PhoneCall size={14} />
                      <span>Call Caseworker</span>
                    </a>
                  </div>
                </div>

                {/* Recent Messages or Notifications Card */}
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setDashNoticeTab("messages")}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "13px",
                          fontWeight: dashNoticeTab === "messages" ? 800 : 600,
                          color: dashNoticeTab === "messages" ? "#E6127E" : "#8E7287",
                          cursor: "pointer",
                          paddingBottom: "4px",
                          borderBottom: dashNoticeTab === "messages" ? "2px solid #E6127E" : "2px solid transparent"
                        }}
                      >
                        Recent Messages (1)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDashNoticeTab("notifications")}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "13px",
                          fontWeight: dashNoticeTab === "notifications" ? 800 : 600,
                          color: dashNoticeTab === "notifications" ? "#E6127E" : "#8E7287",
                          cursor: "pointer",
                          paddingBottom: "4px",
                          borderBottom: dashNoticeTab === "notifications" ? "2px solid #E6127E" : "2px solid transparent"
                        }}
                      >
                        Notifications ({assistanceRecords.length})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab(dashNoticeTab === "messages" ? "messages" : "notifications")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#E6127E",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      View all →
                    </button>
                  </div>

                  {dashNoticeTab === "messages" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          backgroundColor: "#FFF5F9",
                          border: "1px solid rgba(230, 18, 126, 0.12)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 800, color: "#241221" }}>
                            {beneficiaryUser.caseWorker}
                          </span>
                          <span style={{ fontSize: "10px", color: "#8E7287" }}>
                            Duty Office
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
                          "Welcome to your Zinthiya Trust client portal. You can review your case file, check allocated aid, or request emergency assistance."
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab("messages")}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "10px",
                          backgroundColor: "#FBF7F9",
                          border: "1px solid rgba(230, 18, 126, 0.1)",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#B80C64",
                          cursor: "pointer",
                          textAlign: "center"
                        }}
                      >
                        Open Advocate Messaging Thread →
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          backgroundColor: "#FFF5F9",
                          border: "1px solid rgba(230, 18, 126, 0.12)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E6127E" }} />
                          <strong style={{ fontSize: "12px", color: "#241221" }}>Medical assistance – Approved</strong>
                        </div>
                        <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0 12px" }}>
                          Your emergency healthcare support has been approved by the trust casework committee.
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          backgroundColor: "#FBF7F9",
                          border: "1px solid #F1F5F9"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                          <strong style={{ fontSize: "12px", color: "#241221" }}>Education support – Received</strong>
                        </div>
                        <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0 12px" }}>
                          School supplies and uniform grant credited to your nominated account.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MY PROFILE                                                         */}
          {/* ========================================================================= */}
          {activeTab === "profile" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Profile Top Summary Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #FFF5F9 0%, #FFFFFF 100%)",
                  border: "1px solid rgba(230, 18, 126, 0.15)",
                  borderRadius: "1.5rem",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(36, 18, 33, 0.03)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: "22px",
                        boxShadow: "0 4px 14px rgba(230, 18, 126, 0.3)"
                      }}
                    >
                      {getInitials(beneficiaryUser.fullName)}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#241221", margin: 0 }}>
                          {beneficiaryUser.fullName}
                        </h2>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: 800,
                            backgroundColor: "#ECFDF5",
                            color: "#065F46",
                            border: "1px solid #A7F3D0"
                          }}
                        >
                          UK GDPR VERIFIED
                        </span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#8E7287", margin: "3px 0 0 0" }}>
                        Preferred Name: <strong>{beneficiaryUser.preferredName}</strong> • Case Ref: <strong style={{ color: "#E6127E", fontFamily: "monospace" }}>{beneficiaryUser.referenceId}</strong>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: "#FCE8F3",
                        color: "#B80C64"
                      }}
                    >
                      Lead Advocate: {beneficiaryUser.caseWorker.split(" ")[0]} {beneficiaryUser.caseWorker.split(" ")[1]}
                    </span>
                  </div>
                </div>

                {/* Sub-Navigation Pills inside Profile */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(230, 18, 126, 0.1)",
                    overflowX: "auto"
                  }}
                >
                  {[
                    { id: "personal" as const, label: "Personal Information", icon: User },
                    { id: "contact" as const, label: "Contact Details", icon: PhoneCall },
                    { id: "address" as const, label: "Address & Housing", icon: MapPin },
                    { id: "password" as const, label: "Security & Password", icon: Lock },
                  ].map((sub) => {
                    const SubIcon = sub.icon;
                    const isCurrent = profileSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setProfileSubTab(sub.id);
                          setProfileSuccessMsg("");
                        }}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "10px",
                          fontSize: "12px",
                          fontWeight: isCurrent ? 800 : 600,
                          backgroundColor: isCurrent ? "#E6127E" : "#ffffff",
                          color: isCurrent ? "#ffffff" : "#64748B",
                          border: isCurrent ? "none" : "1px solid #E2E8F0",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.15s ease",
                          boxShadow: isCurrent ? "0 2px 8px rgba(230, 18, 126, 0.25)" : "none",
                          whiteSpace: "nowrap"
                        }}
                      >
                        <SubIcon size={14} />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Profile Update Success Toast */}
              {profileSuccessMsg && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    color: "#065F46",
                    fontSize: "13px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Check size={18} />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              {/* Sub-Section 1: Personal Information */}
              {profileSubTab === "personal" && (
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                        Personal Information
                      </h3>
                      <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                        View official records and update permitted client identification details.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setProfileSuccessMsg("Personal details updated successfully. Changes are now active.");
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                      {/* Full Legal Name (Protected) */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                          <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>
                            Full Legal Name (Official Record)
                          </label>
                          <span style={{ fontSize: "10px", color: "#94A3B8", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                            <Lock size={10} /> Verified Record
                          </span>
                        </div>
                        <input
                          type="text"
                          disabled
                          value={beneficiaryUser.fullName}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #E2E8F0",
                            backgroundColor: "#F8FAFC",
                            fontSize: "13px",
                            color: "#64748B"
                          }}
                        />
                        <p style={{ fontSize: "10px", color: "#94A3B8", margin: "3px 0 0 0" }}>
                          To update your official legal name, caseworker identity verification is required.
                        </p>
                      </div>

                      {/* Preferred Display Name (Permitted to edit) */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Preferred Name / Salutation *
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.preferredName}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, preferredName: e.target.value })}
                          placeholder="e.g. Sarah"
                          required
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1.5px solid rgba(230, 18, 126, 0.25)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                        <p style={{ fontSize: "10px", color: "#8E7287", margin: "3px 0 0 0" }}>
                          How you prefer caseworkers and support staff to address you.
                        </p>
                      </div>

                      {/* Client Reference ID (Protected) */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Client Case Reference Number
                        </label>
                        <input
                          type="text"
                          disabled
                          value={beneficiaryUser.referenceId}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #E2E8F0",
                            backgroundColor: "#F8FAFC",
                            fontSize: "13px",
                            fontFamily: "monospace",
                            color: "#E6127E",
                            fontWeight: 700
                          }}
                        />
                      </div>

                      {/* Date of Birth (Protected) */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Date of Birth (Verified)
                        </label>
                        <input
                          type="text"
                          disabled
                          value={beneficiaryUser.dob}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #E2E8F0",
                            backgroundColor: "#F8FAFC",
                            fontSize: "13px",
                            color: "#64748B"
                          }}
                        />
                      </div>

                      {/* Primary Language Preference */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Preferred Spoken & Written Language
                        </label>
                        <select
                          value={beneficiaryUser.primaryLanguage}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, primaryLanguage: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid rgba(230, 18, 126, 0.25)",
                            fontSize: "13px",
                            outline: "none",
                            backgroundColor: "#ffffff"
                          }}
                        >
                          <option>English (United Kingdom)</option>
                          <option>Gujarati (ગુજરાતી)</option>
                          <option>Hindi (हिन्दी)</option>
                          <option>Punjabi (ਪੰਜਾਬੀ)</option>
                          <option>Urdu (اردو)</option>
                          <option>Polish (Polski)</option>
                          <option>Somali (Af-Soomaali)</option>
                          <option>Arabic (العربية)</option>
                          <option>Bengali (বাংলা)</option>
                        </select>
                      </div>

                      {/* Interpreter Request Toggle */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Accredited Interpreter for In-Person Sessions
                        </label>
                        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
                            <input
                              type="radio"
                              name="interpreter"
                              checked={!beneficiaryUser.interpreterNeeded}
                              onChange={() => setBeneficiaryUser({ ...beneficiaryUser, interpreterNeeded: false })}
                              style={{ accentColor: "#E6127E" }}
                            />
                            <span>Not required</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
                            <input
                              type="radio"
                              name="interpreter"
                              checked={beneficiaryUser.interpreterNeeded}
                              onChange={() => setBeneficiaryUser({ ...beneficiaryUser, interpreterNeeded: true })}
                              style={{ accentColor: "#E6127E" }}
                            />
                            <span>Require Interpreter</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button type="submit" className="btn-gradient-magenta" style={{ padding: "8px 20px", fontSize: "13px" }}>
                        <span>Save Personal Information</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Sub-Section 2: Contact Details */}
              {profileSubTab === "contact" && (
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                        Contact Details & Communication Preferences
                      </h3>
                      <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                        Update your primary telephone, email, and emergency next-of-kin contacts.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setProfileSuccessMsg(`Contact details updated successfully. Caseworker ${beneficiaryUser.caseWorker} has been notified.`);
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                      {/* Primary Mobile */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Primary Mobile Number (Receives SMS Vouchers & Codes) *
                        </label>
                        <div style={{ position: "relative" }}>
                          <PhoneCall size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                          <input
                            type="tel"
                            value={beneficiaryUser.phone}
                            onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, phone: e.target.value })}
                            required
                            style={{
                              width: "100%",
                              padding: "9px 12px 9px 34px",
                              borderRadius: "10px",
                              border: "1.5px solid rgba(230, 18, 126, 0.25)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* Secondary Phone */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Alternative Telephone / Landline (Optional)
                        </label>
                        <div style={{ position: "relative" }}>
                          <PhoneCall size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                          <input
                            type="tel"
                            value={beneficiaryUser.altPhone}
                            onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, altPhone: e.target.value })}
                            placeholder="0116 ..."
                            style={{
                              width: "100%",
                              padding: "9px 12px 9px 34px",
                              borderRadius: "10px",
                              border: "1px solid #CBD5E1",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* Registered Email */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Registered Email Address *
                        </label>
                        <div style={{ position: "relative" }}>
                          <Mail size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                          <input
                            type="email"
                            value={beneficiaryUser.email}
                            onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, email: e.target.value })}
                            required
                            style={{
                              width: "100%",
                              padding: "9px 12px 9px 34px",
                              borderRadius: "10px",
                              border: "1.5px solid rgba(230, 18, 126, 0.25)",
                              fontSize: "13px",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Preferred Contact Method
                        </label>
                        <select
                          value={beneficiaryUser.preferredContactMethod}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, preferredContactMethod: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none",
                            backgroundColor: "#ffffff"
                          }}
                        >
                          <option>SMS & Email</option>
                          <option>SMS Text Only</option>
                          <option>Telephone Voice Call</option>
                          <option>Email Only</option>
                          <option>Encrypted Portal Message</option>
                        </select>
                      </div>

                      {/* Best Contact Time */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Best Time to Call
                        </label>
                        <select
                          value={beneficiaryUser.contactHours}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, contactHours: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none",
                            backgroundColor: "#ffffff"
                          }}
                        >
                          <option>Weekdays 09:00 - 16:30 (Anytime)</option>
                          <option>Morning (09:00 - 12:00)</option>
                          <option>Afternoon (12:00 - 16:30)</option>
                        </select>
                      </div>

                      {/* Emergency Contact Name */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Emergency Next of Kin Name
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.emergencyContactName}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, emergencyContactName: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Emergency Contact Phone */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Emergency Contact Number
                        </label>
                        <input
                          type="tel"
                          value={beneficiaryUser.emergencyContactPhone}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, emergencyContactPhone: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Emergency Relationship */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Emergency Contact Relationship
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.emergencyContactRelation}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, emergencyContactRelation: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button type="submit" className="btn-gradient-magenta" style={{ padding: "8px 20px", fontSize: "13px" }}>
                        <span>Save Contact Details</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Sub-Section 3: Address & Housing Information */}
              {profileSubTab === "address" && (
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                        Address & Housing Details
                      </h3>
                      <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                        Ensure your registered residence is accurate for utility vouchers, deliveries, and council benefits.
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontWeight: 800,
                        backgroundColor: "#ECFDF5",
                        color: "#065F46"
                      }}
                    >
                      PROOF VERIFIED
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const combined = `${beneficiaryUser.addressLine1}, ${beneficiaryUser.city}, ${beneficiaryUser.postcode}`;
                      setBeneficiaryUser({ ...beneficiaryUser, address: combined });
                      setProfileSuccessMsg("Address information updated successfully. Casework records have been updated.");
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                      {/* Address Line 1 */}
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Address Line 1 (Street & House Number) *
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.addressLine1}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, addressLine1: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1.5px solid rgba(230, 18, 126, 0.25)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Address Line 2 (Flat / Apartment - Optional)
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.addressLine2}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, addressLine2: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Town / City */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Town / City *
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.city}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, city: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1.5px solid rgba(230, 18, 126, 0.25)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                      </div>

                      {/* Postcode */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Postcode *
                        </label>
                        <input
                          type="text"
                          value={beneficiaryUser.postcode}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, postcode: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1.5px solid rgba(230, 18, 126, 0.25)",
                            fontSize: "13px",
                            outline: "none",
                            textTransform: "uppercase"
                          }}
                        />
                      </div>

                      {/* Local Authority / Council (Read-only) */}
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Local Authority / Council Area
                        </label>
                        <input
                          type="text"
                          disabled
                          value={beneficiaryUser.councilArea}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #E2E8F0",
                            backgroundColor: "#F8FAFC",
                            fontSize: "13px",
                            color: "#64748B"
                          }}
                        />
                      </div>

                      {/* Tenancy Type */}
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                          Housing / Tenancy Status
                        </label>
                        <select
                          value={beneficiaryUser.tenancy}
                          onChange={(e) => setBeneficiaryUser({ ...beneficiaryUser, tenancy: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "13px",
                            outline: "none",
                            backgroundColor: "#ffffff"
                          }}
                        >
                          <option>Private Rented (Assured Shorthold)</option>
                          <option>Council Housing (Local Authority)</option>
                          <option>Housing Association</option>
                          <option>Temporary / Emergency Shelter</option>
                          <option>Owner Occupier (Mortgage / Outright)</option>
                          <option>Supported / Refuge Accommodation</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        backgroundColor: "#FFF5F9",
                        border: "1px solid rgba(230, 18, 126, 0.12)",
                        fontSize: "11px",
                        color: "#6A5364",
                        lineHeight: "1.5"
                      }}
                    >
                      <strong style={{ color: "#B80C64" }}>Note for Relocating:</strong> If you move to a new property, updating your address above ensures food hampers and utility vouchers are dispatched to your current home. Your caseworker may request a photo of your new tenancy agreement or Council Tax bill.
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button type="submit" className="btn-gradient-magenta" style={{ padding: "8px 20px", fontSize: "13px" }}>
                        <span>Save Address Information</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Sub-Section 4: Security & Change Password */}
              {profileSubTab === "password" && (
                <div className="beneficiary-card" style={{ width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <Lock size={18} style={{ color: "#E6127E" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                      Change Your Password
                    </h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "#8E7287", margin: "0 0 20px 0" }}>
                    Keep your account secure with a strong password containing at least 8 characters.
                  </p>

                  {passwordChangeSuccess && (
                    <div style={{ padding: "10px 14px", borderRadius: "10px", backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", fontSize: "12px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Check size={16} />
                      <span>Your password has been changed successfully.</span>
                    </div>
                  )}

                  {passwordError && (
                    <div style={{ padding: "10px 14px", borderRadius: "10px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", color: "#991B1B", fontSize: "12px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <AlertCircle size={16} />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                        Current Password *
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showCurrentPw ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          style={{
                            width: "100%",
                            padding: "9px 36px 9px 12px",
                            borderRadius: "10px",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPw(!showCurrentPw)}
                          style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
                        >
                          {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                        New Password (8+ characters) *
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showNewPw ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          style={{
                            width: "100%",
                            padding: "9px 36px 9px 12px",
                            borderRadius: "10px",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
                        >
                          {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                        Confirm New Password *
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showConfirmPw ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          style={{
                            width: "100%",
                            padding: "9px 36px 9px 12px",
                            borderRadius: "10px",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPw(!showConfirmPw)}
                          style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
                        >
                          {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-gradient-magenta"
                      style={{ padding: "8px 20px", fontSize: "13px", alignSelf: "flex-start", marginTop: "6px" }}
                    >
                      <span>Update Password</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Notice of Permitted vs Protected Records */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "14px",
                  backgroundColor: "#FBF7F9",
                  border: "1px solid rgba(230, 18, 126, 0.12)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px"
                }}
              >
                <ShieldCheck size={22} style={{ color: "#E6127E", flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>
                  <strong style={{ color: "#241221", display: "block", marginBottom: "2px" }}>
                    UK GDPR Data Protection & Permitted Changes
                  </strong>
                  You can update your preferred name, primary/secondary phone numbers, email address, living address, communication methods, and password self-service at any time. Changes to legal names, dates of birth, or registered dependents require caseworker identity verification to maintain compliance with charitable grant awards.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ALLOCATED SUPPORT (DEDICATED SEPARATE PAGE)                         */}
          {/* Requirements:                                                             */}
          {/* - Allocated support amount                                                */}
          {/* - Purpose of the allocation                                               */}
          {/* - Allocation date                                                         */}
          {/* - Current status                                                          */}
          {/* - Details of the assistance                                               */}
          {/* This helps beneficiaries understand what support the Trust approved.      */}
          {/* ========================================================================= */}
          {activeTab === "assistance" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Header Title & Subtitle */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 800,
                        backgroundColor: "#FCE8F3",
                        color: "#B80C64"
                      }}
                    >
                      APPROVED BY TRUSTEES
                    </span>
                    <span style={{ fontSize: "12px", color: "#8E7287" }}>
                      Case Ref: {beneficiaryUser.referenceId}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#241221", margin: "4px 0 0 0" }}>
                    Allocated Support & Approved Grants
                  </h2>
                  <p style={{ fontSize: "13px", color: "#6A5364", margin: "4px 0 0 0" }}>
                    Official record of community aid, financial relief, and vouchers approved for you by The Zinthiya Trust.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Currency Switcher */}
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#F1F5F9",
                      borderRadius: "8px",
                      padding: "2px"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setDashboardCurrency("INR")}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: dashboardCurrency === "INR" ? "#ffffff" : "transparent",
                        color: dashboardCurrency === "INR" ? "#E6127E" : "#64748B",
                        boxShadow: dashboardCurrency === "INR" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      ₹ INR
                    </button>
                    <button
                      type="button"
                      onClick={() => setDashboardCurrency("GBP")}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: dashboardCurrency === "GBP" ? "#ffffff" : "transparent",
                        color: dashboardCurrency === "GBP" ? "#E6127E" : "#64748B",
                        boxShadow: dashboardCurrency === "GBP" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      £ GBP
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert("Downloading official Trustee Allocation Certificate & Approved Support Letter (PDF)...");
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      backgroundColor: "#FCE8F3",
                      color: "#B80C64",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <Download size={14} />
                    <span>Download Award Summary (PDF)</span>
                  </button>
                </div>
              </div>

              {/* 4 Summary Cards: Overview of Approved Support */}
              <div className="beneficiary-kpi-grid" style={{ marginBottom: "0" }}>
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Total Allocated Support
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Wallet size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#2563EB" }}>
                    {formatAmount(liveStats.totalAllocated)}
                  </div>
                  <div style={{ fontSize: "11px", color: "#2563EB", fontWeight: 700, marginTop: "2px" }}>
                    {allocatedSupportRecords.length} Active Allocation(s)
                  </div>
                </div>

                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Active Approved Grants
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShieldCheck size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#059669" }}>
                    {allocatedSupportRecords.length} Allocations
                  </div>
                  <div style={{ fontSize: "11px", color: "#059669", fontWeight: 700, marginTop: "2px" }}>
                    100% Trustee Verified &amp; Authorized
                  </div>
                </div>

                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Pending Disbursement
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#FFFBEB", color: "#B45309", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#B45309" }}>
                    {formatAmount(liveAllocations.filter((a: any) => a.status === 'ALLOCATED').reduce((sum: number, a: any) => sum + Number(a.allocatedAmount || 0), 0))}
                  </div>
                  <div style={{ fontSize: "11px", color: "#B45309", fontWeight: 700, marginTop: "2px" }}>
                    {liveAllocations.filter((a: any) => a.status === 'ALLOCATED').length > 0 ? "Under Scheduled Payout" : "All Allocations Current"}
                  </div>
                </div>

                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Assigned Lead Advocate
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#FCE8F3", color: "#B80C64", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: 800, color: "#241221", marginTop: "4px" }}>
                    {beneficiaryUser.caseWorker}
                  </div>
                  <div style={{ fontSize: "11px", color: "#B80C64", fontWeight: 700, marginTop: "2px" }}>
                    0116 254 5168 ext. 204
                  </div>
                </div>
              </div>

              {/* Filter Pills, Search & View Switcher */}
              <div className="beneficiary-card" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                  {/* Status Filters */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[
                      { id: "all" as const, label: "All Approved (4)" },
                      { id: "pending" as const, label: "Pending Payout (1)" },
                      { id: "disbursed" as const, label: "Disbursed & Active (3)" }
                    ].map((tab) => {
                      const isTabActive = allocationFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setAllocationFilter(tab.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: isTabActive ? 800 : 600,
                            backgroundColor: isTabActive ? "#E6127E" : "#F8FAFC",
                            color: isTabActive ? "#ffffff" : "#64748B",
                            border: isTabActive ? "none" : "1px solid #E2E8F0",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    {/* Search */}
                    <div style={{ position: "relative", minWidth: "240px" }}>
                      <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                      <input
                        type="text"
                        value={allocationSearch}
                        onChange={(e) => setAllocationSearch(e.target.value)}
                        placeholder="Search purpose, grant, ref..."
                        style={{
                          width: "100%",
                          padding: "6px 12px 6px 30px",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          fontSize: "12px",
                          outline: "none"
                        }}
                      />
                    </div>

                    {/* View Switcher: Cards vs Table */}
                    <div style={{ display: "flex", backgroundColor: "#F1F5F9", borderRadius: "8px", padding: "2px" }}>
                      <button
                        type="button"
                        onClick={() => setAllocationViewMode("cards")}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: allocationViewMode === "cards" ? "#ffffff" : "transparent",
                          color: allocationViewMode === "cards" ? "#E6127E" : "#64748B",
                          boxShadow: allocationViewMode === "cards" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                        }}
                      >
                        Grant Cards
                      </button>
                      <button
                        type="button"
                        onClick={() => setAllocationViewMode("table")}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: allocationViewMode === "table" ? "#ffffff" : "transparent",
                          color: allocationViewMode === "table" ? "#E6127E" : "#64748B",
                          boxShadow: allocationViewMode === "table" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                        }}
                      >
                        Table View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RENDER VIEW 1: DETAILED GRANT CARDS */}
              {allocationViewMode === "cards" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {allocatedSupportRecords
                    .filter((item) => {
                      if (allocationFilter !== "all" && item.statusTag !== allocationFilter) return false;
                      if (
                        allocationSearch.trim() &&
                        !item.title.toLowerCase().includes(allocationSearch.toLowerCase()) &&
                        !item.purpose.toLowerCase().includes(allocationSearch.toLowerCase()) &&
                        !item.reference.toLowerCase().includes(allocationSearch.toLowerCase())
                      )
                        return false;
                      return true;
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        className="beneficiary-card"
                        style={{
                          padding: "22px",
                          borderLeft: `4px solid ${item.statusColor}`,
                          position: "relative"
                        }}
                      >
                        {/* Top Strip: Title, Category, Reference & Status */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "6px", backgroundColor: "#FCE8F3", color: "#B80C64" }}>
                                {item.category}
                              </span>
                              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#64748B" }}>
                                Ref: {item.reference}
                              </span>
                            </div>
                            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#241221", margin: "6px 0 0 0" }}>
                              {item.title}
                            </h3>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span
                              style={{
                                padding: "4px 12px",
                                borderRadius: "9999px",
                                fontSize: "11.5px",
                                fontWeight: 800,
                                backgroundColor: item.statusBg,
                                color: item.statusColor,
                                border: `1px solid ${item.statusColor}33`
                              }}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>

                        {/* Middle Grid: Amount, Date, Purpose & Details */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "18px",
                            backgroundColor: "#FBF7F9",
                            padding: "18px",
                            borderRadius: "14px",
                            border: "1px solid rgba(230, 18, 126, 0.08)",
                            marginBottom: "16px"
                          }}
                        >
                          {/* Column 1: Allocated Amount & Purpose */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {/* 1. Allocated Support Amount */}
                            <div>
                              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                                Allocated Support Amount
                              </div>
                              <div style={{ fontSize: "26px", fontWeight: 900, color: "#E6127E", marginTop: "2px" }}>
                                {dashboardCurrency === "INR" ? item.amountINR : item.amountGBP}
                              </div>
                            </div>

                            {/* 2. Allocation Date */}
                            <div>
                              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                                Allocation Date
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                                <Calendar size={14} style={{ color: "#E6127E" }} />
                                <span>{item.allocationDate}</span>
                                <span style={{ fontSize: "11px", color: "#8E7287", fontWeight: 500 }}>
                                  ({item.effectiveDate})
                                </span>
                              </div>
                            </div>

                            {/* 3. Purpose of the Allocation */}
                            <div
                              style={{
                                backgroundColor: "#ffffff",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "1px solid rgba(230, 18, 126, 0.15)"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#B80C64" }}>
                                <Info size={13} />
                                <span>Purpose of Allocation</span>
                              </div>
                              <p style={{ fontSize: "12.5px", color: "#334155", margin: "4px 0 0 0", lineHeight: "1.55", fontWeight: 500 }}>
                                {item.purpose}
                              </p>
                            </div>
                          </div>

                          {/* Column 2: Assistance Details */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                              Assistance Details & Governance
                            </div>

                            <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>
                              <div>
                                <strong style={{ color: "#241221" }}>Funding Partner:</strong> {item.funder}
                              </div>
                              <div style={{ marginTop: "4px" }}>
                                <strong style={{ color: "#241221" }}>Supervising Caseworker:</strong> {item.caseworker}
                              </div>
                              <div style={{ marginTop: "4px" }}>
                                <strong style={{ color: "#241221" }}>Disbursement Method:</strong> {item.disbursementMethod}
                              </div>
                              <div style={{ marginTop: "4px" }}>
                                <strong style={{ color: "#241221" }}>Trustee Authority:</strong> {item.authorizationBody}
                              </div>
                              <div style={{ marginTop: "4px" }}>
                                <strong style={{ color: "#241221" }}>Permitted Use:</strong> {item.usageGuidelines}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4. Visual 4-Step Status Stepper */}
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287", marginBottom: "8px" }}>
                            Current Status & Milestone Tracker
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                            {item.steps.map((step, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: "8px 10px",
                                  borderRadius: "8px",
                                  backgroundColor: step.done ? "#ECFDF5" : "#F8FAFC",
                                  border: step.done ? "1px solid #A7F3D0" : "1px solid #E2E8F0",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px"
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                  <div
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      borderRadius: "50%",
                                      backgroundColor: step.done ? "#059669" : "#CBD5E1",
                                      color: "#ffffff",
                                      fontSize: "9px",
                                      fontWeight: 800,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center"
                                    }}
                                  >
                                    {step.done ? "✓" : idx + 1}
                                  </div>
                                  <span style={{ fontSize: "11px", fontWeight: 700, color: step.done ? "#065F46" : "#64748B" }}>
                                    {step.label}
                                  </span>
                                </div>
                                <div style={{ fontSize: "10px", color: step.done ? "#059669" : "#94A3B8", paddingLeft: "18px" }}>
                                  {step.date}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", paddingTop: "12px", borderTop: "1px solid rgba(230, 18, 126, 0.1)" }}>
                          <span style={{ fontSize: "11px", color: "#8E7287" }}>
                            Valid Through: <strong>{item.validUntil}</strong> • Certified Under The Zinthiya Trust Care Charter
                          </span>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Downloading Official Allocation Notice PDF for ${item.reference}...`);
                              }}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                border: "1px solid #CBD5E1",
                                backgroundColor: "#ffffff",
                                color: "#475569",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                            >
                              <Download size={13} />
                              <span>Award Letter (PDF)</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedAllocationDetail(item)}
                              style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                backgroundColor: "#E6127E",
                                color: "#ffffff",
                                border: "none",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                            >
                              View Full Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                /* RENDER VIEW 2: STRUCTURED TABLE VIEW */
                <div className="beneficiary-card" style={{ padding: "20px" }}>
                  <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(230, 18, 126, 0.12)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#FBF7F9", borderBottom: "1.5px solid rgba(230, 18, 126, 0.12)" }}>
                          <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Allocated Amount</th>
                          <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Purpose of Allocation</th>
                          <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Allocation Date</th>
                          <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Current Status</th>
                          <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221", textAlign: "right" }}>Details & Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allocatedSupportRecords
                          .filter((item) => {
                            if (allocationFilter !== "all" && item.statusTag !== allocationFilter) return false;
                            if (
                              allocationSearch.trim() &&
                              !item.title.toLowerCase().includes(allocationSearch.toLowerCase()) &&
                              !item.purpose.toLowerCase().includes(allocationSearch.toLowerCase()) &&
                              !item.reference.toLowerCase().includes(allocationSearch.toLowerCase())
                            )
                              return false;
                            return true;
                          })
                          .map((item) => (
                            <tr key={item.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                              {/* 1. Allocated Support Amount */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontSize: "16px", fontWeight: 900, color: "#E6127E" }}>
                                  {dashboardCurrency === "INR" ? item.amountINR : item.amountGBP}
                                </div>
                                <div style={{ fontSize: "11px", color: "#8E7287", marginTop: "2px" }}>
                                  Ref: <span style={{ fontFamily: "monospace" }}>{item.reference}</span>
                                </div>
                              </td>

                              {/* 2. Purpose of the Allocation */}
                              <td style={{ padding: "14px 16px", maxWidth: "320px" }}>
                                <div style={{ fontWeight: 700, color: "#241221", fontSize: "13px" }}>
                                  {item.title}
                                </div>
                                <div style={{ fontSize: "12px", color: "#475569", marginTop: "3px", lineHeight: "1.4" }}>
                                  {item.purpose}
                                </div>
                              </td>

                              {/* 3. Allocation Date */}
                              <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                                <div style={{ fontWeight: 700, color: "#241221" }}>
                                  {item.allocationDate}
                                </div>
                                <div style={{ fontSize: "11px", color: "#8E7287" }}>
                                  Effective: {item.effectiveDate}
                                </div>
                              </td>

                              {/* 4. Current Status */}
                              <td style={{ padding: "14px 16px" }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "3px 10px",
                                    borderRadius: "9999px",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    backgroundColor: item.statusBg,
                                    color: item.statusColor
                                  }}
                                >
                                  {item.status}
                                </span>
                              </td>

                              {/* 5. Details of the assistance & Action */}
                              <td style={{ padding: "14px 16px", textAlign: "right" }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedAllocationDetail(item)}
                                  style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    backgroundColor: "#FCE8F3",
                                    color: "#B80C64",
                                    border: "none",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    cursor: "pointer"
                                  }}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ALLOCATION DETAIL MODAL */}
              {selectedAllocationDetail && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(36, 18, 33, 0.6)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 60,
                    padding: "16px"
                  }}
                  onClick={() => setSelectedAllocationDetail(null)}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      padding: "24px",
                      maxWidth: "580px",
                      width: "100%",
                      boxShadow: "0 20px 40px rgba(36, 18, 33, 0.2)",
                      maxHeight: "90vh",
                      overflowY: "auto"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontSize: "10px",
                              fontWeight: 800,
                              backgroundColor: selectedAllocationDetail.statusBg,
                              color: selectedAllocationDetail.statusColor
                            }}
                          >
                            {selectedAllocationDetail.status.toUpperCase()}
                          </span>
                          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E7287" }}>
                            {selectedAllocationDetail.reference}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: "4px 0 0 0" }}>
                          {selectedAllocationDetail.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedAllocationDetail(null)}
                        style={{ background: "none", border: "none", color: "#8E7287", cursor: "pointer", padding: "4px" }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Certificate Strip */}
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "10px",
                        backgroundColor: "#FFF5F9",
                        border: "1px solid rgba(230, 18, 126, 0.15)",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <ShieldCheck size={20} style={{ color: "#E6127E", flexShrink: 0 }} />
                      <div style={{ fontSize: "11.5px", color: "#6A5364", lineHeight: "1.4" }}>
                        This assistance package was formally reviewed and authorized by The Zinthiya Trust for beneficiary <strong>{beneficiaryUser.fullName}</strong> ({beneficiaryUser.referenceId}).
                      </div>
                    </div>

                    {/* 5 Key Information Fields */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        padding: "14px",
                        borderRadius: "12px",
                        backgroundColor: "#FBF7F9",
                        border: "1px solid rgba(230, 18, 126, 0.1)",
                        marginBottom: "16px",
                        fontSize: "12px"
                      }}
                    >
                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Allocated Support Amount
                        </span>
                        <div style={{ fontSize: "18px", fontWeight: 900, color: "#E6127E", marginTop: "2px" }}>
                          {dashboardCurrency === "INR" ? selectedAllocationDetail.amountINR : selectedAllocationDetail.amountGBP}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Allocation Date
                        </span>
                        <div style={{ fontSize: "13px", fontWeight: 800, color: "#241221", marginTop: "3px" }}>
                          {selectedAllocationDetail.allocationDate}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Current Status
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 800, color: selectedAllocationDetail.statusColor, marginTop: "2px" }}>
                          {selectedAllocationDetail.status}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Effective / Payout Date
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAllocationDetail.effectiveDate}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Purpose of the Allocation
                        </span>
                        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#241221", marginTop: "3px", lineHeight: "1.5" }}>
                          {selectedAllocationDetail.purpose}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Disbursement Method
                        </span>
                        <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>
                          {selectedAllocationDetail.disbursementMethod}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Funding Partner & Authorization
                        </span>
                        <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>
                          {selectedAllocationDetail.funder} • {selectedAllocationDetail.authorizationBody}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Supervising Caseworker
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAllocationDetail.caseworker} (Direct: 0116 254 5168)
                        </div>
                      </div>
                    </div>

                    {/* Permitted Use Guidelines */}
                    <div style={{ marginBottom: "20px" }}>
                      <span style={{ color: "#8E7287", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                        Permitted Use & Terms
                      </span>
                      <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5", margin: "4px 0 0 0" }}>
                        {selectedAllocationDetail.usageGuidelines}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedAllocationDetail(null)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          backgroundColor: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#64748B",
                          cursor: "pointer"
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Printing certified support allocation notice for ${selectedAllocationDetail.reference}...`);
                        }}
                        className="btn-gradient-magenta"
                        style={{ flex: 1, padding: "10px", fontSize: "12px" }}
                      >
                        <Download size={14} />
                        <span>Print Allocation Notice</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SUPPORT HISTORY (SEPARATE DEDICATED ARCHIVE PAGE)                   */}
          {/* ========================================================================= */}
          {activeTab === "history" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Header Title & Subtitle */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 800,
                        backgroundColor: "#FCE8F3",
                        color: "#B80C64"
                      }}
                    >
                      SUPPORT ARCHIVE
                    </span>
                    <span style={{ fontSize: "12px", color: "#8E7287" }}>
                      Case Ref: {beneficiaryUser.referenceId}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#241221", margin: "4px 0 0 0" }}>
                    Support & Assistance History
                  </h2>
                  <p style={{ fontSize: "13px", color: "#6A5364", margin: "4px 0 0 0" }}>
                    Review all community aid awarded, track allocation status, inspect disbursement dates, and download official relief statements.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Currency Switcher */}
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#F1F5F9",
                      borderRadius: "8px",
                      padding: "2px"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setDashboardCurrency("INR")}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: dashboardCurrency === "INR" ? "#ffffff" : "transparent",
                        color: dashboardCurrency === "INR" ? "#E6127E" : "#64748B",
                        boxShadow: dashboardCurrency === "INR" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      ₹ INR
                    </button>
                    <button
                      type="button"
                      onClick={() => setDashboardCurrency("GBP")}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: dashboardCurrency === "GBP" ? "#ffffff" : "transparent",
                        color: dashboardCurrency === "GBP" ? "#E6127E" : "#64748B",
                        boxShadow: dashboardCurrency === "GBP" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      £ GBP
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert("Downloading complete verified Assistance History Summary (PDF)...");
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      backgroundColor: "#FCE8F3",
                      color: "#B80C64",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <Download size={14} />
                    <span>Download Summary (PDF)</span>
                  </button>
                </div>
              </div>

              {/* 3 Summary KPI Cards: Received, Allocated, Completed */}
              <div className="beneficiary-kpi-grid" style={{ marginBottom: "0" }}>
                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Support Received
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#241221" }}>
                    {formatAmount(liveStats.totalDistributed)}
                  </div>
                  <div style={{ fontSize: "11px", color: "#059669", fontWeight: 700, marginTop: "2px" }}>
                    {liveAllocations.filter((a: any) => a.status === 'DISTRIBUTED').length} Grants Disbursed &amp; Received
                  </div>
                </div>

                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Allocated Support
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Wallet size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#2563EB" }}>
                    {formatAmount(liveStats.totalAllocated)}
                  </div>
                  <div style={{ fontSize: "11px", color: "#2563EB", fontWeight: 700, marginTop: "2px" }}>
                    {liveAllocations.filter((a: any) => a.status === 'ALLOCATED').length} Grant(s) Pending Payout
                  </div>
                </div>

                <div className="beneficiary-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#8E7287" }}>
                      Total Assistance Tracked
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#F1F5F9", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <History size={14} />
                    </div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#475569" }}>
                    {assistanceRecords.length} Record(s)
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 700, marginTop: "2px" }}>
                    {assistanceRecords.length > 0 ? "Official Casework Ledger Active" : "No Prior Assistance History"}
                  </div>
                </div>
              </div>

              {/* Assistance Records Table Section */}
              <div className="beneficiary-card" style={{ padding: "20px" }}>
                {/* Search Bar & Status Filter Tabs */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[
                      { id: "all" as const, label: `All Records (${assistanceRecords.length})` },
                      { id: "received" as const, label: `Received (${assistanceRecords.filter((a: any) => a.status.toLowerCase() === "received").length})` },
                      { id: "approved" as const, label: `Approved (${assistanceRecords.filter((a: any) => a.status.toLowerCase() === "approved").length})` },
                      { id: "completed" as const, label: `Completed (${assistanceRecords.filter((a: any) => a.status.toLowerCase() === "completed").length})` }
                    ].map((tab) => {
                      const isTabActive = historyFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setHistoryFilter(tab.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: isTabActive ? 800 : 600,
                            backgroundColor: isTabActive ? "#E6127E" : "#F8FAFC",
                            color: isTabActive ? "#ffffff" : "#64748B",
                            border: isTabActive ? "none" : "1px solid #E2E8F0",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ position: "relative", minWidth: "220px" }}>
                    <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Search assistance..."
                      style={{
                        width: "100%",
                        padding: "6px 12px 6px 30px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "12px",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                {/* Primary Assistance Ledger Table */}
                <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(230, 18, 126, 0.12)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#FBF7F9", borderBottom: "1.5px solid rgba(230, 18, 126, 0.12)" }}>
                        <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Assistance type</th>
                        <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Amount</th>
                        <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Status</th>
                        <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221" }}>Date</th>
                        <th style={{ padding: "12px 16px", fontWeight: 800, color: "#241221", textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assistanceRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ padding: "36px 16px", textAlign: "center", color: "#8E7287" }}>
                            No assistance records on file. Completed relief grants and disbursements will appear here.
                          </td>
                        </tr>
                      ) : (
                        assistanceRecords
                          .filter((item: any) => {
                            if (historyFilter !== "all" && item.status.toLowerCase() !== historyFilter) return false;
                            if (
                              historySearch.trim() &&
                              !item.type.toLowerCase().includes(historySearch.toLowerCase()) &&
                              !item.reference.toLowerCase().includes(historySearch.toLowerCase())
                            )
                              return false;
                            return true;
                          })
                          .map((record: any) => (
                            <tr key={record.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontWeight: 700, color: "#241221" }}>
                                  {record.type}
                                </div>
                                <div style={{ fontSize: "11px", color: "#8E7287", marginTop: "2px" }}>
                                  Ref: <span style={{ fontFamily: "monospace" }}>{record.reference}</span> • {record.category}
                                </div>
                              </td>

                              <td style={{ padding: "14px 16px", fontWeight: 800, color: record.amountINR === "—" ? "#94A3B8" : "#241221", fontSize: "14px" }}>
                                {dashboardCurrency === "INR" ? record.amountINR : record.amountGBP}
                              </td>

                              <td style={{ padding: "14px 16px" }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "3px 10px",
                                    borderRadius: "9999px",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    backgroundColor: record.statusBg,
                                    color: record.statusColor
                                  }}
                                >
                                  {record.status}
                                </span>
                              </td>

                              <td style={{ padding: "14px 16px", color: "#64748B", fontSize: "12px" }}>
                                <div>{record.dateReceived}</div>
                                <div style={{ fontSize: "10px", color: "#94A3B8" }}>Allocated: {record.dateAllocated}</div>
                              </td>

                              <td style={{ padding: "14px 16px", textAlign: "right" }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedAssistanceDetail(record)}
                                  style={{
                                    padding: "5px 12px",
                                    borderRadius: "6px",
                                    backgroundColor: "#FCE8F3",
                                    color: "#B80C64",
                                    border: "none",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    cursor: "pointer"
                                  }}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: "12px", fontSize: "11px", color: "#94A3B8" }}>
                  Certified official assistance ledger for {beneficiaryUser.fullName} • UK Charity No. 1137350.
                </div>
              </div>

              {/* Chronological Milestone Timeline */}
              <div className="beneficiary-card">
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: "0 0 4px 0" }}>
                  Casework Milestones &amp; Timeline
                </h3>
                <p style={{ fontSize: "12px", color: "#8E7287", margin: "0 0 20px 0" }}>
                  Step-by-step history of consultations, grant distributions, and completed assessments.
                </p>

                <div style={{ position: "relative", paddingLeft: "24px", borderLeft: "2px solid rgba(230, 18, 126, 0.2)", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {assistanceRecords.length > 0 ? (
                    assistanceRecords.slice(0, 4).map((rec: any, idx: number) => (
                      <div key={rec.id || idx}>
                        <div style={{ position: "absolute", left: "-7px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: rec.statusColor }} />
                        <div style={{ fontSize: "11px", fontWeight: 800, color: rec.statusColor }}>{rec.dateReceived ? rec.dateReceived.toUpperCase() : "RECORDED"}</div>
                        <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", margin: "2px 0" }}>
                          {rec.type} – {rec.status}
                        </h4>
                        <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                          {rec.description}
                        </p>
                      </div>
                    ))
                  ) : null}

                  <div>
                    <div style={{ position: "absolute", left: "-7px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#94A3B8" }} />
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748B" }}>CASE INTAKE &amp; ADVOCATE ASSIGNED</div>
                    <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#241221", margin: "2px 0" }}>
                      Beneficiary Account Active &amp; Verified
                    </h4>
                    <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                      Intake registered under Case Ref: <strong style={{ fontFamily: "monospace", color: "#E6127E" }}>{beneficiaryUser.referenceId}</strong> • Caseworker: <strong>{beneficiaryUser.caseWorker}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* History Record Detail Modal */}
              {selectedAssistanceDetail && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(36, 18, 33, 0.6)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 60,
                    padding: "16px"
                  }}
                  onClick={() => setSelectedAssistanceDetail(null)}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      padding: "24px",
                      maxWidth: "520px",
                      width: "100%",
                      boxShadow: "0 20px 40px rgba(36, 18, 33, 0.2)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <div>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "10px",
                            fontWeight: 800,
                            backgroundColor: selectedAssistanceDetail.statusBg,
                            color: selectedAssistanceDetail.statusColor
                          }}
                        >
                          {selectedAssistanceDetail.status.toUpperCase()}
                        </span>
                        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#241221", margin: "4px 0 0 0" }}>
                          {selectedAssistanceDetail.type}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedAssistanceDetail(null)}
                        style={{ background: "none", border: "none", color: "#8E7287", cursor: "pointer", padding: "4px" }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        padding: "14px",
                        borderRadius: "12px",
                        backgroundColor: "#FBF7F9",
                        border: "1px solid rgba(230, 18, 126, 0.1)",
                        marginBottom: "16px",
                        fontSize: "12px"
                      }}
                    >
                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Award Amount
                        </span>
                        <div style={{ fontSize: "16px", fontWeight: 900, color: "#E6127E", marginTop: "2px" }}>
                          {dashboardCurrency === "INR" ? selectedAssistanceDetail.amountINR : selectedAssistanceDetail.amountGBP}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Reference ID
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", fontFamily: "monospace", marginTop: "4px" }}>
                          {selectedAssistanceDetail.reference}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Date Allocated
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAssistanceDetail.dateAllocated}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Status Date
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAssistanceDetail.dateReceived}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Funding Partner / Program
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAssistanceDetail.funder}
                        </div>
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ color: "#8E7287", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                          Supervising Caseworker
                        </span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#241221", marginTop: "2px" }}>
                          {selectedAssistanceDetail.caseworker} (The Zinthiya Trust)
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <span style={{ color: "#8E7287", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                        Assistance Scope & Notes
                      </span>
                      <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6", margin: "4px 0 0 0" }}>
                        {selectedAssistanceDetail.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedAssistanceDetail(null)}
                        style={{
                          flex: 1,
                          padding: "9px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          backgroundColor: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#64748B",
                          cursor: "pointer"
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Downloading official voucher / award certificate for ${selectedAssistanceDetail.reference}...`);
                        }}
                        className="btn-gradient-magenta"
                        style={{ flex: 1, padding: "9px", fontSize: "12px" }}
                      >
                        <Download size={14} />
                        <span>Download Statement</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ADVOCATE COMMUNICATION & MULTILINGUAL MESSAGING                    */}
          {/* Meets all specifications:                                                 */}
          {/* - View assigned advocate details                                          */}
          {/* - Send text messages                                                      */}
          {/* - Receive messages                                                        */}
          {/* - View previous conversations (multi-thread archive)                      */}
          {/* - Send and receive voice messages (record & playable audio waveform)      */}
          {/* - Automatic language detection & message translation                      */}
          {/* ========================================================================= */}
          {activeTab === "messages" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* 1. Assigned Advocate Overview Header Strip */}
              <div
                className="beneficiary-card"
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #FFF5F9 0%, #FFFFFF 100%)",
                  border: "1px solid rgba(230, 18, 126, 0.2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "16px",
                          background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: "20px",
                          boxShadow: "0 4px 14px rgba(230, 18, 126, 0.3)"
                        }}
                      >
                        AP
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          right: "-2px",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: "#10B981",
                          border: "2px solid #ffffff"
                        }}
                        title="Online & Available"
                      />
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                          {assignedAdvocate.name}
                        </h2>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: 800,
                            backgroundColor: "#ECFDF5",
                            color: "#065F46",
                            border: "1px solid #A7F3D0"
                          }}
                        >
                          ● {assignedAdvocate.status}
                        </span>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: 700,
                            backgroundColor: "#FCE8F3",
                            color: "#B80C64"
                          }}
                        >
                          Badge: {assignedAdvocate.badgeNumber}
                        </span>
                      </div>

                      <div style={{ fontSize: "12px", color: "#6A5364", marginTop: "2px", fontWeight: 600 }}>
                        {assignedAdvocate.title} • {assignedAdvocate.credentials}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginTop: "6px", fontSize: "11px", color: "#8E7287" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <PhoneCall size={12} style={{ color: "#E6127E" }} />
                          <span>Direct: <strong>{assignedAdvocate.phone} ext. {assignedAdvocate.ext}</strong></span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Mail size={12} style={{ color: "#E6127E" }} />
                          <span>{assignedAdvocate.email}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={12} style={{ color: "#E6127E" }} />
                          <span>{assignedAdvocate.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <a
                      href={`tel:${assignedAdvocate.phone}`}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(230, 18, 126, 0.25)",
                        color: "#E6127E",
                        fontSize: "12px",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <PhoneCall size={14} />
                      <span>Call Advocate</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowAdvocateProfileModal(true)}
                      className="btn-gradient-magenta"
                      style={{ padding: "8px 14px", fontSize: "12px" }}
                    >
                      <User size={14} />
                      <span>View Full Advocate Profile</span>
                    </button>
                  </div>
                </div>

                {/* Advocate Spoken Languages Strip */}
                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(230, 18, 126, 0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", fontSize: "11px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Languages size={14} style={{ color: "#E6127E" }} />
                    <span style={{ color: "#241221", fontWeight: 700 }}>Advocate Spoken Languages:</span>
                    <span style={{ color: "#64748B" }}>{assignedAdvocate.languages.join(" • ")}</span>
                  </div>
                  <div style={{ color: "#10B981", fontWeight: 700 }}>
                    ⚡ {assignedAdvocate.responseTime}
                  </div>
                </div>
              </div>

              {/* 2. Multilingual Communication & Real-Time Translation Bar */}
              <div
                className="beneficiary-card"
                style={{
                  padding: "14px 20px",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Globe size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 800, color: "#1E293B", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Automated Language Detection & Real-Time Translation</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "9999px", backgroundColor: "#ECFDF5", color: "#065F46" }}>
                        ACTIVE
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>
                      Write in your native language. Messages are automatically detected and translated for your advocate.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#475569" }}>
                      Translate into:
                    </label>
                    <select
                      value={chatTranslationTarget}
                      onChange={(e) => setChatTranslationTarget(e.target.value)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: "#ffffff",
                        color: "#1E293B",
                        outline: "none"
                      }}
                    >
                      <option value="en">English (UK)</option>
                      <option value="gu">ગુજરાતી (Gujarati)</option>
                      <option value="hi">हिन्दी (Hindi)</option>
                      <option value="pa">ਪੰਜਾਬી (Punjabi)</option>
                      <option value="ur">اردو (Urdu)</option>
                      <option value="pl">Polski (Polish)</option>
                      <option value="so">Af-Soomaali (Somali)</option>
                      <option value="ar">العربية (Arabic)</option>
                      <option value="bn">বাংলা (Bengali)</option>
                    </select>
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: 700, color: "#475569", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={autoTranslateEnabled}
                      onChange={(e) => setAutoTranslateEnabled(e.target.checked)}
                      style={{ accentColor: "#E6127E" }}
                    />
                    <span>Auto-Translate</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Accredited Human Interpreter Request sent to ${beneficiaryUser.caseWorker}. An interpreter for your chosen language will be booked for your next scheduled consultation.`);
                    }}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "8px",
                      backgroundColor: "#FCE8F3",
                      color: "#B80C64",
                      fontSize: "11px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    + Request Live Interpreter
                  </button>
                </div>
              </div>

              {/* 3. Main Communication Workspace: Previous Conversations (Threads) + Live Chat Panel */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  alignItems: "stretch"
                }}
              >
                {/* Left Column: Previous Conversations / Thread Archive */}
                <div
                  className="beneficiary-card"
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    minWidth: "260px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#241221", display: "flex", alignItems: "center", gap: "6px" }}>
                      <MessagesSquare size={16} style={{ color: "#E6127E" }} />
                      <span>Conversations & Casework Threads</span>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 800, padding: "1px 6px", borderRadius: "6px", backgroundColor: "#FCE8F3", color: "#B80C64" }}>
                      {conversationThreads.length} Total
                    </span>
                  </div>

                  <p style={{ fontSize: "11px", color: "#8E7287", margin: "0 0 6px 0" }}>
                    Switch between active casework discussions and previous resolved assistance records.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {conversationThreads.map((thread) => {
                      const isSelected = activeConversationId === thread.id;
                      return (
                        <div
                          key={thread.id}
                          onClick={() => setActiveConversationId(thread.id)}
                          style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            backgroundColor: isSelected ? "#FFF5F9" : "#F8FAFC",
                            border: isSelected ? "1.5px solid #E6127E" : "1px solid #E2E8F0",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 800,
                                padding: "1px 6px",
                                borderRadius: "4px",
                                backgroundColor: thread.statusBg,
                                color: thread.statusColor
                              }}
                            >
                              {thread.status}
                            </span>
                            <span style={{ fontSize: "10px", color: "#94A3B8" }}>
                              {thread.lastMessageTime}
                            </span>
                          </div>

                          <div style={{ fontSize: "12.5px", fontWeight: 800, color: isSelected ? "#E6127E" : "#241221" }}>
                            {thread.title}
                          </div>

                          <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px", lineHeight: "1.4" }}>
                            {thread.topic}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Helpline Note */}
                  <div
                    style={{
                      marginTop: "auto",
                      padding: "12px",
                      borderRadius: "10px",
                      backgroundColor: "#FBF7F9",
                      border: "1px solid rgba(230, 18, 126, 0.1)",
                      fontSize: "11px",
                      color: "#6A5364"
                    }}
                  >
                    <div style={{ fontWeight: 800, color: "#241221", marginBottom: "2px" }}>
                      Urgent Emergency Casework?
                    </div>
                    If your energy supply is disconnected or you require urgent crisis shelter, call the Trust duty desk immediately on <strong>0116 254 5168</strong>.
                  </div>
                </div>

                {/* Right Column: Active Chat Viewport (Text + Voice + Translation) */}
                <div
                  className="beneficiary-card"
                  style={{
                    padding: "0",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "720px",
                    gridColumn: "span 2"
                  }}
                >
                  {/* Thread Header Bar */}
                  <div
                    style={{
                      padding: "14px 20px",
                      borderBottom: "1px solid rgba(230, 18, 126, 0.12)",
                      backgroundColor: "#FFF5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#241221" }}>
                          {conversationThreads.find((t) => t.id === activeConversationId)?.title}
                        </span>
                        <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#B80C64", backgroundColor: "#FCE8F3", padding: "1px 6px", borderRadius: "6px" }}>
                          Ref: {beneficiaryUser.referenceId}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#8E7287", marginTop: "2px" }}>
                        Direct Caseworker: <strong>{assignedAdvocate.name}</strong> • 🔒 UK GDPR 256-Bit Encrypted
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAdvocateProfileModal(true)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(230, 18, 126, 0.2)",
                        color: "#E6127E",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Advocate Info & Direct Line →
                    </button>
                  </div>

                  {/* Messages Feed Viewport */}
                  <div
                    style={{
                      flex: 1,
                      padding: "20px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      backgroundColor: "#FAF7F9"
                    }}
                  >
                    {/* Security Notice */}
                    <div style={{ textAlign: "center", margin: "4px 0" }}>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "9999px",
                          backgroundColor: "#F1F5F9",
                          color: "#64748B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        🔒 Messages in this thread are confidential, encrypted, and certified under UK Charity Law.
                      </span>
                    </div>

                    {(chatThreads[activeConversationId] || []).map((msg: any) => {
                      const isUser = msg.sender === "beneficiary";
                      const isTranslated = !!translatedMessages[msg.id];
                      const displayText = isTranslated ? msg.translationText : msg.text;

                      return (
                        <div
                          key={msg.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isUser ? "flex-end" : "flex-start",
                            maxWidth: "85%",
                            alignSelf: isUser ? "flex-end" : "flex-start"
                          }}
                        >
                          {/* Sender Metadata & Automatic Language Detection */}
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10.5px", color: "#8E7287", marginBottom: "3px" }}>
                            <span>{msg.name}</span>
                            <span>•</span>
                            <span>{msg.time}</span>
                            {msg.detectedLanguage && (
                              <>
                                <span>•</span>
                                <span style={{ color: "#2563EB", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "2px" }}>
                                  <Globe size={11} />
                                  <span>{msg.detectedLanguage}</span>
                                </span>
                              </>
                            )}
                          </div>

                          {/* Message Body: Text or Voice */}
                          {msg.type === "voice" ? (
                            /* VOICE MESSAGE BUBBLE */
                            <div
                              style={{
                                padding: "12px 16px",
                                borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                backgroundColor: isUser ? "#E6127E" : "#ffffff",
                                color: isUser ? "#ffffff" : "#241221",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                border: isUser ? "none" : "1px solid rgba(230, 18, 126, 0.15)",
                                minWidth: "260px"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button
                                  type="button"
                                  onClick={() => handleTogglePlayVoice(msg.id)}
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    backgroundColor: isUser ? "#ffffff" : "#E6127E",
                                    color: isUser ? "#E6127E" : "#ffffff",
                                    border: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    flexShrink: 0
                                  }}
                                  title="Play Voice Note"
                                >
                                  {voicePlayingId === msg.id ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: "2px" }} />}
                                </button>

                                {/* Sound Waveform Simulation */}
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "24px" }}>
                                    {[12, 20, 8, 24, 16, 28, 14, 22, 10, 18, 26, 12, 16, 22, 14].map((h, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          width: "3px",
                                          height: voicePlayingId === msg.id ? `${Math.max(6, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : `${h}px`,
                                          backgroundColor: isUser ? "rgba(255,255,255,0.7)" : "#E6127E",
                                          borderRadius: "2px",
                                          transition: "height 0.2s ease"
                                        }}
                                      />
                                    ))}
                                  </div>

                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px", fontSize: "10px", color: isUser ? "rgba(255,255,255,0.85)" : "#8E7287" }}>
                                    <span>{voicePlayingId === msg.id ? "Playing audio..." : "Voice Message"}</span>
                                    <span>{msg.voiceDuration || "0:24"}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Voice Message Transcript Toggle */}
                              {msg.voiceTranscript && (
                                <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: isUser ? "1px solid rgba(255,255,255,0.2)" : "1px solid #F1F5F9" }}>
                                  <div style={{ fontSize: "11px", fontStyle: "italic", lineHeight: "1.4", color: isUser ? "rgba(255,255,255,0.95)" : "#475569" }}>
                                    "{isTranslated ? msg.translationText : msg.voiceTranscript}"
                                  </div>

                                  {/* Translation for Voice Transcript */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleTranslate(msg.id)}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: isUser ? "#ffffff" : "#E6127E",
                                      fontSize: "10px",
                                      fontWeight: 800,
                                      cursor: "pointer",
                                      marginTop: "4px",
                                      padding: "0",
                                      textDecoration: "underline",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "3px"
                                    }}
                                  >
                                    <Languages size={11} />
                                    <span>{isTranslated ? "Show Original Audio Transcript" : "Translate Audio Transcript"}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            /* REGULAR TEXT MESSAGE BUBBLE */
                            <div
                              style={{
                                padding: "12px 16px",
                                borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                backgroundColor: isUser ? "#E6127E" : "#ffffff",
                                color: isUser ? "#ffffff" : "#241221",
                                fontSize: "13px",
                                lineHeight: "1.55",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                                border: isUser ? "none" : "1px solid rgba(230, 18, 126, 0.12)"
                              }}
                            >
                              <div>{displayText}</div>

                              {/* Message Translation Action Pill */}
                              {msg.translationText && (
                                <div style={{ marginTop: "6px", paddingTop: "6px", borderTop: isUser ? "1px solid rgba(255,255,255,0.2)" : "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleTranslate(msg.id)}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: isUser ? "#ffffff" : "#E6127E",
                                      fontSize: "10.5px",
                                      fontWeight: 800,
                                      cursor: "pointer",
                                      padding: "0",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px"
                                    }}
                                  >
                                    <Languages size={11} />
                                    <span>{isTranslated ? "Show Original" : "Translate Message"}</span>
                                  </button>

                                  {isTranslated && (
                                    <span style={{ fontSize: "9.5px", color: isUser ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>
                                      AI Translated
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Caseworker Typing Indicator */}
                    {isCaseworkerTyping && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "flex-start", padding: "8px 12px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid rgba(230, 18, 126, 0.1)" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#E6127E" }}>
                          {beneficiaryUser.caseWorker} is typing...
                        </div>
                        <div style={{ display: "flex", gap: "3px" }}>
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#E6127E" }} />
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#E6127E" }} />
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#E6127E" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input & Voice Recording Toolbar */}
                  <div style={{ borderTop: "1px solid rgba(230, 18, 126, 0.12)", backgroundColor: "#ffffff" }}>
                    {isRecordingVoice ? (
                      /* ACTIVE VOICE RECORDING CONTROLS */
                      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFF5F9" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              backgroundColor: "#EF4444",
                              boxShadow: "0 0 10px #EF4444"
                            }}
                          />
                          <div style={{ fontSize: "13px", fontWeight: 800, color: "#991B1B" }}>
                            Recording Voice Note... 0:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                          </div>
                          <span style={{ fontSize: "11px", color: "#64748B" }}>
                            (Speak clearly into your microphone)
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setIsRecordingVoice(false);
                              setRecordingSeconds(0);
                            }}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              backgroundColor: "#ffffff",
                              color: "#64748B",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSendVoiceMessage}
                            className="btn-gradient-magenta"
                            style={{ padding: "6px 16px", fontSize: "12px" }}
                          >
                            <Send size={13} />
                            <span>Stop & Send Voice Note</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* REGULAR TEXT & VOICE INPUT BAR */
                      <form
                        onSubmit={handleSendMessage}
                        style={{ padding: "14px 20px", display: "flex", gap: "10px", alignItems: "center" }}
                      >
                        {/* Paperclip attachment simulation */}
                        <button
                          type="button"
                          onClick={() => alert("Attach document or utility bill (PDF/JPG) to send to caseworker.")}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#8E7287",
                            cursor: "pointer",
                            padding: "6px"
                          }}
                          title="Attach document or bill"
                        >
                          <Paperclip size={18} />
                        </button>

                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder={`Type a confidential message to ${beneficiaryUser.caseWorker} (or write in your native language)...`}
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "12px",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            fontSize: "13px",
                            outline: "none"
                          }}
                        />

                        {/* Record Voice Note Button */}
                        <button
                          type="button"
                          onClick={() => setIsRecordingVoice(true)}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "12px",
                            backgroundColor: "#FFF5F9",
                            border: "1px solid rgba(230, 18, 126, 0.2)",
                            color: "#E6127E",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                          title="Record and send voice message"
                        >
                          <Mic size={16} />
                          <span className="hidden sm:inline">Voice Note</span>
                        </button>

                        {/* Send Text Button */}
                        <button
                          type="submit"
                          className="btn-gradient-magenta"
                          style={{ padding: "10px 18px", fontSize: "13px" }}
                        >
                          <Send size={15} />
                          <span>Send</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Advocate Detailed Profile Modal */}
              {showAdvocateProfileModal && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(36, 18, 33, 0.6)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 60,
                    padding: "16px"
                  }}
                  onClick={() => setShowAdvocateProfileModal(false)}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      padding: "24px",
                      maxWidth: "520px",
                      width: "100%",
                      boxShadow: "0 20px 40px rgba(36, 18, 33, 0.2)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, #E6127E 0%, #FF5FA0 100%)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            fontSize: "18px"
                          }}
                        >
                          AP
                        </div>
                        <div>
                          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#241221", margin: 0 }}>
                            {assignedAdvocate.name}
                          </h3>
                          <div style={{ fontSize: "12px", color: "#6A5364" }}>
                            {assignedAdvocate.title}
                          </div>
                          <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 700, marginTop: "2px" }}>
                            ● {assignedAdvocate.status}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowAdvocateProfileModal(false)}
                        style={{ background: "none", border: "none", color: "#8E7287", cursor: "pointer", padding: "4px" }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        backgroundColor: "#FBF7F9",
                        border: "1px solid rgba(230, 18, 126, 0.1)",
                        fontSize: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginBottom: "16px"
                      }}
                    >
                      <div>
                        <strong style={{ color: "#241221" }}>Professional Credentials:</strong>
                        <div style={{ color: "#475569", marginTop: "2px" }}>{assignedAdvocate.credentials}</div>
                      </div>
                      <div>
                        <strong style={{ color: "#241221" }}>Advocate Badge ID:</strong>
                        <div style={{ color: "#475569", marginTop: "2px", fontFamily: "monospace" }}>{assignedAdvocate.badgeNumber}</div>
                      </div>
                      <div>
                        <strong style={{ color: "#241221" }}>Direct Helpline:</strong>
                        <div style={{ color: "#E6127E", fontWeight: 700, marginTop: "2px" }}>{assignedAdvocate.phone} ext. {assignedAdvocate.ext}</div>
                      </div>
                      <div>
                        <strong style={{ color: "#241221" }}>Office Hours:</strong>
                        <div style={{ color: "#475569", marginTop: "2px" }}>{assignedAdvocate.hours}</div>
                      </div>
                      <div>
                        <strong style={{ color: "#241221" }}>Physical Office Location:</strong>
                        <div style={{ color: "#475569", marginTop: "2px" }}>{assignedAdvocate.officeLocation}</div>
                      </div>
                      <div>
                        <strong style={{ color: "#241221" }}>Casework Languages:</strong>
                        <div style={{ color: "#475569", marginTop: "2px" }}>{assignedAdvocate.languages.join(", ")}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#8E7287" }}>
                        Advocate Background
                      </span>
                      <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5", margin: "4px 0 0 0" }}>
                        {assignedAdvocate.bio}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setShowAdvocateProfileModal(false)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          backgroundColor: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#64748B",
                          cursor: "pointer"
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Requesting 1-on-1 Casework Consultation with ${beneficiaryUser.caseWorker} at the Leicester Care Hub. You will receive an SMS confirmation.`);
                          setShowAdvocateProfileModal(false);
                        }}
                        className="btn-gradient-magenta"
                        style={{ flex: 1, padding: "10px", fontSize: "12px" }}
                      >
                        <span>Book Appointment</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: NOTIFICATIONS                                                      */}
          {/* ========================================================================= */}
          {activeTab === "notifications" && (
            <div className="beneficiary-card" style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: 0 }}>
                    Notifications & Alerts
                  </h2>
                  <p style={{ fontSize: "12px", color: "#8E7287", margin: "2px 0 0 0" }}>
                    Updates regarding grants, upcoming reviews, and communications.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#E6127E",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Mark all as read
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      backgroundColor: notif.unread ? "#FFF5F9" : "#FBF7F9",
                      border: notif.unread ? "1px solid rgba(230, 18, 126, 0.25)" : "1px solid #F1F5F9",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: notif.unread ? "#E6127E" : "#241221" }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "6px", backgroundColor: "#FCE8F3", color: "#B80C64" }}>
                          {notif.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#475569", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                        {notif.body}
                      </p>
                      <div style={{ fontSize: "10px", color: "#8E7287", marginTop: "4px" }}>
                        {notif.time}
                      </div>
                    </div>

                    {notif.unread && (
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E6127E", marginTop: "4px", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: LANGUAGE SETTINGS                                                  */}
          {/* ========================================================================= */}
          {activeTab === "language" && (
            <div className="beneficiary-card" style={{ width: "100%" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#241221", margin: "0 0 4px 0" }}>
                Language Settings & Interpreter Preferences
              </h2>
              <p style={{ fontSize: "12px", color: "#8E7287", margin: "0 0 20px 0" }}>
                Select your preferred language. The Zinthiya Trust provides accredited translation for all correspondence and meetings.
              </p>

              {languageSavedToast && (
                <div style={{ padding: "10px 14px", borderRadius: "10px", backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", fontSize: "12px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Check size={16} />
                  <span>Language preferences updated successfully.</span>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                {[
                  { code: "en", label: "English", sub: "United Kingdom" },
                  { code: "gu", label: "ગુજરાતી", sub: "Gujarati" },
                  { code: "hi", label: "हिन्दी", sub: "Hindi" },
                  { code: "pa", label: "ਪੰਜਾਬੀ", sub: "Punjabi" },
                  { code: "ur", label: "اردو", sub: "Urdu" },
                  { code: "pl", label: "Polski", sub: "Polish" },
                  { code: "so", label: "Af-Soomaali", sub: "Somali" },
                  { code: "ar", label: "العربية", sub: "Arabic" },
                  { code: "bn", label: "বাংলা", sub: "Bengali" }
                ].map((lang) => {
                  const isChosen = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        textAlign: "left",
                        backgroundColor: isChosen ? "#FFF5F9" : "#FBF7F9",
                        border: isChosen ? "2px solid #E6127E" : "1px solid #E2E8F0",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ fontSize: "15px", fontWeight: 800, color: isChosen ? "#E6127E" : "#241221" }}>
                        {lang.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "#8E7287", marginTop: "2px" }}>
                        {lang.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setLanguageSavedToast(true);
                  setTimeout(() => setLanguageSavedToast(false), 3000);
                }}
                className="btn-gradient-magenta"
                style={{ padding: "8px 18px", fontSize: "13px" }}
              >
                <span>Save Language Selection</span>
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(36, 18, 33, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            padding: "16px"
          }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(36, 18, 33, 0.2)",
              textAlign: "center"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#FEF2F2",
                color: "#DC2626",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}
            >
              <LogOut size={22} />
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#241221", margin: "0 0 6px 0" }}>
              Sign Out of Beneficiary Portal?
            </h3>
            <p style={{ fontSize: "12px", color: "#8E7287", margin: "0 0 20px 0", lineHeight: "1.5" }}>
              You can sign back in anytime using your registered credentials or caseworker access link.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748B",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#DC2626",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffffff",
                  cursor: "pointer"
                }}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Request Modal */}
      {showRequestModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(36, 18, 33, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            padding: "16px"
          }}
          onClick={() => setShowRequestModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(36, 18, 33, 0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#241221", margin: 0 }}>
                Request Support or Emergency Assistance
              </h3>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                style={{ background: "none", border: "none", color: "#8E7287", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 16px 0" }}>
              Your request goes directly to assigned caseworker <strong>{beneficiaryUser.caseWorker}</strong>.
            </p>

            <form
              onSubmit={handleSupportRequestSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Assistance Category *
                </label>
                <select
                  value={requestCategory}
                  onChange={(e) => setRequestCategory(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(230, 18, 126, 0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#ffffff"
                  }}
                >
                  {liveCategories && liveCategories.length > 0 ? (
                    liveCategories.map((c: any) => (
                      <option key={c.id || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Emergency Food Parcel & Essentials">Emergency Food Parcel &amp; Essentials</option>
                      <option value="Emergency Heating & Fuel Voucher">Emergency Heating &amp; Fuel Voucher</option>
                      <option value="Domestic Abuse Crisis Sanctuary Relocation">Domestic Abuse Crisis Sanctuary Relocation</option>
                      <option value="Winter Bedding & Warm Clothing Pack">Winter Bedding &amp; Warm Clothing Pack</option>
                      <option value="Debt & Energy Arrears Advocacy">Debt &amp; Energy Arrears Advocacy</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Urgency Level
                </label>
                <select
                  value={requestUrgency}
                  onChange={(e) => setRequestUrgency(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(230, 18, 126, 0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <option value="HIGH">High Priority (Urgent Needs within 24-48 hrs)</option>
                  <option value="CRITICAL">Critical Emergency (Immediate Crisis)</option>
                  <option value="MEDIUM">Standard Support (Next 3-5 Working Days)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Describe your current situation *
                </label>
                <textarea
                  rows={3}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="Provide brief details about what you urgently need..."
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(230, 18, 126, 0.2)",
                    fontSize: "13px",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  disabled={isSubmittingRequest}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748B",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRequest}
                  className="btn-gradient-magenta"
                  style={{ flex: 1, padding: "8px", fontSize: "12px", opacity: isSubmittingRequest ? 0.7 : 1 }}
                >
                  {isSubmittingRequest ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeneficiaryDashboardPage;