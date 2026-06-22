#!/usr/bin/env python3
"""
更新僵尸描述为中文翻译
"""
import json
import re

# 读取翻译映射
with open('scripts/zombie-translations.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

# 读取僵尸数据文件
with open('src/data/pvz2/zombies.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 统计更新数量
updated = 0
not_found = []

# 对每个翻译进行替换
for zombie_id, translation in translations.items():
    # 使用正则表达式查找并替换描述
    # 匹配模式: id: "zombie_id", ... description: "..."
    pattern = rf'(id:\s*"{zombie_id}"[\s\S]*?description:\s*)"[^"]*"'

    # 使用 lambda 来避免 nonlocal 问题
    new_content = re.sub(
        pattern,
        lambda m, t=translation: f'{m.group(1)}"{t}"',
        content,
        count=1
    )

    if new_content != content:
        content = new_content
        updated += 1
    else:
        not_found.append(zombie_id)

# 写回文件
with open('src/data/pvz2/zombies.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"更新完成: {updated} 个描述已翻译")
if not_found:
    print(f"未找到: {len(not_found)} 个僵尸")
    for zid in not_found[:10]:
        print(f"  - {zid}")
