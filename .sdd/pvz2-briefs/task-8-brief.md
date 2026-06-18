# Task 8: 实现 PvZ 2 植物详情页

**Files:**
- Modify: `src/pages/Pvz2PlantDetail.jsx`（替换占位）
- Create: `src/components/Pvz2DetailView.jsx`
- Create: `src/components/Pvz2DetailView.module.css`
- Create: `src/components/UpgradeInfo.jsx`
- Create: `src/components/UpgradeInfo.module.css`

## 任务目标

实现 PvZ 2 植物详情页，展示完整属性、能量豆效果和升级信息。

## Step 1: 编写 UpgradeInfo.module.css

升级信息组件样式。

## Step 2: 编写 UpgradeInfo.jsx

展示植物升级信息：
- 是否可升级
- 最高等级
- 升级效果概述

## Step 3: 编写 Pvz2DetailView.module.css

参考 `src/components/DetailView.module.css`，添加 PvZ 2 特有字段样式。

## Step 4: 编写 Pvz2DetailView.jsx

基于现有 DetailView，添加：
- 所属世界
- 解锁关卡
- 能量豆效果
- 升级信息（使用 UpgradeInfo 组件）

## Step 5: 编写 Pvz2PlantDetail.jsx

替换占位页面，使用 Pvz2DetailView 组件。

## Step 6: 验证

运行 `npm run dev`（后台），访问 `/pvz2/plants/:id`，确认详情页显示完整信息。

完成后停止 dev 服务器。

## Step 7: 提交

```bash
git add src/pages/Pvz2PlantDetail.jsx src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css src/components/UpgradeInfo.jsx src/components/UpgradeInfo.module.css
git commit -m "feat(pvz2): implement PvZ 2 plant detail page"
```

## 重要约束

- 复用现有 DetailView 的布局结构
- 使用 PvZ 2 植物数据（从 `../data/pvz2/plants.js` 导入）
- 展示 PvZ 2 特有字段：world、plantFoodEffect、upgradeable、maxUpgradeLevel、upgradeEffect
- 使用 CSS Modules 样式隔离
- 使用中文 UI 文本
- 支持前后导航（上一个/下一个植物）
