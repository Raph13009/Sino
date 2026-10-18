import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "OPOPA Partners — Markets in Sync";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #f3f0e8 0%, #ebe7df 55%, #d9d2c5 100%)",
          color: "#121417",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#5c6168",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#b01e28",
              borderRadius: 2,
            }}
          />
          OPOPA Partners
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              maxWidth: 920,
            }}
          >
            Markets in Sync
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#5c6168",
              maxWidth: 860,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            EU–China commercial partner for industrial and green-tech companies
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#5c6168",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span>www.opopa-partners.com</span>
          <span style={{ color: "#b01e28" }}>Europe · China</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
