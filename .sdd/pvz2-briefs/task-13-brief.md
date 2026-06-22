# Task 13: 下载世界图片

**Files:**
- Create: `public/images/pvz2/worlds/*.png`

## 任务目标

从 PvZ Wiki 下载 11 个世界的代表图片。

## Step 1: 下载世界图片

从 PvZ Wiki 下载 11 个世界的代表图片。

世界列表：
- ancient_egypt（神秘埃及）
- pirate_seas（海盗港湾）
- wild_west（狂野西部）
- far_future（未来世界）
- dark_ages（黑暗时代）
- big_wave_beach（巨浪沙滩）
- frostbite_caves（冰霜洞穴）
- lost_city（失落之城）
- neon_mixtape_tour（霓虹混音之旅）
- jurassic_marsh（侏罗纪沼泽）
- modern_day（现代时代）

## Step 2: 验证

```bash
ls public/images/pvz2/worlds/*.png | wc -l
```

预期：11 张图片。

## Step 3: 提交

```bash
git add public/images/pvz2/worlds/
git commit -m "feat(assets): download PvZ 2 world images"
```

## 重要约束

- 创建目录：`mkdir -p public/images/pvz2/worlds`
- 文件名与世界 ID 一致（如 ancient_egypt.png）
- 使用 MediaWiki API 获取图片 URL
- 下载失败的图片记录在报告中，但不阻塞任务
