# Task 7 Report: UI 更新 - 筛选面板来源筛选

## Status: DONE

## 实现内容

在 PvZ 2 筛选面板中添加了"来源"筛选组，支持按国际版/中国版筛选。

### 修改的文件

1. **`src/components/Pvz2FilterPanel.jsx`**
   - 添加了 `sourceOptions` 数组（国际版 / 中国版）
   - 添加了 `toggleSource` 函数，实现来源筛选的多选切换
   - 在 JSX 中添加了来源筛选组（位于分类和世界之间）
   - 更新了 `handleReset` 函数，重置时包含 `sources: []`

2. **`src/pages/Pvz2PlantsList.jsx`**
   - 在 filters 初始状态中添加 `sources: []`
   - 在筛选逻辑中添加来源筛选：`filters.sources.includes(p.source)`

3. **`src/pages/Pvz2ZombiesList.jsx`**
   - 在 filters 初始状态中添加 `sources: []`
   - 在筛选逻辑中添加来源筛选：`filters.sources.includes(z.source)`

## 验证结果

- `npm run dev` 启动成功，Vite 编译无错误
- 植物列表页和僵尸列表页均可正常加载
- 来源筛选与其他筛选条件为 AND 关系
- 不勾选任何来源选项时显示所有条目
- 勾选"中国版"时仅显示 `source: "china"` 的条目
- 勾选"国际版"时仅显示 `source: "international"` 的条目
- 同时勾选两个选项时显示所有条目
- 重置按钮正确清除来源筛选

## 自检结果

- [x] 在 Pvz2FilterPanel.jsx 中添加了来源筛选组
- [x] 添加了 toggleSource 函数
- [x] 在 Pvz2PlantsList.jsx 中添加了来源筛选逻辑
- [x] 在 Pvz2ZombiesList.jsx 中添加了来源筛选逻辑
- [x] 在两个列表页的初始状态中添加了 `sources: []`
- [x] 来源筛选正确工作（与其他筛选为 AND 关系）
- [x] 仅修改了指定的 3 个文件
- [x] 未修改数据文件或其他组件
