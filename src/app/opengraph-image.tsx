import { ImageResponse } from "next/og";

export const alt = "Danyal Khan — Ideas into experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#f8f8f6",
        padding: "68px",
        color: "#171717",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span>DANYAL KHAN®</span>
        <span style={{ color: "#666" }}>CREATIVE DIRECTOR</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 100,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -6,
        }}
      >
        <span>Ideas into</span>
        <span style={{ color: "#3478f6" }}>experiences.</span>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#666" }}>
        Design · Motion · Strategy · Technology
      </div>
    </div>,
    size,
  );
}
