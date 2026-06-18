# Task 14: 实现世界列表页和详情页

**Files:**
- Modify: `src/pages/WorldsList.jsx`（替换占位）
- Create: `src/pages/WorldsList.module.css`
- Modify: `src/pages/WorldDetail.jsx`（替换占位）
- Create: `src/components/WorldCard.jsx`
- Create: `src/components/WorldCard.module.css`

## 任务目标

实现世界列表页和详情页，展示 11 个 PvZ 2 世界的信息。

## Step 1: 编写 WorldCard.module.css

世界卡片样式。

## Step 2: 编写 WorldCard.jsx

展示世界基本信息：
- 世界名称
- 世界图标/图片
- 包含的植物/僵尸数量

## Step 3: 编写 WorldsList.module.css

世界列表页样式。

## Step 4: 编写 WorldsList.jsx

使用 WorldCard 组件展示 11 个世界。

## Step 5: 编写 WorldDetail.jsx

世界详情页，展示：
- 世界名称和描述
- 解锁条件
- 包含的植物列表（链接到植物详情）
- 包含的僵尸列表（链接到僵尸详情）
- 关卡数量
- 特殊机制

## Step 6: 验证

运行 `npm run dev`（后台），访问 `/pvz2/worlds` 和 `/pvz2/worlds/:id`。

完成后停止 dev 服务器。

## Step 7: 提交

```bash
git add src/pages/WorldsList.jsx src/pages/WorldsList.module.css src/pages/WorldDetail.jsx src/components/WorldCard.jsx src/components/WorldCard.module.css
git commit -m "feat(pvz2): implement world list and detail pages"
```

## 重要约束

- 使用 PvZ 2 世界数据（11 个条目）
- 世界详情页的植物/僵尸列表使用 Link 组件链接到对应详情页
- 使用 CSS Modules 样式隔离
- 使用中文 UI 文本
- WorldCard 显示世界图片、名称、植物/僵尸数量
