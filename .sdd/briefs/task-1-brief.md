# Task 1: 初始化 Vite + React 项目

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`
- Create: `.gitignore`

## Step 1: 创建项目目录结构

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/components src/pages src/data src/styles public/images/plants public/images/zombies
```

## Step 2: 编写 `package.json`

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

## Step 3: 编写 `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './'
})
```

## Step 4: 编写 `index.html`

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

## Step 5: 编写 `src/main.jsx`

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

## Step 6: 编写 `src/App.jsx`（临时占位）

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

## Step 7: 编写 `src/styles/variables.css`

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

## Step 8: 编写 `src/styles/global.css`

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

## Step 9: 编写 `.gitignore`

```
node_modules
dist
.DS_Store
*.local
.vscode
.idea
```

## Step 10: 安装依赖

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
npm install
```

预期：依赖安装成功，无报错。

## Step 11: 启动开发服务器并验证

```bash
npm run dev
```

预期：Vite 启动，终端显示 `Local: http://localhost:5173/`，浏览器访问看到"植物大战僵尸百科全书"标题。

**注意：dev 服务器应在后台运行（`run_in_background: true`）以进行验证。验证完成后停止它。**

## Step 12: 提交

```bash
git add .
git commit -m "chore: initialize Vite + React project"
```

注意：`node_modules` 应在 `.gitignore` 中被忽略。
