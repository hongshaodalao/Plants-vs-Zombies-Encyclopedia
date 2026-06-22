#!/usr/bin/env python3
"""
翻译僵尸描述
从 JSON 文件读取僵尸数据，翻译描述，更新 JS 文件
"""
import json
import re

# 读取僵尸数据
with open('scripts/zombies-data.json', 'r', encoding='utf-8') as f:
    zombies = json.load(f)

# 筛选有描述的僵尸
with_desc = [z for z in zombies if z.get('description')]

print(f"共 {len(zombies)} 个僵尸，{len(with_desc)} 个有描述")

# 创建翻译映射
# 这里需要手动翻译或使用翻译 API
# 由于没有翻译 API，我们先创建一个示例翻译映射

translations = {
    "basic_zombie": "普通僵尸及其世界变体是僵尸单位中最基础的类型。它们没有特殊的防御装备或移动能力，容易受到任何类型的攻击，并且移动速度较慢。它们出现在大多数关卡中，是玩家遇到的第一种僵尸。",
    "conehead_zombie": "路障僵尸及其世界变体是头上戴着路障作为保护的僵尸。虽然它们相对容易击败，但比旗帜僵尸和普通僵尸稍微难杀一些。它们拥有正常的生命值，但只能被直接攻击。",
    "buckethead_zombie": "铁桶僵尸及其世界变体是头上戴着铁桶的普通僵尸，使它们极其坚韧。",
    "brickhead_zombie": "砖头僵尸及其世界变体在植物大战僵尸2中是头上戴着盔甲的普通僵尸，大大增加了它们的坚韧度。",
    "rally_zombie": "集结僵尸及其世界变体在植物大战僵尸2中是旗帜僵尸的加强版本。与旗帜僵尸类似，它标志着大波僵尸的到来；然而，它移动更快，啃食更快，生命值也更高。",
    # ... 更多翻译需要添加
}

# 输出翻译映射
print("\n=== 翻译映射 ===")
print("请将以下翻译添加到 translations 字典中:\n")

for z in with_desc[:20]:  # 只显示前20个
    print(f'    "{z["id"]}": "翻译内容",  # {z["nameEn"]}')

print("\n... 共需要翻译", len(with_desc), "个描述")
