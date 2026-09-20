# Showcase 页面模版

Showcase 是图片主导的项目/写作详情模版，复用 `components/blocks/showcase-page.tsx`
与 `app/showcase.css`。数据里把 `layout` 设为 `'showcase'` 即可套用；参考实现见
`lib/projects.ts` 的 `schneider-electric` 条目。

## 数据契约（`Project` / `PublishedWritingArticle`）

| 字段 | 作用 | 示例 |
| --- | --- | --- |
| `layout` | 选择模版 | `'showcase'`（缺省走 DetailPage） |
| `title` | 标题（中英） | `{ zh: '施耐德', en: 'Schneider Electric' }` |
| `logo` | 顶部 logo（可选） | `{ src, alt }` |
| `facts` | 日期 / 角色 / 类型等元信息行（可选） | `[{ label, value }]` |
| `gallery` | 案例图片数组 | `[{ src, alt }]` |
| `galleryAspect` | 图片区宽高比，与图片一致即无黑边 | `'16 / 9'` |
| `galleryLabel` | 画廊目录章节标题（可选，默认 画廊/Gallery） | `{ zh, en }` |
| `chapters` | 正文章节（Heading + blocks） | `[{ id, heading, blocks }]` |

## 渲染结构

标题 → facts（64px）→ chapters（Overview 等）→ 画廊章节（目录显示、页面无标题）→ 翻页器。

- 画廊章节由 `gallery` 数据自动派生：左侧目录出现「画廊」，点击滚动到该章节。
- 图片建议统一尺寸（如 1920×1080），`galleryAspect` 与之匹配后图片区铺满、无黑边。
- 正文占位章节直接用 `chapters` 写，真实内容就绪后替换即可。
