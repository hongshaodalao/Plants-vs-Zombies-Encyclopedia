# 植物大战僵尸百科全书

一个使用 React 构建的植物大战僵尸系列图鉴网站，涵盖 PvZ 1 和 PvZ 2 两代游戏的全部植物、僵尸和世界数据。

## 功能

### PvZ 1（2009 年）
- 🌿 植物图鉴：49 种植物的属性与技能
- 🧟 僵尸图鉴：26 种僵尸的属性与弱点
- 🔍 实时搜索：按名称快速查找
- 🎯 多条件筛选：按分类、阳光消耗、解锁关卡等条件过滤
- 📊 灵活排序：按数值属性升降序排序

### PvZ 2（2013 年）
- 🌿 植物图鉴：213 种植物，来自不同时空
- 🧟 僵尸图鉴：189 种僵尸，穿越时空的不死军团
- 🌍 世界探索：11 个世界，涵盖古埃及到摩登时代
- 🔍 实时搜索：按名称快速查找
- 🎯 多条件筛选：按世界、分类、阳光消耗等条件过滤
- 📊 灵活排序：按数值属性升降序排序

### 通用功能
- 📱 响应式设计：支持手机、平板、桌面
- 🔄 版本切换：首页可快速切换 PvZ 1 和 PvZ 2

## 技术栈

- **构建工具**：Vite 5
- **前端框架**：React 18
- **路由**：React Router v6
- **样式**：CSS Modules + CSS 变量

## 开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/     # 可复用组件（Card、SearchBar、FilterPanel 等）
├── pages/          # 页面组件（Home、PlantsList、ZombiesList 等）
├── data/           # 静态数据
│   ├── pvz1/       # PvZ 1 植物和僵尸数据
│   └── pvz2/       # PvZ 2 植物、僵尸和世界数据
└── styles/         # 全局样式和 CSS 变量
```

## 路由

### PvZ 1
- `/` - 首页（版本切换器）
- `/plants` - 植物列表
- `/plants/:id` - 植物详情
- `/zombies` - 僵尸列表
- `/zombies/:id` - 僵尸详情

### PvZ 2
- `/pvz2` - PvZ 2 首页
- `/pvz2/plants` - 植物列表
- `/pvz2/plants/:id` - 植物详情
- `/pvz2/zombies` - 僵尸列表
- `/pvz2/zombies/:id` - 僵尸详情
- `/pvz2/worlds` - 世界列表
- `/pvz2/worlds/:id` - 世界详情

## 许可

仅供个人学习使用。植物大战僵尸相关游戏内容版权归 PopCap Games / EA 所有。
