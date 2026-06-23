# Task 1: 创建 useListState Hook

## 任务说明

创建一个自定义 Hook `useListState`，封装列表页面的状态保存和恢复逻辑。

## 文件操作

- Create: `src/hooks/useListState.js`

## 接口说明

- Produces: `useListState(defaultFilters)` hook 返回 `{ search, setSearch, filters, setFilters, saveState }`

## 实现步骤

### Step 1: 创建 useListState Hook 文件

```javascript
// src/hooks/useListState.js
import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_PREFIX = 'listState_'
const EXPIRY_TIME = 30 * 60 * 1000 // 30 分钟过期

export function useListState(defaultFilters = {}) {
  const location = useLocation()
  const storageKey = `${STORAGE_PREFIX}${location.pathname}`

  // 从 sessionStorage 读取保存的状态
  const getSavedState = () => {
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) return null
      const data = JSON.parse(raw)
      // 检查是否过期
      if (Date.now() - data.timestamp > EXPIRY_TIME) {
        sessionStorage.removeItem(storageKey)
        return null
      }
      return data
    } catch {
      return null
    }
  }

  const savedState = getSavedState()

  // 初始化状态
  const [search, setSearch] = useState(savedState?.search || '')
  const [filters, setFilters] = useState(savedState?.filters || defaultFilters)

  // 保存状态到 sessionStorage
  const saveState = useCallback(() => {
    try {
      const data = {
        scrollY: window.scrollY,
        search,
        filters,
        timestamp: Date.now()
      }
      sessionStorage.setItem(storageKey, JSON.stringify(data))
    } catch {
      // sessionStorage 可能已满，忽略错误
    }
  }, [storageKey, search, filters])

  // 恢复滚动位置
  useEffect(() => {
    if (savedState?.scrollY) {
      // 使用 requestAnimationFrame 确保 DOM 已渲染
      requestAnimationFrame(() => {
        window.scrollTo(0, savedState.scrollY)
      })
    }
  }, []) // 只在组件挂载时执行一次

  // 组件卸载时保存状态（用户导航到详情页面时）
  useEffect(() => {
    return () => {
      saveState()
    }
  }, [saveState])

  return {
    search,
    setSearch,
    filters,
    setFilters,
    saveState
  }
}
```

### Step 2: 验证 Hook 文件语法

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia" && node --check src/hooks/useListState.js
```

Expected: 无输出（语法正确）

### Step 3: 提交

```bash
git add src/hooks/useListState.js
git commit -m "feat: add useListState hook for scroll restoration"
```

## 全局约束

- 使用 `sessionStorage` 存储状态，标签页关闭后自动清除
- 存储数据 30 分钟后过期
- 每个列表页面独立存储状态（按路径区分）
