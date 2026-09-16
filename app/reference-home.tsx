'use client';

import Image from 'next/image';
import { Languages, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { referenceSections } from '@/lib/reference-home';
import { homeCopy } from '@/lib/home-copy';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { NotionMentionLink } from '@/components/ui/notion-mention-link';
import { Tooltip } from '@/components/ui/tooltip';
import { FloatingButton } from '@/components/ui/floating-button';
import { CapsuleInput } from '@/components/ui/capsule-input';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { useSiteTheme } from '@/lib/hooks/use-site-theme';

export function ReferenceHome() {
  const { language, changeLanguage } = useSiteLanguage();
  const { theme, toggleTheme } = useSiteTheme();
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerValue, setComposerValue] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const zh = language === 'zh';
  const copy = homeCopy[language];
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    timeZone: 'UTC',
  });
  const monthYearFormatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const projectDateFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const fullDateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const projects = referenceSections.find(
    (section) => section.id === 'projects',
  );
  const writing = referenceSections.find((section) => section.id === 'writing');

  return (
    <div
      className="minimal-site minimal-home"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <div className="minimal-shell">
        <MinimalHeader avatarSrc="/media/xu-xianyu-avatar.jpg" />

        <main id="main-content">
          <div>
            <p className="minimal-intro">{copy.location}</p>
            <p className="minimal-intro">
              {copy.workPrefix}
              <NotionMentionLink
                url="https://www.savehmi.com"
                className="minimal-pending-link"
                previewLogo="/media/save-hmi-logo.png"
                metadata={{
                  url: 'https://www.savehmi.com',
                  title: 'SAVE HMI',
                  description:
                    '英特费斯是一家面向中国装备制造业的设计与数字创新公司：人机交互业务、装备企业数字化营销、软件开发（RISEMAP 装备制造业数字化平台）。让中国装备制造业，更美好。',
                  siteName: 'SAVE HMI',
                  domain: 'savehmi.com',
                  image: '/media/save-hmi-link-preview.jpg',
                  favicon: 'https://www.savehmi.com/assets/favicon.svg',
                }}
                unavailableLabel={
                  language === 'zh'
                    ? '暂时无法加载预览，你仍然可以直接打开链接。'
                    : 'Preview unavailable. You can still open the link directly.'
                }
              >
                SAVE HMI
              </NotionMentionLink>
              {copy.workSuffix}
            </p>
            <p className="minimal-intro">
              {copy.previousPrefix}
              <NotionMentionLink
                url="https://www.camerich.com"
                className="minimal-pending-link"
                metadata={{
                  url: 'https://www.camerich.com',
                  title: 'CAMERICH',
                  description:
                    'CAMERICH锐驰具有前瞻的国际化视野，与国内外设计师跨界合作，例如张轲、阿尔瓦罗·西扎、郭锡恩、胡如珊等优秀建筑师。在国际展会上推出超前概念展。以品牌力量将中国原创推向国际，探索未来人居环境的可持续性。',
                  siteName: 'CAMERICH',
                  domain: 'camerich.com',
                  image: '/media/camerich-link-preview.jpg',
                  favicon: 'https://www.camerich.com/favicon.ico',
                }}
                unavailableLabel={
                  language === 'zh'
                    ? '暂时无法加载预览，你仍然可以直接打开链接。'
                    : 'Preview unavailable. You can still open the link directly.'
                }
              >
                CAMERICH
              </NotionMentionLink>
              {copy.previousSuffix}
            </p>
            <p className="minimal-intro">
              {copy.profileSocialPrefix}
              <Tooltip content="xianyu555555@gmail.com" side="top">
                <button type="button" className="minimal-pending-link">
                  X
                </button>
              </Tooltip>
              {copy.profileSocialJoin}
              <Tooltip content="9493694295" side="top">
                <button type="button" className="minimal-pending-link">
                  Xiaohongshu
                </button>
              </Tooltip>
              {copy.profileEmailPrefix}
              <Tooltip content="572987849@qq.com" side="top">
                <button type="button" className="minimal-pending-link">
                  {copy.profileEmailLabel}
                </button>
              </Tooltip>
              {copy.profileSocialSuffix}
            </p>
          </div>

          {projects && projects.items.length > 0 ? (
            <section
              className="minimal-section minimal-directory minimal-projects"
              aria-labelledby="projects-heading"
            >
              <h2 className="minimal-heading" id="projects-heading">
                {projects.title[language]}
              </h2>
              <ul className="minimal-writing-list">
                {projects.items.map((item, index) => {
                  const year = item.date.slice(0, 4);
                  const previousYear =
                    index > 0
                      ? projects.items[index - 1].date.slice(0, 4)
                      : null;
                  const startsYear = year !== previousYear;

                  return (
                    <li key={item.href}>
                      <a
                        className="minimal-writing-link"
                        href={item.href}
                      >
                        <span
                          className="minimal-writing-year"
                          aria-hidden="true"
                        >
                          {startsYear ? year : ''}
                        </span>
                        <span className="minimal-writing-title">
                          {item.title[language]}
                        </span>
                        <time
                          className="minimal-writing-date"
                          dateTime={item.date}
                          aria-label={fullDateFormatter.format(
                            new Date(`${item.date}T00:00:00Z`),
                          )}
                        >
                          {projectDateFormatter.format(
                            new Date(`${item.date}T00:00:00Z`),
                          )}
                        </time>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {writing ? (
            <section
              className="minimal-section minimal-directory minimal-writing"
              aria-labelledby="writing-heading"
            >
              <h2 className="minimal-heading" id="writing-heading">
                {writing.title[language]}
              </h2>
              <ul className="minimal-writing-list">
                {writing.items.map((item, index) => {
                  const year = item.date.slice(0, 4);
                  const previousYear =
                    index > 0
                      ? writing.items[index - 1].date.slice(0, 4)
                      : null;
                  const startsYear = year !== previousYear;

                  return (
                    <li key={item.href}>
                      <a className="minimal-writing-link" href={item.href}>
                        <span
                          className="minimal-writing-year"
                          aria-hidden="true"
                        >
                          {startsYear ? year : ''}
                        </span>
                        <span className="minimal-writing-title">
                          {item.title[language]}
                        </span>
                        <time
                          className="minimal-writing-date"
                          dateTime={item.date}
                          aria-label={monthYearFormatter.format(
                            new Date(`${item.date}-01T00:00:00Z`),
                          )}
                        >
                          {monthFormatter.format(
                            new Date(`${item.date}-01T00:00:00Z`),
                          )}
                        </time>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          <footer className="minimal-section minimal-more">
            <div className="minimal-muted">
              {copy.socialBefore}
              <a
                href="https://twitter.com/emilkowalski"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              {copy.socialBetween}
              <a
                href="https://github.com/emilkowalski"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              {copy.socialAfter}
            </div>
          </footer>
        </main>
      </div>
      <FloatingButton
        placement="fixed"
        label={zh ? '快捷操作' : 'Quick actions'}
        actionsLabel={zh ? '快捷操作' : 'Quick actions'}
        open={composerOpen}
        onOpenChange={setComposerOpen}
        actions={[
          {
            id: 'language',
            position: 'top-right',
            label: zh ? '切换到英文' : 'Switch to Chinese',
            active: language === 'zh',
            icon: <Languages size={16} strokeWidth={1.6} aria-hidden="true" />,
            onSelect: () => changeLanguage(language === 'en' ? 'zh' : 'en'),
          },
          {
            id: 'ai',
            position: 'top',
            label: zh ? '打开输入框' : 'Open input',
            icon: (
              <Image
                src="/media/floating-agent-logo.svg"
                width={16}
                height={16}
                alt=""
                className="floating-input-logo"
              />
            ),
            onSelect: () => setComposerOpen(true),
          },
          {
            id: 'theme',
            position: 'top-left',
            label:
              theme === 'dark'
                ? zh
                  ? '切换到浅色模式'
                  : 'Switch to light mode'
                : zh
                  ? '切换到深色模式'
                  : 'Switch to dark mode',
            icon:
              theme === 'dark' ? (
                <Sun size={16} strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <Moon size={16} strokeWidth={1.6} aria-hidden="true" />
              ),
            onSelect: toggleTheme,
          },
        ]}
      >
        <CapsuleInput
          value={composerValue}
          onValueChange={setComposerValue}
          placeholder={zh ? '随心输入' : 'Ask anything'}
          voiceLabel={zh ? '语音输入' : 'Voice input'}
          voiceActive={voiceActive}
          onVoiceClick={() => setVoiceActive((active) => !active)}
          sendLabel={zh ? '发送' : 'Send'}
          onSubmit={(_prompt) => {
            setComposerValue('');
            setVoiceActive(false);
            setComposerOpen(false);
          }}
        />
      </FloatingButton>
    </div>
  );
}
