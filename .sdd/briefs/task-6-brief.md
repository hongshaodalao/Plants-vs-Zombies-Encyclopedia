# Task 6: 实现 Card 组件

**Files:**
- Create: `src/components/Card.jsx`
- Create: `src/components/Card.module.css`
- Modify: `src/pages/PlantsList.jsx`（临时使用 Card 验证）
- Modify: `src/pages/ZombiesList.jsx`（临时使用 Card 验证）

## Step 1: 编写 `src/components/Card.module.css`

```css
.card {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: var(--color-sun);
}

.cardPlant:hover {
  border-color: var(--color-plant);
}

.cardZombie:hover {
  border-color: var(--color-zombie);
}

.imageWrap {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(135, 206, 235, 0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  loading: lazy;
}

.name {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-top: var(--space-sm);
}

.nameEn {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-style: italic;
}

.stats {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: var(--font-size-sm);
}

.statItem {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-secondary);
}

.statIcon {
  font-size: 1.1em;
}

.statValue {
  font-weight: bold;
  color: var(--color-text-primary);
}
```

## Step 2: 编写 `src/components/Card.jsx`

```javascript
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

function Card({ data, type }) {
  const detailPath = type === 'plant' ? `/plants/${data.id}` : `/zombies/${data.id}`

  const isPlant = type === 'plant'
  const cardClass = isPlant
    ? `${styles.card} ${styles.cardPlant}`
    : `${styles.card} ${styles.cardZombie}`

  return (
    <Link to={detailPath} className={cardClass}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={data.image}
          alt={data.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = isPlant
              ? '/images/plants/_placeholder.svg'
              : '/images/zombies/_placeholder.svg'
          }}
        />
      </div>
      <h3 className={styles.name}>{data.name}</h3>
      <span className={styles.nameEn}>{data.nameEn}</span>
      <div className={styles.stats}>
        {isPlant ? (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>☀️</span>
              <span className={styles.statValue}>{data.sunCost}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>💥</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>❤️</span>
              <span className={styles.statValue}>{data.health}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>⚔️</span>
              <span className={styles.statValue}>{data.damage}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Card
```

## Step 3: 在 PlantsList 临时使用 Card 验证

更新 `src/pages/PlantsList.jsx`：

```javascript
import { plants } from '../data/plants.js'
import Card from '../components/Card.jsx'

function PlantsList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {plants.map(plant => (
        <Card key={plant.id} data={plant} type="plant" />
      ))}
    </div>
  )
}

export default PlantsList
```

更新 `src/pages/ZombiesList.jsx`：

```javascript
import { zombies } from '../data/zombies.js'
import Card from '../components/Card.jsx'

function ZombiesList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {zombies.map(zombie => (
        <Card key={zombie.id} data={zombie} type="zombie" />
      ))}
    </div>
  )
}

export default ZombiesList
```

## Step 4: 验证

运行 `npm run dev`（后台），访问 `/plants` 和 `/zombies`，预期：
- 显示网格化卡片布局
- 悬停卡片有放大、上浮效果
- 图片占位 SVG 正常显示
- 卡片显示名称、英文名、关键属性

完成后停止 dev 服务器。

## Step 5: 提交

```bash
git add src/components/Card.jsx src/components/Card.module.css src/pages/PlantsList.jsx src/pages/ZombiesList.jsx
git commit -m "feat(card): add Card component for plants and zombies"
```

## 重要约束

- Card 接受 `data`（植物/僵尸对象）和 `type`（"plant" 或 "zombie"）两个 props
- 点击卡片通过 `<Link>` 跳转到对应详情页
- 植物卡片显示 sunCost 和 damage；僵尸卡片显示 health 和 damage
- 图片 onError 时回退到对应类型的 _placeholder.svg
- PlantsList 和 ZombiesList 在本任务后**完整**替换为包含 Card 网格的版本（不是 Tasks 9/10 之前使用的占位）
- 任务完成后，PlantsList/ZombiesList 已被"完整替换"（不再是占位），这是预期行为
- Tasks 9/10 将在此基础上添加搜索/筛选/排序
