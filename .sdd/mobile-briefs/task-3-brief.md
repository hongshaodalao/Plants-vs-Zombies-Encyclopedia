# Task 3: 筛选与搜索适配

**Files:**
- Modify: `src/components/FilterPanel.module.css`
- Modify: `src/components/Pvz2FilterPanel.module.css`
- Modify: `src/components/SearchBar.module.css`

## Step 1: 更新 FilterPanel.module.css 筛选面板堆叠

在 `src/components/FilterPanel.module.css` 末尾添加：

```css
@media (max-width: 640px) {
  .panel {
    flex-direction: column;
    align-items: stretch;
  }
  .group {
    min-width: 100%;
  }
  .options {
    flex-wrap: wrap;
  }
}
```

## Step 2: 更新 Pvz2FilterPanel.module.css 筛选面板堆叠

在 `src/components/Pvz2FilterPanel.module.css` 末尾添加与 FilterPanel 相同的媒体查询。

## Step 3: 更新 SearchBar.module.css 搜索栏全宽

将 `src/components/SearchBar.module.css` 中的 `.searchBar` 样式改为：

```css
.searchBar {
  position: relative;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 640px) {
  .searchBar {
    max-width: 100%;
  }
}
```

## Step 4: 验证

运行 `npm run dev`（后台），在浏览器开发者工具中切换到 375px 宽度：
- 筛选面板垂直堆叠
- 搜索栏全宽显示

完成后停止 dev 服务器。

## Step 5: 提交

```bash
git add src/components/FilterPanel.module.css src/components/Pvz2FilterPanel.module.css src/components/SearchBar.module.css
git commit -m "feat(mobile): adapt filter panel and search bar for mobile"
```

## 重要约束

- 断点：640px（小平板）
- 筛选面板在手机上垂直堆叠
- 搜索栏在手机上全宽
- 使用 CSS Modules 样式隔离
- 不修改其他文件
