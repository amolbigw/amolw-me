import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.role}, ${site.company}`;
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
          background: "#0a0a0b",
          color: "#e8e8e6",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8a8a86",
          }}
        >
          <span style={{ color: "#009ef0", marginRight: 24 }}>●</span>
          {site.role} · {site.company}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, lineHeight: 1 }}>
            Amol
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              color: "#009ef0",
            }}
          >
            Waishampayan
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8a8a86",
            borderTop: "2px solid #1f1f1e",
            paddingTop: 32,
          }}
        >
          First-party data · CTV attribution · AI for marketers
        </div>
      </div>
    ),
    size,
  );
}
