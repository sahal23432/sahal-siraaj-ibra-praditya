import { ImageResponse } from 'next/og';

export const alt = 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Sistem Terintegrasi';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#082F49',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#F8FAFC',
          border: '2px solid rgba(34, 211, 238, 0.25)',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: '20px',
              fontFamily: 'monospace',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#22D3EE',
                marginRight: '12px',
                boxShadow: '0 0 12px #22D3EE',
              }}
            />
            SYS ONLINE · SMKN 9 SEMARANG
          </div>
          <div style={{ fontSize: '18px', fontFamily: 'monospace', color: '#22D3EE' }}>
            2026 REKAYASA SISTEM
          </div>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '20px', fontFamily: 'monospace', color: '#22D3EE', letterSpacing: '0.05em' }}>
            PENGEMBANGAN PERANGKAT LUNAK DAN GIM · PPLG
          </div>
          <div style={{ fontSize: '60px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#FFFFFF' }}>
            Sahal Siraaj Ibra Praditya
          </div>
          <div style={{ fontSize: '24px', color: '#94A3B8', maxWidth: '920px', lineHeight: 1.5 }}>
            Merancang sistem yang menghubungkan perangkat keras fisik (RFID) dengan antarmuka web modern & 3D WebGL.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(34, 211, 238, 0.2)',
            paddingTop: '24px',
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#94A3B8',
          }}
        >
          <div>Console Box RFID · skanilan.tech · Next.js 15</div>
          <div>sahalsiraaj44@gmail.com</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
