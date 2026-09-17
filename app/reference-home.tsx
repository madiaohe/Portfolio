'use client';

import { referenceSections, type ReferenceItem } from '@/lib/reference-home';
import { homeCopy } from '@/lib/home-copy';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { NotionMentionLink } from '@/components/ui/notion-mention-link';
import { Tooltip } from '@/components/ui/tooltip';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';

export function ReferenceHome() {
  const { language } = useSiteLanguage();
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
  const parseItemDate = (date: string) =>
    new Date(`${date.length === 7 ? `${date}-01` : date}T00:00:00Z`);
  const projects = referenceSections.find(
    (section) => section.id === 'projects',
  );
  const writing = referenceSections.find((section) => section.id === 'writing');

  const renderReferenceItem = (
    item: ReferenceItem,
    index: number,
    items: readonly ReferenceItem[],
  ) => {
    const isDraft = item.status === 'draft';
    const previous = index > 0 ? items[index - 1] : undefined;
    const previousYear = previous?.date?.slice(0, 4) ?? null;
    const year = item.date?.slice(0, 4) ?? '';
    const startsYear = Boolean(item.date) && year !== previousYear;
    const next = items[index + 1];
    const nextYear = next?.date?.slice(0, 4) ?? null;
    const endsYear = Boolean(next?.date) && nextYear !== year;
    const className = `minimal-writing-link${
      isDraft ? ' minimal-writing-link--disabled' : ''
    }`;
    const itemDate = item.date ? parseItemDate(item.date) : null;
    const dateLabel = isDraft
      ? copy.comingSoon
      : itemDate
        ? monthFormatter.format(itemDate)
        : '';
    const fullDateLabel =
      !isDraft && itemDate
        ? monthYearFormatter.format(itemDate)
        : copy.comingSoon;

    const content = (
      <>
        <span className="minimal-writing-year" aria-hidden="true">
          {startsYear ? year : ''}
        </span>
        <span className="minimal-writing-title">{item.title[language]}</span>
        {isDraft || !item.date ? (
          <span className="minimal-writing-date">{dateLabel}</span>
        ) : (
          <time
            className="minimal-writing-date"
            dateTime={item.date}
            aria-label={fullDateLabel}
          >
            {dateLabel}
          </time>
        )}
      </>
    );

    return (
      <li
        key={item.href ?? item.title.en}
        className={endsYear ? 'minimal-writing-list-item--year-end' : undefined}
      >
        {isDraft ? (
          <div className={className} aria-disabled="true">
            {content}
          </div>
        ) : (
          <a className={className} href={item.href}>
            {content}
          </a>
        )}
      </li>
    );
  };

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
                {projects.items.map(renderReferenceItem)}
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
                {writing.items.map(renderReferenceItem)}
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
    </div>
  );
}
