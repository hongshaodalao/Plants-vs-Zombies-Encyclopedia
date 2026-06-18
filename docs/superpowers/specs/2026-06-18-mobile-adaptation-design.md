# 移动端适配 - 设计文档

## 1. 项目概述

### 1.1 项目目标

将植物大战僵尸百科全书网站适配移动端设备（手机和平板），提供良好的移动端用户体验。

### 1.2 目标设备

- 手机竖屏：375px - 440px（iPhone SE 到 iPhone 16 Pro Max）
- 手机横屏：667px - 956px
- 小平板：768px - 1024px
- 平板横屏：1024px+

### 1.3 适配范围

- 布局适配（卡片网格、筛选面板、导航栏）
- 不包括触摸交互、移动端导航、性能优化

---

## 2. 断点策略

| 断点 | 宽度 | 设备 | 用途 |
|------|------|------|------|
| 手机 | ≤ 480px | 手机竖屏 | 单列布局、缩小间距 |
| 小平板 | 481px - 768px | 手机横屏、小平板 | 双列布局、适中间距 |
| 平板 | 769px - 1024px | iPad、平板横屏 | 多列布局、完整间距 |
| 桌面 | > 1024px | PC、笔记本 | 完整布局 |

**现有断点**：
- 640px：全局字体、导航栏
- 768px：详情页布局

**新增断点**：
- 480px：超小屏幕手机
- 640px：扩展到卡片网格、筛选面板
- 768px：扩展到版本切换器、TabNav

---

## 3. 组件适配方案

### 3.1 导航栏 (Layout)

**当前问题**：
- 手机上 Logo 文字可能溢出
- 导航链接间距过大

**适配方案**：
- 手机（≤480px）：Logo 文字隐藏，只显示图标
- 手机：导航链接间距缩小
- 平板：正常显示

### 3.2 卡片网格 (PlantsList 等)

**当前问题**：
- `minmax(180px, 1fr)` 在小屏幕上可能单列

**适配方案**：
- 手机（≤480px）：2 列（每列约 170px）
- 小平板（481-768px）：3 列
- 平板（769-1024px）：4 列
- 桌面（>1024px）：5 列

### 3.3 筛选面板 (FilterPanel)

**当前问题**：
- 水平排列在小屏幕上可能溢出

**适配方案**：
- 手机（≤480px）：垂直堆叠，每个筛选项占一行
- 平板：保持水平排列

### 3.4 搜索栏 (SearchBar)

**当前问题**：
- 最大宽度固定 400px

**适配方案**：
- 手机：全宽（`max-width: 100%`）
- 桌面：保持 400px 最大宽度

### 3.5 版本切换器 (VersionSwitcher)

**当前问题**：
- `minmax(280px, 1fr)` 在小屏幕上可能单列

**适配方案**：
- 手机（≤480px）：单列布局
- 平板：双列布局

### 3.6 TabNav

**当前问题**：
- 选项卡可能溢出

**适配方案**：
- 手机（≤480px）：选项卡可水平滚动
- 平板：正常显示

### 3.7 详情页 (DetailView)

**当前问题**：
- 已有 768px 断点改为单列
- 缺少 480px 断点

**适配方案**：
- 手机（≤480px）：补充更紧凑的间距
- 平板：保持现有布局

### 3.8 世界卡片 (WorldCard)

**当前问题**：
- `minmax(240px, 1fr)` 在小屏幕上可能单列

**适配方案**：
- 手机（≤480px）：单列布局
- 平板：双列布局

---

## 4. 分阶段实施计划

### 阶段 1：全局样式与导航栏（预计 1 小时）

- 更新 `src/styles/global.css` 断点
- 更新 `src/components/Layout.module.css` 导航栏适配
- 更新 `src/components/TabNav.module.css` 选项卡适配

### 阶段 2：卡片与列表页（预计 1.5 小时）

- 更新 `src/components/Card.module.css` 卡片尺寸
- 更新 `src/pages/PlantsList.module.css` 植物列表网格
- 更新 `src/pages/ZombiesList.module.css` 僵尸列表网格
- 更新 `src/pages/Pvz2PlantsList.module.css` PvZ 2 植物列表网格
- 更新 `src/pages/Pvz2ZombiesList.module.css` PvZ 2 僵尸列表网格

### 阶段 3：筛选与搜索（预计 1 小时）

- 更新 `src/components/FilterPanel.module.css` 筛选面板堆叠
- 更新 `src/components/Pvz2FilterPanel.module.css` PvZ 2 筛选面板
- 更新 `src/components/SearchBar.module.css` 搜索栏全宽

### 阶段 4：版本切换器与详情页（预计 1 小时）

- 更新 `src/components/VersionSwitcher.module.css` 版本切换器单列
- 更新 `src/components/DetailView.module.css` 详情页补充断点
- 更新 `src/components/Pvz2DetailView.module.css` PvZ 2 详情页
- 更新 `src/pages/WorldDetail.module.css` 世界详情页
- 更新 `src/pages/WorldsList.module.css` 世界列表页

### 阶段 5：测试与优化（预计 0.5 小时）

- 测试所有页面在不同设备上的显示
- 修复发现的问题
- 更新 README

**总计预计：5 小时**

---

## 5. 测试计划

### 5.1 测试设备

- iPhone SE（375px）
- iPhone 14（390px）
- iPhone 16 Pro Max（440px）
- iPad（768px）
- iPad Pro（1024px）

### 5.2 测试页面

- 首页（/）
- PvZ 1 植物列表（/plants）
- PvZ 1 僵尸列表（/zombies）
- PvZ 2 植物列表（/pvz2/plants）
- PvZ 2 僵尸列表（/pvz2/zombies）
- 世界列表（/pvz2/worlds）
- 详情页（/plants/:id、/pvz2/plants/:id）

### 5.3 测试内容

- 布局是否正确（无溢出、无重叠）
- 卡片网格列数是否正确
- 筛选面板是否可用
- 搜索栏是否全宽
- 导航栏是否正常显示
- 详情页是否正常显示

---

## 6. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 断点设置不合理 | 布局异常 | 使用真实设备测试 |
| CSS 优先级冲突 | 样式覆盖 | 使用 CSS Modules 隔离 |
| 图片尺寸问题 | 卡片变形 | 使用 `object-fit: contain` |
| 筛选面板溢出 | 功能不可用 | 垂直堆叠处理 |
