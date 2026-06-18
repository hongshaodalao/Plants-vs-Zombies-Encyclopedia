import { Link, useNavigate } from 'react-router-dom'
import styles from './DetailView.module.css'

function DetailView({ data, list, type }) {
  const navigate = useNavigate()
  const isPlant = type === 'plant'
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null
  const listPath = isPlant ? '/plants' : '/zombies'
  const detailClass = isPlant
    ? `${styles.detail} ${styles.detailPlant}`
    : `${styles.detail} ${styles.detailZombie}`

  const handlePrev = () => prevItem && navigate(`${listPath}/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`${listPath}/${nextItem.id}`)

  return (
    <div>
      <Link to={listPath} className={styles.backBtn}>
        ← 返回图鉴
      </Link>

      <div className={detailClass}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={data.image}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = isPlant
                ? '/images/pvz1/plants/_placeholder.svg'
                : '/images/pvz1/zombies/_placeholder.svg'
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{data.name}</h1>
          <span className={styles.nameEn}>{data.nameEn}</span>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.statsGrid}>
            {isPlant ? (
              <>
                <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
                <StatBox label="冷却时间" value={data.recharge} unit="秒" />
                <StatBox label="伤害" value={data.damage} unit="💥" />
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击范围" value={data.range} />
                <StatBox label="解锁关卡" value={data.unlockLevel} />
              </>
            ) : (
              <>
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击力" value={data.damage} unit="⚔️" />
                <StatBox label="移动速度" value={
                  data.speed === 'slow' ? '慢' : data.speed === 'medium' ? '中' : '快'
                } />
                <StatBox label="首次出现" value={`第 ${data.firstAppearance} 关`} />
                <StatBox label="弱点" value={data.weakness} />
              </>
            )}
          </div>

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

export default DetailView