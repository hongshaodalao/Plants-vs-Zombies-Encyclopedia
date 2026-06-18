import { Link } from 'react-router-dom'
import { getImagePath } from '../utils/imagePath.js'
import styles from './Card.module.css'

const worldNames = {
  modern_day: '摩登时代',
  ancient_egypt: '古埃及',
  pirate_seas: '海盗港湾',
  wild_west: '狂野西部',
  frostbite_caves: '冰河世界',
  lost_city: '失落之城',
  far_future: '未来世界',
  dark_ages: '黑暗时代',
  neon_mixtape_tour: '摇滚年代',
  jurassic_marsh: '侏罗纪沼泽',
  big_wave_beach: '巨浪沙滩',
  power_mints: '薄荷家族'
}

function Card({ data, type, gameVersion = 'pvz1' }) {
  const base = gameVersion === 'pvz2' ? '/pvz2' : ''
  const detailPath = type === 'plant' ? `${base}/plants/${data.id}` : `${base}/zombies/${data.id}`

  const isPlant = type === 'plant'
  const isPvz2 = gameVersion === 'pvz2'
  const cardClass = isPlant
    ? `${styles.card} ${styles.cardPlant}`
    : `${styles.card} ${styles.cardZombie}`

  return (
    <Link to={detailPath} className={cardClass}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={getImagePath(data.image)}
          alt={data.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = getImagePath(
              isPlant ? '/images/pvz1/plants/_placeholder.svg' : '/images/pvz1/zombies/_placeholder.svg'
            )
          }}
        />
      </div>
      <h3 className={styles.name}>{data.name}</h3>
      <span className={styles.nameEn}>{data.nameEn}</span>
      {isPvz2 && data.world && (
        <span className={styles.worldLabel}>{worldNames[data.world] || data.world}</span>
      )}
      {data.source === 'china' && (
        <span className={`${styles.sourceTag} ${styles.sourceChina}`}>中国版</span>
      )}
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
