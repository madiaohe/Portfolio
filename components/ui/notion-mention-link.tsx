// Adapted from Unlumen UI. See docs/component-sources.md.
'use client';

import * as React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

export type NotionMentionLinkMetadata = {
  url: string;
  title: string;
  description?: string;
  siteName: string;
  domain: string;
  image?: string;
  favicon?: string;
};

export type NotionMentionLinkProps = Omit<
  React.ComponentPropsWithRef<'a'>,
  'href'
> & {
  url: string;
  endpoint?: string;
  metadata?: NotionMentionLinkMetadata;
  prefetch?: 'mount' | 'hover';
  openDelay?: number;
  closeDelay?: number;
  previewWidth?: number;
  previewHeight?: number;
  align?: 'start' | 'end';
  showPreview?: boolean;
  invalidLabel?: string;
  unavailableLabel?: string;
  previewLogo?: string;
  previewClassName?: string;
};

const metadataCache = new Map<string, NotionMentionLinkMetadata>();

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidWebsiteUrl(value: string) {
  if (!value || /\s/.test(value)) return false;

  try {
    const parsed = new URL(value);
    const labels = parsed.hostname.split('.');

    return (
      ['http:', 'https:'].includes(parsed.protocol) &&
      labels.length >= 2 &&
      labels.every((label) =>
        /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i.test(label),
      )
    );
  } catch {
    return false;
  }
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function getFallbackMetadata(url: string): NotionMentionLinkMetadata {
  const domain = getDomain(url);

  return {
    url,
    title: domain,
    siteName: domain.split('.')[0] || domain,
    domain,
  };
}

function getAssetUrl(endpoint: string, url?: string) {
  if (!url) return undefined;
  if (url.startsWith('/') && !url.startsWith('//')) return url;

  const params = new URLSearchParams({ asset: '1', url });
  return `${endpoint}${endpoint.includes('?') ? '&' : '?'}${params.toString()}`;
}

function SiteIcon({
  src,
  label,
  large = false,
}: {
  src?: string;
  label: string;
  large?: boolean;
}) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded bg-foreground font-semibold uppercase text-background',
          large ? 'size-6 text-[10px]' : 'size-[22px] text-[9px]',
        )}
        aria-hidden="true"
      >
        {label.charAt(0)}
      </span>
    );
  }

  return (
    // The same-origin endpoint validates and proxies this remote asset.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={cn(
        'shrink-0 rounded object-cover',
        large ? 'size-6' : 'size-[22px]',
      )}
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  );
}

function PreviewSkeleton({ height }: { height: number }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-card shadow-lg shadow-foreground/5">
      <Skeleton className="rounded-none" style={{ height }} />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

function PreviewImage({ src, height }: { src: string; height: number }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => setFailed(false), [src]);

  if (failed) return null;

  return (
    // The same-origin endpoint validates and proxies this remote asset.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="block w-full bg-muted object-cover"
      style={{ height }}
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  );
}

function NotionMentionLink({
  url,
  endpoint = '/api/notion-mention-link',
  metadata: suppliedMetadata,
  prefetch = 'mount',
  openDelay = 180,
  closeDelay = 120,
  previewWidth = 310,
  previewHeight = 140,
  align = 'start',
  showPreview = true,
  invalidLabel = 'Enter a valid website URL.',
  unavailableLabel = 'Preview unavailable. The link is still safe to open directly.',
  previewLogo,
  previewClassName,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ref,
  ...props
}: NotionMentionLinkProps) {
  const normalizedUrl = React.useMemo(() => normalizeUrl(url), [url]);
  const isValidUrl = React.useMemo(
    () => isValidWebsiteUrl(normalizedUrl),
    [normalizedUrl],
  );
  const fallback = React.useMemo(
    () => getFallbackMetadata(normalizedUrl),
    [normalizedUrl],
  );
  const [loadedMetadata, setLoadedMetadata] = React.useState<
    NotionMentionLinkMetadata | undefined
  >(() => suppliedMetadata ?? metadataCache.get(normalizedUrl));
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'ready' | 'error' | 'invalid'
  >(
    !isValidUrl
      ? 'invalid'
      : suppliedMetadata || metadataCache.has(normalizedUrl)
        ? 'ready'
        : 'idle',
  );
  const requestRef = React.useRef<AbortController | null>(null);
  const previewId = React.useId();
  const currentMetadata = suppliedMetadata ?? loadedMetadata ?? fallback;

  const loadMetadata = React.useCallback(async () => {
    if (!isValidUrl) {
      setStatus('invalid');
      return;
    }

    if (suppliedMetadata || metadataCache.has(normalizedUrl)) {
      const cached = metadataCache.get(normalizedUrl);
      if (cached) {
        setLoadedMetadata(cached);
        setStatus('ready');
      }
      return;
    }

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('loading');

    try {
      const separator = endpoint.includes('?') ? '&' : '?';
      const response = await fetch(
        `${endpoint}${separator}${new URLSearchParams({ url: normalizedUrl }).toString()}`,
        { signal: controller.signal },
      );

      if (!response.ok) throw new Error('Preview request failed');

      const data = (await response.json()) as NotionMentionLinkMetadata;
      metadataCache.set(normalizedUrl, data);
      setLoadedMetadata(data);
      setStatus('ready');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error');
    }
  }, [endpoint, isValidUrl, normalizedUrl, suppliedMetadata]);

  React.useEffect(() => {
    requestRef.current?.abort();
    setLoadedMetadata(suppliedMetadata ?? metadataCache.get(normalizedUrl));
    setStatus(
      !isValidUrl
        ? 'invalid'
        : suppliedMetadata || metadataCache.has(normalizedUrl)
          ? 'ready'
          : 'idle',
    );
  }, [isValidUrl, normalizedUrl, suppliedMetadata]);

  React.useEffect(() => {
    if (prefetch === 'mount') void loadMetadata();

    return () => {
      requestRef.current?.abort();
    };
  }, [loadMetadata, prefetch]);

  const faviconUrl = getAssetUrl(endpoint, currentMetadata.favicon);
  const imageUrl = getAssetUrl(endpoint, currentMetadata.image);
  const previewLogoUrl = getAssetUrl(endpoint, previewLogo);

  if (!isValidUrl || status === 'invalid') {
    return (
      <span
        role="status"
        className="inline-flex min-h-7 items-center text-sm text-destructive"
      >
        {invalidLabel}
      </span>
    );
  }

  const mention = (
    <a
      ref={ref}
      href={normalizedUrl}
      target={target}
      rel={rel}
      className={
        children === undefined
          ? cn(
              'ui-scope inline-flex max-w-full items-center gap-1.5 rounded-[5px] px-1 py-0.5 text-[15px] leading-6 text-foreground outline-none transition-colors duration-100',
              'hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
              className,
            )
          : className
      }
      onMouseEnter={(event) => {
        if (prefetch === 'hover' || status === 'idle') void loadMetadata();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        if (prefetch === 'hover' || status === 'idle') void loadMetadata();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        onBlur?.(event);
      }}
      {...props}
    >
      {children === undefined ? (
        <>
          <SiteIcon src={faviconUrl} label={currentMetadata.siteName} />
          <span className="min-w-0 truncate text-muted-foreground">
            {currentMetadata.siteName}
          </span>
          <span className="min-w-0 truncate font-medium underline decoration-foreground/35 underline-offset-[3px]">
            {currentMetadata.title}
          </span>
        </>
      ) : (
        children
      )}
    </a>
  );

  if (!showPreview) return mention;

  return (
    <HoverCard
      openDelay={openDelay}
      closeDelay={closeDelay}
      onOpenChange={(nextOpen) => {
        if (nextOpen && (prefetch === 'hover' || status === 'idle')) {
          void loadMetadata();
        }
      }}
    >
      <HoverCardTrigger asChild>{mention}</HoverCardTrigger>
      <HoverCardContent
        id={previewId}
        align={align}
        side="bottom"
        sideOffset={8}
        style={{ width: previewWidth }}
        className={cn(
          'max-w-[calc(100vw-2rem)] border-0 bg-transparent p-0 shadow-none ring-0 will-change-transform',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-[2px] data-[state=open]:duration-[140ms] data-[state=open]:ease-out',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-[2px] data-[state=closed]:duration-[100ms] data-[state=closed]:ease-in',
          previewClassName,
        )}
      >
        {status === 'loading' || status === 'idle' ? (
          <PreviewSkeleton height={previewHeight} />
        ) : (
          <span className="block overflow-hidden rounded-[8px] border border-border bg-card text-left shadow-lg shadow-foreground/5">
            {imageUrl ? (
              <PreviewImage src={imageUrl} height={previewHeight} />
            ) : null}

            <span className="flex flex-col gap-2 px-5 pt-4 pb-5">
              <strong className="line-clamp-2 text-base leading-6 font-medium text-foreground">
                {currentMetadata.title}
              </strong>
              {status === 'error' ? (
                <span className="text-sm leading-5 text-muted-foreground">
                  {unavailableLabel}
                </span>
              ) : currentMetadata.description ? (
                <span className="line-clamp-3 text-sm leading-5 text-foreground/85">
                  {currentMetadata.description}
                </span>
              ) : null}
              <span className="mt-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                {previewLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewLogoUrl}
                    alt=""
                    className="size-6 shrink-0 object-contain"
                    aria-hidden="true"
                  />
                ) : (
                  <SiteIcon
                    src={faviconUrl}
                    label={currentMetadata.siteName}
                    large
                  />
                )}
                <span className="truncate">{currentMetadata.domain}</span>
              </span>
            </span>
          </span>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

export { NotionMentionLink };
