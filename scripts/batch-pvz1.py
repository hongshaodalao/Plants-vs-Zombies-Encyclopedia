#!/usr/bin/env python3
"""
批量生成 PvZ1 植物和僵尸音频
目录结构：
  public/audio/pvz1/plants/{id}.mp3
  public/audio/pvz1/zombies/{id}.mp3
"""
import os
import sys
import json
import subprocess
import importlib.util

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "pvz1")
AUDIO_DIR = os.path.join(BASE_DIR, "public", "audio", "pvz1")

# 加载 mimo-tts 模块（文件名含连字符，需用 importlib）
def load_mimo_tts():
    script = os.path.join(os.path.dirname(__file__), "mimo-tts.py")
    spec = importlib.util.spec_from_file_location("mimo_tts", script)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

mimo_tts = load_mimo_tts()

# 从 JS 文件提取数据
def extract_data(js_file, var_name):
    """用 Node.js 提取 JS 数据为 JSON"""
    # 使用正斜杠避免 Windows 路径转义问题
    safe_path = js_file.replace("\\", "/")
    node_script = (
        f"const fs=require('fs');"
        f"const content=fs.readFileSync('{safe_path}','utf8');"
        f"const match=content.match(/export const {var_name}\\s*=\\s*(\\[\\s*\\{{[\\s\\S]*?\\}}\\s*\\])/s);"
        f"if(match)process.stdout.write(match[1]);else process.exit(1);"
    )
    result = subprocess.run(["node", "-e", node_script], capture_output=True, text=True, cwd=BASE_DIR, encoding="utf-8")
    if result.returncode != 0:
        print(f"提取失败: {result.stderr}")
        return []
    return json.loads(result.stdout)

def build_text(item):
    """构建朗读文本：中文名+介绍"""
    return f"{item['name']}，{item['description']}"

def main():
    api_key, base_url = mimo_tts.get_config_from_skill()

    # 提取数据
    plants = extract_data(os.path.join(DATA_DIR, "plants.js"), "plants")
    zombies = extract_data(os.path.join(DATA_DIR, "zombies.js"), "zombies")

    print(f"PvZ1 数据：{len(plants)} 个植物，{len(zombies)} 个僵尸")

    # 构建项目列表
    items = []
    for p in plants:
        items.append({
            "id": p["id"],
            "text": build_text(p),
            "output": os.path.join(AUDIO_DIR, "plants", f"{p['id']}.mp3"),
            "tone": "温柔亲切的年轻女性",
            "category": "plants",
            "name": p["name"]
        })
    for z in zombies:
        items.append({
            "id": z["id"],
            "text": build_text(z),
            "output": os.path.join(AUDIO_DIR, "zombies", f"{z['id']}.mp3"),
            "tone": "温柔亲切的年轻女性",
            "category": "zombies",
            "name": z["name"]
        })

    # 跳过已生成的文件
    existing = [item for item in items if os.path.exists(item['output'])]
    if existing:
        print(f"已有 {len(existing)} 个文件，将跳过\n")

    # 执行批量生成
    total = len(items)
    success = 0
    failed = 0
    skipped = 0

    for i, item in enumerate(items, 1):
        print(f"\n[{i}/{total}] {item['name']} ({item['id']})")
        print(f"  分类: {item['category']} | 音色: {item['tone']}")

        # 确保输出目录存在
        os.makedirs(os.path.dirname(item['output']), exist_ok=True)

        # 检查文件是否已存在
        if os.path.exists(item['output']):
            print(f"  跳过（文件已存在）")
            skipped += 1
            continue

        try:
            mimo_tts.generate_audio(
                text=item['text'],
                tone=item['tone'],
                output_path=item['output'],
                audio_format="mp3",
                api_key=api_key,
                base_url=base_url
            )

            if os.path.exists(item['output']):
                size = os.path.getsize(item['output'])
                print(f"  完成: {size:,} 字节")
                success += 1
            else:
                print(f"  失败: 文件未生成")
                failed += 1
        except Exception as e:
            print(f"  失败: {e}")
            failed += 1

    # 输出结果
    print(f"\n{'='*50}")
    print(f"生成完成：成功 {success}，跳过 {skipped}，失败 {failed}，共 {total}")

if __name__ == "__main__":
    main()
