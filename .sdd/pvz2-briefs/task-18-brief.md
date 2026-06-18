# Task 18: 全功能测试与优化

**Files:**
- Modify: `README.md`（更新文档）

## 任务目标

全功能测试 PvZ 1 和 PvZ 2 功能，更新 README 文档。

## Step 1: 测试 PvZ 1 功能

访问以下路由，确认 PvZ 1 功能正常：
- `/` - 首页显示版本切换器
- `/plants` - PvZ 1 植物列表
- `/plants/:id` - PvZ 1 植物详情
- `/zombies` - PvZ 1 僵尸列表
- `/zombies/:id` - PvZ 1 僵尸详情

## Step 2: 测试 PvZ 2 功能

访问以下路由，确认 PvZ 2 功能正常：
- `/pvz2` - PvZ 2 首页
- `/pvz2/plants` - PvZ 2 植物列表
- `/pvz2/plants/:id` - PvZ 2 植物详情
- `/pvz2/zombies` - PvZ 2 僵尸列表
- `/pvz2/zombies/:id` - PvZ 2 僵尸详情
- `/pvz2/worlds` - 世界列表
- `/pvz2/worlds/:id` - 世界详情

## Step 3: 测试搜索筛选功能

确认搜索、筛选、排序功能在 PvZ 1 和 PvZ 2 都正常工作。

## Step 4: 测试响应式布局

在移动端视图下测试所有页面。

## Step 5: 更新 README.md

更新 README，添加 PvZ 2 相关说明。

## Step 6: 运行生产构建

```bash
npm run build
```

确认构建成功。

## Step 7: 提交

```bash
git add README.md
git commit -m "docs: update README with PvZ 2 content"
```

## 重要约束

- 测试所有路由（PvZ 1 + PvZ 2）
- 测试搜索、筛选、排序功能
- 测试响应式布局
- 更新 README 文档
- 确认生产构建成功
