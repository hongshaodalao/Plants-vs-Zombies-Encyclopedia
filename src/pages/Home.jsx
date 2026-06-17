import VersionSwitcher from '../components/VersionSwitcher.jsx'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>欢迎来到植物大战僵尸百科全书</h1>
        <p className={styles.subtitle}>
          探索植物大战僵尸系列的全部植物与僵尸的属性、技能与故事
        </p>
      </section>

      <VersionSwitcher />
    </div>
  )
}

export default Home
