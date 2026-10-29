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
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] selection:bg-[#22D3EE]/25 selection:text-[#082F49]">
      {/* Top Navbar with Scroll Progress Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* Gallery Section */}
      <GallerySection projects={projects} />

      {/* Web Development Tech Stack Section */}
      <WebTechStackSection />

      {/* Profile & Journey Section with 3D Photo Card */}
      <ProfileSection profile={profile} journeys={journeys} skills={skills} />

      {/* Contact Section */}
      <ContactSection profile={profile} />

      {/* Minimal Editorial Footer (Unseen Studio & Nimbus Style) */}
      <footer className="border-t border-[#E5E7EB] py-12 bg-white text-left">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026</span>
            <span className="text-[#111827] font-semibold">Sahal Siraaj Ibra Praditya</span>
            <span>·</span>
            <span>SMKN 9 SEMARANG (PPLG)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://skanilan.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E74E9] hover:underline transition-colors"
            >
              ⮡ skanilan.tech
            </a>
            <span className="text-[#D1D5DB]">·</span>
            <a
              href="/admin"
              className="hover:text-[#111827] transition-colors text-[#64748B]"
            >
              Cockpit Admin ⮡
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
