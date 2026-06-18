# Task 13: 添加响应式优化

**Files:**
- Modify: `src/styles/global.css`（追加媒体查询和 reduced-motion 规则）

## Step 1: 在 `src/styles/global.css` 末尾追加响应式规则

在 `src/styles/global.css` 文件末尾添加：

```css
@media (max-width: 640px) {
  :root {
    --font-size-2xl: 1.5rem;
    --font-size-xl: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Step 2: 验证移动端布局

在浏览器开发者工具切换到移动端视图（< 640px）：
- 导航栏不溢出
- 卡片网格变为单列
- 详情页布局变为上下堆叠
- 搜索框与筛选面板正常堆叠

完成后停止 dev 服务器。

## Step 3: 提交

```bash
git add src/styles/global.css
git commit -m "feat(styles): add responsive and reduced-motion support"
```

## 重要约束

- 仅修改 `src/styles/global.css`
- 在文件**末尾**追加上述两个媒体查询块（不要修改已有内容）
- 第一个媒体查询：在 max-width: 640px 时缩小 2xl 和 xl 字号
- 第二个媒体查询：prefers-reduced-motion: reduce 时几乎禁用所有动画和过渡
- 不要改写或"优化"已有 CSS
- 不要新增其他文件
- 使用 `!important` 强制覆盖以确保 reduced-motion 优先
