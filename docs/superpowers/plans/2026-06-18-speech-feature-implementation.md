# 语音朗读功能 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为植物大战僵尸百科全书的详情页添加语音朗读功能，让看不懂文字的小孩也能了解植物和僵尸的介绍。

**Architecture:** 创建自定义 useSpeech Hook 封装浏览器 SpeechSynthesis API，提供 speak/stop/isSpeaking 方法。在 DetailView 和 Pvz2DetailView 组件的标题旁添加朗读按钮，点击后朗读名称和描述文字。

**Tech Stack:** Web Speech API (SpeechSynthesis)、React Hooks、CSS Modules

## Global Constraints

- 使用浏览器内置 SpeechSynthesis API，无需第三方依赖
- 朗读内容：`{data.name}。{data.description}`
- 语速：0.9（稍慢，适合小孩）
- 语言：zh-CN（中文）
- 按钮位置：详情页标题旁
- 不破坏现有功能

---

## 文件结构总览

### 需要创建的文件

| 文件路径 | 用途 |
|---------|------|
| `src/hooks/useSpeech.js` | 语音合成自定义 Hook |

### 需要修改的文件

| 文件路径 | 修改内容 |
|---------|---------|
| `src/components/DetailView.jsx` | 添加朗读按钮 |
| `src/components/DetailView.module.css` | 添加按钮样式 |
| `src/components/Pvz2DetailView.jsx` | 添加朗读按钮 |
| `src/components/Pvz2DetailView.module.css` | 添加按钮样式 |

---

## Task 1: 创建 useSpeech 自定义 Hook

**Files:**
- Create: `src/hooks/useSpeech.js`

- [ ] **Step 1: 创建 hooks 目录**

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
mkdir -p src/hooks
```

- [ ] **Step 2: 编写 `src/hooks/useSpeech.js`**

```javascript
import { useState, useEffect, useCallback } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices())
    }
    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speak = useCallback((text) => {
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.9
    utterance.pitch = 1.0

    const chineseVoice = voices.find(v => v.lang.startsWith('zh'))
    if (chineseVoice) {
      utterance.voice = chineseVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }, [voices])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
```

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），确认 dev 服务器启动无错误。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/hooks/useSpeech.js
git commit -m "feat(speech): add useSpeech custom hook for text-to-speech"
```

---

## Task 2: 更新 DetailView 添加朗读按钮

**Files:**
- Modify: `src/components/DetailView.jsx`
- Modify: `src/components/DetailView.module.css`

- [ ] **Step 1: 更新 DetailView.module.css 添加按钮样式**

在 `src/components/DetailView.module.css` 末尾添加：

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

- [ ] **Step 2: 更新 DetailView.jsx 添加朗读按钮**

在 `src/components/DetailView.jsx` 中：

1. 添加 import：
```javascript
import { useSpeech } from '../hooks/useSpeech.js'
```

2. 在组件内部添加 Hook 调用：
```javascript
const { speak, stop, isSpeaking } = useSpeech()
```

3. 在标题旁添加朗读按钮：
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

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问任意 PvZ 1 植物详情页（如 `/plants/peashooter`），确认：
- 标题旁显示"🔊 朗读"按钮
- 点击按钮后开始朗读（名称 + 描述）
- 朗读中按钮变为"⏹ 停止"（红色）
- 点击停止按钮可中断朗读

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/components/DetailView.jsx src/components/DetailView.module.css
git commit -m "feat(speech): add speech button to PvZ 1 detail view"
```

---

## Task 3: 更新 Pvz2DetailView 添加朗读按钮

**Files:**
- Modify: `src/components/Pvz2DetailView.jsx`
- Modify: `src/components/Pvz2DetailView.module.css`

- [ ] **Step 1: 更新 Pvz2DetailView.module.css 添加按钮样式**

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

- [ ] **Step 2: 更新 Pvz2DetailView.jsx 添加朗读按钮**

在 `src/components/Pvz2DetailView.jsx` 中：

1. 添加 import：
```javascript
import { useSpeech } from '../hooks/useSpeech.js'
```

2. 在组件内部添加 Hook 调用：
```javascript
const { speak, stop, isSpeaking } = useSpeech()
```

3. 在标题旁添加朗读按钮：
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

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问任意 PvZ 2 植物详情页（如 `/pvz2/plants/peashooter`），确认：
- 标题旁显示"🔊 朗读"按钮
- 点击按钮后开始朗读
- 朗读中按钮变为"⏹ 停止"
- 点击停止按钮可中断朗读

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css
git commit -m "feat(speech): add speech button to PvZ 2 detail view"
```

---

## Task 4: 测试与优化

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 测试所有详情页的朗读功能**

在浏览器中测试：
- PvZ 1 植物详情页（/plants/:id）— 朗读功能正常
- PvZ 1 僵尸详情页（/zombies/:id）— 朗读功能正常
- PvZ 2 植物详情页（/pvz2/plants/:id）— 朗读功能正常
- PvZ 2 僵尸详情页（/pvz2/zombies/:id）— 朗读功能正常
- 点击朗读后点击停止 — 朗读中断
- 连续点击朗读按钮 — 不会叠加播放

- [ ] **Step 2: 更新 README.md**

在 README 中添加语音朗读功能说明：

```markdown
### 语音朗读
- 🔊 支持中文语音朗读植物/僵尸介绍
- 基于浏览器内置 SpeechSynthesis API
- 自动选择中文语音，语速稍慢适合儿童
```

- [ ] **Step 3: 运行生产构建**

```bash
npm run build
```

确认构建成功。

- [ ] **Step 4: 提交**

```bash
git add README.md
git commit -m "docs: update README with speech feature info"
```

---

## 计划自检

### 1. 规格覆盖

- ✅ useSpeech Hook 创建（Task 1）
- ✅ PvZ 1 详情页朗读按钮（Task 2）
- ✅ PvZ 2 详情页朗读按钮（Task 3）
- ✅ 测试与文档（Task 4）

### 2. 占位符检查

- ✅ 无 TBD/TODO
- ✅ 无"实现类似"引用
- ✅ 所有代码块完整

### 3. 类型一致性

- ✅ useSpeech Hook 返回 `{ speak, stop, isSpeaking }`
- ✅ speak 函数接受字符串参数
- ✅ CSS 类名 `speechBtn` 和 `speaking` 在两个组件中一致

### 4. 范围检查

计划涵盖 4 个任务，按顺序执行可产出完整的语音朗读功能。范围合适，无需拆分。
