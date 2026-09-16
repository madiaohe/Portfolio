'use client';

import Image from 'next/image';
import { Languages, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { FloatingButton } from '@/components/ui/floating-button';
import { CapsuleInput } from '@/components/ui/capsule-input';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { useSiteTheme } from '@/lib/hooks/use-site-theme';

export function SiteQuickActions() {
  const { language, changeLanguage } = useSiteLanguage();
  const { theme, toggleTheme } = useSiteTheme();
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerValue, setComposerValue] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const zh = language === 'zh';

  return (
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
  );
}
