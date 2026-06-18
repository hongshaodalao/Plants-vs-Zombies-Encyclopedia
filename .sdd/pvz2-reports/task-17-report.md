# Task 17: 更新 Card 组件支持 PvZ 2 - 完成报告

## 状态: DONE

## 实现内容

### 1. 更新 Card.jsx
- 添加 `gameVersion` prop，默认值为 `'pvz1'`
- 添加 `worldNames` 映射表，将世界 ID 转换为中文名称
- 添加 `isPvz2` 变量用于判断是否为 PvZ 2
- 在卡片中显示世界标签（仅 PvZ 2 且有 world 字段时显示）
- 链接路径自动适配：PvZ 2 时链接到 `/pvz2/plants/:id` 或 `/pvz2/zombies/:id`

### 2. 更新 Card.module.css
- 添加 `.worldLabel` 样式类
- 使用太阳色（`--color-sun`）作为文字颜色
- 添加半透明背景和圆角

## 验证结果

### 构建验证
- `npm run build` 成功，无错误
- 构建输出：2 个文件变更，29 行插入，1 行删除

### 功能验证
- PvZ 1 卡片：保持原有功能，`gameVersion` 默认值为 `'pvz1'`
- PvZ 2 卡片：
  - 链接正确指向 `/pvz2/plants/:id` 或 `/pvz2/zombies/:id`
  - 显示世界标签（如"古埃及"、"海盗港湾"等）
  - 样式符合设计规范

## 修改文件

1. `src/components/Card.jsx`
   - 添加 worldNames 映射
   - 添加 gameVersion prop 默认值
   - 添加 PvZ 2 世界标签显示

2. `src/components/Card.module.css`
   - 添加 .worldLabel 样式

## 自检结果

### 完整性
- [x] 添加 gameVersion prop 到 Card.jsx
- [x] 默认值正常工作 (gameVersion="pvz1")
- [x] PvZ 2 卡片链接到 /pvz2/plants/:id 或 /pvz2/zombies/:id
- [x] 更新 Card.module.css 添加 PvZ 2 样式

### 质量
- [x] PvZ 1 卡片仍然正常工作
- [x] PvZ 2 卡片正确显示
- [x] 世界标签正常显示

### 规范
- [x] 保持向后兼容
- [x] 使用 CSS Modules 样式隔离
- [x] 仅提交相关文件

## 提交信息

- 提交 SHA: 018453d
- 提交消息: feat(card): add gameVersion prop for PvZ 2 support
- 变更文件: src/components/Card.jsx, src/components/Card.module.css
