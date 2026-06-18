# Task 11: 实现 PvZ 2 僵尸列表页和详情页

**Files:**
- Modify: `src/pages/Pvz2ZombiesList.jsx`（替换占位）
- Create: `src/pages/Pvz2ZombiesList.module.css`
- Modify: `src/pages/Pvz2ZombieDetail.jsx`（替换占位）

## 任务目标

实现 PvZ 2 僵尸列表页和详情页。

## Step 1: 编写 Pvz2ZombiesList.module.css

参考 `src/pages/ZombiesList.module.css`。

## Step 2: 编写 Pvz2ZombiesList.jsx

参考 `src/pages/ZombiesList.jsx`，使用：
- PvZ 2 僵尸数据（从 `../data/pvz2/zombies.js` 导入）
- Pvz2FilterPanel 组件（复用 Task 7 创建的）
- 现有 Card 组件（传入 gameVersion="pvz2"）

## Step 3: 编写 Pvz2ZombieDetail.jsx

替换占位页面，使用 Pvz2DetailView 组件。

## Step 4: 验证

运行 `npm run dev`（后台），访问 `/pvz2/zombies` 和 `/pvz2/zombies/:id`。

完成后停止 dev 服务器。

## Step 5: 提交

```bash
git add src/pages/Pvz2ZombiesList.jsx src/pages/Pvz2ZombiesList.module.css src/pages/Pvz2ZombieDetail.jsx
git commit -m "feat(pvz2): implement PvZ 2 zombie list and detail pages"
```

## 重要约束

- 复用现有 Card 组件（传入 gameVersion="pvz2"）
- 复用 Pvz2FilterPanel 组件（传入 type="zombie"）
- 使用 PvZ 2 僵尸数据（189 条目）
- 支持搜索（name、nameEn、description）
- 支持筛选（world、category、speed）
- 支持排序（health、damage、firstAppearance）
- 使用 CSS Modules 样式隔离
- 使用中文 UI 文本
