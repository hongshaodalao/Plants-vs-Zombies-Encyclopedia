# Task 14 Report: 实现世界列表页和详情页

## 实施内容

### 创建的文件
1. **`src/components/WorldCard.jsx`** - 世界卡片组件，展示世界图片、名称、英文名、植物数量和僵尸数量
2. **`src/components/WorldCard.module.css`** - 世界卡片样式，16:9 图片比例，悬停动画效果
3. **`src/pages/WorldsList.module.css`** - 世界列表页样式，响应式网格布局
4. **`src/pages/WorldDetail.module.css`** - 世界详情页样式，两栏布局，植物/僵尸列表展示

### 修改的文件
5. **`src/pages/WorldsList.jsx`** - 替换占位符，使用 WorldCard 组件展示 11 个世界
6. **`src/pages/WorldDetail.jsx`** - 替换占位符，实现完整的世界详情页

## 功能特性

### 世界列表页 (`/pvz2/worlds`)
- 展示全部 11 个 PvZ 2 世界
- 使用 WorldCard 组件以网格形式展示
- 每个卡片显示世界图片、中文名、英文名、植物数量、僵尸数量
- 点击卡片跳转到对应世界详情页

### 世界详情页 (`/pvz2/worlds/:id`)
- 两栏布局：左侧世界图片，右侧详细信息
- 显示信息：名称、英文名、描述、关卡数量、特殊机制、解锁条件
- 植物列表：交叉引用 plantIds 与 plants 数据，展示植物图片和名称，可点击跳转
- 僵尸列表：交叉引用 zombieIds 与 zombies 数据，展示僵尸图片和名称，可点击跳转
- 前/后导航按钮，可在世界间切换
- 返回按钮跳转回世界列表
- 处理了 modern_day 世界 plantIds 中包含 `<br>` 的异常数据

### 数据处理
- 过滤掉 plantIds/zombieIds 中包含 `<` 的无效 ID（如 `hollyknight<br>hollybarrierleaf<br>hollybarrierleafplantfood`）
- 使用 `find` 方法交叉引用植物/僵尸数据，`filter(Boolean)` 过滤未找到的条目

## 验证结果

- `npm run dev` 启动成功，无编译错误
- `/pvz2/worlds` 路由返回 200，页面正常渲染
- `/pvz2/worlds/ancient_egypt` 路由返回 200
- `/pvz2/worlds/modern_day` 路由返回 200（包含大量植物/僵尸数据）
- `/pvz2/worlds/nonexistent` 路由客户端重定向到 `/pvz2/worlds`
- `npm run build` 生产构建成功，无错误
- 开发服务器已停止

## 自检结果

- 所有文件使用 CSS Modules 样式隔离
- UI 文本全部使用中文
- 使用 Link 组件进行导航
- 世界列表页展示全部 11 个世界
- 世界详情页展示所有要求的信息字段
- 植物/僵尸链接导航到正确的详情页

## 注意事项

- 任务简报中文件列表未包含 `WorldDetail.module.css`，但该文件是详情页样式所必需的，已一并创建
- WorldCard 使用 16:9 宽高比展示世界图片（与植物/僵尸的 1:1 比例不同），更符合世界场景图的展示需求
