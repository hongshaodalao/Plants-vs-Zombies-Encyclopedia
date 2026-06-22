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
    utterance.rate = 0.85    // 更慢一点，更自然
    utterance.pitch = 1.2    // 稍高音调，更活泼
    utterance.volume = 1.0   // 最大音量

    // 优先选择高质量中文语音
    const preferredVoice = voices.find(v =>
      v.lang.startsWith('zh') &&
      (v.name.includes('Ting') ||
       v.name.includes('Tian') ||
       v.name.includes('Google') ||
       v.name.includes('Microsoft') ||
       v.name.includes('Xiaoxiao') ||
       v.name.includes('Xiaoyi'))
    )
    const fallbackVoice = voices.find(v => v.lang.startsWith('zh'))
    const chineseVoice = preferredVoice || fallbackVoice

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
