import { Link } from 'react-router-dom'
import styles from './WorldCard.module.css'

function WorldCard({ data }) {
  return (
    <Link to={`/pvz2/worlds/${data.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={data.image}
          alt={data.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'images/pvz2/worlds/_placeholder.svg'
          }}
        />
      </div>
      <h3 className={styles.name}>{data.name}</h3>
      <span className={styles.nameEn}>{data.nameEn}</span>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>🌿</span>
          <span className={styles.statValue}>{data.plantIds.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>💀</span>
          <span className={styles.statValue}>{data.zombieIds.length}</span>
        </div>
      </div>
    </Link>
  )
}

export default WorldCard
