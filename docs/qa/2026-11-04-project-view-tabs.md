# 项目视图文字 Tabs — 2026-11-04

## 改动

- 将工具条的单个图标切换改成现有 Tabs 组件，原型/说明文字同时展示，选中页有独立背景。
- `FloatingAction.content` 支持工具条自定义控件；保留返回、系统、输入、项目四组及分割线。
- Tab 关联真实的 tabpanel；支持点击、左右方向键切换，原型 iframe 保持挂载。
- 520px 以下将项目 tabs 和控制器移到第二行，场景面板同步上移。
- 组件工作台和长期文档同步更新。

## 验证

- TypeScript、定向 Oxlint、生产构建通过。
- 桌面：点击说明、方向键返回原型、选中状态、ARIA 面板关联均正常。
  用 iframe 窗口标记与停止状态确认切换不重建原型。
- 320 × 740 触屏：两项文字完整显示，工具条不越界；点击切换正常；控制台面板不覆盖工具条。
- 本地截图（相对仓库根目录）：
  - `output/playwright/project-view-tabs-desktop.png`
  - `output/playwright/project-view-tabs-panel.png`
  - `output/playwright/project-view-tabs-320.png`
  - `output/playwright/project-view-tabs-320-panel.png`
  - `output/playwright/project-view-tabs-zh-dark.png`

未发布到线上；此记录替代之前图标切换及单行窄屏的布局描述。

## 留白调整

根据用户截图加宽 tabs：每项至少 96px，文字左右 16px，两项之间 8px；
整个 tabs 槽位两侧各 8px，与控制器之间 12px。调整仅涉及组件 CSS，示例同步生效。
1920 × 960 桌面验证两项宽度与间距满足设置，点击可进入说明；
320 × 740 触屏下工具条不越界，tabs 与控制器不重叠，点击切换正常。
TypeScript、Oxfmt、`git diff --check` 通过。
截图：`output/playwright/project-tabs-spacing-desktop.png`、
`output/playwright/project-tabs-spacing-320.png`。

## 常显工具条与控制器分隔

项目页启用 `persistent`，默认显示工具条并移除底部启动按钮；tabs 与控制器之间
加入同款分割线。所有垂直分割线两侧均为 8px，窄屏保留 tabs 组内分隔。
工具条位置下移，为原型画布与控制面板重新预留空间。

TypeScript、定向 Oxlint、Oxfmt、补丁检查与生产构建通过。浏览器确认：
无需悬浮/点击即可看到工具条，启动按钮不再渲染，四条分割线的两侧间隔一致；
输入框可展开、保留草稿，Escape 恢复工具条并返回输入动作焦点；控制台与视图切换正常。
320px 触屏下不越界，控制台面板不覆盖工具条。

截图：`output/playwright/persistent-toolbar-desktop.png`、
`output/playwright/persistent-toolbar-320.png`、`output/playwright/persistent-toolbar-zh-dark.png`。
