# Task 5: 实现 Layout 组件与基础路由

**Files:**
- Create: `src/components/Layout.jsx`
- Create: `src/components/Layout.module.css`
- Modify: `src/App.jsx`
- Create: `src/pages/Home.jsx`
- Create: `src/pages/Home.module.css`
- Create: `src/pages/PlantsList.jsx`（占位）
- Create: `src/pages/ZombiesList.jsx`（占位）
- Create: `src/pages/NotFound.jsx`

## Step 1: 编写 `src/components/Layout.module.css`

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(180deg, #6BA53D 0%, #4A7C2E 100%);
  padding: var(--space-md) var(--space-xl);
  box-shadow: var(--shadow-card);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbarInner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.logoIcon {
  font-size: 2rem;
  animation: rotate 8s linear infinite;
  display: inline-block;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.navLinks {
  display: flex;
  gap: var(--space-md);
}

.navLink {
  color: var(--color-text-light);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  transition: var(--transition);
  font-weight: 500;
}

.navLink:hover {
  background: rgba(255, 215, 0, 0.3);
}

.navLinkActive {
  background: var(--color-sun);
  color: var(--color-text-primary);
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: var(--space-xl);
}

.footer {
  background: rgba(74, 124, 46, 0.9);
  color: var(--color-text-light);
  text-align: center;
  padding: var(--space-md);
  font-size: var(--font-size-sm);
}

@media (max-width: 640px) {
  .navbar { padding: var(--space-md); }
  .main { padding: var(--space-md); }
  .logo { font-size: var(--font-size-lg); }
  .navLink { padding: var(--space-xs) var(--space-sm); }
}
```

## Step 2: 编写 `src/components/Layout.jsx`

```javascript
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
```

## Step 3: 编写 `src/pages/Home.jsx`

```javascript
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
```

## Step 4: 编写 `src/pages/Home.module.css`

```css
.home {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  text-align: center;
  padding: var(--space-xl) 0;
  color: var(--color-text-light);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-md);
}

.subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.95;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.card {
  background: var(--color-bg-card);
  border: 3px solid var(--color-plant);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: block;
}

.cardZombie {
  border-color: var(--color-zombie);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.cardIcon {
  font-size: 5rem;
  margin-bottom: var(--space-md);
}

.cardTitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
  color: var(--color-grass-dark);
}

.cardDesc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}
```

## Step 5: 编写占位页面 `src/pages/PlantsList.jsx`

```javascript
function PlantsList() {
  return <h2>植物图鉴（待实现）</h2>
}

export default PlantsList
```

## Step 6: 编写占位页面 `src/pages/ZombiesList.jsx`

```javascript
function ZombiesList() {
  return <h2>僵尸图鉴（待实现）</h2>
}

export default ZombiesList
```

## Step 7: 编写 404 页面 `src/pages/NotFound.jsx`

```javascript
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>
        哎呀，僵尸把这里吃掉了！
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-sun)',
          color: 'var(--color-text-primary)',
          borderRadius: 'var(--radius-md)',
          fontWeight: 'bold'
        }}
      >
        返回首页
      </Link>
    </div>
  )
}

export default NotFound
```

## Step 8: 更新 `src/App.jsx` 配置路由

将 `src/App.jsx` 改为：

```javascript
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<PlantsList />} />
        <Route path="zombies" element={<ZombiesList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
```

## Step 9: 验证

运行 `npm run dev`（在后台运行），浏览器访问：
- `/` 显示欢迎页和两个卡片
- 点击"植物图鉴"导航到 `/plants`，导航栏高亮
- 点击"僵尸图鉴"导航到 `/zombies`
- 访问 `/foo` 显示 404 页面

预期：所有路由正确，导航栏高亮工作。

完成后停止 dev 服务器。

## Step 10: 提交

```bash
git add src/components/Layout.jsx src/components/Layout.module.css src/pages src/App.jsx
git commit -m "feat(layout): add Layout, Home page, basic routing"
```

## 重要约束

- 严格按 brief 的代码块实现，不要改写或"优化"
- 8 个文件：Layout.jsx, Layout.module.css, Home.jsx, Home.module.css, PlantsList.jsx, ZombiesList.jsx, NotFound.jsx, App.jsx（修改）
- App.jsx 现有内容（极简占位）必须完全替换为 brief 中的路由配置
- 不得新增其他文件或路由
- 不得修改 `src/data/`、`src/styles/`、`src/main.jsx`（main.jsx 已经包含 BrowserRouter）
- 占位 PlantsList / ZombiesList 故意只显示文字"待实现"，Tasks 9/10 会完整实现
