import type { LocalizedText, WritingBlock } from './writing';

export type Project = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description: LocalizedText;
  blocks: WritingBlock[];
  references?: { en: string[]; zh: string[] };
};

// 占位示例项目：展示项目详情页模板。把它替换成你自己的项目即可。
export const projects: Project[] = [
  {
    slug: 'example-project',
    publishedAt: '2026-10-01',
    title: { zh: '示例项目', en: 'Example Project' },
    description: {
      zh: '展示项目详情页模板的占位示例。',
      en: 'A placeholder that shows the project detail template.',
    },
    blocks: [
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
    ],
    references: {
      en: ['Author, A. (2026). Example source. Press.'],
      zh: ['作者甲.（2026）. 示例来源. 出版社.'],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
