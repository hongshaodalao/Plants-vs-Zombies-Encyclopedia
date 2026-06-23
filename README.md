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
- 🌿 植物图鉴：239 种植物，来自不同时空
- 🧟 僵尸图鉴：234 种僵尸，穿越时空的不死军团
- 🌍 世界探索：16 个世界，涵盖古埃及到摩登时代
- 🔍 实时搜索：按名称快速查找
- 🎯 多条件筛选：按世界、分类、阳光消耗等条件过滤
- 📊 灵活排序：按数值属性升降序排序

#### PvZ 2 中国版（2014 年）
- 🌿 中国版独占植物：26 种
- 🧟 中国版独占僵尸：45 种
- 🌍 中国版独占世界：5 个
- 🏷️ 中国版标签：卡片列表显示"中国版"标签
- 🇨🇳 中国版徽章：详情页显示"中国版独占"徽章
- 🔍 来源筛选：可按国际版/中国版筛选内容

### 语音朗读
- 🔊 支持预录音频播放植物/僵尸中文介绍
- 🎙️ 使用 Mimo TTS 模型生成高质量中文语音
- 👶 温柔亲切的年轻女性音色，适合儿童收听
- 📁 按版本和类型分类存储（pvz1/pvz2 + plants/zombies）

### 通用功能
- 📱 响应式设计：支持手机、平板、桌面
- 🔄 版本切换：首页可快速切换 PvZ 1 和 PvZ 2

## 移动端适配

网站支持以下设备：
- 手机：375px - 440px（iPhone SE 到 iPhone 16 Pro Max）
- 平板：768px - 1024px（iPad、iPad Pro）
- 桌面：> 1024px（PC、笔记本）

响应式断点：
- 480px：手机竖屏（2 列卡片、单列详情页）
- 640px：小平板（3 列卡片、筛选面板堆叠）
- 768px：平板（4 列卡片、详情页单列）
- 1024px：桌面（5 列卡片、完整布局）

## 技术栈

- **构建工具**：Vite 5
- **前端框架**：React 18
- **路由**：React Router v6
- **样式**：CSS Modules + CSS 变量
- **TTS 模型**：Mimo v2.5 TTS

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
├── hooks/          # 自定义 Hook（useSpeech 语音播放）
├── utils/          # 工具函数（getImagePath 路径处理）
├── data/           # 静态数据
│   ├── pvz1/       # PvZ 1 植物和僵尸数据
│   └── pvz2/       # PvZ 2 植物、僵尸和世界数据
└── styles/         # 全局样式和 CSS 变量
public/
├── audio/          # 预录音频文件
│   ├── pvz1/       # PvZ 1 音频（plants/ + zombies/）
│   └── pvz2/       # PvZ 2 音频（plants/ + zombies/）
├── images/         # 图片资源
│   ├── pvz1/       # PvZ 1 图片
│   └── pvz2/       # PvZ 2 图片
scripts/
├── mimo-tts.py     # Mimo TTS 音频生成脚本
├── batch-pvz1.py   # PvZ 1 批量音频生成
├── batch-pvz2.py   # PvZ 2 批量音频生成
└── fetch-zombie-descriptions.mjs  # 从 Wiki 获取僵尸描述
```

## 路由

### PvZ 1
- `/` - 首页（版本切换器）
- `/plants` - 植物列表
- `/plants/:id` - 植物详情
- `/zombies` - 僵尸列表
- `/zombies/:id` - 僵尸详情

### PvZ 2
- `/pvz2/plants` - 植物列表
- `/pvz2/plants/:id` - 植物详情
- `/pvz2/zombies` - 僵尸列表
- `/pvz2/zombies/:id` - 僵尸详情

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。推送到 `main` 分支会自动触发构建和部署。

## 许可

仅供个人学习使用。植物大战僵尸相关游戏内容版权归 PopCap Games / EA 所有。
