# Task 3: 准备僵尸数据

**Files:**
- Create: `src/data/zombies.js`

## Step 1: 编写 `src/data/zombies.js`

写入 `src/data/zombies.js`：

```javascript
export const zombies = [
  {
    id: "zombie",
    name: "普通僵尸",
    nameEn: "Zombie",
    health: 200,
    speed: "slow",
    damage: 100,
    category: "basic",
    firstAppearance: 1,
    weakness: "任意",
    description: "最基础的僵尸，生命值与攻击力都较低。",
    image: "/images/zombies/zombie.png"
  },
  {
    id: "flagzombie",
    name: "旗帜僵尸",
    nameEn: "Flag Zombie",
    health: 200,
    speed: "slow",
    damage: 100,
    category: "basic",
    firstAppearance: 1,
    weakness: "任意",
    description: "持旗帜的僵尸，标志着大规模进攻的开始。",
    image: "/images/zombies/flagzombie.png"
  },
  {
    id: "conezombie",
    name: "路障僵尸",
    nameEn: "Conehead Zombie",
    health: 560,
    speed: "slow",
    damage: 100,
    category: "cone",
    firstAppearance: 2,
    weakness: "任意",
    description: "头戴路障，生命值更高，需要更多伤害才能击杀。",
    image: "/images/zombies/conezombie.png"
  },
  {
    id: "bucketzombie",
    name: "铁桶僵尸",
    nameEn: "Buckethead Zombie",
    health: 1280,
    speed: "slow",
    damage: 100,
    category: "bucket",
    firstAppearance: 3,
    weakness: "任意",
    description: "头戴铁桶，防御力极强。",
    image: "/images/zombies/bucketzombie.png"
  },
  {
    id: "screendoor",
    name: "铁栅门僵尸",
    nameEn: "Screen Door Zombie",
    health: 1280,
    speed: "slow",
    damage: 100,
    category: "special",
    firstAppearance: 5,
    weakness: "穿透类植物",
    description: "手持铁栅门，可以弹开豌豆等直线攻击。",
    image: "/images/zombies/screendoor.png"
  },
  {
    id: "football",
    name: "橄榄球僵尸",
    nameEn: "Football Zombie",
    health: 1480,
    speed: "fast",
    damage: 100,
    category: "special",
    firstAppearance: 8,
    weakness: "减速",
    description: "身穿橄榄球装备，移动速度快，防御力强。",
    image: "/images/zombies/football.png"
  },
  {
    id: "digger",
    name: "矿工僵尸",
    nameEn: "Digger Zombie",
    health: 200,
    speed: "medium",
    damage: 100,
    category: "special",
    firstAppearance: 14,
    weakness: "立即触发类",
    description: "从地下挖洞绕过植物，从后方出现。",
    image: "/images/zombies/digger.png"
  },
  {
    id: "pogo",
    name: "跳跳僵尸",
    nameEn: "Pogo Zombie",
    health: 200,
    speed: "fast",
    damage: 100,
    category: "special",
    firstAppearance: 15,
    weakness: "立即触发类",
    description: "手持弹簧杆跳跃过植物，需要立即触发型植物应对。",
    image: "/images/zombies/pogo.png"
  }
]

export const zombieCategories = [
  { value: "basic", label: "基础类" },
  { value: "cone", label: "路障类" },
  { value: "bucket", label: "铁桶类" },
  { value: "special", label: "特殊类" }
]

export const speedLabels = {
  slow: "慢",
  medium: "中",
  fast: "快"
}
```

## Step 2: 验证数据可正常导入

参考 Task 2 验证方式，临时在 `src/App.jsx` 中加入：

```javascript
import { zombies, zombieCategories } from './data/zombies.js'
console.log('僵尸数量:', zombies.length, '分类数量:', zombieCategories.length)
```

浏览器控制台应输出：
```
僵尸数量: 8 分类数量: 4
```

确认后撤销临时代码（恢复 `src/App.jsx` 到 Task 2 后的状态）。

**注意：dev 服务器应在后台运行（`run_in_background: true`）进行验证。验证完成后停止它。**

## Step 3: 提交

```bash
git add src/data/zombies.js
git commit -m "feat(data): add zombie data with 8 zombies"
```

## 重要约束

- 数据文件必须**精确**包含 8 个僵尸条目（id: zombie, flagzombie, conezombie, bucketzombie, screendoor, football, digger, pogo）
- 4 个分类条目（基础/路障/铁桶/特殊）
- speedLabels 是一个对象（非数组），用 slow/medium/fast 作为 key
- 所有中文文本必须使用中文逗号"，"，不是英文逗号","
- description 字段以中文句号"。"结尾
- ID 字段必须使用英文小写无空格
- category 值只能是 "basic" / "cone" / "bucket" / "special"
- speed 值只能是 "slow" / "medium" / "fast"
- 图片路径使用 `.png`（任务 4 会创建 SVG 占位并临时改为 `.svg`）
- 不要修改 `src/data/plants.js`
