# Task 4: 采集中国版僵尸数据

**Files:**
- Modify: `src/data/pvz2/zombies.js`
- Modify: `src/data/pvz2/worlds.js`
- Create: `public/images/pvz2/zombies/*.png`

## 任务目标

从中文 PvZ Wiki 采集中国版独占僵尸数据，下载僵尸图片，更新数据文件。

## Step 1: 从中文 PvZ Wiki 采集中国版独占僵尸数据

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占僵尸。

数据结构与现有僵尸一致，添加 `source: "china"` 字段：

```javascript
{
  id: "bull_demon_zombie",
  name: "牛魔王僵尸",
  nameEn: "Bull Demon Zombie",
  health: 1500,
  speed: "slow",
  damage: 100,
  category: "special",
  world: "journey_to_the_west",
  firstAppearance: "1-1",
  weakness: "高伤害植物",
  special: "冲撞植物并造成范围伤害",
  description: "西游记世界中的强力僵尸。",
  image: "/images/pvz2/zombies/bull_demon_zombie.png",
  source: "china"
}
```

## Step 2: 下载中国版僵尸图片

从中文 PvZ Wiki 下载僵尸图片，保存到 `public/images/pvz2/zombies/`。

## Step 3: 更新 zombies.js

将采集到的僵尸数据追加到 `src/data/pvz2/zombies.js` 的 `zombies` 数组末尾。

## Step 4: 更新世界数据中的 zombieIds

更新 `src/data/pvz2/worlds.js` 中中国版世界的 `zombieIds` 数组，添加对应僵尸的 ID。

## Step 5: 验证

```bash
node -e "
const zombies = require('./src/data/pvz2/zombies.js').zombies;
const chinaZombies = zombies.filter(z => z.source === 'china');
console.log('中国版僵尸数量:', chinaZombies.length);
console.log('总僵尸数量:', zombies.length);
"
```

## Step 6: 构建验证

```bash
npm run build
```

## Step 7: 提交

```bash
git add src/data/pvz2/zombies.js src/data/pvz2/worlds.js public/images/pvz2/zombies/
git commit -m "feat(data): add PvZ 2 China-exclusive zombies"
```

## 重要约束

- 使用 MediaWiki API 获取数据（不是手动编写）
- 中文名称使用中文 PvZ Wiki 的官方翻译
- `source` 字段必须是 `"china"`
- `world` 字段必须是有效的中国版世界 ID
- 如果某些字段无法获取，使用合理的默认值或 null
- 不修改国际版僵尸数据
- 不修改植物数据
