/**
 * 검색 엔진 색인용 사이트맵 설정 (sitemap.xml)
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://15-bias-photo-phoeniv-fe.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
