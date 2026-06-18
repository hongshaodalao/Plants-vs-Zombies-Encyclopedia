# Task 10: 实现 ZombiesList 页面

**Files:**
- Modify: `src/pages/ZombiesList.jsx`（完整替换）
- Create: `src/pages/ZombiesList.module.css`

## Step 1: 编写 `src/pages/ZombiesList.module.css`

```css
.page {
  animation: fadeIn 0.4s ease;
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

.toolbar {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
  align-items: center;
}

.count {
  color: var(--color-text-light);
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-md);
}

.empty {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-light);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
}

.emptyIcon {
  font-size: 4rem;
  margin-bottom: var(--space-md);
}
```

## Step 2: 编写 `src/pages/ZombiesList.jsx`

```javascript
import { useState, useMemo } from 'react'
import { zombies, speedLabels } from '../data/zombies.js'
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
```

## Step 3: 验证

运行 `npm run dev`（后台），访问 `/zombies`，预期：
- 显示 8 个僵尸卡片
- 搜索"铁桶"经过 300ms 后筛选出铁桶僵尸
- 移动速度选择"快"只显示快速僵尸
- 排序按生命值升降序工作

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/pages/ZombiesList.jsx src/pages/ZombiesList.module.css
git commit -m "feat(zombies-list): implement zombie list page with search and filters"
```

## 重要约束

- 仅修改 `src/pages/ZombiesList.jsx`（完整替换 Task 6 留下的版本）和新建 `src/pages/ZombiesList.module.css`
- 不修改其他文件
- 与 PlantsList 平行结构，但筛选条件不同：
  - 植物版有 sunCostRange + levelRange
  - 僵尸版只有 speed（single select，非范围）
- 搜索范围：name + nameEn + description
- 排序字段：health / damage / firstAppearance
- 提交时只包含 ZombiesList.jsx 和 ZombiesList.module.css
- 使用 brief 中的精确代码
