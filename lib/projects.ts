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
    publishedAt: '2025-12-24',
    status: 'external',
    title: { zh: 'TESKO Web', en: 'TESKO Web' },
  },
  {
    slug: 'tesko-hmi',
    status: 'draft',
    publishedAt: '2025-12-01',
    title: { zh: 'TESKO HMI', en: 'TESKO HMI' },
    description: {
      zh: 'TESKO 人机界面设计项目。',
      en: 'An HMI design project for TESKO.',
    },
    blocks: createProjectTemplateBlocks(),
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
  // Reference showcase template: a project with layout: 'showcase' renders
  // the image-led ShowcasePage. Supply title, logo, facts (date / role /
  // type and any custom rows), gallery images + galleryAspect, and chapters;
  // place a { type: 'gallery' } block in a chapter to render the images.
  // See docs/showcase-template.md.
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
        value: [
          { zh: 'UI 设计师', en: 'UI Designer' },
          { zh: 'UX 设计师', en: 'UX Designer' },
        ],
      },
      {
        label: { zh: '类型', en: 'Type' },
        value: [
          { zh: 'HMI', en: 'HMI' },
          { zh: '工业设计', en: 'Industrial design' },
          { zh: '交互设计', en: 'Interaction design' },
        ],
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
              zh: '施耐德电气在工业自动化与能源管理领域深耕多年。这个项目聚焦工业现场设备的人机界面（HMI）：工程师需要在本地或远程完成 IO 驱动、IO 设备、无线 4G/Wi-Fi、VPN 等硬件的发现、连接、配置与自检。过去这些操作分散在多个工具和密集的参数表中，学习成本高，也容易在配置中途出错。',
              en: 'Schneider Electric is a long-standing leader in industrial automation and energy management. This project focuses on the human-machine interface (HMI) for industrial field devices: engineers need to discover, connect, configure, and self-test hardware such as IO drivers, IO equipment, wireless 4G/Wi-Fi, and VPN channels, both locally and remotely. In the past these tasks were scattered across multiple tools and dense parameter sheets — hard to learn and easy to break midway through a configuration.',
            },
          },
          {
            type: 'gallery',
          },
          {
            type: 'heading',
            id: 'goals',
            text: { zh: '设计目标', en: 'Design goals' },
          },
          {
            type: 'paragraph',
            text: {
              zh: '把复杂的设备配置收敛成一个清晰、可视、可引导的流程：让工程师在几分钟内走完「上电 → 连接 → 配置 → 自检 → 上线」的完整链路，并在任何一步出现问题时，都能被明确地看到、定位与修复，而不是靠经验和反复试错。',
              en: 'Fold complex device configuration into a clear, visual, guided flow: let engineers walk the full path from power-on to connect, configure, self-test, and go live within minutes, and make any failure visible, locatable, and recoverable instead of relying on experience and trial and error.',
            },
          },
          {
            type: 'heading',
            id: 'capabilities',
            text: { zh: '核心能力', en: 'Key capabilities' },
          },
          {
            type: 'paragraph',
            text: {
              zh: '· 状态可视化：首页直观区分「在线 / 离线 / 自检中」，网络与 VPN 状态一目了然；\n· 配置向导：IO 驱动、IO 设备、无线 4G/Wi-Fi、VPN 逐项引导，减少记忆负担；\n· 自检与排障：离线自检（COM2）把故障定位前置，现场不用来回排查；\n· 安全连接：Secure Connect 与 VPN 成为远程接入的默认路径，远程运维更可控。',
              en: '· Status-first visibility: the home screen separates online / offline / self-testing at a glance, with network and VPN states always visible;\n· Guided configuration: IO drivers, IO equipment, wireless 4G/Wi-Fi and VPN are configured step by step, reducing cognitive load;\n· Self-test and troubleshooting: offline self-test (COM2) surfaces faults early, so field visits are less about guessing;\n· Secure connectivity: Secure Connect and VPN are the default remote access path, making remote operations more controlled.',
            },
          },
          {
            type: 'heading',
            id: 'innovation',
            text: { zh: '设计语言与创新', en: 'Design language & innovation' },
          },
          {
            type: 'paragraph',
            text: {
              zh: '界面采用深色工业视觉，用状态色（在线绿、离线灰）传达实时反馈，危险操作均以弹窗二次确认。创新点在于「状态驱动的信息架构」：不按功能菜单平铺，而是围绕设备生命周期（上电 → 连接 → 配置 → 自检 → 上线）组织界面，新手可以按步骤完成，同时保留高级配置的深度；输入与交互兼容中文输入法与键盘操作，适配现场与远程两种使用场景。',
              en: 'The interface uses a dark industrial visual language, with status colors (green for online, grey for offline) carrying real-time feedback and destructive actions guarded by confirmation dialogs. The innovation is a status-driven information architecture: instead of flattening functions into menus, the UI is organized around the device lifecycle — power-on, connect, configure, self-test, go live — so newcomers can follow the steps while advanced configuration depth stays accessible. Input and interactions support Chinese IME composition and keyboard operation, suiting both field and remote scenarios.',
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
