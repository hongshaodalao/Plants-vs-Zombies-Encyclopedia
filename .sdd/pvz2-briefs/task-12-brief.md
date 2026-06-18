# Task 12: 收集 PvZ 2 世界数据

**Files:**
- Create: `src/data/pvz2/worlds.js`

**Interfaces:**
- Produces: `worlds` array

## 任务目标

收集 PvZ 2 国际版 11 个世界的基础信息，创建数据文件。

## Step 1: 收集世界数据

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

## Step 2: 创建世界数据文件

写入 `src/data/pvz2/worlds.js`，包含：

```javascript
export const worlds = [
  {
    id: "ancient_egypt",
    name: "神秘埃及",
    nameEn: "Ancient Egypt",
    description: "穿越到古埃及，探索金字塔和沙漠的秘密。",
    unlockCondition: "完成 1-1",
    plantIds: ["bloomerang", "iceberg_lettuce", "grave_buster", ...],
    zombieIds: ["mummy_zombie", "conehead_mummy", "buckethead_mummy", ...],
    levels: 25,
    specialMechanic: "沙尘暴",
    image: "/images/pvz2/worlds/ancient_egypt.png"
  },
  // ... 更多世界
]
```

## Step 3: 验证数据

```bash
node -e "const d = require('./src/data/pvz2/worlds.js'); console.log('世界数量:', d.worlds.length)"
```

预期：11 个世界。

## Step 4: 提交

```bash
git add src/data/pvz2/worlds.js
git commit -m "feat(data): add PvZ 2 world data (11 worlds)"
```

## 重要约束

- 每个世界必须有完整的 plantIds 和 zombieIds 列表
- plantIds 和 zombieIds 必须与已收集的植物/僵尸数据 ID 匹配
- 使用中文名称和描述
- 特殊机制使用中文描述
- image 字段使用 `/images/pvz2/worlds/<id>.png` 格式
