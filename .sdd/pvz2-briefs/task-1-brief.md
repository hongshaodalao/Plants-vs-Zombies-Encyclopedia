# Task 1: 重构数据目录结构

**Files:**
- Move: `src/data/plants.js` → `src/data/pvz1/plants.js`
- Move: `src/data/zombies.js` → `src/data/pvz1/zombies.js`
- Create: `src/data/pvz1/index.js`
- Create: `src/data/index.js`
- Modify: `src/pages/PlantsList.jsx`（更新导入路径）
- Modify: `src/pages/PlantDetail.jsx`（更新导入路径）
- Modify: `src/pages/ZombiesList.jsx`（更新导入路径）
- Modify: `src/pages/ZombieDetail.jsx`（更新导入路径）

## Step 1: 创建新目录并移动文件

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/data/pvz1
mv src/data/plants.js src/data/pvz1/plants.js
mv src/data/zombies.js src/data/pvz1/zombies.js
```

## Step 2: 创建 PvZ 1 数据索引文件

写入 `src/data/pvz1/index.js`：

```javascript
export { plants, plantCategories, sunCostRanges } from './plants.js'
export { zombies, zombieCategories, speedLabels } from './zombies.js'
```

## Step 3: 创建全局数据索引文件

写入 `src/data/index.js`：

```javascript
export * as pvz1 from './pvz1/index.js'
// PvZ 2 数据将在后续任务添加
```

## Step 4: 更新 PlantsList.jsx 导入路径

将 `src/pages/PlantsList.jsx` 中的：
```javascript
import { plants } from '../data/plants.js'
```
改为：
```javascript
import { plants } from '../data/pvz1/plants.js'
```

## Step 5: 更新 PlantDetail.jsx 导入路径

将 `src/pages/PlantDetail.jsx` 中的：
```javascript
import { plants } from '../data/plants.js'
```
改为：
```javascript
import { plants } from '../data/pvz1/plants.js'
```

## Step 6: 更新 ZombiesList.jsx 导入路径

将 `src/pages/ZombiesList.jsx` 中的：
```javascript
import { zombies, speedLabels } from '../data/zombies.js'
```
改为：
```javascript
import { zombies, speedLabels } from '../data/pvz1/zombies.js'
```

## Step 7: 更新 ZombieDetail.jsx 导入路径

将 `src/pages/ZombieDetail.jsx` 中的：
```javascript
import { zombies } from '../data/zombies.js'
```
改为：
```javascript
import { zombies } from '../data/pvz1/zombies.js'
```

## Step 8: 验证

运行 `npm run dev`（后台），访问 `/plants` 和 `/zombies`，确认页面正常显示 49 植物和 26 僵尸。

完成后停止 dev 服务器。

## Step 9: 提交

```bash
git add src/data/ src/pages/
git commit -m "refactor(data): restructure data directory for PvZ 1/PvZ 2 separation"
```

## 重要约束

- 只移动文件和更新导入路径，不修改数据内容
- 不修改组件逻辑或样式
- 确保 PvZ 1 功能完全不受影响
- 使用相对路径导入（`../data/pvz1/plants.js`）
