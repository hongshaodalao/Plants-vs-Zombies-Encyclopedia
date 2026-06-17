import { useState, useMemo } from 'react'
import { zombies, speedLabels } from '../data/pvz1/zombies.js'
import Card from '../components/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import styles from './ZombiesList.module.css'

function ZombiesList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    categories: [],
    speed: '',
    sort: 'default'
  })

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
