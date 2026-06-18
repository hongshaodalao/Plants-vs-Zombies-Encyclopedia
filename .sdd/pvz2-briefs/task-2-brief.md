# Task 2: 添加首页版本切换器

**Files:**
- Create: `src/components/VersionSwitcher.jsx`
- Create: `src/components/VersionSwitcher.module.css`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.module.css`

## Step 1: 编写 VersionSwitcher.module.css

写入 `src/components/VersionSwitcher.module.css`：

```css
.switcher {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.versionCard {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.versionCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.versionCardPvz1 {
  border-color: var(--color-plant);
}

.versionCardPvz2 {
  border-color: var(--color-zombie);
}

.versionIcon {
  font-size: 5rem;
  margin-bottom: var(--space-md);
}

.versionTitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
  color: var(--color-grass-dark);
}

.versionYear {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.versionStats {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.statValue {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-text-primary);
}
```

## Step 2: 编写 VersionSwitcher.jsx

写入 `src/components/VersionSwitcher.jsx`：

```javascript
import { Link } from 'react-router-dom'
import styles from './VersionSwitcher.module.css'

function VersionSwitcher() {
  return (
    <div className={styles.switcher}>
      <Link to="/plants" className={`${styles.versionCard} ${styles.versionCardPvz1}`}>
        <div className={styles.versionIcon}>🌿</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 1</h2>
        <p className={styles.versionYear}>2009 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>49</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>26</span>
            <span>僵尸</span>
          </div>
        </div>
      </Link>

      <Link to="/pvz2" className={`${styles.versionCard} ${styles.versionCardPvz2}`}>
        <div className={styles.versionIcon}>🧟</div>
        <h2 className={styles.versionTitle}>植物大战僵尸 2</h2>
        <p className={styles.versionYear}>2013 年</p>
        <div className={styles.versionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>200+</span>
            <span>植物</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100+</span>
            <span>僵尸</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>11</span>
            <span>世界</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default VersionSwitcher
```

## Step 3: 更新 Home.jsx 添加版本切换器

将 `src/pages/Home.jsx` 改为：

```javascript
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
```

## Step 4: 更新 Home.module.css

在 `src/pages/Home.module.css` 中移除旧的 `.cards` 相关样式（如果有的话），保留 `.home`、`.hero`、`.title`、`.subtitle` 样式。

## Step 5: 验证

运行 `npm run dev`（后台），访问 `/`，确认首页显示两个版本卡片。

完成后停止 dev 服务器。

## Step 6: 提交

```bash
git add src/components/VersionSwitcher.jsx src/components/VersionSwitcher.module.css src/pages/Home.jsx src/pages/Home.module.css
git commit -m "feat(ui): add game version switcher to home page"
```

## 重要约束

- 使用 CSS 变量（--color-plant、--color-zombie 等）
- 使用 Link 组件（不是 <a> 标签）
- PvZ 1 卡片链接到 `/plants`，PvZ 2 卡片链接到 `/pvz2`
- 保留 Home.jsx 的 fadeIn 动画
