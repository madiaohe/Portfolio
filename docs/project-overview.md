# 项目概览

Portfolio 是 Xu Xianyu 的个人作品与写作网站，延续当前简洁的页面和交互设计。
以下为当前源码入口；历史方案见 [文档索引](README.md)。

## 技术栈与运行方式

- 使用 React 19、TypeScript、Vinext、Vite 和 Tailwind CSS 4；版本以
  `package.json`、`package-lock.json` 为准。
- `app/` 使用 Next.js 兼容的 App Router API，实际构建工具是 Vinext。
  不要因为看到 `next/*` 导入或 `next.config.ts` 就安装 Next.js 或替换构建流程。
- 使用 npm，保留 `package-lock.json`；Netlify 使用 Node.js 22，本地至少满足
  `package.json` 中的 Node.js 版本要求。
- 站点通过 Nitro 部署到 Netlify，包含服务端页面和链接预览 API，不能直接当作
  纯静态 SPA 发布。

配置入口为 `package.json`、`package-lock.json`、`vite.config.ts`、
`tsconfig.json`、`components.json` 和 `netlify.toml`。

## 路由与入口

| 路由                          | 实现与用途                                                |
| ----------------------------- | --------------------------------------------------------- |
| `/`                           | `app/page.tsx` → `app/reference-home.tsx`，项目与写作列表 |
| `/work/[slug]`                | 项目主入口：有原型时展示体验，否则展示现有详情            |
| `/work/[slug]/about`          | 原型项目的独立说明页                                      |
| `/writing/[slug]`             | 写作详情，根据 `layout` 选择 Detail 或 Showcase           |
| `/journal`、`/journal/[slug]` | Journal 列表和 Markdown 文章                              |
| `/about`、`/contact`          | 关于与联系页面，专属实现位于对应路由目录                  |
| `/components`                 | 本地组件工作台，仅 development 环境可用                   |
| `/api/notion-mention-link`    | 带安全防护的服务端链接预览 API                            |

`app/layout.tsx` 负责共享布局、语言 Provider、主题初始化和全站快捷操作。
项目与写作详情只为已发布的本地条目提供页面；草稿、外链及未知 slug
不生成本地详情。详情样式和数据字段见 [Showcase 模版](showcase-template.md)。

## 目录与复用边界

| 位置                 | 职责                                     |
| -------------------- | ---------------------------------------- |
| `app/`               | 路由、布局、元数据、API 及页面专属实现   |
| `components/ui/`     | 提供单项展示或交互能力的可复用组件       |
| `components/blocks/` | 组合多个组件的页面模块                   |
| `lib/hooks/`         | 跨页面、跨组件共享的 Hooks               |
| `lib/`               | 内容数据、工具函数、动效配置及服务端逻辑 |
| `content/journal/`   | Journal 的 Markdown 正文                 |
| `content/writing/`   | 首页正式文章的 Markdown 正文             |
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
- 正式文章也可用 `markdown` 字段接入 `content/writing/*.md`，保留原文语言；
  主章节目录与 Markdown 表格仍复用详情页，接入步骤见 [文章模版](showcase-template.md)。
- Journal 的元数据、正文导入分别在 `lib/journal-meta.ts`、`lib/journal.ts`。
  新增文章要同步正文、元数据和 slug 映射。

项目和写作各自维护内容源，`lib/reference-home.ts` 从这些数据派生首页列表和
详情翻页数据。Showcase 详情复用 `components/blocks/showcase-page.tsx` 与
`app/showcase.css`，不要为每个项目复制整套页面。

有原型的项目以 `/work/[slug]` 为体验入口，说明独立在 `/work/[slug]/about`。
新项目使用 [交互项目模板](project-template.md) 的 `createInteractiveProject()`；
原型快照和运行容器维护方式见 [原型接入规范](prototypes.md)。
