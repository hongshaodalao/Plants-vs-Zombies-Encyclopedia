# Task 10: 下载 PvZ 2 僵尸图片

**Files:**
- Create: `public/images/pvz2/zombies/*.png`

## 任务目标

从 PvZ Wiki CDN 下载全部 PvZ 2 僵尸图片（189 张）。

## Step 1: 创建图片下载脚本

参考 Task 6 的下载方法，创建 PvZ 2 僵尸图片下载脚本。

使用 MediaWiki API 获取图片 URL，然后下载到 `public/images/pvz2/zombies/` 目录。

## Step 2: 执行下载

运行脚本下载全部 PvZ 2 僵尸图片。

预期：189 张 PNG 图片。

## Step 3: 验证

```bash
ls public/images/pvz2/zombies/*.png | wc -l
```

预期：与僵尸数量一致（189）。

## Step 4: 提交

```bash
git add public/images/pvz2/zombies/
git commit -m "feat(assets): download PvZ 2 zombie images"
```

## 重要约束

- 使用 MediaWiki API 获取图片 URL
- 图片保存为 PNG 格式
- 文件名与数据中的 id 字段一致
- 下载失败的图片记录在报告中，但不阻塞任务
- 创建目录：`mkdir -p public/images/pvz2/zombies`
