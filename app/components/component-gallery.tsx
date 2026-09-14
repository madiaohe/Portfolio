'use client';

import { Bot, FileText, ImagePlus, Puzzle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { PromptInput } from '@/components/ui/prompt-input';
import { EASE_OUT } from '@/lib/ease';
import { useFavicon } from '@/lib/hooks/use-favicon';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Testimonial2 } from '@/components/blocks/testimonial-2';
import { FloatingAgent } from '@/components/blocks/floating-agent';
import { NotionMentionLink } from '@/components/ui/notion-mention-link';

/* oxlint-disable react/react-compiler, next/no-img-element -- Mirrors the official beUI preview's remote provider favicon helper. */
function ModelLogo({ url }: { url: string }) {
  const favicon = useFavicon(url);

  if (!favicon.src) return <Bot />;

  return (
    <img
      ref={favicon.ref}
      src={favicon.src}
      alt=""
      width={16}
      height={16}
      referrerPolicy="no-referrer"
      className="size-4 rounded-sm object-contain"
    />
  );
}
/* oxlint-enable react/react-compiler, next/no-img-element */

const PROMPT_MODELS = [
  {
    value: 'gpt-5.2',
    label: 'GPT-5.2',
    icon: <ModelLogo url="https://openai.com" />,
  },
  {
    value: 'claude-sonnet-4',
    label: 'Claude Sonnet 4',
    icon: <ModelLogo url="https://www.anthropic.com" />,
  },
  {
    value: 'gemini-3.6-flash',
    label: 'Gemini 3.6 Flash',
    icon: <ModelLogo url="https://deepmind.google" />,
  },
  {
    value: 'grok-4.5',
    label: 'Grok 4.5',
    icon: <ModelLogo url="https://x.ai" />,
  },
  {
    value: 'mistral-large-3',
    label: 'Mistral Large 3',
    icon: <ModelLogo url="https://mistral.ai" />,
  },
];

const PROMPT_ACTIONS = [
  {
    value: 'image',
    label: 'Attach image',
    description: 'Add a screenshot or visual reference.',
    icon: <ImagePlus />,
  },
  {
    value: 'skill',
    label: 'Use a skill',
    description: 'Give the agent a specialized workflow.',
    icon: <Puzzle />,
  },
  {
    value: 'context',
    label: 'Add context',
    description: 'Include a file with supporting details.',
    icon: <FileText />,
  },
];

function PromptInputDemo() {
  const reduce = useReducedMotion() ?? false;
  const timer = useRef<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<string>();
  const [notice, setNotice] = useState<string>();

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const submit = (prompt: string) => {
    setSent(undefined);
    setNotice(undefined);
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setSent(prompt);
    }, 900);
  };

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setLoading(false);
  };

  return (
    <div className="gallery-demo gallery-prompt-input-demo ui-scope">
      <div className="flex h-[360px] w-full max-w-xl flex-col justify-center">
        <PromptInput
          models={PROMPT_MODELS}
          actions={PROMPT_ACTIONS}
          defaultModel="gpt-5.2"
          defaultValue="Review the current implementation and suggest the next improvement."
          loading={loading}
          onSubmit={submit}
          onStop={stop}
          onAction={(action) => {
            const selected = PROMPT_ACTIONS.find(
              (item) => item.value === action,
            );
            setNotice(selected ? `${selected.label} selected.` : undefined);
          }}
        />
        <div className="h-8 px-2 pt-2 text-xs text-muted-foreground">
          <AnimatePresence mode="wait">
            {sent || notice ? (
              <motion.p
                key={sent ?? notice}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.18,
                  ease: EASE_OUT,
                }}
              >
                {sent ? 'Prompt sent to the selected model.' : notice}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function ComponentGallery() {
  const { language, changeLanguage } = useSiteLanguage();
  const zh = language === 'zh';
  return (
    <div className="minimal-site component-gallery" lang={zh ? 'zh-CN' : 'en'}>
      <div className="minimal-shell">
        <MinimalHeader language={language} onLanguageChange={changeLanguage} />
        <main id="main-content">
          <h1>{zh ? '组件预览' : 'Components'}</h1>
          <p className="gallery-intro">
            {zh
              ? '独立组件与组合块的交互预览和使用示例。可切换语言和深浅主题。'
              : 'Explore UI components and blocks, with examples in both languages and themes.'}
          </p>

          <nav
            className="gallery-nav"
            aria-label={zh ? '组件分类' : 'Component categories'}
          >
            <a href="#ui">{zh ? '独立组件' : 'UI Components'}</a>
            <a href="#blocks">Blocks</a>
          </nav>

          <section
            id="ui"
            className="gallery-group"
            aria-labelledby="gallery-ui-title"
          >
            <h2 id="gallery-ui-title">{zh ? '独立组件' : 'UI Components'}</h2>
            <p className="gallery-group-description">
              {zh
                ? '可独立使用的控件和交互。'
                : 'Controls and interactions you can use independently.'}
            </p>
            <article className="gallery-section">
              <h3>
                Tabs <small>shadcn</small>
              </h3>
              <Tabs defaultValue="observe">
                <TabsList aria-label={zh ? '思考过程' : 'Thinking process'}>
                  <TabsTrigger value="observe">
                    {zh ? '观察' : 'Observe'}
                  </TabsTrigger>
                  <TabsTrigger value="interpret">
                    {zh ? '理解' : 'Interpret'}
                  </TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    {zh ? '未启用' : 'Disabled'}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="observe">
                  {zh ? '先描述看见的细节。' : 'Describe the details you see.'}
                </TabsContent>
                <TabsContent value="interpret">
                  {zh
                    ? '再思考细节背后的原因。'
                    : 'Consider why those details exist.'}
                </TabsContent>
              </Tabs>
              <pre>
                <code>
                  {
                    '<Tabs defaultValue="observe">\n  <TabsList aria-label="Examples">\n    <TabsTrigger value="observe">Observe</TabsTrigger>\n  </TabsList>\n  <TabsContent value="observe">Content</TabsContent>\n</Tabs>'
                  }
                </code>
              </pre>
            </article>

            <article className="gallery-section">
              <h3>
                Prompt Input <small>beUI</small>
              </h3>
              <p className="gallery-note">
                {zh
                  ? '这里直接展示通过 shadcn CLI 安装的 beUI 官方组件与官网 Preview 配置，未添加工具气泡等定制逻辑。'
                  : 'This uses the beUI component installed by the shadcn CLI with the official Preview configuration and no custom tool-bubble behavior.'}
              </p>
              <PromptInputDemo />
              <pre>
                <code>
                  {
                    '<PromptInput\n  models={MODELS}\n  actions={ACTIONS}\n  defaultModel="gpt-5.2"\n  defaultValue="Review the current implementation…"\n  loading={loading}\n  onSubmit={submit}\n  onStop={stop}\n  onAction={selectAction}\n/>'
                  }
                </code>
              </pre>
            </article>

            <article className="gallery-section">
              <h3>
                Accordion <small>shadcn</small>
              </h3>
              <Accordion type="single" collapsible defaultValue="reuse">
                <AccordionItem value="reuse">
                  <AccordionTrigger>
                    {zh ? '可以用于哪些页面？' : 'Where can I use this?'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {zh
                      ? '文章、项目介绍和其他需要展开内容的页面。'
                      : 'Writing, project details, and other pages with expandable content.'}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="style">
                  <AccordionTrigger>
                    {zh ? '可以调整外观吗？' : 'Can I change the appearance?'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {zh
                      ? '可以，组件使用本站的主题颜色，也接受自定义样式。'
                      : 'Yes. Components use the site palette and accept custom styles.'}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="disabled" disabled>
                  <AccordionTrigger>
                    {zh ? '未启用的项目' : 'Disabled item'}
                  </AccordionTrigger>
                  <AccordionContent>Disabled</AccordionContent>
                </AccordionItem>
              </Accordion>
              <pre>
                <code>
                  {
                    '<Accordion type="single" collapsible>\n  <AccordionItem value="details">\n    <AccordionTrigger>Title</AccordionTrigger>\n    <AccordionContent>Content</AccordionContent>\n  </AccordionItem>\n</Accordion>'
                  }
                </code>
              </pre>
            </article>

            <article className="gallery-section">
              <h3>
                Notion Mention Link <small>Unlumen UI</small>
              </h3>
              <p className="gallery-note">
                {zh
                  ? '自动读取标题、摘要、封面和站点图标。将鼠标悬停在链接上，或用 Tab 键聚焦查看完整卡片。'
                  : 'Fetches the title, summary, cover, and favicon. Hover the link, or focus it with Tab, to see the full card.'}
              </p>
              <div className="gallery-demo gallery-mention-demo">
                <div className="gallery-mention-example">
                  <a
                    className="gallery-mention-url"
                    href="https://desengs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    desengs.com
                  </a>
                  <NotionMentionLink
                    url="desengs.com"
                    invalidLabel={zh ? '请输入有效的网址。' : undefined}
                    unavailableLabel={
                      zh ? '暂时无法加载预览，但仍可直接打开链接。' : undefined
                    }
                  />
                </div>
              </div>
              <pre>
                <code>{'<NotionMentionLink url="desengs.com" />'}</code>
              </pre>
            </article>
          </section>

          <section
            id="blocks"
            className="gallery-group"
            aria-labelledby="gallery-blocks-title"
          >
            <h2 id="gallery-blocks-title">Blocks</h2>
            <p className="gallery-group-description">
              {zh
                ? '组合多个组件，形成完整的界面模块。'
                : 'Components combined into complete interface sections.'}
            </p>
            <article className="gallery-section">
              <h3>
                Floating Agent <small>beUI + custom</small>
              </h3>
              <p className="gallery-note">
                {zh
                  ? '点击底部圆形入口直接展开为内容区宽度的单行输入栏；此模式不包含权限授予按钮。输入多行文字会自动增高，发送第一条消息后进入带叠层的对话状态。当前回复为交互演示。'
                  : 'Open the round launcher to expand a single-line prompt to the full content width. This mode has no permission control. Multiline input grows automatically, and the first sent message enters the layered conversation state. Responses are mocked for this interaction demo.'}
              </p>
              <div className="gallery-demo gallery-agent-demo">
                <FloatingAgent
                  language={language}
                  placement="contained"
                  entryMode="launcher"
                />
              </div>
              <pre>
                <code>
                  {'<FloatingAgent language="zh" entryMode="launcher" />'}
                </code>
              </pre>
            </article>

            <article className="gallery-section">
              <h3>
                Testimonial 2 <small>Chánh Đại</small>
              </h3>
              <p className="gallery-note">
                {zh
                  ? '以下为占位示例，不是真实评价。'
                  : 'Placeholder example, not a real endorsement.'}
              </p>
              <Testimonial2
                authorName={zh ? '示例作者' : 'Example author'}
                authorTagline={zh ? '组件预览' : 'Component preview'}
                url="https://chanhdai.com/components/testimonial-2"
                quote={
                  zh
                    ? '好的细节，让熟悉的事物值得再看一眼。'
                    : 'Thoughtful details make familiar things worth a second look.'
                }
              />
              <pre>
                <code>
                  {
                    '<Testimonial2\n  quote="Your quote"\n  authorName="Author"\n  authorTagline="Role"\n  url="https://example.com"\n/>'
                  }
                </code>
              </pre>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
