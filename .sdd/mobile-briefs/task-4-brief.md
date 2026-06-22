# Task 4: 版本切换器与详情页适配

**Files:**
- Modify: `src/components/VersionSwitcher.module.css`
- Modify: `src/components/DetailView.module.css`
- Modify: `src/components/Pvz2DetailView.module.css`
- Modify: `src/pages/WorldDetail.module.css`
- Modify: `src/pages/WorldsList.module.css`

## Step 1: 更新 VersionSwitcher.module.css 版本切换器单列

将 `src/components/VersionSwitcher.module.css` 中的 `.switcher` 样式改为：

```css
.switcher {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

@media (max-width: 480px) {
  .switcher {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  .versionImg {
    width: 80px;
    height: 80px;
  }
}
```

## Step 2: 更新 DetailView.module.css 详情页补充断点

在 `src/components/DetailView.module.css` 的 `@media (max-width: 768px)` 块内添加：

```css
@media (max-width: 480px) {
  .detail {
    padding: var(--space-md);
    gap: var(--space-md);
  }
  .image {
    max-width: 150px;
  }
  .title {
    font-size: var(--font-size-xl);
  }
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  .navigation {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
```

## Step 3: 更新 Pvz2DetailView.module.css 详情页补充断点

在 `src/components/Pvz2DetailView.module.css` 的 `@media (max-width: 768px)` 块内添加与 DetailView 相同的 480px 断点样式。

## Step 4: 更新 WorldDetail.module.css 详情页补充断点

在 `src/pages/WorldDetail.module.css` 的 `@media (max-width: 768px)` 块内添加：

```css
@media (max-width: 480px) {
  .detail {
    padding: var(--space-md);
  }
  .title {
    font-size: var(--font-size-xl);
  }
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Step 5: 更新 WorldsList.module.css 世界列表网格

将 `src/pages/WorldsList.module.css` 中的 `.grid` 样式改为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-lg);
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Step 6: 验证

运行 `npm run dev`（后台），在浏览器开发者工具中切换到不同宽度：
- 375px：版本切换器单列、详情页单列、世界列表单列
- 480px：版本切换器单列、详情页单列、世界列表单列
- 768px：版本切换器双列、详情页单列、世界列表双列

完成后停止 dev 服务器。

## Step 7: 提交

```bash
git add src/components/VersionSwitcher.module.css src/components/DetailView.module.css src/components/Pvz2DetailView.module.css src/pages/WorldDetail.module.css src/pages/WorldsList.module.css
git commit -m "feat(mobile): adapt version switcher and detail pages for mobile"
```

## 重要约束

- 断点：480px（手机）、768px（平板）
- 版本切换器在手机上单列
- 详情页在手机上单列、属性网格 2 列
- 世界列表在手机上单列
- 使用 CSS Modules 样式隔离
- 不修改其他文件
