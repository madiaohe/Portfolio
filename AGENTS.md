# 项目协作规则

本文件适用于整个 Portfolio 仓库，供 Codex 等编码助手在开始工作时读取。
用户当前的明确要求优先于这里的项目约定；子目录如有更具体的
`AGENTS.md`，在其范围内遵循对应规则。

## 项目定位与技术栈

- 这是 Xu Xianyu 的个人作品与写作网站，延续当前简洁的页面和交互设计。
- 使用 React 19、TypeScript、Vinext、Vite 和 Tailwind CSS 4；版本以
  `package.json`、`package-lock.json` 为准。
- `app/` 使用 Next.js 兼容的 App Router API，实际构建工具是 Vinext。
  不要因为看到 `next/*` 导入或 `next.config.ts` 就安装 Next.js 或替换构建流程。
- 使用 npm，保留 `package-lock.json`；Netlify 使用 Node.js 22，本地至少满足
  `package.json` 中的 Node.js 版本要求。
- 站点通过 Nitro 部署到 Netlify，包含服务端页面和链接预览 API，不能直接当作
  纯静态 SPA 发布。

## 开始工作

- 先查看 `git status --short --branch`、相关源码和任务涉及的文档。
  保留已有未提交改动，按明确文件范围编辑，不覆盖与任务无关的工作。
- 默认使用中文沟通，完成后说明改动、验证结果及未解决的问题。
- 围绕当前任务做必要改动，复用已有组件、Hooks 和数据结构；避免顺手重构、
  批量格式化、迁移技术栈或升级无关依赖。
- 新约定落地时同步相关文档。本文件保存长期规则，测试记录和临时计划另存文档。

## 目录与复用边界

| 位置                 | 职责                                     |
| -------------------- | ---------------------------------------- |
| `app/`               | 路由、布局、元数据、API 及页面专属实现   |
| `components/ui/`     | 提供单项展示或交互能力的可复用组件       |
| `components/blocks/` | 组合多个组件的页面模块                   |
| `lib/hooks/`         | 跨页面、跨组件共享的 Hooks               |
| `lib/`               | 内容数据、工具函数、动效配置及服务端逻辑 |
| `content/journal/`   | Journal 的 Markdown 正文                 |
| `public/`            | 可公开访问的字体、图片、视频和图标       |
| `docs/`              | 设计、组件、内容及部署说明               |

- 依赖方向为页面 → blocks → ui；页面也可直接使用 ui。ui 不依赖 blocks 或
  app，blocks 不依赖 app 中的页面实现。
- `components/` 保持 ui / blocks 两个一级分类。复杂组件可使用同名目录组织
  私有实现；页面专属逻辑放在相应路由附近。
- 共享导入优先使用 `@/`；类名组合复用 `lib/utils.ts` 的 `cn()`。
- 通用项目详情与写作详情复用 `components/blocks/detail-page.tsx` 和
  `app/detail.css`。项目数据在 `lib/projects.ts`，写作数据在 `lib/writing.ts`；
  首页列表配置在 `lib/reference-home.ts`，不要另建重复的数据源。
- Journal 的元数据、正文导入分别在 `lib/journal-meta.ts`、`lib/journal.ts`。
  新增文章要同步正文、元数据和 slug 映射。

## 设计与交互

- 修改视觉样式前阅读 [设计系统](docs/design-system.md)。颜色、间距、字号、
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
  禁用、展开等状态，并维护 [组件说明](docs/components.md)。
- 从 Registry 或第三方复制组件前先检查变更范围；接入后按项目目录归类，
  记录 [来源与本地修改](docs/component-sources.md)，保留许可证及无障碍行为。
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

## 常用命令与验证

| 命令                           | 用途                                       |
| ------------------------------ | ------------------------------------------ |
| `npm ci`                       | 按锁文件安装依赖                           |
| `npm run dev`                  | 本地开发，包含 `/components`               |
| `npx tsc --noEmit`             | TypeScript 检查                            |
| `npm run lint`                 | 使用现有 Oxlint 配置检查代码               |
| `npx oxfmt --check <文件路径>` | 检查本次修改文件的格式                     |
| `npm run build`                | 常规 Vinext 生产构建                       |
| `npm start`                    | 启动常规生产构建，需先运行 `npm run build` |
| `npm run build:netlify`        | 通过 Nitro 生成 Netlify 部署产物           |
| `git diff --check`             | 检查补丁中的空白问题                       |

- 按改动选择验证：纯文档检查内容、路径和格式；代码改动运行类型检查、相关
  lint 和构建；部署适配改动运行 `npm run build:netlify`。
- 全量 lint 如有既存问题，区分本次新增与已有问题并如实报告，不为通过检查而
  全局关闭规则。格式遵循 `.oxfmtrc.json`，仅格式化相关文件。
- UI 改动检查实际浏览器效果，覆盖桌面、窄屏、中英文、深浅主题及相关交互。
  有参考图时对照实际截图；需要留存的验证记录可写入 `design-qa.md`。
- 路由或部署改动检查相关页面直达、静态资源、未知 slug 的 404，以及生产构建
  下 `/components` 的 404。明确区分本地产物测试与真实线上验证。
- 当前没有 `npm test` 脚本；按行为风险选择必要的验证，不为纯文案或简单样式
  改动引入测试框架。

## Git 与部署

- GitHub 仓库为 `madiaohe/Portfolio`，当前生产分支是 `codex/emil-minimal`。
  GitHub 默认分支仍可能是旧的 `main`，不要据此替换当前实现。
- 用户选择保留当前分支完整历史；其他本地分支作为历史版本保留，不主动删除、
  推送或改写。禁止使用 `git push --all`、`git push --mirror` 上传整个本地仓库。
- 推送生产分支会触发 Netlify 发布。只有任务包含同步或发布时执行推送；
  对当前任务已经明确授权的操作，不重复请求确认。
- 提交时明确选择文件，避免把本地截图、临时产物或用户的无关改动一起提交。
  不提交 `node_modules/`、`dist/`、`.netlify/`、`.output/`、`.env*` 等文件。
- Netlify 构建参数以 `netlify.toml` 为准：命令 `npm run build:netlify`，
  发布目录 `dist`，Node.js 22。普通本地构建继续使用原有 Vinext 命令。
- 分支推送与 Git bundle 备份步骤见 [部署说明](docs/deployment.md)。

## 文档使用

优先按任务查阅 [设计系统](docs/design-system.md)、[组件说明](docs/components.md)、
[组件来源](docs/component-sources.md)、[Journal](docs/journal.md) 和
[部署说明](docs/deployment.md)。

`docs/information-architecture.md`、`docs/project-detail.md` 包含早期版本描述，
`design-qa.md` 包含历史验证记录。结合当前源码判断适用范围，不据旧文档还原
已被替换的布局，也不把过去的检查结果当作本次验证结果。
