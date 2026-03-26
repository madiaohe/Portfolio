import type { LocalizedText } from '@/content/types';

export interface AboutMilestone {
  year: string;
  index: string;
  keyword: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ContactRow {
  label: LocalizedText;
  type: 'text' | 'clock' | 'email' | 'phone' | 'link';
  value?: LocalizedText;
  href?: string;
}

export const pageSeo = {
  home: {
    title: { zh: '首页', en: 'Home' },
    description: {
      zh: '浏览精选项目、品牌方法和个人设计表达。',
      en: 'Explore selected projects, design thinking, and a personal creative voice.',
    },
  },
  about: {
    title: { zh: '关于', en: 'About' },
    description: {
      zh: '查看个人经历、设计方法和长期关注方向。',
      en: 'Learn about experience, process, and the long-term direction of the practice.',
    },
  },
  contact: {
    title: { zh: '联系', en: 'Contact' },
    description: {
      zh: '通过邮件和社交媒体发起合作沟通。',
      en: 'Start a conversation via email and social channels.',
    },
  },
  notFound: {
    title: { zh: '页面不存在', en: 'Page Not Found' },
    description: {
      zh: '请求的页面不存在，返回首页继续浏览。',
      en: 'The requested page could not be found. Return home to continue browsing.',
    },
  },
};

export const homeContent = {
  archivePrefix: {
    zh: 'https://portfolio.xianyu.design/project/',
    en: 'https://portfolio.xianyu.design/project/',
  },
};

export const aboutContent = {
  scrollHint: { zh: '滚动', en: 'Scroll' },
  milestones: [
    {
      year: '2016',
      index: '01',
      keyword: 'ORIGIN',
      title: { zh: '起点', en: 'The Beginning' },
      description: {
        zh: '从小型创意工作室开始设计实践，逐步建立视觉表达与品牌思维的基础。',
        en: 'Started in a boutique studio and built core skills in visual communication and brand thinking.',
      },
    },
    {
      year: '2017',
      index: '02',
      keyword: 'AWARD',
      title: { zh: '第一次被看见', en: 'First Recognition' },
      description: {
        zh: '完成早期品牌项目并获得更多合作机会，开始形成更明确的工作方向。',
        en: 'Delivered an early identity project that opened the door to broader opportunities.',
      },
    },
    {
      year: '2018',
      index: '03',
      keyword: 'DIGITAL',
      title: { zh: '转向数字产品', en: 'Going Digital' },
      description: {
        zh: '工作重心逐步扩展到数字产品与体验设计，开始关注系统、流程与交互。',
        en: 'Expanded into digital product and experience design with a stronger focus on systems and interaction.',
      },
    },
    {
      year: '2019',
      index: '04',
      keyword: 'LEAD',
      title: { zh: '开始带领项目', en: 'Creative Lead' },
      description: {
        zh: '承担更完整的创意和执行责任，逐渐形成稳定的方法论和协作节奏。',
        en: 'Took ownership of larger projects and developed a clearer creative process.',
      },
    },
    {
      year: '2020',
      index: '05',
      keyword: 'SOLO',
      title: { zh: '独立实践', en: 'Independence' },
      description: {
        zh: '开始以更独立的身份服务不同类型客户，也逐渐搭建自己的作品体系。',
        en: 'Began working more independently and defining a long-term personal practice.',
      },
    },
    {
      year: '2021',
      index: '06',
      keyword: 'GLOBAL',
      title: { zh: '跨地域协作', en: 'Global Reach' },
      description: {
        zh: '参与跨区域合作，在不同文化语境中练习统一的品牌叙事。',
        en: 'Collaborated across regions and adapted work to different cultural contexts.',
      },
    },
    {
      year: '2022',
      index: '07',
      keyword: 'MOTION',
      title: { zh: '体验与动态', en: 'Motion & Experience' },
      description: {
        zh: '把动态、叙事和空间感更深入地引入视觉系统，强化作品的体验层。',
        en: 'Brought motion and storytelling more directly into the visual systems.',
      },
    },
    {
      year: '2023',
      index: '08',
      keyword: 'GROW',
      title: { zh: '方法成熟', en: 'Practice Expansion' },
      description: {
        zh: '逐步沉淀自己的项目框架，让设计输出更稳定，也更容易协作与复盘。',
        en: 'Refined a repeatable project framework for more stable execution and reflection.',
      },
    },
    {
      year: '2024',
      index: '09',
      keyword: 'VOICE',
      title: { zh: '形成个人声音', en: 'Finding a Voice' },
      description: {
        zh: '开始更明确地把个人兴趣、审美判断与项目需求放进同一套表达体系。',
        en: 'Merged personal aesthetic direction more clearly with client and project goals.',
      },
    },
    {
      year: '2025',
      index: '10',
      keyword: 'NEXT',
      title: { zh: '下一步', en: "What's Next" },
      description: {
        zh: '继续把品牌、界面、动态与更完整的体验叙事连接起来，建立更长期的个人作品体系。',
        en: 'Continuing to connect brand, interface, motion, and narrative into a stronger body of work.',
      },
    },
  ] satisfies AboutMilestone[],
};

export const contactContent = {
  rows: [
    {
      label: { zh: '所在地', en: 'Location' },
      type: 'text',
      value: { zh: '中国 / 可远程协作', en: 'China / Remote-friendly' },
    },
    {
      label: { zh: '', en: '' },
      type: 'text',
      value: {
        zh: '当前以个人设计实践为主',
        en: 'Currently running an independent design practice',
      },
    },
    {
      label: { zh: '当前时间', en: 'Current Time' },
      type: 'clock',
    },
    {
      label: { zh: '邮箱', en: 'Email' },
      type: 'email',
      value: { zh: 'hello@example.com', en: 'hello@example.com' },
      href: 'mailto:hello@example.com',
    },
    {
      label: { zh: '项目合作', en: 'Project Enquiries' },
      type: 'email',
      value: { zh: 'projects@example.com', en: 'projects@example.com' },
      href: 'mailto:projects@example.com',
    },
    {
      label: { zh: '电话', en: 'Phone' },
      type: 'phone',
      value: { zh: '+86 138 0000 0000', en: '+86 138 0000 0000' },
      href: 'tel:+8613800000000',
    },
    {
      label: { zh: '社交媒体', en: 'Social' },
      type: 'link',
      value: { zh: 'Instagram', en: 'Instagram' },
      href: 'https://instagram.com/',
    },
    {
      label: { zh: '', en: '' },
      type: 'link',
      value: { zh: 'LinkedIn', en: 'LinkedIn' },
      href: 'https://linkedin.com/',
    },
  ] satisfies ContactRow[],
};
