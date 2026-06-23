// src/hooks/useListState.js
import { useState, useEffect, useRef } from 'react'
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

  // 使用 ref 保存最新的 search 和 filters，以便在卸载时获取
  const searchRef = useRef(search)
  const filtersRef = useRef(filters)

  useEffect(() => {
    searchRef.current = search
  }, [search])

  useEffect(() => {
    filtersRef.current = filters
  }, [filters])

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
      try {
        const data = {
          scrollY: window.scrollY,
          search: searchRef.current,
          filters: filtersRef.current,
          timestamp: Date.now()
        }
        sessionStorage.setItem(storageKey, JSON.stringify(data))
      } catch {
        // sessionStorage 可能已满，忽略错误
      }
    }
  }, [storageKey])

  return {
    search,
    setSearch,
    filters,
    setFilters
  }
}
