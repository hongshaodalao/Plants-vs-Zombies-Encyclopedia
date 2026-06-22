# Task 3: 更新 Pvz2DetailView 添加朗读按钮

**Files:**
- Modify: `src/components/Pvz2DetailView.jsx`
- Modify: `src/components/Pvz2DetailView.module.css`

## 任务目标

在 PvZ 2 详情页（Pvz2DetailView）标题旁添加朗读按钮，与 PvZ 1 详情页保持一致。

## Step 1: 更新 Pvz2DetailView.module.css 添加按钮样式

在 `src/components/Pvz2DetailView.module.css` 末尾添加：

```css
.speechBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-sun);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: bold;
  transition: var(--transition);
  font-family: inherit;
}

.speechBtn:hover {
  transform: scale(1.05);
}

.speaking {
  background: var(--color-zombie);
  color: var(--color-text-light);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

## Step 2: 更新 Pvz2DetailView.jsx 添加朗读按钮

在 `src/components/Pvz2DetailView.jsx` 中：

1. 添加 import：
```javascript
import { useSpeech } from '../hooks/useSpeech.js'
```

2. 在组件内部添加 Hook 调用（在 `const navigate = useNavigate()` 之后）：
```javascript
const { speak, stop, isSpeaking } = useSpeech()
```

3. 将标题 `<h1 className={styles.title}>{data.name}</h1>` 替换为：
```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <h1 className={styles.title}>{data.name}</h1>
  <button
    className={`${styles.speechBtn} ${isSpeaking ? styles.speaking : ''}`}
    onClick={() => {
      if (isSpeaking) {
        stop()
      } else {
        speak(`${data.name}。${data.description}`)
      }
    }}
  >
    {isSpeaking ? '⏹ 停止' : '🔊 朗读'}
  </button>
</div>
```

## Step 3: 验证

运行 `npm run dev`（后台），访问任意 PvZ 2 植物详情页（如 `/pvz2/plants/peashooter`），确认：
- 标题旁显示"🔊 朗读"按钮
- 点击按钮后开始朗读
- 朗读中按钮变为"⏹ 停止"
- 点击停止按钮可中断朗读

完成后停止 dev 服务器。

## Step 4: 提交

```bash
git add src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css
git commit -m "feat(speech): add speech button to PvZ 2 detail view"
```

## 重要约束

- 只修改 Pvz2DetailView 组件文件
- 不修改其他组件或数据文件
- 使用 useSpeech Hook（从 Task 1 创建）
- 按钮位置：标题旁
- 朗读内容：`{data.name}。{data.description}`
- 使用 CSS Modules 样式隔离
- 样式与 Task 2 的 DetailView 保持一致
