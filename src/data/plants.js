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
    image: "/images/plants/peashooter.svg"
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
    image: "/images/plants/sunflower.svg"
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
    image: "/images/plants/cherrybomb.svg"
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
    image: "/images/plants/wallnut.svg"
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
    image: "/images/plants/potatomine.svg"
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
    image: "/images/plants/snowpea.svg"
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
    image: "/images/plants/chomper.svg"
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
    image: "/images/plants/repeater.svg"
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