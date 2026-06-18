# Task 16: 创建 PvZ 2 数据索引

**Files:**
- Create: `src/data/pvz2/index.js`
- Modify: `src/data/index.js`

## 任务目标

创建 PvZ 2 数据索引文件，统一导出 PvZ 2 数据。

## Step 1: 创建 PvZ 2 数据索引

写入 `src/data/pvz2/index.js`：

```javascript
export { plants, plantCategories, sunCostRanges } from './plants.js'
export { zombies, zombieCategories } from './zombies.js'
export { worlds } from './worlds.js'
```

## Step 2: 更新全局数据索引

将 `src/data/index.js` 改为：

```javascript
export * as pvz1 from './pvz1/index.js'
export * as pvz2 from './pvz2/index.js'
```

## Step 3: 提交

```bash
git add src/data/pvz2/index.js src/data/index.js
git commit -m "feat(data): add PvZ 2 data index"
```

## 重要约束

- 使用 ES Module 导出
- 与 PvZ 1 数据索引结构保持一致
- 确保所有导出名称正确（plants、plantCategories、sunCostRanges、zombies、zombieCategories、worlds）
