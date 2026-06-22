# Task 3: 采集中国版植物数据

**Files:**
- Modify: `src/data/pvz2/plants.js`
- Create: `public/images/pvz2/plants/*.png`

## 任务目标

从中文 PvZ Wiki 采集中国版独占植物数据，下载植物图片，更新数据文件。

## Step 1: 从中文 PvZ Wiki 采集中国版独占植物数据

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占植物。

数据结构与现有植物一致，添加 `source: "china"` 字段：

```javascript
{
  id: "fire_gourd",
  name: "火葫芦",
  nameEn: "Fire Gourd",
  sunCost: 150,
  recharge: 7.5,
  damage: 40,
  health: 300,
  range: "前方锥形",
  category: "shooter",
  world: "kungfu_world",
  unlockLevel: "1-1",
  plantFoodEffect: "喷出大范围火焰",
  upgradeable: false,
  maxUpgradeLevel: null,
  upgradeEffect: null,
  description: "向僵尸喷射火焰。",
  image: "/images/pvz2/plants/fire_gourd.png",
  source: "china"
}
```

## Step 2: 下载中国版植物图片

从中文 PvZ Wiki 下载植物图片，保存到 `public/images/pvz2/plants/`。

## Step 3: 更新 plants.js

将采集到的植物数据追加到 `src/data/pvz2/plants.js` 的 `plants` 数组末尾。

## Step 4: 更新世界数据中的 plantIds

更新 `src/data/pvz2/worlds.js` 中中国版世界的 `plantIds` 数组，添加对应植物的 ID。

## Step 5: 验证

```bash
node -e "
const plants = require('./src/data/pvz2/plants.js').plants;
const chinaPlants = plants.filter(p => p.source === 'china');
console.log('中国版植物数量:', chinaPlants.length);
console.log('总植物数量:', plants.length);
"
```

## Step 6: 构建验证

```bash
npm run build
```

## Step 7: 提交

```bash
git add src/data/pvz2/plants.js src/data/pvz2/worlds.js public/images/pvz2/plants/
git commit -m "feat(data): add PvZ 2 China-exclusive plants"
```

## 重要约束

- 使用 MediaWiki API 获取数据（不是手动编写）
- 中文名称使用中文 PvZ Wiki 的官方翻译
- `source` 字段必须是 `"china"`
- `world` 字段必须是有效的中国版世界 ID（如 "kungfu_world"）
- 如果某些字段无法获取，使用合理的默认值或 null
- 不修改国际版植物数据
- 不修改僵尸数据
