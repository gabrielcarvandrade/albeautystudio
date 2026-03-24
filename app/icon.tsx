import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FEFAF7",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "#C4886E",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          AL
        </div>
      </div>
    ),
    { ...size }
  );
}
