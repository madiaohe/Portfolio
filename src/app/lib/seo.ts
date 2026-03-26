import { siteConfig } from '@/content/site';
import type { Locale } from '@/content/types';

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  type?: 'website' | 'article';
}

function ensureMeta(selector: string, create: () => HTMLMetaElement) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = create();
    document.head.appendChild(meta);
  }
  return meta;
}

function ensureLink(selector: string, create: () => HTMLLinkElement) {
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = create();
    document.head.appendChild(link);
  }
  return link;
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, siteConfig.url).toString();
}

export function applyMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = 'website',
}: MetadataInput) {
  const fullTitle = `${title}${siteConfig.titleSeparator}${siteConfig.name[locale]}`;
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const socialImage = toAbsoluteUrl(image || siteConfig.seo.image);

  document.title = fullTitle;
  document.documentElement.lang = locale;

  ensureMeta('meta[name="description"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'description';
    return meta;
  }).content = description;

  ensureMeta('meta[property="og:title"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:title');
    return meta;
  }).content = fullTitle;

  ensureMeta('meta[property="og:description"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:description');
    return meta;
  }).content = description;

  ensureMeta('meta[property="og:type"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:type');
    return meta;
  }).content = type;

  ensureMeta('meta[property="og:url"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:url');
    return meta;
  }).content = canonicalUrl;

  ensureMeta('meta[property="og:image"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:image');
    return meta;
  }).content = socialImage;

  ensureMeta('meta[name="twitter:card"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'twitter:card';
    return meta;
  }).content = 'summary_large_image';

  ensureMeta('meta[name="twitter:title"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'twitter:title';
    return meta;
  }).content = fullTitle;

  ensureMeta('meta[name="twitter:description"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'twitter:description';
    return meta;
  }).content = description;

  ensureMeta('meta[name="twitter:image"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'twitter:image';
    return meta;
  }).content = socialImage;

  ensureLink('link[rel="canonical"]', () => {
    const link = document.createElement('link');
    link.rel = 'canonical';
    return link;
  }).href = canonicalUrl;
}
