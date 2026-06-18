# Task 2: 卡片与列表页适配

**Files:**
- Modify: `src/components/Card.module.css`
- Modify: `src/pages/PlantsList.module.css`
- Modify: `src/pages/ZombiesList.module.css`
- Modify: `src/pages/Pvz2PlantsList.module.css`
- Modify: `src/pages/Pvz2ZombiesList.module.css`

## Step 1: 更新 Card.module.css 卡片尺寸

在 `src/components/Card.module.css` 末尾添加：

```css
@media (max-width: 480px) {
  .card {
    padding: var(--space-sm);
  }
  .name {
    font-size: var(--font-size-base);
  }
  .stats {
    font-size: var(--font-size-sm);
    gap: var(--space-xs);
  }
}
```

## Step 2: 更新 PlantsList.module.css 网格布局

将 `src/pages/PlantsList.module.css` 中的 `.grid` 样式改为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-md);
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Step 3: 更新 ZombiesList.module.css 网格布局

将 `src/pages/ZombiesList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

## Step 4: 更新 Pvz2PlantsList.module.css 网格布局

将 `src/pages/Pvz2PlantsList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

## Step 5: 更新 Pvz2ZombiesList.module.css 网格布局

将 `src/pages/Pvz2ZombiesList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

## Step 6: 验证

运行 `npm run dev`（后台），在浏览器开发者工具中切换到不同宽度：
- 375px：2 列卡片
- 480px：2 列卡片
- 640px：3 列卡片
- 768px：3 列卡片
- 1024px：4 列卡片

完成后停止 dev 服务器。

## Step 7: 提交

```bash
git add src/components/Card.module.css src/pages/PlantsList.module.css src/pages/ZombiesList.module.css src/pages/Pvz2PlantsList.module.css src/pages/Pvz2ZombiesList.module.css
git commit -m "feat(mobile): adapt card grid layout for mobile"
```

## 重要约束

- 断点：480px（手机）、768px（平板）、1024px（桌面）
- 手机 2 列、小平板 3 列、平板 4 列、桌面 5 列
- 使用 CSS Modules 样式隔离
- 不修改其他文件
