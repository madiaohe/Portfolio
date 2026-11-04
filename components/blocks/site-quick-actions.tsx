'use client';

import Image from 'next/image';
import { Languages, Moon, Sun, Home, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { FloatingButton } from '@/components/ui/floating-button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CapsuleInput } from '@/components/ui/capsule-input';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { useSiteTheme } from '@/lib/hooks/use-site-theme';

export function SiteQuickActions({
  project,
}: {
  project?: {
    showingAbout: boolean;
    onToggle: () => void;
    controlsOpen?: boolean;
    controlsId?: string;
    onToggleControls?: (trigger: HTMLButtonElement) => void;
  };
} = {}) {
  const { language, changeLanguage } = useSiteLanguage();
  const { theme, toggleTheme } = useSiteTheme();
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerValue, setComposerValue] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const zh = language === 'zh';

  return (
    <FloatingButton
      className={
        project
          ? 'site-quick-actions site-quick-actions--project'
          : 'site-quick-actions'
      }
      placement="fixed"
      actionLayout={project ? 'toolbar' : 'fan'}
      persistent={Boolean(project)}
      actionsOpen={Boolean(project?.controlsOpen && !project.showingAbout)}
      label={zh ? '快捷操作' : 'Quick actions'}
      actionsLabel={zh ? '快捷操作' : 'Quick actions'}
      open={composerOpen}
      onOpenChange={setComposerOpen}
      actions={[
        ...(project
          ? [
              {
                id: 'home',
                position: 'left' as const,
                label: zh ? '返回首页' : 'Back to home',
                icon: <Home size={16} strokeWidth={1.6} aria-hidden="true" />,
                onSelect: () => window.location.assign('/'),
              },
              {
                id: 'project-view',
                separatorBefore: true,
                position: 'right' as const,
                label: zh ? '项目视图' : 'Project view',
                icon: null,
                content: (
                  <Tabs
                    className="floating-button__view-tabs"
                    value={project.showingAbout ? 'notes' : 'prototype'}
                    onValueChange={(value) => {
                      if ((value === 'notes') !== project.showingAbout)
                        project.onToggle();
                    }}
                  >
                    <TabsList aria-label={zh ? '项目视图' : 'Project view'}>
                      <TabsTrigger
                        id="project-prototype-tab"
                        value="prototype"
                        aria-controls="project-prototype-panel"
                      >
                        {zh ? '交互' : 'Demo'}
                      </TabsTrigger>
                      <TabsTrigger
                        id="project-notes-tab"
                        value="notes"
                        aria-controls="project-notes-panel"
                      >
                        {zh ? '说明' : 'Notes'}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                ),
              },
            ]
          : []),
        ...(project?.onToggleControls && !project.showingAbout
          ? [
              {
                id: 'prototype-controls',
                separatorBefore: 'inline' as const,
                position: 'end' as const,
                label: zh ? '原型控制台' : 'Prototype controls',
                icon: (
                  <SlidersHorizontal
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                ),
                active: project.controlsOpen,
                expanded: project.controlsOpen,
                controls: project.controlsId,
                onSelect: project.onToggleControls,
              },
            ]
          : []),
        {
          id: 'language',
          separatorBefore: Boolean(project),
          position: 'top-right',
          label: zh ? '切换到英文' : 'Switch to Chinese',
          active: language === 'zh',
          icon: <Languages size={16} strokeWidth={1.6} aria-hidden="true" />,
          onSelect: () => changeLanguage(language === 'en' ? 'zh' : 'en'),
        },
        {
          id: 'ai',
          separatorBefore: Boolean(project),
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
  );
}
