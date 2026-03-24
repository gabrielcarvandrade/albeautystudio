import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FEFAF7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial warm glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,136,110,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(196,136,110,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: "1px solid rgba(196,136,110,0.1)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#9B8B83",
              marginBottom: "20px",
            }}
          >
            BEAUTY STUDIO · LAVRAS, MG
          </p>

          {/* Studio name */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "120px",
                fontWeight: 300,
                color: "#2A1A14",
                letterSpacing: "0.08em",
                lineHeight: 0.9,
                margin: 0,
              }}
            >
              AL
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "68px",
                fontWeight: 300,
                color: "#C4886E",
                letterSpacing: "0.18em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Beauty Studio
            </p>
          </div>

          {/* Divider line */}
          <div
            style={{
              width: "120px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C4886E, transparent)",
              margin: "28px 0 24px",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "28px",
              fontStyle: "italic",
              color: "#C4886E",
              letterSpacing: "0.05em",
            }}
          >
            Naturalidade com Elegância
          </p>

          {/* Services row */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "32px",
              fontSize: "14px",
              color: "#9B8B83",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            {["Extensão de Cílios", "·", "Sobrancelhas", "·", "Nail Design"].map((s, i) => (
              <span key={i} style={{ color: i % 2 === 1 ? "#E5D9D0" : "#9B8B83" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
