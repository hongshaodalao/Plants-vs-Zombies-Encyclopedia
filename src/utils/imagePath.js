/**
 * 将相对图片路径转换为带 base URL 的绝对路径
 * 解决 GitHub Pages 子目录部署时的图片路径问题
 */
export function getImagePath(relativePath) {
  // import.meta.env.BASE_URL 在开发时为 '/'，在 GitHub Pages 部署时为 '/Plants-vs-Zombies-Encyclopedia/'
  const base = import.meta.env.BASE_URL
  // 移除路径开头的 '/'（如果有），避免双斜杠
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  return `${base}${cleanPath}`
}
