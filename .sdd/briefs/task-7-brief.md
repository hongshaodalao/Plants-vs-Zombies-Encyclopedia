# Task 7: 实现 SearchBar 组件（带防抖）

**Files:**
- Create: `src/components/SearchBar.jsx`
- Create: `src/components/SearchBar.module.css`

## Step 1: 编写 `src/components/SearchBar.module.css`

```css
.searchBar {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem;
  font-size: var(--font-size-base);
  font-family: inherit;
  border: 2px solid var(--color-grass-dark);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  outline: none;
  transition: var(--transition);
}

.input:focus {
  border-color: var(--color-sun);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
}

.icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  pointer-events: none;
  color: var(--color-text-secondary);
}

.clearBtn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-text-secondary);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  line-height: 1;
  transition: var(--transition);
}

.clearBtn:hover {
  background: var(--color-text-primary);
}
```

## Step 2: 编写 `src/components/SearchBar.jsx`

```javascript
import { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange, placeholder = '搜索...' }) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localValue, value, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={styles.searchBar}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
      />
      {localValue && (
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="清除搜索"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
```

## Step 3: 提交

```bash
git add src/components/SearchBar.jsx src/components/SearchBar.module.css
git commit -m "feat(search): add SearchBar with 300ms debounce"
```

## 重要约束

- 仅创建 2 个文件：SearchBar.jsx 和 SearchBar.module.css
- 不修改其他文件
- 不在 PlantsList/ZombiesList 中使用（本任务只创建组件，下游任务 9/10 才集成）
- 防抖时间固定 300ms
- 默认 placeholder 为 "搜索..."
- 清除按钮在输入框有值时显示，点击时清空 local 和 onChange
- 使用 useState 维护本地输入，useEffect 同步外部 value prop
