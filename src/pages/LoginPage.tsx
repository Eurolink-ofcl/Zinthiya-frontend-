import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, DonorUser } from "../lib/api";
import {
  Mail,
  Lock,
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

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [donor, setDonor] = useState<DonorUser | null>(null);

  // Load remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("zinthiya_remember_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {}
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.login({
        email: email.trim(),
        password,
      });

      if (res?.data?.user && res?.data?.auth?.accessToken) {
        api.setSession(res.data.user, res.data.auth.accessToken);
        setDonor(res.data.user);

        if (rememberMe) {
          localStorage.setItem("zinthiya_remember_email", email.trim());
        } else {
          localStorage.removeItem("zinthiya_remember_email");
        }

        // Direct navigation to Donor Dashboard
        navigate("/donor/dashboard");
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "Invalid email or password. Please verify your credentials.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-ink"
      style={{ backgroundColor: "#FDF0F4" }}
    >
      {/* Top Simple Header */}
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
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold hover:bg-white transition-all"
            style={{
              borderColor: "rgba(36, 18, 33, 0.15)",
              color: "#241221",
              backgroundColor: "rgba(255, 255, 255, 0.7)"
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Centered Compact Donor Login Box */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div
          style={{
            maxWidth: "400px",
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

            {/* Header Content with Explicit "Donor Login" Specification */}
            <div className="text-center mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5"
                style={{
                  backgroundColor: "#FCE8F3",
                  color: "#B80C64"
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Donor Portal</span>
              </span>

              <h1
                className="font-bold text-2xl tracking-tight"
                style={{ color: "#241221" }}
              >
                Donor Login
              </h1>
              <p
                className="text-xs mt-1"
                style={{ color: "#5C475A" }}
              >
                Enter your email and password to access your donor account.
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

            {/* Success State */}
            {submitted ? (
              <div style={{ textAlign: "center", padding: "10px 4px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px auto",
                    boxShadow: "0 8px 20px -4px rgba(16, 185, 129, 0.4)"
                  }}
                >
                  <Check size={28} style={{ width: "28px", height: "28px", strokeWidth: "3" }} />
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#241221", marginBottom: "4px" }}>
                  Welcome Back!
                </h2>
                <p style={{ fontSize: "12px", color: "#5C475A", marginBottom: "16px" }}>
                  Successfully logged in as <strong>{donor?.fullName || email}</strong>
                </p>

                <div
                  style={{
                    backgroundColor: "rgba(253, 240, 244, 0.65)",
                    border: "1px solid rgba(230, 18, 126, 0.18)",
                    borderRadius: "14px",
                    padding: "12px 16px",
                    textAlign: "left",
                    marginBottom: "18px",
                    fontSize: "12px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#8E7287" }}>Account Role</span>
                    <span style={{ fontWeight: 700, color: "#241221" }}>Verified Donor</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#8E7287" }}>Giving Tier</span>
                    <span style={{ fontWeight: 700, color: "#B80C64" }}>{donor?.donationTier || "SUPPORTER"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#8E7287" }}>Total Donations</span>
                    <span style={{ fontWeight: 700, color: "#059669" }}>£{donor?.totalDonated || "0.00"}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn-3d-magenta w-full rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  style={{ height: "46px" }}
                >
                  <span>Go to Homepage</span>
                  <ArrowRight size={16} style={{ width: "16px", height: "16px" }} />
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address with Pixel-Perfect Vertically Centered Icon */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: "#241221" }}
                >
                  Donor Email Address
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
                    id="login-email"
                    type="email"
                    required
                    autoFocus
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

              {/* Password with Pixel-Perfect Vertically Centered Icons */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: "#241221" }}
                >
                  Password
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
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              {/* Remember Me & Forgot Password Options Row */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded cursor-pointer"
                    style={{
                      accentColor: "#E6127E",
                      width: "15px",
                      height: "15px"
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#5C475A" }}
                  >
                    Remember me
                  </span>
                </label>

                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "To reset your donor password, please contact The Zinthiya Trust Helpline at 0116 254 5168 or email donations@zinthiyatrust.org."
                    );
                  }}
                  className="text-xs font-bold transition-colors hover:underline"
                  style={{ color: "#E6127E" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button (Replaced Sign In with Login as requested) */}
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
                      <span>Logging in...</span>
                    </span>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={16} style={{ width: "16px", height: "16px", strokeWidth: "2.5" }} />
                    </>
                  )}
                </button>
              </div>

              {/* New User Sign In / Register Option Directly Under Login Button */}
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "4px",
                  fontSize: "12px",
                  color: "#5C475A"
                }}
              >
                <span>If you are a new user? </span>
                <Link
                  to="/register"
                  style={{
                    color: "#E6127E",
                    fontWeight: 700,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Sign in / Register here
                </Link>
              </div>
            </form>
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
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted &amp; Confidential Donor Portal</span>
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

export default LoginPage;
