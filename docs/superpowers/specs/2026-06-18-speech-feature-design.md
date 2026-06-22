# 语音朗读功能 - 设计文档

## 1. 项目概述

### 1.1 项目目标

为植物大战僵尸百科全书的详情页添加语音朗读功能，让看不懂文字的小孩也能了解植物和僵尸的介绍。

### 1.2 功能范围

- 朗读内容：名称 + 描述文字
- 交互方式：手动点击朗读按钮
- 按钮位置：详情页标题旁
- 语音语言：自动选择中文语音

---

## 2. 技术架构

### 2.1 技术方案

使用浏览器内置的 `SpeechSynthesis` API：
- `speechSynthesis.speak(utterance)` — 开始朗读
- `speechSynthesis.cancel()` — 停止朗读
- `SpeechSynthesisUtterance` — 创建语音对象
- `speechSynthesis.getVoices()` — 获取可用语音列表

### 2.2 自定义 Hook

创建 `src/hooks/useSpeech.js`：

```javascript
import { useState, useEffect } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices())
    }
    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const speak = (text) => {
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.9
    utterance.pitch = 1.0

    const chineseVoice = voices.find(v => v.lang.startsWith('zh'))
    if (chineseVoice) utterance.voice = chineseVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const stop = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return { speak, stop, isSpeaking }
}
```

---

## 3. UI 设计

### 3.1 朗读按钮位置

在详情页标题旁添加朗读按钮：

```
┌─────────────────────────────────────────────────┐
│  ← 返回图鉴                                     │
│                                                 │
│  豌豆射手                    [🔊 朗读]          │
│  Peashooter                                     │
│                                                 │
│  一株植物，怎么能如此快地生长并发射这么多豌豆呢？  │
└─────────────────────────────────────────────────┘
```

### 3.2 按钮状态

- **默认状态**：🔊 朗读（黄色背景）
- **朗读中**：⏹ 停止（红色背景，带脉冲动画）
- **悬停效果**：放大 1.05 倍

### 3.3 按钮样式

```css
.speechBtn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-sun);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: var(--transition);
  font-weight: bold;
}

.speechBtn:hover {
  transform: scale(1.05);
}

.speaking {
  background: var(--color-zombie);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## 4. 实现计划

### 4.1 需要创建的文件

| 文件 | 用途 |
|------|------|
| `src/hooks/useSpeech.js` | 语音合成自定义 Hook |

### 4.2 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `src/components/DetailView.jsx` | 添加朗读按钮 |
| `src/components/DetailView.module.css` | 添加按钮样式 |
| `src/components/Pvz2DetailView.jsx` | 添加朗读按钮 |
| `src/components/Pvz2DetailView.module.css` | 添加按钮样式 |

### 4.3 朗读内容

- **朗读文本**：`{data.name}。{data.description}`
- **语速**：0.9（稍慢，适合小孩）
- **语言**：zh-CN（中文）

---

## 5. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|---------|
| Chrome | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Safari | ✅ 完全支持 |
| Edge | ✅ 完全支持 |
| 移动端 Chrome | ✅ 支持 |
| 移动端 Safari | ✅ 支持 |

> 注：SpeechSynthesis API 在现代浏览器中支持良好，无需 polyfill。

---

## 6. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 浏览器无中文语音 | 朗读为英文 | 自动选择中文语音，无则使用默认语音 |
| 语音合成失败 | 功能不可用 | 添加 onError 处理，静默失败 |
| 移动端兼容性 | 部分功能受限 | 测试主流移动端浏览器 |
