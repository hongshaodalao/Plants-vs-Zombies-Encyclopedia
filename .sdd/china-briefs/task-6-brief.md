# Task 6: UI 更新 - 详情页来源信息

**Files:**
- Modify: `src/components/Pvz2DetailView.jsx`
- Modify: `src/components/Pvz2DetailView.module.css`

## 任务目标

在 PvZ 2 详情页中显示来源信息，中国版内容显示"🇨🇳 中国版独占"标签。

## Step 1: 更新 Pvz2DetailView.module.css 添加来源样式

在 `src/components/Pvz2DetailView.module.css` 末尾添加：

```css
.sourceBadge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: bold;
  margin-bottom: var(--space-sm);
}

.sourceChina {
  background: var(--color-zombie);
  color: var(--color-text-light);
}

.sourceInternational {
  background: var(--color-grass-light);
  color: var(--color-text-light);
}
```

## Step 2: 更新 Pvz2DetailView.jsx 添加来源显示

在 `src/components/Pvz2DetailView.jsx` 中，在标题下方添加来源信息：

```jsx
{data.source === 'china' && (
  <span className={`${styles.sourceBadge} ${styles.sourceChina}`}>🇨🇳 中国版独占</span>
)}
```

## Step 3: 验证

运行 `npm run dev`（后台），访问中国版植物详情页（如 `/pvz2/plants/fire_gourd`），确认：
- 显示"🇨🇳 中国版独占"标签
- 国际版植物详情页不显示标签

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css
git commit -m "feat(ui): add source info to PvZ 2 detail view"
```

## 重要约束

- 只修改 Pvz2DetailView 组件，不修改其他组件
- 中国版标签使用红色背景（`var(--color-zombie)`）
- 国际版不显示标签
- 使用 CSS Modules 样式隔离
- 不修改数据文件
