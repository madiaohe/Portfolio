import { Languages, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { HomeLanguage } from '@/lib/home-copy';
import { useSiteTheme } from '@/lib/hooks/use-site-theme';

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
  language,
  onLanguageChange,
  avatarSrc,
  showIdentity = true,
}: {
  language: HomeLanguage;
  onLanguageChange: (language: HomeLanguage) => void;
  avatarSrc?: string;
  showIdentity?: boolean;
}) {
  const [now, setNow] = useState(() => new Date());
  const { theme, toggleTheme } = useSiteTheme();
  const localTime = formatHefeiTime(now);
  const languageLabel = language === 'en' ? '切换到中文' : 'Switch to English';
  const themeLabel =
    language === 'zh'
      ? theme === 'dark'
        ? '切换到浅色模式'
        : '切换到深色模式'
      : theme === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode';

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

  const controls = (
    <fieldset
      className="minimal-controls"
      aria-label={language === 'zh' ? '显示偏好' : 'Display preferences'}
    >
      <button
        type="button"
        aria-label={languageLabel}
        title={languageLabel}
        onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
      >
        <Languages size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={themeLabel}
        title={themeLabel}
        onClick={toggleTheme}
      >
        <Sun
          className="minimal-theme-sun"
          size={18}
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <Moon
          className="minimal-theme-moon"
          size={18}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </button>
    </fieldset>
  );

  if (!showIdentity) return controls;

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
        <Link href="/" lang="en">
          Xu Xianyu
        </Link>
        <time
          className="minimal-local-time"
          dateTime={now.toISOString()}
          suppressHydrationWarning
        >
          {localTime} in Hefei, Anhui, China
        </time>
      </div>
      {controls}
    </header>
  );
}
