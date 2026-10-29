'use client';

export default function FallbackHero2D() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: '#082F49' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(34,211,238,0.12) 0%, transparent 75%)',
        }}
      />
      {/* Circuit grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.14]"
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
            stroke="#22D3EE"
            strokeWidth="0.5"
            opacity="0.3"
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
            stroke="#22D3EE"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {/* RFID signal rings */}
        <circle cx="400" cy="300" r="60" stroke="#22D3EE" strokeWidth="1.2" fill="none" opacity="0.6" />
        <circle cx="400" cy="300" r="100" stroke="#0E74E9" strokeWidth="0.9" fill="none" opacity="0.45" />
        <circle cx="400" cy="300" r="145" stroke="#22D3EE" strokeWidth="0.6" fill="none" opacity="0.3" />
        <circle cx="400" cy="300" r="195" stroke="#0E74E9" strokeWidth="0.4" fill="none" opacity="0.2" />
        {/* Center node */}
        <circle cx="400" cy="300" r="10" fill="#22D3EE" opacity="0.4" />
        <circle cx="400" cy="300" r="4" fill="#FFFFFF" opacity="0.9" />
        {/* Circuit traces */}
        <polyline points="400,300 450,300 450,250 550,250" stroke="#22D3EE" strokeWidth="1" fill="none" opacity="0.5" />
        <polyline points="400,300 350,300 350,350 250,350" stroke="#22D3EE" strokeWidth="1" fill="none" opacity="0.5" />
        <polyline points="400,300 400,240 460,180" stroke="#0E74E9" strokeWidth="1" fill="none" opacity="0.5" />
        <polyline points="400,300 400,360 340,420" stroke="#0E74E9" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Node dots */}
        <circle cx="550" cy="250" r="4" fill="#22D3EE" opacity="0.8" />
        <circle cx="250" cy="350" r="4" fill="#22D3EE" opacity="0.8" />
        <circle cx="460" cy="180" r="4" fill="#0E74E9" opacity="0.8" />
        <circle cx="340" cy="420" r="4" fill="#0E74E9" opacity="0.8" />
      </svg>
      {/* Bottom vignette to surface dark */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(to top, #082F49, transparent)',
        }}
      />
    </div>
  );
}
