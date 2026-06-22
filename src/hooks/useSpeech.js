import { useState, useCallback, useRef } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef(null)

  const speak = useCallback((id) => {
    // 停止当前播放
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // 尝试加载预录音频
    const audio = new Audio(`/audio/${id}.mp3`)
    audioRef.current = audio

    audio.onplay = () => setIsSpeaking(true)
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      console.warn(`音频文件 /audio/${id}.mp3 未找到，使用浏览器内置 TTS`)
      // 回退到浏览器原生 TTS
      const text = id // 简单回退，实际应传入文本
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
      setIsSpeaking(false)
      audioRef.current = null
    }

    audio.play().catch(() => {
      // 播放失败时回退到 TTS
      console.warn('音频播放失败，使用浏览器内置 TTS')
      setIsSpeaking(false)
      audioRef.current = null
    })
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
