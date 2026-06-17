import { NavLink } from 'react-router-dom'
import styles from './TabNav.module.css'

function TabNav({ tabs }) {
  return (
    <nav className={styles.tabNav}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end !== false}
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

export default TabNav
