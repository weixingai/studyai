/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 的图片优化
  },
  basePath: '/studyai', // 替换成您的 GitHub 仓库名
}

module.exports = nextConfig 