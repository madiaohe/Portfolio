# 原型控制台并入工具条 — 2026-11-04

## 改动

- 原型视图在胶囊工具条末尾增加「原型控制台」，带 Tooltip、ARIA 展开状态和面板关联。
- 原右下角入口移除，场景面板在工具条上方居中显示，保留三种场景、重新开始及演示说明。
- 面板打开期间保持工具条可见，自动聚焦场景选择；Escape 关闭并返回触发按钮。
- 说明视图隐藏原型控制台动作，其余五项工具条动作保留。
- 组件工作台增加末尾控制台演示动作，文档同步描述新接口。

## 验证

- TypeScript、定向 Oxlint、修改文件 Oxfmt、`git diff --check` 通过。
- 生产构建通过。
- 桌面浏览器：悬浮提示、打开面板、移动鼠标后保持工具条、故障场景、重新开始、
  Escape 关闭与焦点返回、再次点击关闭均正常；右下角旧入口不存在。
- 切换说明后原型控制台动作不可见。
- 320 × 740 触屏上下文：点击展开/收起、中文切换、深色主题正常，294px 工具条不越界。
- 本地截图与实际界面已检查：
  - `output/playwright/integrated-prototype-controls.png`
  - `output/playwright/integrated-prototype-controls-320.png`
  - `output/playwright/integrated-prototype-controls-zh-dark.png`

仅本地验证，未发布。之前右下角临时面板的布局记录由本次调整替代。

## 工具条分组补充

按用户指定的顺序调整为「返回｜语言、明暗｜输入｜原型/说明、控制器」，
加入三个不参与焦点顺序的分割线；组件工作台使用同样的分组。
TypeScript、定向 lint、格式及补丁检查通过；浏览器确认 DOM 顺序与视觉顺序一致，
三个分割线存在，控制台展开和视图切换正常，320px 触屏下约 309px 工具条不越界。
截图：`output/playwright/toolbar-groups-desktop.png`、`output/playwright/toolbar-groups-320.png`。
