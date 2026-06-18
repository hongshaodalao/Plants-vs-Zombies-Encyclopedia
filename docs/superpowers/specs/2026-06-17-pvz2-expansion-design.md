# PvZ 2 百科扩展 - 设计文档

## 1. 项目概述

### 1.1 项目目标

在现有 PvZ 1 百科网站（49 植物 + 26 僵尸）基础上，扩展收录植物大战僵尸 2（PvZ 2）国际版的全部内容，包括植物图鉴、僵尸图鉴、世界信息和植物升级系统。

### 1.2 目标用户

- PvZ 2 玩家，希望查阅游戏数据
- 个人学习/娱乐用途

### 1.3 核心功能

- PvZ 2 植物图鉴：200+ 种植物的属性、能量豆效果、升级信息
- PvZ 2 僵尸图鉴：100+ 种僵尸的属性、弱点、特殊机制
- PvZ 2 世界信息：11 个世界的介绍、解锁条件、包含的植物/僵尸
- 植物升级系统：升级概览（可升级、最高等级、效果概述）
- 游戏版本切换：首页 PvZ 1/PvZ 2 版本选择器

---

## 2. 技术架构

### 2.1 技术栈

复用现有技术栈：
- **构建工具**：Vite 5
- **前端框架**：React 18
- **路由**：React Router v6
- **样式**：CSS Modules + CSS 变量
- **数据**：本地 JSON/JS 文件

### 2.2 数据目录结构

```
src/data/
├── pvz1/
│   ├── plants.js          # PvZ 1 植物（49 种）
│   ├── zombies.js         # PvZ 1 僵尸（26 种）
│   └── index.js           # 统一导出
├── pvz2/
│   ├── plants.js          # PvZ 2 植物（200+ 种）
│   ├── zombies.js         # PvZ 2 僵尸（100+ 种）
│   ├── worlds.js          # PvZ 2 世界（11 个）
│   └── index.js           # 统一导出
└── index.js               # 全局数据入口
```

### 2.3 路由设计

```
/                           → 首页（含版本切换器）
/plants                     → PvZ 1 植物图鉴
/plants/:id                 → PvZ 1 植物详情
/zombies                    → PvZ 1 僵尸图鉴
/zombies/:id                → PvZ 1 僵尸详情
/pvz2                       → PvZ 2 首页（世界选择）
/pvz2/plants                → PvZ 2 植物图鉴
/pvz2/plants/:id            → PvZ 2 植物详情
/pvz2/zombies               → PvZ 2 僵尸图鉴
/pvz2/zombies/:id           → PvZ 2 僵尸详情
/pvz2/worlds                → PvZ 2 世界列表
/pvz2/worlds/:id            → PvZ 2 世界详情
```

---

## 3. 数据模型

### 3.1 PvZ 2 植物数据结构

```javascript
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
  world: "modern_day",           // 所属世界
  unlockLevel: "1-1",            // 解锁关卡
  plantFoodEffect: "发射大量豌豆", // 能量豆效果
  upgradeable: true,             // 是否可升级
  maxUpgradeLevel: 10,           // 最高等级
  upgradeEffect: "伤害+10%/级",  // 升级效果概述
  description: "向僵尸发射豌豆。",
  image: "/images/pvz2/plants/peashooter.png"
}
```

### 3.2 PvZ 2 僵尸数据结构

```javascript
{
  id: "zombie",
  name: "普通僵尸",
  nameEn: "Zombie",
  health: 190,
  speed: "slow",
  damage: 100,
  category: "basic",
  world: "modern_day",           // 所属世界
  firstAppearance: "1-1",
  weakness: "any",
  special: "基础僵尸",
  description: "最常见的僵尸。",
  image: "/images/pvz2/zombies/zombie.png"
}
```

### 3.3 PvZ 2 世界数据结构

```javascript
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
}
```

---

## 4. 界面设计

### 4.1 首页版本切换器

```
┌─────────────────────────────────────────────────┐
│  🌻 植物大战僵尸百科全书                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐    ┌─────────────┐            │
│  │   PvZ 1     │    │   PvZ 2     │            │
│  │   2009      │    │   2013      │            │
│  │  49 植物    │    │  200+ 植物  │            │
│  │  26 僵尸    │    │  100+ 僵尸  │            │
│  └─────────────┘    └─────────────┘            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 4.2 PvZ 2 导航栏

- 顶部导航栏添加 PvZ 2 入口
- PvZ 2 页面有独立的子导航（植物/僵尸/世界）
- 当前游戏版本高亮显示

### 4.3 PvZ 2 详情页新增字段

```
┌─────────────────────────────────────────────────┐
│  ← 返回图鉴                                     │
│                                                 │
│  ┌─────────┐  豌豆射手                          │
│  │  图片   │  Peashooter                        │
│  │         │                                    │
│  └─────────┘  向僵尸发射豌豆。                   │
│                                                 │
│  阳光消耗: 100  冷却: 7.5s  伤害: 20  生命: 300 │
│  范围: 直线    分类: 射手类                      │
│                                                 │
│  🌍 所属世界: 现代时代                           │
│  🔓 解锁关卡: 1-1                               │
│  ⚡ 能量豆效果: 发射大量豌豆                     │
│  📈 升级: 可升级 (最高等级 10)                   │
│     效果: 伤害+10%/级                           │
│                                                 │
│  ← 上一个  |  下一个 →                          │
└─────────────────────────────────────────────────┘
```

---

## 5. 组件设计

### 5.1 可复用组件

| 组件 | 复用方式 | 修改点 |
|------|---------|--------|
| Card | 直接复用 | 添加 `gameVersion` prop 支持 PvZ 2 样式 |
| SearchBar | 直接复用 | 无修改 |
| FilterPanel | 直接复用 | 添加 PvZ 2 特有筛选项（世界、能量豆效果） |
| DetailView | 直接复用 | 添加 PvZ 2 特有字段（世界、升级信息、能量豆效果） |

### 5.2 新建组件

| 组件 | 用途 |
|------|------|
| WorldCard | 世界卡片（展示世界基本信息） |
| WorldDetail | 世界详情页（包含的植物/僵尸列表） |
| VersionSwitcher | 首页游戏版本切换器 |
| UpgradeInfo | 植物升级信息展示（在详情页中） |

---

## 6. 图片资源

### 6.1 图片来源

- PvZ Wiki（plantsvszombies.fandom.com）
- 使用 MediaWiki API 获取图片 URL
- 从 CDN 下载 PNG 格式图片

### 6.2 图片目录

```
public/images/
├── pvz1/
│   ├── plants/           # PvZ 1 植物图片（已有）
│   └── zombies/          # PvZ 1 僵尸图片（已有）
└── pvz2/
    ├── plants/           # PvZ 2 植物图片
    ├── zombies/          # PvZ 2 僵尸图片
    └── worlds/           # PvZ 2 世界图片
```

---

## 7. 分阶段实施计划

### 阶段 1：基础架构重构（预计 1-2 天）

- 重构数据目录结构（`src/data/pvz1/` 和 `src/data/pvz2/`）
- 更新现有导入路径
- 添加首页版本切换器
- 更新路由配置

### 阶段 2：PvZ 2 植物图鉴（预计 2-3 天）

- 收集 PvZ 2 植物数据（200+ 种）
- 下载 PvZ 2 植物图片
- 创建 PvZ 2 植物数据文件
- 实现 PvZ 2 植物列表页和详情页

### 阶段 3：PvZ 2 僵尸图鉴（预计 2-3 天）

- 收集 PvZ 2 僵尸数据（100+ 种）
- 下载 PvZ 2 僵尸图片
- 创建 PvZ 2 僵尸数据文件
- 实现 PvZ 2 僵尸列表页和详情页

### 阶段 4：世界信息（预计 1-2 天）

- 收集 11 个世界的基础信息
- 下载世界图片
- 创建世界数据文件
- 实现世界列表页和详情页

### 阶段 5：升级系统（预计 1 天）

- 收集植物升级概览信息
- 在详情页添加升级信息展示
- 添加升级相关筛选选项

### 阶段 6：测试与优化（预计 1 天）

- 全功能测试
- 性能优化
- 响应式适配
- 文档更新

**总计预计：8-12 天**

---

## 8. 性能优化

- 图片懒加载
- 搜索防抖（300ms）
- 路由懒加载（`React.lazy`）
- 列表虚拟化（如数据量大，使用 `react-window`）
- PvZ 2 数据按需加载（避免一次性加载 300+ 条目）

---

## 9. 部署方案

- 构建命令：`npm run build`
- 输出目录：`dist/`
- 部署平台：GitHub Pages / Vercel / Netlify（免费静态托管）

---

## 10. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| PvZ 2 数据量大 | 性能问题 | 分页加载、虚拟列表 |
| 图片版权 | 法律风险 | 仅个人学习使用 |
| 数据准确性 | 用户体验 | 多源交叉验证 |
| 实施周期长 | 项目延期 | 分阶段交付，每阶段独立可用 |
