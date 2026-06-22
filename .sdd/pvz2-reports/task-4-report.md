# Task 4: 添加 PvZ 2 基础路由 — 完成报告

## 状态: DONE

## 实施内容

### Step 1: 创建 7 个占位页面文件

| 文件 | 内容 |
|------|------|
| `src/pages/Pvz2Home.jsx` | `<h2>PvZ 2 首页（待实现）</h2>` |
| `src/pages/Pvz2PlantsList.jsx` | `<h2>PvZ 2 植物图鉴（待实现）</h2>` |
| `src/pages/Pvz2PlantDetail.jsx` | `<h2>PvZ 2 植物详情（待实现）</h2>` |
| `src/pages/Pvz2ZombiesList.jsx` | `<h2>PvZ 2 僵尸图鉴（待实现）</h2>` |
| `src/pages/Pvz2ZombieDetail.jsx` | `<h2>PvZ 2 僵尸详情（待实现）</h2>` |
| `src/pages/WorldsList.jsx` | `<h2>世界列表（待实现）</h2>` |
| `src/pages/WorldDetail.jsx` | `<h2>世界详情（待实现）</h2>` |

所有占位页面只包含简单文字，无任何逻辑。

### Step 2: 更新 App.jsx

- 新增 7 个 PvZ 2 组件导入
- 新增 7 条路由，全部位于 `/pvz2/` 前缀下：
  - `/pvz2` -> Pvz2Home
  - `/pvz2/plants` -> Pvz2PlantsList
  - `/pvz2/plants/:id` -> Pvz2PlantDetail
  - `/pvz2/zombies` -> Pvz2ZombiesList
  - `/pvz2/zombies/:id` -> Pvz2ZombieDetail
  - `/pvz2/worlds` -> WorldsList
  - `/pvz2/worlds/:id` -> WorldDetail
- 路由顺序：所有具体路由在前，通配路由 `*` 在后
- PvZ 1 路由完全保留不变

### Step 3: 验证结果

| 路由 | 结果 |
|------|------|
| `/pvz2` | OK |
| `/pvz2/plants` | OK |
| `/pvz2/plants/sunflower` (detail) | OK |
| `/pvz2/zombies` | OK |
| `/pvz2/zombies/basic` (detail) | OK |
| `/pvz2/worlds` | OK |
| `/pvz2/worlds/egypt` (detail) | OK |
| `/plants` (PvZ 1) | OK |
| `/nonexistent` (NotFound) | OK |

- 构建成功：64 个模块转换，无错误
- 所有 SPA 路由正确返回 HTML（内容由 JavaScript 客户端渲染）
- 开发服务器已停止

### Step 4: 提交

```
9373e72 feat(routing): add PvZ 2 routes with placeholder pages
```

## 变更文件

- `src/App.jsx` (修改)
- `src/pages/Pvz2Home.jsx` (新建)
- `src/pages/Pvz2PlantsList.jsx` (新建)
- `src/pages/Pvz2PlantDetail.jsx` (新建)
- `src/pages/Pvz2ZombiesList.jsx` (新建)
- `src/pages/Pvz2ZombieDetail.jsx` (新建)
- `src/pages/WorldsList.jsx` (新建)
- `src/pages/WorldDetail.jsx` (新建)

## 自审结果

- [x] 7 个占位页面全部创建
- [x] App.jsx 包含所有 PvZ 2 路由
- [x] 路由顺序正确（具体路由在前，通配路由在后）
- [x] 所有 PvZ 2 路由可访问
- [x] PvZ 1 路由不受影响
- [x] 占位页面仅包含简单文字
- [x] 构建成功无错误
- [x] 仅提交相关文件
