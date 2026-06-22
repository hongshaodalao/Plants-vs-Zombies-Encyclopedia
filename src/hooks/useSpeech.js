import { useState, useCallback } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text) => {
    if (!window.responsiveVoice) {
      console.warn('ResponsiveVoice.js 未加载，尝试使用浏览器内置 TTS')
      // 回退到浏览器原生 TTS
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
      return
    }

    // 停止当前播放
    window.responsiveVoice.cancel()

    window.responsiveVoice.speak(text, 'Chinese Female', {
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
      onstart: () => setIsSpeaking(true),
      onend: () => setIsSpeaking(false),
      onerror: () => setIsSpeaking(false)
    })
  }, [])

  const stop = useCallback(() => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel()
    } else {
      speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
