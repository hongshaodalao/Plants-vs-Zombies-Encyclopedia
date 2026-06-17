import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>欢迎来到植物大战僵尸百科全书</h1>
        <p className={styles.subtitle}>
          探索初代植物大战僵尸中所有植物与僵尸的属性、技能与故事
        </p>
      </section>

      <section className={styles.cards}>
        <Link to="/plants" className={styles.card}>
          <div className={styles.cardIcon}>🌿</div>
          <h2 className={styles.cardTitle}>植物图鉴</h2>
          <p className={styles.cardDesc}>
            查看豌豆射手、向日葵、樱桃炸弹等 8 种植物的详细属性
          </p>
        </Link>

        <Link to="/zombies" className={`${styles.card} ${styles.cardZombie}`}>
          <div className={styles.cardIcon}>🧟</div>
          <h2 className={styles.cardTitle}>僵尸图鉴</h2>
          <p className={styles.cardDesc}>
            查看普通僵尸、铁桶僵尸、橄榄球僵尸等 8 种僵尸的弱点与属性
          </p>
        </Link>
      </section>
    </div>
  )
}

export default Home
