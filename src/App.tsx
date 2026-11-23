
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DonorDashboardPage } from "./pages/DonorDashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { BeneficiaryDashboardPage } from "./pages/BeneficiaryDashboardPage";
import { BeneficiaryAuthPage } from "./pages/BeneficiaryAuthPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/our-service" element={<Navigate to="/services" replace />} />
      <Route path="/our-services" element={<Navigate to="/services" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/donor" element={<Navigate to="/donor/dashboard" replace />} />
      <Route path="/donor/dashboard" element={<DonorDashboardPage />} />
      <Route path="/portal" element={<Navigate to="/donor/dashboard" replace />} />
      <Route path="/beneficiary" element={<Navigate to="/beneficiary/dashboard" replace />} />
      <Route path="/beneficiary/login" element={<BeneficiaryAuthPage initialMode="login" />} />
      <Route path="/beneficiary/register" element={<BeneficiaryAuthPage initialMode="register" />} />
      <Route path="/beneficiary/forgot-password" element={<BeneficiaryAuthPage initialMode="forgot" />} />
      <Route path="/beneficiary/reset-password" element={<BeneficiaryAuthPage initialMode="reset" />} />
      <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboardPage />} />
      <Route path="/beneficiary/allocated-support" element={<BeneficiaryDashboardPage initialTab="assistance" />} />
      <Route path="/beneficiary/assistance" element={<BeneficiaryDashboardPage initialTab="assistance" />} />
      <Route path="/beneficiary/history" element={<BeneficiaryDashboardPage initialTab="history" />} />
      <Route path="/beneficiary/messages" element={<BeneficiaryDashboardPage initialTab="messages" />} />
      <Route path="/beneficiary/advocate" element={<BeneficiaryDashboardPage initialTab="messages" />} />
      <Route path="/client" element={<Navigate to="/beneficiary/dashboard" replace />} />
      <Route path="/support" element={<Navigate to="/beneficiary/dashboard" replace />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
