# Task 5: UI 更新 - 卡片来源标签

**Files:**
- Modify: `src/components/Card.jsx`
- Modify: `src/components/Card.module.css`

## 任务目标

在植物/僵尸卡片上显示来源标签，中国版内容显示"中国版"标签。

## Step 1: 更新 Card.module.css 添加来源标签样式

在 `src/components/Card.module.css` 末尾添加：

```css
.sourceTag {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: bold;
  margin-top: var(--space-xs);
}

.sourceChina {
  background: var(--color-zombie);
  color: var(--color-text-light);
}
```

## Step 2: 更新 Card.jsx 添加来源标签显示

在 `src/components/Card.jsx` 中，在植物/僵尸名称下方添加来源标签：

```jsx
{data.source === 'china' && (
  <span className={`${styles.sourceTag} ${styles.sourceChina}`}>中国版</span>
)}
```

## Step 3: 验证

运行 `npm run dev`（后台），访问 `/pvz2/plants`，确认：
- 中国版植物卡片显示"中国版"标签
- 国际版植物卡片不显示标签

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/components/Card.jsx src/components/Card.module.css
git commit -m "feat(ui): add source tag to Card component for China version"
```

## 重要约束

- 只修改 Card 组件，不修改其他组件
- 中国版标签使用红色背景（`var(--color-zombie)`）
- 国际版不显示标签
- 使用 CSS Modules 样式隔离
- 不修改数据文件
