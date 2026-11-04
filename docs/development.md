# 开发与协作规则

每次开始任务时阅读本文件和 [项目概览](project-overview.md)，再按任务读取
[文档索引](README.md) 中的主题说明。以下路径除 Markdown 链接外均相对仓库根目录。

## 开始工作

- 先查看 `git status --short --branch`、相关源码和任务涉及的文档。
  保留已有未提交改动，按明确文件范围编辑，不覆盖与任务无关的工作。
- 默认使用中文沟通，完成后说明改动、验证结果及未解决的问题。
- 围绕当前任务做必要改动，复用已有组件、Hooks 和数据结构；避免顺手重构、
  批量格式化、迁移技术栈或升级无关依赖。
- 新约定落地时同步对应主题文档；计划写入 `docs/plans/`，验证记录写入
  `docs/qa/`。根目录 `AGENTS.md` 只维护入口与索引。

## 设计与交互

- 修改视觉样式前阅读 [设计系统](design-system.md)。颜色、间距、字号、
  行高、字重和圆角复用语义 token，避免在页面中新增零散的硬编码样式。
- Token 与 Tailwind 映射集中在 `app/components.css`，基础调色板在
  `app/minimal.css`；新增间距档位遵循 4px 网格，并同步 token、映射和文档。
- 保持现有局部样式方案，不引入全局 Tailwind Preflight。引入的 UI 组件根节点
  和 Portal 内容使用 `ui-scope`，检查样式不会影响其他页面。
- 面向用户的新文案沿用中英文结构；复用 `useSiteLanguage`、`useSiteTheme`，
  保持 `data-minimal-theme` 及现有持久化约定。
- 动效优先复用 `lib/ease.ts`，支持减少动态效果；交互同时考虑键盘、触屏、
  焦点返回和 Escape 关闭。输入组件保留中文输入法组合输入保护。
- 新增或调整可复用组件时，在 `/components` 同步相应示例；按需覆盖默认、
  禁用、展开等状态，并维护 [组件说明](components.md)。
- 从 Registry 或第三方复制组件前先检查变更范围；接入后按项目目录归类，
  记录 [来源与本地修改](component-sources.md)，保留许可证及无障碍行为。
- 不把示例项目、占位文章或模拟 AI 回复描述为已验证的真实成果或已接通服务。

## 组件工作台与服务端边界

- `/components` 是本地搭建页面使用的组件工作台，只在 `npm run dev` 时开放。
  保留 `app/components/page.tsx` 中非 development 环境调用 `notFound()` 的限制。
- 不在公开导航中添加该页面，不通过修改生产 `NODE_ENV` 或移除服务端判断开放它。
  `noindex` 不能替代访问限制。
- 浏览器状态和交互放在客户端边界内；服务端抓取、环境密钥与 Node.js 专用模块
  保留在服务端。不要把密钥写入源码、`public/` 或提交到 Git。
- 修改链接预览时，保留 `lib/notion-link-preview.server.ts` 与
  `app/api/notion-mention-link/route.ts` 的 URL 校验、SSRF 防护、重定向复验、
  超时、体积限制和限流。

## Git 与发布边界

- GitHub 仓库为 `madiaohe/Portfolio`，当前生产分支是 `codex/emil-minimal`。
  GitHub 默认分支仍可能是旧的 `main`，不要据此替换当前实现。
- 用户选择保留当前分支完整历史；其他本地分支作为历史版本保留，不主动删除、
  推送或改写。禁止使用 `git push --all`、`git push --mirror` 上传整个本地仓库。
- 推送生产分支会触发 Netlify 发布。只有任务包含同步或发布时执行推送；
  对当前任务已经明确授权的操作，不重复请求确认。
- 提交时明确选择文件，避免把本地截图、临时产物或用户的无关改动一起提交。
  不提交 `node_modules/`、`dist/`、`.netlify/`、`.output/`、`.env*` 等文件。

发布配置、单分支推送和历史备份步骤统一见 [部署说明](deployment.md)。
完成前按 [验证规范](validation.md) 选择检查，并报告改动、实际验证结果和未解决问题。
