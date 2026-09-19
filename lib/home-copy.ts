export type HomeLanguage = 'en' | 'zh';

const english = {
  languageLabel: 'Language',
  comingSoon: 'Soon',
  location: 'I was based in Beijing and now work and live in Hefei.',
  workPrefix: 'I currently work on the HMI team at ',
  workSuffix:
    '. I stay curious, find beauty in everyday life, and build & create through critical thinking and systems thinking.',
  previousPrefix: 'Previously, I worked on the visual design team at ',
  previousSuffix: '.',
  profileSocialPrefix: 'You can find me on ',
  profileSocialJoin: ' and ',
  profileEmailPrefix: ', or reach me via ',
  profileEmailLabel: 'email',
  profileSocialSuffix: '.',
  socialBefore: 'You can see more of my work on ',
  socialBetween: ' and more of my code on ',
  socialAfter: '.',
};

export const homeCopy: Record<
  HomeLanguage,
  Record<keyof typeof english, string>
> = {
  en: english,
  zh: {
    languageLabel: '语言',
    comingSoon: '准备中',
    location: '我此前在北京工作，目前在合肥工作与生活。',
    workPrefix: '我目前在 ',
    workSuffix:
      ' 的 HMI 团队工作。我始终保持着好奇心，从日常生活中发现美，用批判性思维和系统思维去建造与创造。',
    previousPrefix: '此前，我在 ',
    previousSuffix: ' 的视觉设计团队工作。',
    profileSocialPrefix: '你可以在 ',
    profileSocialJoin: ' 和 ',
    profileEmailPrefix: ' 上找到我，或通过',
    profileEmailLabel: '电子邮件',
    profileSocialSuffix: '联系我。',
    socialBefore: '你可以在 ',
    socialBetween: ' 查看更多我的作品，在 ',
    socialAfter: ' 查看更多我的代码。',
  },
};
