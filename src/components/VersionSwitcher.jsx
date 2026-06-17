import { Link } from 'react-router-dom'
import styles from './VersionSwitcher.module.css'

function VersionSwitcher() {
  return (
    <div className={styles.switcher}>
      <Link to="/plants" className={`${styles.versionCard} ${styles.versionCardPvz1}`}>
        <div className={styles.versionIcon}>🌿</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 1</h2>
        <p className={styles.versionYear}>2009 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>49</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>26</span>
            <span>僵尸</span>
          </div>
        </div>
      </Link>

      <Link to="/pvz2" className={`${styles.versionCard} ${styles.versionCardPvz2}`}>
        <div className={styles.versionIcon}>🧟</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 2</h2>
        <p className={styles.versionYear}>2013 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>200+</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100+</span>
            <span>僵尸</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>11</span>
            <span>世界</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default VersionSwitcher
