# Task 1: 全局样式与导航栏适配

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Layout.jsx`
- Modify: `src/components/Layout.module.css`
- Modify: `src/components/TabNav.module.css`

## Step 1: 更新 global.css 添加 480px 断点

在 `src/styles/global.css` 的 `@media (max-width: 640px)` 块之前添加：

```css
@media (max-width: 480px) {
  :root {
    --font-size-2xl: 1.25rem;
    --font-size-xl: 1.125rem;
    --font-size-lg: 1rem;
    --space-xl: 1.5rem;
    --space-lg: 1rem;
  }
}
```

## Step 2: 更新 Layout.module.css 导航栏适配

在 `src/components/Layout.module.css` 的 `@media (max-width: 640px)` 块内添加：

```css
.logoText { display: none; }
.navLink { padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-sm); }
.navIcon { width: 20px; height: 20px; }
```

同时在 `.logo` 样式中添加 `.logoText` 子类：

```css
.logoText {
  display: inline;
}
```

## Step 3: 更新 TabNav.module.css 选项卡适配

在 `src/components/TabNav.module.css` 末尾添加：

```css
@media (max-width: 480px) {
  .tabNav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tabNav::-webkit-scrollbar {
    display: none;
  }
  .tab {
    flex: 0 0 auto;
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }
}
```

## Step 4: 更新 Layout.jsx 添加 logoText 类

将 `src/components/Layout.jsx` 中的 Logo 文字包裹在 span 中：

```jsx
<NavLink to="/" className={styles.logo}>
  <span className={styles.logoIcon}>🌻</span>
  <span className={styles.logoText}>植物大战僵尸百科全书</span>
</NavLink>
```

## Step 5: 验证

运行 `npm run dev`（后台），在浏览器开发者工具中切换到移动端视图（375px），确认：
- 导航栏不溢出
- Logo 文字隐藏，只显示图标
- 选项卡可水平滚动

完成后停止 dev 服务器。

## Step 6: 提交

```bash
git add src/styles/global.css src/components/Layout.jsx src/components/Layout.module.css src/components/TabNav.module.css
git commit -m "feat(mobile): adapt global styles and navigation for mobile"
```

## 重要约束

- 断点：480px（手机）、640px（小平板）
- Logo 文字在手机上隐藏，只显示图标
- 选项卡在手机上可水平滚动
- 使用 CSS Modules 样式隔离
- 不修改其他文件
