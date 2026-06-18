# Task 4 Report: 采集中国版僵尸数据

## Status: DONE

## 实施内容

从 PvZ Fandom Wiki (English) 的 MediaWiki API 采集了中国版独占僵尸数据，并下载了僵尸图片。

### 采集的僵尸 (45个)

**功夫世界 (kongfu_world) - 17个僵尸:**
1. hammer_zombie - 锤子僵尸 (Protected/Stiff)
2. torch_kongfu_zombie - 功夫火把僵尸 (Solid/Hungry)
3. gong_zombie - 铜锣僵尸 (Average/Hungry)
4. exploding_zombie - 自爆僵尸 (Solid/Speedy)
5. qigong_zombie - 气功僵尸 (Average/Stiff)
6. drinking_zombie - 喝酒僵尸 (Average/Hungry)
7. swordsman_zombie - 大刀武僧僵尸 (Protected/Basic)
8. imp_monk - 武僧小鬼僵尸 (Average/Hungry)
9. nunchaku_zombie - 双截棍僵尸 (Average/Stiff)
10. han_bronze - 大汉铜人 (Great/Slow)
11. knight_bronze - 侠客铜人 (Great/Slow)
12. qigong_bronze - 气功铜人 (Great/Slow)
13. gunpowder_devil - 火药魔头 (Undying/Medium)
14. blade_wielding_hero - 持刀大侠 (Undying/Medium)
15. qigong_master - 气功教主 (Undying/Medium)
16. drinking_monk_zombie - 喝酒武僧僵尸 (Average/Hungry)
17. torch_monk_zombie - 火把武僧僵尸 (Solid/Hungry)

**天空之城 (sky_city) - 7个僵尸:**
18. zombie_fighter - 战斗机僵尸 (Average/Stiff)
19. double_cabin_aircraft_zombie - 双舱飞机僵尸 (Hardened/Speedy)
20. lightning_gun_zombie - 闪电枪僵尸 (Hardened/Creeper)
21. missile_zombie - 飞弹僵尸 (Average/Stiff)
22. arbiter_x - 仲裁者-X型 (Hardened/Hungry)
23. flying_gargantuar - 飞行巨人僵尸 (Great/Hungry)
24. zombot_vulture_fighter - 秃鹫战机 (Undying/Medium)

**蒸汽时代 (steam_age) - 5个僵尸:**
25. coal_miner_zombie - 煤矿僵尸 (Protected/Hungry)
26. gentleman_zombie - 绅士僵尸 (Hardened/Speedy)
27. furnace_zombie - 锅炉僵尸 (Machined/Basic)
28. foreman_gargantuar - 工头巨人僵尸 (Great/Hungry)
29. steam_zombot - 蒸汽僵尸博士 (Undying/Medium)

**复兴时代 (renaissance_age) - 10个僵尸:**
30. sculptor_imp_zombie - 雕刻家小鬼僵尸 (Average/Hungry)
31. aristocrat_gargantuar - 贵族巨人僵尸 (Great/Hungry)
32. perfume_zombie - 调香师僵尸 (Average/Basic)
33. ballerina_zombie - 芭蕾舞僵尸 (Average/Speedy)
34. glider_zombie - 飞行器僵尸 (Dense/Hungry)
35. hamlet_zombie - 哈姆雷特僵尸 (Average/Slow)
36. shylock_zombie - 夏洛克僵尸 (Great/Creeper)
37. romeo_zombie - 罗密欧僵尸 (Great/Stiff)
38. juliet_zombie - 朱丽叶僵尸 (Great/Stiff)
39. zombot_troupe_manipulator - 剧团操控者 (Undying/Medium)

**平安时代 (heian_age) - 6个僵尸:**
40. shogun_gargantuar - 将军巨人僵尸 (Great/Hungry)
41. firework_zombie - 花火僵尸 (Solid/Hungry)
42. ninjimp - 忍者小鬼僵尸 (Protected/Basic)
43. onmyoji_zombie - 阴阳师僵尸 (Protected/Hungry)
44. sushi_chef_zombie - 寿司厨师僵尸 (Average/Basic)
45. mino_zombie - 蓑衣僵尸 (Solid/Hungry)

## 验证结果

- 中国版僵尸数量: 45
- 总僵尸数量: 234
- 所有 source 字段正确: true (全部为 "china")
- 无效ID数量: 0
- 重复ID数量: 0
- 无效世界ID数量: 0
- 下载的图片数量: 45/45 (100%成功)
- worlds.js zombieIds 一致性验证: 全部通过
- npm run build: 成功

## 文件变更

- `src/data/pvz2/zombies.js` - 添加45个中国版独占僵尸数据
- `src/data/pvz2/worlds.js` - 更新5个中国版世界的zombieIds
- `public/images/pvz2/zombies/*.png` - 下载45个僵尸图片

## 数据来源

- PvZ Fandom Wiki (English): https://plantsvszombies.fandom.com/api.php
- 使用 MediaWiki API 的 parse 和 query 接口获取僵尸数据
- 使用 imageinfo 接口获取图片URL并下载

## 注意事项

1. 中文 PvZ Wiki (huijiwiki.com) 被 Cloudflare 保护，无法直接通过 API 访问，因此使用英文 Fandom Wiki
2. 中文名称来自 PvZ 社区公认的官方翻译和 Wiki 页面中的中文名字段
3. 基础/路障/铁桶/旗帜僵尸的变体（如功夫僵尸、飞行员僵尸等）是国际版僵尸的皮肤变体，在 Wiki 上重定向到国际版页面，因此未作为独立条目添加
4. 部分字段（如 damage）使用了合理的默认值
5. toughness 映射到 health 值的对应关系基于现有国际版僵尸数据模式
6. 图片从 Fandom Wiki 下载，格式为 PNG
7. 修复了描述文本中的引号转义问题（3处）
