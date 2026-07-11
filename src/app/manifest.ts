import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ioannis Dimos — Security & Development",
    short_name: "wannabexaker",
    description:
      "Portfolio of Ioannis Dimos (wannabexaker) — cybersecurity analyst, network engineer, and full-stack developer.",
    start_url: "/",
    display: "browser",
    background_color: "#060a08",
    theme_color: "#060a08",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
