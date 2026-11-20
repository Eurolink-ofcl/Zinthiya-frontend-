import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Check
} from "../components/Icons";

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

export function RegisterPage() {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  // Communication & Newsletter Consent State
  const [generalConsent, setGeneralConsent] = useState(true);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Validate Required Fields
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg("Please enter your phone number.");
      return;
    }
    if (!password) {
      setErrorMsg("Please choose a password.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    setLoading(true);
    try {
      const result = await api.registerDonor({
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        address: address.trim() || undefined,
        generalConsent,
      });

      // Save real PostgreSQL authenticated session & JWT token
      if (result?.data?.user && result?.data?.auth?.accessToken) {
        api.setSession(result.data.user, result.data.auth.accessToken);
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "Unable to connect to the backend server. Please verify the backend is running.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-ink"
      style={{ backgroundColor: "#FDF0F4" }}
    >
      {/* Top Header */}
      <header
        className="w-full border-b"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(230, 18, 126, 0.12)",
          backdropFilter: "blur(8px)"
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <Link to="/" className="flex items-center" title="The Zinthiya Trust">
            <ZinthiyaLogo />
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold hover:bg-white transition-all"
            style={{
              borderColor: "rgba(36, 18, 33, 0.15)",
              color: "#241221",
              backgroundColor: "rgba(255, 255, 255, 0.7)"
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </header>

      {/* Centered Standard Width Donor Registration Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            margin: "0 auto"
          }}
        >
          {/* Card Container */}
          <div
            className="rounded-3xl border relative overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "rgba(230, 18, 126, 0.15)",
              boxShadow: "0 12px 35px -8px rgba(36, 18, 33, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)",
              padding: "32px 28px"
            }}
          >
            {/* Top Accent Gradient Bar */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #E6127E 0%, #F59E0B 50%, #E6127E 100%)"
              }}
            />

            {/* Success State */}
            {submitted ? (
              <div style={{ textAlign: "center", padding: "12px 8px 6px 8px" }}>
                {/* Celebratory Badge */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 14px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    backgroundColor: "#ECFDF5",
                    color: "#059669",
                    marginBottom: "18px"
                  }}
                >
                  <Sparkles size={14} style={{ width: "14px", height: "14px" }} />
                  <span>Account Activated</span>
                </span>

                {/* Perfect Circular Checkmark Icon */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    boxShadow: "0 10px 25px -4px rgba(16, 185, 129, 0.45)"
                  }}
                >
                  <Check size={32} style={{ width: "32px", height: "32px", strokeWidth: "3", display: "block" }} />
                </div>

                {/* Heading */}
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#241221",
                    letterSpacing: "-0.02em",
                    marginBottom: "6px"
                  }}
                >
                  Registration Successful!
                </h2>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#5C475A",
                    lineHeight: "1.6",
                    maxWidth: "380px",
                    margin: "0 auto 18px auto"
                  }}
                >
                  Thank you for joining The Zinthiya Trust! Your donor profile is now active and securely registered.
                </p>

                {/* Donor Details Summary Card */}
                <div
                  style={{
                    backgroundColor: "rgba(253, 240, 244, 0.65)",
                    border: "1px solid rgba(230, 18, 126, 0.18)",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    textAlign: "left",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(230, 18, 126, 0.12)"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Registered Name
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#241221" }}>
                      {fullName || "Valued Supporter"}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(230, 18, 126, 0.12)"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Donor Email
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#E6127E" }}>
                      {email}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "10px"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E7287", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Access Status
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: "#ECFDF5",
                        color: "#059669",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        border: "1px solid #A7F3D0"
                      }}
                    >
                      ✓ Donor Portal Verified
                    </span>
                  </div>
                </div>

                {/* Primary Button */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="btn-3d-magenta w-full rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  style={{
                    height: "46px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  <span>Proceed to Donor Login</span>
                  <ArrowRight size={16} style={{ width: "16px", height: "16px", strokeWidth: "2.5" }} />
                </button>
              </div>
            ) : (
              <>
                {/* Header Content */}
                <div className="text-center mb-6">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5"
                    style={{
                      backgroundColor: "#FCE8F3",
                      color: "#B80C64"
                    }}
                  >
                    <Sparkles size={14} style={{ width: "14px", height: "14px" }} />
                    <span>Donor Registration</span>
                  </span>

                  <h1
                    className="font-bold text-2xl tracking-tight"
                    style={{ color: "#241221" }}
                  >
                    Create Donor Account
                  </h1>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#5C475A" }}
                  >
                    Register to support Leicestershire relief projects, track giving, and stay informed.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div
                    className="mb-4 p-3 rounded-xl text-xs font-semibold text-center border"
                    style={{
                      backgroundColor: "#FEF2F2",
                      borderColor: "#FCA5A5",
                      color: "#B91C1C"
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Full Name – Required */}
                <div>
                  <label
                    htmlFor="reg-fullname"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "#241221" }}
                  >
                    Full Name <span style={{ color: "#E6127E" }}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <User size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-fullname"
                      type="text"
                      required
                      autoFocus
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "42px",
                        paddingRight: "14px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* 2. Email Address – Required */}
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "#241221" }}
                  >
                    Email Address <span style={{ color: "#E6127E" }}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <Mail size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-with-left-icon"
                      data-icon="left"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "44px",
                        paddingRight: "14px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* 3. Phone Number – Required */}
                <div>
                  <label
                    htmlFor="reg-phone"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "#241221" }}
                  >
                    Phone Number <span style={{ color: "#E6127E" }}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <Phone size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 0116 254 5168 or +44 7123 456789"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "42px",
                        paddingRight: "14px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* 4. Password – Required */}
                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "#241221" }}
                  >
                    Password <span style={{ color: "#E6127E" }}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <Lock size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="input-with-left-icon input-with-right-icon"
                      data-icon="left"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "44px",
                        paddingRight: "46px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        color: "#5C475A",
                        cursor: "pointer",
                        padding: "4px",
                        zIndex: 2
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                      ) : (
                        <Eye size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* 5. Confirm Password – Required */}
                <div>
                  <label
                    htmlFor="reg-confirm-password"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "#241221" }}
                  >
                    Confirm Password <span style={{ color: "#E6127E" }}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <Lock size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="input-with-left-icon input-with-right-icon"
                      data-icon="left"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "44px",
                        paddingRight: "46px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        color: "#5C475A",
                        cursor: "pointer",
                        padding: "4px",
                        zIndex: 2
                      }}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                      ) : (
                        <Eye size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* 6. Address – Optional */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="reg-address"
                      className="block text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#241221" }}
                    >
                      Address
                    </label>
                    <span className="text-[11px] font-medium" style={{ color: "#8E7287" }}>
                      Optional (for Gift Aid / Receipts)
                    </span>
                  </div>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#E6127E",
                        pointerEvents: "none",
                        width: "18px",
                        height: "18px",
                        zIndex: 2
                      }}
                    >
                      <MapPin size={18} style={{ width: "18px", height: "18px", display: "block" }} />
                    </div>
                    <input
                      id="reg-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 12 New Walk, Leicester, LE1 6TF"
                      style={{
                        width: "100%",
                        height: "46px",
                        paddingLeft: "42px",
                        paddingRight: "14px",
                        backgroundColor: "rgba(253, 240, 244, 0.45)",
                        border: "1px solid rgba(36, 18, 33, 0.18)",
                        borderRadius: "14px",
                        fontSize: "14px",
                        color: "#241221",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* 7. Communication Consent & Newsletter Preferences */}
                {/* Designed as per Zinthiya Trust CRM & Newsletter doc specifications */}
                <div
                  style={{
                    backgroundColor: "rgba(253, 240, 244, 0.65)",
                    border: "1px solid rgba(230, 18, 126, 0.22)",
                    borderRadius: "16px",
                    padding: "16px",
                    marginTop: "20px"
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "#FCE8F3",
                        color: "#E6127E",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Mail size={12} style={{ width: "12px", height: "12px" }} />
                    </span>
                    <h3
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#241221" }}
                    >
                      Newsletter &amp; Communication Preferences
                    </h3>
                  </div>

                  <p
                    className="text-[11px] leading-relaxed mb-3"
                    style={{ color: "#5C475A" }}
                  >
                    In accordance with our Donor CRM policy and UK GDPR, The Zinthiya Trust only contacts supporters who have given active communication consent. Donors without consent are automatically excluded from newsletters.
                  </p>

                  {/* Primary Consent Checkbox */}
                  <label
                    className="flex items-start gap-2.5 p-2 rounded-xl cursor-pointer select-none transition-colors"
                    style={{
                      backgroundColor: generalConsent ? "rgba(255, 255, 255, 0.9)" : "transparent",
                      border: generalConsent ? "1px solid rgba(230, 18, 126, 0.25)" : "1px solid transparent"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={generalConsent}
                      onChange={(e) => setGeneralConsent(e.target.checked)}
                      className="rounded cursor-pointer mt-0.5"
                      style={{
                        accentColor: "#E6127E",
                        width: "16px",
                        height: "16px",
                        flexShrink: 0
                      }}
                    />
                    <div className="text-xs">
                      <span className="font-bold" style={{ color: "#241221" }}>
                        I consent to receive communication from The Zinthiya Trust
                      </span>
                      <p className="text-[11px] mt-0.5" style={{ color: "#6E5469" }}>
                        Allow the Trust to keep you updated on community appeals, emergency aid, and charitable impact.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-3d-magenta w-full rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70 cursor-pointer shadow-md"
                    style={{ height: "46px" }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering Account...</span>
                      </span>
                    ) : (
                      <>
                        <span>Register as Donor</span>
                        <ArrowRight size={16} style={{ width: "16px", height: "16px", strokeWidth: "2.5" }} />
                      </>
                    )}
                  </button>
                </div>

                {/* Already have an account link */}
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "8px",
                    paddingBottom: "2px",
                    fontSize: "12px",
                    color: "#5C475A"
                  }}
                >
                  <span>Already have a donor account? </span>
                  <Link
                    to="/login"
                    style={{
                      color: "#E6127E",
                      fontWeight: 700,
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </>
          )}

            {/* Bottom Security Badge */}
            <div
              className="mt-4 pt-4 border-t flex items-center justify-center gap-1.5 text-center font-medium"
              style={{
                borderColor: "rgba(36, 18, 33, 0.08)",
                fontSize: "11px",
                color: "#5C475A"
              }}
            >
              <ShieldCheck size={14} style={{ width: "14px", height: "14px", color: "#059669" }} />
              <span>256-Bit SSL Encrypted • UK GDPR Compliant Donor Registration</span>
            </div>
          </div>

          {/* Assistance Under Card */}
          <div
            className="mt-4 text-center text-xs"
            style={{ color: "#5C475A" }}
          >
            Need help?{" "}
            <a
              href="tel:01162545168"
              className="font-bold hover:underline"
              style={{ color: "#E6127E" }}
            >
              Helpline: 0116 254 5168
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-4 text-center border-t"
        style={{
          borderColor: "rgba(230, 18, 126, 0.1)",
          fontSize: "11px",
          color: "rgba(92, 71, 90, 0.7)"
        }}
      >
        © {new Date().getFullYear()} The Zinthiya Trust • Registered Charity No. 1137350
      </footer>
    </div>
  );
}

export default RegisterPage;

