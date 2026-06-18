import { useState, useMemo } from 'react'
import { plants } from '../data/pvz2/plants.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pvz2FilterPanel from '../components/Pvz2FilterPanel.jsx'
import TabNav from '../components/TabNav.jsx'
import styles from './Pvz2PlantsList.module.css'

const pvz2Tabs = [
  { to: '/pvz2/plants', icon: '🌿', label: '植物图鉴' },
  { to: '/pvz2/zombies', icon: '🧟', label: '僵尸图鉴' },
  { to: '/pvz2/worlds', icon: '🌍', label: '世界探索' }
]

function Pvz2PlantsList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    worlds: [],
    categories: [],
    sources: [],
    sunCostRange: '',
    sort: 'default'
  })

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
