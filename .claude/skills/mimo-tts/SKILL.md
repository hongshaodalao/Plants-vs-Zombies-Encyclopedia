---
name: mimo-tts
description: "使用 mimo-v2.5-tts 模型生成高质量中文语音音频"
---

# Mimo TTS 音频生成

使用 mimo-v2.5-tts 模型为植物大战僵尸百科生成语音音频。

## 配置

在下方填写你的 API 配置：

- **API Key**: `tp-coxo7meysqhvkqh03fona1z9zpjrxjv0za69x9f9mq8y5zdj`
- **Base URL**: `https://token-plan-cn.xiaomimimo.com/v1`

## 前置条件

1. 安装依赖：`pip install openai`

## 使用方式

### 生成单个音频

```bash
python scripts/mimo-tts.py --text "豌豆射手。向僵尸发射豌豆。" --output public/audio/peashooter.mp3
```

### 指定音色

```bash
python scripts/mimo-tts.py --text "普通僵尸" --tone "低沉沙哑的成年男性" --output public/audio/zombie.mp3
```

### 批量生成

```bash
python scripts/mimo-tts.py --list plants   # 所有植物
python scripts/mimo-tts.py --list zombies  # 所有僵尸
```

## 参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--text`, `-t` | 要转换的文本 | 无 |
| `--tone` | 音色描述 | 温柔亲切的年轻女性 |
| `--output`, `-o` | 输出文件路径 | output.wav |
| `--format`, `-f` | 音频格式 (wav/mp3) | wav |
| `--list`, `-l` | 批量生成 (plants/zombies) | 无 |

## 音色建议

- 植物：温柔亲切的年轻女性
- 普通僵尸：低沉沙哑的成年男性
- 小鬼僵尸：活泼可爱的小男孩
- 巨人僵尸：低沉浑厚的壮年男性

## Arguments

- `/mimo-tts` — 显示帮助信息
- `/mimo-tts "文本"` — 生成指定文本的音频
- `/mimo-tts plants` — 批量生成所有植物音频
- `/mimo-tts zombies` — 批量生成所有僵尸音频
