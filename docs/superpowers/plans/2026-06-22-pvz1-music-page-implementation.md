# PvZ1 音乐页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 PvZ1 增加一个音乐页面，列出所有背景音乐，并支持播放功能

**Architecture:** 创建音乐数据文件定义音乐列表，下载音乐文件到 public/audio/pvz1/music/，创建音乐列表页面组件，添加路由和导航

**Tech Stack:** React 18, HTML5 Audio API, Vite 5

## Global Constraints

- 音乐文件存储在 `public/audio/pvz1/music/` 目录
- 使用 HTML5 Audio API 播放音乐
- 同时只能播放一首音乐
- 页面在移动端正常显示

---

### Task 1: 创建音乐数据文件

**Files:**
- Create: `src/data/pvz1/music.js`

**Interfaces:**
- Produces: `music` 数组，每个元素包含 `{ id, name, nameEn, scene, file }`

- [ ] **Step 1: 创建音乐数据文件**

```javascript
// src/data/pvz1/music.js
export const music = [
  {
    id: 'main-menu',
    name: '主菜单',
    nameEn: 'Main Menu',
    scene: '游戏主菜单',
    file: '/audio/pvz1/music/main-menu.mp3'
  },
  {
    id: 'day-stage',
    name: '白天关卡',
    nameEn: 'Day Stage',
    scene: '白天关卡背景音乐',
    file: '/audio/pvz1/music/day-stage.mp3'
  },
  {
    id: 'night-stage',
    name: '夜晚关卡',
    nameEn: 'Night Stage',
    scene: '夜晚关卡背景音乐',
    file: '/audio/pvz1/music/night-stage.mp3'
  },
  {
    id: 'pool-stage',
    name: '泳池关卡',
    nameEn: 'Pool Stage',
    scene: '泳池关卡背景音乐',
    file: '/audio/pvz1/music/pool-stage.mp3'
  },
  {
    id: 'fog-stage',
    name: '浓雾关卡',
    nameEn: 'Fog Stage',
    scene: '浓雾关卡背景音乐',
    file: '/audio/pvz1/music/fog-stage.mp3'
  },
  {
    id: 'roof-stage',
    name: '屋顶关卡',
    nameEn: 'Roof Stage',
    scene: '屋顶关卡背景音乐',
    file: '/audio/pvz1/music/roof-stage.mp3'
  },
  {
    id: 'crazy-dave',
    name: '疯狂戴夫',
    nameEn: 'Crazy Dave',
    scene: '疯狂戴夫场景音乐',
    file: '/audio/pvz1/music/crazy-dave.mp3'
  },
  {
    id: 'zen-garden',
    name: '禅境花园',
    nameEn: 'Zen Garden',
    scene: '禅境花园背景音乐',
    file: '/audio/pvz1/music/zen-garden.mp3'
  },
  {
    id: 'mini-game',
    name: '小游戏',
    nameEn: 'Mini Game',
    scene: '小游戏背景音乐',
    file: '/audio/pvz1/music/mini-game.mp3'
  },
  {
    id: 'final-boss',
    name: '最终 Boss',
    nameEn: 'Final Boss',
    scene: '最终 Boss 战斗音乐',
    file: '/audio/pvz1/music/final-boss.mp3'
  },
  {
    id: 'victory',
    name: '胜利',
    nameEn: 'Victory',
    scene: '关卡胜利音效',
    file: '/audio/pvz1/music/victory.mp3'
  },
  {
    id: 'game-over',
    name: '失败',
    nameEn: 'Game Over',
    scene: '关卡失败音效',
    file: '/audio/pvz1/music/game-over.mp3'
  }
]
```

- [ ] **Step 2: 验证数据文件语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/data/pvz1/music.js
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/data/pvz1/music.js
git commit -m "feat: add PvZ1 music data file"
```

---

### Task 2: 创建音乐列表页面

**Files:**
- Create: `src/pages/MusicList.jsx`
- Create: `src/pages/MusicList.module.css`

**Interfaces:**
- Consumes: `music` 数组从 `src/data/pvz1/music.js`
- Produces: 音乐列表页面组件

- [ ] **Step 1: 创建音乐列表页面 CSS**

```css
/* src/pages/MusicList.module.css */
.page {
  animation: fadeIn 0.4s ease;
  padding-bottom: 70px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  margin-bottom: var(--space-lg);
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-light);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin-bottom: var(--space-sm);
}

.subtitle {
  color: var(--color-text-light);
  opacity: 0.9;
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-card);
  transition: var(--transition);
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.playBtn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--color-plant);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  flex-shrink: 0;
}

.playBtn:hover {
  background: var(--color-plant-dark);
  transform: scale(1.1);
}

.playBtnPlaying {
  background: var(--color-zombie);
}

.playBtnPlaying:hover {
  background: var(--color-zombie-dark);
}

.info {
  flex: 1;
}

.name {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.nameEn {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.scene {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

@media (max-width: 480px) {
  .item {
    padding: var(--space-sm);
  }

  .playBtn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
```

- [ ] **Step 2: 创建音乐列表页面组件**

```javascript
// src/pages/MusicList.jsx
import { useState, useRef, useEffect } from 'react'
import { music } from '../data/pvz1/music.js'
import { getImagePath } from '../utils/imagePath.js'
import styles from './MusicList.module.css'

function MusicList() {
  const [playingId, setPlayingId] = useState(null)
  const audioRef = useRef(null)

  // 组件卸载时停止播放
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handlePlay = (item) => {
    // 如果正在播放同一首，停止它
    if (playingId === item.id) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setPlayingId(null)
      return
    }

    // 停止当前播放
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // 播放新音乐
    const audio = new Audio(getImagePath(item.file))
    audioRef.current = audio

    audio.onended = () => {
      setPlayingId(null)
      audioRef.current = null
    }

    audio.onerror = () => {
      console.warn(`音频文件 ${item.file} 未找到`)
      setPlayingId(null)
      audioRef.current = null
    }

    audio.play().catch(() => {
      setPlayingId(null)
      audioRef.current = null
    })

    setPlayingId(item.id)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎵 PvZ 1 背景音乐</h1>
        <p className={styles.subtitle}>共 {music.length} 首音乐，重温经典旋律</p>
      </div>

      <div className={styles.list}>
        {music.map(item => (
          <div key={item.id} className={styles.item}>
            <button
              className={`${styles.playBtn} ${playingId === item.id ? styles.playBtnPlaying : ''}`}
              onClick={() => handlePlay(item)}
            >
              {playingId === item.id ? '⏹' : '▶'}
            </button>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.nameEn}>{item.nameEn}</div>
              <div className={styles.scene}>{item.scene}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicList
```

- [ ] **Step 3: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run build 2>&1 | head -20
```

Expected: 构建成功，无错误

- [ ] **Step 4: 提交**

```bash
git add src/pages/MusicList.jsx src/pages/MusicList.module.css
git commit -m "feat: add PvZ1 music list page"
```

---

### Task 3: 添加路由和导航

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/TabNav.jsx` (如果需要)

**Interfaces:**
- Consumes: `MusicList` 组件
- Produces: `/music` 路由

- [ ] **Step 1: 修改 App.jsx 添加路由**

在 `src/App.jsx` 中添加音乐页面路由：

```javascript
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import PlantDetail from './pages/PlantDetail.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import ZombieDetail from './pages/ZombieDetail.jsx'
import MusicList from './pages/MusicList.jsx'
import Pvz2PlantsList from './pages/Pvz2PlantsList.jsx'
import Pvz2PlantDetail from './pages/Pvz2PlantDetail.jsx'
import Pvz2ZombiesList from './pages/Pvz2ZombiesList.jsx'
import Pvz2ZombieDetail from './pages/Pvz2ZombieDetail.jsx'
import WorldsList from './pages/WorldsList.jsx'
import WorldDetail from './pages/WorldDetail.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<PlantsList />} />
        <Route path="plants/:id" element={<PlantDetail />} />
        <Route path="zombies" element={<ZombiesList />} />
        <Route path="zombies/:id" element={<ZombieDetail />} />
        <Route path="music" element={<MusicList />} />
        <Route path="pvz2/plants" element={<Pvz2PlantsList />} />
        <Route path="pvz2/plants/:id" element={<Pvz2PlantDetail />} />
        <Route path="pvz2/zombies" element={<Pvz2ZombiesList />} />
        <Route path="pvz2/zombies/:id" element={<Pvz2ZombieDetail />} />
        <Route path="pvz2/worlds" element={<WorldsList />} />
        <Route path="pvz2/worlds/:id" element={<WorldDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run build 2>&1 | head -20
```

Expected: 构建成功，无错误

- [ ] **Step 3: 提交**

```bash
git add src/App.jsx
git commit -m "feat: add music page route"
```

---

### Task 4: 添加导航入口

**Files:**
- Modify: `src/components/Layout.jsx`

**Interfaces:**
- 添加音乐页面导航链接

- [ ] **Step 1: 修改 Layout.jsx 添加音乐导航**

在 `src/components/Layout.jsx` 中添加音乐导航链接：

```javascript
import { NavLink, Outlet } from 'react-router-dom'
import { getImagePath } from '../utils/imagePath.js'
import styles from './Layout.module.css'

function Layout() {
  const handleNavClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <NavLink to="/" className={styles.logo} onClick={handleNavClick}>
            <span className={styles.logoIcon}>🌻</span>
            <span className={styles.logoText}>植物大战僵尸百科全书</span>
          </NavLink>
          <nav className={styles.navLinks}>
            <NavLink
              to="/"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              🏠 首页
            </NavLink>
            <NavLink
              to="/plants"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              <img src={getImagePath('/images/pvz1/plants/peashooter.png')} alt="PvZ 1" className={styles.navIcon} />
              PvZ 1
            </NavLink>
            <NavLink
              to="/music"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              🎵 音乐
            </NavLink>
            <NavLink
              to="/pvz2/plants"
              onClick={handleNavClick}
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
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run build 2>&1 | head -20
```

Expected: 构建成功，无错误

- [ ] **Step 3: 提交**

```bash
git add src/components/Layout.jsx
git commit -m "feat: add music navigation link"
```

---

### Task 5: 下载音乐文件

**Files:**
- Create: `scripts/download-music.py`

**Interfaces:**
- 下载 PvZ1 背景音乐到 `public/audio/pvz1/music/`

- [ ] **Step 1: 创建下载脚本**

```python
#!/usr/bin/env python3
"""
下载 PvZ1 背景音乐
"""
import os
import urllib.request

# 音乐文件列表（需要从网上下载）
MUSIC_FILES = [
    {
        "id": "main-menu",
        "name": "主菜单",
        "url": "https://example.com/pvz1/main-menu.mp3"  # 需要替换为实际 URL
    },
    # ... 其他音乐文件
]

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUSIC_DIR = os.path.join(BASE_DIR, "public", "audio", "pvz1", "music")

def download_music():
    """下载音乐文件"""
    os.makedirs(MUSIC_DIR, exist_ok=True)

    for item in MUSIC_FILES:
        output_path = os.path.join(MUSIC_DIR, f"{item['id']}.mp3")

        if os.path.exists(output_path):
            print(f"跳过（已存在）: {item['name']}")
            continue

        print(f"下载: {item['name']}...")
        try:
            urllib.request.urlretrieve(item['url'], output_path)
            size = os.path.getsize(output_path)
            print(f"  完成: {size:,} 字节")
        except Exception as e:
            print(f"  失败: {e}")

if __name__ == "__main__":
    download_music()
```

- [ ] **Step 2: 提交**

```bash
git add scripts/download-music.py
git commit -m "feat: add music download script"
```

---

### Task 6: 验证并提交所有更改

**Files:**
- 无新文件

- [ ] **Step 1: 启动开发服务器验证功能**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run dev
```

在浏览器中测试：
1. 访问 http://localhost:5173/music
2. 验证音乐列表正确显示
3. 点击播放按钮验证音乐播放
4. 验证同时只能播放一首音乐

- [ ] **Step 2: 停止开发服务器**

按 `Ctrl+C` 停止开发服务器

- [ ] **Step 3: 构建项目验证**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 4: 最终提交**

```bash
git add -A
git commit -m "feat: implement PvZ1 music page"
```
