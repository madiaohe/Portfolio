import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';

const hefeiTimeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Shanghai',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function formatHefeiTime(date: Date) {
  return hefeiTimeFormatter
    .format(date)
    .replace(/\s*(am|pm)$/i, (_, period: string) => ` ${period.toUpperCase()}`);
}

export function MinimalHeader({
  avatarSrc,
  showIdentity = true,
}: {
  avatarSrc?: string;
  showIdentity?: boolean;
}) {
  const { language } = useSiteLanguage();
  const [now, setNow] = useState(() => new Date());
  const localTime = formatHefeiTime(now);
  const isZh = language === 'zh';

  useEffect(() => {
    if (!showIdentity) return;

    let interval: number | undefined;
    const updateTime = () => setNow(new Date());
    const timeout = window.setTimeout(
      () => {
        updateTime();
        interval = window.setInterval(updateTime, 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [showIdentity]);

  if (!showIdentity) return null;

  return (
    <header className="minimal-header">
      {avatarSrc ? (
        <Image
          className="minimal-avatar"
          src={avatarSrc}
          alt=""
          width={48}
          height={48}
        />
      ) : null}
      <div className="minimal-identity">
        <Link href="/" lang={isZh ? 'zh-CN' : 'en'}>
          {isZh ? '徐现雨' : 'Xu Xianyu'}
        </Link>
        <time
          className="minimal-local-time"
          lang={isZh ? 'zh-CN' : 'en'}
          dateTime={now.toISOString()}
          suppressHydrationWarning
        >
          {isZh
            ? `${localTime} · 合肥 · 安徽 · 中国`
            : `${localTime} in Hefei, Anhui, China`}
        </time>
      </div>
    </header>
  );
}
