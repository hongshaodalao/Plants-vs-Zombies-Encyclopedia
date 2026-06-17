import { worlds } from '../data/pvz2/worlds.js'
import WorldCard from '../components/WorldCard.jsx'
import TabNav from '../components/TabNav.jsx'
import styles from './WorldsList.module.css'

const pvz2Tabs = [
  { to: '/pvz2/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/pvz2/zombies', icon: '🧟', label: '僵尸图鉴' },
  { to: '/pvz2/worlds', icon: '🌍', label: '世界探索' }
]

function WorldsList() {
  return (
    <div className={styles.page}>
      <TabNav tabs={pvz2Tabs} />

      <div className={styles.header}>
        <h1 className={styles.title}>🌍 PvZ 2 世界图鉴</h1>
        <p className={styles.subtitle}>共 {worlds.length} 个世界，穿越不同时空冒险</p>
      </div>

      <div className={styles.grid}>
        {worlds.map(world => (
          <WorldCard key={world.id} data={world} />
        ))}
      </div>
    </div>
  )
}

export default WorldsList
