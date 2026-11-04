# 交互项目模板

以仁博项目当前的交互体验为基准，后续项目共用同一套页面。新增项目从
`lib/projects.ts` 的 `createInteractiveProject()` 开始，填入项目内容和原型配置。
实现与通信细节见 [原型接入规范](prototypes.md)，说明页的章节、图片及元信息见
[Showcase 模版](showcase-template.md)。

## 固定结构

- `/work/[slug]` 展示可操作原型；`/work/[slug]/about` 展示项目说明。
- 底部常显工具条：返回首页、语言/主题、输入、交互/说明 tabs、控制器。
- 中文标签为「交互 / 说明」，英文为「Demo / Notes」。切换保留 iframe 状态。
- 控制面板在按钮右侧展开；窄屏自动避让，保留关闭、键盘操作与焦点返回。
- 画板阴影由外层页面绘制，按实际画板位置与尺寸更新。
- 深浅主题、双语、响应式、加载及重置行为统一维护。

路由容器在 `app/work/[slug]/project-experience.tsx`，共享控制面板在
`components/blocks/project-controls.tsx`。新增项目共用这些实现，项目差异放入数据。

## 新项目骨架

准备好真实内容和原型资源后，将下面条目加入 `lib/projects.ts` 的 `projects` 数组。
替换示例中的 slug、日期、标题、文案和资源路径，完成验证后再发布。
helper 会生成 Showcase 说明页、空的兼容 `blocks` 以及默认元信息；`facts` 可按项目覆盖。

```ts
createInteractiveProject({
  slug: 'new-project',
  publishedAt: 'YYYY-MM-DD',
  title: { zh: '项目名称', en: 'Project name' },
  description: { zh: '项目简介', en: 'Project summary' },
  prototype: {
    src: '/prototypes/new-project/index.html',
    width: 800,
    height: 480,
  },
  chapters: [
    {
      id: 'overview',
      heading: { zh: '项目概览', en: 'Overview' },
      blocks: [
        {
          type: 'paragraph',
          text: { zh: '项目背景与目标', en: 'Context and goals' },
        },
      ],
    },
    {
      id: 'design',
      heading: { zh: '设计思路', en: 'Design' },
      blocks: [
        {
          type: 'paragraph',
          text: { zh: '关键设计决策', en: 'Key design decisions' },
        },
      ],
    },
    {
      id: 'try-it',
      heading: { zh: '体验路径', en: 'Try it' },
      blocks: [
        {
          type: 'paragraph',
          text: { zh: '建议操作步骤', en: 'Suggested steps' },
        },
      ],
    },
  ],
});
```

`src` 使用本站 `/prototypes/` 下的入口，`width` / `height` 填原型的设计尺寸，
必须为有限正数；原型自身负责按 iframe 视口缩放。未知、草稿及外链项目沿用既有路由规则。
这个骨架只在文档中展示，不会自动成为公开项目。

## 可选控制配置

未配置 `prototype.controls` 时，控制面板只提供「重新开始」。场景与演示密码均可独立省略，
不会自动套用仁博的设备场景或账号。配置示例：

```ts
controls: {
  scenarios: [
    { value: 'overview', label: { zh: '默认视图', en: 'Default view' } },
    {
      value: 'empty',
      label: { zh: '空状态', en: 'Empty state' },
      description: { zh: '无数据时的界面', en: 'The interface without data.' },
    },
  ],
  credentials: [
    { label: { zh: '访客', en: 'Viewer' }, value: '0000' },
  ],
}
```

- `scenarios` 可以有任意数量的选项；`value` 非空且唯一，与原型适配层的场景标识一致。
- 第一项是初始场景，每次新建或重置 iframe 后应用一次；语言与说明切换不会重新应用场景。
- `label` 必填，`description` 可选，均使用 `{ zh, en }`。
- `credentials` 仅用于公开的演示账号；角色和密码随项目配置，省略时不显示此区域。
- `/components#floating-button` 勾选项目工具条可体验共享面板，再切换示例场景开关，
  检查自定义两场景、无描述、无密码和仅重置状态。

## 原型接入与验收

1. 将原型资源放到 `public/prototypes/<slug>/`，保留来源与许可证。
2. 接入 `portfolio-prototype` 同源通信：加载、语言、背景、场景、画板边界及 Escape。
   只有重置需求时可以先嵌入独立页面；需要这些同步能力时，再按
   [通信规范](prototypes.md#体验与通信) 接入业务适配层。
3. 在项目数据中调用 `createInteractiveProject()`，填写说明章节与可选控制配置。
4. 检查两个 URL 直达、交互/说明状态保留、场景、重置、阴影，以及桌面/窄屏、
   中英文/深浅主题；按 [验证规范](validation.md) 执行检查并写入 QA。

仁博业务适配与导入脚本继续独立维护。其他原型通过同一消息契约接入，
原设备的操作逻辑与样式仍由各自项目负责。
