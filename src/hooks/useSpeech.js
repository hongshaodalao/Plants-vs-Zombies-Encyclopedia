import { useState, useCallback, useRef } from 'react'
import { getImagePath } from '../utils/imagePath.js'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef(null)

  const speak = useCallback((audioPath) => {
    // 停止当前播放
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // 使用 getImagePath 处理 base URL
    const src = getImagePath(`audio/${audioPath}.mp3`)
    const audio = new Audio(src)
    audioRef.current = audio

    audio.onplay = () => setIsSpeaking(true)
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      console.warn(`音频文件 ${src} 未找到`)
      setIsSpeaking(false)
      audioRef.current = null
    }

    audio.play().catch(() => {
      console.warn('音频播放失败')
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
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
