# Task 4: 添加 PvZ 2 基础路由

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/Pvz2Home.jsx`（占位）
- Create: `src/pages/Pvz2PlantsList.jsx`（占位）
- Create: `src/pages/Pvz2PlantDetail.jsx`（占位）
- Create: `src/pages/Pvz2ZombiesList.jsx`（占位）
- Create: `src/pages/Pvz2ZombieDetail.jsx`（占位）
- Create: `src/pages/WorldsList.jsx`（占位）
- Create: `src/pages/WorldDetail.jsx`（占位）

## Step 1: 创建占位页面

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

## Step 2: 更新 App.jsx 添加 PvZ 2 路由

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

## Step 3: 验证

运行 `npm run dev`（后台），访问 `/pvz2`、`/pvz2/plants`、`/pvz2/zombies`、`/pvz2/worlds`，确认占位页面正常显示。

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/App.jsx src/pages/Pvz2*.jsx src/pages/Worlds*.jsx src/pages/WorldDetail.jsx
git commit -m "feat(routing): add PvZ 2 routes with placeholder pages"
```

## 重要约束

- 占位页面只显示简单文字，不包含任何逻辑
- 路由顺序：具体路由在前，通配路由在后
- 所有 PvZ 2 路由在 `/pvz2/` 前缀下
- 保留现有 PvZ 1 路由不变
