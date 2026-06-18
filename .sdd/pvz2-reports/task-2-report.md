# Task 2 Report: 添加首页版本切换器

**状态:** DONE

## 实现内容

严格按照 brief 的 6 个步骤实现：

1. 创建 `src/components/VersionSwitcher.module.css` - 版本切换器样式
2. 创建 `src/components/VersionSwitcher.jsx` - 版本切换器组件
3. 替换 `src/pages/Home.jsx` - 使用 VersionSwitcher 替代旧的植物/僵尸双卡片
4. 更新 `src/pages/Home.module.css` - 移除旧的 `.cards` 相关样式

## 文件变更

| 操作 | 文件 |
|------|------|
| 新建 | `src/components/VersionSwitcher.jsx` |
| 新建 | `src/components/VersionSwitcher.module.css` |
| 重写 | `src/pages/Home.jsx` |
| 重写 | `src/pages/Home.module.css` |

## 验证结果

- 开发服务器启动正常（端口 5174），首页返回 HTTP 200
- Vite 开发服务器日志无错误
- 生产构建 `vite build` 成功，57 个模块转换完成，0 错误
- 已停止开发服务器

## 自审清单

- [x] 创建了 VersionSwitcher.jsx
- [x] 创建了 VersionSwitcher.module.css
- [x] 替换了 Home.jsx 内容
- [x] 清理了 Home.module.css 旧样式
- [x] PvZ 1 卡片链接到 `/plants`
- [x] PvZ 2 卡片链接到 `/pvz2`
- [x] 使用 Link 组件（非 `<a>` 标签）
- [x] 使用 CSS 变量（--color-plant, --color-zombie 等）
- [x] 保留了 fadeIn 动画
- [x] 代码与 brief 完全一致

## 提交信息

```
571caef feat(ui): add game version switcher to home page
```

## 关注点

无。实现与 brief 完全一致，构建和验证均通过。
