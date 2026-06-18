# Task 15: 构建优化与部署验证

**Files:**
- Modify: `vite.config.js`（添加 manualChunks 优化）

## Step 1: 优化 `vite.config.js`

将 `vite.config.js` 改为：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

## Step 2: 运行生产构建

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
npm run build
```

预期：构建成功，输出 `dist/` 目录，无报错。

## Step 3: 本地预览生产构建

```bash
npm run preview
```

访问预览 URL，验证：
- 所有页面正常工作
- 图片正常加载
- 路由跳转正常
- 搜索筛选正常

完成后停止 preview 服务器。

## Step 4: 检查构建产物大小

```bash
du -sh dist/
ls -lh dist/assets/
```

预期：`dist/` 总大小 < 5MB（包含图片资源），`react-vendor` 拆分为独立 chunk。

## Step 5: 提交

```bash
git add vite.config.js
git commit -m "build: optimize production build with vendor chunking"
```

## 重要约束

- 仅修改 `vite.config.js`（1 个文件）
- 不要修改其他文件
- 不要修改 `package.json`（已经包含 `dev`/`build`/`preview` 脚本）
- 使用 brief 中的精确代码
- 验证构建和预览步骤都必须实际执行并通过
