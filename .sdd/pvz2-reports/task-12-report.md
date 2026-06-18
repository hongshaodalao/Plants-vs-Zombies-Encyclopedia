# Task 12 Report: 收集 PvZ 2 世界数据

## Status: DONE

## 实施内容

创建了 `src/data/pvz2/worlds.js`，包含 PvZ 2 国际版全部 11 个世界的数据。

## 世界列表

| # | ID | 中文名 | 关卡数 | 特殊机制 |
|---|-----|--------|--------|----------|
| 1 | ancient_egypt | 神秘埃及 | 35 | 沙尘暴和墓碑 |
| 2 | pirate_seas | 海盗港湾 | 35 | 木板桥和水域 |
| 3 | wild_west | 狂野西部 | 35 | 矿车轨道 |
| 4 | far_future | 未来世界 | 35 | 能量瓷砖 |
| 5 | dark_ages | 黑暗时代 | 20 | 夜晚关卡和墓碑 |
| 6 | big_wave_beach | 巨浪沙滩 | 32 | 水位线变化 |
| 7 | frostbite_caves | 冰霜洞穴 | 30 | 冰冻和解冻机制 |
| 8 | lost_city | 失落之城 | 32 | 金砖和阳光陷阱 |
| 9 | neon_mixtape_tour | 霓虹混音之旅 | 32 | 音乐风格切换 |
| 10 | jurassic_marsh | 侏罗纪沼泽 | 42 | 恐龙冲击 |
| 11 | modern_day | 现代时代 | 45 | 混合世界僵尸和暗影机制 |

## 验证结果

- 世界数量: 11 (通过)
- 植物 ID 有效性: 全部有效 (通过)
- 僵尸 ID 有效性: 全部有效 (通过)
- 跨世界植物 ID 重复: 无 (通过)
- 跨世界僵尸 ID 重复: 无 (通过)
- 未分配世界的植物 (排除 power_mints): 0 (通过)
- 未分配世界的僵尸: 0 (通过)

## 数据统计

- 总植物 ID (跨世界): 199
- 总僵尸 ID (跨世界): 189
- 源文件植物总数: 213 (14 个属于 power_mints 分类，非可玩世界)
- 源文件僵尸总数: 189

## 数据来源

基于项目中已有的 `src/data/pvz2/plants.js` 和 `src/data/pvz2/zombies.js` 中的 `world` 字段提取植物和僵尸归属。世界信息（中文名、描述、关卡数、特殊机制）基于 PvZ 2 国际版已知数据。

## 文件变更

- 新增: `src/data/pvz2/worlds.js`

## 提交

- SHA: 02b7e38
- Subject: feat(data): add PvZ 2 world data (11 worlds)

## 自审结果

- 所有 11 个世界均有完整的 id、name、nameEn、description、unlockCondition、plantIds、zombieIds、levels、specialMechanic、image 字段
- plantIds 和 zombieIds 全部与现有数据 ID 匹配
- 中文名称和描述正确
- 世界 ID 使用 snake_case 格式
- image 字段使用 `/images/pvz2/worlds/<id>.png` 格式
- 无遗漏问题
