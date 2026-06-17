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
