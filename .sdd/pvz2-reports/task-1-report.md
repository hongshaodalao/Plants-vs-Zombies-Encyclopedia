# Task 1: 重构数据目录结构 - 完成报告

## 实施内容

按任务简述的 9 个步骤依次执行：

1. 创建 `src/data/pvz1/` 目录，将 `plants.js` 和 `zombies.js` 移入其中
2. 创建 `src/data/pvz1/index.js`，导出所有 PvZ 1 数据
3. 创建 `src/data/index.js`，作为全局数据入口并导出 `pvz1` 命名空间
4. 更新 `PlantsList.jsx` 导入路径：`../data/plants.js` → `../data/pvz1/plants.js`
5. 更新 `PlantDetail.jsx` 导入路径：`../data/plants.js` → `../data/pvz1/plants.js`
6. 更新 `ZombiesList.jsx` 导入路径：`../data/zombies.js` → `../data/pvz1/zombies.js`
7. 更新 `ZombieDetail.jsx` 导入路径：`../data/zombies.js` → `../data/pvz1/zombies.js`

## 验证结果

- 开发服务器在端口 5174 正常启动，无编译错误
- `/plants` 和 `/zombies` 页面均返回正常 HTML 响应
- 生产构建成功：55 个模块全部转换，无错误
- 项目中不存在残留的旧路径引用

## 修改的文件

| 文件 | 变更类型 |
|------|----------|
| `src/data/plants.js` → `src/data/pvz1/plants.js` | 移动 |
| `src/data/zombies.js` → `src/data/pvz1/zombies.js` | 移动 |
| `src/data/pvz1/index.js` | 新建 |
| `src/data/index.js` | 新建 |
| `src/pages/PlantsList.jsx` | 更新导入路径 |
| `src/pages/PlantDetail.jsx` | 更新导入路径 |
| `src/pages/ZombiesList.jsx` | 更新导入路径 |
| `src/pages/ZombieDetail.jsx` | 更新导入路径 |

## 自检发现

无问题。所有变更仅涉及文件移动和导入路径更新，未修改任何数据内容或组件逻辑。

## 提交记录

- 提交 SHA: `9cf6938`
- 提交信息: `refactor(data): restructure data directory for PvZ 1/PvZ 2 separation`
