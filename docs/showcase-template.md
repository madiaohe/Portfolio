# Showcase 页面模版

Showcase 是图片主导的项目 / 写作详情模版，复用 `components/blocks/showcase-page.tsx`
与 `app/showcase.css`。数据里把 `layout` 设为 `'showcase'` 即可套用；当前参考实现是
`lib/projects.ts` 的 `schneider-electric` 条目，新项目照它的结构填数据即可。

## 数据契约（`Project` / `PublishedWritingArticle`）

| 字段            | 作用                               | 示例                                                                                  |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| `layout`        | 选择模版                           | `'showcase'`（缺省走 DetailPage）                                                     |
| `title`         | 标题（中英）                       | `{ zh: '施耐德', en: 'Schneider Electric' }`                                          |
| `logo`          | 顶部 logo（可选）                  | `{ src, alt }`                                                                        |
| `facts`         | 日期 / 角色 / 类型等元信息（可选） | `[{ label, value }]`                                                                  |
| `gallery`       | 案例图片数组                       | `[{ src, alt }]`                                                                      |
| `galleryAspect` | 图片区宽高比，与图片一致即无黑边   | `'16 / 9'`                                                                            |
| `chapters`      | 正文章节（Heading + blocks）       | `[{ id, heading, blocks }]`；`hideHeading: true` 时仅保留左侧目录项，不在正文渲染标题 |

- `facts` 的 `value` 可以是单条文本，也可以是数组——数组会作为多个标签垂直堆叠
  （如角色拆成 UI / UX，类型列 HMI / 工业设计 / 交互设计）。
- 项目数据用 `createShowcaseProject({...})` 创建。它默认生成 `Date`（取
  `publishedAt`）、`Role` 与 `Type`；`facts` 只写覆盖项，例如
  `facts: { date: { zh: '…', en: '…' } }`。`date`、`role`、`type` 都可以设为
  `null` 来省略默认行，`extra` 可以追加自定义行。
- 图片建议统一尺寸（如 1920×1080），`galleryAspect` 与之匹配后图片区铺满、无黑边。

## 章节 blocks

章节内支持四种 block：

| block                                   | 渲染                                 |
| --------------------------------------- | ------------------------------------ |
| `{ type: 'paragraph', text }`           | 段落                                 |
| `{ type: 'heading', id, text }`         | 子章节标题（h3，可在目录外提供锚点） |
| `{ type: 'image', src, alt, caption? }` | 图片                                 |
| `{ type: 'gallery' }`                   | 图片画廊（`ScrollAutoplayDevice`）   |

## Gallery 章节

滚动浏览默认作为独立章节加入左侧目录，但不在正文中重复显示标题：

```ts
{
  id: 'gallery',
  heading: { zh: '滚动浏览', en: 'Gallery' },
  hideHeading: true,
  blocks: [{ type: 'gallery' }],
}
```

`heading` 用于左侧目录和无标题章节的 `aria-label`；`hideHeading: true` 只隐藏正文
标题，不隐藏章节内容。通常把它放在 Overview 之后、正文段落章节之前。画廊图片和
宽高比仍由顶层的 `gallery`、`galleryAspect` 提供。

## 页面结构与间距

标题 → facts（水平多列，多值垂直堆叠）→ chapters → 翻页器。

- facts 距标题：64px
- 章节之间：64px
- 章节标题 → 正文：24px；段尾 → 下一个子章节标题：64px
- 正文末段 → 翻页器：128px

## 参考骨架

```ts
createShowcaseProject({
  slug: 'new-project',
  publishedAt: 'YYYY-MM-DD',
  layout: 'showcase',
  title: { zh: '…', en: '…' },
  logo: { src: '/media/….png', alt: '…' },
  // Optional: override only fields that differ from the defaults.
  facts: { date: { zh: '…', en: '…' } },
  galleryAspect: '16 / 9',
  gallery: [{ src: '/media/….png', alt: '…' }],
  chapters: [
    {
      id: 'overview',
      heading: { zh: '概览', en: 'Overview' },
      blocks: [{ type: 'paragraph', text: { zh: '…', en: '…' } }],
    },
    {
      id: 'gallery',
      heading: { zh: '滚动浏览', en: 'Gallery' },
      hideHeading: true,
      blocks: [{ type: 'gallery' }],
    },
    {
      id: 'goals',
      heading: { zh: '设计目标', en: 'Design goals' },
      blocks: [{ type: 'paragraph', text: { zh: '…', en: '…' } }],
    },
  ],
});
```

```

```
