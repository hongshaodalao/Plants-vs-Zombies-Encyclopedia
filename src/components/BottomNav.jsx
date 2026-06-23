import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

function BottomNav({ tabs }) {
  const handleTabClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <nav className={styles.bottomNav}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end !== false}
          onClick={handleTabClick}
          className={({ isActive }) =>
            isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
          }
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
