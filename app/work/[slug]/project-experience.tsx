'use client';

import { usePathname } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ProjectControls } from './project-controls';
import { SiteQuickActions } from '@/components/blocks/site-quick-actions';
import { useDismiss } from '@/lib/hooks/use-dismiss';
import { ProjectNavigationContext } from '@/lib/project-navigation-context';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import type { ProjectPrototype } from '@/lib/projects';
import type { LocalizedText } from '@/lib/writing';

type Artboard = {
  x: number;
  y: number;
  width: number;
  height: number;
  shadow: string;
  borderRadius: string;
};

function isArtboard(value: unknown): value is Artboard {
  if (!value || typeof value !== 'object') return false;
  const board = value as Partial<Artboard>;
  return (
    [board.x, board.y, board.width, board.height].every(
      (number) => typeof number === 'number' && Number.isFinite(number),
    ) &&
    board.width! > 0 &&
    board.height! > 0 &&
    typeof board.shadow === 'string' &&
    CSS.supports('box-shadow', board.shadow) &&
    typeof board.borderRadius === 'string' &&
    CSS.supports('border-radius', board.borderRadius)
  );
}

export function ProjectExperience({
  slug,
  title,
  prototype,
  children,
}: {
  slug: string;
  title: LocalizedText;
  prototype: ProjectPrototype;
  children: ReactNode;
}) {
  const { language } = useSiteLanguage();
  const pathname = usePathname();
  const [about, setAbout] = useState(pathname.endsWith('/about'));
  const zh = language === 'zh';
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const scenesRef = useRef<HTMLDialogElement>(null);
  const scenesButton = useRef<HTMLButtonElement>(null);
  const [scenesOpen, setScenesOpen] = useState(false);
  const dismissScenes = useCallback(() => {
    if (scenesRef.current?.contains(document.activeElement))
      scenesButton.current?.focus({ preventScroll: true });
    setScenesOpen(false);
  }, []);
  const ignoreScenesTrigger = useCallback(
    (target: Element) => Boolean(scenesButton.current?.contains(target)),
    [],
  );
  useDismiss(scenesOpen, dismissScenes, scenesRef, {
    ignore: ignoreScenesTrigger,
  });
  useEffect(() => {
    if (!scenesOpen) return;
    const frame = requestAnimationFrame(() =>
      scenesRef.current
        ?.querySelector<HTMLInputElement>('input:checked')
        ?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [scenesOpen]);
  const [generation, setGeneration] = useState(0);
  const [scenario, setScenario] = useState('normal');
  const [loaded, setLoaded] = useState(false);
  const [artboard, setArtboard] = useState<Artboard | null>(null);

  useEffect(() => {
    document.title = `${title[language]}${about ? (language === 'zh' ? ' — 项目说明' : ' — Project notes') : ''} — Xu Xianyu`;
  }, [about, language, title]);

  function navigate(href: string) {
    if (href !== `/work/${slug}` && href !== `/work/${slug}/about`) return;
    window.history.pushState(window.history.state, '', href);
    setAbout(href.endsWith('/about'));
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    function onPopState(event: PopStateEvent) {
      const path = window.location.pathname;
      if (path === `/work/${slug}` || path === `/work/${slug}/about`) {
        // Keep Vinext's production RSC navigator out of these self-contained views.
        event.stopImmediatePropagation();
        setAbout(path.endsWith('/about'));
      } else {
        window.location.reload();
      }
    }
    window.addEventListener('popstate', onPopState, true);
    return () => window.removeEventListener('popstate', onPopState, true);
  }, [slug]);

  function send(type: string, value: string) {
    frameRef.current?.contentWindow?.postMessage(
      { channel: 'portfolio-prototype', type, value },
      window.location.origin,
    );
  }
  useEffect(() => {
    function post(type: string, value: string = language) {
      frameRef.current?.contentWindow?.postMessage(
        { channel: 'portfolio-prototype', type, value },
        window.location.origin,
      );
    }
    function onMessage(event: MessageEvent) {
      if (
        event.source !== frameRef.current?.contentWindow ||
        event.origin !== window.location.origin ||
        event.data?.channel !== 'portfolio-prototype'
      )
        return;
      if (event.data.type === 'artboard' && isArtboard(event.data.value))
        setArtboard(event.data.value);
      if (event.data.type === 'ready') {
        setLoaded(true);
        post('language');
        if (rootRef.current)
          post('background', getComputedStyle(rootRef.current).backgroundColor);
      }
    }
    window.addEventListener('message', onMessage);
    post('initialize');
    post('language');
    return () => window.removeEventListener('message', onMessage);
  }, [language]);

  useEffect(() => {
    function syncBackground() {
      if (rootRef.current)
        frameRef.current?.contentWindow?.postMessage(
          {
            channel: 'portfolio-prototype',
            type: 'background',
            value: getComputedStyle(rootRef.current).backgroundColor,
          },
          window.location.origin,
        );
    }
    // The console owns its theme toggle. Observe the applied theme so every
    // instance, including same-window toggles, updates the embedded canvas.
    const observer = new MutationObserver(syncBackground);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-minimal-theme'],
    });
    syncBackground();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (
        event.source === frameRef.current?.contentWindow &&
        event.origin === window.location.origin &&
        event.data?.channel === 'portfolio-prototype' &&
        event.data.type === 'escape'
      ) {
        setScenesOpen(false);
      }
    }
    function onBlur() {
      if (document.activeElement === frameRef.current) setScenesOpen(false);
    }
    window.addEventListener('message', onMessage);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <ProjectNavigationContext.Provider value={navigate}>
      <div
        ref={rootRef}
        className="project-experience minimal-site ui-scope"
        data-view={about ? 'about' : 'prototype'}
        lang={zh ? 'zh-CN' : 'en'}
      >
        <main
          className="project-experience__demo"
          hidden={about}
          inert={about}
          aria-label={title[language]}
        >
          <h1 className="visually-hidden">{title[language]}</h1>
          <div
            id="project-prototype-panel"
            role="tabpanel"
            aria-labelledby="project-prototype-tab"
            tabIndex={0}
            className="project-experience__viewport"
          >
            {artboard && (
              <div
                className="project-experience__artboard-shadow"
                aria-hidden="true"
                style={{
                  left: artboard.x,
                  top: artboard.y,
                  width: artboard.width,
                  height: artboard.height,
                  boxShadow: artboard.shadow,
                  borderRadius: artboard.borderRadius,
                }}
              />
            )}
            {!loaded && (
              <output className="project-experience__loading">
                {zh ? '正在加载原型…' : 'Loading prototype…'}
              </output>
            )}
            <iframe
              key={generation}
              ref={frameRef}
              src={prototype.src}
              title={`${title[language]} — ${zh ? '可交互原型' : 'Interactive prototype'}`}
              allow="fullscreen"
              onLoad={() => {
                setLoaded(true);
                send('initialize', language);
                send('language', language);
                if (rootRef.current)
                  send(
                    'background',
                    getComputedStyle(rootRef.current).backgroundColor,
                  );
              }}
            />
          </div>
          <ProjectControls
            open={scenesOpen}
            panelRef={scenesRef}
            triggerRef={scenesButton}
            zh={zh}
            scenario={scenario}
            onScenarioChange={(value) => {
              setScenario(value);
              send('scenario', value);
            }}
            onRestart={() => {
              setLoaded(false);
              setArtboard(null);
              setScenario('normal');
              setGeneration((value) => value + 1);
            }}
            onClose={dismissScenes}
          />
        </main>
        <div
          id="project-notes-panel"
          role="tabpanel"
          aria-labelledby="project-notes-tab"
          tabIndex={0}
          hidden={!about}
        >
          {about && children}
        </div>
        <SiteQuickActions
          project={{
            showingAbout: about,
            controlsOpen: scenesOpen,
            controlsId: 'project-scenario-panel',
            onToggleControls: (trigger) => {
              scenesButton.current = trigger;
              setScenesOpen((value) => !value);
            },
            onToggle: () => {
              setScenesOpen(false);
              navigate(about ? `/work/${slug}` : `/work/${slug}/about`);
            },
          }}
        />
      </div>
    </ProjectNavigationContext.Provider>
  );
}
