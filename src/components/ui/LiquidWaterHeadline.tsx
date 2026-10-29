'use client';

interface LiquidWaterHeadlineProps {
  firstName?: string;
  lastName?: string;
  roleBadge?: string;
  tagline?: string;
}

export default function LiquidWaterHeadline({
  firstName = 'SAHAL SIRAAJ',
  lastName = 'IBRA PRADITYA',
  roleBadge = 'A BRAND, WEB 3D & IOT SYSTEMS ARCHITECT · SMKN 9',
  tagline = 'Merancang sistem terintegrasi yang menghubungkan perangkat keras fisik dengan antarmuka web modern 3D.',
}: LiquidWaterHeadlineProps) {
  return (
    <div className="relative select-none flex flex-col items-center text-center cursor-default py-2 sm:py-4 w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div className="relative z-10 mb-3 sm:mb-4">
        <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/25 backdrop-blur-md text-[10px] sm:text-xs font-mono font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-[#22D3EE] uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="truncate max-w-[85vw] sm:max-w-none">{roleBadge}</span>
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center tracking-tighter w-full">
        <span
          style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
          className="italic text-[clamp(1.75rem,5.2vw,4.5rem)] font-normal text-white/90 tracking-tight leading-tight mb-1 sm:mb-2 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
        >
          Creating the unexpected
        </span>

        <h1 className="text-[clamp(2.3rem,8.4vw,8rem)] font-black uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F0F9FF] to-[#38BDF8] drop-shadow-[0_4px_28px_rgba(34,211,238,0.35)] w-full text-center">
          {firstName}
        </h1>

        <h2 className="text-[clamp(1.4rem,5.6vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#0E74E9] mt-1.5 sm:mt-3 drop-shadow-[0_2px_22px_rgba(14,116,233,0.45)] w-full text-center">
          {lastName}
        </h2>
      </div>

      <p className="relative z-10 text-xs sm:text-sm md:text-base lg:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl sm:max-w-2xl px-3 mt-4 sm:mt-5 mb-5 sm:mb-7">
        {tagline}
      </p>
    </div>
  );
}
