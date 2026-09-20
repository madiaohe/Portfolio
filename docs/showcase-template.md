# Showcase 页面模版

Showcase 是图片主导的项目/写作详情模版，复用 `components/blocks/showcase-page.tsx`
与 `app/showcase.css`。数据里把 `layout` 设为 `'showcase'` 即可套用；参考实现见
`lib/projects.ts` 的 `schneider-electric` 条目。

## 数据契约（`Project` / `PublishedWritingArticle`）

| 字段            | 作用                                 | 示例                                         |
| --------------- | ------------------------------------ | -------------------------------------------- |
| `layout`        | 选择模版                             | `'showcase'`（缺省走 DetailPage）            |
| `title`         | 标题（中英）                         | `{ zh: '施耐德', en: 'Schneider Electric' }` |
| `logo`          | 顶部 logo（可选）                    | `{ src, alt }`                               |
| `facts`         | 日期 / 角色 / 类型等元信息行（可选） | `[{ label, value }]`                         |
| `gallery`       | 案例图片数组                         | `[{ src, alt }]`                             |
| `galleryAspect` | 图片区宽高比，与图片一致即无黑边     | `'16 / 9'`                                   |
| `chapters`      | 正文章节（Heading + blocks）         | `[{ id, heading, blocks }]`                  |

## 渲染结构

标题 → facts（64px）→ chapters（Overview 等）→ 翻页器。

- 画廊图片通过章节内的 `{ type: 'gallery' }` block 放置：例如放在 Overview 的
  背景段之后、Design goals 之前，组件会自动渲染该位置。
- 图片建议统一尺寸（如 1920×1080），`galleryAspect` 与之匹配后图片区铺满、无黑边。
- 正文占位章节直接用 `chapters` 写，真实内容就绪后替换即可。
