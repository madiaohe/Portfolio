import { writingArticles, type LocalizedText } from './writing';
import { projects } from './projects';

type ReferenceItem = {
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  // Demo month (YYYY-MM), to be replaced with the actual publication date.
  date: string;
};

type ReferenceSection = {
  id: 'projects' | 'writing';
  title: LocalizedText;
  items: readonly ReferenceItem[];
};

// Dates below are fictional demo data for layout preview.
// Original writing is added first; the remaining outbound references belong to Emil.
export const referenceSections: readonly ReferenceSection[] = [
  {
    id: 'projects',
    title: { en: 'Projects', zh: '项目' },
    items: projects.map((project) => ({
      href: `/work/${project.slug}`,
      title: project.title,
      description: project.description,
      date: project.publishedAt.slice(0, 7),
    })),
  },
  {
    id: 'writing',
    title: { en: 'Writing', zh: '文章' },
    items: [
      ...writingArticles.map((article) => ({
        href: `/writing/${article.slug}`,
        title: article.title,
        description: article.description,
        date: article.publishedAt.slice(0, 7),
      })),
      {
        href: 'https://emilkowal.ski/ui/friction-as-a-feature',
        date: '2026-08',
        title: { en: 'Friction as a Feature', zh: '把阻力变成一种功能' },
        description: {
          en: 'A natural filter for bad ideas.',
          zh: '让不好的想法自然被筛掉。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/you-dont-need-animations',
        date: '2026-07',
        title: { en: 'You Don’t Need Animations', zh: '你并不需要那么多动画' },
        description: {
          en: 'Why you are animating more often than you should.',
          zh: '为什么你使用动画的频率可能太高了。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/agents-with-taste',
        date: '2026-06',
        title: { en: 'Agents with Taste', zh: '有品位的智能体' },
        description: {
          en: 'How to transfer taste into an AI.',
          zh: '如何把品位传递给 AI。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/building-a-toast-component',
        date: '2026-05',
        title: { en: 'Building a Toast Component', zh: '构建一个 Toast 组件' },
        description: {
          en: 'My experience building Sonner, a toast library.',
          zh: '我构建 Sonner 轻提示组件库的经历。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/developing-taste',
        date: '2026-04',
        title: { en: 'Developing Taste', zh: '培养品位' },
        description: {
          en: 'Why taste matters and how to develop it.',
          zh: '为什么品位重要，以及如何培养它。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/the-magic-of-clip-path',
        date: '2026-03',
        title: { en: 'The Magic of Clip Path', zh: 'Clip Path 的魔力' },
        description: {
          en: 'One of the most underrated CSS properties.',
          zh: '最被低估的 CSS 属性之一。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/7-practical-animation-tips',
        date: '2026-02',
        title: { en: '7 Practical Animation Tips', zh: '7 个实用的动画技巧' },
        description: {
          en: 'Simple ideas you can use to improve your animations.',
          zh: '用简单的方法改善你的动画。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/train-your-judgement',
        date: '2026-01',
        title: { en: 'Train Your Judgement', zh: '训练你的判断力' },
        description: {
          en: 'Settling for good enough is not good enough.',
          zh: '满足于“差不多”还不够。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/building-an-animation-course',
        date: '2025-12',
        title: { en: 'Building an animation course', zh: '打造一门动画课程' },
        description: {
          en: 'Behind the scenes of my animation course.',
          zh: '我的动画课程幕后故事。',
        },
      },
      {
        href: 'https://emilkowal.ski/ui/building-a-drawer-component',
        date: '2025-11',
        title: { en: 'Building a Drawer Component', zh: '构建一个抽屉组件' },
        description: {
          en: 'My experience building a drawer component for React.',
          zh: '我构建 Vaul 抽屉组件库的经历。',
        },
      },
    ],
  },
];
