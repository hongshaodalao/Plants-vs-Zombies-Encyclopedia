# 移动端适配 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将植物大战僵尸百科全书网站适配移动端设备（手机和平板），提供良好的移动端用户体验。

**Architecture:** 采用渐进式媒体查询方案，在现有 CSS 基础上添加媒体查询。断点：480px（手机）、640px（小平板）、768px（平板）、1024px（桌面）。使用 CSS Modules 样式隔离，避免样式冲突。

**Tech Stack:** CSS Modules、CSS 媒体查询、CSS Grid、Flexbox

## Global Constraints

- 使用 CSS 媒体查询实现响应式布局
- 断点：480px（手机）、640px（小平板）、768px（平板）、1024px（桌面）
- 使用 CSS Modules 样式隔离
- 不引入新的依赖或框架
- 保持现有功能不变
- 使用中文 UI 文本

---

## 文件结构总览

### 需要修改的文件

| 文件路径 | 修改内容 |
|---------|---------|
| `src/styles/global.css` | 添加 480px 断点 |
| `src/components/Layout.module.css` | 导航栏移动端适配 |
| `src/components/TabNav.module.css` | 选项卡移动端适配 |
| `src/components/Card.module.css` | 卡片尺寸适配 |
| `src/components/SearchBar.module.css` | 搜索栏全宽 |
| `src/components/FilterPanel.module.css` | 筛选面板堆叠 |
| `src/components/Pvz2FilterPanel.module.css` | PvZ 2 筛选面板堆叠 |
| `src/components/VersionSwitcher.module.css` | 版本切换器单列 |
| `src/components/DetailView.module.css` | 详情页补充断点 |
| `src/components/Pvz2DetailView.module.css` | PvZ 2 详情页补充断点 |
| `src/pages/PlantsList.module.css` | 植物列表网格 |
| `src/pages/ZombiesList.module.css` | 僵尸列表网格 |
| `src/pages/Pvz2PlantsList.module.css` | PvZ 2 植物列表网格 |
| `src/pages/Pvz2ZombiesList.module.css` | PvZ 2 僵尸列表网格 |
| `src/pages/WorldsList.module.css` | 世界列表网格 |
| `src/pages/WorldDetail.module.css` | 世界详情页补充断点 |

---

## Task 1: 全局样式与导航栏适配

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Layout.module.css`
- Modify: `src/components/TabNav.module.css`

- [ ] **Step 1: 更新 global.css 添加 480px 断点**

在 `src/styles/global.css` 的 `@media (max-width: 640px)` 块之前添加：

```css
@media (max-width: 480px) {
  :root {
    --font-size-2xl: 1.25rem;
    --font-size-xl: 1.125rem;
    --font-size-lg: 1rem;
    --space-xl: 1.5rem;
    --space-lg: 1rem;
  }
}
```

- [ ] **Step 2: 更新 Layout.module.css 导航栏适配**

在 `src/components/Layout.module.css` 的 `@media (max-width: 640px)` 块内添加：

```css
@media (max-width: 640px) {
  .navbar { padding: var(--space-sm) var(--space-md); }
  .main { padding: var(--space-md); }
  .logo { font-size: var(--font-size-lg); }
  .logoText { display: none; }
  .navLink { padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-sm); }
  .navIcon { width: 20px; height: 20px; }
}
```

同时在 `.logo` 样式中添加 `.logoText` 子类：

```css
.logoText {
  display: inline;
}
```

- [ ] **Step 3: 更新 TabNav.module.css 选项卡适配**

在 `src/components/TabNav.module.css` 末尾添加：

```css
@media (max-width: 480px) {
  .tabNav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tabNav::-webkit-scrollbar {
    display: none;
  }
  .tab {
    flex: 0 0 auto;
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }
}
```

- [ ] **Step 4: 更新 Layout.jsx 添加 logoText 类**

将 `src/components/Layout.jsx` 中的 Logo 文字包裹在 span 中：

```jsx
<NavLink to="/" className={styles.logo}>
  <span className={styles.logoIcon}>🌻</span>
  <span className={styles.logoText}>植物大战僵尸百科全书</span>
</NavLink>
```

- [ ] **Step 5: 验证**

运行 `npm run dev`（后台），在浏览器开发者工具中切换到移动端视图（375px），确认：
- 导航栏不溢出
- Logo 文字隐藏，只显示图标
- 选项卡可水平滚动

完成后停止 dev 服务器。

- [ ] **Step 6: 提交**

```bash
git add src/styles/global.css src/components/Layout.jsx src/components/Layout.module.css src/components/TabNav.module.css
git commit -m "feat(mobile): adapt global styles and navigation for mobile"
```

---

## Task 2: 卡片与列表页适配

**Files:**
- Modify: `src/components/Card.module.css`
- Modify: `src/pages/PlantsList.module.css`
- Modify: `src/pages/ZombiesList.module.css`
- Modify: `src/pages/Pvz2PlantsList.module.css`
- Modify: `src/pages/Pvz2ZombiesList.module.css`

- [ ] **Step 1: 更新 Card.module.css 卡片尺寸**

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
    font-size: var(--font-size-xs);
    gap: var(--space-xs);
  }
}
```

- [ ] **Step 2: 更新 PlantsList.module.css 网格布局**

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

- [ ] **Step 3: 更新 ZombiesList.module.css 网格布局**

将 `src/pages/ZombiesList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

- [ ] **Step 4: 更新 Pvz2PlantsList.module.css 网格布局**

将 `src/pages/Pvz2PlantsList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

- [ ] **Step 5: 更新 Pvz2ZombiesList.module.css 网格布局**

将 `src/pages/Pvz2ZombiesList.module.css` 中的 `.grid` 样式改为与 PlantsList 相同的响应式网格。

- [ ] **Step 6: 验证**

运行 `npm run dev`（后台），在浏览器开发者工具中切换到不同宽度：
- 375px：2 列卡片
- 480px：2 列卡片
- 640px：3 列卡片
- 768px：3 列卡片
- 1024px：4 列卡片

完成后停止 dev 服务器。

- [ ] **Step 7: 提交**

```bash
git add src/components/Card.module.css src/pages/PlantsList.module.css src/pages/ZombiesList.module.css src/pages/Pvz2PlantsList.module.css src/pages/Pvz2ZombiesList.module.css
git commit -m "feat(mobile): adapt card grid layout for mobile"
```

---

## Task 3: 筛选与搜索适配

**Files:**
- Modify: `src/components/FilterPanel.module.css`
- Modify: `src/components/Pvz2FilterPanel.module.css`
- Modify: `src/components/SearchBar.module.css`

- [ ] **Step 1: 更新 FilterPanel.module.css 筛选面板堆叠**

在 `src/components/FilterPanel.module.css` 末尾添加：

```css
@media (max-width: 640px) {
  .panel {
    flex-direction: column;
    align-items: stretch;
  }
  .group {
    min-width: 100%;
  }
  .options {
    flex-wrap: wrap;
  }
}
```

- [ ] **Step 2: 更新 Pvz2FilterPanel.module.css 筛选面板堆叠**

在 `src/components/Pvz2FilterPanel.module.css` 末尾添加与 FilterPanel 相同的媒体查询。

- [ ] **Step 3: 更新 SearchBar.module.css 搜索栏全宽**

将 `src/components/SearchBar.module.css` 中的 `.searchBar` 样式改为：

```css
.searchBar {
  position: relative;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 640px) {
  .searchBar {
    max-width: 100%;
  }
}
```

- [ ] **Step 4: 验证**

运行 `npm run dev`（后台），在浏览器开发者工具中切换到 375px 宽度：
- 筛选面板垂直堆叠
- 搜索栏全宽显示

完成后停止 dev 服务器。

- [ ] **Step 5: 提交**

```bash
git add src/components/FilterPanel.module.css src/components/Pvz2FilterPanel.module.css src/components/SearchBar.module.css
git commit -m "feat(mobile): adapt filter panel and search bar for mobile"
```

---

## Task 4: 版本切换器与详情页适配

**Files:**
- Modify: `src/components/VersionSwitcher.module.css`
- Modify: `src/components/DetailView.module.css`
- Modify: `src/components/Pvz2DetailView.module.css`
- Modify: `src/pages/WorldDetail.module.css`
- Modify: `src/pages/WorldsList.module.css`

- [ ] **Step 1: 更新 VersionSwitcher.module.css 版本切换器单列**

将 `src/components/VersionSwitcher.module.css` 中的 `.switcher` 样式改为：

```css
.switcher {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

@media (max-width: 480px) {
  .switcher {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  .versionImg {
    width: 80px;
    height: 80px;
  }
}
```

- [ ] **Step 2: 更新 DetailView.module.css 详情页补充断点**

在 `src/components/DetailView.module.css` 的 `@media (max-width: 768px)` 块内添加：

```css
@media (max-width: 480px) {
  .detail {
    padding: var(--space-md);
    gap: var(--space-md);
  }
  .image {
    max-width: 150px;
  }
  .title {
    font-size: var(--font-size-xl);
  }
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  .navigation {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
```

- [ ] **Step 3: 更新 Pvz2DetailView.module.css 详情页补充断点**

在 `src/components/Pvz2DetailView.module.css` 的 `@media (max-width: 768px)` 块内添加与 DetailView 相同的 480px 断点样式。

- [ ] **Step 4: 更新 WorldDetail.module.css 详情页补充断点**

在 `src/pages/WorldDetail.module.css` 的 `@media (max-width: 768px)` 块内添加：

```css
@media (max-width: 480px) {
  .detail {
    padding: var(--space-md);
  }
  .title {
    font-size: var(--font-size-xl);
  }
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: 更新 WorldsList.module.css 世界列表网格**

将 `src/pages/WorldsList.module.css` 中的 `.grid` 样式改为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-lg);
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 6: 验证**

运行 `npm run dev`（后台），在浏览器开发者工具中切换到不同宽度：
- 375px：版本切换器单列、详情页单列、世界列表单列
- 480px：版本切换器单列、详情页单列、世界列表单列
- 768px：版本切换器双列、详情页单列、世界列表双列

完成后停止 dev 服务器。

- [ ] **Step 7: 提交**

```bash
git add src/components/VersionSwitcher.module.css src/components/DetailView.module.css src/components/Pvz2DetailView.module.css src/pages/WorldDetail.module.css src/pages/WorldsList.module.css
git commit -m "feat(mobile): adapt version switcher and detail pages for mobile"
```

---

## Task 5: 测试与优化

**Files:**
- Modify: `README.md`（更新文档）

- [ ] **Step 1: 测试所有页面在不同设备上的显示**

在浏览器开发者工具中测试以下页面：
- 首页（/）
- PvZ 1 植物列表（/plants）
- PvZ 1 僵尸列表（/zombies）
- PvZ 2 植物列表（/pvz2/plants）
- PvZ 2 僵尸列表（/pvz2/zombies）
- 世界列表（/pvz2/worlds）
- 详情页（/plants/:id、/pvz2/plants/:id）

测试宽度：
- 375px（iPhone SE）
- 390px（iPhone 14）
- 440px（iPhone 16 Pro Max）
- 768px（iPad）
- 1024px（iPad Pro）

- [ ] **Step 2: 修复发现的问题**

如果发现布局问题，修复相应的 CSS。

- [ ] **Step 3: 更新 README.md**

在 README 中添加移动端适配说明：

```markdown
## 移动端适配

网站支持以下设备：
- 手机：375px - 440px（iPhone SE 到 iPhone 16 Pro Max）
- 平板：768px - 1024px（iPad、iPad Pro）
- 桌面：> 1024px（PC、笔记本）
```

- [ ] **Step 4: 运行生产构建**

```bash
npm run build
```

确认构建成功。

- [ ] **Step 5: 提交**

```bash
git add README.md
git commit -m "docs: update README with mobile adaptation info"
```

---

## 计划自检

### 1. 规格覆盖

- ✅ 全局样式与导航栏适配（Task 1）
- ✅ 卡片与列表页适配（Task 2）
- ✅ 筛选与搜索适配（Task 3）
- ✅ 版本切换器与详情页适配（Task 4）
- ✅ 测试与优化（Task 5）

### 2. 占位符检查

- ✅ 无 TBD/TODO
- ✅ 无"实现类似"引用
- ✅ 所有代码块完整

### 3. 类型一致性

- ✅ 断点值在所有任务中保持一致（480px、640px、768px、1024px）
- ✅ CSS 类名在所有任务中保持一致
- ✅ 媒体查询语法在所有任务中保持一致

### 4. 范围检查

计划涵盖 5 个任务，按顺序执行可产出完整的移动端适配。范围合适，无需拆分。
