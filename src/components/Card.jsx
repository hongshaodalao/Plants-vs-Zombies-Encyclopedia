import { Link } from 'react-router-dom'
import styles from './Card.module.css'

function Card({ data, type }) {
  const detailPath = type === 'plant' ? `/plants/${data.id}` : `/zombies/${data.id}`

  const isPlant = type === 'plant'
  const cardClass = isPlant
    ? `${styles.card} ${styles.cardPlant}`
    : `${styles.card} ${styles.cardZombie}`

  return (
    <Link to={detailPath} className={cardClass}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={data.image}
          alt={data.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = isPlant
              ? '/images/plants/_placeholder.svg'
              : '/images/zombies/_placeholder.svg'
          }}
        />
      </div>
      <h3 className={styles.name}>{data.name}</h3>
      <span className={styles.nameEn}>{data.nameEn}</span>
      <div className={styles.stats}>
        {isPlant ? (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>☀️</span>
              <span className={styles.statValue}>{data.sunCost}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>💥</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>❤️</span>
              <span className={styles.statValue}>{data.health}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>⚔️</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Card
