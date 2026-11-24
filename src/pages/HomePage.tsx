import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { SupportBanner } from "../components/SupportBanner";
import { CommunityProjects } from "../components/CommunityProjects";
import { News } from "../components/News";
import { SupportInvolved } from "../components/SupportInvolved";
import { Footer } from "../components/Footer";

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user lands on /#contact or any contact hash anchor, seamlessly redirect to the /contact page
    if (
      location.hash === "#contact" ||
      location.hash.startsWith("#contact") ||
      window.location.hash === "#contact" ||
      window.location.hash.startsWith("#contact")
    ) {
      navigate("/contact", { replace: true });
    }
  }, [location.hash, navigate]);

  return (
    <div className="min-h-screen bg-[#FFF0F5]/40 text-ink antialiased flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <SupportBanner />
        <CommunityProjects />
        <News />
        <SupportInvolved />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;

