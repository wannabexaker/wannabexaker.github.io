import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ioannis Dimos - Full-Stack Developer",
    short_name: "wannabexaker",
    description:
      "Portfolio of Ioannis Dimos (wannabexaker) - full-stack developer with a background in networks, telecommunications, wireless and IoT.",
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
