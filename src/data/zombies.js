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
    image: "/images/zombies/zombie.svg"
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
    image: "/images/zombies/flagzombie.svg"
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
    image: "/images/zombies/conezombie.svg"
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
    image: "/images/zombies/bucketzombie.svg"
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
    image: "/images/zombies/screendoor.svg"
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
    image: "/images/zombies/football.svg"
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
    image: "/images/zombies/digger.svg"
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
    image: "/images/zombies/pogo.svg"
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