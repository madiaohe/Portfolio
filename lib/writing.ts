import type { HomeLanguage } from './home-copy';

export type LocalizedText = Record<HomeLanguage, string>;

/**
 * Template selection shared by projects and writing articles.
 * 'article' (default) uses DetailPage: prose-led with a directory,
 * references and 4:3 blocks. 'showcase' uses ShowcasePage: cover,
 * optional facts and image-led chapters.
 */
export type DetailLayout = 'article' | 'showcase';

export type ShowcaseBlock =
  | { type: 'paragraph'; text: LocalizedText }
  | { type: 'heading'; id: string; text: LocalizedText }
  | { type: 'image'; src: string; alt: string; caption?: LocalizedText };

export type ShowcaseCover = {
  src: string;
  alt: string;
  caption?: LocalizedText;
};

export type ShowcaseLogo = {
  src: string;
  alt: string;
};

export type ShowcaseGalleryImage = {
  src: string;
  alt: string;
};

// Accept any CSS aspect-ratio value, e.g. '4 / 3', '16 / 9' or '1024 / 600'.
// Legacy '4:3' / '16:9' forms are also accepted and normalized at render time.
export type ShowcaseGalleryAspect = string;

export type ShowcaseFact = { label: LocalizedText; value: LocalizedText };

export type ShowcaseChapter = {
  id: string;
  heading: LocalizedText;
  blocks: ShowcaseBlock[];
};

export type WritingBlock =
  | { type: 'paragraph'; text: LocalizedText }
  | { type: 'heading'; id: string; text: LocalizedText }
  | { type: 'statement'; text: LocalizedText }
  | {
      type: 'observations';
      caption: LocalizedText;
      items: {
        title: LocalizedText;
        observation: LocalizedText;
        interpretation: LocalizedText;
        application: LocalizedText;
      }[];
    }
  | { type: 'exercise'; title: LocalizedText; steps: LocalizedText[] };

export type PublishedWritingArticle = {
  slug: string;
  publishedAt: string;
  status?: 'published';
  layout?: DetailLayout;
  title: LocalizedText;
  description: LocalizedText;
  blocks: WritingBlock[];
  cover?: ShowcaseCover;
  logo?: ShowcaseLogo;
  gallery?: ShowcaseGalleryImage[];
  galleryAspect?: ShowcaseGalleryAspect;
  chapters?: ShowcaseChapter[];
  references?: { en: string[]; zh: string[] };
};

export type DraftWritingArticle = {
  slug: string;
  status: 'draft';
  title: LocalizedText;
  description?: LocalizedText;
  // Draft content may be prepared locally, but it is excluded from routes and paging.
  publishedAt?: string;
  blocks?: WritingBlock[];
  references?: { en: string[]; zh: string[] };
};

export type WritingArticle = PublishedWritingArticle | DraftWritingArticle;

export const writingArticles: WritingArticle[] = [
  {
    slug: 'the-chaos-of-manufacturing-hmi',
    publishedAt: '2026-09-19',
    title: {
      zh: '制造业 HMI 的混乱',
      en: 'The Chaos of Manufacturing HMI',
    },
    description: {
      zh: '走进车间，每块屏幕都在各自为政。这份混乱来自视觉、信息架构，以及一个缺失的行业标准。',
      en: 'Walk into a workshop and every screen is doing its own thing. The chaos comes from visuals, information architecture, and a standard that doesn’t exist yet.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '我每天的工作是设计 HMI——人机界面，就是设备操作者面前那块屏幕。做这行越久，我越觉得制造业的 HMI 是混乱的。这种混乱不是偶尔出现在某一家，而是行业性的：你换一家设备厂商，就要重新学会怎么用那块屏幕。',
          en: 'My daily work is designing HMI—human-machine interfaces, the screens in front of machine operators. The longer I do this, the more I believe manufacturing HMI is chaotic. Not occasionally, at a single vendor—it’s industry-wide: switch to a different equipment maker and you have to relearn how to use the screen.',
        },
      },
      {
        type: 'heading',
        id: 'visual-chaos',
        text: { zh: '视觉的混乱', en: 'Visual chaos' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '很多 HMI 在视觉上极度丑陋。饱和的配色、随意的大小字号、堆满一屏的控件、没有层级也没有留白。它不像一个设计过的产品，更像一份把所有变量都摊开的电气说明书。',
          en: 'A lot of HMI is visually ugly. Saturated colours, arbitrary type sizes, a screen packed with controls, no hierarchy, no breathing room. It reads less like a designed product and more like an electrical manual that lays every variable out on the table.',
        },
      },
      {
        type: 'heading',
        id: 'information-architecture',
        text: { zh: '信息架构的混乱', en: 'Information architecture chaos' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '更根本的问题是信息架构。同样一台设备，有的要登录才能用，有的开机就能操作；报警、历史记录、生产统计、IO 监控——这些功能有的有、有的没有，就算有，入口、位置、叫法也各不相同。',
          en: 'The deeper problem is information architecture. On the same kind of machine, some require a login, some run the moment they’re powered on. Alarms, history, production statistics, IO monitoring—some have them, some don’t, and when they do, the entry points, placement, and naming all differ.',
        },
      },
      {
        type: 'heading',
        id: 'some-chaos-is-legitimate',
        text: { zh: '有些混乱是合理的', en: 'Some chaos is legitimate' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '我必须先分清哪些混乱是合理的。工艺流程不同，界面当然不同：挤出机的温度曲线和包装机的产量统计，本来就不该长成一个样子。这部分差异不是混乱，是专业。',
          en: 'I should first separate which chaos is legitimate. Different processes call for different screens: an extruder’s temperature curve and a packaging machine’s output statistics were never meant to look alike. That difference isn’t chaos—it’s expertise.',
        },
      },
      {
        type: 'heading',
        id: 'software-not-process',
        text: {
          zh: '混乱的不是工艺，是软件',
          en: 'The chaos is software, not process',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '真正的问题在软件层。报警、历史、统计、状态——这些是几乎所有设备都需要的通用能力，它们不随工艺变化。可恰恰是这些通用能力，每家都自己定义一遍。这才是混乱：不是行业没有能力统一，而是没有人认为它应该被统一。',
          en: 'The real problem is the software layer. Alarms, history, statistics, status—these are universal capabilities almost every machine needs, and they don’t change with the process. Yet it’s precisely these universal capabilities that every vendor redefines from scratch. That is the chaos: not that the industry can’t unify, but that no one thinks it should be unified.',
        },
      },
      {
        type: 'heading',
        id: 'the-cost-of-chaos',
        text: { zh: '混乱的代价', en: 'The cost of chaos' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '混乱是有代价的。操作者要同时熟悉好几家设备的界面；培训成本更高，误操作的风险更大；一个企业想横向比较不同设备的运行状况，连数据口径都对不上。硬件各有不同是合理的，软件却本可以共用同一种语言。',
          en: 'Chaos has a cost. Operators have to stay familiar with several vendors’ interfaces at once; training is more expensive, and the risk of misoperation grows. When a company wants to compare operating conditions across different machines, the data doesn’t even line up. Different hardware is reasonable—but the software could speak one shared language.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '我不确定这个行业会不会走到统一的那一天，也不认为答案是某一家厂商的私有标准。我只是觉得，作为 HMI 设计师，先把这个混乱看清、说清，是值得做的一步。',
          en: 'I don’t know whether the industry will ever converge, and I don’t think the answer is any single vendor’s proprietary standard. I just believe that, as an HMI designer, seeing this chaos clearly and naming it is a step worth taking.',
        },
      },
    ],
    references: {
      en: [
        'International Society of Automation. (2015). ANSI/ISA-101.01-2015: Human Machine Interfaces for Process Automation Systems. ISA.',
        'International Organization for Standardization. (2020). ISO 9241-110: Ergonomics of human-system interaction — Part 110: Interaction principles. ISO.',
        'Norman, D. (2013). The Design of Everyday Things. Basic Books.',
      ],
      zh: [
        '国际自动化学会（ISA）.（2015）. ANSI/ISA-101.01-2015：过程自动化系统人机界面. ISA.',
        '国际标准化组织（ISO）.（2020）. ISO 9241-110：人机交互工效学——第 110 部分：交互原则. ISO.',
        '诺曼，D.（2013）. 设计心理学. 中信出版社.',
      ],
    },
  },
];

export const publishedWritingArticles = writingArticles.filter(
  (article): article is PublishedWritingArticle => article.status !== 'draft',
);

export function getWritingArticle(slug: string) {
  return publishedWritingArticles.find((article) => article.slug === slug);
}
