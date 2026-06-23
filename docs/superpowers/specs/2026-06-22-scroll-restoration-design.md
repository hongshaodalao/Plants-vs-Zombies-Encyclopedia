# 滚动位置恢复设计文档

## 概述

实现列表页面的滚动位置、搜索关键词和筛选条件的保存与恢复功能。当用户从详情页面返回列表页面时，能够恢复到离开时的状态。

## 需求

- 保存并恢复列表页面的滚动位置
- 保存并恢复搜索关键词
- 保存并恢复筛选条件（分类、阳光消耗范围、排序等）
- 数据在浏览器标签页关闭后自动清除

## 技术方案

使用 `sessionStorage` 保存列表页面状态，创建自定义 Hook `useListState` 封装状态管理逻辑。

### 数据结构

```javascript
// sessionStorage 键名格式
`listState_${pathname}`

// 存储的数据结构
{
  scrollY: 1234,           // 滚动位置（像素）
  search: "豌豆",          // 搜索关键词
  filters: {               // 筛选条件
    categories: ["shooter"],
    sunCostRange: "100-200",
    levelRange: "1-10",
    sort: "sunCost-asc"
  },
  timestamp: 1719081600000 // 时间戳，用于清理过期数据
}
```

### 核心实现

#### 1. useListState Hook

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
  const savedState = (() => {
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
  })()

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
    savedState,
    saveState
  }
}
```

#### 2. 修改列表页面

以 `PlantsList.jsx` 为例：

```javascript
import { useListState } from '../hooks/useListState.js'

const defaultFilters = {
  categories: [],
  sunCostRange: '',
  levelRange: '',
  sort: 'default'
}

function PlantsList() {
  const { search, setSearch, filters, setFilters } = useListState(defaultFilters)

  // ... 其余逻辑不变
}
```

#### 3. 修改详情页面

使用 `navigate(-1)` 替代 `<Link to={listPath}>`：

```javascript
// 返回按钮改为使用 navigate(-1)
const handleBack = () => navigate(-1)

// 或者保持 Link 但使用 onClick 保存状态
<Link to={listPath} onClick={() => saveState()}>
  ← 返回图鉴
</Link>
```

### 涉及文件

| 文件 | 修改类型 | 说明 |
|------|----------|------|
| `src/hooks/useListState.js` | 新建 | 状态保存/恢复 Hook |
| `src/pages/PlantsList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/ZombiesList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/Pvz2PlantsList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/pages/Pvz2ZombiesList.jsx` | 修改 | 使用 Hook 管理状态 |
| `src/components/DetailView.jsx` | 修改 | 返回时触发状态恢复 |
| `src/components/Pvz2DetailView.jsx` | 修改 | 返回时触发状态恢复 |

### 边界情况处理

1. **sessionStorage 已满**：捕获异常，静默失败
2. **数据过期**：30 分钟后自动清除，避免占用存储空间
3. **页面刷新**：状态仍然保留（sessionStorage 在刷新后不丢失）
4. **多个标签页**：每个标签页有独立的 sessionStorage
5. **直接访问详情页面**：没有保存的状态，使用默认值

## 验证标准

- [ ] 从列表页面点击卡片进入详情页面
- [ ] 从详情页面返回列表页面
- [ ] 验证滚动位置已恢复
- [ ] 验证搜索关键词已恢复
- [ ] 验证筛选条件已恢复
- [ ] 验证刷新页面后状态仍然保留
- [ ] 验证关闭标签页后状态被清除
