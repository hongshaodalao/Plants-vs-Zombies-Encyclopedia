# Task 1: 创建 useSpeech 自定义 Hook

**Files:**
- Create: `src/hooks/useSpeech.js`

## 任务目标

创建自定义 useSpeech Hook，封装浏览器 SpeechSynthesis API，提供语音朗读功能。

## Step 1: 创建 hooks 目录

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/hooks
```

## Step 2: 编写 `src/hooks/useSpeech.js`

```javascript
import { useState, useEffect, useCallback } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices())
    }
    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speak = useCallback((text) => {
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.9
    utterance.pitch = 1.0

    const chineseVoice = voices.find(v => v.lang.startsWith('zh'))
    if (chineseVoice) {
      utterance.voice = chineseVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }, [voices])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
```

## Step 3: 验证

运行 `npm run dev`（后台），确认 dev 服务器启动无错误。

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/hooks/useSpeech.js
git commit -m "feat(speech): add useSpeech custom hook for text-to-speech"
```

## 重要约束

- 只创建 `src/hooks/useSpeech.js` 文件
- 不修改其他文件
- Hook 导出 `useSpeech` 函数
- 返回 `{ speak, stop, isSpeaking }`
- speak 接受字符串参数
- 使用 useCallback 优化 speak 和 stop 函数
- 语速 0.9（适合小孩）
- 语言 zh-CN（中文）
