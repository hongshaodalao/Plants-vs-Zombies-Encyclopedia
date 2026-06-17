import { worlds } from '../data/pvz2/worlds.js'
import WorldCard from '../components/WorldCard.jsx'
import styles from './WorldsList.module.css'

function WorldsList() {
  return (
    <div className={styles.page}>
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
