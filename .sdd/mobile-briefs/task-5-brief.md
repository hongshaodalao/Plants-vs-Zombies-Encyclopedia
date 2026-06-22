# Task 5: 测试与优化

**Files:**
- Modify: `README.md`（更新文档）

## Step 1: 测试所有页面在不同设备上的显示

在浏览器开发者工具中测试以下页面：
- 首页（/）
- PvZ 1 植物列表（/plants）
- PvZ 1 僵尸列表（/zombies）
- PvZ 2 植物列表（/pvz2/plants）
- PvZ 2 僵尸列表（/pvz2/zombies）
- 世界列表（/pvz2/worlds）
- 详情页（/plants/:id、/pvz2/plants/:id）

测试宽度：
- 375px（iPhone SE）
- 390px（iPhone 14）
- 440px（iPhone 16 Pro Max）
- 768px（iPad）
- 1024px（iPad Pro）

## Step 2: 修复发现的问题

如果发现布局问题，修复相应的 CSS。

## Step 3: 更新 README.md

在 README 中添加移动端适配说明：

```markdown
## 移动端适配

网站支持以下设备：
- 手机：375px - 440px（iPhone SE 到 iPhone 16 Pro Max）
- 平板：768px - 1024px（iPad、iPad Pro）
- 桌面：> 1024px（PC、笔记本）
```

## Step 4: 运行生产构建

```bash
npm run build
```

确认构建成功。

## Step 5: 提交

```bash
git add README.md
git commit -m "docs: update README with mobile adaptation info"
```

## 重要约束

- 测试所有页面在不同宽度下的显示
- 修复发现的问题
- 更新 README 文档
- 确认生产构建成功
