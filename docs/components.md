# 项目组件

`components/` 只保留两个一级目录，按对外提供的能力分类，不再按来源、动效或 AI 场景分组。

- `components/ui/`：提供一项独立的展示或交互能力。包括 Button、Tabs、Tooltip、Action Swap Cascade、Accordion、Hover Card、Skeleton、Select、MorphPopover、Magnetic、PreviewRail、PromptInput、Message 和 NotionMentionLink。内部可以组合其他 UI 组件；例如 PromptInput 组合按钮与选择器，对外仍是一项输入能力。
- `components/blocks/`：组织布局、内容和交互，形成可放入页面的完整模块。包括 FloatingAgent、Testimonial2、MinimalHeader、SiteHeader、FluidFooter、HeroVideo、DesignPrinciples 和 WorkCategories。

依赖方向为：页面 → blocks → ui。页面也可以直接使用 ui；ui 不依赖 blocks 或 app，blocks 不依赖 app。共享逻辑放在 lib。

```text
components/
├── ui/
│   ├── button/                # 按钮及其变体
│   ├── message/               # 消息、气泡、滚动容器及私有 Context
│   ├── prompt-input.tsx
│   ├── notion-mention-link.tsx
│   └── ...
└── blocks/
    ├── floating-agent/
    │   ├── index.tsx
    │   └── floating-prompt-input.tsx
    ├── work-categories/       # 分类模块及其矩阵、封面、3D 场景实现
    ├── testimonial-2.tsx
    ├── minimal-header.tsx
    ├── site-header.tsx
    └── ...
```

复杂组件允许使用同名目录聚合文件。只有所属组件使用的实现跟随组件放置，不单独提升为公共组件。FloatingAgent 的定制输入框位于其目录内；通用 PromptInput 位于 ui。既有但尚未挂载的模块继续保留，不因目录整理而删除。

页面专属实现放在对应路由附近：`app/reference-home.tsx`、`app/writing/[slug]/writing-article.tsx`、`app/components/component-gallery.tsx`，以及 About、Contact、Journal 和 Ambient Dial 路由中的页面实现。文章目录、项目章节导航等绑定具体页面的组件也留在对应路由内。

共享 Hooks 统一位于 `lib/hooks/`，包括站点语言、主题与 Popover 定位；经历数据位于 `lib/about-experiences.ts`。模块私有的辅助逻辑可以就近放置，例如 WorkCategories 的 3D 场景。

启动 `npm run dev` 后打开 `/components`，按「独立组件 / Blocks」两组查看现有交互示例、禁用状态和调用方式。预览页支持中英文、深浅主题，生产环境返回 404。

## 底部浮层按钮与胶囊输入框

`FloatingButton`（`components/ui/floating-button.tsx`）和 `CapsuleInput`（`components/ui/capsule-input.tsx`）是两个独立 UI 组件，在 `/components#floating-button` 与 `/components#capsule-input` 的 Components 分类中预览。

- `FloatingButton` 默认固定在视口底部居中，露出 60 × 56px 按钮的顶部 28px；悬停上浮 4px，键盘聚焦上浮 8px。触屏露出至少 44px，并适配底部安全区。以按钮为圆心向上扇形展开 `actions` 里的圆形动作按钮（默认语言右上、AI 上方、主题左上）：悬停显示、移开收起，触屏点击展开/再点收起，键盘聚焦同样展开；Esc 收起扇区。`placement="contained"` 用于有定位的裁切容器。支持 `open` / `defaultOpen` / `onOpenChange`、自定义 `icon`、`label`、`actions`、`disabled` 和独立 `onClick`。
- 点击动作后展开为 224 × 48px 胶囊输入框（`children`），通过真实宽度、高度和底部位置过渡实现动画；展开会聚焦首个输入控件；Esc 收起并返回按钮焦点，保留草稿；输入为空时点击外部收起。收起内容保持挂载但使用 `inert` 隔离，草稿不会因切换状态丢失。
- `CapsuleInput` 是会随文字自动展开的输入胶囊，支持受控与非受控值、`inputRef`、自定义 icon、禁用/只读、IME 保护和回车提交，默认 `enterKeyHint="send"` 让移动键盘显示发送键（可覆盖）。右侧是语音与发送两个圆形按钮：语音为幽灵圆（`onVoiceClick` 未传入时禁用），发送为实心圆 + 上箭头（`type="submit"`，内容为空时禁用，可传 `sendLabel` / `sendIcon` 覆盖）。`onSubmit` 收到去除首尾空白的非空字符串，清空由调用方决定。
- **两阶段展开**：单行时胶囊以中心为轴向两端变宽（默认 224px → 最大 550px，与首页内容列同宽，可用 `minWidth` / `maxWidth` 调整，并受所在容器宽度限制）；到达最大宽度后文字换行，胶囊向上增高，变成文字在上、底部一行 logo 左 + 语音/发送右的布局（`data-multiline`）。Shift+Enter 插入换行、Enter 提交。
- `onVoiceClick` 和 `voiceActive` 用于接入语音功能；未传入回调时语音按钮禁用。组件页只演示按钮状态，不录音，也不请求麦克风权限。
- 组件自带共享样式 `components/ui/floating-input.css`，复用本站配色和字体，支持深浅主题与减少动态效果。用 `--floating-input-width`、`--floating-input-height` 调整胶囊尺寸；扇形的展开半径由 `.floating-button__fan` 上的 `--fan-radius` 控制（默认 80px），加大可让三个动作按钮彼此分开更远。

```tsx
import { FloatingButton } from '@/components/ui/floating-button';
import { CapsuleInput } from '@/components/ui/capsule-input';

<FloatingButton
  actions={[
    { id: 'language', position: 'top-right', icon: <Languages />, onSelect: toggleLanguage },
    { id: 'ai', position: 'top', icon: <AiLogo />, onSelect: () => setOpen(true) },
    { id: 'theme', position: 'top-left', icon: <Moon />, onSelect: toggleTheme },
  ]}
  onOpenChange={setOpen}
>
  <CapsuleInput onSubmit={submit} />
</FloatingButton>;
```

## 添加组件

项目已接入 Tailwind CSS 4，`components.json` 为 shadcn CLI 配置。`aliases.ui` 指向 `@/components/ui`，`aliases.components` 保留为组件根路径 `@/components`，`aliases.hooks` 指向 `@/lib/hooks`。`@ncdai`、`@unlumen-ui` 和 `@beui` Registry 均已配置。

`ipaddr.js` 显式列为运行依赖：当前 vinext 的生产图片模块将它作为外部依赖导入，仅存在于 vinext 的嵌套依赖中时会造成生产页面 500。

Unlumen UI 已配置为 `@unlumen-ui` Registry。Notion Mention Link 会同时安装安全的服务端抓取器与 `/api/notion-mention-link` 路由；本站使用 vinext 提供的 Next.js 兼容层，因此无需额外安装 `next` 包。

先预览文件、依赖与样式变更，再安装所需组件。Registry 可能指定自己的目标目录或硬编码导入路径，不能只依赖 aliases 自动完成归类。安装后按 ui / blocks 边界归位并更新引用，避免重新生成其他一级组件目录；来源记录在 `component-sources.md`。

```bash
npx shadcn@latest add button --dry-run
npx shadcn@latest add button

npx shadcn@latest add @ncdai/testimonial-2 --dry-run

npx shadcn@latest add @unlumen-ui/notion-mention-link --dry-run

npx shadcn@latest add @beui/prompt-input @beui/message --dry-run
```

Testimonial2 已安装。其他兼容 Registry 可通过 `components.json` 的 `registries` 配置后使用；不支持 Registry 的库也可按其文档安装依赖或复制源码，不需要强行转成同一套发布格式。

## 本地适配

- `app/components.css` 提供 Tailwind utilities 和主题变量，映射已有 `--minimal-*` 配色以及 `data-minimal-theme` 深色模式。
- 为避免改变旧页面，没有启用全局 Tailwind Preflight。下载组件的根节点添加 `ui-scope`，获得局部基础样式；Portal 内容也需要这个 class。新组件如依赖额外的 Preflight 行为，应在组件范围内补齐并验证。
- `cn()` 位于 `lib/utils.ts`，使用 clsx 和 tailwind-merge。部分新 Registry 源码直接从 `cn` 包导入：保留 CLI 安装的依赖，或统一改成 `@/lib/utils` 后移除不再使用的依赖。
- 接入时保留底层控件的键盘、焦点和 ARIA 逻辑。检查依赖、许可证、React / vinext 兼容性，验证窄屏、深浅主题、禁用状态和减少动态效果设置。
- 给组件预览页添加示例，并在 `component-sources.md` 记录来源和修改。
- 第三方代码已经复制进项目，更新不是自动的。先使用 `--diff` 对比，不要直接覆盖本地适配。

## 页面使用

页面直接按需要使用已引入的组件。文章专属的排版和内容留在文章页面，不再提取成 Reading blocks。

```tsx
import { Testimonial2 } from '@/components/blocks/testimonial-2';

<Testimonial2
  quote={quote}
  authorName={authorName}
  authorTagline={authorTagline}
  url={sourceUrl}
/>;
```

Testimonial2 预览使用明确标记的占位文字；实际展示时传入真实、可归属的引用。

Notion Mention Link 默认通过同源 API 读取标题、描述、图片和站点图标。对内容固定或不希望在预览时发起网络请求的场景，可传入可信的 `metadata`；首页使用预设信息，组件预览页演示实时读取。

Floating Agent 现在只在组件页作为 Blocks 演示（contained + `entryMode="launcher"`）。组件页通过 `entryMode="launcher"` 先显示 56px 圆形入口，并使用 `/public/media/floating-agent-logo.svg`；点击后直接展开到组件内容区宽度的单行工具栏，不保留窄输入栏中间状态，也不渲染权限授予控件。展开栏统一使用 16px 图标、32px 点击区和 4px 控件间距，输入文字与相邻控件保持 8px 视觉间距。输入为空时点击悬浮栏外部会自动折叠；已有输入内容时保持展开。折叠时内容会先快速淡出，外壳再通过真实宽度过渡恢复到 56px 圆形，不使用横向缩放；Logo 位于独立图层中，在收缩开始时淡入并旋转 360°。首页的浮窗已由 FloatingButton 接管（fixed 底部居中，语言 / AI / 主题扇形动作，AI 展开自动增长的 CapsuleInput）；原 FloatingAgent 从首页移除，保留在组件页作为 Blocks 演示。输入多行文字时工具栏会自动增高，发送第一条消息后才显示叠层并向上展开完整对话。当前响应为本地模拟，后续接入模型时只需替换 `onSubmit` 之后的模拟回复逻辑。
