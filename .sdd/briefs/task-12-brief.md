# Task 12: 实现 PlantDetail 与 ZombieDetail 页面

**Files:**
- Create: `src/pages/PlantDetail.jsx`
- Create: `src/pages/ZombieDetail.jsx`
- Modify: `src/App.jsx`（添加 :id 路由参数）

## Step 1: 编写 `src/pages/PlantDetail.jsx`

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

## Step 2: 编写 `src/pages/ZombieDetail.jsx`

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

## Step 3: 更新 `src/App.jsx` 添加详情路由

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

## Step 4: 验证

运行 `npm run dev`（后台）：
- 在植物列表点击豌豆射手卡片，跳转到 `/plants/peashooter`
- 详情页显示完整属性
- 点击"← 樱桃炸弹"导航到上一个植物
- 在僵尸列表点击铁桶僵尸，导航到详情页
- 访问 `/plants/nonexistent` 重定向到 `/plants`

完成后停止 dev 服务器。

## Step 5: 提交

```bash
git add src/pages/PlantDetail.jsx src/pages/ZombieDetail.jsx src/App.jsx
git commit -m "feat(detail): add plant and zombie detail pages with routing"
```

## 重要约束

- 创建 2 个新文件：PlantDetail.jsx, ZombieDetail.jsx
- 修改 1 个文件：App.jsx（添加 2 个 import + 2 个 Route 行）
- 不要修改其他文件
- 路由顺序很重要：必须在 `path="plants"` 之后放 `path="plants/:id"`，避免被前者匹配
- `<Navigate replace>` 在 id 未找到时重定向到对应列表页
- PlantDetail 用 `type="plant"`，ZombieDetail 用 `type="zombie"`
- 使用 brief 中的精确代码
