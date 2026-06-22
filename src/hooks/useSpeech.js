import { useState, useCallback } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text) => {
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
    window.responsiveVoice.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
