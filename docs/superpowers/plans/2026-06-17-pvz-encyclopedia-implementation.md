# 植物大战僵尸百科全书 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个 React 静态网站，提供植物大战僵尸 1 代所有植物和僵尸的图鉴浏览、搜索、筛选和详情查看功能。

**Architecture:** 使用 Vite + React 18 + React Router v6 构建纯前端 SPA。所有数据存放在 `src/data/` 下的本地 JS 文件中，图片存放在 `public/images/` 目录。组件按职责拆分，状态使用 React Hooks（`useState` / `useReducer`）管理，样式使用 CSS Modules 配合全局 CSS 变量实现游戏主题。

**Tech Stack:** Vite、React 18、React Router v6、CSS Modules、ESLint

---

## 文件结构总览

| 文件路径 | 职责 |
|---------|------|
| `package.json` | 项目依赖与脚本配置 |
| `vite.config.js` | Vite 构建配置 |
| `index.html` | HTML 入口 |
| `src/main.jsx` | React 入口，挂载 App |
| `src/App.jsx` | 根组件，配置路由 |
| `src/styles/variables.css` | 全局 CSS 变量（颜色、字体、间距） |
| `src/styles/global.css` | 全局基础样式（reset、body、链接） |
| `src/data/plants.js` | 植物数据数组 |
| `src/data/zombies.js` | 僵尸数据数组 |
| `src/components/Layout.jsx` + `.module.css` | 整体布局（导航栏 + 内容出口） |
| `src/components/Card.jsx` + `.module.css` | 植物/僵尸卡片 |
| `src/components/SearchBar.jsx` + `.module.css` | 搜索框（带防抖） |
| `src/components/FilterPanel.jsx` + `.module.css` | 筛选面板 |
| `src/components/DetailView.jsx` + `.module.css` | 详情视图（植物/僵尸共用） |
| `src/components/Pagination.jsx` + `.module.css` | 分页组件（可选） |
| `src/pages/Home.jsx` + `.module.css` | 首页（欢迎页 + 导航） |
| `src/pages/PlantsList.jsx` + `.module.css` | 植物图鉴列表页 |
| `src/pages/PlantDetail.jsx` | 植物详情页（路由级） |
| `src/pages/ZombiesList.jsx` + `.module.css` | 僵尸图鉴列表页 |
| `src/pages/ZombieDetail.jsx` | 僵尸详情页（路由级） |
| `src/pages/NotFound.jsx` | 404 页面 |
| `public/images/plants/*.png` | 植物图片资源 |
| `public/images/zombies/*.png` | 僵尸图片资源 |

---

## Task 1: 初始化 Vite + React 项目

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`
- Create: `.gitignore`

- [ ] **Step 1: 创建项目目录结构**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/components src/pages src/data src/styles public/images/plants public/images/zombies
```

- [ ] **Step 2: 编写 `package.json`**

写入 `package.json`：

```json
{
  "name": "pvz-encyclopedia",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.10"
  }
}
```

- [ ] **Step 3: 编写 `vite.config.js`**

写入 `vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './'
})
```

`base: './'` 保证静态部署时相对路径正确。

- [ ] **Step 4: 编写 `index.html`**

写入 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌻%3C/text%3E%3C/svg%3E" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>植物大战僵尸百科全书</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: 编写 `src/main.jsx`**

写入 `src/main.jsx`：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 6: 编写 `src/App.jsx`（临时占位）**

写入 `src/App.jsx`：

```javascript
function App() {
  return (
    <div>
      <h1>植物大战僵尸百科全书</h1>
    </div>
  )
}

export default App
```

- [ ] **Step 7: 编写 `src/styles/variables.css`**

写入 `src/styles/variables.css`：

```css
:root {
  /* 主色调 */
  --color-grass-dark: #4A7C2E;
  --color-grass-light: #6BA53D;
  --color-sun: #FFD700;
  --color-sun-dark: #E6B800;
  --color-dirt: #8B6914;
  --color-sky: #87CEEB;
  --color-plant: #2ECC71;
  --color-zombie: #E74C3C;

  /* 文字色 */
  --color-text-primary: #2C3E50;
  --color-text-secondary: #5D6D7E;
  --color-text-light: #FFFFFF;

  /* 中性色 */
  --color-bg-card: rgba(255, 255, 255, 0.92);
  --color-border: #8B6914;
  --color-shadow: rgba(0, 0, 0, 0.2);

  /* 字体 */
  --font-family: "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;

  /* 间距 */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* 圆角与阴影 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-card: 0 2px 8px var(--color-shadow);
  --shadow-hover: 0 8px 16px var(--color-shadow);

  /* 过渡 */
  --transition: all 0.2s ease;
}
```

- [ ] **Step 8: 编写 `src/styles/global.css`**

写入 `src/styles/global.css`：

```css
@import './variables.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: linear-gradient(180deg, #87CEEB 0%, #4A7C2E 100%);
  min-height: 100vh;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

ul {
  list-style: none;
}
```

- [ ] **Step 9: 编写 `.gitignore`**

写入 `.gitignore`：

```
node_modules
dist
.DS_Store
*.local
.vscode
.idea
```

- [ ] **Step 10: 安装依赖**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
npm install
```

预期：依赖安装成功，无报错。

- [ ] **Step 11: 启动开发服务器并验证**

```bash
npm run dev
```

预期：Vite 启动，终端显示 `Local: http://localhost:5173/`，浏览器访问看到"植物大战僵尸百科全书"标题。

- [ ] **Step 12: 提交**

```bash
git init
git add .
git commit -m "chore: initialize Vite + React project"
```

---

## Task 2: 准备植物数据

**Files:**
- Create: `src/data/plants.js`

- [ ] **Step 1: 编写 `src/data/plants.js`**

写入 `src/data/plants.js`：

```javascript
export const plants = [
  {
    id: "peashooter",
    name: "豌豆射手",
    nameEn: "Peashooter",
    sunCost: 100,
    recharge: 7.5,
    damage: 20,
    health: 300,
    range: "直线",
    category: "shooter",
    unlockLevel: 1,
    description: "最基础的植物，向前方直线发射豌豆攻击僵尸。",
    image: "/images/plants/peashooter.png"
  },
  {
    id: "sunflower",
    name: "向日葵",
    nameEn: "Sunflower",
    sunCost: 50,
    recharge: 7.5,
    damage: 0,
    health: 300,
    range: "无",
    category: "support",
    unlockLevel: 1,
    description: "定期生产阳光，是经济来源的核心。",
    image: "/images/plants/sunflower.png"
  },
  {
    id: "cherrybomb",
    name: "樱桃炸弹",
    nameEn: "Cherry Bomb",
    sunCost: 150,
    recharge: 50,
    damage: 1800,
    health: 300,
    range: "周围 3x3",
    category: "explosive",
    unlockLevel: 2,
    description: "延迟 1.2 秒后爆炸，对周围大范围造成巨大伤害。",
    image: "/images/plants/cherrybomb.png"
  },
  {
    id: "wallnut",
    name: "坚果墙",
    nameEn: "Wall-nut",
    sunCost: 50,
    recharge: 30,
    damage: 0,
    health: 4000,
    range: "无",
    category: "defensive",
    unlockLevel: 1,
    description: "高生命值的防御植物，能阻挡僵尸前进。",
    image: "/images/plants/wallnut.png"
  },
  {
    id: "potatomine",
    name: "土豆地雷",
    nameEn: "Potato Mine",
    sunCost: 25,
    recharge: 30,
    damage: 1800,
    health: 300,
    range: "单个",
    category: "explosive",
    unlockLevel: 2,
    description: "需要 15 秒准备时间，被僵尸踩到时爆炸。",
    image: "/images/plants/potatomine.png"
  },
  {
    id: "snowpea",
    name: "寒冰射手",
    nameEn: "Snow Pea",
    sunCost: 175,
    recharge: 7.5,
    damage: 20,
    health: 300,
    range: "直线",
    category: "shooter",
    unlockLevel: 3,
    description: "发射冰豌豆，命中僵尸会减速。",
    image: "/images/plants/snowpea.png"
  },
  {
    id: "chomper",
    name: "大嘴花",
    nameEn: "Chomper",
    sunCost: 150,
    recharge: 7.5,
    damage: 1000,
    health: 300,
    range: "单个",
    category: "explosive",
    unlockLevel: 4,
    description: "一口吞下一个僵尸，但咀嚼时间较长。",
    image: "/images/plants/chomper.png"
  },
  {
    id: "repeater",
    name: "双发射手",
    nameEn: "Repeater",
    sunCost: 200,
    recharge: 7.5,
    damage: 40,
    health: 300,
    range: "直线",
    category: "shooter",
    unlockLevel: 5,
    description: "一次发射两颗豌豆，伤害翻倍。",
    image: "/images/plants/repeater.png"
  }
]

export const plantCategories = [
  { value: "shooter", label: "射手类" },
  { value: "explosive", label: "爆炸类" },
  { value: "defensive", label: "防御类" },
  { value: "support", label: "辅助类" }
]

export const sunCostRanges = [
  { value: "0-50", label: "0-50", min: 0, max: 50 },
  { value: "51-100", label: "51-100", min: 51, max: 100 },
  { value: "101-200", label: "101-200", min: 101, max: 200 },
  { value: "200+", label: "200+", min: 201, max: Infinity }
]
```

- [ ] **Step 2: 验证数据可正常导入**

创建临时验证文件 `src/data/_test.js`：

```javascript
import { plants, plantCategories } from './plants.js'

console.log('植物数量:', plants.length)
console.log('分类数量:', plantCategories.length)
console.log('第一个植物:', plants[0].name)
```

修改 `src/App.jsx` 临时引入测试：

```javascript
import './data/_test.js'

function App() {
  return <div>植物大战僵尸百科全书</div>
}

export default App
```

运行 `npm run dev`，打开浏览器控制台，看到：
```
植物数量: 8
分类数量: 4
第一个植物: 豌豆射手
```

- [ ] **Step 3: 清理验证文件**

```bash
rm src/data/_test.js
```

恢复 `src/App.jsx` 为 Task 1 中的版本。

- [ ] **Step 4: 提交**

```bash
git add src/data/plants.js
git commit -m "feat(data): add plant data with 8 plants"
```

---

## Task 3: 准备僵尸数据

**Files:**
- Create: `src/data/zombies.js`

- [ ] **Step 1: 编写 `src/data/zombies.js`**

写入 `src/data/zombies.js`：

```javascript
export const zombies = [
  {
    id: "zombie",
    name: "普通僵尸",
    nameEn: "Zombie",
    health: 200,
    speed: "slow",
    damage: 100,
    category: "basic",
    firstAppearance: 1,
    weakness: "任意",
    description: "最基础的僵尸，生命值与攻击力都较低。",
    image: "/images/zombies/zombie.png"
  },
  {
    id: "flagzombie",
    name: "旗帜僵尸",
    nameEn: "Flag Zombie",
    health: 200,
    speed: "slow",
    damage: 100,
    category: "basic",
    firstAppearance: 1,
    weakness: "任意",
    description: "持旗帜的僵尸，标志着大规模进攻的开始。",
    image: "/images/zombies/flagzombie.png"
  },
  {
    id: "conezombie",
    name: "路障僵尸",
    nameEn: "Conehead Zombie",
    health: 560,
    speed: "slow",
    damage: 100,
    category: "cone",
    firstAppearance: 2,
    weakness: "任意",
    description: "头戴路障，生命值更高，需要更多伤害才能击杀。",
    image: "/images/zombies/conezombie.png"
  },
  {
    id: "bucketzombie",
    name: "铁桶僵尸",
    nameEn: "Buckethead Zombie",
    health: 1280,
    speed: "slow",
    damage: 100,
    category: "bucket",
    firstAppearance: 3,
    weakness: "任意",
    description: "头戴铁桶，防御力极强。",
    image: "/images/zombies/bucketzombie.png"
  },
  {
    id: "screendoor",
    name: "铁栅门僵尸",
    nameEn: "Screen Door Zombie",
    health: 1280,
    speed: "slow",
    damage: 100,
    category: "special",
    firstAppearance: 5,
    weakness: "穿透类植物",
    description: "手持铁栅门，可以弹开豌豆等直线攻击。",
    image: "/images/zombies/screendoor.png"
  },
  {
    id: "football",
    name: "橄榄球僵尸",
    nameEn: "Football Zombie",
    health: 1480,
    speed: "fast",
    damage: 100,
    category: "special",
    firstAppearance: 8,
    weakness: "减速",
    description: "身穿橄榄球装备，移动速度快，防御力强。",
    image: "/images/zombies/football.png"
  },
  {
    id: "digger",
    name: "矿工僵尸",
    nameEn: "Digger Zombie",
    health: 200,
    speed: "medium",
    damage: 100,
    category: "special",
    firstAppearance: 14,
    weakness: "立即触发类",
    description: "从地下挖洞绕过植物，从后方出现。",
    image: "/images/zombies/digger.png"
  },
  {
    id: "pogo",
    name: "跳跳僵尸",
    nameEn: "Pogo Zombie",
    health: 200,
    speed: "fast",
    damage: 100,
    category: "special",
    firstAppearance: 15,
    weakness: "立即触发类",
    description: "手持弹簧杆跳跃过植物，需要立即触发型植物应对。",
    image: "/images/zombies/pogo.png"
  }
]

export const zombieCategories = [
  { value: "basic", label: "基础类" },
  { value: "cone", label: "路障类" },
  { value: "bucket", label: "铁桶类" },
  { value: "special", label: "特殊类" }
]

export const speedLabels = {
  slow: "慢",
  medium: "中",
  fast: "快"
}
```

- [ ] **Step 2: 验证数据可正常导入**

参考 Task 2 验证方式，临时在 `src/App.jsx` 中加入：

```javascript
import { zombies, zombieCategories } from './data/zombies.js'
console.log('僵尸数量:', zombies.length, '分类数量:', zombieCategories.length)
```

浏览器控制台应输出：
```
僵尸数量: 8 分类数量: 4
```

确认后撤销临时代码。

- [ ] **Step 3: 提交**

```bash
git add src/data/zombies.js
git commit -m "feat(data): add zombie data with 8 zombies"
```

---

## Task 4: 准备占位图片

**Files:**
- Create: `public/images/plants/.gitkeep`
- Create: `public/images/zombies/.gitkeep`
- Create: `public/images/plants/_placeholder.svg`（占位植物图）
- Create: `public/images/zombies/_placeholder.svg`（占位僵尸图）

- [ ] **Step 1: 创建图片目录占位文件**

```bash
touch "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/plants/.gitkeep"
touch "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/zombies/.gitkeep"
```

- [ ] **Step 2: 创建植物占位 SVG**

写入 `public/images/plants/_placeholder.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#2ECC71" opacity="0.2"/>
  <circle cx="100" cy="100" r="60" fill="#2ECC71"/>
  <text x="100" y="115" font-size="60" text-anchor="middle" fill="white">🌿</text>
  <text x="100" y="180" font-size="14" text-anchor="middle" fill="#2C3E50">植物占位</text>
</svg>
```

- [ ] **Step 3: 创建僵尸占位 SVG**

写入 `public/images/zombies/_placeholder.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#E74C3C" opacity="0.2"/>
  <circle cx="100" cy="100" r="60" fill="#E74C3C"/>
  <text x="100" y="115" font-size="60" text-anchor="middle" fill="white">🧟</text>
  <text x="100" y="180" font-size="14" text-anchor="middle" fill="#2C3E50">僵尸占位</text>
</svg>
```

- [ ] **Step 4: 为每个植物/僵尸条目生成占位文件**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/plants"
for id in peashooter sunflower cherrybomb wallnut potatomine snowpea chomper repeater; do
  cp _placeholder.svg "$id.svg"
done
cd "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/zombies"
for id in zombie flagzombie conezombie bucketzombie screendoor football digger pogo; do
  cp _placeholder.svg "$id.svg"
done
```

- [ ] **Step 5: 更新数据中的图片扩展名**

将 `src/data/plants.js` 中所有 `image` 字段从 `.png` 改为 `.svg`：
- 找到 `image: "/images/plants/peashooter.png"`，替换为 `image: "/images/plants/peashooter.svg"`
- 对所有 8 个植物条目执行同样替换
- 同样修改 `src/data/zombies.js` 中 8 个僵尸条目

或使用 Edit 工具配合 `replace_all: true`：
- 文件：`src/data/plants.js`，`old_string`: `.png`，`new_string`: `.svg`

> 注：完成图片下载后应改回 `.png`。本阶段先用 `.svg` 验证。

- [ ] **Step 6: 提交**

```bash
git add public/images src/data/plants.js src/data/zombies.js
git commit -m "feat(assets): add placeholder SVG images for all entries"
```

---

## Task 5: 实现 Layout 组件与基础路由

**Files:**
- Create: `src/components/Layout.jsx`
- Create: `src/components/Layout.module.css`
- Modify: `src/App.jsx`
- Create: `src/pages/Home.jsx`
- Create: `src/pages/Home.module.css`
- Create: `src/pages/PlantsList.jsx`（占位）
- Create: `src/pages/ZombiesList.jsx`（占位）
- Create: `src/pages/NotFound.jsx`

- [ ] **Step 1: 编写 `src/components/Layout.module.css`**

写入 `src/components/Layout.module.css`：

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(180deg, #6BA53D 0%, #4A7C2E 100%);
  padding: var(--space-md) var(--space-xl);
  box-shadow: var(--shadow-card);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbarInner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.logoIcon {
  font-size: 2rem;
  animation: rotate 8s linear infinite;
  display: inline-block;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.navLinks {
  display: flex;
  gap: var(--space-md);
}

.navLink {
  color: var(--color-text-light);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  transition: var(--transition);
  font-weight: 500;
}

.navLink:hover {
  background: rgba(255, 215, 0, 0.3);
}

.navLinkActive {
  background: var(--color-sun);
  color: var(--color-text-primary);
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: var(--space-xl);
}

.footer {
  background: rgba(74, 124, 46, 0.9);
  color: var(--color-text-light);
  text-align: center;
  padding: var(--space-md);
  font-size: var(--font-size-sm);
}

@media (max-width: 640px) {
  .navbar { padding: var(--space-md); }
  .main { padding: var(--space-md); }
  .logo { font-size: var(--font-size-lg); }
  .navLink { padding: var(--space-xs) var(--space-sm); }
}
```

- [ ] **Step 2: 编写 `src/components/Layout.jsx`**

写入 `src/components/Layout.jsx`：

```javascript
import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌻</span>
            <span>植物大战僵尸百科全书</span>
          </NavLink>
          <nav className={styles.navLinks}>
            <NavLink
              to="/plants"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              植物图鉴
            </NavLink>
            <NavLink
              to="/zombies"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              僵尸图鉴
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        © 2026 植物大战僵尸百科全书 · 仅供个人学习使用
      </footer>
    </div>
  )
}

export default Layout
```

- [ ] **Step 3: 编写 `src/pages/Home.jsx`**

写入 `src/pages/Home.jsx`：

```javascript
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>欢迎来到植物大战僵尸百科全书</h1>
        <p className={styles.subtitle}>
          探索初代植物大战僵尸中所有植物与僵尸的属性、技能与故事
        </p>
      </section>

      <section className={styles.cards}>
        <Link to="/plants" className={styles.card}>
          <div className={styles.cardIcon}>🌿</div>
          <h2 className={styles.cardTitle}>植物图鉴</h2>
          <p className={styles.cardDesc}>
            查看豌豆射手、向日葵、樱桃炸弹等 8 种植物的详细属性
          </p>
        </Link>

        <Link to="/zombies" className={`${styles.card} ${styles.cardZombie}`}>
          <div className={styles.cardIcon}>🧟</div>
          <h2 className={styles.cardTitle}>僵尸图鉴</h2>
          <p className={styles.cardDesc}>
            查看普通僵尸、铁桶僵尸、橄榄球僵尸等 8 种僵尸的弱点与属性
          </p>
        </Link>
      </section>
    </div>
  )
}

export default Home
```

- [ ] **Step 4: 编写 `src/pages/Home.module.css`**

写入 `src/pages/Home.module.css`：

```css
.home {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  text-align: center;
  padding: var(--space-xl) 0;
  color: var(--color-text-light);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-md);
}

.subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.95;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.card {
  background: var(--color-bg-card);
  border: 3px solid var(--color-plant);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: block;
}

.cardZombie {
  border-color: var(--color-zombie);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.cardIcon {
  font-size: 5rem;
  margin-bottom: var(--space-md);
}

.cardTitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
  color: var(--color-grass-dark);
}

.cardDesc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}
```

- [ ] **Step 5: 编写占位页面 `src/pages/PlantsList.jsx`**

写入 `src/pages/PlantsList.jsx`：

```javascript
function PlantsList() {
  return <h2>植物图鉴（待实现）</h2>
}

export default PlantsList
```

- [ ] **Step 6: 编写占位页面 `src/pages/ZombiesList.jsx`**

写入 `src/pages/ZombiesList.jsx`：

```javascript
function ZombiesList() {
  return <h2>僵尸图鉴（待实现）</h2>
}

export default ZombiesList
```

- [ ] **Step 7: 编写 404 页面 `src/pages/NotFound.jsx`**

写入 `src/pages/NotFound.jsx`：

```javascript
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>
        哎呀，僵尸把这里吃掉了！
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-sun)',
          color: 'var(--color-text-primary)',
          borderRadius: 'var(--radius-md)',
          fontWeight: 'bold'
        }}
      >
        返回首页
      </Link>
    </div>
  )
}

export default NotFound
```

- [ ] **Step 8: 更新 `src/App.jsx` 配置路由**

将 `src/App.jsx` 改为：

```javascript
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<PlantsList />} />
        <Route path="zombies" element={<ZombiesList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 9: 验证**

运行 `npm run dev`，浏览器访问：
- `/` 显示欢迎页和两个卡片
- 点击"植物图鉴"导航到 `/plants`，导航栏高亮
- 点击"僵尸图鉴"导航到 `/zombies`
- 访问 `/foo` 显示 404 页面

预期：所有路由正确，导航栏高亮工作。

- [ ] **Step 10: 提交**

```bash
git add src/components/Layout.jsx src/components/Layout.module.css src/pages src/App.jsx
git commit -m "feat(layout): add Layout, Home page, basic routing"
```

---

## Task 6: 实现 Card 组件

**Files:**
- Create: `src/components/Card.jsx`
- Create: `src/components/Card.module.css`

- [ ] **Step 1: 编写 `src/components/Card.module.css`**

写入 `src/components/Card.module.css`：

```css
.card {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: var(--color-sun);
}

.cardPlant:hover {
  border-color: var(--color-plant);
}

.cardZombie:hover {
  border-color: var(--color-zombie);
}

.imageWrap {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(135, 206, 235, 0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  loading: lazy;
}

.name {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-top: var(--space-sm);
}

.nameEn {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-style: italic;
}

.stats {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: var(--font-size-sm);
}

.statItem {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-secondary);
}

.statIcon {
  font-size: 1.1em;
}

.statValue {
  font-weight: bold;
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: 编写 `src/components/Card.jsx`**

写入 `src/components/Card.jsx`：

```javascript
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

function Card({ data, type }) {
  const detailPath = type === 'plant' ? `/plants/${data.id}` : `/zombies/${data.id}`

  const isPlant = type === 'plant'
  const cardClass = isPlant
    ? `${styles.card} ${styles.cardPlant}`
    : `${styles.card} ${styles.cardZombie}`

  return (
    <Link to={detailPath} className={cardClass}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={data.image}
          alt={data.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = isPlant
              ? '/images/plants/_placeholder.svg'
              : '/images/zombies/_placeholder.svg'
          }}
        />
      </div>
      <h3 className={styles.name}>{data.name}</h3>
      <span className={styles.nameEn}>{data.nameEn}</span>
      <div className={styles.stats}>
        {isPlant ? (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>☀️</span>
              <span className={styles.statValue}>{data.sunCost}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>💥</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>❤️</span>
              <span className={styles.statValue}>{data.health}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>⚔️</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Card
```

- [ ] **Step 3: 在 PlantsList 临时使用 Card 验证**

更新 `src/pages/PlantsList.jsx`：

```javascript
import { plants } from '../data/plants.js'
import Card from '../components/Card.jsx'

function PlantsList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {plants.map(plant => (
        <Card key={plant.id} data={plant} type="plant" />
      ))}
    </div>
  )
}

export default PlantsList
```

更新 `src/pages/ZombiesList.jsx`：

```javascript
import { zombies } from '../data/zombies.js'
import Card from '../components/Card.jsx'

function ZombiesList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {zombies.map(zombie => (
        <Card key={zombie.id} data={zombie} type="zombie" />
      ))}
    </div>
  )
}

export default ZombiesList
```

- [ ] **Step 4: 验证**

运行 `npm run dev`，访问 `/plants` 和 `/zombies`，预期：
- 显示网格化卡片布局
- 悬停卡片有放大、上浮效果
- 图片占位 SVG 正常显示
- 卡片显示名称、英文名、关键属性

- [ ] **Step 5: 提交**

```bash
git add src/components/Card.jsx src/components/Card.module.css src/pages/PlantsList.jsx src/pages/ZombiesList.jsx
git commit -m "feat(card): add Card component for plants and zombies"
```

---

## Task 7: 实现 SearchBar 组件（带防抖）

**Files:**
- Create: `src/components/SearchBar.jsx`
- Create: `src/components/SearchBar.module.css`

- [ ] **Step 1: 编写 `src/components/SearchBar.module.css`**

写入 `src/components/SearchBar.module.css`：

```css
.searchBar {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem;
  font-size: var(--font-size-base);
  font-family: inherit;
  border: 2px solid var(--color-grass-dark);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  outline: none;
  transition: var(--transition);
}

.input:focus {
  border-color: var(--color-sun);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
}

.icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  pointer-events: none;
  color: var(--color-text-secondary);
}

.clearBtn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-text-secondary);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  line-height: 1;
  transition: var(--transition);
}

.clearBtn:hover {
  background: var(--color-text-primary);
}
```

- [ ] **Step 2: 编写 `src/components/SearchBar.jsx`**

写入 `src/components/SearchBar.jsx`：

```javascript
import { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange, placeholder = '搜索...' }) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localValue, value, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={styles.searchBar}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
      />
      {localValue && (
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="清除搜索"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
```

- [ ] **Step 3: 提交**

```bash
git add src/components/SearchBar.jsx src/components/SearchBar.module.css
git commit -m "feat(search): add SearchBar with 300ms debounce"
```

---

## Task 8: 实现 FilterPanel 组件

**Files:**
- Create: `src/components/FilterPanel.jsx`
- Create: `src/components/FilterPanel.module.css`

- [ ] **Step 1: 编写 `src/components/FilterPanel.module.css`**

写入 `src/components/FilterPanel.module.css`：

```css
.panel {
  background: var(--color-bg-card);
  border: 2px solid var(--color-dirt);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: flex-end;
}

.group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 140px;
}

.label {
  font-size: var(--font-size-sm);
  font-weight: bold;
  color: var(--color-grass-dark);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
  padding: 0.25rem 0.5rem;
  background: rgba(135, 206, 235, 0.15);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  user-select: none;
}

.checkbox:hover {
  background: rgba(135, 206, 235, 0.3);
}

.checkboxActive {
  background: var(--color-sun);
  color: var(--color-text-primary);
  font-weight: bold;
}

.checkbox input {
  margin: 0;
  cursor: pointer;
}

.select {
  padding: 0.4rem 0.5rem;
  font-size: var(--font-size-sm);
  font-family: inherit;
  border: 1px solid var(--color-grass-dark);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--color-text-primary);
  cursor: pointer;
}

.resetBtn {
  padding: 0.5rem 1rem;
  background: var(--color-zombie);
  color: white;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: bold;
  transition: var(--transition);
}

.resetBtn:hover {
  background: #C0392B;
}
```

- [ ] **Step 2: 编写 `src/components/FilterPanel.jsx`**

写入 `src/components/FilterPanel.jsx`：

```javascript
import styles from './FilterPanel.module.css'

function FilterPanel({ filters, onFilterChange, type }) {
  const isPlant = type === 'plant'

  const categories = isPlant
    ? [
        { value: 'shooter', label: '射手类' },
        { value: 'explosive', label: '爆炸类' },
        { value: 'defensive', label: '防御类' },
        { value: 'support', label: '辅助类' }
      ]
    : [
        { value: 'basic', label: '基础类' },
        { value: 'cone', label: '路障类' },
        { value: 'bucket', label: '铁桶类' },
        { value: 'special', label: '特殊类' }
      ]

  const sunCostRanges = [
    { value: '0-50', label: '0-50', min: 0, max: 50 },
    { value: '51-100', label: '51-100', min: 51, max: 100 },
    { value: '101-200', label: '101-200', min: 101, max: 200 },
    { value: '200+', label: '200+', min: 201, max: Infinity }
  ]

  const levelRanges = [
    { value: '1-10', label: '1-10', min: 1, max: 10 },
    { value: '11-20', label: '11-20', min: 11, max: 20 },
    { value: '21-30', label: '21-30', min: 21, max: 30 },
    { value: '31-50', label: '31-50', min: 31, max: 50 }
  ]

  const speedOptions = [
    { value: 'slow', label: '慢' },
    { value: 'medium', label: '中' },
    { value: 'fast', label: '快' }
  ]

  const sortOptions = isPlant
    ? [
        { value: 'sunCost-asc', label: '阳光消耗 ↑' },
        { value: 'sunCost-desc', label: '阳光消耗 ↓' },
        { value: 'damage-asc', label: '伤害 ↑' },
        { value: 'damage-desc', label: '伤害 ↓' },
        { value: 'unlockLevel-asc', label: '解锁关卡 ↑' },
        { value: 'unlockLevel-desc', label: '解锁关卡 ↓' }
      ]
    : [
        { value: 'health-asc', label: '生命值 ↑' },
        { value: 'health-desc', label: '生命值 ↓' },
        { value: 'damage-asc', label: '攻击力 ↑' },
        { value: 'damage-desc', label: '攻击力 ↓' },
        { value: 'firstAppearance-asc', label: '首次出现 ↑' },
        { value: 'firstAppearance-desc', label: '首次出现 ↓' }
      ]

  const toggleCategory = (value) => {
    const current = filters.categories || []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...filters, categories: next })
  }

  const handleRangeChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value })
  }

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value })
  }

  const handleReset = () => {
    onFilterChange({ categories: [], sunCostRange: '', levelRange: '', speed: '', sort: 'default' })
  }

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <span className={styles.label}>分类</span>
        <div className={styles.options}>
          {categories.map(cat => {
            const active = (filters.categories || []).includes(cat.value)
            return (
              <label
                key={cat.value}
                className={`${styles.checkbox} ${active ? styles.checkboxActive : ''}`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleCategory(cat.value)}
                />
                {cat.label}
              </label>
            )
          })}
        </div>
      </div>

      {isPlant && (
        <>
          <div className={styles.group}>
            <span className={styles.label}>阳光消耗</span>
            <select
              className={styles.select}
              value={filters.sunCostRange || ''}
              onChange={(e) => handleRangeChange('sunCostRange', e.target.value)}
            >
              <option value="">全部</option>
              {sunCostRanges.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.group}>
            <span className={styles.label}>解锁关卡</span>
            <select
              className={styles.select}
              value={filters.levelRange || ''}
              onChange={(e) => handleRangeChange('levelRange', e.target.value)}
            >
              <option value="">全部</option>
              {levelRanges.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {!isPlant && (
        <div className={styles.group}>
          <span className={styles.label}>移动速度</span>
          <select
            className={styles.select}
            value={filters.speed || ''}
            onChange={(e) => handleRangeChange('speed', e.target.value)}
          >
            <option value="">全部</option>
            {speedOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.group}>
        <span className={styles.label}>排序</span>
        <select
          className={styles.select}
          value={filters.sort || 'default'}
          onChange={handleSortChange}
        >
          <option value="default">默认</option>
          {sortOptions.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        重置筛选
      </button>
    </div>
  )
}

export default FilterPanel
```

- [ ] **Step 3: 提交**

```bash
git add src/components/FilterPanel.jsx src/components/FilterPanel.module.css
git commit -m "feat(filter): add FilterPanel with categories, ranges, and sort"
```

---

## Task 9: 实现 PlantsList 页面（带搜索、筛选）

**Files:**
- Modify: `src/pages/PlantsList.jsx`
- Create: `src/pages/PlantsList.module.css`

- [ ] **Step 1: 编写 `src/pages/PlantsList.module.css`**

写入 `src/pages/PlantsList.module.css`：

```css
.page {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  margin-bottom: var(--space-lg);
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-light);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin-bottom: var(--space-sm);
}

.subtitle {
  color: var(--color-text-light);
  opacity: 0.9;
}

.toolbar {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
  align-items: center;
}

.count {
  color: var(--color-text-light);
  font-weight: bold;
  font-size: var(--font-size-base);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-md);
}

.empty {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-light);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
}

.emptyIcon {
  font-size: 4rem;
  margin-bottom: var(--space-md);
}
```

- [ ] **Step 2: 编写 `src/pages/PlantsList.jsx`**

写入 `src/pages/PlantsList.jsx`：

```javascript
import { useState, useMemo } from 'react'
import { plants } from '../data/plants.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import styles from './PlantsList.module.css'

function PlantsList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    categories: [],
    sunCostRange: '',
    levelRange: '',
    sort: 'default'
  })

  const filtered = useMemo(() => {
    let result = plants

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    if (filters.sunCostRange) {
      const [min, max] = filters.sunCostRange.split('-').map(s => s === '+' ? Infinity : Number(s))
      result = result.filter(p => p.sunCost >= min && p.sunCost <= max)
    }

    if (filters.levelRange) {
      const [min, max] = filters.levelRange.split('-').map(Number)
      result = result.filter(p => p.unlockLevel >= min && p.unlockLevel <= max)
    }

    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field]
        const bv = b[field]
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🌿 植物图鉴</h1>
        <p className={styles.subtitle}>共 {plants.length} 种植物，守护你的庭院</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索植物名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {plants.length} 个结果
        </span>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        type="plant"
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🥀</div>
          <p>没有找到匹配的植物，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(plant => (
            <Card key={plant.id} data={plant} type="plant" />
          ))}
        </div>
      )}
    </div>
  )
}

export default PlantsList
```

- [ ] **Step 3: 验证**

运行 `npm run dev`，访问 `/plants`，预期：
- 顶部显示搜索框和筛选面板
- 输入"豌豆"立即筛选出豌豆射手（300ms 后）
- 勾选"射手类"只显示射手类植物
- 阳光消耗选择"51-100"只显示对应范围的植物
- 排序按阳光消耗升序工作
- 没有任何结果时显示"没有找到匹配"提示

- [ ] **Step 4: 提交**

```bash
git add src/pages/PlantsList.jsx src/pages/PlantsList.module.css
git commit -m "feat(plants-list): implement plant list page with search and filters"
```

---

## Task 10: 实现 ZombiesList 页面

**Files:**
- Modify: `src/pages/ZombiesList.jsx`
- Create: `src/pages/ZombiesList.module.css`

- [ ] **Step 1: 编写 `src/pages/ZombiesList.module.css`**

写入 `src/pages/ZombiesList.module.css`：

```css
.page {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  margin-bottom: var(--space-lg);
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-light);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin-bottom: var(--space-sm);
}

.subtitle {
  color: var(--color-text-light);
  opacity: 0.9;
}

.toolbar {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
  align-items: center;
}

.count {
  color: var(--color-text-light);
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-md);
}

.empty {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-light);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
}

.emptyIcon {
  font-size: 4rem;
  margin-bottom: var(--space-md);
}
```

- [ ] **Step 2: 编写 `src/pages/ZombiesList.jsx`**

写入 `src/pages/ZombiesList.jsx`：

```javascript
import { useState, useMemo } from 'react'
import { zombies, speedLabels } from '../data/zombies.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import styles from './ZombiesList.module.css'

function ZombiesList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    categories: [],
    speed: '',
    sort: 'default'
  })

  const filtered = useMemo(() => {
    let result = zombies

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(z =>
        z.name.toLowerCase().includes(q) ||
        z.nameEn.toLowerCase().includes(q) ||
        z.description.toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter(z => filters.categories.includes(z.category))
    }

    if (filters.speed) {
      result = result.filter(z => z.speed === filters.speed)
    }

    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field]
        const bv = b[field]
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧟 僵尸图鉴</h1>
        <p className={styles.subtitle}>共 {zombies.length} 种僵尸，了解它们才能更好应对</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索僵尸名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {zombies.length} 个结果
        </span>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        type="zombie"
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🧟</div>
          <p>没有找到匹配的僵尸，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(zombie => (
            <Card key={zombie.id} data={zombie} type="zombie" />
          ))}
        </div>
      )}
    </div>
  )
}

export default ZombiesList
```

- [ ] **Step 3: 验证**

运行 `npm run dev`，访问 `/zombies`，预期：
- 显示 8 个僵尸卡片
- 搜索"铁桶"立即筛选出铁桶僵尸
- 移动速度选择"快"只显示快速僵尸
- 排序按生命值升降序工作

- [ ] **Step 4: 提交**

```bash
git add src/pages/ZombiesList.jsx src/pages/ZombiesList.module.css
git commit -m "feat(zombies-list): implement zombie list page with search and filters"
```

---

## Task 11: 实现 DetailView 通用详情组件

**Files:**
- Create: `src/components/DetailView.jsx`
- Create: `src/components/DetailView.module.css`

- [ ] **Step 1: 编写 `src/components/DetailView.module.css`**

写入 `src/components/DetailView.module.css`：

```css
.detail {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-xl);
  box-shadow: var(--shadow-card);
  animation: fadeIn 0.4s ease;
}

.detailPlant {
  border-color: var(--color-plant);
}

.detailZombie {
  border-color: var(--color-zombie);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.imageSection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: var(--radius-md);
  background: rgba(135, 206, 235, 0.1);
  padding: var(--space-md);
}

.infoSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-grass-dark);
  margin: 0;
}

.nameEn {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-style: italic;
}

.description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text-primary);
  padding: var(--space-md);
  background: rgba(135, 206, 235, 0.1);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-sun);
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.statBox {
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid var(--color-grass-light);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
}

.statLabel {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.statValue {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-text-primary);
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
  gap: var(--space-md);
}

.navBtn {
  padding: 0.75rem 1.5rem;
  background: var(--color-grass-dark);
  color: white;
  border-radius: var(--radius-md);
  font-weight: bold;
  transition: var(--transition);
  text-decoration: none;
  display: inline-block;
}

.navBtn:hover {
  background: var(--color-grass-light);
}

.navBtnDisabled {
  background: var(--color-text-secondary);
  cursor: not-allowed;
  opacity: 0.5;
}

.backBtn {
  margin-bottom: var(--space-md);
  padding: 0.5rem 1rem;
  background: var(--color-sun);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
}

.backBtn:hover {
  background: var(--color-sun-dark);
}

@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
    padding: var(--space-md);
  }
  .image { max-width: 200px; }
  .title { font-size: var(--font-size-xl); }
}
```

- [ ] **Step 2: 编写 `src/components/DetailView.jsx`**

写入 `src/components/DetailView.jsx`：

```javascript
import { Link, useNavigate } from 'react-router-dom'
import styles from './DetailView.module.css'

function DetailView({ data, list, type }) {
  const navigate = useNavigate()
  const isPlant = type === 'plant'
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null
  const listPath = isPlant ? '/plants' : '/zombies'
  const detailClass = isPlant
    ? `${styles.detail} ${styles.detailPlant}`
    : `${styles.detail} ${styles.detailZombie}`

  const handlePrev = () => prevItem && navigate(`${listPath}/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`${listPath}/${nextItem.id}`)

  return (
    <div>
      <Link to={listPath} className={styles.backBtn}>
        ← 返回图鉴
      </Link>

      <div className={detailClass}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={data.image}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = isPlant
                ? '/images/plants/_placeholder.svg'
                : '/images/zombies/_placeholder.svg'
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{data.name}</h1>
          <span className={styles.nameEn}>{data.nameEn}</span>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.statsGrid}>
            {isPlant ? (
              <>
                <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
                <StatBox label="冷却时间" value={data.recharge} unit="秒" />
                <StatBox label="伤害" value={data.damage} unit="💥" />
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击范围" value={data.range} />
                <StatBox label="解锁关卡" value={data.unlockLevel} />
              </>
            ) : (
              <>
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击力" value={data.damage} unit="⚔️" />
                <StatBox label="移动速度" value={
                  data.speed === 'slow' ? '慢' : data.speed === 'medium' ? '中' : '快'
                } />
                <StatBox label="首次出现" value={`第 ${data.firstAppearance} 关`} />
                <StatBox label="弱点" value={data.weakness} />
              </>
            )}
          </div>

          <div className={styles.navigation}>
            {prevItem ? (
              <button onClick={handlePrev} className={styles.navBtn}>
                ← {prevItem.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextItem ? (
              <button onClick={handleNext} className={styles.navBtn}>
                {nextItem.name} →
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                没有下一个 →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, unit }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {unit && /\p{Emoji}/u.test(unit) && <span style={{ marginRight: '0.25rem' }}>{unit}</span>}
        {value}
      </div>
    </div>
  )
}

export default DetailView
```

- [ ] **Step 3: 提交**

```bash
git add src/components/DetailView.jsx src/components/DetailView.module.css
git commit -m "feat(detail): add DetailView component with prev/next navigation"
```

---

## Task 12: 实现 PlantDetail 与 ZombieDetail 页面

**Files:**
- Create: `src/pages/PlantDetail.jsx`
- Create: `src/pages/ZombieDetail.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 编写 `src/pages/PlantDetail.jsx`**

写入 `src/pages/PlantDetail.jsx`：

```javascript
import { useParams, Navigate } from 'react-router-dom'
import { plants } from '../data/plants.js'
import DetailView from '../components/DetailView.jsx'

function PlantDetail() {
  const { id } = useParams()
  const plant = plants.find(p => p.id === id)

  if (!plant) {
    return <Navigate to="/plants" replace />
  }

  return <DetailView data={plant} list={plants} type="plant" />
}

export default PlantDetail
```

- [ ] **Step 2: 编写 `src/pages/ZombieDetail.jsx`**

写入 `src/pages/ZombieDetail.jsx`：

```javascript
import { useParams, Navigate } from 'react-router-dom'
import { zombies } from '../data/zombies.js'
import DetailView from '../components/DetailView.jsx'

function ZombieDetail() {
  const { id } = useParams()
  const zombie = zombies.find(z => z.id === id)

  if (!zombie) {
    return <Navigate to="/zombies" replace />
  }

  return <DetailView data={zombie} list={zombies} type="zombie" />
}

export default ZombieDetail
```

- [ ] **Step 3: 更新 `src/App.jsx` 添加详情路由**

将 `src/App.jsx` 改为：

```javascript
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import PlantDetail from './pages/PlantDetail.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import ZombieDetail from './pages/ZombieDetail.jsx'
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 4: 验证**

运行 `npm run dev`：
- 在植物列表点击豌豆射手卡片，跳转到 `/plants/peashooter`
- 详情页显示完整属性
- 点击"← 樱桃炸弹"导航到上一个植物
- 在僵尸列表点击铁桶僵尸，导航到详情页
- 访问 `/plants/nonexistent` 重定向到 `/plants`

- [ ] **Step 5: 提交**

```bash
git add src/pages/PlantDetail.jsx src/pages/ZombieDetail.jsx src/App.jsx
git commit -m "feat(detail): add plant and zombie detail pages with routing"
```

---

## Task 13: 添加响应式优化

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: 在 `src/styles/global.css` 末尾追加响应式规则**

在 `src/styles/global.css` 文件末尾添加：

```css
@media (max-width: 640px) {
  :root {
    --font-size-2xl: 1.5rem;
    --font-size-xl: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: 验证移动端布局**

在浏览器开发者工具切换到移动端视图（< 640px）：
- 导航栏不溢出
- 卡片网格变为单列
- 详情页布局变为上下堆叠
- 搜索框与筛选面板正常堆叠

- [ ] **Step 3: 提交**

```bash
git add src/styles/global.css
git commit -m "feat(styles): add responsive and reduced-motion support"
```

---

## Task 14: 下载真实图片资源

**Files:**
- Create/Update: `public/images/plants/*.png`
- Create/Update: `public/images/zombies/*.png`
- Modify: `src/data/plants.js`（将 `.svg` 改回 `.png`）
- Modify: `src/data/zombies.js`（将 `.svg` 改回 `.png`）

- [ ] **Step 1: 从 PvZ Wiki 获取图片 URL**

使用 WebFetch 工具（如果在当前环境可用）或浏览器访问以下资源：

**植物图片**（从 https://pvz.fandom.com 搜索对应英文名）：
- Peashooter、Sunflower、Cherry Bomb、Wall-nut、Potato Mine、Snow Pea、Chomper、Repeater

**僵尸图片**：
- Zombie、Flag Zombie、Conehead Zombie、Buckethead Zombie、Screen Door Zombie、Football Zombie、Digger Zombie、Pogo Zombie

如果无法直接下载，则保留 SVG 占位图（视觉效果相同）。

- [ ] **Step 2: 保存图片到对应目录**

将下载的图片按数据 `id` 命名（如 `peashooter.png`）保存到：
- `public/images/plants/`
- `public/images/zombies/`

- [ ] **Step 3: 更新数据中的图片路径**

将 `src/data/plants.js` 中所有 `.svg` 改回 `.png`（使用 Edit 工具的 `replace_all`）：
- `old_string`: `.svg`
- `new_string`: `.png`

同样更新 `src/data/zombies.js`。

- [ ] **Step 4: 验证**

运行 `npm run dev`，访问植物/僵尸列表与详情页，图片正常显示。

- [ ] **Step 5: 提交**

```bash
git add public/images src/data
git commit -m "feat(assets): replace placeholder SVGs with real game images"
```

> 注：若图片下载受阻，保留 SVG 占位图不影响功能，仅在 commit 中说明。

---

## Task 15: 构建优化与部署验证

**Files:**
- Create: `vite.config.js`（添加 manualChunks 优化）
- Modify: `package.json`（添加 build 脚本）

- [ ] **Step 1: 优化 `vite.config.js`**

将 `vite.config.js` 改为：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

- [ ] **Step 2: 运行生产构建**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
npm run build
```

预期：构建成功，输出 `dist/` 目录，无报错。

- [ ] **Step 3: 本地预览生产构建**

```bash
npm run preview
```

访问预览 URL，验证：
- 所有页面正常工作
- 图片正常加载
- 路由跳转正常
- 搜索筛选正常

- [ ] **Step 4: 检查构建产物大小**

```bash
du -sh dist/
ls -lh dist/assets/
```

预期：`dist/` 总大小 < 1MB（无图片情况下），`react-vendor` 拆分为独立 chunk。

- [ ] **Step 5: 提交**

```bash
git add vite.config.js
git commit -m "build: optimize production build with vendor chunking"
```

---

## Task 16: 编写 README 文档

**Files:**
- Create: `README.md`

- [ ] **Step 1: 编写 `README.md`**

写入 `README.md`：

````markdown
# 植物大战僵尸百科全书

一个使用 React 构建的植物大战僵尸 1 代图鉴网站，展示所有植物和僵尸的详细属性，支持搜索、筛选和排序。

## 功能

- 🌿 植物图鉴：查看所有植物的属性与技能
- 🧟 僵尸图鉴：查看所有僵尸的属性与弱点
- 🔍 实时搜索：按名称快速查找
- 🎯 多条件筛选：按分类、属性等条件过滤
- 📊 灵活排序：按数值属性升降序排序
- 📱 响应式设计：支持手机、平板、桌面

## 技术栈

- **构建工具**：Vite 5
- **前端框架**：React 18
- **路由**：React Router v6
- **样式**：CSS Modules + CSS 变量

## 开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/     # 可复用组件
├── pages/          # 页面组件
├── data/           # 静态数据
└── styles/         # 全局样式
```

## 许可

仅供个人学习使用。植物大战僵尸相关游戏内容版权归 PopCap Games / EA 所有。
````

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: add README with setup instructions"
```

---

## 计划自检

### 1. 规格覆盖

- ✅ 应用类型：Web 网站（Task 1）
- ✅ 植物图鉴（Tasks 2, 6, 9, 11, 12）
- ✅ 僵尸图鉴（Tasks 3, 6, 10, 11, 12）
- ✅ 搜索功能（Task 7, 9, 10）
- ✅ 筛选功能（Task 8, 9, 10）
- ✅ 排序功能（Task 8, 9, 10）
- ✅ 详情页（Task 11, 12）
- ✅ 游戏主题视觉（Tasks 1, 5, 6, 11）
- ✅ 响应式（Task 13）
- ✅ 部署构建（Task 15）
- ✅ 文档（Task 16）

### 2. 占位符检查

- ✅ 无 TBD/TODO
- ✅ 无"实现类似"引用
- ✅ 所有代码块完整
- ✅ 所有命令包含预期输出

### 3. 类型一致性

- ✅ 植物数据结构：`plants.js` 中定义，`Card`、`DetailView`、`FilterPanel` 全部一致使用
- ✅ 僵尸数据结构：同上
- ✅ 组件 props：Card、SearchBar、FilterPanel、DetailView 的 props 名称在所有使用处保持一致
- ✅ 路由参数：`useParams()` 的 `id` 在所有详情页一致使用
- ✅ CSS Modules：所有 `.module.css` 文件的 className 引用一致

### 4. 范围检查

计划涵盖 16 个任务，每个任务有清晰边界，按顺序执行可产出完整可工作的应用。范围合适，无需拆分。
