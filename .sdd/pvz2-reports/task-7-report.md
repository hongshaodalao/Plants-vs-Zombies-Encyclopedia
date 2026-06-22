# Task 7 Report: PvZ 2 植物列表页实现

## 实现内容

实现了 PvZ 2 植物列表页，支持搜索、筛选和排序功能。

### 创建的文件

1. **src/components/Pvz2FilterPanel.jsx** - PvZ 2 专用筛选面板组件
   - 分类筛选（shooter/explosive/defensive/support）
   - 世界筛选（12 个世界，下拉选择）
   - 阳光消耗范围筛选（0-50/51-100/101-150/151-200/200+）
   - 排序（阳光消耗/伤害/生命值，升序/降序）
   - 重置筛选按钮

2. **src/components/Pvz2FilterPanel.module.css** - 筛选面板样式

3. **src/pages/Pvz2PlantsList.jsx** - PvZ 2 植物列表页（替换占位页面）
   - 使用 PvZ 2 植物数据（213 条目）
   - 搜索功能（name/nameEn/description）
   - 筛选功能（world/category/sunCostRange）
   - 排序功能（sunCost/damage/health）
   - 结果计数显示

4. **src/pages/Pvz2PlantsList.module.css** - 列表页样式

### 修改的文件

5. **src/components/Card.jsx** - 添加 `gameVersion` prop 支持
   - 新增 `gameVersion` 属性，当值为 `"pvz2"` 时生成 `/pvz2/plants/:id` 路径
   - 保持向后兼容，默认行为不变

## 验证结果

- `npm run build` 构建成功，无错误
- `npm run dev` 启动后访问 `/pvz2/plants` 返回 HTTP 200
- Pvz2PlantsList.jsx 和 Pvz2FilterPanel.jsx 模块均可正常加载

## 自审发现

- Card 组件原不支持 PvZ 2 路由，需要添加 `gameVersion` prop（不在原 brief 文件列表中，但为必要修改）
- PvZ 2 数据中 `sunCost` 范围为 0-500，调整了筛选范围分段

## 提交

- SHA: b8bb2a9
- 消息: feat(pvz2): implement PvZ 2 plants list page
- 文件: 5 files changed, 398 insertions(+), 3 deletions(-)
