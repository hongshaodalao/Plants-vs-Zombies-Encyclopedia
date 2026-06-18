# Task 10 Report: 下载 PvZ 2 僵尸图片

## 实施摘要

成功下载全部 189 张 PvZ 2 僵尸图片，格式为 PNG，保存至 `public/images/pvz2/zombies/`。

## 下载方法

- 使用 MediaWiki API 查询 PvZ Wiki 获取图片 URL
- 命名规则：wiki 文件名为 `{nameEn}2.png`（如 `Basic Zombie2.png`）
- 使用 `?format=original` 参数绕过 Fandom CDN 的自动 WebP 转换，确保获取原始 PNG 格式
- 下载命令使用 curl，设置 User-Agent 头避免被拦截

## 结果统计

| 指标 | 数量 |
|------|------|
| 总僵尸数 | 189 |
| 成功下载（脚本） | 187 |
| 手动修复 | 2 |
| 失败 | 0 |

## 手动修复

2 个僵尸的 wiki 文件名与默认模式不匹配（wiki 使用 "Pompadour" 前缀）：

| ID | 预期 wiki 文件名 | 实际 wiki 文件名 |
|------|------|------|
| conehead_pompadour | Conehead Pompadour2.png | Pompadour Conehead Zombie2.png |
| buckethead_pompadour | Buckethead Pompadour2.png | Pompadour Buckethead Zombie2.png |

已通过直接查询 API 找到正确文件名并手动下载。

## 验证结果

- 文件数量：189 个 PNG 文件
- 文件格式：全部为 PNG image data, 96x96, 8-bit/color RGBA
- 最小文件大小：15,904 字节（远超 500 字节阈值）
- 所有文件均为有效 PNG 格式（非 HTML 错误页面）
- 文件名与数据文件中的 id 字段完全匹配（189/189）

## 文件变更

- 新增：`public/images/pvz2/zombies/*.png`（189 个文件）

## 自检结果

- [x] 下载了全部 189 个僵尸的图片
- [x] 图片保存至 `public/images/pvz2/zombies/`
- [x] 文件名与数据中的 id 字段一致
- [x] 所有图片为有效 PNG 格式
- [x] 文件大小均 > 500 字节
- [x] 使用 MediaWiki API 获取 URL
- [x] 仅提交图片文件
