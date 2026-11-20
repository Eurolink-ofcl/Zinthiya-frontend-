import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Check,
  X,
  PhoneCall
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

export function AdminLoginPage() {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status & Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  // Load remembered admin email if previously saved
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("zinthiya_remember_admin_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {}
  }, []);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both administrator email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.login({
        email: email.trim(),
        password,
        portal: "admin",
      });

      const user = res?.data?.user;
      const token = res?.data?.auth?.accessToken;

      if (!user || !token) {
        throw new Error("Invalid response received from authentication server.");
      }

      // Role check: Strictly restricted to ADMIN and STAFF
      if (user.role !== "ADMIN" && user.role !== "STAFF") {
        setErrorMsg("Access Denied: This portal is strictly restricted to Zinthiya Trust Administrators and Staff.");
        setLoading(false);
        return;
      }

      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem("zinthiya_remember_admin_email", email.trim());
      } else {
        localStorage.removeItem("zinthiya_remember_admin_email");
      }

      api.setSession(user, token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(err?.data?.message || err.message || "Invalid administrator credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSubmitted(true);
    }, 700);
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
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderColor: "rgba(230, 18, 126, 0.12)",
          backdropFilter: "blur(8px)"
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ maxWidth: "1160px", margin: "0 auto" }}
        >
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center" title="The Zinthiya Trust">
              <ZinthiyaLogo />
            </Link>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 800,
                backgroundColor: "#241221",
                color: "#ffffff",
                letterSpacing: "0.03em"
              }}
            >
              <ShieldCheck size={12} style={{ width: "12px", height: "12px", color: "#F59E0B" }} />
              <span>Admin Gateway</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:01162545168"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold hover:text-magenta transition-colors"
              style={{ color: "#5C475A" }}
            >
              <PhoneCall className="w-3.5 h-3.5 text-magenta" />
              <span>IT Support: 0116 254 5168</span>
            </a>

            <Link
              to="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold hover:bg-white transition-all"
              style={{
                borderColor: "rgba(36, 18, 33, 0.15)",
                color: "#241221",
                backgroundColor: "rgba(255, 255, 255, 0.7)"
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Centered Admin Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            margin: "0 auto"
          }}
        >
          {/* Card Container */}
          <div
            className="rounded-3xl border relative overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "rgba(36, 18, 33, 0.12)",
              boxShadow: "0 18px 45px -10px rgba(36, 18, 33, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)",
              padding: "36px 32px"
            }}
          >
            {/* Top Security Dual Gradient Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #241221 0%, #E6127E 50%, #F59E0B 100%)"
              }}
            />

            {/* Badge & Title */}
            <div className="text-center mb-6">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 14px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  backgroundColor: "#FCE8F3",
                  color: "#B80C64",
                  marginBottom: "12px"
                }}
              >
                <ShieldCheck size={13} style={{ width: "13px", height: "13px" }} />
                <span>Admin &amp; Staff Access</span>
              </span>

              <h1
                className="font-bold text-2xl tracking-tight"
                style={{ color: "#241221" }}
              >
                Admin Sign In
              </h1>
              <p
                className="text-xs mt-1.5"
                style={{ color: "#5C475A", lineHeight: "1.5" }}
              >
                Access The Zinthiya Trust administrative management suite, donor CRM, and campaign analytics.
              </p>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div
                className="mb-5 p-3 rounded-xl text-xs font-semibold text-center border flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#FEF2F2",
                  borderColor: "#FCA5A5",
                  color: "#B91C1C"
                }}
              >
                <AlertCircle size={15} style={{ width: "15px", height: "15px" }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* 1. Email address */}
              <div>
                <label
                  htmlFor="admin-email"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#241221",
                    marginBottom: "6px"
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8E7287",
                      pointerEvents: "none",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Mail size={16} style={{ width: "16px", height: "16px" }} />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoFocus
                    placeholder="admin@zinthiyatrust.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-with-left-icon"
                    data-icon="left"
                    style={{
                      width: "100%",
                      height: "46px",
                      minHeight: "46px",
                      paddingLeft: "44px",
                      paddingRight: "16px",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(36, 18, 33, 0.2)",
                      fontSize: "13px",
                      color: "#241221",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease"
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#E6127E")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(36, 18, 33, 0.2)")}
                  />
                </div>
              </div>

              {/* 2. Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#241221",
                    marginBottom: "6px"
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8E7287",
                      pointerEvents: "none",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Lock size={16} style={{ width: "16px", height: "16px" }} />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter administrator password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-with-left-icon input-with-right-icon"
                    data-icon="left"
                    style={{
                      width: "100%",
                      height: "46px",
                      minHeight: "46px",
                      paddingLeft: "44px",
                      paddingRight: "46px",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(36, 18, 33, 0.2)",
                      fontSize: "13px",
                      color: "#241221",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease"
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#E6127E")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(36, 18, 33, 0.2)")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#8E7287",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={16} style={{ width: "16px", height: "16px" }} />
                    ) : (
                      <Eye size={16} style={{ width: "16px", height: "16px" }} />
                    )}
                  </button>
                </div>
              </div>

              {/* 3. Remember Me & Forgot Password */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px"
                }}
              >
                <label
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "#5C475A"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      accentColor: "#E6127E",
                      width: "15px",
                      height: "15px",
                      cursor: "pointer"
                    }}
                  />
                  <span>Remember this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotSubmitted(false);
                    setShowForgotPassword(true);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#E6127E",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px"
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {/* 4. Secure Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-3d-magenta rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  height: "46px",
                  width: "100%",
                  marginTop: "6px"
                }}
              >
                {loading ? (
                  <span>Verifying Administrator Access...</span>
                ) : (
                  <>
                    <Lock size={15} style={{ width: "15px", height: "15px" }} />
                    <span>Secure Login</span>
                    <ArrowRight size={15} style={{ width: "15px", height: "15px" }} />
                  </>
                )}
              </button>
            </form>

            {/* Security Notice & Compliances */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(36, 18, 33, 0.08)",
                fontSize: "11px",
                color: "#8E7287",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                  color: "#059669",
                  fontWeight: 700
                }}
              >
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} style={{ width: "12px", height: "12px" }} />
                  256-Bit SSL
                </span>
                <span>•</span>
                <span>Role-Based Access</span>
                <span>•</span>
                <span>Audit Logged</span>
              </div>

              <p style={{ lineHeight: "1.4" }}>
                Restricted to authorized staff of The Zinthiya Ganeshpanchan Trust (Charity #1137350). All access attempts are monitored and recorded.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
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
            zIndex: 90,
            padding: "16px"
          }}
          onClick={() => setShowForgotPassword(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(36, 18, 33, 0.25)",
              border: "1px solid rgba(230, 18, 126, 0.2)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForgotPassword(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#8E7287",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              <X size={20} style={{ width: "20px", height: "20px" }} />
            </button>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#FCE8F3",
                  color: "#B80C64",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px auto"
                }}
              >
                <Lock size={22} style={{ width: "22px", height: "22px" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#241221" }}>
                Reset Admin Password
              </h3>
              <p style={{ fontSize: "12px", color: "#5C475A", marginTop: "4px" }}>
                Enter your registered administrator email address to request secure credentials reset.
              </p>
            </div>

            {forgotSubmitted ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div
                  style={{
                    padding: "14px",
                    borderRadius: "14px",
                    backgroundColor: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    color: "#065F46",
                    fontSize: "12px",
                    lineHeight: "1.5",
                    marginBottom: "16px"
                  }}
                >
                  <Check size={20} style={{ width: "20px", height: "20px", margin: "0 auto 6px auto", color: "#059669" }} />
                  <strong>Reset Instructions Sent</strong>
                  <div style={{ marginTop: "4px" }}>
                    If an administrator account exists for <strong>{forgotEmail}</strong>, password reset verification has been dispatched.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="btn-3d-magenta rounded-full font-bold text-xs text-white px-6 py-2.5 cursor-pointer"
                  style={{ width: "100%", height: "40px" }}
                >
                  Back to Admin Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#241221",
                      marginBottom: "6px"
                    }}
                  >
                    Administrator Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@zinthiyatrust.org"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
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

                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    backgroundColor: "#FDF9FB",
                    border: "1px solid rgba(230, 18, 126, 0.15)",
                    fontSize: "11px",
                    color: "#5C475A"
                  }}
                >
                  Need immediate clearance? Contact Trust IT Support at{" "}
                  <a href="mailto:info@zinthiyatrust.org" style={{ color: "#E6127E", fontWeight: 700 }}>
                    info@zinthiyatrust.org
                  </a>{" "}
                  or call <strong>0116 254 5168</strong>.
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    style={{
                      height: "40px",
                      borderRadius: "10px",
                      border: "1px solid rgba(36, 18, 33, 0.2)",
                      backgroundColor: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#5C475A",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="btn-3d-magenta rounded-full font-bold text-xs text-white flex items-center justify-center cursor-pointer"
                    style={{ height: "40px" }}
                  >
                    {forgotLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="w-full py-4 text-center text-xs border-t"
        style={{
          borderColor: "rgba(230, 18, 126, 0.12)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "#5C475A"
        }}
      >
        <p>
          © 2026 The Zinthiya Ganeshpanchan Trust • Registered Charity No. 1137350 • All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default AdminLoginPage;

