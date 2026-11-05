# 2026-11-05 Obsidian Markdown 文章接入

## 范围

- 将《有元素，没有结构：装备制造业人机界面困境的系统性分析》接入首页文章列表，
  路由为 `/writing/elements-without-structure`，保留原稿日期 `2026-11-03`。
- 正文放在 `content/writing/elements-without-structure.md`，复用 `DetailPage` 的
  文章壳、目录、主题和翻页；新增 Markdown、GFM 表格、引用与代码块排版。
- 保留中文原文，不随站点导航语言切换而翻译正文。整理章节层级、两处制表符表格、
  原表格后的段落、列表和纯文本结构图；清理笔记属性及发布无关内容。
- 通过去除格式符号后的完整文字序列核对，发布副本文字与原文一致。
  Obsidian 原笔记未修改。用户原有 `lib/projects.ts` 和 logo 改动未纳入提交。

## 命令结果

- `npx tsc --noEmit`：通过。
- `npx oxlint components/blocks/detail-page.tsx lib/writing.ts lib/journal.ts lib/markdown-headings.ts`：通过。
- 修改文件的 `npx oxfmt --check`、`git diff --check`：通过。
- `npm run build`、`npm run build:netlify`：通过。
- `npm run lint`：失败，既存问题位于 message、stateful button、notion mention、
  popover、select、prompt input、portal hook 及链接预览等未修改文件；
  本次新增的表格容器问题已修复，相关文件单独 lint 通过。

## 本地产物验证

使用常规生产构建及 Playwright CLI 检查：

- 新文章、首页、既有 writing 文章和 Journal 文章均返回 200。
- `/writing/not-a-real-article`、生产环境 `/components` 返回 404。
- 文章关联的 37 个脚本、样式和字体资源均返回 200。
- 共 11 个主章节、15 个小节、3 个表格，表格含表头的行数为 4 / 7 / 5。
- 桌面 1440px、窄屏 320px / 390px；中英文导航与深浅主题下正文均保持中文。
- 段落间距、标题、引用、列表与表格已实际截图检查。
- 目录点击更新中文锚点；下一篇可进入既有文章，返回首页后可重新进入新文章。
- 表格可聚焦并独立横向滚动。320px 经典滚动条环境下，已针对 Markdown 页面解除
  全局最小宽度造成的横向溢出；最后复查根节点 `clientWidth` 与 `scrollWidth` 相同。

证据（相对仓库根目录，截图作为本地临时产物，不纳入提交）：

- `output/playwright/article-elements-desktop-en-light.png`
- `output/playwright/article-elements-1440-zh-dark.png`
- `output/playwright/article-elements-390-en-dark.png`
- `output/playwright/article-elements-320-final.png`
- `output/playwright/article-elements-320-table-final.png`
- `output/playwright/article-elements-structure-dark.png`

## 范围与限制

首轮线上部署 `a041c68` 的首页、新文章、未知 slug 和 `/components` 路由检查
均符合预期，37 个文章资源均返回 200，首页到新文章的跳转正常。

线上浏览器另发现 React #418；通过 recoverable-error 组件栈定位到
`html > head > script`，清除该脚本的 hydration 节点后错误消失。将主题初始化
改为 `next/script` 的 `beforeInteractive`，保留首屏应用主题，同时让 Vinext
在头部管理该脚本，避免 React 对裸脚本的接管不匹配。

最终部署 `1910c74`（部署 ID `6aec0d987afa3c78a67c66ff`）状态为 ready，已切换
`https://xuxianyu.netlify.app`。使用无调试拦截的新浏览器上下文，直达新文章、
旧文章及首页均返回 200，中文导航和深色主题正常，主题脚本只出现一次，
三页的 `pageerror` 均为零。首页再次进入新文章正常，390px 页面无横向溢出，
11 个主章节和 3 个表格完整。证据：
`output/playwright/article-elements-live-final-390-dark.png`。

未对文章中的研究观点、行业样本和引用标准开展事实核查。
Obsidian 与网站之间尚无自动同步；后续修改需更新仓库正文并重新发布。
