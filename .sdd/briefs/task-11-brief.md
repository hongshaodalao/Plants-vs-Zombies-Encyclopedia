# Task 11: 实现 DetailView 通用详情组件

**Files:**
- Create: `src/components/DetailView.jsx`
- Create: `src/components/DetailView.module.css`

## Step 1: 编写 `src/components/DetailView.module.css`

```css
.detail {
  background: var(--color-bg-card);
  border: 3px solid var(--color-dirt);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-xl);
  box-shadow: var(--shadow-card);
  animation: fadeIn 0.4s ease;
}

.detailPlant {
  border-color: var(--color-plant);
}

.detailZombie {
  border-color: var(--color-zombie);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.imageSection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: var(--radius-md);
  background: rgba(135, 206, 235, 0.1);
  padding: var(--space-md);
}

.infoSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-grass-dark);
  margin: 0;
}

.nameEn {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-style: italic;
}

.description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text-primary);
  padding: var(--space-md);
  background: rgba(135, 206, 235, 0.1);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-sun);
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.statBox {
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid var(--color-grass-light);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
}

.statLabel {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.statValue {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-text-primary);
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
  gap: var(--space-md);
}

.navBtn {
  padding: 0.75rem 1.5rem;
  background: var(--color-grass-dark);
  color: white;
  border-radius: var(--radius-md);
  font-weight: bold;
  transition: var(--transition);
  text-decoration: none;
  display: inline-block;
}

.navBtn:hover {
  background: var(--color-grass-light);
}

.navBtnDisabled {
  background: var(--color-text-secondary);
  cursor: not-allowed;
  opacity: 0.5;
}

.backBtn {
  margin-bottom: var(--space-md);
  padding: 0.5rem 1rem;
  background: var(--color-sun);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
}

.backBtn:hover {
  background: var(--color-sun-dark);
}

@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
    padding: var(--space-md);
  }
  .image { max-width: 200px; }
  .title { font-size: var(--font-size-xl); }
}
```

## Step 2: 编写 `src/components/DetailView.jsx`

```javascript
import { Link, useNavigate } from 'react-router-dom'
import styles from './DetailView.module.css'

function DetailView({ data, list, type }) {
  const navigate = useNavigate()
  const isPlant = type === 'plant'
  const currentIndex = list.findIndex(item => item.id === data.id)
  const prevItem = currentIndex > 0 ? list[currentIndex - 1] : null
  const nextItem = currentIndex < list.length - 1 ? list[currentIndex + 1] : null
  const listPath = isPlant ? '/plants' : '/zombies'
  const detailClass = isPlant
    ? `${styles.detail} ${styles.detailPlant}`
    : `${styles.detail} ${styles.detailZombie}`

  const handlePrev = () => prevItem && navigate(`${listPath}/${prevItem.id}`)
  const handleNext = () => nextItem && navigate(`${listPath}/${nextItem.id}`)

  return (
    <div>
      <Link to={listPath} className={styles.backBtn}>
        ← 返回图鉴
      </Link>

      <div className={detailClass}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={data.image}
            alt={data.name}
            onError={(e) => {
              e.currentTarget.src = isPlant
                ? '/images/plants/_placeholder.svg'
                : '/images/zombies/_placeholder.svg'
            }}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{data.name}</h1>
          <span className={styles.nameEn}>{data.nameEn}</span>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.statsGrid}>
            {isPlant ? (
              <>
                <StatBox label="阳光消耗" value={data.sunCost} unit="☀️" />
                <StatBox label="冷却时间" value={data.recharge} unit="秒" />
                <StatBox label="伤害" value={data.damage} unit="💥" />
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击范围" value={data.range} />
                <StatBox label="解锁关卡" value={data.unlockLevel} />
              </>
            ) : (
              <>
                <StatBox label="生命值" value={data.health} unit="❤️" />
                <StatBox label="攻击力" value={data.damage} unit="⚔️" />
                <StatBox label="移动速度" value={
                  data.speed === 'slow' ? '慢' : data.speed === 'medium' ? '中' : '快'
                } />
                <StatBox label="首次出现" value={`第 ${data.firstAppearance} 关`} />
                <StatBox label="弱点" value={data.weakness} />
              </>
            )}
          </div>

          <div className={styles.navigation}>
            {prevItem ? (
              <button onClick={handlePrev} className={styles.navBtn}>
                ← {prevItem.name}
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                ← 没有上一个
              </span>
            )}
            {nextItem ? (
              <button onClick={handleNext} className={styles.navBtn}>
                {nextItem.name} →
              </button>
            ) : (
              <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
                没有下一个 →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, unit }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {unit && /\p{Emoji}/u.test(unit) && <span style={{ marginRight: '0.25rem' }}>{unit}</span>}
        {value}
      </div>
    </div>
  )
}

export default DetailView
```

## Step 3: 提交

```bash
git add src/components/DetailView.jsx src/components/DetailView.module.css
git commit -m "feat(detail): add DetailView component with prev/next navigation"
```

## 重要约束

- 仅创建 2 个文件：DetailView.jsx 和 DetailView.module.css
- 不修改其他文件
- 不在 PlantDetail/ZombieDetail 中使用（本任务只创建组件，下游任务 12 才集成）
- 接受 `data`（单个条目）、`list`（完整数据数组）、`type`（"plant" | "zombie"）三个 props
- 内部使用 `useNavigate` 实现前后导航
- 植物版 stat boxes：阳光消耗、冷却时间、伤害、生命值、攻击范围、解锁关卡
- 僵尸版 stat boxes：生命值、攻击力、移动速度、首次出现、弱点
- 移动速度的英文值映射为中文（slow→慢, medium→中, fast→快）
- "首次出现" 显示为 "第 N 关"
- 第一个条目没有 prevItem（显示禁用按钮），最后一个没有 nextItem
- 内部 StatBox 组件判断 emoji unit 时用 `/\p{Emoji}/u.test(unit)`，非 emoji 字符串（如"攻击范围"）不显示 unit
- 使用 brief 中的精确代码
