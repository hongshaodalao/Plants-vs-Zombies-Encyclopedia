# Task 6 Report: 下载 PvZ 2 植物图片

## 实施摘要

成功下载全部 213 张 PvZ 2 植物图片，格式为 PNG，保存至 `public/images/pvz2/plants/`。

## 下载方法

- 使用 MediaWiki API 查询 PvZ Wiki 获取图片 URL
- 命名规则：wiki 文件名为 `{nameEn}2.png`（如 `Peashooter2.png`）
- 使用 `?format=original` 参数绕过 Fandom CDN 的自动 WebP 转换，确保获取原始 PNG 格式
- 下载命令使用 curl，设置 User-Agent 头避免被拦截

## 结果统计

| 指标 | 数量 |
|------|------|
| 总植物数 | 213 |
| 成功下载 | 213 |
| 跳过 | 0 |
| 失败 | 0 |

## 验证结果

- 文件数量：213 个 PNG 文件
- 文件格式：全部为 PNG image data, 96x96, 8-bit/color RGBA
- 最小文件大小：7,369 字节（远超 500 字节阈值）
- 所有文件均为有效 PNG 格式（非 HTML 错误页面）

## 数据清理

发现 3 个植物 ID 包含 `<br>` HTML 标签（数据错误），已自动清理：
- `hollyknight<br>hollybarrierleaf<br>hollybarrierleafplantfood` -> `hollyknight`
- `dragonbruit<br>dragonbabybruit` -> `dragonbruit`
- `guardshroom<br>minishroom` -> `guardshroom`

这些植物的 wiki 图片已正确下载，文件名使用清理后的 ID。

## 文件变更

- 新增：`public/images/pvz2/plants/*.png`（213 个文件）

## 技术说明

Fandom CDN 默认将图片转换为 WebP 格式以优化性能。通过在 URL 后附加 `?format=original` 参数，可以强制 CDN 返回原始 PNG 格式。这是下载 PvZ 2 图片的关键发现。

## 自检结果

- [x] 下载了全部 213 个植物的图片
- [x] 图片保存至 `public/images/pvz2/plants/`
- [x] 文件名与数据中的 id 字段一致
- [x] 所有图片为有效 PNG 格式
- [x] 文件大小均 > 500 字节
- [x] 使用 MediaWiki API 获取 URL
- [x] 仅提交图片文件
