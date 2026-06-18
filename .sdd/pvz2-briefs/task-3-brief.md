# Task 3: 更新导航栏添加 PvZ 2 入口

**Files:**
- Modify: `src/components/Layout.jsx`
- Modify: `src/components/Layout.module.css`

## Step 1: 更新 Layout.jsx 添加 PvZ 2 导航

将 `src/components/Layout.jsx` 中的导航部分改为：

```javascript
<nav className={styles.navLinks}>
  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    首页
  </NavLink>
  <NavLink
    to="/plants"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    PvZ 1
  </NavLink>
  <NavLink
    to="/pvz2"
    className={({ isActive }) =>
      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
    }
  >
    PvZ 2
  </NavLink>
</nav>
```

## Step 2: 验证

运行 `npm run dev`（后台），确认导航栏显示"首页"、"PvZ 1"、"PvZ 2"三个链接。

完成后停止 dev 服务器。

## Step 3: 提交

```bash
git add src/components/Layout.jsx
git commit -m "feat(nav): add PvZ 2 navigation link"
```

## 重要约束

- 只修改导航栏部分，不修改其他 Layout 功能
- 保留现有的 NavLink active 状态逻辑
- 使用现有的 CSS 类名（navLink、navLinkActive）
