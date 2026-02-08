import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/edit/", "/create/"],
    },
    sitemap: "https://shadospace.in/sitemap.xml",
  };
}
