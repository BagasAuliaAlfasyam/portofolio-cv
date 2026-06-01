import { ImageResponse } from "next/og";

export const alt =
  "CatalystForge - website, operational systems, and AI automation for Indonesian businesses";
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #1B3A5C 0%, #18324E 52%, #E8531A 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "18px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.22)",
            borderRadius: "18px",
            display: "flex",
            fontSize: 42,
            fontWeight: 800,
            height: 76,
            justifyContent: "center",
            width: 76,
          }}
        >
          CF
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 42, fontWeight: 800 }}>CatalystForge</span>
          <span
            style={{
              color: "rgba(255,255,255,0.76)",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Building Digital Solutions
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.02,
            margin: 0,
            maxWidth: 940,
          }}
        >
          Website, Sistem Operasional, dan AI Automation
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.84)",
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1.32,
            margin: 0,
            maxWidth: 880,
          }}
        >
          Company profile, CRM, HRIS, POS, dashboard, dan workflow automation
          untuk bisnis Indonesia.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {["Company Profile", "Operational System", "AI Automation"].map(
          (item) => (
            <span
              key={item}
              style={{
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: "999px",
                fontSize: 22,
                fontWeight: 700,
                padding: "14px 22px",
              }}
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>,
    size,
  );
}
