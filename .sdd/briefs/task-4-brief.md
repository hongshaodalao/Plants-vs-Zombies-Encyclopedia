# Task 4: 准备占位图片

**Files:**
- Create: `public/images/plants/.gitkeep`
- Create: `public/images/zombies/.gitkeep`
- Create: `public/images/plants/_placeholder.svg`（占位植物图）
- Create: `public/images/zombies/_placeholder.svg`（占位僵尸图）
- Modify: `src/data/plants.js`（将图片路径 `.png` 改为 `.svg`）
- Modify: `src/data/zombies.js`（将图片路径 `.png` 改为 `.svg`）

## Step 1: 创建图片目录占位文件

```bash
touch "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/plants/.gitkeep"
touch "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/zombies/.gitkeep"
```

## Step 2: 创建植物占位 SVG

写入 `public/images/plants/_placeholder.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#2ECC71" opacity="0.2"/>
  <circle cx="100" cy="100" r="60" fill="#2ECC71"/>
  <text x="100" y="115" font-size="60" text-anchor="middle" fill="white">🌿</text>
  <text x="100" y="180" font-size="14" text-anchor="middle" fill="#2C3E50">植物占位</text>
</svg>
```

## Step 3: 创建僵尸占位 SVG

写入 `public/images/zombies/_placeholder.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#E74C3C" opacity="0.2"/>
  <circle cx="100" cy="100" r="60" fill="#E74C3C"/>
  <text x="100" y="115" font-size="60" text-anchor="middle" fill="white">🧟</text>
  <text x="100" y="180" font-size="14" text-anchor="middle" fill="#2C3E50">僵尸占位</text>
</svg>
```

## Step 4: 为每个植物/僵尸条目生成占位文件

```bash
cd "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/plants"
for id in peashooter sunflower cherrybomb wallnut potatomine snowpea chomper repeater; do
  cp _placeholder.svg "$id.svg"
done
cd "J:/AIProjects/Plants vs Zombies Encyclopedia/public/images/zombies"
for id in zombie flagzombie conezombie bucketzombie screendoor football digger pogo; do
  cp _placeholder.svg "$id.svg"
done
```

## Step 5: 更新数据中的图片扩展名

将 `src/data/plants.js` 中所有 `image` 字段从 `.png` 改为 `.svg`：
- 找到 `image: "/images/plants/peashooter.png"`，替换为 `image: "/images/plants/peashooter.svg"`
- 对所有 8 个植物条目执行同样替换
- 同样修改 `src/data/zombies.js` 中 8 个僵尸条目

建议使用 Edit 工具配合 `replace_all: true`：
- 文件：`src/data/plants.js`，`old_string`: `.png`，`new_string`: `.svg`
- 文件：`src/data/zombies.js`，`old_string`: `.png`，`new_string`: `.svg`

**注意**：只替换 `image` 字段中的 `.png` 路径，不要改动其他内容。

> 注：完成图片下载后应改回 `.png`。本阶段先用 `.svg` 验证。

## Step 6: 提交

```bash
git add public/images src/data/plants.js src/data/zombies.js
git commit -m "feat(assets): add placeholder SVG images for all entries"
```

## 重要约束

- 8 个植物 SVG 必须生成：peashooter, sunflower, cherrybomb, wallnut, potatomine, snowpea, chomper, repeater
- 8 个僵尸 SVG 必须生成：zombie, flagzombie, conezombie, bucketzombie, screendoor, football, digger, pogo
- 2 个占位 SVG 文件（_placeholder.svg）在两个目录中各有一个
- 2 个 .gitkeep 文件用于保留空目录结构
- 植物数据中 image 路径必须从 .png 改为 .svg（8 个修改）
- 僵尸数据中 image 路径必须从 .png 改为 .svg（8 个修改）
- 不能修改数据中其他内容（id, name, 属性等不变）
- 不能新增植物/僵尸条目
