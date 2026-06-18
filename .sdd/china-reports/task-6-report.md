# Task 6: UI 更新 - 详情页来源信息 完成报告

## 完成状态

**状态:** DONE

## 实现内容

在 PvZ 2 详情页（`Pvz2DetailView` 组件）中添加了来源信息显示功能。

### 具体修改

1. **CSS 样式添加** (`src/components/Pvz2DetailView.module.css`)
   - 新增 `.sourceBadge` 基础样式（内联块、内边距、圆角、字体大小、粗体、下边距）
   - 新增 `.sourceChina` 样式（红色背景 `var(--color-zombie)`，浅色文字）
   - 新增 `.sourceInternational` 样式（浅绿背景 `var(--color-grass-light)`，浅色文字）
   - 样式放置在媒体查询之前，位置合理

2. **JSX 条件渲染** (`src/components/Pvz2DetailView.jsx`)
   - 在世界标签（worldBadge）之后、描述文字之前添加来源标签
   - 当 `data.source === 'china'` 时显示 "🇨🇳 中国版独占" 标签
   - 国际版内容不显示标签（符合需求）

## 验证结果

- **构建验证:** `vite build` 成功，无错误
- **样式包含:** 生成的 CSS 文件中确认包含 `.sourceBadge` 和 `.sourceChina` 类
- **组件逻辑:** 条件渲染逻辑正确，仅在 `source === 'china'` 时显示标签
- **视觉设计:** 使用红色背景（`var(--color-zombie)`）突出显示中国版独占内容

## 文件变更

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/components/Pvz2DetailView.jsx` | 修改 | 添加来源标签条件渲染（6 行新增） |
| `src/components/Pvz2DetailView.module.css` | 修改 | 添加来源样式类（18 行新增） |

## 自检清单

- [x] 添加了 `.sourceBadge`、`.sourceChina`、`.sourceInternational` CSS 类
- [x] 添加了条件渲染逻辑（`data.source === 'china'`）
- [x] 标签仅在 `source: "china"` 时显示
- [x] 使用红色背景（`var(--color-zombie)`）
- [x] 标签位置正确（标题下方，描述上方）
- [x] 使用 CSS Modules 样式隔离
- [x] 未修改其他组件或数据文件
- [x] 构建成功无错误

## 提交信息

```
commit 6c56e60
feat(ui): add source info to PvZ 2 detail view
```

## 注意事项

- 标签位置经过优化，放置在世界标签（worldBadge）之后、描述文字之前，视觉层次更清晰
- CSS 样式使用了项目现有的 CSS 变量，保持一致性
- 国际版内容不会显示任何来源标签，符合需求约束
