// src/pages/MusicList.jsx
import { useState, useRef, useEffect } from 'react'
import { music } from '../data/pvz1/music.js'
import { getImagePath } from '../utils/imagePath.js'
import styles from './MusicList.module.css'

function MusicList() {
  const [playingId, setPlayingId] = useState(null)
  const audioRef = useRef(null)

  // 组件卸载时停止播放
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handlePlay = (item) => {
    // 如果正在播放同一首，停止它
    if (playingId === item.id) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setPlayingId(null)
      return
    }

    // 停止当前播放
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // 播放新音乐
    const audio = new Audio(getImagePath(item.file))
    audioRef.current = audio

    audio.onended = () => {
      setPlayingId(null)
      audioRef.current = null
    }

    audio.onerror = () => {
      console.warn(`音频文件 ${item.file} 未找到`)
      setPlayingId(null)
      audioRef.current = null
    }

    audio.play().catch(() => {
      setPlayingId(null)
      audioRef.current = null
    })

    setPlayingId(item.id)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎵 PvZ 1 背景音乐</h1>
        <p className={styles.subtitle}>共 {music.length} 首音乐，重温经典旋律</p>
      </div>

      <div className={styles.list}>
        {music.map(item => (
          <div key={item.id} className={styles.item}>
            <button
              className={`${styles.playBtn} ${playingId === item.id ? styles.playBtnPlaying : ''}`}
              onClick={() => handlePlay(item)}
            >
              {playingId === item.id ? '⏹' : '▶'}
            </button>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.nameEn}>{item.nameEn}</div>
              <div className={styles.scene}>{item.scene}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicList
