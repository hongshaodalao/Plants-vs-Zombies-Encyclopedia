import styles from './FilterPanel.module.css'

function FilterPanel({ filters, onFilterChange, type }) {
  const isPlant = type === 'plant'

  const categories = isPlant
    ? [
        { value: 'shooter', label: '射手类' },
        { value: 'explosive', label: '爆炸类' },
        { value: 'defensive', label: '防御类' },
        { value: 'support', label: '辅助类' }
      ]
    : [
        { value: 'basic', label: '基础类' },
        { value: 'cone', label: '路障类' },
        { value: 'bucket', label: '铁桶类' },
        { value: 'special', label: '特殊类' }
      ]

  const sunCostRanges = [
    { value: '0-50', label: '0-50', min: 0, max: 50 },
    { value: '51-100', label: '51-100', min: 51, max: 100 },
    { value: '101-200', label: '101-200', min: 101, max: 200 },
    { value: '200+', label: '200+', min: 201, max: Infinity }
  ]

  const levelRanges = [
    { value: '1-10', label: '1-10', min: 1, max: 10 },
    { value: '11-20', label: '11-20', min: 11, max: 20 },
    { value: '21-30', label: '21-30', min: 21, max: 30 },
    { value: '31-50', label: '31-50', min: 31, max: 50 }
  ]

  const speedOptions = [
    { value: 'slow', label: '慢' },
    { value: 'medium', label: '中' },
    { value: 'fast', label: '快' }
  ]

  const sortOptions = isPlant
    ? [
        { value: 'sunCost-asc', label: '阳光消耗 ↑' },
        { value: 'sunCost-desc', label: '阳光消耗 ↓' },
        { value: 'damage-asc', label: '伤害 ↑' },
        { value: 'damage-desc', label: '伤害 ↓' },
        { value: 'unlockLevel-asc', label: '解锁关卡 ↑' },
        { value: 'unlockLevel-desc', label: '解锁关卡 ↓' }
      ]
    : [
        { value: 'health-asc', label: '生命值 ↑' },
        { value: 'health-desc', label: '生命值 ↓' },
        { value: 'damage-asc', label: '攻击力 ↑' },
        { value: 'damage-desc', label: '攻击力 ↓' },
        { value: 'firstAppearance-asc', label: '首次出现 ↑' },
        { value: 'firstAppearance-desc', label: '首次出现 ↓' }
      ]

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
    onFilterChange({ categories: [], sunCostRange: '', levelRange: '', speed: '', sort: 'default' })
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

      {isPlant && (
        <>
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
          <div className={styles.group}>
            <span className={styles.label}>解锁关卡</span>
            <select
              className={styles.select}
              value={filters.levelRange || ''}
              onChange={(e) => handleRangeChange('levelRange', e.target.value)}
            >
              <option value="">全部</option>
              {levelRanges.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {!isPlant && (
        <div className={styles.group}>
          <span className={styles.label}>移动速度</span>
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

export default FilterPanel
