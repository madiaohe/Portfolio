# 仁博交互原型接入验证 — 2026-11-04

## 范围

新增仁博项目、原型/说明双入口、独立运行快照、站点容器、场景、重启与全屏。
原开发仓库未修改。来源提交为 `99d6bc4187f0c74f6d5cda146287b19018a5e923`。

## 自动检查

- TypeScript：`npx tsc --noEmit` 通过。
- 本次修改的代码：定向 Oxlint 通过。
- 全量 `npm run lint` 未通过：既有 Message、Popover、Select、NotionMentionLink、
  Hook 及服务端链接预览代码存在 React Compiler、ARIA、弃用 API 等问题；
  本次新增问题已修正，未改动这些无关实现或关闭全局规则。
- `npm run build` 通过，生成项目主入口和 `/work/:slug/about` 路由。
- 修改文件的 Oxfmt 与 `git diff --check` 通过。
- 11 个 vendor 文件 SHA-256 与来源清单一致；原开发仓库 Git 状态仍干净。
  `runtime.js` 仅作 focus 重算和短容器缩放两项明确适配。

## 浏览器检查

使用独立 Playwright 会话，在开发服务与普通生产构建上检查：

- 正常运行 → 鼠标停止 → 停止状态 → 启动；键盘 Enter 启动通过。
- 报警场景及报警页可访问；故障场景阻止启动。
- 用户演示密码 `1234` 可进入用户参数页；重启后清除演示登录身份。
- 说明页、顶部切换、说明页返回，以及同项目浏览器前进/后退均可操作。
  用 iframe 窗口标记确认切换不重建 iframe，停止状态保留。
- 重新开始恢复正常运行初始状态。
- 中英文界面切换同步到原型；深浅主题切换作用于外层容器。
- 1440 × 1000、390 × 844、844 × 390 布局与截图检查；窄屏无横向溢出。
- 原生全屏被当前浏览器环境拒绝时，页面内铺满降级正常；
  退出按钮及 iframe 内按 Escape 均能退出，并返回按钮焦点。

原型本身的完整厂家配置、传感器校准及长时间会话策略未重新做全量回归。

## 生产路由与资源

本地 `npm start -- --port 3011`：

- 首页包含仁博项目链接。
- 原型主入口、独立说明页、原有陕西北人详情均返回 200。
- 未知项目、未知项目的说明、草稿项目，以及未配置原型项目的 `/about` 返回 404。
- `/components` 返回 404。
- 原型 HTML、生成运行脚本与 Logo SVG 返回 200。

发现并修正当前 Vinext 生产 Link/RSC 导航错误：项目内双视图采用局部 History API
切换，其他详情仍使用原生跨页链接；生产环境复测切换及前进/后退通过。
这些是本地产物检查，未发布或验证 Netlify 线上环境。

## 本地截图

以下路径均相对仓库根目录，截图是未提交的本地验证产物：

- `output/playwright/renbo-desktop-en.png`
- `output/playwright/renbo-desktop-zh-dark.png`
- `output/playwright/renbo-mobile-zh-dark.png`
- `output/playwright/renbo-mobile-final.png`（最终背景同步检查）
- `output/playwright/renbo-landscape-zh.png`
- `output/playwright/renbo-notes-mobile-zh.png`
- `output/playwright/renbo-alarms-en.png`
- `output/playwright/renbo-production-desktop.png`
