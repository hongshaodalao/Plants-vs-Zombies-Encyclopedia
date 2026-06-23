#!/usr/bin/env python3
"""
下载 PvZ1 背景音乐

使用方法：
1. 将音乐文件放入 public/audio/pvz1/music/ 目录
2. 文件名格式：{id}.mp3（如 main-menu.mp3, day-stage.mp3）

音乐列表：
- main-menu.mp3     主菜单
- day-stage.mp3     白天关卡
- night-stage.mp3   夜晚关卡
- pool-stage.mp3    泳池关卡
- fog-stage.mp3     浓雾关卡
- roof-stage.mp3    屋顶关卡
- crazy-dave.mp3    疯狂戴夫
- zen-garden.mp3    禅境花园
- mini-game.mp3     小游戏
- final-boss.mp3    最终 Boss
- victory.mp3       胜利
- game-over.mp3     失败
"""
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUSIC_DIR = os.path.join(BASE_DIR, "public", "audio", "pvz1", "music")

REQUIRED_FILES = [
    "main-menu.mp3",
    "day-stage.mp3",
    "night-stage.mp3",
    "pool-stage.mp3",
    "fog-stage.mp3",
    "roof-stage.mp3",
    "crazy-dave.mp3",
    "zen-garden.mp3",
    "mini-game.mp3",
    "final-boss.mp3",
    "victory.mp3",
    "game-over.mp3"
]

def check_music_files():
    """检查音乐文件是否存在"""
    os.makedirs(MUSIC_DIR, exist_ok=True)

    print(f"音乐目录: {MUSIC_DIR}\n")
    print("检查音乐文件:")
    print("-" * 40)

    missing = []
    for filename in REQUIRED_FILES:
        filepath = os.path.join(MUSIC_DIR, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"[OK] {filename} ({size:,} bytes)")
        else:
            print(f"[--] {filename} (missing)")
            missing.append(filename)

    print("-" * 40)
    if missing:
        print(f"\nMissing {len(missing)} files:")
        for f in missing:
            print(f"  - {f}")
        print(f"\nPlease add music files to: {MUSIC_DIR}")
    else:
        print(f"\nAll {len(REQUIRED_FILES)} music files are ready!")

if __name__ == "__main__":
    check_music_files()
