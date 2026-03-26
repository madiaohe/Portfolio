import type { LocalizedText, ProjectType } from '@/content/types';

export interface ProjectContent {
  id: string;
  slug: string;
  type: ProjectType;
  year: string;
  categoryKey: string;
  color: string;
  client: LocalizedText;
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  body: {
    zh: string[];
    en: string[];
  };
  role: LocalizedText;
  location: string;
  tags: string[];
  coverImage: string;
  detailImages: string[];
  isNew?: boolean;
}

export const projectCategories = [
  { key: 'campaign', label: { zh: 'Campaign', en: 'Campaign' } },
  { key: 'branding', label: { zh: 'Branding', en: 'Branding' } },
  { key: 'strategy', label: { zh: 'Strategy', en: 'Strategy' } },
  { key: 'design', label: { zh: 'Design', en: 'Design' } },
  { key: 'motion', label: { zh: 'Motion', en: 'Motion' } },
  { key: 'live-action', label: { zh: 'Live Action', en: 'Live Action' } },
  { key: 'experience', label: { zh: 'Experience', en: 'Experience' } },
] as const;

export const projectEntries: ProjectContent[] = [
  {
    id: 'project-1',
    slug: 'penfolds-heritage',
    type: 'concept',
    year: '2025',
    categoryKey: 'campaign',
    color: '#1C5083',
    client: { zh: 'Penfolds', en: 'Penfolds' },
    title: { zh: 'Penfolds', en: 'Penfolds' },
    tagline: { zh: '当传统与新表达相遇', en: 'Where heritage meets innovation' },
    description: {
      zh: '围绕品牌传统与现代视觉之间的张力，建立一个更适合数字传播语境的概念方向。',
      en: 'A concept direction exploring how a heritage brand could be translated into a sharper digital campaign language.',
    },
    body: {
      zh: ['这个概念项目尝试把经典品牌资产重新放入当代语境，用更克制的系统和更强的画面秩序建立新的感知。', '重点不在于完全重做品牌，而是通过视觉节奏、叙事线索和内容编排去重构品牌被观看的方式。'],
      en: ['This concept explores how a heritage-led brand could be reframed through a more contemporary visual system.', 'The focus is not on replacing the brand, but on adjusting how it is seen through composition, pacing, and campaign storytelling.'],
    },
    role: { zh: '概念方向 / 视觉系统', en: 'Concept Direction / Visual System' },
    location: 'AU',
    tags: ['campaign', 'visual-system'],
    coverImage: 'https://images.unsplash.com/photo-1695048475495-6535686c473c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlJTIwbHV4dXJ5JTIwYnJhbmRpbmd8ZW58MXx8fHwxNzcxODQxMjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-2',
    slug: 'samsung-unfold',
    type: 'concept',
    year: '2025',
    categoryKey: 'branding',
    color: '#F5D615',
    client: { zh: 'Samsung', en: 'Samsung' },
    title: { zh: 'Samsung', en: 'Samsung' },
    tagline: { zh: '展开一种更沉浸的品牌观看方式', en: 'Unfold your world' },
    description: {
      zh: '针对科技品牌传播场景构建的概念项目，强调产品体验与信息节奏的统一。',
      en: 'A concept study for a technology brand, balancing product expression with a more controlled narrative pace.',
    },
    body: {
      zh: ['项目聚焦“展开”这一核心动作，把它从产品卖点延展成更完整的视觉结构。', '通过层级、版式与节奏的控制，让科技内容在视觉上更有秩序，也更容易形成品牌记忆。'],
      en: ['The work extends the idea of unfolding from a feature into a broader visual principle.', 'Hierarchy, layout, and pacing are used to make technical content feel more composed and memorable.'],
    },
    role: { zh: '概念策略 / 视觉表达', en: 'Concept Strategy / Visual Design' },
    location: 'KR',
    tags: ['branding', 'technology'],
    coverImage: 'https://images.unsplash.com/photo-1627609834351-8acf84c573fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwc21hcnRwaG9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxODQxMjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-3',
    slug: 'heineken-open-world',
    type: 'concept',
    year: '2024',
    categoryKey: 'campaign',
    color: '#009E45',
    client: { zh: 'Heineken', en: 'Heineken' },
    title: { zh: 'Heineken', en: 'Heineken' },
    tagline: { zh: '围绕开放感建立更具参与性的传播语境', en: 'Open your world' },
    description: {
      zh: '一个偏体验导向的传播概念，重点在于气氛营造和人群互动感。',
      en: 'An experience-led campaign concept focused on atmosphere, participation, and visual energy.',
    },
    body: {
      zh: ['项目以更强的公共感和参与感为线索，强调品牌在场景中的开放姿态。', '视觉层面使用更直接的色彩和节奏，强化活动化、节庆化的观看体验。'],
      en: ['The concept uses openness as a spatial and emotional cue rather than a literal slogan.', 'Color and pacing are tuned to support a more event-like, participatory brand experience.'],
    },
    role: { zh: '传播概念 / 画面系统', en: 'Campaign Concept / Image System' },
    location: 'NL',
    tags: ['campaign', 'experience'],
    coverImage: 'https://images.unsplash.com/photo-1572692172990-fc70e8f31491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWluZWtlbiUyMGJlZXIlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NzE4NDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-4',
    slug: 'tissot-gift-of-time',
    type: 'real',
    year: '2025',
    categoryKey: 'live-action',
    color: '#F52822',
    client: { zh: 'Tissot', en: 'Tissot' },
    title: { zh: 'Tissot', en: 'Tissot' },
    tagline: { zh: '在礼赠语境中重新处理时间的视觉叙事', en: 'The past, a present, the future' },
    description: {
      zh: '一个偏内容叙事的真实项目示例，强调影像气质与品牌语义的统一。',
      en: 'A real-project placeholder focused on aligning narrative film language with the brand message.',
    },
    body: {
      zh: ['项目试图把“时间”从产品属性转译成更具情绪张力的叙事主题，在影像与平面之间保持一致性。', '这一页后续适合放入更完整的项目背景、分镜思路、执行过程和结果复盘。'],
      en: ['This project translates the idea of time from a product feature into a more emotional campaign narrative.', 'It is designed to later hold fuller project background, process notes, and execution documentation.'],
    },
    role: { zh: '艺术指导 / 内容叙事', en: 'Art Direction / Narrative Design' },
    location: 'CH',
    tags: ['real', 'live-action'],
    coverImage: 'https://images.unsplash.com/photo-1639564879163-a2a85682410e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHRpbWVwaWVjZXxlbnwxfHx8fDE3NzE3NTk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
    isNew: true,
  },
  {
    id: 'project-5',
    slug: 'spotify-moments',
    type: 'concept',
    year: '2024',
    categoryKey: 'strategy',
    color: '#BEDB39',
    client: { zh: 'Spotify', en: 'Spotify' },
    title: { zh: 'Spotify', en: 'Spotify' },
    tagline: { zh: '让声音被组织成更有节奏的品牌时刻', en: 'Music for every moment' },
    description: {
      zh: '围绕品牌节奏与内容策划构建的概念展示，用来承接更偏策略与体验的作品表达。',
      en: 'A concept project shaped around pacing, programming, and brand moments.',
    },
    body: {
      zh: ['这个项目更适合承接策略层的表达，强调“如何组织内容”而不是只展示最后的视觉结果。', '后续可以继续补充从洞察、方向、验证到上线物料的完整过程。'],
      en: ['This entry is suited to strategy-led storytelling, showing how content is structured rather than only how it looks.', 'It can later expand to cover insight, direction setting, validation, and rollout assets.'],
    },
    role: { zh: '策略 / 体验编排', en: 'Strategy / Experience Framing' },
    location: 'SE',
    tags: ['strategy', 'experience'],
    coverImage: 'https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NzE4MDk0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-6',
    slug: 'nespresso-what-else',
    type: 'concept',
    year: '2024',
    categoryKey: 'design',
    color: '#986E36',
    client: { zh: 'Nespresso', en: 'Nespresso' },
    title: { zh: 'Nespresso', en: 'Nespresso' },
    tagline: { zh: '把日常消费体验处理得更有质感', en: 'What else?' },
    description: {
      zh: '一个强调材质感、细节秩序与产品气质的视觉概念项目。',
      en: 'A concept focused on materiality, detail, and product atmosphere.',
    },
    body: {
      zh: ['项目聚焦细节密度和观看节奏，希望让日常消费场景也能拥有更强的设计质感。', '在后续深化时，可以把系统性的组件、摄影控制和版式规则补充进去。'],
      en: ['The work looks at how detail density and pacing can raise the perceived quality of a familiar product category.', 'Later iterations can expand on the system, photography rules, and compositional logic.'],
    },
    role: { zh: '视觉设计 / 质感研究', en: 'Visual Design / Material Study' },
    location: 'CH',
    tags: ['design', 'product'],
    coverImage: 'https://images.unsplash.com/photo-1716623816136-f3872b6d9020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMG1hY2hpbmUlMjBjbG9zZXVwfGVufDF8fHx8MTc3MTg0MTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-7',
    slug: 'tiffany-legendary',
    type: 'concept',
    year: '2024',
    categoryKey: 'experience',
    color: '#0094A5',
    client: { zh: 'Tiffany & Co.', en: 'Tiffany & Co.' },
    title: { zh: 'Tiffany', en: 'Tiffany' },
    tagline: { zh: '通过空间感和物件感强化品牌记忆', en: 'Some style is legendary' },
    description: {
      zh: '一个更偏场景化体验的概念项目，适合后续扩展成多触点叙事。',
      en: 'An experience-driven concept that can later expand into a multi-touchpoint story.',
    },
    body: {
      zh: ['项目尝试从“对象”转向“场景”，让珠宝品牌的高级感在空间与节奏中被感知。', '它适合承接更多跨媒介表达，比如陈列、互动和数字界面中的一致气质。'],
      en: ['The concept shifts emphasis from the object alone to the surrounding scene and pacing.', 'It is well suited to future work spanning display, interaction, and digital brand touchpoints.'],
    },
    role: { zh: '体验概念 / 艺术指导', en: 'Experience Concept / Art Direction' },
    location: 'US',
    tags: ['experience', 'luxury'],
    coverImage: 'https://images.unsplash.com/photo-1552234914-13f6e51124ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWZmYW55JTIwamV3ZWxyeSUyMGRpYW1vbmQlMjByaW5nfGVufDF8fHx8MTc3MTg0MTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-8',
    slug: 'glossier-skin-first',
    type: 'concept',
    year: '2024',
    categoryKey: 'branding',
    color: '#F99DBC',
    client: { zh: 'Glossier', en: 'Glossier' },
    title: { zh: 'Glossier', en: 'Glossier' },
    tagline: { zh: '把轻盈感延展成更完整的品牌语调', en: 'Skin first, makeup second' },
    description: {
      zh: '聚焦语气、色彩和内容感知的一组品牌概念探索。',
      en: 'A brand concept study around tone, color, and content perception.',
    },
    body: {
      zh: ['项目以“轻”作为切入点，探索如何把简洁做得更有层次，而不流于模板化。', '适合继续补充包装、网页、内容视觉等多个应用面，形成更完整的案例结构。'],
      en: ['The project uses lightness as a starting point and tests how minimal expression can still feel distinct.', 'It can later grow into a fuller case covering packaging, web touchpoints, and content systems.'],
    },
    role: { zh: '品牌概念 / 内容语气', en: 'Brand Concept / Tone of Voice' },
    location: 'US',
    tags: ['branding', 'beauty'],
    coverImage: 'https://images.unsplash.com/photo-1641900852186-62d3cc1ebe79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNvc21ldGljcyUyMG1pbmltYWx8ZW58MXx8fHwxNzcxODQxMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-9',
    slug: 'adidas-impossible',
    type: 'concept',
    year: '2024',
    categoryKey: 'motion',
    color: '#1060B6',
    client: { zh: 'Adidas', en: 'Adidas' },
    title: { zh: 'Adidas', en: 'Adidas' },
    tagline: { zh: '通过运动节奏强化视觉系统的推进力', en: 'Impossible is nothing' },
    description: {
      zh: '一组偏动态和节奏构成的概念研究，强调速度感与系统性。',
      en: 'A motion-led concept study built around rhythm, speed, and repeatable visual rules.',
    },
    body: {
      zh: ['这类项目适合用来承接动态语言和系统语言的结合，让品牌表达更有推进感。', '后续可以增加更明确的分镜、关键帧和交互动线，提升案例的完整度。'],
      en: ['This entry is useful for showing how motion and systems can reinforce each other in a brand language.', 'Later iterations can include clearer storyboards, keyframes, and interaction paths.'],
    },
    role: { zh: '动态概念 / 系统设计', en: 'Motion Concept / System Design' },
    location: 'DE',
    tags: ['motion', 'sports'],
    coverImage: 'https://images.unsplash.com/photo-1670416035623-6538fd6810c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGlkYXMlMjBzbmVha2VycyUyMHNwb3J0c3xlbnwxfHx8fDE3NzE4NDEyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-10',
    slug: 'aesop-seek',
    type: 'concept',
    year: '2023',
    categoryKey: 'design',
    color: '#583E36',
    client: { zh: 'Aesop', en: 'Aesop' },
    title: { zh: 'Aesop', en: 'Aesop' },
    tagline: { zh: '在克制的视觉里建立更细腻的阅读感', en: 'Seek and you shall find' },
    description: {
      zh: '一个更偏版式与质感控制的案例方向，适合呈现平静但有力度的表达。',
      en: 'A quieter case direction focused on typography, texture, and controlled visual restraint.',
    },
    body: {
      zh: ['项目关注如何在低饱和、低噪音的画面里依然保留清晰的识别度和品牌温度。', '它适合进一步延展成包装、内容、网页与空间之间的统一叙事。'],
      en: ['The focus here is on maintaining distinction and warmth inside a restrained visual field.', 'It can later stretch into packaging, content, web, and spatial touchpoints within one story.'],
    },
    role: { zh: '视觉系统 / 版式研究', en: 'Visual System / Typographic Study' },
    location: 'AU',
    tags: ['design', 'editorial'],
    coverImage: 'https://images.unsplash.com/photo-1768483018807-bd0b9ab86539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBtaW5pbWFsaXN0JTIwYmVhdXR5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzcxODQxMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
  {
    id: 'project-11',
    slug: 'chanel-inside',
    type: 'concept',
    year: '2023',
    categoryKey: 'experience',
    color: '#E2C8E7',
    client: { zh: 'Chanel', en: 'Chanel' },
    title: { zh: 'Chanel', en: 'Chanel' },
    tagline: { zh: '把时尚叙事转译成更具有层次的数字观看体验', en: 'Inside Chanel' },
    description: {
      zh: '偏内容叙事与奢侈品语境结合的概念项目，用来承接更完整的品牌故事表达。',
      en: 'A concept combining editorial storytelling with luxury-brand digital experience.',
    },
    body: {
      zh: ['项目尝试让内容本身成为体验的一部分，而不仅仅是信息的容器。', '后续非常适合扩展为章节结构、过渡动效和内容阅读节奏更丰富的深度案例。'],
      en: ['The idea is to let content become part of the experience, rather than only carrying information.', 'It is a strong candidate for deeper chapter-based storytelling, transitions, and editorial pacing.'],
    },
    role: { zh: '内容叙事 / 数字体验', en: 'Editorial Narrative / Digital Experience' },
    location: 'FR',
    tags: ['experience', 'fashion'],
    coverImage: 'https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFuZWwlMjBmYXNoaW9uJTIwcnVud2F5JTIwbHV4dXJ5fGVufDF8fHx8MTc3MTg0MTI0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    detailImages: [],
  },
];
