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
import { HookSidebar } from '@/components/ui/hook-sidebar';
import { ArticleDirectory } from '@/components/blocks/article-directory';
import { LibraryDirectory } from '@/components/blocks/library-directory';

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
          const selected = PROMPT_ACTIONS.find((item) => item.value === action);
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
  );
}

import type { ReactNode } from 'react';

type GallerySection = {
  id: string;
  en: string;
  zh: string;
  description: { en: string; zh: string };
  render: (zh: boolean) => ReactNode;
};

const SECTIONS: GallerySection[] = [
  {
    id: 'tabs',
    en: 'Tabs',
    zh: 'Tabs',
    description: {
      en: 'Tabs keep related content in one place. Select a tab to switch between panels.',
      zh: '把相关内容放在同一区域，通过选择标签切换显示不同面板。',
    },
    render: (zh) => (
      <section id="tabs" className="gallery-section" aria-label="Tabs">
        <div className="gallery-demo gallery-tabs-demo ui-scope">
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
        </div>
        <pre>
          <code>
            {
              '<Tabs defaultValue="observe">\n  <TabsList aria-label="Examples">\n    <TabsTrigger value="observe">Observe</TabsTrigger>\n  </TabsList>\n  <TabsContent value="observe">Content</TabsContent>\n</Tabs>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'prompt-input',
    en: 'Prompt Input',
    zh: '输入栏',
    description: {
      en: 'An agent composer with model and action menus. Type, pick a model, attach an action, then send.',
      zh: '面向智能体的输入框，带模型与动作菜单。输入、选择模型、附加操作后发送。',
    },
    render: () => (
      <section
        id="prompt-input"
        className="gallery-section"
        aria-label="Prompt Input"
      >
        <div className="gallery-demo gallery-prompt-input-demo ui-scope">
          <PromptInputDemo />
        </div>
        <pre>
          <code>
            {
              '<PromptInput\n  models={MODELS}\n  actions={ACTIONS}\n  defaultModel="gpt-5.2"\n  defaultValue="Review the current implementation…"\n  loading={loading}\n  onSubmit={submit}\n  onStop={stop}\n  onAction={selectAction}\n/>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'accordion',
    en: 'Accordion',
    zh: '折叠面板',
    description: {
      en: 'A vertical list of expandable items, good for questions, details, and progressive disclosure.',
      zh: '纵向可展开列表，适合问答、细节说明与渐进式展示。',
    },
    render: (zh) => (
      <section
        id="accordion"
        className="gallery-section"
        aria-label="Accordion"
      >
        <div className="gallery-demo gallery-accordion-demo ui-scope">
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
        </div>
        <pre>
          <code>
            {
              '<Accordion type="single" collapsible>\n  <AccordionItem value="details">\n    <AccordionTrigger>Title</AccordionTrigger>\n    <AccordionContent>Content</AccordionContent>\n  </AccordionItem>\n</Accordion>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'mention-link',
    en: 'Notion Mention Link',
    zh: '链接预览',
    description: {
      en: 'An inline link that previews the destination — title, summary, cover, and favicon — on hover or focus.',
      zh: '内联链接，悬停或聚焦时预览目标网页的标题、摘要、封面与站点图标。',
    },
    render: (zh) => (
      <section
        id="mention-link"
        className="gallery-section"
        aria-label="Notion Mention Link"
      >
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
      </section>
    ),
  },
  {
    id: 'hook-sidebar',
    en: 'Hook Sidebar',
    zh: '钩子目录',
    description: {
      en: 'A scroll-linked directory with a hook rail, controlled with value/onChange or the current route.',
      zh: '与滚动联动的目录，带钩子指示器，可通过 value/onChange 或当前路由控制。',
    },
    render: (zh) => (
      <section
        id="hook-sidebar"
        className="gallery-section"
        aria-label="Hook Sidebar"
      >
        <div className="gallery-demo hook-sidebar-demo ui-scope">
          <HookSidebarDemo zh={zh} />
        </div>
        <pre>
          <code>
            {
              '<HookSidebar\n  items={SECTIONS.map((s) => s.title)}\n  value={active}\n  onChange={goTo}\n/>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'floating-agent',
    en: 'Floating Agent',
    zh: '悬浮代理',
    description: {
      en: 'A round launcher that expands into a full-width composer and a layered conversation state.',
      zh: '从圆形入口展开为全宽输入栏，发送后进入带叠层的对话状态。',
    },
    render: (zh) => (
      <section
        id="floating-agent"
        className="gallery-section"
        aria-label="Floating Agent"
      >
        <div className="gallery-demo gallery-agent-demo">
          <FloatingAgent
            language={zh ? 'zh' : 'en'}
            placement="contained"
            entryMode="launcher"
          />
        </div>
        <pre>
          <code>
            {'<FloatingAgent language="zh" entryMode="launcher" />'}
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'testimonial-2',
    en: 'Testimonial 2',
    zh: '用户评价',
    description: {
      en: 'A quote card with author details and a source link. The quote is a placeholder.',
      zh: '带作者信息与来源链接的引用卡片。此处引文为占位示例。',
    },
    render: (zh) => (
      <section
        id="testimonial-2"
        className="gallery-section"
        aria-label="Testimonial 2"
      >
        <div className="gallery-demo gallery-testimonial-demo ui-scope">
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
        </div>
        <pre>
          <code>
            {
              '<Testimonial2\n  quote="Your quote"\n  authorName="Author"\n  authorTagline="Role"\n  url="https://example.com"\n/>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'article-directory',
    en: 'Article Directory',
    zh: '文章目录',
    description: {
      en: 'A reusable article block: a back link plus a scroll-linked section directory.',
      zh: '可复用的文章侧栏：返回链接 + 与滚动联动的章节目录。',
    },
    render: (zh) => (
      <section
        id="article-directory"
        className="gallery-section"
        aria-label="Article Directory"
      >
        <div className="gallery-demo article-directory-demo ui-scope">
          <ArticleDirectoryDemo zh={zh} />
        </div>
        <pre>
          <code>
            {
              '<ArticleDirectory\n  backHref="/#writing-heading"\n  backLabel="Back"\n  items={headings}\n  value={active}\n  onChange={goTo}\n/>'
            }
          </code>
        </pre>
      </section>
    ),
  },
  {
    id: 'library-directory',
    en: 'Library Directory',
    zh: '组件库目录',
    description: {
      en: 'A reusable block: a two-group directory separating components from blocks.',
      zh: '可复用的组件库侧栏：分“组件”与“组合”两组的目录。',
    },
    render: (zh) => (
      <section
        id="library-directory"
        className="gallery-section"
        aria-label="Library Directory"
      >
        <div className="gallery-demo library-directory-demo ui-scope">
          <LibraryDirectoryDemo zh={zh} />
        </div>
        <pre>
          <code>
            {
              '<LibraryDirectory\n  componentsLabel="Components"\n  blocksLabel="Blocks"\n  componentItems={[...]}\n  blockItems={[...]}\n/>'
            }
          </code>
        </pre>
      </section>
    ),
  },
];


const BLOCK_IDS = new Set(['floating-agent', 'article-directory', 'library-directory']);
const COMPONENT_SECTIONS = SECTIONS.filter((s) => !BLOCK_IDS.has(s.id));
const BLOCK_SECTIONS = SECTIONS.filter((s) => BLOCK_IDS.has(s.id));
const ALL_SECTIONS = [...COMPONENT_SECTIONS, ...BLOCK_SECTIONS];

const HOOK_DEMO_SECTIONS = [
  {
    en: 'Overview',
    zh: '概览',
    text: {
      en: 'A scroll-linked directory. The hook rail springs between items as the page scrolls, and a dashed preview rail appears while hovering or focusing.',
      zh: '与滚动联动的目录。页面滚动时，钩子指示器在条目之间平滑移动；悬停或键盘聚焦时显示虚线预览轨。',
    },
  },
  {
    en: 'Installation',
    zh: '安装',
    text: {
      en: 'Single self-contained file at components/ui/hook-sidebar.tsx. Only depends on motion and cn, both already present in this project.',
      zh: '自包含的单文件，位于 components/ui/hook-sidebar.tsx。仅依赖 motion 和 cn，本项目已具备。',
    },
  },
  {
    en: 'Props',
    zh: '属性',
    text: {
      en: 'items accepts plain strings (buttons) or {label, href} links. Use value + onChange for a controlled directory, or defaultValue on its own.',
      zh: 'items 支持纯文本（按钮）或 {label, href} 链接。用 value + onChange 实现受控目录，或单独使用 defaultValue。',
    },
  },
  {
    en: 'Usage',
    zh: '用法',
    text: {
      en: 'The directory above mirrors this exact pattern: controlled active index, scroll-spy updates it, and clicking scrolls the section into view.',
      zh: '本页左侧目录就是这个用法的实际示范：受控 active 索引、滚动监听回写、点击滚动到对应区块。',
    },
  },
];

function HookSidebarDemo({ zh }: { zh: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const paneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const lockUntil = useRef(0);

  const goTo = (index: number) => {
    const pane = paneRef.current;
    const el = sectionRefs.current[index];
    if (!pane || !el) return;
    setActive(index);
    lockUntil.current = Date.now() + 700;
    const top =
      el.getBoundingClientRect().top -
      pane.getBoundingClientRect().top +
      pane.scrollTop;
    pane.scrollTo({ top: top - 8, behavior: reduce ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      if (pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 4) {
        setActive(sectionRefs.current.length - 1);
        return;
      }
      const paneTop = pane.getBoundingClientRect().top;
      let current = 0;
      sectionRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top - paneTop <= 64)
          current = index;
      });
      setActive(current);
    };
    pane.addEventListener('scroll', onScroll, { passive: true });
    return () => pane.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <aside className="hook-sidebar-demo__nav">
        <HookSidebar
          label={zh ? '目录' : 'Contents'}
          items={HOOK_DEMO_SECTIONS.map((s) => (zh ? s.zh : s.en))}
          value={active}
          onChange={goTo}
        />
      </aside>
      <div
        ref={paneRef}
        className="hook-sidebar-demo__pane"
        aria-label={zh ? '演示内容' : 'Demo content'}
      >
        {HOOK_DEMO_SECTIONS.map((section, index) => (
          <section
            key={section.en}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="hook-sidebar-demo__section"
          >
            <h4>{zh ? section.zh : section.en}</h4>
            <p>{zh ? section.text.zh : section.text.en}</p>
          </section>
        ))}
      </div>
    </>
  );
}

const ARTICLE_DEMO_SECTIONS = [
  {
    en: 'Look closer',
    zh: '先细看',
    text: {
      en: 'A second look begins a discovery. Another question begins an understanding.',
      zh: '多看一眼，是发现的开始；多问一句，是理解的开始。',
    },
  },
  {
    en: 'Ask questions',
    zh: '学会提问',
    text: {
      en: 'Describe what you see, offer an interpretation, then consider what it suggests for design.',
      zh: '先描述看见的东西，再提出解释，最后思考能为设计带来什么。',
    },
  },
  {
    en: 'Question beauty',
    zh: '追问美',
    text: {
      en: 'Beautiful for whom, under what conditions, and at what cost?',
      zh: '这种美为谁成立，在什么条件下成立，又付出了什么代价？',
    },
  },
  {
    en: 'See the system',
    zh: '看见系统',
    text: {
      en: 'A local impression, placed back into the whole experience.',
      zh: '把局部的感受，放回完整的体验里。',
    },
  },
];

function ArticleDirectoryDemo({ zh }: { zh: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const paneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const lockUntil = useRef(0);

  const goTo = (index: number) => {
    const pane = paneRef.current;
    const el = sectionRefs.current[index];
    if (!pane || !el) return;
    setActive(index);
    lockUntil.current = Date.now() + 700;
    const top =
      el.getBoundingClientRect().top -
      pane.getBoundingClientRect().top +
      pane.scrollTop;
    pane.scrollTo({ top: top - 8, behavior: reduce ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      if (pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 4) {
        setActive(sectionRefs.current.length - 1);
        return;
      }
      const paneTop = pane.getBoundingClientRect().top;
      let current = 0;
      sectionRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top - paneTop <= 64)
          current = index;
      });
      setActive(current);
    };
    pane.addEventListener('scroll', onScroll, { passive: true });
    return () => pane.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <aside className="article-directory-demo__aside">
        <ArticleDirectory
          backHref="/"
          backLabel={zh ? '返回' : 'Back'}
          tocLabel={zh ? '文章目录' : 'Table of contents'}
          items={ARTICLE_DEMO_SECTIONS.map((s) => (zh ? s.zh : s.en))}
          value={active}
          onChange={goTo}
        />
      </aside>
      <div
        ref={paneRef}
        className="article-directory-demo__pane"
        aria-label={zh ? '演示正文' : 'Article demo'}
      >
        {ARTICLE_DEMO_SECTIONS.map((section, index) => (
          <section
            key={section.en}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="article-directory-demo__section"
          >
            <h4>{zh ? section.zh : section.en}</h4>
            <p>{zh ? section.text.zh : section.text.en}</p>
          </section>
        ))}
      </div>
    </>
  );
}

const LIB_COMPONENT_ITEMS = [
  {
    id: 'tabs',
    en: 'Tabs',
    zh: 'Tabs',
    desc: {
      en: 'Switch between panels in the same place.',
      zh: '在同一区域切换不同面板。',
    },
  },
  {
    id: 'prompt',
    en: 'Prompt Input',
    zh: '输入栏',
    desc: {
      en: 'Compose a prompt with model and action menus.',
      zh: '带模型与动作菜单的输入框。',
    },
  },
  {
    id: 'accordion',
    en: 'Accordion',
    zh: '折叠面板',
    desc: {
      en: 'Expand and collapse content in a list.',
      zh: '在列表中展开与收起内容。',
    },
  },
];

const LIB_BLOCK_ITEMS = [
  {
    id: 'floating',
    en: 'Floating Agent',
    zh: '悬浮代理',
    desc: {
      en: 'A launcher that expands into a composer and a conversation.',
      zh: '从入口展开为输入栏与对话的组合。',
    },
  },
];

function LibraryDirectoryDemo({ zh }: { zh: boolean }) {
  const [active, setActive] = useState<'components' | 'blocks'>('components');
  const [index, setIndex] = useState(0);

  const current =
    active === 'components'
      ? LIB_COMPONENT_ITEMS[index]
      : LIB_BLOCK_ITEMS[index];

  return (
    <>
      <aside className="library-directory-demo__aside">
        <LibraryDirectory
          componentsLabel={zh ? '组件' : 'Components'}
          blocksLabel={zh ? '组合' : 'Blocks'}
          componentItems={LIB_COMPONENT_ITEMS.map((s) => (zh ? s.zh : s.en))}
          blockItems={LIB_BLOCK_ITEMS.map((s) => (zh ? s.zh : s.en))}
          componentValue={active === 'components' ? index : -1}
          blockValue={active === 'blocks' ? index : -1}
          onComponentChange={(i) => {
            setActive('components');
            setIndex(i);
          }}
          onBlockChange={(i) => {
            setActive('blocks');
            setIndex(i);
          }}
        />
      </aside>
      <div className="library-directory-demo__content">
        <h4>{zh ? current.zh : current.en}</h4>
        <p>{zh ? current.desc.zh : current.desc.en}</p>
      </div>
    </>
  );
}

export function ComponentGallery() {
  const { language, changeLanguage } = useSiteLanguage();
  const zh = language === 'zh';
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const match = window.location.hash.match(/^#(.+)$/);
      const index = match ? ALL_SECTIONS.findIndex((s) => s.id === match[1]) : -1;
      if (index >= 0) setActiveIndex(index);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const select = (index: number) => {
    setActiveIndex(index);
    history.replaceState(null, '', `#${ALL_SECTIONS[index].id}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const active = ALL_SECTIONS[activeIndex];

  return (
    <div
      className="minimal-site component-gallery component-library"
      lang={zh ? 'zh-CN' : 'en'}
    >
      <MinimalHeader
        language={language}
        onLanguageChange={changeLanguage}
        showIdentity={false}
      />
      <div className="gallery-layout">
        <aside className="gallery-directory">
          <LibraryDirectory
            componentsLabel={zh ? '组件' : 'Components'}
            blocksLabel={zh ? '组合' : 'Blocks'}
            componentItems={COMPONENT_SECTIONS.map((s) => (zh ? s.zh : s.en))}
            blockItems={BLOCK_SECTIONS.map((s) => (zh ? s.zh : s.en))}
            componentValue={
              activeIndex < COMPONENT_SECTIONS.length ? activeIndex : -1
            }
            blockValue={
              activeIndex >= COMPONENT_SECTIONS.length
                ? activeIndex - COMPONENT_SECTIONS.length
                : -1
            }
            onComponentChange={select}
            onBlockChange={(index) =>
              select(COMPONENT_SECTIONS.length + index)
            }
          />
        </aside>

        <main id="main-content" className="gallery-content">
          <h1>{zh ? active.zh : active.en}</h1>
          <p className="gallery-intro">
            {zh ? active.description.zh : active.description.en}
          </p>
          {active.render(zh)}
        </main>
      </div>
    </div>
  );
}
