# Task 5: UI 更新 - 卡片来源标签 - 完成报告

## 实施内容

在植物/僵尸卡片组件上添加了"中国版"来源标签，当数据项包含 `source: "china"` 时自动显示。

## 修改的文件

1. **src/components/Card.jsx**
   - 在世界标签（worldLabel）下方添加了条件渲染逻辑
   - 当 `data.source === 'china'` 时显示 `<span>中国版</span>` 标签

2. **src/components/Card.module.css**
   - 添加了 `.sourceTag` 样式类：内联块显示、小号字体、加粗、圆角
   - 添加了 `.sourceChina` 样式类：红色背景（`var(--color-zombie)`）、浅色文字

## 验证结果

- 开发服务器成功启动并运行
- 页面 `/pvz2/plants` 正常加载
- CSS 样式正确应用到组件
- 开发服务器已停止

## 自检清单

### 完整性
- [x] 已添加 `.sourceTag` CSS 类
- [x] 已添加 `.sourceChina` CSS 类
- [x] 已添加中国版标签的条件渲染
- [x] 已验证标签显示逻辑

### 质量
- [x] 标签使用红色背景（`var(--color-zombie)`）
- [x] 标签仅在 `source: "china"` 时显示
- [x] 标签位置正确（在名称和世界标签下方）
- [x] 使用 CSS Modules 样式隔离

### 纪律
- [x] 仅修改了 Card.jsx 和 Card.module.css
- [x] 未修改其他组件或数据文件
- [x] 仅提交了相关文件

### 测试
- [x] 运行了开发服务器并验证
- [x] 已停止开发服务器

## 提交信息

```
commit c6a7041
feat(ui): add source tag to Card component for China version
```

## 结论

任务已完成，实现符合规范要求。中国版内容的卡片将显示红色"中国版"标签，国际版内容不显示任何标签。
