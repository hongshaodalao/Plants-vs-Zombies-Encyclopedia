# Task 13 Report: 下载世界图片

## 实施摘要

成功下载全部 11 张 PvZ 2 世界图片，格式为 PNG，保存至 `public/images/pvz2/worlds/`。

## 下载方法

- 使用 MediaWiki API 查询 PvZ Wiki 获取图片 URL
- 命名规则：wiki 文件名为 `{World Name}2C.png`（如 `Ancient Egypt2C.png`）
- 使用 `?format=original` 参数绕过 Fandom CDN 的自动 WebP 转换，确保获取原始 PNG 格式
- 下载命令使用 Node.js https 模块，设置 User-Agent 头避免被拦截

## 世界图片文件名映射

| 世界 ID | Wiki 文件名 |
|---------|-------------|
| ancient_egypt | Ancient Egypt2C.png |
| pirate_seas | Pirate Seas.png |
| wild_west | Wild West2C.png |
| far_future | Far Future2C.png |
| dark_ages | Dark Ages2C.png |
| big_wave_beach | Big Wave Beach.png |
| frostbite_caves | Frostbite Caves.png |
| lost_city | Lost City2C.png |
| neon_mixtape_tour | Neon Mixtape Tour.png |
| jurassic_marsh | Jurassic Marsh2C.png |
| modern_day | Modern Day.png |

## 结果统计

| 指标 | 数量 |
|------|------|
| 总世界数 | 11 |
| 成功下载 | 11 |
| 跳过 | 0 |
| 失败 | 0 |

## 验证结果

- 文件数量：11 个 PNG 文件
- 文件格式：全部为 PNG image data, 94x94 或更大尺寸
- 最小文件大小：19KB（远超 500 字节阈值）
- 所有文件均为有效 PNG 格式（非 HTML 错误页面）

## 文件大小

```
ancient_egypt.png: 21KB
big_wave_beach.png: 207KB
dark_ages.png: 19KB
far_future.png: 21KB
frostbite_caves.png: 205KB
jurassic_marsh.png: 19KB
lost_city.png: 20KB
modern_day.png: 208KB
neon_mixtape_tour.png: 1012KB
pirate_seas.png: 2.8MB
wild_west.png: 23KB
```

## 文件变更

- 新增：`public/images/pvz2/worlds/*.png`（11 个文件）

## 自检结果

- [x] 下载了全部 11 个世界的图片
- [x] 图片保存至 `public/images/pvz2/worlds/`
- [x] 文件名与数据中的 id 字段一致
- [x] 所有图片为有效 PNG 格式
- [x] 文件大小均 > 500 字节
- [x] 使用 MediaWiki API 获取 URL
- [x] 仅提交图片文件

## 提交信息

```
feat(assets): download PvZ 2 world images
Commit: 76ab518
```
