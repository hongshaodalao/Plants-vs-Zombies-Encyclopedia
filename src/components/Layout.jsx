import { NavLink, Outlet } from 'react-router-dom'
import { getImagePath } from '../utils/imagePath.js'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌻</span>
            <span className={styles.logoText}>植物大战僵尸百科全书</span>
          </NavLink>
          <nav className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              🏠 首页
            </NavLink>
            <NavLink
              to="/plants"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              <img src={getImagePath('/images/pvz1/plants/peashooter.png')} alt="PvZ 1" className={styles.navIcon} />
              PvZ 1
            </NavLink>
            <NavLink
              to="/pvz2/plants"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              <img src={getImagePath('/images/pvz2/plants/peashooter.png')} alt="PvZ 2" className={styles.navIcon} />
              PvZ 2
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        © 2026 植物大战僵尸百科全书 · 仅供个人学习使用
      </footer>
    </div>
  )
}

export default Layout
