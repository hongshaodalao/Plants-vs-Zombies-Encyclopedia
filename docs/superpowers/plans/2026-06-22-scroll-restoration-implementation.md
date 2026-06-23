# 滚动位置恢复实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现列表页面的滚动位置、搜索关键词和筛选条件的保存与恢复功能

**Architecture:** 使用 sessionStorage 保存列表页面状态，创建自定义 Hook `useListState` 封装状态管理逻辑。在列表页面使用 Hook 管理状态，在详情页面返回时触发状态恢复。

**Tech Stack:** React 18, React Router v6, sessionStorage

## Global Constraints

- 使用 `sessionStorage` 存储状态，标签页关闭后自动清除
- 存储数据 30 分钟后过期
- 每个列表页面独立存储状态（按路径区分）
- 不修改现有路由结构

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/hooks/useListState.js` | 新建 | 状态保存/恢复 Hook |
| `src/pages/PlantsList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/ZombiesList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/Pvz2PlantsList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/Pvz2ZombiesList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/components/DetailView.jsx` | 修改 | 返回按钮触发状态保存 |
| `src/components/Pvz2DetailView.jsx` | 修改 | 返回按钮触发状态保存 |

---

### Task 1: 创建 useListState Hook

**Files:**
- Create: `src/hooks/useListState.js`

**Interfaces:**
- Produces: `useListState(defaultFilters)` hook 返回 `{ search, setSearch, filters, setFilters, saveState }`

- [ ] **Step 1: 创建 useListState Hook 文件**

```javascript
// src/hooks/useListState.js
import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_PREFIX = 'listState_'
const EXPIRY_TIME = 30 * 60 * 1000 // 30 分钟过期

export function useListState(defaultFilters = {}) {
  const location = useLocation()
  const storageKey = `${STORAGE_PREFIX}${location.pathname}`

  // 从 sessionStorage 读取保存的状态
  const getSavedState = () => {
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) return null
      const data = JSON.parse(raw)
      // 检查是否过期
      if (Date.now() - data.timestamp > EXPIRY_TIME) {
        sessionStorage.removeItem(storageKey)
        return null
      }
      return data
    } catch {
      return null
    }
  }

  const savedState = getSavedState()

  // 初始化状态
  const [search, setSearch] = useState(savedState?.search || '')
  const [filters, setFilters] = useState(savedState?.filters || defaultFilters)

  // 保存状态到 sessionStorage
  const saveState = useCallback(() => {
    try {
      const data = {
        scrollY: window.scrollY,
        search,
        filters,
        timestamp: Date.now()
      }
      sessionStorage.setItem(storageKey, JSON.stringify(data))
    } catch {
      // sessionStorage 可能已满，忽略错误
    }
  }, [storageKey, search, filters])

  // 恢复滚动位置
  useEffect(() => {
    if (savedState?.scrollY) {
      // 使用 requestAnimationFrame 确保 DOM 已渲染
      requestAnimationFrame(() => {
        window.scrollTo(0, savedState.scrollY)
      })
    }
  }, []) // 只在组件挂载时执行一次

  // 组件卸载时保存状态（用户导航到详情页面时）
  useEffect(() => {
    return () => {
      saveState()
    }
  }, [saveState])

  return {
    search,
    setSearch,
    filters,
    setFilters,
    saveState
  }
}
```

- [ ] **Step 2: 验证 Hook 文件语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/hooks/useListState.js
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/hooks/useListState.js
git commit -m "feat: add useListState hook for scroll restoration"
```

---

### Task 2: 修改 PvZ1 PlantsList 页面

**Files:**
- Modify: `src/pages/PlantsList.jsx`

**Interfaces:**
- Consumes: `useListState(defaultFilters)` hook
- Produces: 列表页面状态自动保存和恢复

- [ ] **Step 1: 修改 PlantsList.jsx 使用 useListState**

将 `src/pages/PlantsList.jsx` 修改为：

```javascript
import { useMemo } from 'react'
import { plants } from '../data/pvz1/plants.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import TabNav from '../components/TabNav.jsx'
import { useListState } from '../hooks/useListState.js'
import styles from './PlantsList.module.css'

const pvz1Tabs = [
  { to: '/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/zombies', icon: '🧟', label: '僵尸图鉴' }
]

const defaultFilters = {
  categories: [],
  sunCostRange: '',
  levelRange: '',
  sort: 'default'
}

function PlantsList() {
  const { search, setSearch, filters, setFilters } = useListState(defaultFilters)

  const filtered = useMemo(() => {
    let result = plants

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    if (filters.sunCostRange) {
      const [min, max] = filters.sunCostRange.split('-').map(s => s === '+' ? Infinity : Number(s))
      result = result.filter(p => p.sunCost >= min && p.sunCost <= max)
    }

    if (filters.levelRange) {
      const [min, max] = filters.levelRange.split('-').map(Number)
      result = result.filter(p => p.unlockLevel >= min && p.unlockLevel <= max)
    }

    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field]
        const bv = b[field]
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <TabNav tabs={pvz1Tabs} />

      <div className={styles.header}>
        <h1 className={styles.title}>🌿 植物图鉴</h1>
        <p className={styles.subtitle}>共 {plants.length} 种植物，守护你的庭院</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索植物名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {plants.length} 个结果
        </span>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        type="plant"
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🥀</div>
          <p>没有找到匹配的植物，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(plant => (
            <Card key={plant.id} data={plant} type="plant" />
          ))}
        </div>
      )}
    </div>
  )
}

export default PlantsList
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/pages/PlantsList.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/pages/PlantsList.jsx
git commit -m "feat: use useListState in PlantsList page"
```

---

### Task 3: 修改 PvZ1 ZombiesList 页面

**Files:**
- Modify: `src/pages/ZombiesList.jsx`

**Interfaces:**
- Consumes: `useListState(defaultFilters)` hook

- [ ] **Step 1: 修改 ZombiesList.jsx 使用 useListState**

将 `src/pages/ZombiesList.jsx` 修改为：

```javascript
import { useMemo } from 'react'
import { zombies, speedLabels } from '../data/pvz1/zombies.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import TabNav from '../components/TabNav.jsx'
import { useListState } from '../hooks/useListState.js'
import styles from './ZombiesList.module.css'

const pvz1Tabs = [
  { to: '/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/zombies', icon: '🧟', label: '僵尸图鉴' }
]

const defaultFilters = {
  categories: [],
  speed: '',
  sort: 'default'
}

function ZombiesList() {
  const { search, setSearch, filters, setFilters } = useListState(defaultFilters)

  const filtered = useMemo(() => {
    let result = zombies

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(z =>
        z.name.toLowerCase().includes(q) ||
        z.nameEn.toLowerCase().includes(q) ||
        z.description.toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter(z => filters.categories.includes(z.category))
    }

    if (filters.speed) {
      result = result.filter(z => z.speed === filters.speed)
    }

    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field]
        const bv = b[field]
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <TabNav tabs={pvz1Tabs} />

      <div className={styles.header}>
        <h1 className={styles.title}>🧟 僵尸图鉴</h1>
        <p className={styles.subtitle}>共 {zombies.length} 种僵尸，了解它们才能更好应对</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索僵尸名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {zombies.length} 个结果
        </span>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        type="zombie"
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🧟</div>
          <p>没有找到匹配的僵尸，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(zombie => (
            <Card key={zombie.id} data={zombie} type="zombie" />
          ))}
        </div>
      )}
    </div>
  )
}

export default ZombiesList
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/pages/ZombiesList.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/pages/ZombiesList.jsx
git commit -m "feat: use useListState in ZombiesList page"
```

---

### Task 4: 修改 PvZ2 PlantsList 页面

**Files:**
- Modify: `src/pages/Pvz2PlantsList.jsx`

**Interfaces:**
- Consumes: `useListState(defaultFilters)` hook

- [ ] **Step 1: 修改 Pvz2PlantsList.jsx 使用 useListState**

将 `src/pages/Pvz2PlantsList.jsx` 修改为：

```javascript
import { useMemo } from 'react'
import { plants } from '../data/pvz2/plants.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pvz2FilterPanel from '../components/Pvz2FilterPanel.jsx'
import TabNav from '../components/TabNav.jsx'
import { useListState } from '../hooks/useListState.js'
import styles from './Pvz2PlantsList.module.css'

const pvz2Tabs = [
  { to: '/pvz2/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/pvz2/zombies', icon: '🧟', label: '僵尸图鉴' },
  { to: '/pvz2/worlds', icon: '🌍', label: '世界探索' }
]

const defaultFilters = {
  worlds: [],
  categories: [],
  sources: [],
  sunCostRange: '',
  sort: 'default'
}

function Pvz2PlantsList() {
  const { search, setSearch, filters, setFilters } = useListState(defaultFilters)

  const filtered = useMemo(() => {
    let result = plants

    // Search by name, nameEn, description
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    // Filter by world
    if (filters.worlds && filters.worlds.length > 0) {
      result = result.filter(p => filters.worlds.includes(p.world))
    }

    // Filter by category
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // Filter by source
    if (filters.sources && filters.sources.length > 0) {
      result = result.filter(p => filters.sources.includes(p.source))
    }

    // Filter by sun cost range
    if (filters.sunCostRange) {
      const [min, max] = filters.sunCostRange.split('-').map(s => s === '+' ? Infinity : Number(s))
      result = result.filter(p => p.sunCost >= min && p.sunCost <= max)
    }

    // Sort
    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field] ?? 0
        const bv = b[field] ?? 0
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <TabNav tabs={pvz2Tabs} />

      <div className={styles.header}>
        <h1 className={styles.title}>🌿 PvZ 2 植物图鉴</h1>
        <p className={styles.subtitle}>共 {plants.length} 种植物，来自不同时空</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索植物名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {plants.length} 个结果
        </span>
      </div>

      <Pvz2FilterPanel
        filters={filters}
        onFilterChange={setFilters}
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🥀</div>
          <p>没有找到匹配的植物，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(plant => (
            <Card key={plant.id} data={plant} type="plant" gameVersion="pvz2" />
          ))}
        </div>
      )}
    </div>
  )
}

export default Pvz2PlantsList
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/pages/Pvz2PlantsList.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/pages/Pvz2PlantsList.jsx
git commit -m "feat: use useListState in Pvz2PlantsList page"
```

---

### Task 5: 修改 PvZ2 ZombiesList 页面

**Files:**
- Modify: `src/pages/Pvz2ZombiesList.jsx`

**Interfaces:**
- Consumes: `useListState(defaultFilters)` hook

- [ ] **Step 1: 修改 Pvz2ZombiesList.jsx 使用 useListState**

将 `src/pages/Pvz2ZombiesList.jsx` 修改为：

```javascript
import { useMemo } from 'react'
import { zombies } from '../data/pvz2/zombies.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pvz2FilterPanel from '../components/Pvz2FilterPanel.jsx'
import TabNav from '../components/TabNav.jsx'
import { useListState } from '../hooks/useListState.js'
import styles from './Pvz2ZombiesList.module.css'

const pvz2Tabs = [
  { to: '/pvz2/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/pvz2/zombies', icon: '🧟', label: '僵尸图鉴' },
  { to: '/pvz2/worlds', icon: '🌍', label: '世界探索' }
]

const defaultFilters = {
  worlds: [],
  categories: [],
  sources: [],
  speed: '',
  sort: 'default'
}

function Pvz2ZombiesList() {
  const { search, setSearch, filters, setFilters } = useListState(defaultFilters)

  const filtered = useMemo(() => {
    let result = zombies

    // 搜索：名称、英文名、描述
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(z =>
        z.name.toLowerCase().includes(q) ||
        z.nameEn.toLowerCase().includes(q) ||
        (z.description && z.description.toLowerCase().includes(q))
      )
    }

    // 按世界筛选
    if (filters.worlds && filters.worlds.length > 0) {
      result = result.filter(z => filters.worlds.includes(z.world))
    }

    // 按分类筛选
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(z => filters.categories.includes(z.category))
    }

    // 按来源筛选
    if (filters.sources && filters.sources.length > 0) {
      result = result.filter(z => filters.sources.includes(z.source))
    }

    // 按速度筛选
    if (filters.speed) {
      result = result.filter(z => z.speed === filters.speed)
    }

    // 排序
    if (filters.sort && filters.sort !== 'default') {
      const [field, order] = filters.sort.split('-')
      result = [...result].sort((a, b) => {
        const av = a[field] ?? ''
        const bv = b[field] ?? ''
        if (typeof av === 'string' && typeof bv === 'string') {
          return order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
        }
        return order === 'asc' ? av - bv : bv - av
      })
    }

    return result
  }, [search, filters])

  return (
    <div className={styles.page}>
      <TabNav tabs={pvz2Tabs} />

      <div className={styles.header}>
        <h1 className={styles.title}>🧟 PvZ 2 僵尸图鉴</h1>
        <p className={styles.subtitle}>共 {zombies.length} 种僵尸，来自不同时空</p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="搜索僵尸名称..."
        />
        <span className={styles.count}>
          显示 {filtered.length} / {zombies.length} 个结果
        </span>
      </div>

      <Pvz2FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        type="zombie"
      />

      <div style={{ height: 'var(--space-lg)' }} />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🧟</div>
          <p>没有找到匹配的僵尸，试试其他关键词或重置筛选</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(zombie => (
            <Card key={zombie.id} data={zombie} type="zombie" gameVersion="pvz2" />
          ))}
        </div>
      )}
    </div>
  )
}

export default Pvz2ZombiesList
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/pages/Pvz2ZombiesList.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/pages/Pvz2ZombiesList.jsx
git commit -m "feat: use useListState in Pvz2ZombiesList page"
```

---

### Task 6: 修改 DetailView 返回按钮

**Files:**
- Modify: `src/components/DetailView.jsx`

**Interfaces:**
- 使用 `navigate(-1)` 返回上一页，触发浏览器的后退功能，自动恢复滚动位置

- [ ] **Step 1: 修改 DetailView.jsx 的返回按钮**

在 `src/components/DetailView.jsx` 中，将返回按钮从 `<Link>` 改为使用 `navigate(-1)`：

```javascript
import { getImagePath } from '../utils/imagePath.js'
import { useNavigate } from 'react-router-dom'
import { useSpeech } from '../hooks/useSpeech.js'
import styles from './DetailView.module.css'

function DetailView({ data, list, type }) {
  const navigate = useNavigate()
  const { speak, stop, isSpeaking } = useSpeech()
  const isPlant = type === 'plant'
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null
  const listPath = isPlant ? '/plants' : '/zombies'
  const detailClass = isPlant
    ? `${styles.detail} ${styles.detailPlant}`
    : `${styles.detail} ${styles.detailZombie}`

  const handleBack = () => navigate(-1)
  const handlePrev = () => prevItem && navigate(`${listPath}/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`${listPath}/${nextItem.id}`)

  return (
    <div>
      <button onClick={handleBack} className={styles.backBtn}>
        ← 返回图鉴
      </button>

      <div className={detailClass}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={getImagePath(data.image)}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = isPlant
                ? getImagePath('/images/pvz1/plants/_placeholder.svg')
                : getImagePath('/images/pvz1/zombies/_placeholder.svg')
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 className={styles.title}>{data.name}</h1>
            <button
              className={`${styles.speechBtn} ${isSpeaking ? styles.speaking : ''}`}
              onClick={() => {
                if (isSpeaking) {
                  stop()
                } else {
                  const audioPath = `pvz1/${isPlant ? 'plants' : 'zombies'}/${data.id}`
                  speak(audioPath)
                }
              }}
            >
              {isSpeaking ? '⏹ 停止' : '🔊 朗读'}
            </button>
          </div>
          <span className={styles.nameEn}>{data.nameEn}</span>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.statsGrid}>
            {isPlant ? (
              <>
                <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
                <StatBox label="冷却时间" value={data.recharge} unit="秒" />
                <StatBox label="伤害" value={data.damage} unit="💥" />
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击范围" value={data.range} />
                <StatBox label="解锁关卡" value={data.unlockLevel} />
              </>
            ) : (
              <>
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击力" value={data.damage} unit="⚔️" />
                <StatBox label="移动速度" value={
                  data.speed === 'slow' ? '慢' : data.speed === 'medium' ? '中' : '快'
                } />
                <StatBox label="首次出现" value={`第 ${data.firstAppearance} 关`} />
                <StatBox label="弱点" value={data.weakness} />
              </>
            )}
          </div>

          <div className={styles.navigation}>
            {prevItem ? (
              <button onClick={handlePrev} className={styles.navBtn}>
                ← {prevItem.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextItem ? (
              <button onClick={handleNext} className={styles.navBtn}>
                {nextItem.name} →
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
      </div>
    </div>
  )
}

export default DetailView
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/components/DetailView.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/components/DetailView.jsx
git commit -m "feat: use navigate(-1) for back button in DetailView"
```

---

### Task 7: 修改 Pvz2DetailView 返回按钮

**Files:**
- Modify: `src/components/Pvz2DetailView.jsx`

**Interfaces:**
- 使用 `navigate(-1)` 返回上一页，触发浏览器的后退功能，自动恢复滚动位置

- [ ] **Step 1: 修改 Pvz2DetailView.jsx 的返回按钮**

在 `src/components/Pvz2DetailView.jsx` 中，将返回按钮从 `<Link>` 改为使用 `navigate(-1)`：

```javascript
import { getImagePath } from '../utils/imagePath.js'
import { useNavigate } from 'react-router-dom'
import styles from './Pvz2DetailView.module.css'
import UpgradeInfo from './UpgradeInfo.jsx'
import { useSpeech } from '../hooks/useSpeech.js'

const speedLabels = {
  slow: '慢速',
  medium: '中速',
  fast: '快速'
}

const worldNames = {
  modern_day: '摩登时代',
  ancient_egypt: '古埃及',
  pirate_seas: '海盗港湾',
  wild_west: '狂野西部',
  frostbite_caves: '冰河世界',
  lost_city: '失落之城',
  far_future: '未来世界',
  dark_ages: '黑暗时代',
  neon_mixtape_tour: '摇滚年代',
  jurassic_marsh: '侏罗纪沼泽',
  big_wave_beach: '巨浪沙滩',
  power_mints: '薄荷家族'
}

function Pvz2DetailView({ data, list, type = 'plant' }) {
  const navigate = useNavigate()
  const { speak, stop, isSpeaking } = useSpeech()
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null

  const basePath = type === 'zombie' ? '/pvz2/zombies' : '/pvz2/plants'

  const handleBack = () => navigate(-1)
  const handlePrev = () => prevItem && navigate(`${basePath}/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`${basePath}/${nextItem.id}`)

  return (
    <div>
      <button onClick={handleBack} className={styles.backBtn}>
        ← 返回图鉴
      </button>

      <div className={styles.detail}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={getImagePath(data.image)}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = type === 'zombie'
                ? getImagePath('/images/pvz2/zombies/_placeholder.svg')
                : getImagePath('/images/pvz2/plants/_placeholder.svg')
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 className={styles.title}>{data.name}</h1>
            <button
              className={`${styles.speechBtn} ${isSpeaking ? styles.speaking : ''}`}
              onClick={() => {
                if (isSpeaking) {
                  stop()
                } else {
                  const audioPath = `pvz2/${type === 'zombie' ? 'zombies' : 'plants'}/${data.id}`
                  speak(audioPath)
                }
              }}
            >
              {isSpeaking ? '⏹ 停止' : '🔊 朗读'}
            </button>
          </div>
          <span className={styles.nameEn}>{data.nameEn}</span>

          {data.world && (
            <span className={styles.worldBadge}>
              {worldNames[data.world] || data.world}
            </span>
          )}

          {data.source === 'china' && (
            <span className={`${styles.sourceBadge} ${styles.sourceChina}`}>🇨🇳 中国版独占</span>
          )}

          <p className={styles.description}>{data.description || '暂无描述'}</p>

          {type === 'zombie' ? (
            <div className={styles.statsGrid}>
              <StatBox label="生命值" value={data.health} unit="❤️" />
              <StatBox label="伤害" value={data.damage} unit="⚔️" />
              <StatBox label="速度" value={speedLabels[data.speed] || data.speed} />
              {data.firstAppearance && <StatBox label="首次出现" value={data.firstAppearance} />}
              {data.weakness && <StatBox label="弱点" value={data.weakness} />}
              {data.special && <StatBox label="特殊能力" value={data.special} />}
            </div>
          ) : (
            <>
              <div className={styles.statsGrid}>
                <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
                <StatBox label="冷却时间" value={data.recharge} unit="秒" />
                <StatBox label="伤害" value={data.damage} unit="💥" />
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击范围" value={data.range} />
                <StatBox label="解锁关卡" value={data.unlockLevel} />
              </div>

              {data.plantFoodEffect && (
                <div className={styles.plantFoodSection}>
                  <h3 className={styles.plantFoodTitle}>能量豆效果</h3>
                  <p className={styles.plantFoodText}>{data.plantFoodEffect}</p>
                </div>
              )}

              <UpgradeInfo
                upgradeable={data.upgradeable}
                maxUpgradeLevel={data.maxUpgradeLevel}
                upgradeEffect={data.upgradeEffect}
              />
            </>
          )}

          <div className={styles.navigation}>
            {prevItem ? (
              <button onClick={handlePrev} className={styles.navBtn}>
                ← {prevItem.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextItem ? (
              <button onClick={handleNext} className={styles.navBtn}>
                {nextItem.name} →
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
      </div>
    </div>
  )
}

export default Pvz2DetailView
```

- [ ] **Step 2: 验证语法**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/components/Pvz2DetailView.jsx
```

Expected: 无输出（语法正确）

- [ ] **Step 3: 提交**

```bash
git add src/components/Pvz2DetailView.jsx
git commit -m "feat: use navigate(-1) for back button in Pvz2DetailView"
```

---

### Task 8: 验证并提交所有更改

**Files:**
- 无新文件

- [ ] **Step 1: 启动开发服务器验证功能**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && npm run dev
```

在浏览器中测试：
1. 访问植物列表页面
2. 滚动到某个位置
3. 点击一个植物卡片进入详情页面
4. 点击"返回图鉴"按钮
5. 验证滚动位置已恢复
6. 验证搜索关键词和筛选条件已恢复

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
git commit -m "feat: implement scroll position restoration for list pages"
```
