import type { MetadataRoute } from "next";

const baseUrl = "https://pawnjustice.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["", "/ms", "/zh"];
  const paths = ["", "/story", "/rights", "/complaints", "/complaints/submit", "/about"];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    }))
  );
}
