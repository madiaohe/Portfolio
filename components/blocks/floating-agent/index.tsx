'use client';

import {
  ChevronDown,
  FolderKanban,
  ImagePlus,
  Mic,
  Paperclip,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Message,
  MessageAvatar,
  MessageBubble,
  MessageBubbleContent,
  MessageContent,
  MessageGroup,
  MessageHeader,
  MessageTyping,
} from '@/components/ui/message';
import { MessageScroller } from '@/components/ui/message/message-scroller';
import { PromptInput } from './floating-prompt-input';
import { Button } from '@/components/ui/button';
import { EASE_OUT, SPRING_PANEL } from '@/lib/ease';
import { cn } from '@/lib/utils';

type FloatingAgentStage = 'collapsed' | 'compose' | 'conversation';
type FloatingAgentPlacement = 'fixed' | 'contained';
type FloatingAgentEntryMode = 'prompt' | 'launcher';
type LauncherMotionState = 'idle' | 'waiting' | 'revealing';

interface AgentMessage {
  id: number;
  from: 'user' | 'assistant';
  content: string;
}

export interface FloatingAgentProps {
  language?: 'zh' | 'en';
  placement?: FloatingAgentPlacement;
  entryMode?: FloatingAgentEntryMode;
  className?: string;
}

const copy = {
  zh: {
    assistant: 'Xianyu Agent',
    collapse: '收起对话',
    demo: '交互演示',
    idle: '随心输入',
    input: '向我询问这个网站…',
    launcher: '打开 AI 助手',
    microphone: '语音输入',
    permission: '完全访问',
    removeTool: '移除所选工具',
    reply:
      '这是一个交互演示。接入模型接口后，我可以基于这个网站的项目、文章和个人信息回答问题。',
  },
  en: {
    assistant: 'Xianyu Agent',
    collapse: 'Collapse conversation',
    demo: 'Interactive demo',
    idle: 'Ask anything',
    input: 'Ask me about this website…',
    launcher: 'Open AI assistant',
    microphone: 'Voice input',
    permission: 'Full access',
    removeTool: 'Remove selected tool',
    reply:
      'This is an interaction demo. Once a model is connected, I can answer questions using the projects, writing, and profile information on this site.',
  },
} as const;

const subscribeToBrowser = () => () => undefined;

export function FloatingAgent({
  language = 'zh',
  placement = 'fixed',
  entryMode = 'prompt',
  className,
}: FloatingAgentProps) {
  const reduce = useReducedMotion() ?? false;
  const mounted = useSyncExternalStore(
    subscribeToBrowser,
    () => true,
    () => false,
  );
  const [stage, setStage] = useState<FloatingAgentStage>('collapsed');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [launcherMotion, setLauncherMotion] =
    useState<LauncherMotionState>('idle');
  const [isCollapsing, setIsCollapsing] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLElement>(null);
  const idleButtonRef = useRef<HTMLButtonElement>(null);
  const messageIdRef = useRef(0);
  const responseTimerRef = useRef<number | null>(null);
  const text = copy[language];

  useEffect(
    () => () => {
      if (responseTimerRef.current !== null) {
        window.clearTimeout(responseTimerRef.current);
      }
    },
    [],
  );

  const completeCollapse = useCallback(() => {
    if (entryMode === 'launcher') {
      setLauncherMotion(reduce ? 'idle' : 'revealing');
    }
    setStage('collapsed');
    setIsCollapsing(false);
    requestAnimationFrame(() =>
      idleButtonRef.current?.focus({ preventScroll: true }),
    );
  }, [entryMode, reduce]);

  const collapse = useCallback(() => {
    if (stage === 'collapsed' || isCollapsing) return;

    if (entryMode === 'launcher' && !reduce) {
      setLauncherMotion('waiting');
      setIsCollapsing(true);
      return;
    }

    completeCollapse();
  }, [completeCollapse, entryMode, isCollapsing, reduce, stage]);

  useEffect(() => {
    if (stage === 'collapsed') return;

    surfaceRef.current
      ?.querySelector<HTMLTextAreaElement>(
        '[data-slot="prompt-input-textarea"]',
      )
      ?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (surfaceRef.current?.querySelector('[aria-expanded="true"]')) {
          return;
        }
        event.preventDefault();
        collapse();
        return;
      }

      if (
        event.key !== 'Tab' ||
        stage !== 'conversation' ||
        placement !== 'fixed'
      ) {
        return;
      }

      const surface = surfaceRef.current;
      if (!surface) return;
      const focusable = Array.from(
        surface.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [collapse, placement, stage]);

  useEffect(() => {
    if (entryMode !== 'launcher' || stage !== 'compose' || input.trim()) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || surfaceRef.current?.contains(target)) {
        return;
      }

      if (
        target instanceof Element &&
        target.closest('[role="dialog"], [role="listbox"]')
      ) {
        return;
      }

      collapse();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [collapse, entryMode, input, stage]);

  useEffect(() => {
    if (stage !== 'conversation' || placement !== 'fixed') return;
    const layer = layerRef.current;
    if (!layer) return;

    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== layer,
      )
      .map((element) => ({
        element,
        inert: element.inert,
        ariaHidden: element.getAttribute('aria-hidden'),
      }));

    document.body.style.overflow = 'hidden';
    for (const sibling of siblings) {
      sibling.element.inert = true;
      sibling.element.setAttribute('aria-hidden', 'true');
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      for (const sibling of siblings) {
        sibling.element.inert = sibling.inert;
        if (sibling.ariaHidden === null) {
          sibling.element.removeAttribute('aria-hidden');
        } else {
          sibling.element.setAttribute('aria-hidden', sibling.ariaHidden);
        }
      }
    };
  }, [placement, stage]);

  const open = () => {
    if (entryMode === 'launcher') {
      setLauncherMotion(reduce ? 'idle' : 'waiting');
    }
    setIsCollapsing(false);
    setStage(messages.length > 0 ? 'conversation' : 'compose');
  };

  const stop = () => {
    if (responseTimerRef.current !== null) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = null;
    }
    setLoading(false);
  };

  const submit = (value: string) => {
    const prompt = value.trim();
    if (!prompt || loading) return;

    messageIdRef.current += 1;
    setMessages((current) => [
      ...current,
      { id: messageIdRef.current, from: 'user', content: prompt },
    ]);
    setInput('');
    setSelectedAction(undefined);
    setStage('conversation');
    setLoading(true);

    responseTimerRef.current = window.setTimeout(
      () => {
        messageIdRef.current += 1;
        setMessages((current) => [
          ...current,
          {
            id: messageIdRef.current,
            from: 'assistant',
            content: text.reply,
          },
        ]);
        setLoading(false);
        responseTimerRef.current = null;
      },
      reduce ? 0 : 720,
    );
  };

  const composer = (
    <PromptInput
      value={input}
      onValueChange={setInput}
      onSubmit={submit}
      loading={loading}
      onStop={stop}
      minRows={1}
      maxRows={6}
      layout={entryMode === 'launcher' ? 'inline' : 'stacked'}
      placeholder={entryMode === 'launcher' ? text.idle : text.input}
      aria-label={text.input}
      className="floating-agent__composer"
      models={[
        {
          value: 'sol',
          label:
            language === 'zh' ? 'GPT-5.6 Sol · 极高' : 'GPT-5.6 Sol · High',
        },
        {
          value: 'luna',
          label:
            language === 'zh' ? 'GPT-5.6 Luna · 快速' : 'GPT-5.6 Luna · Fast',
        },
      ]}
      defaultModel="sol"
      actions={[
        {
          value: 'file',
          label: language === 'zh' ? '添加文件' : 'Add file',
          icon: <Paperclip />,
        },
        {
          value: 'image',
          label: language === 'zh' ? '添加图片' : 'Add image',
          icon: <ImagePlus />,
        },
        {
          value: 'project',
          label: language === 'zh' ? '添加项目上下文' : 'Add project context',
          icon: <FolderKanban />,
        },
      ]}
      onAction={setSelectedAction}
      selectedAction={selectedAction}
      onSelectedActionClear={() => setSelectedAction(undefined)}
      removeSelectedActionLabel={text.removeTool}
      leadingAction={
        entryMode === 'prompt' ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="floating-agent__permission"
            aria-label={text.permission}
          >
            <ShieldCheck className="size-4" />
            <span>{text.permission}</span>
          </Button>
        ) : undefined
      }
      trailingAction={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          aria-label={text.microphone}
          title={text.microphone}
        >
          <Mic className="size-4" />
        </Button>
      }
    />
  );

  const layer = (
    <div
      ref={layerRef}
      className={cn(
        'ui-scope floating-agent',
        `floating-agent--${placement}`,
        `floating-agent--entry-${entryMode}`,
        className,
      )}
    >
      <AnimatePresence>
        {stage === 'conversation' ? (
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label={text.collapse}
            className="floating-agent__overlay"
            onClick={collapse}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: EASE_OUT }}
          />
        ) : null}
      </AnimatePresence>

      <div className="floating-agent__anchor">
        <motion.section
          ref={surfaceRef}
          layout={
            !reduce && !(entryMode === 'launcher' && messages.length === 0)
          }
          data-stage={stage}
          role={stage === 'conversation' ? 'dialog' : 'region'}
          aria-modal={
            stage === 'conversation' && placement === 'fixed' ? true : undefined
          }
          aria-label={text.assistant}
          className="floating-agent__surface"
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {stage === 'collapsed' ? (
              <motion.button
                ref={idleButtonRef}
                key="collapsed"
                type="button"
                className="floating-agent__idle"
                onClick={open}
                aria-label={
                  entryMode === 'launcher' ? text.launcher : text.input
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.14 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
              >
                {entryMode === 'launcher' ? (
                  <span aria-hidden="true" />
                ) : (
                  <>
                    <Sparkles aria-hidden="true" />
                    <span>{text.idle}</span>
                    <Mic aria-hidden="true" />
                  </>
                )}
              </motion.button>
            ) : stage === 'compose' ? (
              <motion.div
                key="compose"
                className="floating-agent__compose"
                initial={{ opacity: 0 }}
                animate={{ opacity: isCollapsing ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : isCollapsing ? 0.08 : 0.16,
                  ease: EASE_OUT,
                }}
                onAnimationComplete={() => {
                  if (isCollapsing) completeCollapse();
                }}
              >
                {composer}
              </motion.div>
            ) : (
              <motion.div
                key="conversation"
                className="floating-agent__conversation"
                initial={{ opacity: 0 }}
                animate={{ opacity: isCollapsing ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : isCollapsing ? 0.08 : 0.18,
                  delay: isCollapsing ? 0 : 0.04,
                  ease: EASE_OUT,
                }}
                onAnimationComplete={() => {
                  if (isCollapsing) completeCollapse();
                }}
              >
                <header className="floating-agent__header">
                  <div className="floating-agent__identity">
                    <span className="floating-agent__agent-icon">
                      <Sparkles aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{text.assistant}</strong>
                      <small>{text.demo}</small>
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                    aria-label={text.collapse}
                    title={text.collapse}
                    onClick={collapse}
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </header>

                <MessageScroller
                  busy={loading}
                  className="floating-agent__messages"
                  viewportClassName="px-4 py-5 sm:px-5"
                  contentClassName="min-h-full"
                >
                  <MessageGroup spacing="default">
                    {messages.map((message) => (
                      <Message key={message.id} from={message.from} animateIn>
                        <MessageAvatar>
                          {message.from === 'user' ? (
                            <UserRound />
                          ) : (
                            <Sparkles />
                          )}
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>
                            {message.from === 'user'
                              ? language === 'zh'
                                ? '你'
                                : 'You'
                              : text.assistant}
                          </MessageHeader>
                          <MessageBubble
                            variant={message.from === 'user' ? 'solid' : 'soft'}
                          >
                            <MessageBubbleContent>
                              {message.content}
                            </MessageBubbleContent>
                          </MessageBubble>
                        </MessageContent>
                      </Message>
                    ))}

                    {loading ? (
                      <Message from="assistant" animateIn>
                        <MessageAvatar>
                          <Sparkles />
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>{text.assistant}</MessageHeader>
                          <MessageBubble variant="soft">
                            <MessageBubbleContent>
                              <MessageTyping
                                label={
                                  language === 'zh' ? '正在思考' : 'Thinking'
                                }
                              />
                            </MessageBubbleContent>
                          </MessageBubble>
                        </MessageContent>
                      </Message>
                    ) : null}
                  </MessageGroup>
                </MessageScroller>

                <div className="floating-agent__conversation-composer">
                  {composer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {entryMode === 'launcher' && stage === 'collapsed' ? (
          <div className="floating-agent__launcher-logo-slot">
            <motion.span
              aria-hidden="true"
              className="floating-agent__launcher-logo-motion"
              initial={
                launcherMotion === 'revealing'
                  ? { opacity: 0, rotate: 0, scale: 0.92 }
                  : false
              }
              animate={{
                opacity: 1,
                rotate: launcherMotion === 'revealing' ? 360 : 0,
                scale: 1,
              }}
              transition={
                launcherMotion === 'revealing' && !reduce
                  ? {
                      opacity: { duration: 0.08, ease: EASE_OUT },
                      scale: { duration: 0.08, ease: EASE_OUT },
                      rotate: {
                        delay: 0.08,
                        duration: 0.42,
                        ease: EASE_OUT,
                      },
                    }
                  : { duration: 0 }
              }
            >
              <Image
                src="/media/floating-agent-logo.svg"
                alt=""
                width={20}
                height={20}
                className="floating-agent__launcher-logo"
              />
            </motion.span>
          </div>
        ) : null}
      </div>
    </div>
  );

  if (!mounted) return null;
  return placement === 'fixed' ? createPortal(layer, document.body) : layer;
}
