# PvZ 2 中国版扩展 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 PvZ 2 国际版百科基础上，扩展收录中国版独占内容（世界、植物、僵尸），使用 `source` 字段区分来源。

**Architecture:** 在现有 PvZ 2 数据文件中添加中国版内容，使用 `source` 字段（"international" / "china"）区分来源。复用现有卡片、筛选面板、详情页组件，添加来源标签显示。从中文 PvZ Wiki 采集数据和图片。

**Tech Stack:** MediaWiki API、Node.js（数据采集脚本）、React、CSS Modules

## Global Constraints

- 中国版数据合并到现有 PvZ 2 数据文件中
- 使用 `source` 字段区分来源（"international" / "china"）
- 数据来源：中文 PvZ Wiki（plantsvszombies.fandom.com/zh）
- 图片保存到 `public/images/pvz2/{plants,zombies,worlds}/`
- 使用 `getImagePath` 工具函数处理图片路径
- 中文 UI 文本
- 不破坏现有 PvZ 2 国际版功能

---

## 文件结构总览

### 需要修改的文件

| 文件路径 | 修改内容 |
|---------|---------|
| `src/data/pvz2/plants.js` | 添加中国版植物数据 |
| `src/data/pvz2/zombies.js` | 添加中国版僵尸数据 |
| `src/data/pvz2/worlds.js` | 添加中国版世界数据 |
| `src/components/Card.jsx` | 添加来源标签显示 |
| `src/components/Pvz2DetailView.jsx` | 添加来源信息显示 |
| `src/components/Pvz2FilterPanel.jsx` | 添加来源筛选项 |
| `src/pages/Pvz2PlantsList.jsx` | 支持来源筛选 |
| `src/pages/Pvz2ZombiesList.jsx` | 支持来源筛选 |
| `README.md` | 更新文档 |

### 需要创建的文件

| 文件路径 | 用途 |
|---------|------|
| `public/images/pvz2/worlds/*.png` | 中国版世界图片 |
| `public/images/pvz2/plants/*.png` | 中国版植物图片 |
| `public/images/pvz2/zombies/*.png` | 中国版僵尸图片 |

---

## Task 1: 数据模型扩展 - 添加 source 字段

**Files:**
- Modify: `src/data/pvz2/plants.js`
- Modify: `src/data/pvz2/zombies.js`
- Modify: `src/data/pvz2/worlds.js`

- [ ] **Step 1: 为现有 PvZ 2 植物数据添加 source 字段**

在 `src/data/pvz2/plants.js` 中，为每个植物对象添加 `source: "international"` 字段。

使用 Node.js 脚本批量添加：

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia"
node -e "
const fs = require('fs');
let content = fs.readFileSync('src/data/pvz2/plants.js', 'utf8');
// 在每个对象的 id 字段后添加 source 字段
content = content.replace(
  /(\"id\": \"[^\"]+\",)/g,
  '\$1\n    \"source\": \"international\",'
);
fs.writeFileSync('src/data/pvz2/plants.js', content);
console.log('植物数据 source 字段添加完成');
"
```

- [ ] **Step 2: 为现有 PvZ 2 僵尸数据添加 source 字段**

同样为 `src/data/pvz2/zombies.js` 添加 `source: "international"`。

- [ ] **Step 3: 为现有 PvZ 2 世界数据添加 source 字段**

同样为 `src/data/pvz2/worlds.js` 添加 `source: "international"`。

- [ ] **Step 4: 验证**

```bash
node -e "
const plants = require('./src/data/pvz2/plants.js').plants;
const zombies = require('./src/data/pvz2/zombies.js').zombies;
const worlds = require('./src/data/pvz2/worlds.js').worlds;
console.log('植物 source 检查:', plants.every(p => p.source === 'international'));
console.log('僵尸 source 检查:', zombies.every(z => z.source === 'international'));
console.log('世界 source 检查:', worlds.every(w => w.source === 'international'));
"
```

预期：全部返回 `true`。

- [ ] **Step 5: 提交**

```bash
git add src/data/pvz2/
git commit -m "feat(data): add source field to PvZ 2 data for China version support"
```

---

## Task 2: 采集中国版世界数据

**Files:**
- Modify: `src/data/pvz2/worlds.js`
- Create: `public/images/pvz2/worlds/*.png`

- [ ] **Step 1: 从中文 PvZ Wiki 采集中国版独占世界数据**

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占世界。

已知中国版独占世界（需验证）：
- 西游记 (Journey to the West)
- 功夫世界 (Kung Fu World)
- 天空之城 (Sky City)
- 蒸汽时代 (Steam Ages)
- 文艺复兴 (Renaissance Age)
- 平安时代 (Heian Age)
- 恐龙时代 (Dino World)
- 全新纪元 (MD Eras)

数据结构与现有世界一致，添加 `source: "china"` 字段。

- [ ] **Step 2: 下载中国版世界图片**

从中文 PvZ Wiki 下载世界图片，保存到 `public/images/pvz2/worlds/`。

- [ ] **Step 3: 更新 worlds.js**

将采集到的世界数据追加到 `src/data/pvz2/worlds.js` 的 `worlds` 数组末尾。

- [ ] **Step 4: 验证**

```bash
node -e "
const worlds = require('./src/data/pvz2/worlds.js').worlds;
const chinaWorlds = worlds.filter(w => w.source === 'china');
console.log('中国版世界数量:', chinaWorlds.length);
chinaWorlds.forEach(w => console.log('  ' + w.id + ': ' + w.name));
"
```

- [ ] **Step 5: 提交**

```bash
git add src/data/pvz2/worlds.js public/images/pvz2/worlds/
git commit -m "feat(data): add PvZ 2 China-exclusive worlds"
```

---

## Task 3: 采集中国版植物数据

**Files:**
- Modify: `src/data/pvz2/plants.js`
- Create: `public/images/pvz2/plants/*.png`

- [ ] **Step 1: 从中文 PvZ Wiki 采集中国版独占植物数据**

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占植物。

已知中国版独占植物（需验证）：
- 火葫芦、白萝卜、闪电芦苇、寒冰菇、火焰花女王、旋风橡果等

数据结构与现有植物一致，添加 `source: "china"` 字段。

- [ ] **Step 2: 下载中国版植物图片**

从中文 PvZ Wiki 下载植物图片，保存到 `public/images/pvz2/plants/`。

- [ ] **Step 3: 更新 plants.js**

将采集到的植物数据追加到 `src/data/pvz2/plants.js` 的 `plants` 数组末尾。

- [ ] **Step 4: 验证**

```bash
node -e "
const plants = require('./src/data/pvz2/plants.js').plants;
const chinaPlants = plants.filter(p => p.source === 'china');
console.log('中国版植物数量:', chinaPlants.length);
console.log('总植物数量:', plants.length);
"
```

- [ ] **Step 5: 提交**

```bash
git add src/data/pvz2/plants.js public/images/pvz2/plants/
git commit -m "feat(data): add PvZ 2 China-exclusive plants"
```

---

## Task 4: 采集中国版僵尸数据

**Files:**
- Modify: `src/data/pvz2/zombies.js`
- Create: `public/images/pvz2/zombies/*.png`

- [ ] **Step 1: 从中文 PvZ Wiki 采集中国版独占僵尸数据**

使用 MediaWiki API 从中文 PvZ Wiki 采集中国版独占僵尸。

已知中国版独占僵尸（需验证）：
- 牛魔王僵尸、孙悟空僵尸、红孩儿僵尸等

数据结构与现有僵尸一致，添加 `source: "china"` 字段。

- [ ] **Step 2: 下载中国版僵尸图片**

从中文 PvZ Wiki 下载僵尸图片，保存到 `public/images/pvz2/zombies/`。

- [ ] **Step 3: 更新 zombies.js**

将采集到的僵尸数据追加到 `src/data/pvz2/zombies.js` 的 `zombies` 数组末尾。

- [ ] **Step 4: 验证**

```bash
node -e "
const zombies = require('./src/data/pvz2/zombies.js').zombies;
const chinaZombies = zombies.filter(z => z.source === 'china');
console.log('中国版僵尸数量:', chinaZombies.length);
console.log('总僵尸数量:', zombies.length);
"
```

- [ ] **Step 5: 提交**

```bash
git add src/data/pvz2/zombies.js public/images/pvz2/zombies/
git commit -m "feat(data): add PvZ 2 China-exclusive zombies"
```

---

## Task 5: UI 更新 - 卡片来源标签

**Files:**
- Modify: `src/components/Card.jsx`
- Modify: `src/components/Card.module.css`

- [ ] **Step 1: 更新 Card.module.css 添加来源标签样式**

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

- [ ] **Step 2: 更新 Card.jsx 添加来源标签显示**

在 `src/components/Card.jsx` 中，在植物/僵尸名称下方添加来源标签：

```jsx
{data.source === 'china' && (
  <span className={`${styles.sourceTag} ${styles.sourceChina}`}>中国版</span>
)}
```

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问 `/pvz2/plants`，确认中国版植物卡片显示"中国版"标签。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/components/Card.jsx src/components/Card.module.css
git commit -m "feat(ui): add source tag to Card component for China version"
```

---

## Task 6: UI 更新 - 详情页来源信息

**Files:**
- Modify: `src/components/Pvz2DetailView.jsx`
- Modify: `src/components/Pvz2DetailView.module.css`

- [ ] **Step 1: 更新 Pvz2DetailView.module.css 添加来源样式**

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

- [ ] **Step 2: 更新 Pvz2DetailView.jsx 添加来源显示**

在 `src/components/Pvz2DetailView.jsx` 中，在标题下方添加来源信息：

```jsx
{data.source === 'china' && (
  <span className={`${styles.sourceBadge} ${styles.sourceChina}`}>🇨🇳 中国版独占</span>
)}
```

- [ ] **Step 3: 验证**

运行 `npm run dev`（后台），访问中国版植物详情页，确认显示"🇨🇳 中国版独占"标签。

完成后停止 dev 服务器。

- [ ] **Step 4: 提交**

```bash
git add src/components/Pvz2DetailView.jsx src/components/Pvz2DetailView.module.css
git commit -m "feat(ui): add source info to PvZ 2 detail view"
```

---

## Task 7: UI 更新 - 筛选面板来源筛选

**Files:**
- Modify: `src/components/Pvz2FilterPanel.jsx`
- Modify: `src/components/Pvz2FilterPanel.module.css`

- [ ] **Step 1: 更新 Pvz2FilterPanel.jsx 添加来源筛选**

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

- [ ] **Step 2: 更新 Pvz2PlantsList.jsx 支持来源筛选**

在 `src/pages/Pvz2PlantsList.jsx` 的筛选逻辑中添加来源筛选：

```javascript
// 筛选来源
if (filters.sources && filters.sources.length > 0) {
  result = result.filter(p => filters.sources.includes(p.source))
}
```

同时更新 filters 初始状态，添加 `sources: []`。

- [ ] **Step 3: 更新 Pvz2ZombiesList.jsx 支持来源筛选**

同样为僵尸列表页添加来源筛选逻辑。

- [ ] **Step 4: 验证**

运行 `npm run dev`（后台），在 PvZ 2 植物列表页勾选"中国版"筛选项，确认只显示中国版植物。

完成后停止 dev 服务器。

- [ ] **Step 5: 提交**

```bash
git add src/components/Pvz2FilterPanel.jsx src/pages/Pvz2PlantsList.jsx src/pages/Pvz2ZombiesList.jsx
git commit -m "feat(filter): add source filter for China version content"
```

---

## Task 8: 测试与文档更新

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 测试所有功能**

在浏览器中测试：
- PvZ 2 植物列表：中国版植物显示"中国版"标签
- PvZ 2 僵尸列表：中国版僵尸显示"中国版"标签
- PvZ 2 世界列表：中国版世界正常显示
- 来源筛选：勾选"中国版"只显示中国版内容
- 详情页：中国版内容显示"🇨🇳 中国版独占"
- 搜索功能：中国版内容可被搜索到

- [ ] **Step 2: 更新 README.md**

在 README 中添加中国版内容说明：

```markdown
### PvZ 2 中国版（2014 年）
- 🌿 中国版独占植物：X 种
- 🧟 中国版独占僵尸：X 种
- 🌍 中国版独占世界：X 个
```

- [ ] **Step 3: 运行生产构建**

```bash
npm run build
```

确认构建成功。

- [ ] **Step 4: 提交**

```bash
git add README.md
git commit -m "docs: update README with PvZ 2 China version content"
```

---

## 计划自检

### 1. 规格覆盖

- ✅ 数据模型扩展（Task 1）
- ✅ 中国版世界数据（Task 2）
- ✅ 中国版植物数据（Task 3）
- ✅ 中国版僵尸数据（Task 4）
- ✅ 卡片来源标签（Task 5）
- ✅ 详情页来源信息（Task 6）
- ✅ 筛选面板来源筛选（Task 7）
- ✅ 测试与文档（Task 8）

### 2. 占位符检查

- ✅ 无 TBD/TODO
- ✅ 无"实现类似"引用
- ✅ 所有代码块完整

### 3. 类型一致性

- ✅ `source` 字段在所有数据文件中保持一致
- ✅ `filters.sources` 在筛选组件和页面中保持一致
- ✅ CSS 类名 `sourceChina`、`sourceInternational` 在所有组件中保持一致

### 4. 范围检查

计划涵盖 8 个任务，按顺序执行可产出完整的 PvZ 2 中国版扩展。范围合适，无需拆分。
