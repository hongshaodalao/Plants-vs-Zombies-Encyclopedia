/**
 * 图片路径处理工具
 * - 开发环境：使用本地路径
 * - 生产环境：使用 jsDelivr CDN 加速
 * - 自动将 .png 转换为 .webp 格式引用
 */

// CDN 配置
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/hongshaodalao/Plants-vs-Zombies-Encyclopedia@main/public'

export function getImagePath(relativePath) {
  // 移除路径开头的 '/'（如果有），避免双斜杠
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath

  // 将 .png 替换为 .webp
  const webpPath = cleanPath.replace(/\.png$/i, '.webp')

  // 生产环境使用 CDN
  if (import.meta.env.PROD) {
    return `${CDN_BASE}/${webpPath}`
  }

  // 开发环境使用本地路径
  return `${import.meta.env.BASE_URL}${webpPath}`
}
