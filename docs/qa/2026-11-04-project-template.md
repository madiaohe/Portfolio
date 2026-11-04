# 交互项目模板 — 2026-11-04

## 改动

- 新增 `createInteractiveProject()`，统一项目 Demo / Notes 结构及默认元信息。
- `prototype.controls` 提供可选场景、描述及公开演示账号，第一项作为初始场景。
- 控制面板及样式移入 `components/blocks/`，复用定位、关闭及焦点行为。
- 仁博项目改用模板，业务适配层和原始 vendor 快照未改动。
- 工作台接入真实共享面板，新增两场景/可选描述、无账号及仅重置示例。
- 项目切换按 slug 建立独立容器，首次握手与重置后应用初始场景；语言切换不重新应用。
- 模板说明、配置骨架及接入流程见 `docs/project-template.md`，入口索引已同步。

## 验证

- `npx tsc --noEmit`、本次代码的定向 Oxlint、Oxfmt、`git diff --check`、
  `npm run build` 通过。
- Node 配置检查：最小配置、两个自定义场景、无账号正常；无效尺寸、非本站入口、
  重复场景标识被拒绝。验证数据未写入公开项目数组。
- 浏览器：仁博三场景及原演示密码正常显示；报警场景切换到英文、说明页再返回后，
  仍保留报警与选中项。重置恢复正常，Escape 关闭并返回控制器焦点。
- 工作台：两场景可选，无描述时不渲染空描述，无账号时不渲染密码区域；
  关闭场景配置后仅保留重置，打开时聚焦重置按钮，重置与关闭可操作。
- 1512 × 787 中文浅色和 320 × 740 英文深色检查通过；窄屏面板边界为 x=16 至 304，
  与整条工具栏间隔 16px，页面宽度保持 320px。
- 本地生产服务器 HTTP 检查：首页、仁博两入口、原型资源、既有陕北人 HMI 为 200；
  未登记模板示例、未知 slug、非原型项目的 about 和 `/components` 均为 404。
- 模板文档链接及变更文件补丁检查通过。

截图路径（相对仓库根目录）：

- `output/playwright/project-template-renbo.png`
- `output/playwright/project-template-custom-scenes.png`
- `output/playwright/project-template-restart-only.png`
- `output/playwright/project-template-320-dark.png`

浏览器交互检查使用开发预览；生产检查为本地构建及 HTTP 路由检查，未发布线上。
