# Task 4: 测试与优化

**Files:**
- Modify: `README.md`

## 任务目标

测试语音朗读功能，更新 README 文档，确认生产构建成功。

## Step 1: 测试所有详情页的朗读功能

在浏览器中测试：
- PvZ 1 植物详情页（/plants/:id）— 朗读功能正常
- PvZ 1 僵尸详情页（/zombies/:id）— 朗读功能正常
- PvZ 2 植物详情页（/pvz2/plants/:id）— 朗读功能正常
- PvZ 2 僵尸详情页（/pvz2/zombies/:id）— 朗读功能正常
- 点击朗读后点击停止 — 朗读中断
- 连续点击朗读按钮 — 不会叠加播放

## Step 2: 更新 README.md

在 README 中添加语音朗读功能说明：

```markdown
### 语音朗读
- 🔊 支持中文语音朗读植物/僵尸介绍
- 基于浏览器内置 SpeechSynthesis API
- 自动选择中文语音，语速稍慢适合儿童
```

## Step 3: 运行生产构建

```bash
npm run build
```

确认构建成功。

## Step 4: 提交

```bash
git add README.md
git commit -m "docs: update README with speech feature info"
```

## 重要约束

- 测试所有详情页的朗读功能
- 更新 README 文档
- 确认生产构建成功
- 不修改代码文件
