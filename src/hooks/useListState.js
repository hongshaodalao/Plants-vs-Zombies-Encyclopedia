// src/hooks/useListState.js
import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_PREFIX = 'listState_'
const EXPIRY_TIME = 30 * 60 * 1000 // 30 分钟过期

export function useListState(defaultFilters = {}) {
  const location = useLocation()
  const storageKey = `${STORAGE_PREFIX}${location.pathname}`

  // 从 sessionStorage 读取保存的状态
  const getSavedState = useCallback(() => {
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
  }, [storageKey])

  const savedState = getSavedState()

  // 初始化状态
  const [search, setSearch] = useState(savedState?.search || '')
  const [filters, setFilters] = useState(savedState?.filters || defaultFilters)

  // 保存当前状态到 sessionStorage
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

  // 监听滚动事件，实时保存滚动位置
  useEffect(() => {
    let scrollTimeout = null
    const handleScroll = () => {
      // 防抖：滚动停止 300ms 后保存
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        try {
          const data = {
            scrollY: window.scrollY,
            search,
            filters,
            timestamp: Date.now()
          }
          sessionStorage.setItem(storageKey, JSON.stringify(data))
        } catch {
          // 忽略错误
        }
      }, 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [storageKey, search, filters])

  // 恢复滚动位置
  useEffect(() => {
    if (savedState?.scrollY) {
      // 使用 setTimeout 确保 DOM 已完全渲染
      const timer = setTimeout(() => {
        window.scrollTo(0, savedState.scrollY)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, []) // 只在组件挂载时执行一次

  return {
    search,
    setSearch,
    filters,
    setFilters,
    saveState
  }
}
