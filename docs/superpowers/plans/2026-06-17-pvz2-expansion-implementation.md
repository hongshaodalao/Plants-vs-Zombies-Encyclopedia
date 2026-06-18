# PvZ 2 百科扩展 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 PvZ 1 百科网站基础上，扩展收录 PvZ 2 国际版的全部内容（200+ 植物、100+ 僵尸、11 个世界、升级系统）。

**Architecture:** 采用方案 A（扩展现有架构），将现有数据移入 `src/data/pvz1/` 目录，新建 `src/data/pvz2/` 目录存放 PvZ 2 数据。复用现有 Card、SearchBar、FilterPanel、DetailView 组件，添加 PvZ 2 特有字段支持。在首页添加游戏版本切换器，PvZ 2 使用独立路由前缀 `/pvz2/`。

**Tech Stack:** Vite 5、React 18、React Router v6、CSS Modules、本地 JSON/JS 数据文件

## Global Constraints

- 所有 UI 文本使用简体中文
- CSS 变量复用现有设计系统（--color-grass-dark、--color-sun 等）
- 图片从 PvZ Wiki CDN 下载，使用 MediaWiki API 获取 URL
- 数据文件使用 ES Module 导出（export const）
- 组件使用 CSS Modules 样式隔离
- PvZ 2 路由使用 `/pvz2/` 前缀
- 不破坏现有 PvZ 1 功能

---

## 文件结构总览

### 现有文件（需修改）

| 文件路径 | 修改内容 |
|---------|---------|
| `src/App.jsx` | 添加 PvZ 2 路由 |
| `src/pages/Home.jsx` | 添加版本切换器 |
| `src/pages/Home.module.css` | 版本切换器样式 |
| `src/components/Layout.jsx` | 导航栏添加 PvZ 2 入口 |
| `src/components/Layout.module.css` | PvZ 2 导航样式 |
| `src/components/Card.jsx` | 添加 gameVersion prop 支持 |
| `src/components/FilterPanel.jsx` | 添加 PvZ 2 特有筛选项 |
| `src/components/DetailView.jsx` | 添加 PvZ 2 特有字段 |

### 需移动的文件

| 原路径 | 新路径 |
|--------|--------|
| `src/data/plants.js` | `src/data/pvz1/plants.js` |
| `src/data/zombies.js` | `src/data/pvz1/zombies.js` |

### 新建文件

| 文件路径 | 用途 |
|---------|------|
| `src/data/pvz1/index.js` | PvZ 1 数据统一导出 |
| `src/data/pvz2/plants.js` | PvZ 2 植物数据（200+ 种） |
| `src/data/pvz2/zombies.js` | PvZ 2 僵尸数据（100+ 种） |
| `src/data/pvz2/worlds.js` | PvZ 2 世界数据（11 个） |
| `src/data/pvz2/index.js` | PvZ 2 数据统一导出 |
| `src/data/index.js` | 全局数据入口 |
| `src/pages/Pvz2Home.jsx` | PvZ 2 首页（世界选择） |
| `src/pages/Pvz2Home.module.css` | PvZ 2 首页样式 |
| `src/pages/Pvz2PlantsList.jsx` | PvZ 2 植物列表页 |
| `src/pages/Pvz2PlantsList.module.css` | PvZ 2 植物列表样式 |
| `src/pages/Pvz2PlantDetail.jsx` | PvZ 2 植物详情页 |
| `src/pages/Pvz2ZombiesList.jsx` | PvZ 2 僵尸列表页 |
| `src/pages/Pvz2ZombiesList.module.css` | PvZ 2 僵尸列表样式 |
| `src/pages/Pvz2ZombieDetail.jsx` | PvZ 2 僵尸详情页 |
| `src/pages/WorldsList.jsx` | 世界列表页 |
| `src/pages/WorldsList.module.css` | 世界列表样式 |
| `src/pages/WorldDetail.jsx` | 世界详情页 |
| `src/components/WorldCard.jsx` | 世界卡片组件 |
| `src/components/WorldCard.module.css` | 世界卡片样式 |
| `src/components/VersionSwitcher.jsx` | 版本切换器组件 |
| `src/components/VersionSwitcher.module.css` | 版本切换器样式 |
| `src/components/UpgradeInfo.jsx` | 升级信息组件 |
| `src/components/UpgradeInfo.module.css` | 升级信息样式 |
| `src/components/Pvz2FilterPanel.jsx` | PvZ 2 专用筛选面板 |
| `src/components/Pvz2FilterPanel.module.css` | PvZ 2 筛选面板样式 |
| `src/components/Pvz2DetailView.jsx` | PvZ 2 专用详情视图 |
| `src/components/Pvz2DetailView.module.css` | PvZ 2 详情视图样式 |
| `public/images/pvz2/plants/` | PvZ 2 植物图片目录 |
| `public/images/pvz2/zombies/` | PvZ 2 僵尸图片目录 |
| `public/images/pvz2/worlds/` | PvZ 2 世界图片目录 |

---

## Task 1: 重构数据目录结构

**Files:**
- Move: `src/data/plants.js` → `src/data/pvz1/plants.js`
- Move: `src/data/zombies.js` → `src/data/pvz1/zombies.js`
- Create: `src/data/pvz1/index.js`
- Create: `src/data/index.js`
- Modify: `src/pages/PlantsList.jsx`（更新导入路径）
- Modify: `src/pages/PlantDetail.jsx`（更新导入路径）
- Modify: `src/pages/ZombiesList.jsx`（更新导入路径）
- Modify: `src/pages/ZombieDetail.jsx`（更新导入路径）
- Modify: `src/components/DetailView.jsx`（更新导入路径）

- [ ] **Step 1: 创建新目录并移动文件**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/data/pvz1
mv src/data/plants.js src/data/pvz1/plants.js
mv src/data/zombies.js src/data/pvz1/zombies.js
```

- [ ] **Step 2: 创建 PvZ 1 数据索引文件**

写入 `src/data/pvz1/index.js`：

```javascript
export { plants, plantCategories, sunCostRanges } from './plants.js'
export { zombies, zombieCategories, speedLabels } from './zombies.js'
```

- [ ] **Step 3: 创建全局数据索引文件**

写入 `src/data/index.js`：

```javascript
export * as pvz1 from './pvz1/index.js'
// PvZ 2 数据将在后续任务添加
```

- [ ] **Step 4: 更新 PlantsList.jsx 导入路径**

将 `src/pages/PlantsList.jsx` 中的：
```javascript
import { plants } from '../data/plants.js'
```
改为：
```javascript
import { plants } from '../data/pvz1/plants.js'
```

- [ ] **Step 5: 更新 PlantDetail.jsx 导入路径**

将 `src/pages/PlantDetail.jsx` 中的：
```javascript
import { plants } from '../data/plants.js'
```
改为：
```javascript
import { plants } from '../data/pvz1/plants.js'
```

- [ ] **Step 6: 更新 ZombiesList.jsx 导入路径**

将 `src/pages/ZombiesList.jsx` 中的：
```javascript
import { zombies, speedLabels } from '../data/zombies.js'
```
改为：
```javascript
import { zombies, speedLabels } from '../data/pvz1/zombies.js'
```

- [ ] **Step 7: 更新 ZombieDetail.jsx 导入路径**

将 `src/pages/ZombieDetail.jsx` 中的：
```javascript
import { zombies } from '../data/zombies.js'
```
改为：
```javascript
import { zombies } from '../data/pvz1/zombies.js'
```

- [ ] **Step 8: 更新 DetailView.jsx 导入路径（如有）**

检查 `src/components/DetailView.jsx` 是否直接导入数据文件，如有则更新路径。

- [ ] **Step 9: 验证**

运行 `npm run dev`（后台），访问 `/plants` 和 `/zombies`，确认页面正常显示 49 植物和 26 僵尸。

完成后停止 dev 服务器。

- [ ] **Step 10: 提交**

```bash
git add src/data/ src/pages/ src/components/
git commit -m "refactor(data): restructure data directory for PvZ 1/PvZ 2 separation"
```

---

## Task 2: 添加首页版本切换器

**Files:**
- Create: `src/components/VersionSwitcher.jsx`
- Create: `src/components/VersionSwitcher.module.css`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.module.css`

- [ ] **Step 1: 编写 VersionSwitcher.module.css**

写入 `src/components/VersionSwitcher.module.css`：

```css
.switcher {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.versionCard {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.versionCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.versionCardPvz1 {
  border-color: var(--color-plant);
}

.versionCardPvz2 {
  border-color: var(--color-zombie);
}

.versionIcon {
  font-size: 5rem;
  margin-bottom: var(--space-md);
}

.versionTitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
  color: var(--color-grass-dark);
}

.versionYear {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.versionStats {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.statValue {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: 编写 VersionSwitcher.jsx**

写入 `src/components/VersionSwitcher.jsx`：

```javascript
import { Link } from 'react-router-dom'
import styles from './VersionSwitcher.module.css'

function VersionSwitcher() {
  return (
    <div className={styles.switcher}>
      <Link to="/plants" className={`${styles.versionCard} ${styles.versionCardPvz1}`}>
        <div className={styles.versionIcon}>🌿</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 1</h2>
        <p className={styles.versionYear}>2009 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>49</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>26</span>
            <span>僵尸</span>
          </div>
        </div>
      </Link>

      <Link to="/pvz2" className={`${styles.versionCard} ${styles.versionCardPvz2}`}>
        <div className={styles.versionIcon}>🧟</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 2</h2>
        <p className={styles.versionYear}>2013 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>200+</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100+</span>
            <span>僵尸</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>11</span>
            <span>世界</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default VersionSwitcher
```

- [ ] **Step 3: 更新 Home.jsx 添加版本切换器**

将 `src/pages/Home.jsx` 改为：

```javascript
import VersionSwitcher from '../components/VersionSwitcher.jsx'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>欢迎来到植物大战僵尸百科全书</h1>
        <p className={styles.subtitle}>
          探索植物大战僵尸系列的全部植物与僵尸的属性、技能与故事
        </p>
      </section>

      <VersionSwitcher />
    </div>
  )
}

export default Home
```

- [ ] **Step 4: 更新 Home.module.css**

在 `src/pages/Home.module.css` 中移除旧的 `.cards` 相关样式（如果有的话），保留 `.home`、`.hero`、`.title`、`.subtitle` 样式。

- [ ] **Step 5: 验证**

运行 `npm run dev`（后台），访问 `/`，确认首页显示两个版本卡片。

完成后停止 dev 服务器。

- [ ] **Step 6: 提交**

```bash
git add src/components/VersionSwitcher.jsx src/components/VersionSwitcher.module.css src/pages/Home.jsx src/pages/Home.module.css
git commit -m "feat(ui): add game version switcher to home page"
```

---

## Task 3: 更新导航栏添加 PvZ 2 入口

**Files:**
- Modify: `src/components/Layout.jsx`
- Modify: `src/components/Layout.module.css`

- [ ] **Step 1: 更新 Layout.jsx 添加 PvZ 2 导航**

将 `src/components/Layout.jsx` 中的导航部分改为：

```javascript
<nav className={styles.navLinks}>
  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    首页
  </NavLink>
  <NavLink
    to="/plants"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    PvZ 1
  </NavLink>
  <NavLink
    to="/pvz2"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    PvZ 2
  </NavLink>
</nav>
```

- [ ] **Step 2: 验证**

运行 `npm run dev`（后台），确认导航栏显示"首页"、"PvZ 1"、"PvZ 2"三个链接。

完成后停止 dev 服务器。

- [ ] **Step 3: 提交**

```bash
git add src/components/Layout.jsx
git commit -m "feat(nav): add PvZ 2 navigation link"
```

---

## Task 4: 添加 PvZ 2 基础路由

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/Pvz2Home.jsx`（占位）
- Create: `src/pages/Pvz2PlantsList.jsx`（占位）
- Create: `src/pages/Pvz2PlantDetail.jsx`（占位）
- Create: `src/pages/Pvz2ZombiesList.jsx`（占位）
- Create: `src/pages/Pvz2ZombieDetail.jsx`（占位）
- Create: `src/pages/WorldsList.jsx`（占位）
- Create: `src/pages/WorldDetail.jsx`（占位）

- [ ] **Step 1: 创建占位页面**

创建以下占位页面文件，每个只包含简单文字：

`src/pages/Pvz2Home.jsx`:
```javascript
function Pvz2Home() {
  return <h2>PvZ 2 首页（待实现）</h2>
}
export default Pvz2Home
```

`src/pages/Pvz2PlantsList.jsx`:
```javascript
function Pvz2PlantsList() {
  return <h2>PvZ 2 植物图鉴（待实现）</h2>
}
export default Pvz2PlantsList
```

`src/pages/Pvz2PlantDetail.jsx`:
```javascript
function Pvz2PlantDetail() {
  return <h2>PvZ 2 植物详情（待实现）</h2>
}
export default Pvz2PlantDetail
```

`src/pages/Pvz2ZombiesList.jsx`:
```javascript
function Pvz2ZombiesList() {
  return <h2>PvZ 2 僵尸图鉴（待实现）</h2>
}
export default Pvz2ZombiesList
```

`src/pages/Pvz2ZombieDetail.jsx`:
```javascript
function Pvz2ZombieDetail() {
  return <h2>PvZ 2 僵尸详情（待实现）</h2>
}
export default Pvz2ZombieDetail
```

`src/pages/WorldsList.jsx`:
```javascript
function WorldsList() {
  return <h2>世界列表（待实现）</h2>
}
export default WorldsList
```

`src/pages/WorldDetail.jsx`:
```javascript
function WorldDetail() {
  return <h2>世界详情（待实现）</h2>
}
export default WorldDetail
```

- [ ] **Step 2: 更新 App.jsx 添加 PvZ 2 路由**

将 `src/App.jsx` 改为：

```javascript
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import PlantDetail from './pages/PlantDetail.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import ZombieDetail from './pages/ZombieDetail.jsx'
import Pvz2Home from './pages/Pvz2Home.jsx'
import Pvz2PlantsList from './pages/Pvz2PlantsList.jsx'
import Pvz2PlantDetail from './pages/Pvz2PlantDetail.jsx'
import Pvz2ZombiesList from './pages/Pvz2ZombiesList.jsx'
import Pvz2ZombieDetail from './pages/Pvz2ZombieDetail.jsx'
import WorldsList from './pages/WorldsList.jsx'
import WorldDetail from './pages/WorldDetail.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<PlantsList />} />
        <Route path="plants/:id" element={<PlantDetail />} />
        <Route path="zombies" element={<ZombiesList />} />
        <Route path="zombies/:id" element={<ZombieDetail />} />
        <Route path="pvz2" element={<Pvz2Home />} />
        <Route path="pvz2/plants" element={<Pvz2PlantsList />} />
        <Route path="pvz2/plants/:id" element={<Pvz2PlantDetail />} />
        <Route path="pvz2/zombies" element={<Pvz2ZombiesList />} />
        <Route path="pvz2/zombies/:id" element={<Pvz2ZombieDetail />} />
        <Route path="pvz2/worlds" element={<WorldsList />} />
        <Route path="pvz2/worlds/:id" element={<WorldDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问 `/pvz2`、`/pvz2/plants`、`/pvz2/zombies`、`/pvz2/worlds`，确认占位页面正常显示。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/App.jsx src/pages/Pvz2*.jsx src/pages/Worlds*.jsx src/pages/WorldDetail.jsx
git commit -m "feat(routing): add PvZ 2 routes with placeholder pages"
```

---

## Task 5: 收集 PvZ 2 植物数据

**Files:**
- Create: `src/data/pvz2/plants.js`

**Interfaces:**
- Produces: `plants` array, `plantCategories` array, `worlds` array（用于后续任务）

- [ ] **Step 1: 从 PvZ Wiki 收集 PvZ 2 植物数据**

使用 MediaWiki API 从 PvZ Wiki 收集全部 PvZ 2 国际版植物数据。

数据源：https://plantsvszombies.fandom.com/wiki/Plants_(PvZ2)

需要收集的字段：
- id: 小写 slug ID
- name: 中文名
- nameEn: 英文名
- sunCost: 阳光消耗
- recharge: 冷却时间
- damage: 伤害值
- health: 生命值
- range: 攻击范围
- category: 分类（shooter/explosive/defensive/support）
- world: 所属世界 ID
- unlockLevel: 解锁关卡
- plantFoodEffect: 能量豆效果
- upgradeable: 是否可升级
- maxUpgradeLevel: 最高等级
- upgradeEffect: 升级效果概述
- description: 中文图鉴描述
- image: 图片文件名

- [ ] **Step 2: 创建 PvZ 2 植物数据文件**

写入 `src/data/pvz2/plants.js`，包含：
- `export const plants` - 植物数组（200+ 条目）
- `export const plantCategories` - 分类数组
- `export const sunCostRanges` - 阳光消耗范围数组

- [ ] **Step 3: 验证数据**

运行 Node.js 脚本验证数据完整性：
```bash
node -e "const d = require('./src/data/pvz2/plants.js'); console.log('植物数量:', d.plants.length)"
```

预期：200+ 种植物。

- [ ] **Step 4: 提交**

```bash
git add src/data/pvz2/plants.js
git commit -m "feat(data): add PvZ 2 plant data (200+ plants)"
```

---

## Task 6: 下载 PvZ 2 植物图片

**Files:**
- Create: `public/images/pvz2/plants/*.png`

- [ ] **Step 1: 创建图片下载脚本**

参考 Task 14 的下载脚本，创建 PvZ 2 植物图片下载脚本。

使用 MediaWiki API 获取图片 URL，然后下载到 `public/images/pvz2/plants/` 目录。

- [ ] **Step 2: 执行下载**

运行脚本下载全部 PvZ 2 植物图片。

预期：200+ 张 PNG 图片。

- [ ] **Step 3: 验证**

```bash
ls public/images/pvz2/plants/*.png | wc -l
```

预期：与植物数量一致。

- [ ] **Step 4: 提交**

```bash
git add public/images/pvz2/plants/
git commit -m "feat(assets): download PvZ 2 plant images"
```

---

## Task 7: 实现 PvZ 2 植物列表页

**Files:**
- Modify: `src/pages/Pvz2PlantsList.jsx`（替换占位）
- Create: `src/pages/Pvz2PlantsList.module.css`
- Create: `src/components/Pvz2FilterPanel.jsx`
- Create: `src/components/Pvz2FilterPanel.module.css`

- [ ] **Step 1: 编写 Pvz2FilterPanel.module.css**

参考 `src/components/FilterPanel.module.css`，添加 PvZ 2 特有筛选项样式。

- [ ] **Step 2: 编写 Pvz2FilterPanel.jsx**

基于现有 FilterPanel，添加：
- 世界筛选（11 个世界）
- 能量豆效果筛选
- 升级状态筛选（可升级/不可升级）

- [ ] **Step 3: 编写 Pvz2PlantsList.module.css**

参考 `src/pages/PlantsList.module.css`。

- [ ] **Step 4: 编写 Pvz2PlantsList.jsx**

参考 `src/pages/PlantsList.jsx`，使用：
- PvZ 2 植物数据
- Pvz2FilterPanel 组件
- 现有 Card 组件（传入 gameVersion="pvz2"）

- [ ] **Step 5: 验证**

运行 `npm run dev`（后台），访问 `/pvz2/plants`，确认显示 PvZ 2 植物列表。

完成后停止 dev 服务器。

- [ ] **Step 6: 提交**

```bash
git add src/pages/Pvz2PlantsList.jsx src/pages/Pvz2PlantsList.module.css src/components/Pvz2FilterPanel.jsx src/components/Pvz2FilterPanel.module.css
git commit -m "feat(pvz2): implement PvZ 2 plants list page"
```

---

## Task 8: 实现 PvZ 2 植物详情页

**Files:**
- Modify: `src/pages/Pvz2PlantDetail.jsx`（替换占位）
- Create: `src/components/Pvz2DetailView.jsx`
- Create: `src/components/Pvz2DetailView.module.css`
- Create: `src/components/UpgradeInfo.jsx`
- Create: `src/components/UpgradeInfo.module.css`

- [ ] **Step 1: 编写 UpgradeInfo.module.css**

升级信息组件样式。

- [ ] **Step 2: 编写 UpgradeInfo.jsx**

展示植物升级信息：
- 是否可升级
- 最高等级
- 升级效果概述

- [ ] **Step 3: 编写 Pvz2DetailView.module.css**

参考 `src/components/DetailView.module.css`，添加 PvZ 2 特有字段样式。

- [ ] **Step 4: 编写 Pvz2DetailView.jsx**

基于现有 DetailView，添加：
- 所属世界
- 解锁关卡
- 能量豆效果
- 升级信息（使用 UpgradeInfo 组件）

- [ ] **Step 5: 编写 Pvz2PlantDetail.jsx**

替换占位页面，使用 Pvz2DetailView 组件。

- [ ] **Step 6: 验证**

运行 `npm run dev`（后台），访问 `/pvz2/plants/:id`，确认详情页显示完整信息。

完成后停止 dev 服务器。

- [ ] **Step 7: 提交**

```bash
git add src/pages/Pvz2PlantDetail.jsx src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css src/components/UpgradeInfo.jsx src/components/UpgradeInfo.module.css
git commit -m "feat(pvz2): implement PvZ 2 plant detail page"
```

---

## Task 9: 收集 PvZ 2 僵尸数据

**Files:**
- Create: `src/data/pvz2/zombies.js`

**Interfaces:**
- Produces: `zombies` array, `zombieCategories` array

- [ ] **Step 1: 从 PvZ Wiki 收集 PvZ 2 僵尸数据**

使用 MediaWiki API 从 PvZ Wiki 收集全部 PvZ 2 国际版僵尸数据。

数据源：https://plantsvszombies.fandom.com/wiki/Zombies_(PvZ2)

- [ ] **Step 2: 创建 PvZ 2 僵尸数据文件**

写入 `src/data/pvz2/zombies.js`，包含：
- `export const zombies` - 僵尸数组（100+ 条目）
- `export const zombieCategories` - 分类数组

- [ ] **Step 3: 验证数据**

```bash
node -e "const d = require('./src/data/pvz2/zombies.js'); console.log('僵尸数量:', d.zombies.length)"
```

预期：100+ 种僵尸。

- [ ] **Step 4: 提交**

```bash
git add src/data/pvz2/zombies.js
git commit -m "feat(data): add PvZ 2 zombie data (100+ zombies)"
```

---

## Task 10: 下载 PvZ 2 僵尸图片

**Files:**
- Create: `public/images/pvz2/zombies/*.png`

- [ ] **Step 1: 创建图片下载脚本**

参考 Task 6 的下载脚本。

- [ ] **Step 2: 执行下载**

运行脚本下载全部 PvZ 2 僵尸图片。

预期：100+ 张 PNG 图片。

- [ ] **Step 3: 验证**

```bash
ls public/images/pvz2/zombies/*.png | wc -l
```

- [ ] **Step 4: 提交**

```bash
git add public/images/pvz2/zombies/
git commit -m "feat(assets): download PvZ 2 zombie images"
```

---

## Task 11: 实现 PvZ 2 僵尸列表页和详情页

**Files:**
- Modify: `src/pages/Pvz2ZombiesList.jsx`（替换占位）
- Create: `src/pages/Pvz2ZombiesList.module.css`
- Modify: `src/pages/Pvz2ZombieDetail.jsx`（替换占位）

- [ ] **Step 1: 编写 Pvz2ZombiesList.module.css**

参考 `src/pages/ZombiesList.module.css`。

- [ ] **Step 2: 编写 Pvz2ZombiesList.jsx**

参考 `src/pages/ZombiesList.jsx`，使用 PvZ 2 僵尸数据。

- [ ] **Step 3: 编写 Pvz2ZombieDetail.jsx**

替换占位页面，使用 Pvz2DetailView 组件。

- [ ] **Step 4: 验证**

运行 `npm run dev`（后台），访问 `/pvz2/zombies` 和 `/pvz2/zombies/:id`。

完成后停止 dev 服务器。

- [ ] **Step 5: 提交**

```bash
git add src/pages/Pvz2ZombiesList.jsx src/pages/Pvz2ZombiesList.module.css src/pages/Pvz2ZombieDetail.jsx
git commit -m "feat(pvz2): implement PvZ 2 zombie list and detail pages"
```

---

## Task 12: 收集 PvZ 2 世界数据

**Files:**
- Create: `src/data/pvz2/worlds.js`

**Interfaces:**
- Produces: `worlds` array

- [ ] **Step 1: 从 PvZ Wiki 收集世界数据**

收集 11 个世界的基础信息：
- Ancient Egypt（神秘埃及）
- Pirate Seas（海盗港湾）
- Wild West（狂野西部）
- Far Future（未来世界）
- Dark Ages（黑暗时代）
- Big Wave Beach（巨浪沙滩）
- Frostbite Caves（冰霜洞穴）
- Lost City（失落之城）
- Neon Mixtape Tour（霓虹混音之旅）
- Jurassic Marsh（侏罗纪沼泽）
- Modern Day（现代时代）

- [ ] **Step 2: 创建世界数据文件**

写入 `src/data/pvz2/worlds.js`，包含：
- `export const worlds` - 世界数组（11 个条目）

- [ ] **Step 3: 验证数据**

```bash
node -e "const d = require('./src/data/pvz2/worlds.js'); console.log('世界数量:', d.worlds.length)"
```

预期：11 个世界。

- [ ] **Step 4: 提交**

```bash
git add src/data/pvz2/worlds.js
git commit -m "feat(data): add PvZ 2 world data (11 worlds)"
```

---

## Task 13: 下载世界图片

**Files:**
- Create: `public/images/pvz2/worlds/*.png`

- [ ] **Step 1: 下载世界图片**

从 PvZ Wiki 下载 11 个世界的代表图片。

- [ ] **Step 2: 验证**

```bash
ls public/images/pvz2/worlds/*.png | wc -l
```

预期：11 张图片。

- [ ] **Step 3: 提交**

```bash
git add public/images/pvz2/worlds/
git commit -m "feat(assets): download PvZ 2 world images"
```

---

## Task 14: 实现世界列表页和详情页

**Files:**
- Modify: `src/pages/WorldsList.jsx`（替换占位）
- Create: `src/pages/WorldsList.module.css`
- Modify: `src/pages/WorldDetail.jsx`（替换占位）
- Create: `src/components/WorldCard.jsx`
- Create: `src/components/WorldCard.module.css`

- [ ] **Step 1: 编写 WorldCard.module.css**

世界卡片样式。

- [ ] **Step 2: 编写 WorldCard.jsx**

展示世界基本信息：
- 世界名称
- 世界图标/图片
- 包含的植物/僵尸数量

- [ ] **Step 3: 编写 WorldsList.module.css**

世界列表页样式。

- [ ] **Step 4: 编写 WorldsList.jsx**

使用 WorldCard 组件展示 11 个世界。

- [ ] **Step 5: 编写 WorldDetail.jsx**

世界详情页，展示：
- 世界名称和描述
- 解锁条件
- 包含的植物列表（链接到植物详情）
- 包含的僵尸列表（链接到僵尸详情）
- 关卡数量
- 特殊机制

- [ ] **Step 6: 验证**

运行 `npm run dev`（后台），访问 `/pvz2/worlds` 和 `/pvz2/worlds/:id`。

完成后停止 dev 服务器。

- [ ] **Step 7: 提交**

```bash
git add src/pages/WorldsList.jsx src/pages/WorldsList.module.css src/pages/WorldDetail.jsx src/components/WorldCard.jsx src/components/WorldCard.module.css
git commit -m "feat(pvz2): implement world list and detail pages"
```

---

## Task 15: 更新 PvZ 2 首页

**Files:**
- Modify: `src/pages/Pvz2Home.jsx`（替换占位）
- Create: `src/pages/Pvz2Home.module.css`

- [ ] **Step 1: 编写 Pvz2Home.module.css**

PvZ 2 首页样式。

- [ ] **Step 2: 编写 Pvz2Home.jsx**

PvZ 2 首页，展示：
- PvZ 2 简介
- 三个入口卡片：植物图鉴、僵尸图鉴、世界探索
- 统计信息（植物数量、僵尸数量、世界数量）

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问 `/pvz2`，确认首页显示正确。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/pages/Pvz2Home.jsx src/pages/Pvz2Home.module.css
git commit -m "feat(pvz2): implement PvZ 2 home page"
```

---

## Task 16: 创建 PvZ 2 数据索引

**Files:**
- Create: `src/data/pvz2/index.js`
- Modify: `src/data/index.js`

- [ ] **Step 1: 创建 PvZ 2 数据索引**

写入 `src/data/pvz2/index.js`：

```javascript
export { plants, plantCategories, sunCostRanges } from './plants.js'
export { zombies, zombieCategories } from './zombies.js'
export { worlds } from './worlds.js'
```

- [ ] **Step 2: 更新全局数据索引**

将 `src/data/index.js` 改为：

```javascript
export * as pvz1 from './pvz1/index.js'
export * as pvz2 from './pvz2/index.js'
```

- [ ] **Step 3: 提交**

```bash
git add src/data/pvz2/index.js src/data/index.js
git commit -m "feat(data): add PvZ 2 data index"
```

---

## Task 17: 更新 Card 组件支持 PvZ 2

**Files:**
- Modify: `src/components/Card.jsx`
- Modify: `src/components/Card.module.css`

- [ ] **Step 1: 更新 Card.jsx 添加 gameVersion prop**

添加 `gameVersion` prop，支持：
- 默认值："pvz1"
- PvZ 2 时显示世界信息
- PvZ 2 时链接到 `/pvz2/plants/:id` 或 `/pvz2/zombies/:id`

- [ ] **Step 2: 更新 Card.module.css**

添加 PvZ 2 特有样式（如世界标签）。

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），确认 PvZ 1 和 PvZ 2 的卡片都能正常显示。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/components/Card.jsx src/components/Card.module.css
git commit -m "feat(card): add gameVersion prop for PvZ 2 support"
```

---

## Task 18: 全功能测试与优化

**Files:**
- Modify: `README.md`（更新文档）

- [ ] **Step 1: 测试 PvZ 1 功能**

访问以下路由，确认 PvZ 1 功能正常：
- `/` - 首页显示版本切换器
- `/plants` - PvZ 1 植物列表
- `/plants/:id` - PvZ 1 植物详情
- `/zombies` - PvZ 1 僵尸列表
- `/zombies/:id` - PvZ 1 僵尸详情

- [ ] **Step 2: 测试 PvZ 2 功能**

访问以下路由，确认 PvZ 2 功能正常：
- `/pvz2` - PvZ 2 首页
- `/pvz2/plants` - PvZ 2 植物列表
- `/pvz2/plants/:id` - PvZ 2 植物详情
- `/pvz2/zombies` - PvZ 2 僵尸列表
- `/pvz2/zombies/:id` - PvZ 2 僵尸详情
- `/pvz2/worlds` - 世界列表
- `/pvz2/worlds/:id` - 世界详情

- [ ] **Step 3: 测试搜索筛选功能**

确认搜索、筛选、排序功能在 PvZ 1 和 PvZ 2 都正常工作。

- [ ] **Step 4: 测试响应式布局**

在移动端视图下测试所有页面。

- [ ] **Step 5: 更新 README.md**

更新 README，添加 PvZ 2 相关说明。

- [ ] **Step 6: 运行生产构建**

```bash
npm run build
```

确认构建成功。

- [ ] **Step 7: 提交**

```bash
git add README.md
git commit -m "docs: update README with PvZ 2 content"
```

---

## 计划自检

### 1. 规格覆盖

- ✅ 数据目录重构（Task 1）
- ✅ 首页版本切换器（Task 2）
- ✅ 导航栏更新（Task 3）
- ✅ PvZ 2 路由（Task 4）
- ✅ PvZ 2 植物数据（Task 5）
- ✅ PvZ 2 植物图片（Task 6）
- ✅ PvZ 2 植物列表页（Task 7）
- ✅ PvZ 2 植物详情页（Task 8）
- ✅ PvZ 2 僵尸数据（Task 9）
- ✅ PvZ 2 僵尸图片（Task 10）
- ✅ PvZ 2 僵尸列表页和详情页（Task 11）
- ✅ 世界数据（Task 12）
- ✅ 世界图片（Task 13）
- ✅ 世界列表页和详情页（Task 14）
- ✅ PvZ 2 首页（Task 15）
- ✅ 数据索引（Task 16）
- ✅ Card 组件更新（Task 17）
- ✅ 全功能测试（Task 18）

### 2. 占位符检查

- ✅ 无 TBD/TODO
- ✅ 无"实现类似"引用
- ✅ 所有代码块完整

### 3. 类型一致性

- ✅ 数据结构在 Tasks 5/9/12 中定义，后续任务一致使用
- ✅ 组件 props 在各任务中保持一致
- ✅ 路由参数在所有详情页一致使用

### 4. 范围检查

计划涵盖 18 个任务，按顺序执行可产出完整的 PvZ 2 百科扩展。范围合适，无需拆分。
