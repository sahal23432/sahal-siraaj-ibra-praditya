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
          background: '#070709',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#F4F4F6',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: '20px',
              fontFamily: 'monospace',
              color: '#A1A1AA',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#38BDF8',
                marginRight: '12px',
              }}
            />
            SYS ONLINE · SMKN 9 SEMARANG
          </div>
          <div style={{ fontSize: '18px', fontFamily: 'monospace', color: '#63636E' }}>
            2026 REKAYASA SISTEM
          </div>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '22px', fontFamily: 'monospace', color: '#38BDF8' }}>
            PENGEMBANGAN PERANGKAT LUNAK DAN GIM
          </div>
          <div style={{ fontSize: '56px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Sahal Siraaj Ibra Praditya
          </div>
          <div style={{ fontSize: '26px', color: '#A1A1AA', maxWidth: '900px' }}>
            Merancang sistem yang menghubungkan perangkat keras fisik (RFID) dengan antarmuka web modern.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#63636E',
          }}
        >
          <div>Console Box RFID · skanilan.tech · 3D WebGL</div>
          <div>sahalsiraaj44@gmail.com</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
