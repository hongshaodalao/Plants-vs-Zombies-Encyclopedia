---
name: mimo-tts
description: "使用 mimo-v2.5-tts 模型生成高质量中文语音音频"
---

# Mimo TTS 音频生成

使用 mimo-v2.5-tts 模型为植物大战僵尸百科生成语音音频。

## 使用方法

```bash
# 单个文本生成
python scripts/mimo-tts.py --text "豌豆射手，一株植物，怎么能如此快地生长并发射这么多豌豆呢？" --output public/audio/test.mp3 --format mp3

# 指定音色
python scripts/mimo-tts.py --text "普通僵尸" --tone "低沉沙哑的成年男性" --output public/audio/zombie.mp3

# 批量生成 PvZ1 音频
python scripts/batch-pvz1.py

# 批量生成 PvZ2 音频
python scripts/batch-pvz2.py
```

## 配置

**API Key**: `tp-ceywunkeciyfo960c955i9edn4rfoj70bqaqcpfeg7tcn92i`

**Base URL**: `https://token-plan-cn.xiaomimimo.com/v1`

## 音色选项

- 温柔亲切的年轻女性（默认，用于植物）
- 低沉沙哑的成年男性（用于僵尸）
- 五岁男孩，正常普通话

## 音频格式

- MP3: 适合网页播放
- WAV: 高质量，文件较大
