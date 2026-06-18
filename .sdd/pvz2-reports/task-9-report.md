# Task 9 Report: 收集 PvZ 2 僵尸数据

## 状态: DONE

## 实施内容

### 数据收集方法
- 使用 MediaWiki API 从 PvZ Wiki (plantsvszombies.fandom.com) 获取 PvZ 2 僵尸数据
- 主要数据源: `Zombies_(PvZ2)` 页面的表格数据
- 补充数据源: 各僵尸独立页面的 infobox 数据
- 使用 `categorymembers` API 获取完整僵尸列表 (Category:Plants_vs._Zombies_2_zombies)

### 数据处理流程
1. 从 Wiki 分类获取 134 个 PvZ 2 僵尸页面
2. 批量获取僵尸页面的 wikitext 内容
3. 解析主僵尸列表页面的表格数据 (按世界分组)
4. 提取僵尸属性: 名称、生命值、速度、首次出现、特殊能力
5. 添加中文翻译 (185 个僵尸使用广泛接受的 PvZ 2 翻译)
6. 去重并合并数据，最终生成 189 个僵尸条目

### 僵尸数量验证
- **总计: 189 个僵尸** (超过要求的 100+ 个)
- 所有僵尸都包含必需字段

## 数据统计

### 按分类统计
| 分类 | 数量 |
|------|------|
| special (特殊类) | 129 |
| basic (基础类) | 25 |
| cone (路障类) | 18 |
| bucket (铁桶类) | 17 |

### 按世界统计
| 世界 | 数量 |
|------|------|
| modern_day (现代) | 64 |
| ancient_egypt (古埃及) | 14 |
| pirate_seas (海盗) | 13 |
| wild_west (狂野西部) | 13 |
| lost_city (失落之城) | 13 |
| far_future (遥远未来) | 13 |
| neon_mixtape_tour (霓虹混音) | 13 |
| big_wave_beach (巨浪海滩) | 13 |
| frostbite_caves (冰霜洞穴) | 12 |
| dark_ages (黑暗时代) | 11 |
| jurassic_marsh (侏罗纪沼泽) | 10 |

### 速度分布
| 速度 | 数量 |
|------|------|
| slow (慢速) | 132 |
| medium (中速) | 48 |
| fast (快速) | 9 |

## 示例条目

```javascript
{
  id: "basic_zombie",
  name: "普通僵尸",
  nameEn: "Basic Zombie",
  health: 190,
  speed: "slow",
  damage: 100,
  category: "basic",
  world: "modern_day",
  firstAppearance: "Day 1",
  weakness: null,
  special: null,
  description: null,
  image: "/images/pvz2/zombies/basic_zombie.png"
}
```

## 文件变更

### 新增文件
- `src/data/pvz2/zombies.js` - PvZ 2 僵尸数据文件 (2848 行)

### Git 提交
- `b7bce8f` feat(data): add PvZ 2 zombie data (189 zombies)

## 自检结果

### 完整性 ✓
- [x] 使用 MediaWiki API 获取数据
- [x] 僵尸数组有 189 个条目 (超过 100+ 要求)
- [x] 每个条目包含所有必需字段 (id, name, nameEn, health, speed, damage, category, world, firstAppearance, weakness, special, description, image)
- [x] zombieCategories 已导出

### 质量 ✓
- [x] 中文名称正确 (使用广泛接受的 PvZ 2 翻译)
- [x] 世界 ID 有效 (使用 plants.js 中相同的 ID 格式)
- [x] 分类正确 (basic/cone/bucket/special)
- [x] 速度值正确 (slow/medium/fast)

### 规范 ✓
- [x] 使用 MediaWiki API (非手动输入)
- [x] 仅提交数据文件

## 注意事项

1. **部分僵尸首次出现关卡未知**: 55 个僵尸的 firstAppearance 字段为 null，这些主要是特殊僵尸、Boss 僵尸或后期添加的僵尸
2. **部分僵尸缺少弱点和描述**: 弱点和描述字段对部分僵尸为 null
3. **世界变体**: 许多僵尸有世界特定的变体 (如 Mummy Zombie, Pirate Zombie 等)，这些作为独立条目保留
4. **damage 字段**: 大部分僵尸的 damage 为 100 (默认值)，因为 Wiki 表格中未单独列出每个僵尸的伤害值

## 后续建议

如果需要更完整的数据 (弱点、描述等)，可以:
1. 逐个获取僵尸独立页面的详细 infobox 数据
2. 使用 PvZ 2 中文 Wiki 补充中文描述
