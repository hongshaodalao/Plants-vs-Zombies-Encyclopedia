# Task 3 Report: 更新 Pvz2DetailView 添加朗读按钮

## 实现内容

在 PvZ 2 详情页（Pvz2DetailView）标题旁添加了朗读按钮，与 PvZ 1 详情页（Task 2）实现一致。

### 具体变更

**Pvz2DetailView.jsx:**
- 添加 `import { useSpeech } from '../hooks/useSpeech.js'`
- 在组件内调用 `const { speak, stop, isSpeaking } = useSpeech()`
- 将原来的 `<h1>` 标题替换为包含标题和朗读按钮的 flex 容器
- 按钮显示 "🔊 朗读" / "⏹ 停止"，朗读内容为 `{data.name}。{data.description}`

**Pvz2DetailView.module.css:**
- 添加 `.speechBtn` 样式（按钮外观、悬停放大效果）
- 添加 `.speaking` 样式（朗读时背景变色 + 脉冲动画）
- 添加 `@keyframes pulse` 动画定义

## 验证结果

- 项目构建（`vite build`）成功，无编译错误
- 仅修改了 2 个目标文件，未触及其他组件或数据文件

## 自检清单

- [x] useSpeech import 已添加
- [x] useSpeech Hook 调用已添加
- [x] 朗读按钮已添加在标题旁
- [x] CSS 样式已添加
- [x] 按钮未朗读时显示 "🔊 朗读"
- [x] 按钮朗读中显示 "⏹ 停止"
- [x] 朗读中按钮变色（zombie color）
- [x] 点击触发朗读/停止
- [x] 仅修改 Pvz2DetailView.jsx 和 Pvz2DetailView.module.css

## 提交信息

- SHA: `8fba633`
- 消息: `feat(speech): add speech button to PvZ 2 detail view`

## 问题

无。
