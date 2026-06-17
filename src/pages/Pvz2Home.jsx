import { Link } from 'react-router-dom'
import { plants } from '../data/pvz2/plants.js'
import { zombies } from '../data/pvz2/zombies.js'
import { worlds } from '../data/pvz2/worlds.js'
import styles from './Pvz2Home.module.css'

const entries = [
  {
    to: '/pvz2/plants',
    icon: '🌿',
    title: '植物图鉴',
    desc: `${plants.length} 种植物，来自不同时空的植物战士`
  },
  {
    to: '/pvz2/zombies',
    icon: '🧟',
    title: '僵尸图鉴',
    desc: `${zombies.length} 种僵尸，穿越时空的不死军团`
  },
  {
    to: '/pvz2/worlds',
    icon: '🌍',
    title: '世界探索',
    desc: `${worlds.length} 个世界，踏上穿越时空的冒险之旅`
  }
]

function Pvz2Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>植物大战僵尸 2 百科全书</h1>
        <p className={styles.subtitle}>
          穿越时空，探索古埃及、海盗港湾、狂野西部等不同时代，
          收集强力植物，对抗来自各个时空的僵尸大军！
        </p>
      </section>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{plants.length}</span>
          <span className={styles.statLabel}>植物</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{zombies.length}</span>
          <span className={styles.statLabel}>僵尸</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{worlds.length}</span>
          <span className={styles.statLabel}>世界</span>
        </div>
      </div>

      <div className={styles.cards}>
        {entries.map(entry => (
          <Link key={entry.to} to={entry.to} className={styles.card}>
            <span className={styles.cardIcon}>{entry.icon}</span>
            <h2 className={styles.cardTitle}>{entry.title}</h2>
            <p className={styles.cardDesc}>{entry.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Pvz2Home
