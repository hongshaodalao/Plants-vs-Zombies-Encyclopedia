# Task 16: 编写 README 文档

**Files:**
- Create: `README.md`

## Step 1: 编写 `README.md`

写入 `README.md`：

````markdown
# 植物大战僵尸百科全书

一个使用 React 构建的植物大战僵尸 1 代图鉴网站，展示所有植物和僵尸的详细属性，支持搜索、筛选和排序。

## 功能

- 🌿 植物图鉴：查看所有植物的属性与技能
- 🧟 僵尸图鉴：查看所有僵尸的属性与弱点
- 🔍 实时搜索：按名称快速查找
- 🎯 多条件筛选：按分类、属性等条件过滤
- 📊 灵活排序：按数值属性升降序排序
- 📱 响应式设计：支持手机、平板、桌面

## 技术栈

- **构建工具**：Vite 5
- **前端框架**：React 18
- **路由**：React Router v6
- **样式**：CSS Modules + CSS 变量

## 开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/     # 可复用组件
├── pages/          # 页面组件
├── data/           # 静态数据
└── styles/         # 全局样式
```

## 许可

仅供个人学习使用。植物大战僵尸相关游戏内容版权归 PopCap Games / EA 所有。
````

## Step 2: 提交

```bash
git add README.md
git commit -m "docs: add README with setup instructions"
```

## 重要约束

- 仅创建 1 个文件：`README.md`
- 不修改其他文件
- 使用 brief 中的精确 markdown 内容
- README 使用中文（与项目其他文案保持一致）
- 不需要翻译原文（项目本身就是中文项目）
- 不要在 README 中加入 brief 之外的内容
