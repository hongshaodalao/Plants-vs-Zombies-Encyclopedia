# Task 14: 下载真实图片资源

**Files:**
- Create/Update: `public/images/plants/*.png`
- Create/Update: `public/images/zombies/*.png`
- Modify: `src/data/plants.js`（将图片路径改回 `.png`）
- Modify: `src/data/zombies.js`（将图片路径改回 `.png`）

## 任务目标

本任务试图从 PvZ Wiki 等公开资源下载真实的游戏图片替换当前的 SVG 占位图。如果下载失败，**保留 SVG 占位图**不影响功能。

## Step 1: 尝试从 PvZ Wiki 获取图片 URL

**候选来源：**
- https://pvz.fandom.com/wiki/Peashooter
- https://pvz.fandom.com/wiki/Zombie
- 或其他公开 PvZ 资源站

**需要的图片（按数据 id 命名）：**

**植物**（8 个）：
- peashooter, sunflower, cherrybomb, wallnut, potatomine, snowpea, chomper, repeater

**僵尸**（8 个）：
- zombie, flagzombie, conezombie, bucketzombie, screendoor, football, digger, pogo

**下载方法：**
- 尝试使用 WebFetch 工具访问相关页面（若可用）
- 或使用浏览器/curl 下载
- 使用 `curl -L -o <file> <url>` 或类似命令

## Step 2: 保存图片到对应目录

将下载的图片按数据 `id` 命名（如 `peashooter.png`）保存到：
- `public/images/plants/`
- `public/images/zombies/`

## Step 3: 更新数据中的图片路径

**关键：只在本任务"下载到至少一张真实图片"时执行本步。**

如果下载到任何 PNG 图片，将 `src/data/plants.js` 和 `src/data/zombies.js` 中所有 `.svg` 改回 `.png`：

- 文件：`src/data/plants.js`，`old_string`: `.svg`，`new_string`: `.png`（`replace_all: true`）
- 文件：`src/data/zombies.js`，`old_string`: `.svg`，`new_string`: `.png`（`replace_all: true`）

如果**没有**下载到任何图片，**不要**修改数据文件（保持 `.svg` 路径），直接进入 Step 4。

## Step 4: 提交

```bash
git add public/images src/data
git commit -m "feat(assets): replace placeholder SVGs with real game images"
```

或（若下载失败）：

```bash
git commit --allow-empty -m "chore: skip real image download, keep SVG placeholders"
```

## 重要约束

- 这是**可选任务**：若网络访问受限或 Wiki 资源不可达，**直接跳过**，保留 SVG 占位
- 不允许下载其他未在 brief 列表中的图片
- 如果只下载到部分图片（如只有植物没有僵尸），将已下载的 PNG 改回 `.png`，未下载的保持 `.svg`
- 不要修改 `src/data/` 中除 `image` 字段之外的任何内容
- 提交信息根据成功/失败情况调整
- 在报告中清晰说明下载结果（多少张成功、什么来源、什么 URL）
