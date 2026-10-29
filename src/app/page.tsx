import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import GallerySection from '@/components/sections/GallerySection';
import WebTechStackSection from '@/components/sections/WebTechStackSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ContactSection from '@/components/sections/ContactSection';
import { getProfile, getJourneys, getSkills } from '@/lib/services/profile';
import { getAllProjects } from '@/lib/services/projects';

export default async function HomePage() {
  const [profile, projects, journeys, skills] = await Promise.all([
    getProfile(),
    getAllProjects(),
    getJourneys(),
    getSkills(),
  ]);

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F8FAFC] selection:bg-[#22D3EE]/30 selection:text-white">
      {/* Top Navbar with Scroll Progress Bar */}
      <Navbar />

      {/* Hero Section with Full-Bleed 3D WebGL Canvas */}
      <HeroSection profile={profile} />

      {/* Gallery Section */}
      <GallerySection projects={projects} />

      {/* Web Development Tech Stack Section */}
      <WebTechStackSection />

      {/* Profile & Journey Section with 3D Photo Card */}
      <ProfileSection profile={profile} journeys={journeys} skills={skills} />

      {/* Contact Section */}
      <ContactSection profile={profile} />

      {/* Minimal Editorial Footer (Unseen Studio Style) */}
      <footer className="border-t border-white/[0.08] py-14 bg-[#030508] text-left">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[#22D3EE] font-bold">© 2026</span>
            <span className="text-[#F8FAFC] font-semibold">Sahal Siraaj Ibra Praditya</span>
            <span className="text-white/20">·</span>
            <span>SMKN 9 SEMARANG (PPLG)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors flex items-center gap-1.5"
            >
              <span>Cockpit Admin</span>
              <span>⮡</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
