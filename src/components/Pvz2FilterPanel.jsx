import styles from './Pvz2FilterPanel.module.css'

function Pvz2FilterPanel({ filters, onFilterChange, type = 'plant' }) {
  const worlds = [
    { value: 'modern_day', label: '摩登时代' },
    { value: 'ancient_egypt', label: '古埃及' },
    { value: 'pirate_seas', label: '海盗港湾' },
    { value: 'wild_west', label: '狂野西部' },
    { value: 'frostbite_caves', label: '冰河世界' },
    { value: 'lost_city', label: '失落之城' },
    { value: 'far_future', label: '未来世界' },
    { value: 'dark_ages', label: '黑暗时代' },
    { value: 'neon_mixtape_tour', label: '摇滚年代' },
    { value: 'jurassic_marsh', label: '侏罗纪沼泽' },
    { value: 'big_wave_beach', label: '巨浪沙滩' },
    { value: 'power_mints', label: '薄荷家族' }
  ]

  const plantCategories = [
    { value: 'shooter', label: '射手类' },
    { value: 'explosive', label: '爆炸类' },
    { value: 'defensive', label: '防御类' },
    { value: 'support', label: '辅助类' }
  ]

  const zombieCategories = [
    { value: 'basic', label: '普通类' },
    { value: 'cone', label: '路障类' },
    { value: 'bucket', label: '铁桶类' },
    { value: 'special', label: '特殊类' }
  ]

  const categories = type === 'zombie' ? zombieCategories : plantCategories

  const sunCostRanges = [
    { value: '0-50', label: '0-50' },
    { value: '51-100', label: '51-100' },
    { value: '101-150', label: '101-150' },
    { value: '151-200', label: '151-200' },
    { value: '200+', label: '200+' }
  ]

  const sourceOptions = [
    { value: 'international', label: '国际版' },
    { value: 'china', label: '中国版' }
  ]

  const speedOptions = [
    { value: 'slow', label: '慢速' },
    { value: 'medium', label: '中速' },
    { value: 'fast', label: '快速' }
  ]

  const plantSortOptions = [
    { value: 'sunCost-asc', label: '阳光消耗 ↑' },
    { value: 'sunCost-desc', label: '阳光消耗 ↓' },
    { value: 'damage-asc', label: '伤害 ↑' },
    { value: 'damage-desc', label: '伤害 ↓' },
    { value: 'health-asc', label: '生命值 ↑' },
    { value: 'health-desc', label: '生命值 ↓' }
  ]

  const zombieSortOptions = [
    { value: 'health-asc', label: '生命值 ↑' },
    { value: 'health-desc', label: '生命值 ↓' },
    { value: 'damage-asc', label: '伤害 ↑' },
    { value: 'damage-desc', label: '伤害 ↓' },
    { value: 'firstAppearance-asc', label: '首次出现 ↑' },
    { value: 'firstAppearance-desc', label: '首次出现 ↓' }
  ]

  const sortOptions = type === 'zombie' ? zombieSortOptions : plantSortOptions

  const toggleWorld = (value) => {
    const current = filters.worlds || []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...filters, worlds: next })
  }

  const toggleSource = (value) => {
    const current = filters.sources || []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...filters, sources: next })
  }

  const toggleCategory = (value) => {
    const current = filters.categories || []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...filters, categories: next })
  }

  const handleRangeChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value })
  }

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value })
  }

  const handleReset = () => {
    onFilterChange({
      worlds: [],
      categories: [],
      sources: [],
      sunCostRange: '',
      speed: '',
      sort: 'default'
    })
  }

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <span className={styles.label}>分类</span>
        <div className={styles.options}>
          {categories.map(cat => {
            const active = (filters.categories || []).includes(cat.value)
            return (
              <label
                key={cat.value}
                className={`${styles.checkbox} ${active ? styles.checkboxActive : ''}`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleCategory(cat.value)}
                />
                {cat.label}
              </label>
            )
          })}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>来源</span>
        <div className={styles.options}>
          {sourceOptions.map(src => {
            const active = (filters.sources || []).includes(src.value)
            return (
              <label
                key={src.value}
                className={`${styles.checkbox} ${active ? styles.checkboxActive : ''}`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleSource(src.value)}
                />
                {src.label}
              </label>
            )
          })}
        </div>
      </div>

      <div className={`${styles.group} ${styles.groupWide}`}>
        <span className={styles.label}>世界</span>
        <select
          className={styles.select}
          value={(filters.worlds && filters.worlds.length === 1) ? filters.worlds[0] : ''}
          onChange={(e) => {
            if (e.target.value) {
              onFilterChange({ ...filters, worlds: [e.target.value] })
            } else {
              onFilterChange({ ...filters, worlds: [] })
            }
          }}
        >
          <option value="">全部</option>
          {worlds.map(w => (
            <option key={w.value} value={w.value}>{w.label}</option>
          ))}
        </select>
      </div>

      {type === 'zombie' ? (
        <div className={styles.group}>
          <span className={styles.label}>速度</span>
          <select
            className={styles.select}
            value={filters.speed || ''}
            onChange={(e) => handleRangeChange('speed', e.target.value)}
          >
            <option value="">全部</option>
            {speedOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.group}>
          <span className={styles.label}>阳光消耗</span>
          <select
            className={styles.select}
            value={filters.sunCostRange || ''}
            onChange={(e) => handleRangeChange('sunCostRange', e.target.value)}
          >
            <option value="">全部</option>
            {sunCostRanges.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.group}>
        <span className={styles.label}>排序</span>
        <select
          className={styles.select}
          value={filters.sort || 'default'}
          onChange={handleSortChange}
        >
          <option value="default">默认</option>
          {sortOptions.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        重置筛选
      </button>
    </div>
  )
}

export default Pvz2FilterPanel
