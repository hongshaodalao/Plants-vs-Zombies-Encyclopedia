# Task 8: 测试与文档更新

**Files:**
- Modify: `README.md`

## 任务目标

测试所有功能，更新 README 文档，确认生产构建成功。

## Step 1: 测试所有功能

在浏览器中测试：
- PvZ 2 植物列表：中国版植物显示"中国版"标签
- PvZ 2 僵尸列表：中国版僵尸显示"中国版"标签
- PvZ 2 世界列表：中国版世界正常显示
- 来源筛选：勾选"中国版"只显示中国版内容
- 详情页：中国版内容显示"🇨🇳 中国版独占"
- 搜索功能：中国版内容可被搜索到

## Step 2: 更新 README.md

在 README 中添加中国版内容说明：

```markdown
### PvZ 2 中国版（2014 年）
- 🌿 中国版独占植物：X 种
- 🧟 中国版独占僵尸：X 种
- 🌍 中国版独占世界：X 个
```

将 X 替换为实际数量。

## Step 3: 运行生产构建

```bash
npm run build
```

确认构建成功。

## Step 4: 提交

```bash
git add README.md
git commit -m "docs: update README with PvZ 2 China version content"
```

## 重要约束

- 测试所有功能
- 更新 README 文档
- 确认生产构建成功
- 不修改代码文件
