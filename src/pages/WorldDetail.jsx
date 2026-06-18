import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { worlds } from '../data/pvz2/worlds.js'
import { plants } from '../data/pvz2/plants.js'
import { zombies } from '../data/pvz2/zombies.js'
import styles from './WorldDetail.module.css'

function WorldDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const world = worlds.find(w => w.id === id)

  if (!world) {
    return <Navigate to="/pvz2/worlds" replace />
  }

  const currentIndex = worlds.findIndex(w => w.id === id)
  const prevWorld = currentIndex > 0 ? worlds[currentIndex - 1] : null
  const nextWorld = currentIndex < worlds.length - 1 ? worlds[currentIndex + 1] : null

  // Cross-reference plantIds/zombieIds with actual data, filtering out invalid IDs (e.g. ones with <br>)
  const worldPlants = world.plantIds
    .filter(pid => !pid.includes('<'))
    .map(pid => plants.find(p => p.id === pid))
    .filter(Boolean)

  const worldZombies = world.zombieIds
    .filter(zid => !zid.includes('<'))
    .map(zid => zombies.find(z => z.id === zid))
    .filter(Boolean)

  return (
    <div>
      <Link to="/pvz2/worlds" className={styles.backBtn}>
        ← 返回世界列表
      </Link>

      <div className={styles.detail}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={world.image}
            alt={world.name}
            onError={(e) => {
              e.currentTarget.src = '/images/pvz2/worlds/_placeholder.svg'
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{world.name}</h1>
          <span className={styles.nameEn}>{world.nameEn}</span>

          <p className={styles.description}>{world.description}</p>

          <div className={styles.statsGrid}>
            <StatBox label="关卡数量" value={world.levels} unit="关" />
            <StatBox label="特殊机制" value={world.specialMechanic} />
            <StatBox label="解锁条件" value={world.unlockCondition} />
            <StatBox label="植物数量" value={worldPlants.length} unit="🌿" />
            <StatBox label="僵尸数量" value={worldZombies.length} unit="💀" />
          </div>

          <div className={styles.entitySection}>
            <h3 className={styles.entityTitle}>🌿 包含植物</h3>
            {worldPlants.length > 0 ? (
              <div className={styles.entityList}>
                {worldPlants.map(plant => (
                  <Link
                    key={plant.id}
                    to={`/pvz2/plants/${plant.id}`}
                    className={styles.entityItem}
                  >
                    <img
                      className={styles.entityImage}
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/pvz1/plants/_placeholder.svg'
                      }}
                    />
                    <span className={styles.entityName}>{plant.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>暂无植物数据</p>
            )}
          </div>

          <div className={styles.entitySection}>
            <h3 className={styles.entityTitle}>💀 包含僵尸</h3>
            {worldZombies.length > 0 ? (
              <div className={styles.entityList}>
                {worldZombies.map(zombie => (
                  <Link
                    key={zombie.id}
                    to={`/pvz2/zombies/${zombie.id}`}
                    className={styles.entityItem}
                  >
                    <img
                      className={styles.entityImage}
                      src={zombie.image}
                      alt={zombie.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/pvz1/zombies/_placeholder.svg'
                      }}
                    />
                    <span className={styles.entityName}>{zombie.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>暂无僵尸数据</p>
            )}
          </div>

          <div className={styles.navigation}>
            {prevWorld ? (
              <button onClick={() => navigate(`/pvz2/worlds/${prevWorld.id}`)} className={styles.navBtn}>
                ← {prevWorld.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextWorld ? (
              <button onClick={() => navigate(`/pvz2/worlds/${nextWorld.id}`)} className={styles.navBtn}>
                {nextWorld.name} →
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
        {unit && !/\p{Emoji}/u.test(unit) && <span style={{ marginLeft: '0.25rem' }}>{unit}</span>}
      </div>
    </div>
  )
}

export default WorldDetail
