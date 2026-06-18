# Task 15: 更新 PvZ 2 首页

**Files:**
- Modify: `src/pages/Pvz2Home.jsx`（替换占位）
- Create: `src/pages/Pvz2Home.module.css`

## 任务目标

实现 PvZ 2 首页，展示 PvZ 2 简介和三个入口卡片。

## Step 1: 编写 Pvz2Home.module.css

PvZ 2 首页样式。

## Step 2: 编写 Pvz2Home.jsx

PvZ 2 首页，展示：
- PvZ 2 简介
- 三个入口卡片：植物图鉴、僵尸图鉴、世界探索
- 统计信息（植物数量、僵尸数量、世界数量）

## Step 3: 验证

运行 `npm run dev`（后台），访问 `/pvz2`，确认首页显示正确。

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/pages/Pvz2Home.jsx src/pages/Pvz2Home.module.css
git commit -m "feat(pvz2): implement PvZ 2 home page"
```

## 重要约束

- 使用 Link 组件导航到 /pvz2/plants、/pvz2/zombies、/pvz2/worlds
- 显示 PvZ 2 统计信息（213 植物、189 僵尸、11 世界）
- 使用 CSS Modules 样式隔离
- 使用中文 UI 文本
- 参考首页（Home.jsx）的设计风格
