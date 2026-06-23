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
