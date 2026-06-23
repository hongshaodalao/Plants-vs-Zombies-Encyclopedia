# PvZ1 音乐页面设计文档

## 概述

为 PvZ1 增加一个音乐页面，列出所有背景音乐，并支持播放功能。

## 需求

- 列出 PvZ1 的游戏背景音乐和关卡音乐
- 支持点击播放按钮播放音乐
- 一次只能播放一首音乐
- 简单列表展示，无复杂播放器功能

## 技术方案

下载 PvZ1 背景音乐文件到本地，创建音乐数据文件和播放页面。

### 音乐列表

| 音乐名称 | 场景 | 文件名 | 说明 |
|----------|------|--------|------|
| Main Menu | 主菜单 | main-menu.mp3 | 游戏主菜单背景音乐 |
| Day Stage | 白天关卡 | day-stage.mp3 | 白天关卡背景音乐 |
| Night Stage | 夜晚关卡 | night-stage.mp3 | 夜晚关卡背景音乐 |
| Pool Stage | 泳池关卡 | pool-stage.mp3 | 泳池关卡背景音乐 |
| Fog Stage | 浓雾关卡 | fog-stage.mp3 | 浓雾关卡背景音乐 |
| Roof Stage | 屋顶关卡 | roof-stage.mp3 | 屋顶关卡背景音乐 |
| Crazy Dave | 疯狂戴夫 | crazy-dave.mp3 | 疯狂戴夫场景音乐 |
| Zen Garden | 禅境花园 | zen-garden.mp3 | 禅境花园背景音乐 |
| Mini Game | 小游戏 | mini-game.mp3 | 小游戏背景音乐 |
| Final Boss | 最终 Boss | final-boss.mp3 | 最终 Boss 战斗音乐 |
| Victory | 胜利 | victory.mp3 | 关卡胜利音效 |
| Game Over | 失败 | game-over.mp3 | 关卡失败音效 |

### 文件结构

```
public/audio/pvz1/music/
├── main-menu.mp3
├── day-stage.mp3
├── night-stage.mp3
├── pool-stage.mp3
├── fog-stage.mp3
├── roof-stage.mp3
├── crazy-dave.mp3
├── zen-garden.mp3
├── mini-game.mp3
├── final-boss.mp3
├── victory.mp3
└── game-over.mp3
```

### 实现步骤

1. **创建音乐数据文件**：定义音乐列表和元数据
2. **下载音乐文件**：从网上下载 PvZ1 背景音乐
3. **创建音乐列表页面**：展示音乐列表和播放按钮
4. **添加路由和导航**：在 PvZ1 导航中添加音乐入口

### 涉及文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/data/pvz1/music.js` | 新建 | 音乐数据文件 |
| `src/pages/MusicList.jsx` | 新建 | 音乐列表页面 |
| `src/pages/MusicList.module.css` | 新建 | 音乐列表样式 |
| `src/App.jsx` | 修改 | 添加路由 |
| `src/components/Layout.jsx` | 修改 | 添加导航链接 |
| `scripts/download-music.py` | 新建 | 音乐下载脚本 |

### 音乐数据结构

```javascript
export const music = [
  {
    id: 'main-menu',
    name: '主菜单',
    nameEn: 'Main Menu',
    scene: '游戏主菜单',
    file: '/audio/pvz1/music/main-menu.mp3'
  },
  // ...
]
```

### 页面交互

- 点击播放按钮：播放对应音乐
- 点击停止按钮：停止当前播放
- 同时只能播放一首音乐
- 显示音乐名称、场景和播放状态

## 验证标准

- [ ] 音乐列表正确显示
- [ ] 点击播放按钮可以播放音乐
- [ ] 点击停止按钮可以停止音乐
- [ ] 同时只能播放一首音乐
- [ ] 页面在移动端正常显示
