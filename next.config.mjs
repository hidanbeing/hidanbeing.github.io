/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages는 Node 서버가 없으므로 정적 HTML로 내보낸다.
  output: 'export',
  // next/image 최적화는 서버가 필요하므로 비활성화한다.
  images: { unoptimized: true },
  // /projects/field → /projects/field/index.html 로 떨어져 새로고침해도 404가 나지 않는다.
  trailingSlash: true,
};
export default nextConfig;
