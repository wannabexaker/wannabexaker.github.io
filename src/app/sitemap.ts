import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://wannabexaker.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/em-spectrum/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mcq-trainer/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
