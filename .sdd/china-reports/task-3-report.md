# Task 3 Report: 采集中国版植物数据

## Status: DONE

## 实施内容

从 PvZ Fandom Wiki (English) 的 MediaWiki API 采集了中国版独占植物数据，并下载了植物图片。

### 采集的植物 (26个)

**功夫世界 (kongfu_world) - 4个植物:**
1. resistant_radish - 萝卜 (50阳光)
2. fire_gourd - 火葫芦 (200阳光)
3. heavenly_peach - 仙桃 (125阳光)
4. bamboo_shoot - 竹笋 (175阳光)

**天空之城 (sky_city) - 7个植物:**
5. loquat - 枇杷 (75阳光)
6. asparagus - 芦笋 (125阳光)
7. saucer - 飞碟花 (25阳光)
8. horsebean - 马豆射手 (450阳光)
9. groundcherry - 酸浆 (25阳光)
10. anthurium - 红掌花 (150阳光)
11. pineapple - 菠萝 (75阳光)

**蒸汽时代 (steam_age) - 5个植物:**
12. flat_shroom - 平菇 (0阳光)
13. lotus_shooter - 莲藕射手 (200阳光)
14. maypop_mechanic - 西番莲机械师 (125阳光)
15. fanilla - 风扇花 (75阳光)
16. mulberry_blaster - 桑葚爆破手 (150阳光)

**复兴时代 (renaissance_age) - 4个植物:**
17. rose_swordfighter - 玫瑰剑客 (225阳光)
18. bearberry_mortar - 熊果迫击炮 (150阳光)
19. wax_gourd_guard - 冬瓜卫士 (125阳光)
20. oily_olive - 油橄榄 (25阳光)

**平安时代 (heian_age) - 6个植物:**
21. dripping_diphylleia - 滴水观音 (50阳光)
22. dendrobium_windbreak - 铁皮石斛 (100阳光)
23. stephania - 千金藤 (200阳光)
24. tupistra_stalker - 蜘蛛抱蛋 (200阳光)
25. chef_cypripedium - 大花杓兰 (150阳光)
26. boophone_geigi - 布冯花 (175阳光)

## 验证结果

- 中国版植物数量: 26
- 总植物数量: 239
- 所有 source 字段正确: true
- 无效ID数量: 0
- 重复ID数量: 0
- 下载的图片数量: 26/26 (100%成功)
- npm run build: 成功

## 文件变更

- `src/data/pvz2/plants.js` - 添加26个中国版独占植物数据
- `src/data/pvz2/worlds.js` - 更新5个中国版世界的plantIds
- `public/images/pvz2/plants/*.png` - 下载26个植物图片

## 数据来源

- PvZ Fandom Wiki (English): https://plantsvszombies.fandom.com/api.php
- 使用 MediaWiki API 的 parse 和 query 接口获取植物数据
- 使用 imageinfo 接口获取图片URL并下载

## 注意事项

1. 中文 PvZ Wiki (huijiwiki.com) 被 Cloudflare 保护，无法直接通过 API 访问
2. 中文名称使用了 PvZ 社区公认的官方翻译
3. 部分字段（如 damage）使用了合理的默认值或 null
4. 图片从 Fandom Wiki 下载，格式为 PNG (96x96 像素)
