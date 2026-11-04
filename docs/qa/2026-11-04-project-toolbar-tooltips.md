# 项目工具条与悬浮提示 — 2026-11-04

按用户截图调整底部五动作控制台：散开的按钮改为单一胶囊工具条，统一间距与
边框/阴影，保留底部启动按钮；普通页面默认三动作扇区不变。

## 实现

- `FloatingButton` 增加 `actionLayout="toolbar"`，DOM 顺序与水平视觉顺序一致。
- 动作按钮复用站内 Tooltip，鼠标悬浮及键盘聚焦显示中英文提示，移出、失焦、
  点击或关闭控制台时收起，去除原生 title 防止重复提示。
- 按钮保留 44px 触摸目标；Tooltip 通过 Portal 显示并限制在视口内。
- 更新项目调用、组件工作台五动作示例及组件/原型文档。
- 原型容器观察已应用的主题属性，修复控制台同窗口切换主题时 iframe 外围背景未同步的问题。

## 验证

- TypeScript、修改文件定向 Oxlint、Oxfmt、`git diff --check`、生产构建通过。
- 与用户参考截图对照：五个按钮同一水平线排列，共享单一表面，无逐个悬浮阴影。
- 桌面鼠标由启动按钮移入工具条后保持展开，悬浮动作显示对应提示。
- 键盘 Tab 顺序从返回首页开始；聚焦显示提示，鼠标移出后 Escape 可关闭控制台。
- 原型与说明之间切换正常。
- 320px 下提示位于视口内；触屏上下文可直接点击动作切换视图，无残留 Tooltip。
- 既存全量 lint 问题见前次记录，本次未扩大修改范围或关闭规则。

本地截图相对仓库根目录：

- `output/playwright/project-toolbar-tooltip.png`
- `output/playwright/project-toolbar-320.png`
- `output/playwright/project-toolbar-zh-dark.png`
- `output/playwright/project-toolbar-dark-final.png`（主题背景同步复查）

未提交或发布；场景面板仍沿用临时保留方案。
