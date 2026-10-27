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
    <div className="min-h-screen bg-[#070709] text-[#F4F4F6] selection:bg-white/15">
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

      {/* Minimal Editorial Footer */}
      <footer className="border-t border-white/[0.08] py-12 bg-[#070709]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#63636E]">
          <div className="flex items-center gap-2">
            <span>© 2026</span>
            <span className="text-[#A1A1AA]">Sahal Siraaj Ibra Praditya</span>
            <span>·</span>
            <span>SMKN 9 SEMARANG (PPLG)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://skanilan.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F6] transition-colors"
            >
              skanilan.tech ↗
            </a>
            <span>·</span>
            <a
              href="/admin"
              className="hover:text-[#F4F4F6] transition-colors text-[#A1A1AA]"
            >
              Panel Admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
