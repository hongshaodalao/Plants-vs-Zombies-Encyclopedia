import styles from './UpgradeInfo.module.css'

function UpgradeInfo({ upgradeable, maxUpgradeLevel, upgradeEffect }) {
  if (!upgradeable) {
    return (
      <div className={styles.upgradeSection}>
        <h3 className={styles.upgradeTitle}>升级信息</h3>
        <p className={styles.noUpgrade}>该植物不可升级</p>
      </div>
    )
  }

  return (
    <div className={styles.upgradeSection}>
      <h3 className={styles.upgradeTitle}>升级信息</h3>
      <div className={styles.upgradeRow}>
        <span className={styles.upgradeLabel}>是否可升级</span>
        <span className={styles.upgradeValue}>是</span>
      </div>
      {maxUpgradeLevel && (
        <div className={styles.upgradeRow}>
          <span className={styles.upgradeLabel}>最高等级</span>
          <span className={styles.upgradeValue}>{maxUpgradeLevel}</span>
        </div>
      )}
      {upgradeEffect && (
        <div className={styles.upgradeEffect}>
          <div className={styles.upgradeEffectLabel}>升级效果</div>
          <p className={styles.upgradeEffectText}>{upgradeEffect}</p>
        </div>
      )}
    </div>
  )
}

export default UpgradeInfo
