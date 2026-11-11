/**
 * 검색 엔진 크롤러 제어 설정 (robots.txt)
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://15-bias-photo-phoeniv-fe.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/my-gallery", "/my-listings", "/guide"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
