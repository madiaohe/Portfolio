import type { LocalizedText, WritingBlock } from './writing';

export type Project = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description: LocalizedText;
  blocks: WritingBlock[];
  references?: { en: string[]; zh: string[] };
};

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
    publishedAt: '2026-01-15',
    title: { zh: '复合机 HMI', en: 'Laminator HMI' },
    description: {
      zh: '复合机人机界面设计项目。',
      en: 'An HMI design project for a laminating machine.',
    },
    blocks: createProjectTemplateBlocks(),
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
