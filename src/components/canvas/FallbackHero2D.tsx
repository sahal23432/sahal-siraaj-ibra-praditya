'use client';

export default function FallbackHero2D() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: '#070709' }}
    >
      {/* Radial glow center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />
      {/* Circuit grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 50}
            x2="800"
            y2={i * 50}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
        {/* Vertical grid lines */}
        {Array.from({ length: 17 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="600"
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
        {/* RFID signal rings */}
        <circle cx="400" cy="300" r="60" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="400" cy="300" r="100" stroke="#38BDF8" strokeWidth="0.7" fill="none" opacity="0.25" />
        <circle cx="400" cy="300" r="140" stroke="#38BDF8" strokeWidth="0.5" fill="none" opacity="0.15" />
        <circle cx="400" cy="300" r="180" stroke="#38BDF8" strokeWidth="0.3" fill="none" opacity="0.08" />
        {/* Center node */}
        <circle cx="400" cy="300" r="8" fill="#38BDF8" opacity="0.3" />
        <circle cx="400" cy="300" r="3" fill="#60A5FA" opacity="0.8" />
        {/* Circuit traces */}
        <polyline points="400,300 450,300 450,250 550,250" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
        <polyline points="400,300 350,300 350,350 250,350" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
        <polyline points="400,300 400,240 460,180" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
        <polyline points="400,300 400,360 340,420" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
        {/* Node dots */}
        <circle cx="550" cy="250" r="4" fill="white" opacity="0.5" />
        <circle cx="250" cy="350" r="4" fill="white" opacity="0.5" />
        <circle cx="460" cy="180" r="4" fill="white" opacity="0.5" />
        <circle cx="340" cy="420" r="4" fill="white" opacity="0.5" />
      </svg>
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to top, #070709, transparent)' }}
      />
    </div>
  );
}
