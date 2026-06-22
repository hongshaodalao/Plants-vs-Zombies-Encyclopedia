# Task 9: 实现 PlantsList 页面（带搜索、筛选）

**Files:**
- Modify: `src/pages/PlantsList.jsx`（完整替换）
- Create: `src/pages/PlantsList.module.css`

## Step 1: 编写 `src/pages/PlantsList.module.css`

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
  font-size: var(--font-size-base);
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

## Step 2: 编写 `src/pages/PlantsList.jsx`

```javascript
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
```

## Step 3: 验证

运行 `npm run dev`（后台），访问 `/plants`，预期：
- 顶部显示搜索框和筛选面板
- 输入"豌豆"经过 300ms 后筛选出豌豆射手
- 勾选"射手类"只显示射手类植物
- 阳光消耗选择"51-100"只显示对应范围的植物
- 排序按阳光消耗升序工作
- 没有任何结果时显示"没有找到匹配"提示

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/pages/PlantsList.jsx src/pages/PlantsList.module.css
git commit -m "feat(plants-list): implement plant list page with search and filters"
```

## 重要约束

- 仅修改 `src/pages/PlantsList.jsx`（完整替换 Task 6 留下的版本）和新建 `src/pages/PlantsList.module.css`
- 不修改其他文件
- 必须包含搜索（useState 维护）、筛选（FilterPanel + useMemo 过滤逻辑）、排序（按 sort 字段动态解析）
- 搜索范围：中文名称、英文名称、description 字段（都做 lowercase 比较）
- 筛选条件之间是 AND 关系
- 排序方向：'asc' 升序，'desc' 降序，'default' 保持原顺序
- 阳光消耗范围解析时 `'200+'` 转换为 Infinity（比较用 `<= Infinity` 包含所有）
- 空结果显示友好提示而非空白
- 使用 useMemo 优化性能
- 提交时只包含 PlantsList.jsx 和 PlantsList.module.css
