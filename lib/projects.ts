import type {
  DetailLayout,
  LocalizedText,
  ShowcaseChapter,
  ShowcaseCover,
  ShowcaseFact,
  ShowcaseGalleryAspect,
  ShowcaseGalleryImage,
  ShowcaseLogo,
  WritingBlock,
} from './writing';

export type PublishedProject = {
  slug: string;
  publishedAt: string;
  status?: 'published';
  // 'article' (default) uses DetailPage; 'showcase' uses the image-led
  // ShowcasePage. Swap this field to switch templates without moving data.
  layout?: DetailLayout;
  title: LocalizedText;
  description?: LocalizedText;
  blocks: WritingBlock[];
  cover?: ShowcaseCover;
  logo?: ShowcaseLogo;
  gallery?: ShowcaseGalleryImage[];
  galleryAspect?: ShowcaseGalleryAspect;
  facts?: ShowcaseFact[];
  chapters?: ShowcaseChapter[];
  references?: { en: string[]; zh: string[] };
};

export type DraftProject = {
  slug: string;
  status: 'draft';
  title: LocalizedText;
  description?: LocalizedText;
  // Draft content may be prepared locally, but it is excluded from routes and paging.
  publishedAt?: string;
  blocks?: WritingBlock[];
  references?: { en: string[]; zh: string[] };
};

export type ExternalProject = {
  href: string;
  publishedAt: string;
  status: 'external';
  title: LocalizedText;
  description?: LocalizedText;
};

export type Project = PublishedProject | DraftProject | ExternalProject;

function createProjectTemplateBlocks(): WritingBlock[] {
  return [
    {
      type: 'paragraph',
      text: {
        zh: '这里写项目的简介。项目详情页与文章共用同一套模板：左侧目录、统一标题、4:3 组件容器、底部参考文献与上一篇/下一篇翻页。',
        en: 'Write the project summary here. Project and article detail pages share one template: left directory, unified headings, 4:3 component blocks, references, and a previous/next pager.',
      },
    },
    {
      type: 'heading',
      id: 'overview',
      text: { zh: '概览', en: 'Overview' },
    },
    {
      type: 'paragraph',
      text: {
        zh: '这里写项目背景、目标与结果。',
        en: 'Write the background, goals, and outcomes here.',
      },
    },
    {
      type: 'statement',
      text: {
        zh: '一句话说清项目的核心价值。',
        en: 'One line about the project’s core value.',
      },
    },
    {
      type: 'heading',
      id: 'process',
      text: { zh: '过程', en: 'Process' },
    },
    {
      type: 'paragraph',
      text: {
        zh: '这里描述设计或开发过程。',
        en: 'Describe the design or development process.',
      },
    },
  ];
}

export const projects: Project[] = [
  {
    slug: 'smart-indoor-climate',
    publishedAt: '2026-07-14',
    title: {
      zh: '室内环境智能调控系统',
      en: 'Smart Climate Control',
    },
    description: {
      zh: '室内环境智能调控系统项目。',
      en: 'A smart control system for indoor environments.',
    },
    blocks: createProjectTemplateBlocks(),
  },
  {
    slug: 'filter-cartridge-lifecycle',
    status: 'draft',
    publishedAt: '2026-06-09',
    title: {
      zh: '滤盒全生命周期管理系统',
      en: 'Filter Cartridge Lifecycle',
    },
    description: {
      zh: '滤盒全生命周期管理系统项目。',
      en: 'A lifecycle management system for filter cartridges.',
    },
    blocks: createProjectTemplateBlocks(),
  },
  {
    slug: 'laminator-hmi',
    status: 'draft',
    publishedAt: '2026-01-15',
    title: { zh: '复合机 HMI', en: 'Laminator HMI' },
    description: {
      zh: '复合机人机界面设计项目。',
      en: 'An HMI design project for a laminating machine.',
    },
    blocks: createProjectTemplateBlocks(),
  },
  {
    href: 'https://www.tesko.com.cn/',
    publishedAt: '2025-11-24',
    status: 'external',
    title: { zh: 'TESKO', en: 'TESKO' },
  },
  {
    slug: 'pack-pilot',
    status: 'draft',
    publishedAt: '2025-06-09',
    title: { zh: 'PackPilot', en: 'PackPilot' },
    description: {
      zh: '面向包装机 HMI 的生产 Agent。',
      en: 'A production agent for packaging-machine HMI.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: 'PackPilot（包装领航员）— 将传统 HMI 改造为面向生产的智能体。项目关注如何把包装机 HMI 中的状态、操作与生产上下文，重新组织进真实生产流程。',
          en: 'PackPilot — turning a traditional HMI into a production agent. The project explores how status, controls, and production context on packaging-machine HMIs can be reorganised around real production flows.',
        },
      },
      {
        type: 'heading',
        id: 'from-hmi-to-production-agent',
        text: {
          zh: '从传统 HMI 到可协同生产',
          en: 'From HMI to production collaboration',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: 'PackPilot 的出发点，是从传统 HMI 走向可协同生产的智能体：界面不只呈现设备状态，也帮助操作者在生产流程中理解当前处境与下一步。',
          en: 'PackPilot starts by moving from a traditional HMI toward a production agent: the interface does not only show equipment status, it also helps operators understand the current situation and the next step in production.',
        },
      },
      {
        type: 'heading',
        id: 'production-first-expression',
        text: { zh: '生产优先的表达', en: 'Production-first expression' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '界面优先呈现与当前生产相关的上下文，保持操作清晰、反馈明确，并让智能体建议停留在可以被人确认和执行的范围内。',
          en: 'The interface prioritises production context, keeps actions clear and feedback explicit, and keeps agent suggestions within a scope that people can review and execute.',
        },
      },
      {
        type: 'heading',
        id: 'current-status',
        text: { zh: '当前状态', en: 'Current status' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '项目仍在准备中。这里记录的是改造方向，不把尚未验证的能力描述为已完成成果。',
          en: 'The project is still in preparation. These notes describe the direction of the transformation and do not present unverified capabilities as completed outcomes.',
        },
      },
    ],
  },
  {
    slug: 'schneider-electric',
    publishedAt: '2025-03-03',
    layout: 'showcase',
    logo: {
      src: '/media/schneider-electric-logo.png',
      alt: 'Schneider Electric logo',
    },
    title: { zh: '施耐德', en: 'Schneider Electric' },
    blocks: createProjectTemplateBlocks(),
    facts: [
      {
        label: { zh: '时间', en: 'Date' },
        value: { zh: '2025 年 3 月', en: 'March 2025' },
      },
      {
        label: { zh: '角色', en: 'Role' },
        value: { zh: '待补充', en: 'TBD' },
      },
      {
        label: { zh: '类型', en: 'Type' },
        value: { zh: '待补充', en: 'TBD' },
      },
    ],
    galleryAspect: '16 / 9',
    gallery: [
      {
        src: '/media/schneider-electric/01-offline.png',
        alt: 'Schneider Electric — offline status',
      },
      {
        src: '/media/schneider-electric/02-network-on.png',
        alt: 'Schneider Electric — network connected',
      },
      {
        src: '/media/schneider-electric/03-setting.png',
        alt: 'Schneider Electric — settings dialog',
      },
      {
        src: '/media/schneider-electric/04-setting-popup.png',
        alt: 'Schneider Electric — settings popup',
      },
      {
        src: '/media/schneider-electric/05-offline-self-test.png',
        alt: 'Schneider Electric — offline self-test COM2',
      },
      {
        src: '/media/schneider-electric/06-io-driver-config.png',
        alt: 'Schneider Electric — IO driver configuration',
      },
      {
        src: '/media/schneider-electric/07-io-equipment-config.png',
        alt: 'Schneider Electric — IO equipment configuration',
      },
      {
        src: '/media/schneider-electric/08-wireless-4g.png',
        alt: 'Schneider Electric — wireless 4G',
      },
      {
        src: '/media/schneider-electric/09-wireless-wifi-popup.png',
        alt: 'Schneider Electric — wireless Wi-Fi link popup',
      },
      {
        src: '/media/schneider-electric/10-vpn-online.png',
        alt: 'Schneider Electric — VPN online',
      },
    ],
    chapters: [
      {
        id: 'overview',
        heading: { zh: '概览', en: 'Overview' },
        blocks: [
          {
            type: 'paragraph',
            text: {
              zh: '这是 showcase 模板的占位章节。项目真实内容（背景、设计方向、关键决策与结果）整理好后会替换这里。',
              en: 'This is a placeholder chapter for the showcase template. Real project content (context, design direction, decisions and outcomes) will replace this once it is ready.',
            },
          },
        ],
      },
    ],
  },
];

export const publishedProjects = projects.filter(
  (project): project is PublishedProject =>
    project.status !== 'draft' && project.status !== 'external',
);

export function getProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
