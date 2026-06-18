# Task 5: 收集 PvZ 2 植物数据

**Files:**
- Create: `src/data/pvz2/plants.js`

**Interfaces:**
- Produces: `plants` array, `plantCategories` array, `sunCostRanges` array

## 任务目标

从 PvZ Wiki 收集全部 PvZ 2 国际版植物数据（200+ 种），创建数据文件。

## Step 1: 从 PvZ Wiki 收集 PvZ 2 植物数据

使用 MediaWiki API 从 PvZ Wiki 收集全部 PvZ 2 国际版植物数据。

数据源：https://plantsvszombies.fandom.com/wiki/Plants_(PvZ2)

需要收集的字段：
- id: 小写 slug ID（如 "peashooter", "sunflower"）
- name: 中文名（如 "豌豆射手", "向日葵"）
- nameEn: 英文名（如 "Peashooter", "Sunflower"）
- sunCost: 阳光消耗
- recharge: 冷却时间（秒）
- damage: 伤害值
- health: 生命值
- range: 攻击范围（中文描述）
- category: 分类（shooter/explosive/defensive/support）
- world: 所属世界 ID（如 "ancient_egypt", "pirate_seas"）
- unlockLevel: 解锁关卡
- plantFoodEffect: 能量豆效果（中文）
- upgradeable: 是否可升级（true/false）
- maxUpgradeLevel: 最高等级（数字或 null）
- upgradeEffect: 升级效果概述（中文）
- description: 中文图鉴描述
- image: 图片文件名（从 Wiki 获取）

## Step 2: 创建 PvZ 2 植物数据文件

写入 `src/data/pvz2/plants.js`，包含：

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
    world: "modern_day",
    unlockLevel: "1-1",
    plantFoodEffect: "发射大量豌豆",
    upgradeable: true,
    maxUpgradeLevel: 10,
    upgradeEffect: "伤害+10%/级",
    description: "向僵尸发射豌豆。",
    image: "/images/pvz2/plants/peashooter.png"
  },
  // ... 更多植物
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

## Step 3: 验证数据

运行 Node.js 脚本验证数据完整性：

```bash
node -e "const d = require('./src/data/pvz2/plants.js'); console.log('植物数量:', d.plants.length)"
```

预期：200+ 种植物。

## Step 4: 提交

```bash
git add src/data/pvz2/plants.js
git commit -m "feat(data): add PvZ 2 plant data (200+ plants)"
```

## 重要约束

- 使用 MediaWiki API 获取数据（不是手动编写）
- 中文名称使用广泛接受的 PvZ 2 翻译
- 中文描述从中文 PvZ Wiki 获取（如有），否则使用英文描述
- 图片文件名从 Wiki 获取（用于后续下载）
- world 字段必须是有效的世界 ID（ancient_egypt, pirate_seas, wild_west, far_future, dark_ages, big_wave_beach, frostbite_caves, lost_city, neon_mixtape_tour, jurassic_marsh, modern_day）
- 如果某些字段无法获取，使用 null
