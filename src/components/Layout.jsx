import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌻</span>
            <span>植物大战僵尸百科全书</span>
          </NavLink>
          <nav className={styles.navLinks}>
            <NavLink
              to="/plants"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              植物图鉴
            </NavLink>
            <NavLink
              to="/zombies"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              僵尸图鉴
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
