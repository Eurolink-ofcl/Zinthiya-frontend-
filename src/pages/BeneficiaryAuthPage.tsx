import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  HeartHandshake,
  ShieldCheck,
  Check,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  PhoneCall,
  FileText,
  Info,
  Building2,
  UploadCloud,
  Plus,
  RefreshCw,
  Clock,
  Calendar,
  MapPin,
  Users
} from "../components/Icons";
import { api } from "../lib/api";

function ZinthiyaLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 160"
      style={{ height: "36px", width: "auto" }}
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
          x="140"
          y="118"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="22"
          fill="#8E7287"
          letterSpacing="4"
        >
          TRUST
        </text>
      </g>
    </svg>
  );
}

export type BeneficiaryAuthMode = "login" | "register" | "forgot" | "reset";

export function BeneficiaryAuthPage({ initialMode = "login" }: { initialMode?: BeneficiaryAuthMode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlMode = searchParams.get("mode") as BeneficiaryAuthMode | null;
  const [mode, setMode] = useState<BeneficiaryAuthMode>(urlMode || initialMode);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingApprovalNotice, setPendingApprovalNotice] = useState("");
  const [portalAccessDisabledNotice, setPortalAccessDisabledNotice] = useState("");

  // Portal disabled status
  const [portalDisabledByAdmin, setPortalDisabledByAdmin] = useState(false);

  // =========================================================================
  // PUBLIC BENEFICIARY REGISTRATION (Exact Same Fields as Admin Creation)
  // =========================================================================
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4>(1);
  const [regType, setRegType] = useState<"INDIVIDUAL" | "ORGANISATION">("INDIVIDUAL");

  // Individual Registration Fields
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regDob, setRegDob] = useState("");
  const [regGender, setRegGender] = useState("Female");
  const [regLanguage, setRegLanguage] = useState("English");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("Leicester");
  const [regPostcode, setRegPostcode] = useState("");
  const [regEmergencyContact, setRegEmergencyContact] = useState("");
  const [regHouseholdSize, setRegHouseholdSize] = useState<number | string>(1);

  // Organisation Registration Fields
  const [regOrgName, setRegOrgName] = useState("");
  const [regOrgType, setRegOrgType] = useState("Registered Charity");
  const [regOrgRegNumber, setRegOrgRegNumber] = useState("");
  const [regOrgReach, setRegOrgReach] = useState<number | string>(50);
  const [regOrgContactPerson, setRegOrgContactPerson] = useState("");
  const [regOrgContactRole, setRegOrgContactRole] = useState("Community Coordinator");
  const [regOrgEmail, setRegOrgEmail] = useState("");
  const [regOrgPassword, setRegOrgPassword] = useState("");
  const [regOrgConfirmPassword, setRegOrgConfirmPassword] = useState("");
  const [showOrgRegPassword, setShowOrgRegPassword] = useState(false);
  const [regOrgPhone, setRegOrgPhone] = useState("");
  const [regOrgAddress, setRegOrgAddress] = useState("");
  const [regOrgPostcode, setRegOrgPostcode] = useState("");
  const [regOrgDescription, setRegOrgDescription] = useState("");

  // Support Needs & Documents (Step 3)
  const [supportCategories, setSupportCategories] = useState<any[]>([]);
  const [regSupportCategory, setRegSupportCategory] = useState("");
  const [regUrgency, setRegUrgency] = useState("HIGH");
  const [regReason, setRegReason] = useState("");
  const [regAssistanceDescription, setRegAssistanceDescription] = useState("");
  const [regSupportingDocsNote, setRegSupportingDocsNote] = useState("");
  const [regUploadedFiles, setRegUploadedFiles] = useState<Array<{ id: string; name: string; size: string; type: string; dataUrl?: string }>>([]);

  // Consent & Submission Result (Step 4)
  const [regConsentGdpr, setRegConsentGdpr] = useState(false);
  const [submittedAppResult, setSubmittedAppResult] = useState<{
    referenceId: string;
    fullName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      setSuccessMessage("You have been securely signed out. All session credentials cleared.");
    }
    const disabledState = localStorage.getItem("zinthiya_beneficiary_portal_disabled");
    if (disabledState === "true") {
      setPortalDisabledByAdmin(true);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await api.getSupportCategoriesAdmin();
        const validCats = Array.isArray(cats) ? cats : [];
        if (validCats.length > 0) {
          setSupportCategories(validCats);
          setRegSupportCategory(validCats[0].name);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    fetchCategories();
  }, []);

  // Multiple File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result as string;
        const formattedSize = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
        const newDoc = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          size: formattedSize,
          type: file.type || "Document",
          dataUrl,
        };
        setRegUploadedFiles((prev) => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (docId: string) => {
    setRegUploadedFiles((prev) => prev.filter((d) => d.id !== docId));
  };

  // Step Validation for Registration Wizard
  const handleNextStep = () => {
    setErrorMessage("");
    if (regStep === 1) {
      setRegStep(2);
      return;
    }
    if (regStep === 2) {
      if (regType === "INDIVIDUAL") {
        if (!regFirstName.trim() || !regLastName.trim()) {
          setErrorMessage("Please enter both first name and last name.");
          return;
        }
        if (!regEmail.trim() || !regEmail.includes("@")) {
          setErrorMessage("Please enter a valid email address.");
          return;
        }
        if (!regPassword || regPassword.length < 6) {
          setErrorMessage("Please choose a password with at least 6 characters.");
          return;
        }
        if (regPassword !== regConfirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
      } else {
        if (!regOrgName.trim()) {
          setErrorMessage("Please enter the organisation name.");
          return;
        }
        if (!regOrgContactPerson.trim()) {
          setErrorMessage("Please enter the primary contact person's name.");
          return;
        }
        if (!regOrgEmail.trim() || !regOrgEmail.includes("@")) {
          setErrorMessage("Please enter a valid contact email address.");
          return;
        }
        if (!regOrgPassword || regOrgPassword.length < 6) {
          setErrorMessage("Please choose a password with at least 6 characters.");
          return;
        }
        if (regOrgPassword !== regOrgConfirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
      }
      setRegStep(3);
      return;
    }
    if (regStep === 3) {
      if (!regReason.trim() && !regAssistanceDescription.trim()) {
        setErrorMessage("Please provide details of the assistance or support requested.");
        return;
      }
      setRegStep(4);
    }
  };

  // 1. Submit Registration Form
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setPendingApprovalNotice("");

    if (!regConsentGdpr) {
      setErrorMessage("Please accept the declaration and GDPR consent checkbox before submitting.");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        beneficiaryType: regType,
        uploadedDocuments: regUploadedFiles,
        supportCategory: regSupportCategory,
        initialService: regSupportCategory,
        initialUrgency: regUrgency,
        reasonForSupport: regReason.trim(),
        assistanceDescription: regAssistanceDescription.trim(),
        supportingDocsNote: regSupportingDocsNote.trim(),
      };

      if (regType === "INDIVIDUAL") {
        payload.firstName = regFirstName.trim();
        payload.lastName = regLastName.trim();
        payload.fullName = `${regFirstName.trim()} ${regLastName.trim()}`;
        payload.email = regEmail.trim().toLowerCase();
        payload.password = regPassword.trim();
        payload.phoneNumber = regPhone.trim() || undefined;
        payload.dob = regDob || undefined;
        payload.gender = regGender;
        payload.preferredLanguage = regLanguage;
        payload.address = regAddress.trim() || undefined;
        payload.townCity = regCity.trim() || "Leicester";
        payload.postcode = regPostcode.trim() || undefined;
        payload.emergencyContact = regEmergencyContact.trim() || undefined;
        payload.householdSize = Number(regHouseholdSize) || 1;
      } else {
        payload.organisationName = regOrgName.trim();
        payload.organisationType = regOrgType;
        payload.registrationNumber = regOrgRegNumber.trim() || undefined;
        payload.beneficiaryReach = Number(regOrgReach) || 50;
        payload.contactPersonName = regOrgContactPerson.trim();
        payload.contactRole = regOrgContactRole.trim();
        payload.contactEmail = regOrgEmail.trim().toLowerCase();
        payload.contactPhone = regOrgPhone.trim() || undefined;
        payload.fullName = regOrgName.trim();
        payload.email = regOrgEmail.trim().toLowerCase();
        payload.password = regOrgPassword.trim();
        payload.phoneNumber = regOrgPhone.trim() || undefined;
        payload.address = regOrgAddress.trim() || undefined;
        payload.townCity = "Leicester";
        payload.postcode = regOrgPostcode.trim() || undefined;
        payload.orgDescription = regOrgDescription.trim() || undefined;
        payload.householdSize = Number(regOrgReach) || 50;
      }

      const res = await api.registerBeneficiary(payload);

      setSubmittedAppResult({
        referenceId: res.data?.referenceId || `ZT-BEN-${Date.now().toString().slice(-5)}`,
        fullName: res.data?.fullName || (regType === "INDIVIDUAL" ? `${regFirstName} ${regLastName}` : regOrgName),
        email: res.data?.email || (regType === "INDIVIDUAL" ? regEmail : regOrgEmail),
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Login Form
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setPendingApprovalNotice("");
    setPortalAccessDisabledNotice("");

    const effectiveEmail = loginEmail.trim();
    if (!effectiveEmail || !loginPassword) {
      setErrorMessage("Please enter both email address and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.login({
        email: effectiveEmail,
        password: loginPassword,
        portal: "beneficiary",
      });

      if (res.data?.auth?.accessToken) {
        if (res.data?.user && res.data.user.role !== "BENEFICIARY") {
          setLoading(false);
          if (res.data.user.role === "DONOR") {
            setErrorMessage("Access Denied: Donor accounts cannot log into the Beneficiary Portal. Please sign in via the Donor Portal (/login).");
          } else {
            setErrorMessage("Access Denied: Staff accounts must sign in via the Admin Portal (/admin/login).");
          }
          return;
        }

        localStorage.setItem("beneficiary_token", res.data.auth.accessToken);
        localStorage.setItem("beneficiary_email", effectiveEmail);
        if (res.data?.user) {
          localStorage.setItem("beneficiary_user", JSON.stringify(res.data.user));
        }
        navigate("/beneficiary/dashboard");
      } else {
        setErrorMessage("Unexpected login response. Please try again.");
      }
    } catch (err: any) {
      const msg = err?.data?.message || err.message || "";
      const errCode = err?.data?.error || err.error || "";
      if (errCode === "WrongPortalAccess" || msg.includes("Access Denied")) {
        setErrorMessage(msg);
      } else if (
        errCode === "PortalAccessDisabled" ||
        msg.toLowerCase().includes("portal access") ||
        msg.toLowerCase().includes("cannot sign in") ||
        msg.toLowerCase().includes("disabled by administrator")
      ) {
        setPortalAccessDisabledNotice(
          msg ||
          "Beneficiary portal access is currently disabled for this account. You cannot sign in to the Beneficiary Portal. Please contact The Zinthiya Trust team at info@zinthiyatrust.org or 0116 254 5168."
        );
      } else if (
        msg.toLowerCase().includes("under review") ||
        msg.toLowerCase().includes("approves") ||
        errCode === "AccountPendingApproval" ||
        err.statusCode === 403 ||
        err.status === 403
      ) {
        setPendingApprovalNotice(
          "Your application is currently under review by the Zinthiya Trust team. You will be able to log in once an administrator approves your application."
        );
      } else {
        setErrorMessage(msg || "Invalid email or password. Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Password reset instructions have been dispatched to your email address.");
      setTimeout(() => {
        setMode("reset");
        setSuccessMessage("");
      }, 1200);
    }, 400);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Password updated successfully! You may now sign in.");
      setTimeout(() => {
        setMode("login");
        setSuccessMessage("");
      }, 1200);
    }, 400);
  };

  return (
    <div
      style={{
        backgroundColor: "#FBF7F9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#241221",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after, html, body, button, input, select, textarea {
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        .auth-card {
          background-color: #ffffff;
          border: 1px solid rgba(230, 18, 126, 0.12);
          border-radius: 1.5rem;
          padding: 2.25rem 2rem;
          box-shadow: 0 10px 35px rgba(36, 18, 33, 0.05);
          width: 100%;
          margin: 0 auto;
        }

        .auth-input {
          width: 100%;
          height: 48px;
          min-height: 48px;
          padding: 0 16px 0 42px;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-size: 14px;
          color: #0F172A;
          background-color: #FFFFFF;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .auth-input:focus {
          border-color: #E6127E !important;
          box-shadow: 0 0 0 3px rgba(230, 18, 126, 0.15) !important;
        }

        .form-control-48 {
          width: 100%;
          height: 48px;
          min-height: 48px;
          padding: 0 16px;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-size: 14px;
          color: #0F172A;
          background-color: #FFFFFF;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .form-control-48:focus {
          border-color: #E6127E !important;
          box-shadow: 0 0 0 3px rgba(230, 18, 126, 0.15) !important;
        }

        .btn-gradient-magenta {
          background: linear-gradient(90deg, #E6127E 0%, #FF5FA0 100%);
          color: #ffffff;
          font-weight: 800;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(230, 18, 126, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.5rem;
          cursor: pointer;
          border: none;
          width: 100%;
          font-size: 0.9375rem;
        }

        .btn-gradient-magenta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(230, 18, 126, 0.4);
        }
      `}</style>

      {/* Top Header */}
      <header
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(230, 18, 126, 0.08)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Link to="/" title="The Zinthiya Trust Homepage">
          <ZinthiyaLogo />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 800,
              backgroundColor: "#FCE8F3",
              color: "#B80C64",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <HeartHandshake size={14} />
            BENEFICIARY PORTAL
          </span>
          <Link
            to="/"
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#64748B",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <ArrowLeft size={13} />
            Back to Website
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: "40px 16px", display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
        {portalDisabledByAdmin ? (
          <div className="auth-card" style={{ maxWidth: "480px", textAlign: "center" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#FEF2F2",
                color: "#DC2626",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <AlertCircle size={28} />
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#241221", margin: "0 0 8px 0" }}>
              Beneficiary Portal Temporarily Paused
            </h2>
            <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.6", margin: "0 0 20px 0" }}>
              The online client portal has been paused for routine casework updates. For urgent crisis support, call our duty team at <strong>0116 254 5168</strong>.
            </p>
            <Link to="/" style={{ fontSize: "13px", fontWeight: 700, color: "#E6127E", textDecoration: "none" }}>
              ← Return to Homepage
            </Link>
          </div>
        ) : (
          <div
            className="auth-card"
            style={{
              maxWidth: mode === "register" ? "860px" : "480px",
              transition: "max-width 0.3s ease",
            }}
          >
            {/* Header with Title and Mode Switcher */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#FCE8F3",
                  color: "#E6127E",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                {mode === "login" && <Lock size={22} />}
                {mode === "register" && <User size={22} />}
                {mode === "forgot" && <Mail size={22} />}
                {mode === "reset" && <ShieldCheck size={22} />}
              </div>

              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#241221", margin: "0 0 6px 0" }}>
                {mode === "login" && "Beneficiary Portal Login"}
                {mode === "register" && "Register for Support / Create Account"}
                {mode === "forgot" && "Reset Your Password"}
                {mode === "reset" && "Create New Password"}
              </h1>

              <p style={{ fontSize: "12px", color: "#8E7287", margin: 0, lineHeight: "1.5" }}>
                {mode === "login" && "Access your assistance awards, advocate messages, and support records."}
                {mode === "register" && "Complete your intake application for food, heating, refuge, debt or welfare support."}
                {mode === "forgot" && "Enter your registered email to receive secure reset instructions."}
                {mode === "reset" && "Choose a secure password with at least 8 characters."}
              </p>

              {/* Mode Switch Tabs (Login / Register) */}
              {(mode === "login" || mode === "register") && !submittedAppResult && (
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#F1F5F9",
                    borderRadius: "12px",
                    padding: "4px",
                    marginTop: "20px",
                    maxWidth: "380px",
                    margin: "20px auto 0 auto",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage("");
                      setSuccessMessage("");
                      setPendingApprovalNotice("");
                      setPortalAccessDisabledNotice("");
                    }}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "9px",
                      fontSize: "12px",
                      fontWeight: mode === "login" ? 800 : 600,
                      backgroundColor: mode === "login" ? "#ffffff" : "transparent",
                      color: mode === "login" ? "#E6127E" : "#64748B",
                      border: "none",
                      boxShadow: mode === "login" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMessage("");
                      setSuccessMessage("");
                      setPendingApprovalNotice("");
                      setPortalAccessDisabledNotice("");
                    }}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "9px",
                      fontSize: "12px",
                      fontWeight: mode === "register" ? 800 : 600,
                      backgroundColor: mode === "register" ? "#ffffff" : "transparent",
                      color: mode === "register" ? "#E6127E" : "#64748B",
                      border: "none",
                      boxShadow: mode === "register" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    Apply for Support
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#991B1B",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Portal Access Disabled Banner */}
            {portalAccessDisabledNotice && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  backgroundColor: "#FEF2F2",
                  border: "1.5px solid #FECACA",
                  color: "#991B1B",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Lock size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14px", color: "#991B1B" }}>
                    Beneficiary Portal Access Disabled
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    {portalAccessDisabledNotice}
                  </div>
                </div>
              </div>
            )}

            {/* Pending Approval Callout (When unapproved beneficiary tries to login) */}
            {pendingApprovalNotice && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  backgroundColor: "#FFFBEB",
                  border: "1.5px solid #FDE68A",
                  color: "#92400E",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14px", color: "#78350F" }}>
                    Application Under Administrator Review
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    {pendingApprovalNotice}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  color: "#065F46",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Check size={18} className="flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* =================================================================== */}
            {/* 1. LOGIN FORM                                                       */}
            {/* =================================================================== */}
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. sarah.jenkins@example.org"
                      required
                      className="auth-input"
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      style={{ background: "none", border: "none", fontSize: "11px", fontWeight: 700, color: "#E6127E", cursor: "pointer" }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="auth-input"
                      style={{ paddingRight: "44px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#475569" }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: "#E6127E" }}
                    />
                    <span>Remember this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gradient-magenta"
                  style={{ marginTop: "6px", height: "48px" }}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Beneficiary Portal</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* =================================================================== */}
            {/* 2. REGISTRATION VIEW: Confirmation or 4-Step Form                   */}
            {/* =================================================================== */}
            {mode === "register" && (
              <>
                {submittedAppResult ? (
                  /* Confirmation Screen After Self-Registration */
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        backgroundColor: "#ECFDF5",
                        color: "#059669",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Check size={32} />
                    </div>

                    <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0" }}>
                      Application Submitted Successfully!
                    </h2>

                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        borderRadius: "9999px",
                        backgroundColor: "#FDF2F8",
                        border: "1px solid #FBCFE8",
                        color: "#BE185D",
                        fontSize: "13px",
                        fontWeight: 800,
                        fontFamily: "monospace",
                        marginBottom: "20px",
                      }}
                    >
                      Case Reference: {submittedAppResult.referenceId}
                    </div>

                    <div
                      style={{
                        padding: "20px",
                        borderRadius: "16px",
                        backgroundColor: "#FFFBEB",
                        border: "1.5px solid #FDE68A",
                        textAlign: "left",
                        marginBottom: "24px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <Clock size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div style={{ fontSize: "13px", color: "#92400E", lineHeight: "1.6" }}>
                          <strong style={{ display: "block", color: "#78350F", fontSize: "14px", marginBottom: "4px" }}>
                            Your application is now under review by the Zinthiya Trust team.
                          </strong>
                          An intake caseworker will triage your request and verify your supporting documents. Once an administrator approves your application, your portal access will be activated and you will be able to log in with your email (<strong>{submittedAppResult.email}</strong>) and chosen password.
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedAppResult(null);
                        setMode("login");
                        setLoginEmail(submittedAppResult.email);
                      }}
                      className="btn-gradient-magenta"
                      style={{ height: "48px", maxWidth: "320px", margin: "0 auto" }}
                    >
                      <span>Proceed to Sign In</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  /* 4-Step Registration Wizard */
                  <div>
                    {/* Step Progress Bar */}
                    <div style={{ marginBottom: "24px" }}>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { num: 1, label: "Step 1", title: "Beneficiary Type" },
                          { num: 2, label: "Step 2", title: "Basic Information" },
                          { num: 3, label: "Step 3", title: "Support Needs" },
                          { num: 4, label: "Step 4", title: "Review & Submit" },
                        ].map((s) => {
                          const isActive = regStep === s.num;
                          const isDone = regStep > s.num;
                          return (
                            <div
                              key={s.num}
                              onClick={() => setRegStep(s.num as any)}
                              className="cursor-pointer group transition-transform active:scale-95"
                              title={`Click to view ${s.label}: ${s.title}`}
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  height: "4px",
                                  borderRadius: "9999px",
                                  backgroundColor: isActive || isDone ? "#E6127E" : "#E2E8F0",
                                  transition: "all 0.25s ease",
                                  marginBottom: "8px",
                                  boxShadow: isActive ? "0 2px 8px rgba(230, 18, 126, 0.45)" : "none",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "12px",
                                  fontWeight: isActive ? 800 : isDone ? 700 : 500,
                                  color: isActive ? "#E6127E" : isDone ? "#0F172A" : "#94A3B8",
                                }}
                              >
                                {s.label}
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
                                {s.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        if (regStep < 4) {
                          e.preventDefault();
                          handleNextStep();
                        } else {
                          handleRegisterSubmit(e);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
                          e.preventDefault();
                          if (regStep < 4) {
                            handleNextStep();
                          }
                        }
                      }}
                      className="space-y-6"
                    >
                      {/* ============================================================== */}
                      {/* STEP 1: BENEFICIARY TYPE SELECTION                             */}
                      {/* ============================================================== */}
                      {regStep === 1 && (
                        <div className="space-y-4 py-1">
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                              Step 1 – Select Beneficiary Type
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Choose whether you are registering as an individual/family or on behalf of a partner organisation.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {/* Individual Card */}
                            <div
                              onClick={() => setRegType("INDIVIDUAL")}
                              style={{
                                padding: "20px 24px",
                                borderRadius: "16px",
                                border: regType === "INDIVIDUAL" ? "2px solid #E6127E" : "1.5px solid #E2E8F0",
                                backgroundColor: regType === "INDIVIDUAL" ? "#FFF5F9" : "#ffffff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s ease",
                                boxShadow: regType === "INDIVIDUAL" ? "0 4px 14px rgba(230,18,126,0.15)" : "none",
                              }}
                            >
                              <div
                                style={{
                                  width: "46px",
                                  height: "46px",
                                  borderRadius: "14px",
                                  backgroundColor: regType === "INDIVIDUAL" ? "#E6127E" : "#F1F5F9",
                                  color: regType === "INDIVIDUAL" ? "#ffffff" : "#64748B",
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
                                  A person or family applying for crisis support, food, heating or advocacy.
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  border: regType === "INDIVIDUAL" ? "6px solid #E6127E" : "2px solid #CBD5E1",
                                  backgroundColor: "#ffffff",
                                  flexShrink: 0,
                                }}
                              />
                            </div>

                            {/* Organisation Card */}
                            <div
                              onClick={() => setRegType("ORGANISATION")}
                              style={{
                                padding: "20px 24px",
                                borderRadius: "16px",
                                border: regType === "ORGANISATION" ? "2px solid #4F46E5" : "1.5px solid #E2E8F0",
                                backgroundColor: regType === "ORGANISATION" ? "#F5F3FF" : "#ffffff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s ease",
                                boxShadow: regType === "ORGANISATION" ? "0 4px 14px rgba(79,70,229,0.15)" : "none",
                              }}
                            >
                              <div
                                style={{
                                  width: "46px",
                                  height: "46px",
                                  borderRadius: "14px",
                                  backgroundColor: regType === "ORGANISATION" ? "#4F46E5" : "#F1F5F9",
                                  color: regType === "ORGANISATION" ? "#ffffff" : "#64748B",
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
                                  A school, community hub, refuge shelter, or registered charity partner.
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  border: regType === "ORGANISATION" ? "6px solid #4F46E5" : "2px solid #CBD5E1",
                                  backgroundColor: "#ffffff",
                                  flexShrink: 0,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ============================================================== */}
                      {/* STEP 2: BASIC & CONTACT INFORMATION (48px Heights)             */}
                      {/* ============================================================== */}
                      {regStep === 2 && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                              Step 2 – Basic &amp; Contact Information
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {regType === "INDIVIDUAL"
                                ? "Enter your personal details and set your portal login credentials."
                                : "Enter organisation details and primary representative contact information."}
                            </p>
                          </div>

                          {regType === "INDIVIDUAL" ? (
                            <div className="space-y-4">
                              {/* Names */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">First name *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Fatima"
                                    value={regFirstName}
                                    onChange={(e) => setRegFirstName(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Last name *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Begum"
                                    value={regLastName}
                                    onChange={(e) => setRegLastName(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              {/* Email & Phone */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email address (For Portal Login) *</label>
                                  <input
                                    type="email"
                                    required
                                    placeholder="e.g. fatima@example.com"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / mobile number</label>
                                  <input
                                    type="tel"
                                    placeholder="e.g. 07700 900888"
                                    value={regPhone}
                                    onChange={(e) => setRegPhone(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              {/* Password & Confirm Password */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Create Login Password (6+ chars) *</label>
                                  <div style={{ position: "relative" }}>
                                    <input
                                      type={showRegPassword ? "text" : "password"}
                                      required
                                      placeholder="••••••••••••"
                                      value={regPassword}
                                      onChange={(e) => setRegPassword(e.target.value)}
                                      className="form-control-48"
                                      style={{ paddingRight: "44px" }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowRegPassword(!showRegPassword)}
                                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#94A3B8", cursor: "pointer" }}
                                    >
                                      {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password *</label>
                                  <input
                                    type={showRegPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••••••"
                                    value={regConfirmPassword}
                                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              {/* DOB, Gender, Language */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of birth</label>
                                  <input
                                    type="date"
                                    value={regDob}
                                    onChange={(e) => setRegDob(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                                  <select
                                    value={regGender}
                                    onChange={(e) => setRegGender(e.target.value)}
                                    className="form-control-48"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred language</label>
                                  <select
                                    value={regLanguage}
                                    onChange={(e) => setRegLanguage(e.target.value)}
                                    className="form-control-48"
                                    style={{ cursor: "pointer" }}
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

                              {/* Address */}
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Street address / refuge shelter</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 24 London Road"
                                  value={regAddress}
                                  onChange={(e) => setRegAddress(e.target.value)}
                                  className="form-control-48"
                                />
                              </div>

                              {/* TownCity & Postcode */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Town / City</label>
                                  <input
                                    type="text"
                                    value={regCity}
                                    onChange={(e) => setRegCity(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Postcode</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. LE2 0AA"
                                    value={regPostcode}
                                    onChange={(e) => setRegPostcode(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              {/* Emergency Contact & Household Size */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency contact (ICE: Name &amp; Phone)</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Zaid Begum (Son) - 07700 901234"
                                    value={regEmergencyContact}
                                    onChange={(e) => setRegEmergencyContact(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Household size (dependants)</label>
                                  <input
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={regHouseholdSize}
                                    onChange={(e) => setRegHouseholdSize(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Organisation Details */
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Organisation name *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Leicester Community Food Hub"
                                    value={regOrgName}
                                    onChange={(e) => setRegOrgName(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Organisation type *</label>
                                  <select
                                    value={regOrgType}
                                    onChange={(e) => setRegOrgType(e.target.value)}
                                    className="form-control-48"
                                    style={{ cursor: "pointer" }}
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

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Charity / Company registration number</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 1137350"
                                    value={regOrgRegNumber}
                                    onChange={(e) => setRegOrgRegNumber(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated people / families supported</label>
                                  <input
                                    type="number"
                                    min={1}
                                    value={regOrgReach}
                                    onChange={(e) => setRegOrgReach(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary contact full name *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. David Miller"
                                    value={regOrgContactPerson}
                                    onChange={(e) => setRegOrgContactPerson(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Designation / Role *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Outreach Coordinator"
                                    value={regOrgContactRole}
                                    onChange={(e) => setRegOrgContactRole(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Contact email address (For Login) *</label>
                                  <input
                                    type="email"
                                    required
                                    placeholder="e.g. outreach@leicesterhub.org"
                                    value={regOrgEmail}
                                    onChange={(e) => setRegOrgEmail(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Contact telephone number</label>
                                  <input
                                    type="tel"
                                    placeholder="e.g. 0116 299 4400"
                                    value={regOrgPhone}
                                    onChange={(e) => setRegOrgPhone(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Create Login Password (6+ chars) *</label>
                                  <div style={{ position: "relative" }}>
                                    <input
                                      type={showOrgRegPassword ? "text" : "password"}
                                      required
                                      placeholder="••••••••••••"
                                      value={regOrgPassword}
                                      onChange={(e) => setRegOrgPassword(e.target.value)}
                                      className="form-control-48"
                                      style={{ paddingRight: "44px" }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowOrgRegPassword(!showOrgRegPassword)}
                                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#94A3B8", cursor: "pointer" }}
                                    >
                                      {showOrgRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password *</label>
                                  <input
                                    type={showOrgRegPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••••••"
                                    value={regOrgConfirmPassword}
                                    onChange={(e) => setRegOrgConfirmPassword(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Premises / Street address</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Unit 4, St. George's Way"
                                    value={regOrgAddress}
                                    onChange={(e) => setRegOrgAddress(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Postcode</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. LE1 1SH"
                                    value={regOrgPostcode}
                                    onChange={(e) => setRegOrgPostcode(e.target.value)}
                                    className="form-control-48"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Organisation mission / summary</label>
                                <textarea
                                  rows={3}
                                  placeholder="Describe the services and beneficiaries supported by your organisation..."
                                  value={regOrgDescription}
                                  onChange={(e) => setRegOrgDescription(e.target.value)}
                                  style={{
                                    width: "100%",
                                    minHeight: "88px",
                                    padding: "12px 16px",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
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
                      {/* STEP 3: SUPPORT NEEDS & MULTIPLE DOCUMENT UPLOADS               */}
                      {/* ============================================================== */}
                      {regStep === 3 && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                              Step 3 – Support Needs &amp; Supporting Documents
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Specify the assistance category and upload documents related to your support request.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Support category *</label>
                                <select
                                  value={regSupportCategory}
                                  onChange={(e) => setRegSupportCategory(e.target.value)}
                                  className="form-control-48"
                                  style={{ cursor: "pointer" }}
                                >
                                  {supportCategories.length === 0 ? (
                                    <option value="" disabled>Loading categories from database...</option>
                                  ) : (
                                    supportCategories.map((cat) => (
                                      <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                      </option>
                                    ))
                                  )}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Urgency level *</label>
                                <select
                                  value={regUrgency}
                                  onChange={(e) => setRegUrgency(e.target.value)}
                                  className="form-control-48"
                                  style={{ cursor: "pointer" }}
                                >
                                  <option value="EMERGENCY">Emergency Priority (Immediate Danger / Injunction)</option>
                                  <option value="HIGH">High Priority (Urgent Food, Heating, Eviction)</option>
                                  <option value="MEDIUM">Medium Priority (Standard Casework Needs)</option>
                                  <option value="LOW">Low Priority (General Enquiry / Advisory)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for support / Details of assistance requested *</label>
                              <textarea
                                rows={3}
                                required
                                placeholder="Explain your situation and what assistance is needed (e.g. arrears with energy supplier, food insecurity, eviction notice, relocation)..."
                                value={regReason}
                                onChange={(e) => setRegReason(e.target.value)}
                                style={{
                                  width: "100%",
                                  minHeight: "88px",
                                  padding: "12px 16px",
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                  border: "1.5px solid #CBD5E1",
                                  borderRadius: "12px",
                                  outline: "none",
                                  boxSizing: "border-box",
                                  resize: "vertical",
                                }}
                              />
                            </div>

                            {/* Multiple Supporting Documents Upload Box */}
                            <div
                              style={{
                                padding: "18px 20px",
                                borderRadius: "14px",
                                border: "2px dashed #CBD5E1",
                                backgroundColor: "#F8FAFC",
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
                                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>
                                      Upload Supporting Documents (Multiple Files Option)
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                                      Upload evidence related to your request (Proof of address, tenancy agreement, arrears letters, ID, doctor note).
                                    </div>
                                  </div>
                                </div>

                                <label
                                  style={{
                                    padding: "9px 18px",
                                    borderRadius: "10px",
                                    backgroundColor: regType === "ORGANISATION" ? "#4F46E5" : "#E6127E",
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
                                  <span>Choose Files</span>
                                  <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    style={{ display: "none" }}
                                  />
                                </label>
                              </div>

                              {/* Uploaded Documents List */}
                              {regUploadedFiles.length > 0 ? (
                                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>
                                    Attached Documents ({regUploadedFiles.length}):
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {regUploadedFiles.map((file) => (
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
                                          onClick={() => handleRemoveFile(file.id)}
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
                                  No documents attached yet. You may upload multiple PDFs, images, or documents.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ============================================================== */}
                      {/* STEP 4: REVIEW, DECLARATION & SUBMIT                           */}
                      {/* ============================================================== */}
                      {regStep === 4 && (
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                              Step 4 – Review &amp; Submit Application
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Please review your details. Once submitted, our administrators will review your application before activating your portal access.
                            </p>
                          </div>

                          {/* Summary Card */}
                          <div
                            style={{
                              padding: "18px 20px",
                              borderRadius: "16px",
                              backgroundColor: "#F8FAFC",
                              border: "1.5px solid #E2E8F0",
                            }}
                          >
                            <div className="font-bold text-slate-900 mb-3 flex items-center justify-between">
                              <span style={{ fontSize: "13px" }}>Application Summary</span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  padding: "3px 8px",
                                  borderRadius: "6px",
                                  backgroundColor: regType === "ORGANISATION" ? "#EEF2FF" : "#FDF2F8",
                                  color: regType === "ORGANISATION" ? "#4338CA" : "#BE185D",
                                  border: `1px solid ${regType === "ORGANISATION" ? "#C7D2FE" : "#FBCFE8"}`,
                                }}
                              >
                                {regType}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-slate-500">Applicant: </span>
                                <strong className="text-slate-900 font-semibold">
                                  {regType === "ORGANISATION" ? regOrgName : `${regFirstName} ${regLastName}`}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Login Email: </span>
                                <strong className="text-slate-900 font-mono font-semibold">
                                  {regType === "ORGANISATION" ? regOrgEmail : regEmail}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Phone: </span>
                                <strong className="text-slate-900">
                                  {regType === "ORGANISATION" ? (regOrgPhone || "Not provided") : (regPhone || "Not provided")}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Location: </span>
                                <strong className="text-slate-900">
                                  {regType === "ORGANISATION" ? (regOrgPostcode || "Leicester") : (regCity || "Leicester")}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Support Category: </span>
                                <strong className="text-slate-900 font-semibold">
                                  {regSupportCategory}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Urgency: </span>
                                <strong className="text-magenta font-extrabold">
                                  {regUrgency}
                                </strong>
                              </div>
                              <div className="col-span-1 sm:col-span-2">
                                <span className="text-slate-500">Attached Supporting Documents: </span>
                                <strong className="text-slate-900">
                                  {regUploadedFiles.length > 0
                                    ? `${regUploadedFiles.length} files attached (${regUploadedFiles.map((f) => f.name).join(", ")})`
                                    : "None attached"}
                                </strong>
                              </div>
                            </div>
                          </div>

                          {/* Approval Notice Callout */}
                          <div
                            style={{
                              padding: "14px 18px",
                              borderRadius: "14px",
                              backgroundColor: "#FFFBEB",
                              border: "1px solid #FDE68A",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                            }}
                          >
                            <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                            <div style={{ fontSize: "12px", color: "#92400E", lineHeight: "1.5" }}>
                              <strong style={{ color: "#78350F" }}>Administrator Review &amp; Approval Process: </strong>
                              All public registrations are triaged by our caseworker team. When an administrator reviews and approves your application, you will be able to log in to the portal using your email and password.
                            </div>
                          </div>

                          {/* GDPR Declaration Checkbox */}
                          <div
                            style={{
                              padding: "16px",
                              borderRadius: "12px",
                              border: "1px solid #E2E8F0",
                              backgroundColor: "#FFFFFF",
                            }}
                          >
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={regConsentGdpr}
                                onChange={(e) => setRegConsentGdpr(e.target.checked)}
                                style={{ accentColor: "#E6127E", width: "18px", height: "18px", marginTop: "2px" }}
                              />
                              <span style={{ fontSize: "12px", color: "#334155", lineHeight: "1.5" }}>
                                I declare that the details provided are true and accurate. I consent to The Zinthiya Trust holding and processing this data to assess and deliver support under UK GDPR and Charity Commission guidelines. *
                              </span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Modal Navigation Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        {regStep > 1 ? (
                          <button
                            type="button"
                            onClick={() => setRegStep((prev) => (prev > 1 ? (prev - 1 as any) : 1))}
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
                            }}
                          >
                            <ArrowLeft size={14} />
                            <span>Back</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setMode("login")}
                            style={{
                              height: "44px",
                              padding: "0 18px",
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

                        <div>
                          {regStep < 4 ? (
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="btn-gradient-magenta"
                              style={{ width: "auto", padding: "0 24px", height: "44px" }}
                            >
                              <span>
                                {regStep === 1
                                  ? "Continue to Basic Information"
                                  : regStep === 2
                                  ? "Continue to Support Needs"
                                  : "Continue to Review & Submit"}
                              </span>
                              <ArrowRight size={15} />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={loading}
                              className="btn-gradient-magenta"
                              style={{ width: "auto", padding: "0 28px", height: "46px" }}
                            >
                              {loading ? (
                                <>
                                  <RefreshCw size={16} className="animate-spin" />
                                  <span>Submitting Application...</span>
                                </>
                              ) : (
                                <>
                                  <Check size={16} />
                                  <span>Submit Application for Review</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}

            {/* =================================================================== */}
            {/* 3. FORGOT PASSWORD FORM                                             */}
            {/* =================================================================== */}
            {mode === "forgot" && (
              <form onSubmit={handleForgotPasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Registered Email Address *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. fatima@example.com"
                      required
                      className="auth-input"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-gradient-magenta" style={{ height: "48px" }}>
                  <span>{loading ? "Sending..." : "Send Reset Instructions"}</span>
                  <ArrowRight size={16} />
                </button>

                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setErrorMessage(""); setSuccessMessage(""); }}
                    style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: "#E6127E", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}

            {/* =================================================================== */}
            {/* 4. RESET PASSWORD FORM                                              */}
            {/* =================================================================== */}
            {mode === "reset" && (
              <form onSubmit={handleResetPasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    New Password (6+ characters) *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      required
                      className="auth-input"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-gradient-magenta" style={{ height: "48px" }}>
                  <span>{loading ? "Saving..." : "Update Password"}</span>
                  <Check size={16} />
                </button>

                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setErrorMessage(""); setSuccessMessage(""); }}
                    style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: "#E6127E", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}

            {/* Helpline Footer Note */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid #F1F5F9",
                textAlign: "center",
                fontSize: "11px",
                color: "#94A3B8",
              }}
            >
              Need assistance with your support application? Call our duty team at{" "}
              <strong style={{ color: "#E6127E" }}>0116 254 5168</strong>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "16px 24px",
          textAlign: "center",
          fontSize: "11px",
          color: "#94A3B8",
          borderTop: "1px solid rgba(230, 18, 126, 0.08)",
          backgroundColor: "#FFFFFF",
        }}
      >
        The Zinthiya Trust • Registered Charity #1137350 • All Client Data Confidential &amp; UK GDPR Protected
      </footer>
    </div>
  );
}

export default BeneficiaryAuthPage;
