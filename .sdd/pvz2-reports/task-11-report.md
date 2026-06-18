# Task 11 Report: 实现 PvZ 2 僵尸列表页和详情页

## 实现内容

### 1. Pvz2ZombiesList.jsx
- 替换占位页面，实现完整的僵尸列表页
- 导入 PvZ 2 僵尸数据（189 条目）
- 复用 Card 组件（传入 gameVersion="pvz2"）
- 复用 Pvz2FilterPanel 组件（传入 type="zombie"）
- 支持搜索：name、nameEn、description
- 支持筛选：world、category、speed
- 支持排序：health、damage、firstAppearance

### 2. Pvz2ZombiesList.module.css
- 基于 Pvz2PlantsList.module.css 创建
- 使用 CSS Modules 样式隔离

### 3. Pvz2ZombieDetail.jsx
- 替换占位页面，使用 Pvz2DetailView 组件
- 传入 type="zombie" 参数

### 4. Pvz2FilterPanel.jsx 修改
- 添加 type prop 支持（默认 "plant"）
- 僵尸分类：basic、cone、bucket、special
- 僵尸速度筛选：slow、medium、fast
- 僵尸排序选项：health、damage、firstAppearance

### 5. Pvz2DetailView.jsx 修改
- 添加 type prop 支持（默认 "plant"）
- 根据 type 动态设置导航路径
- 僵尸详情显示：health、damage、speed、firstAppearance、weakness、special
- 植物详情保持原有显示：sunCost、recharge、damage、health、range、unlockLevel、plantFoodEffect

## 验证结果

- `/pvz2/zombies` 返回 200
- `/pvz2/zombies/basic_zombie` 返回 200
- `/pvz2/plants` 返回 200（未受影响）
- `/pvz2/plants/peashooter` 返回 200（未受影响）
- 僵尸数据：189 条目

## 文件变更

- 新增：src/pages/Pvz2ZombiesList.jsx
- 新增：src/pages/Pvz2ZombiesList.module.css
- 替换：src/pages/Pvz2ZombieDetail.jsx
- 修改：src/components/Pvz2FilterPanel.jsx
- 修改：src/components/Pvz2DetailView.jsx

## 自检结果

- [x] 创建 Pvz2ZombiesList.jsx 和 Pvz2ZombiesList.module.css
- [x] 替换 Pvz2ZombieDetail.jsx（非追加）
- [x] 僵尸列表页使用 PvZ 2 僵尸数据（189 条目）
- [x] 支持搜索、筛选、排序
- [x] 搜索支持 name、nameEn、description
- [x] 筛选支持 world、category、speed
- [x] 排序支持 health、damage、firstAppearance
- [x] 复用 Card 组件（传入 gameVersion="pvz2"）
- [x] 复用 Pvz2FilterPanel（传入 type="zombie"）
- [x] 使用 CSS Modules 样式隔离
- [x] 使用中文 UI 文本

## 提交

- 5faf0b8 feat(pvz2): implement PvZ 2 zombie list and detail pages
