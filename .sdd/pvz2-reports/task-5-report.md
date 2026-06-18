# Task 5 Report: 收集 PvZ 2 植物数据

## 实现概述

使用 MediaWiki API 从 PvZ Wiki (plantsvszombies.fandom.com) 收集了全部 213 种 PvZ 2 国际版植物数据。

## 数据收集方法

1. **获取植物列表**: 从 `Plants_(PvZ2)` 页面解析 `{{PvZ2 Plants Resume}}` 模板，提取 213 种植物的基础信息（名称、阳光、冷却、描述、能量豆效果、价格、世界归属）

2. **获取详细数据**: 并行访问每种植物的独立页面（如 `Peashooter_(PvZ2)`），解析 `{{Infobox Plant/2}}` 模板，提取：
   - 生命值 (Toughness)
   - 伤害值 (Damage/Attack Damage)
   - 攻击范围 (Range/Area)
   - 植物家族 (Family)
   - 代号 (CodeName)

3. **中文名称映射**: 由于中文 PvZ Wiki 无法访问（返回 403），使用广泛接受的 PvZ 2 中文翻译手动映射

## 验证结果

- **植物总数**: 213（符合预期 200+）
- **有伤害数据**: 136/213（64%）
- **有生命值数据**: 156/213（73%）
- **有范围数据**: 104/213（49%）
- **有家族数据**: 211/213（99%）
- **有中文名称**: 211/213（99%）
- **语法检查**: 通过

## 分类分布

- 射手类 (shooter): 75
- 辅助类 (support): 71
- 爆炸类 (explosive): 41
- 防御类 (defensive): 26

## 世界分布

- modern_day: 141（包含 Player's House 和 Premium）
- power_mints: 14
- pirate_seas: 8
- wild_west: 7
- far_future: 7
- ancient_egypt: 6
- neon_mixtape_tour: 6
- frostbite_caves: 5
- lost_city: 5
- dark_ages: 5
- jurassic_marsh: 5
- big_wave_beach: 4

## 文件变更

- 创建: `src/data/pvz2/plants.js`（4067 行，133KB）

## 自审发现

### 完成度
- ✅ 使用 MediaWiki API 获取数据
- ✅ 植物数组有 213 个条目（>200）
- ✅ 每个条目包含所有必需字段
- ✅ plantCategories 和 sunCostRanges 已导出

### 质量
- ✅ 中文名称正确（211/213 有映射）
- ✅ 世界 ID 有效
- ✅ 分类合理

### 遗留问题
1. **部分植物缺少伤害/生命值数据**: 约 36% 的植物缺少伤害值，27% 缺少生命值。这是因为 Wiki 页面的 infobox 格式不一致，部分植物使用不同的字段名或没有这些数据
2. **2 个植物缺少中文名称**: "SeaFlora" 和 "MayBee"（这些是较新的植物，中文翻译尚未广泛确定）
3. **范围字段未完全翻译为中文**: 部分范围值（如 "Lobbed", "Tile"）保留英文，因为这些是游戏术语
4. **能量豆效果为英文**: 由于中文 Wiki 无法访问，plantFoodEffect 保留英文描述

## 提交信息

```
feat(data): add PvZ 2 plant data (213 plants)
Commit: 823b70a
```
