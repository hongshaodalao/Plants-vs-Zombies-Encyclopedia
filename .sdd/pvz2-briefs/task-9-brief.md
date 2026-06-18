# Task 9: 收集 PvZ 2 僵尸数据

**Files:**
- Create: `src/data/pvz2/zombies.js`

**Interfaces:**
- Produces: `zombies` array, `zombieCategories` array

## 任务目标

从 PvZ Wiki 收集全部 PvZ 2 国际版僵尸数据（100+ 种），创建数据文件。

## Step 1: 从 PvZ Wiki 收集 PvZ 2 僵尸数据

使用 MediaWiki API 从 PvZ Wiki 收集全部 PvZ 2 国际版僵尸数据。

数据源：https://plantsvszombies.fandom.com/wiki/Zombies_(PvZ2)

需要收集的字段：
- id: 小写 slug ID
- name: 中文名
- nameEn: 英文名
- health: 生命值
- speed: 移动速度（slow/medium/fast）
- damage: 攻击伤害
- category: 分类（basic/cone/bucket/special）
- world: 所属世界 ID
- firstAppearance: 首次出现关卡
- weakness: 弱点（中文）
- special: 特殊能力（中文）
- description: 中文图鉴描述
- image: 图片文件名

## Step 2: 创建 PvZ 2 僵尸数据文件

写入 `src/data/pvz2/zombies.js`，包含：

```javascript
export const zombies = [
  {
    id: "zombie",
    name: "普通僵尸",
    nameEn: "Zombie",
    health: 190,
    speed: "slow",
    damage: 100,
    category: "basic",
    world: "modern_day",
    firstAppearance: "1-1",
    weakness: "any",
    special: "基础僵尸",
    description: "最常见的僵尸。",
    image: "/images/pvz2/zombies/zombie.png"
  },
  // ... 更多僵尸
]

export const zombieCategories = [
  { value: "basic", label: "基础类" },
  { value: "cone", label: "路障类" },
  { value: "bucket", label: "铁桶类" },
  { value: "special", label: "特殊类" }
]
```

## Step 3: 验证数据

```bash
node -e "const d = require('./src/data/pvz2/zombies.js'); console.log('僵尸数量:', d.zombies.length)"
```

预期：100+ 种僵尸。

## Step 4: 提交

```bash
git add src/data/pvz2/zombies.js
git commit -m "feat(data): add PvZ 2 zombie data (100+ zombies)"
```

## 重要约束

- 使用 MediaWiki API 获取数据
- 中文名称使用广泛接受的 PvZ 2 翻译
- world 字段必须是有效的世界 ID
- 如果某些字段无法获取，使用 null
- 与 PvZ 1 僵尸数据结构保持一致（id、name、nameEn、health、speed、damage、category、firstAppearance、weakness、description、image）
