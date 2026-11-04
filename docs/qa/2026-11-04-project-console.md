# 项目悬浮控制台调整 — 2026-11-04

本记录接续 [仁博原型初次接入](2026-11-04-renbo-prototype.md)。初次接入记录中的
顶部工具栏、全屏和常驻场景页脚已经被本次界面替代。

## 改动

- 删除项目页的顶部导航、可见标题、额外语言/主题按钮和工具栏，主体只显示原型或说明。
- 复用 SiteQuickActions：保留语言、AI、主题，新增返回首页和原型/说明切换。
- FloatingButton 新增 `left` / `right` 槽位，项目页使用五动作扇区；普通页面保持三动作。
- 场景控制最终形式尚未确定，暂保留右下角可收起面板，含三种场景、重新开始与演示说明。
  320px 窄屏下入口上移以避让扇区。说明页不显示场景入口或重复的侧栏切换链接。
- `/components#floating-button` 增加五动作演示开关；文档同步更新。

## 验证结果

- TypeScript、修改文件定向 Oxlint、Oxfmt、`git diff --check`、生产构建通过。
- 开发浏览器：桌面悬停展开五动作；切换说明再返回后 iframe 未重建，停止状态保留。
  返回首页后恢复普通三动作控制台。
- 场景面板的故障切换、重新开始正常；重新开始后原型聚焦，面板收起。
  重新展开后 Escape 可关闭并返回入口焦点。
- 390px 窄屏、中英文及深浅主题已检查；本地生产服务上原型/说明切换和主题/语言可用。
- 真实触摸事件模拟（320 × 740，`hasTouch: true` / `isMobile: true`）：点击启动器、
  进入说明、切回原型、展开场景面板均通过，无横向溢出。
- 历史全量 lint 的无关问题见首轮记录；本次按文件检查，未扩大修改范围。

本地截图（相对仓库根目录，未提交的验证产物）：

- `output/playwright/project-console-desktop.png`
- `output/playwright/project-console-mobile.png`
- `output/playwright/project-console-scenes.png`
- `output/playwright/project-console-mobile-zh-dark.png`
- `output/playwright/project-console-notes-zh-dark.png`
- `output/playwright/project-console-touch-320.png`

未发布到线上。场景面板为临时保留方案，后续根据用户决定调整。
