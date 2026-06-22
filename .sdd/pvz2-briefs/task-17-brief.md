# Task 17: 更新 Card 组件支持 PvZ 2

**Files:**
- Modify: `src/components/Card.jsx`
- Modify: `src/components/Card.module.css`

## 任务目标

更新 Card 组件，添加 gameVersion prop 支持 PvZ 2。

## Step 1: 更新 Card.jsx 添加 gameVersion prop

添加 `gameVersion` prop，支持：
- 默认值："pvz1"
- PvZ 2 时显示世界信息
- PvZ 2 时链接到 `/pvz2/plants/:id` 或 `/pvz2/zombies/:id`

## Step 2: 更新 Card.module.css

添加 PvZ 2 特有样式（如世界标签）。

## Step 3: 验证

运行 `npm run dev`（后台），确认 PvZ 1 和 PvZ 2 的卡片都能正常显示。

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/components/Card.jsx src/components/Card.module.css
git commit -m "feat(card): add gameVersion prop for PvZ 2 support"
```

## 重要约束

- 保持向后兼容（默认 gameVersion="pvz1"）
- PvZ 2 卡片显示世界标签
- 使用 CSS Modules 样式隔离
- 不破坏现有 PvZ 1 功能
