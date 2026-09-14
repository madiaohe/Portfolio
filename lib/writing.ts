import type { HomeLanguage } from './home-copy';

export type LocalizedText = Record<HomeLanguage, string>;
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

export type WritingArticle = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description: LocalizedText;
  blocks: WritingBlock[];
  references?: { en: string[]; zh: string[] };
};

export const writingArticles: WritingArticle[] = [
  {
    slug: 'beauty-in-everyday-life',
    publishedAt: '2026-09-14',
    title: { zh: '从日常生活中发现美', en: 'Finding Beauty in Everyday Life' },
    description: {
      zh: '保持好奇，从细节中观察、理解与创造。',
      en: 'Staying curious, looking closer, and turning observations into design.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '我始终保持着好奇心。相比于急着寻找一个漂亮的答案，我更愿意先问：眼前这个再普通不过的东西，为什么会是现在的样子？',
          en: 'I stay curious. Before looking for a beautiful answer, I would rather ask a question: why is this ordinary thing in front of me the way it is?',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '一只杯子的把手，一扇门被推开的方式，午后落在墙上的影子。它们没有被放进作品集，也不需要解释自己，却可以成为理解设计的起点。对我来说，从日常生活中发现美，首先是一种愿意多看一眼的习惯。',
          en: 'The handle of a cup. The way a door opens. An afternoon shadow on a wall. None of these needs a portfolio or an explanation to become a starting point for understanding design. For me, finding beauty in everyday life begins with the habit of looking a little longer.',
        },
      },
      {
        type: 'heading',
        id: 'look-closer',
        text: { zh: '先细看', en: 'Look closer' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '“好看”是一个很快的判断，却常常让观察过早结束。如果只记住一种颜色或一个轮廓，最后留下的可能只是一个可以模仿的样式。',
          en: '“Beautiful” is a quick judgement, but it can end an observation too soon. If all I remember is a colour or a silhouette, I may be left with little more than a style to imitate.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '我更想把这个判断拆开：是什么吸引了我的注意？是比例、材质、光线，还是使用时恰到好处的反馈？如果换一个环境，或者换一个使用它的人，这种感受还会成立吗？',
          en: 'I want to take that judgement apart. What caught my attention: proportion, material, light, or a response that felt right in use? Would that feeling hold in a different setting, or for someone else?',
        },
      },
      {
        type: 'statement',
        text: {
          zh: '多看一眼，是发现的开始；多问一句，是理解的开始。',
          en: 'A second look begins a discovery. Another question begins an understanding.',
        },
      },
      {
        type: 'heading',
        id: 'everyday-observations',
        text: { zh: '学会提问', en: 'Ask questions' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '可以从三个常见的对象开始。先描述看见的东西，再提出自己的解释，最后想一想：这个发现能为设计带来什么？这三步需要分开，因为看见的事实和自己的推断并不是一回事。',
          en: 'Start with three familiar things. Describe what you see, offer an interpretation, then consider what it might suggest for design. Keep those steps separate: an observation and an inference are different kinds of knowledge.',
        },
      },
      {
        type: 'observations',
        caption: {
          zh: '三个观察示例：从看见的细节，走向可以继续验证的设计问题。',
          en: 'Three examples of moving from an everyday detail to a design question worth testing.',
        },
        items: [
          {
            title: { zh: '一只杯子', en: 'A cup' },
            observation: {
              zh: '观察把手与杯身之间的空隙，以及手指握住它时的位置。',
              en: 'Look at the gap between the handle and the cup, and where your fingers rest when holding it.',
            },
            interpretation: {
              zh: '一个顺眼的比例，是否也给手指留下了合适的空间？外观与身体的感受可能需要一起判断。',
              en: 'Does a pleasing proportion also leave enough room for your fingers? Appearance and physical comfort may need to be considered together.',
            },
            application: {
              zh: '设计屏幕上的控件时，同时检查视觉比例、点击范围和操作姿势，而不只看静态画面。',
              en: 'When designing a control, consider its proportions, touch target, and the posture of the person using it alongside the static composition.',
            },
          },
          {
            title: { zh: '一扇门', en: 'A door' },
            observation: {
              zh: '留意把手的形状、门的开启方向，以及推开它时的阻力。',
              en: 'Notice the shape of the handle, the direction the door opens, and the resistance you feel when pushing it.',
            },
            interpretation: {
              zh: '在读到“推”或“拉”之前，形状有没有给出正确的暗示？看起来精致的细节，也可能让人迟疑。',
              en: 'Before you read “push” or “pull,” does the shape suggest the right action? A refined detail can still leave someone uncertain.',
            },
            application: {
              zh: '检查界面的外观是否与可执行的动作一致，并通过反馈让人知道操作是否生效。',
              en: 'Check whether an interface suggests the actions it actually supports, and whether its feedback makes the result clear.',
            },
          },
          {
            title: { zh: '一束光', en: 'A patch of light' },
            observation: {
              zh: '观察光从亮处过渡到暗处的边缘，以及它如何让墙面的纹理显现出来。',
              en: 'Observe the edge where light turns to shade, and how it reveals the texture of a wall.',
            },
            interpretation: {
              zh: '吸引注意的也许并非某种颜色，而是明暗、材质与周围空白共同形成的关系。',
              en: 'What draws your attention may be a relationship between light, material, and empty space rather than a particular colour.',
            },
            application: {
              zh: '尝试用克制的对比与留白组织界面层次，再检查重要信息是否仍然容易辨认。',
              en: 'Try organising an interface through restrained contrast and spacing, then check that important information remains easy to distinguish.',
            },
          },
        ],
      },
      {
        type: 'heading',
        id: 'question-the-beauty',
        text: { zh: '追问美', en: 'Question beauty' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '保持好奇，并不意味着接受看到的一切。一个极简的界面可能很漂亮，也可能藏起了必要的信息；一种精致的材质可能适合展示，却不一定适合频繁触摸。',
          en: 'Staying curious does not mean accepting everything I see. A minimal interface can look beautiful while hiding necessary information. A refined material can work well on display without being suitable for frequent touch.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '批判性思维提醒我继续追问：这种美为谁成立，在什么条件下成立，又付出了什么代价？理解这些条件，才能决定哪些值得借鉴，哪些应该重新思考。',
          en: 'Critical thinking asks me to keep questioning: beautiful for whom, under what conditions, and at what cost? Understanding those conditions helps me decide what to learn from and what to reconsider.',
        },
      },
      {
        type: 'heading',
        id: 'see-the-system',
        text: { zh: '看见系统', en: 'See the system' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '一只杯子不只属于桌面上的构图。它还要被拿起、清洗、收纳，与其他物品放在一起。换一个环节，原本漂亮的细节可能就会产生新的问题。',
          en: 'A cup belongs to more than a composition on a table. It will be lifted, washed, stored, and placed beside other objects. In a different part of that sequence, a beautiful detail might introduce a new problem.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '我希望用同样的方式理解界面。一个按钮的美，不只在于圆角或颜色，也在于它与前后步骤、信息层级和使用情境的关系。系统思维让我把局部的感受，放回完整的体验里。',
          en: 'I want to understand interfaces in the same way. The beauty of a button lies partly in its relationship to the steps around it, the information hierarchy, and the setting in which it is used. Systems thinking brings a local impression back into the whole experience.',
        },
      },
      {
        type: 'heading',
        id: 'keep-looking',
        text: { zh: '保持观察', en: 'Keep looking' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '发现美不需要一开始就找到一个了不起的对象。今天手边的一件物品就足够了。重要的是留下自己的观察，并允许之后的理解修正它。',
          en: 'Finding beauty does not require an extraordinary subject. An object within reach today is enough. What matters is recording an observation and allowing a later understanding to revise it.',
        },
      },
      {
        type: 'exercise',
        title: {
          zh: '下一次，不妨这样观察',
          en: 'An exercise for your next observation',
        },
        steps: [
          {
            zh: '选一件日常物品，先描述三个具体细节，暂时不使用“好看”或“不好看”。',
            en: 'Choose an everyday object. Describe three specific details without calling it beautiful or ugly.',
          },
          {
            zh: '选一个吸引你的细节，写下它为什么让你产生这种感受。',
            en: 'Choose one detail that caught your attention and write down why it made you feel that way.',
          },
          {
            zh: '换一个使用者或使用情境，看看自己的解释是否仍然成立。',
            en: 'Imagine a different person or setting. Does your explanation still hold?',
          },
          {
            zh: '提出一个可以在设计中尝试的小想法，之后用实际体验检验它。',
            en: 'Suggest a small idea to try in a design, then test it through actual use.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          zh: '我想保留的，是这份愿意观察、追问和尝试的耐心。从生活中发现美，再用批判性思维和系统思维去建造与创造，让看见的东西慢慢成为自己的理解。',
          en: 'I want to keep the patience to observe, question, and try. To find beauty in everyday life, then build & create through critical thinking and systems thinking—gradually turning what I see into something I understand.',
        },
      },
    ],
  references: {
    en: [
      'Author, A. (2025). A place for the everyday. Publisher.',
      'Author, B. (2024). Looking closer: observation as method. Journal of Design, 12(3), 41–58.',
      'Author, C. (2023). Light and shadow at home. Press.',
    ],
    zh: [
      '作者甲.（2025）. 日常之所在. 出版社.',
      '作者乙.（2024）. 看得更细：把观察当作方法. 《设计学报》, 12(3), 41–58.',
      '作者丙.（2023）. 家中的光与影. 出版社.',
    ],
  },
}];

export function getWritingArticle(slug: string) {
  return writingArticles.find((article) => article.slug === slug);
}
