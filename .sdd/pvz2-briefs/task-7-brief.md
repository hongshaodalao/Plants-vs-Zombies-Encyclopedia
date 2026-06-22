# Task 7: 实现 PvZ 2 植物列表页

**Files:**
- Modify: `src/pages/Pvz2PlantsList.jsx`（替换占位）
- Create: `src/pages/Pvz2PlantsList.module.css`
- Create: `src/components/Pvz2FilterPanel.jsx`
- Create: `src/components/Pvz2FilterPanel.module.css`

## 任务目标

实现 PvZ 2 植物列表页，支持搜索、筛选和排序功能。

## Step 1: 编写 Pvz2FilterPanel.module.css

参考 `src/components/FilterPanel.module.css`，添加 PvZ 2 特有筛选项样式。

## Step 2: 编写 Pvz2FilterPanel.jsx

基于现有 FilterPanel，添加：
- 世界筛选（11 个世界）
- 能量豆效果筛选（可选）
- 升级状态筛选（可升级/不可升级）

## Step 3: 编写 Pvz2PlantsList.module.css

参考 `src/pages/PlantsList.module.css`。

## Step 4: 编写 Pvz2PlantsList.jsx

参考 `src/pages/PlantsList.jsx`，使用：
- PvZ 2 植物数据（从 `../data/pvz2/plants.js` 导入）
- Pvz2FilterPanel 组件
- 现有 Card 组件（传入 gameVersion="pvz2"）

## Step 5: 验证

运行 `npm run dev`（后台），访问 `/pvz2/plants`，确认显示 PvZ 2 植物列表。

完成后停止 dev 服务器。

## Step 6: 提交

```bash
git add src/pages/Pvz2PlantsList.jsx src/pages/Pvz2PlantsList.module.css src/components/Pvz2FilterPanel.jsx src/components/Pvz2FilterPanel.module.css
git commit -m "feat(pvz2): implement PvZ 2 plants list page"
```

## 重要约束

- 复用现有 Card 组件（传入 gameVersion="pvz2"）
- 使用 PvZ 2 植物数据（213 条目）
- 支持搜索（name、nameEn、description）
- 支持筛选（world、category、sunCostRange）
- 支持排序（sunCost、damage、health）
- 使用 CSS Modules 样式隔离
- 使用中文 UI 文本
