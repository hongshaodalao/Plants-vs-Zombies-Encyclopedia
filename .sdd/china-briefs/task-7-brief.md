# Task 7: UI 更新 - 筛选面板来源筛选

**Files:**
- Modify: `src/components/Pvz2FilterPanel.jsx`
- Modify: `src/pages/Pvz2PlantsList.jsx`
- Modify: `src/pages/Pvz2ZombiesList.jsx`

## 任务目标

在 PvZ 2 筛选面板中添加"来源"筛选项，支持按国际版/中国版筛选。

## Step 1: 更新 Pvz2FilterPanel.jsx 添加来源筛选

在 `src/components/Pvz2FilterPanel.jsx` 中，添加来源筛选选项：

```javascript
const sourceOptions = [
  { value: 'international', label: '国际版' },
  { value: 'china', label: '中国版' }
]
```

在筛选面板中添加来源筛选组：

```jsx
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
```

添加 `toggleSource` 函数：

```javascript
const toggleSource = (value) => {
  const current = filters.sources || []
  const next = current.includes(value)
    ? current.filter(v => v !== value)
    : [...current, value]
  onFilterChange({ ...filters, sources: next })
}
```

## Step 2: 更新 Pvz2PlantsList.jsx 支持来源筛选

在 `src/pages/Pvz2PlantsList.jsx` 的筛选逻辑中添加来源筛选：

```javascript
// 筛选来源
if (filters.sources && filters.sources.length > 0) {
  result = result.filter(p => filters.sources.includes(p.source))
}
```

同时更新 filters 初始状态，添加 `sources: []`。

## Step 3: 更新 Pvz2ZombiesList.jsx 支持来源筛选

同样为僵尸列表页添加来源筛选逻辑。

## Step 4: 验证

运行 `npm run dev`（后台），在 PvZ 2 植物列表页：
- 勾选"中国版"筛选项，确认只显示中国版植物
- 勾选"国际版"筛选项，确认只显示国际版植物
- 取消所有勾选，确认显示全部植物

完成后停止 dev 服务器。

## Step 5: 提交

```bash
git add src/components/Pvz2FilterPanel.jsx src/pages/Pvz2PlantsList.jsx src/pages/Pvz2ZombiesList.jsx
git commit -m "feat(filter): add source filter for China version content"
```

## 重要约束

- 只修改筛选面板和列表页，不修改其他组件
- 来源筛选是多选（国际版和中国版可以同时勾选）
- 来源筛选与其他筛选条件是 AND 关系
- 使用 CSS Modules 样式隔离
- 不修改数据文件
