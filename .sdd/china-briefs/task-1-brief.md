# Task 1: 数据模型扩展 - 添加 source 字段

**Files:**
- Modify: `src/data/pvz2/plants.js`
- Modify: `src/data/pvz2/zombies.js`
- Modify: `src/data/pvz2/worlds.js`

## 任务目标

为现有 PvZ 2 国际版数据添加 `source` 字段，值为 `"international"`，为后续添加中国版内容做准备。

## Step 1: 为现有 PvZ 2 植物数据添加 source 字段

在 `src/data/pvz2/plants.js` 中，为每个植物对象添加 `source: "international"` 字段。

使用 Node.js 脚本批量添加：

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
node -e "
const fs = require('fs');
let content = fs.readFileSync('src/data/pvz2/plants.js', 'utf8');
// 在每个对象的 id 字段后添加 source 字段
content = content.replace(
  /(\"id\": \"[^\"]+\",)/g,
  '\$1\n    \"source\": \"international\",'
);
fs.writeFileSync('src/data/pvz2/plants.js', content);
console.log('植物数据 source 字段添加完成');
"
```

## Step 2: 为现有 PvZ 2 僵尸数据添加 source 字段

同样为 `src/data/pvz2/zombies.js` 添加 `source: "international"`。

## Step 3: 为现有 PvZ 2 世界数据添加 source 字段

同样为 `src/data/pvz2/worlds.js` 添加 `source: "international"`。

## Step 4: 验证

```bash
node -e "
const plants = require('./src/data/pvz2/plants.js').plants;
const zombies = require('./src/data/pvz2/zombies.js').zombies;
const worlds = require('./src/data/pvz2/worlds.js').worlds;
console.log('植物 source 检查:', plants.every(p => p.source === 'international'));
console.log('僵尸 source 检查:', zombies.every(z => z.source === 'international'));
console.log('世界 source 检查:', worlds.every(w => w.source === 'international'));
"
```

预期：全部返回 `true`。

## Step 5: 构建验证

```bash
npm run build
```

确认构建成功。

## Step 6: 提交

```bash
git add src/data/pvz2/
git commit -m "feat(data): add source field to PvZ 2 data for China version support"
```

## 重要约束

- 只在现有数据中添加 `source` 字段，不修改其他字段
- `source` 值必须是 `"international"`（字符串）
- 不添加新的植物/僵尸/世界条目
- 不修改 `src/data/pvz1/` 目录
- 使用 Node.js 脚本批量处理，避免手动编辑 213+189+11 = 413 个对象
