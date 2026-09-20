# Showcase 页面模版

Showcase 是图片主导的项目 / 写作详情模版，复用 `components/blocks/showcase-page.tsx`
与 `app/showcase.css`。数据里把 `layout` 设为 `'showcase'` 即可套用；当前参考实现是
`lib/projects.ts` 的 `schneider-electric` 条目，新项目照它的结构填数据即可。

## 数据契约（`Project` / `PublishedWritingArticle`）

| 字段 | 作用 | 示例 |
| --- | --- | --- |
| `layout` | 选择模版 | `'showcase'`（缺省走 DetailPage） |
| `title` | 标题（中英） | `{ zh: '施耐德', en: 'Schneider Electric' }` |
| `logo` | 顶部 logo（可选） | `{ src, alt }` |
| `facts` | 日期 / 角色 / 类型等元信息（可选） | `[{ label, value }]` |
| `gallery` | 案例图片数组 | `[{ src, alt }]` |
| `galleryAspect` | 图片区宽高比，与图片一致即无黑边 | `'16 / 9'` |
| `chapters` | 正文章节（Heading + blocks） | `[{ id, heading, blocks }]` |

- `facts` 的 `value` 可以是单条文本，也可以是数组——数组会作为多个标签垂直堆叠
  （如角色拆成 UI / UX，类型列 HMI / 工业设计 / 交互设计）。
- 图片建议统一尺寸（如 1920×1080），`galleryAspect` 与之匹配后图片区铺满、无黑边。

## 章节 blocks

章节内支持四种 block：

| block | 渲染 |
| --- | --- |
| `{ type: 'paragraph', text }` | 段落 |
| `{ type: 'heading', id, text }` | 子章节标题（h3，可在目录外提供锚点） |
| `{ type: 'image', src, alt, caption? }` | 图片 |
| `{ type: 'gallery' }` | 图片画廊（`ScrollAutoplayDevice`） |

画廊用 `{ type: 'gallery' }` 放在章节内任意位置，例如 Overview 的背景段之后、
Design goals 之前。

## 页面结构与间距

标题 → facts（水平多列，多值垂直堆叠）→ chapters → 翻页器。

- facts 距标题：64px
- 章节之间：64px
- 章节标题 → 正文：24px；段尾 → 下一个子章节标题：64px
- 正文末段 → 翻页器：128px

## 参考骨架

```ts
{
  slug: 'new-project',
  publishedAt: 'YYYY-MM-DD',
  layout: 'showcase',
  title: { zh: '…', en: '…' },
  logo: { src: '/media/….png', alt: '…' },
  facts: [
    { label: { zh: '时间', en: 'Date' }, value: { zh: '…', en: '…' } },
    { label: { zh: '角色', en: 'Role' }, value: [{ zh: '…', en: '…' }] },
    { label: { zh: '类型', en: 'Type' }, value: [{ zh: '…', en: '…' }] },
  ],
  galleryAspect: '16 / 9',
  gallery: [{ src: '/media/….png', alt: '…' }],
  chapters: [
    {
      id: 'overview',
      heading: { zh: '概览', en: 'Overview' },
      blocks: [
        { type: 'paragraph', text: { zh: '…', en: '…' } },
        { type: 'gallery' },
        { type: 'heading', id: 'goals', text: { zh: '设计目标', en: 'Design goals' } },
        { type: 'paragraph', text: { zh: '…', en: '…' } },
      ],
    },
  ],
}
```
