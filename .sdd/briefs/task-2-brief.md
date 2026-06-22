# Task 2: 准备植物数据

**Files:**
- Create: `src/data/plants.js`

## Step 1: 编写 `src/data/plants.js`

写入 `src/data/plants.js`：

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
    unlockLevel: 1,
    description: "最基础的植物，向前方直线发射豌豆攻击僵尸。",
    image: "/images/plants/peashooter.png"
  },
  {
    id: "sunflower",
    name: "向日葵",
    nameEn: "Sunflower",
    sunCost: 50,
    recharge: 7.5,
    damage: 0,
    health: 300,
    range: "无",
    category: "support",
    unlockLevel: 1,
    description: "定期生产阳光，是经济来源的核心。",
    image: "/images/plants/sunflower.png"
  },
  {
    id: "cherrybomb",
    name: "樱桃炸弹",
    nameEn: "Cherry Bomb",
    sunCost: 150,
    recharge: 50,
    damage: 1800,
    health: 300,
    range: "周围 3x3",
    category: "explosive",
    unlockLevel: 2,
    description: "延迟 1.2 秒后爆炸，对周围大范围造成巨大伤害。",
    image: "/images/plants/cherrybomb.png"
  },
  {
    id: "wallnut",
    name: "坚果墙",
    nameEn: "Wall-nut",
    sunCost: 50,
    recharge: 30,
    damage: 0,
    health: 4000,
    range: "无",
    category: "defensive",
    unlockLevel: 1,
    description: "高生命值的防御植物，能阻挡僵尸前进。",
    image: "/images/plants/wallnut.png"
  },
  {
    id: "potatomine",
    name: "土豆地雷",
    nameEn: "Potato Mine",
    sunCost: 25,
    recharge: 30,
    damage: 1800,
    health: 300,
    range: "单个",
    category: "explosive",
    unlockLevel: 2,
    description: "需要 15 秒准备时间，被僵尸踩到时爆炸。",
    image: "/images/plants/potatomine.png"
  },
  {
    id: "snowpea",
    name: "寒冰射手",
    nameEn: "Snow Pea",
    sunCost: 175,
    recharge: 7.5,
    damage: 20,
    health: 300,
    range: "直线",
    category: "shooter",
    unlockLevel: 3,
    description: "发射冰豌豆，命中僵尸会减速。",
    image: "/images/plants/snowpea.png"
  },
  {
    id: "chomper",
    name: "大嘴花",
    nameEn: "Chomper",
    sunCost: 150,
    recharge: 7.5,
    damage: 1000,
    health: 300,
    range: "单个",
    category: "explosive",
    unlockLevel: 4,
    description: "一口吞下一个僵尸，但咀嚼时间较长。",
    image: "/images/plants/chomper.png"
  },
  {
    id: "repeater",
    name: "双发射手",
    nameEn: "Repeater",
    sunCost: 200,
    recharge: 7.5,
    damage: 40,
    health: 300,
    range: "直线",
    category: "shooter",
    unlockLevel: 5,
    description: "一次发射两颗豌豆，伤害翻倍。",
    image: "/images/plants/repeater.png"
  }
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

## Step 2: 验证数据可正常导入

创建临时验证文件 `src/data/_test.js`：

```javascript
import { plants, plantCategories } from './plants.js'

console.log('植物数量:', plants.length)
console.log('分类数量:', plantCategories.length)
console.log('第一个植物:', plants[0].name)
```

修改 `src/App.jsx` 临时引入测试：

```javascript
import './data/_test.js'

function App() {
  return <div>植物大战僵尸百科全书</div>
}

export default App
```

运行 `npm run dev`，打开浏览器控制台，看到：
```
植物数量: 8
分类数量: 4
第一个植物: 豌豆射手
```

**注意：dev 服务器应在后台运行（`run_in_background: true`）进行验证。验证完成后停止它。**

## Step 3: 清理验证文件

```bash
rm src/data/_test.js
```

恢复 `src/App.jsx` 为 Task 1 中的版本（最小占位）。

## Step 4: 提交

```bash
git add src/data/plants.js
git commit -m "feat(data): add plant data with 8 plants"
```

## 重要约束

- 数据文件必须**精确**包含 8 个植物条目（id: peashooter, sunflower, cherrybomb, wallnut, potatomine, snowpea, chomper, repeater）
- 4 个分类条目（射手/爆炸/防御/辅助）
- 4 个阳光消耗范围
- 所有中文文本必须使用中文逗号"，"，不是英文逗号","
- description 字段以中文句号"。"结尾
- ID 字段必须使用英文小写无空格
- 注意：植物图片路径是 `.png`（任务 4 会创建 SVG 占位并临时改为 `.svg`）
