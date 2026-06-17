import { useState, useMemo } from 'react'
import { plants } from '../data/plants.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import styles from './PlantsList.module.css'

function PlantsList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    categories: [],
    sunCostRange: '',
    levelRange: '',
    sort: 'default'
  })

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
