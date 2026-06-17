import { Link, useNavigate } from 'react-router-dom'
import styles from './Pvz2DetailView.module.css'
import UpgradeInfo from './UpgradeInfo.jsx'

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

function Pvz2DetailView({ data, list }) {
  const navigate = useNavigate()
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null

  const handlePrev = () => prevItem && navigate(`/pvz2/plants/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`/pvz2/plants/${nextItem.id}`)

  return (
    <div>
      <Link to="/pvz2/plants" className={styles.backBtn}>
        ← 返回图鉴
      </Link>

      <div className={styles.detail}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={data.image}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = '/images/plants/_placeholder.svg'
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{data.name}</h1>
          <span className={styles.nameEn}>{data.nameEn}</span>

          {data.world && (
            <span className={styles.worldBadge}>
              {worldNames[data.world] || data.world}
            </span>
          )}

          <p className={styles.description}>{data.description}</p>

          <div className={styles.statsGrid}>
            <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
            <StatBox label="冷却时间" value={data.recharge} unit="秒" />
            <StatBox label="伤害" value={data.damage} unit="💥" />
            <StatBox label="生命值" value={data.health} unit="❤️" />
            <StatBox label="攻击范围" value={data.range} />
            <StatBox label="解锁关卡" value={data.unlockLevel} />
          </div>

          {data.plantFoodEffect && (
            <div className={styles.plantFoodSection}>
              <h3 className={styles.plantFoodTitle}>能量豆效果</h3>
              <p className={styles.plantFoodText}>{data.plantFoodEffect}</p>
            </div>
          )}

          <UpgradeInfo
            upgradeable={data.upgradeable}
            maxUpgradeLevel={data.maxUpgradeLevel}
            upgradeEffect={data.upgradeEffect}
          />

          <div className={styles.navigation}>
            {prevItem ? (
              <button onClick={handlePrev} className={styles.navBtn}>
                ← {prevItem.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextItem ? (
              <button onClick={handleNext} className={styles.navBtn}>
                {nextItem.name} →
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                没有下一个 →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, unit }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {unit && /\p{Emoji}/u.test(unit) && <span style={{ marginRight: '0.25rem' }}>{unit}</span>}
        {value}
      </div>
    </div>
  )
}

export default Pvz2DetailView
