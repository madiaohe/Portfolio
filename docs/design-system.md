# Design System

本项目的设计系统采用与 [shadcn/ui theming](https://ui.shadcn.com/docs/theming)
一致的四层结构：**Token → @theme 映射 → 主题 → 文档**。目标是让颜色、间距、
字体、圆角都来自一组语义化 token，禁止在页面样式里使用游离的魔法数字。

## 四层结构

1. **Token 层** — 语义化 CSS 变量（`--space-*`、`--text-*`、`--leading-*`、
   `--font-weight-*`、`--background`、`--foreground`…）。
2. **映射层** — `@theme inline` 把 Token 接进 Tailwind，生成
   `p-md` / `gap-lg` / `text-body` 等工具类。
3. **主题层** — 颜色在 `:root`（亮色）与 `[data-minimal-theme='dark']`（深色）
   中定义；间距/字体/圆角与主题无关，只在 `:root` 定义。
4. **文档层** — 本文件。新增间距/字号一律先查此表，不要直接写数值。

代码位置：Token 与映射集中在 `app/components.css`；原始调色板在
`app/minimal.css`（`--minimal-*`）。

## 颜色（Color）

语义 token 通过 `--minimal-*` 调色板解析，亮色/深色自动切换：

| Token | 亮色来源 | 深色来源 |
| --- | --- | --- |
| `--background` | `--minimal-bg` `#fdfdfc` | `--minimal-bg` `#191918` |
| `--foreground` | `--minimal-text` `#21201c` | `--minimal-text` `#eeede8` |
| `--muted-foreground` | `--minimal-muted` `#73736c` | `--minimal-muted` `#96958f` |
| `--prose` | `--minimal-prose` `#45453f` | `--minimal-prose` `#eeede8` |
| `--muted` | `--minimal-hover` `#f5f4f4` | `--minimal-hover` `#262624` |
| `--surface` | `--minimal-surface` `#fff` | `--minimal-surface` `#222220` |
| `--border` | `--minimal-border` `#e9e9e7` | `--minimal-border` `#393936` |
| `--ring` | `--minimal-subtle` `#8d8d86` | `--minimal-subtle` `#92918b` |

通用详情页正文用 `--prose`；首页简介正文用 `--foreground`；标题用
`--foreground`；次级/元信息用 `--muted-foreground`。

## 间距（Spacing）

所有间距都是 4px 的倍数，按语义命名：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--space-3xs` | 4px | 图标/文字、标题与日期 |
| `--space-2xs` | 8px | 紧凑内边距（导航链接上下） |
| `--space-xs` | 12px | 标签与内容的小间隔 |
| `--space-sm` | 16px | 列表项间距 |
| `--space-md` | 24px | 段落间距、标题下间距、块内 padding |
| `--space-lg` | 32px | 组件块外边距 |
| `--space-xl` | 40px | 标题 → 组件块的过渡间距 |
| `--space-2xl` | 48px | 移动端章节前分隔 |
| `--space-3xl` | 64px | 章节前分隔（桌面） |
| `--space-4xl` | 96px | 页尾/导航前 |
| `--space-5xl` | 128px | 页面顶部留白 |

Tailwind 工具类：`p-md`、`mt-lg`、`gap-sm`… 由 `@theme inline` 生成
（`--spacing-*` 映射）。

## 字体（Typography）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--text-caption` | 13px | 图注、脚注 |
| `--text-meta` | 14px | 日期、标签、返回/导航链接 |
| `--text-body` | 16px | 正文、标题 |
| `--leading-meta` | 20px | meta 行高 |
| `--leading-body` | 28px | 正文行高（英文 1.75×） |
| `--leading-body-zh` | 32px | 正文行高（中文 2.0×） |
| `--leading-heading` | 24px | 标题行高（1.5） |
| `--font-weight-normal` | 400 | 次要文字（日期、标签、导航） |
| `--font-weight-body` | 450 | 正文（Reference Sans 为可变字体，可微调） |
| `--font-weight-medium` | 500 | — |
| `--font-weight-semibold` | 600 | 标题 |

**标题规范**：不区分 h1/h2/h3 层级，统一一个标题样式 =
`--text-body`(16px) / `--leading-heading`(24px) / `--font-weight-semibold`(600)，
颜色 `--foreground`。

## 圆角（Radius）

| Token | 值 |
| --- | --- |
| `--radius-xs` | 4px |
| `--radius-sm` | 6px |
| `--radius-md` | 8px |
| `--radius-lg` | 10px |
| `--radius-xl` | 14px |

组件容器圆角用 `--radius-md`。

## 使用规则

1. 任何间距值必须来自 `--space-*`（普通 CSS 用 `var(--space-*)`，组件页用
   `p-md`/`gap-lg` 等工具类）。
2. 任何字号/行高/字重必须来自 `--text-*` / `--leading-*` / `--font-weight-*`。
3. 颜色一律用语义 token，禁止直接写 hex。
4. 需要新档位时，先在本文件登记并保持 4px 倍数，再在 `app/components.css`
   的 `:root` 定义并同步 `@theme inline` 映射。
