# Task 2: 采集中国版世界数据

**Files:**
- Modify: `src/data/pvz2/worlds.js`
- Create: `public/images/pvz2/worlds/*.png`

## 任务目标

从中文 PvZ Wiki 采集中国版独占世界数据，下载世界图片，更新数据文件。

## Step 1: 从中文 PvZ Wiki 采集中国版独占世界数据

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占世界。

已知中国版独占世界（需验证）：
- 西游记 (Journey to the West)
- 功夫世界 (Kung Fu World)
- 天空之城 (Sky City)
- 蒸汽时代 (Steam Ages)
- 文艺复兴 (Renaissance Age)
- 平安时代 (Heian Age)
- 恐龙时代 (Dino World)
- 全新纪元 (MD Eras)

数据结构与现有世界一致，添加 `source: "china"` 字段：

```javascript
{
  id: "journey_to_the_west",
  name: "西游记",
  nameEn: "Journey to the West",
  description: "...",
  unlockCondition: "...",
  plantIds: [...],
  zombieIds: [...],
  levels: 25,
  specialMechanic: "...",
  image: "/images/pvz2/worlds/journey_to_the_west.png",
  source: "china"
}
```

## Step 2: 下载中国版世界图片

从中文 PvZ Wiki 下载世界图片，保存到 `public/images/pvz2/worlds/`。

使用 MediaWiki API 获取图片 URL，然后下载。

## Step 3: 更新 worlds.js

将采集到的世界数据追加到 `src/data/pvz2/worlds.js` 的 `worlds` 数组末尾。

## Step 4: 验证

```bash
node -e "
const worlds = require('./src/data/pvz2/worlds.js').worlds;
const chinaWorlds = worlds.filter(w => w.source === 'china');
console.log('中国版世界数量:', chinaWorlds.length);
chinaWorlds.forEach(w => console.log('  ' + w.id + ': ' + w.name));
"
```

## Step 5: 构建验证

```bash
npm run build
```

## Step 6: 提交

```bash
git add src/data/pvz2/worlds.js public/images/pvz2/worlds/
git commit -m "feat(data): add PvZ 2 China-exclusive worlds"
```

## 重要约束

- 使用 MediaWiki API 获取数据（不是手动编写）
- 中文名称使用中文 PvZ Wiki 的官方翻译
- `source` 字段必须是 `"china"`
- `plantIds` 和 `zombieIds` 必须是有效的 ID 数组
- 如果某些字段无法获取，使用合理的默认值或 null
- 不修改国际版世界数据
- 不修改其他数据文件
