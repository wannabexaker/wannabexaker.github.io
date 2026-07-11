import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://wannabexaker.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/em-spectrum/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mcq-trainer/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writeups/sql-injection`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/writeups/social-engineering`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
