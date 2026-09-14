'use client';
// Customized prompt input used only by FloatingAgent.

import { ArrowUp, Plus, Square, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  type KeyboardEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from '@/components/ui/popover-morph';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SPRING_SWAP } from '@/lib/ease';
import { cn } from '@/lib/utils';

export interface PromptModel {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface PromptAction {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface PromptInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'children'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  models?: PromptModel[];
  model?: string;
  defaultModel?: string;
  onModelChange?: (model: string) => void;
  actions?: PromptAction[];
  onAction?: (action: string) => void;
  selectedAction?: string;
  onSelectedActionClear?: () => void;
  removeSelectedActionLabel?: string;
  onSubmit?: (value: string, model?: string) => void | Promise<void>;
  loading?: boolean;
  onStop?: () => void;
  minRows?: number;
  maxRows?: number;
  layout?: 'stacked' | 'inline';
  leadingAction?: ReactNode;
  trailingAction?: ReactNode;
  className?: string;
}

export function PromptInput({
  value,
  defaultValue = '',
  onValueChange,
  models = [],
  model,
  defaultModel,
  onModelChange,
  actions = [],
  onAction,
  selectedAction,
  onSelectedActionClear,
  removeSelectedActionLabel = 'Remove selected tool',
  onSubmit,
  loading = false,
  onStop,
  minRows = 2,
  maxRows = 8,
  layout = 'stacked',
  leadingAction,
  trailingAction,
  className,
  disabled,
  placeholder = 'Ask the agent to do something…',
  'aria-label': ariaLabel = 'Prompt',
  onKeyDown,
  ...textareaProps
}: PromptInputProps) {
  const reduce = useReducedMotion() ?? false;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalModel, setInternalModel] = useState(
    defaultModel ?? models[0]?.value,
  );
  const [actionsOpen, setActionsOpen] = useState(false);
  const [multiline, setMultiline] = useState(false);
  const currentValue = value ?? internalValue;
  const currentModelValue = model ?? internalModel;
  const currentModel = models.find(
    (option) => option.value === currentModelValue,
  );
  const currentAction = actions.find(
    (action) => action.value === selectedAction,
  );
  const clearCurrentActionLabel =
    currentAction && typeof currentAction.label === 'string'
      ? `${removeSelectedActionLabel}: ${currentAction.label}`
      : removeSelectedActionLabel;
  const canSubmit = Boolean(currentValue.trim()) && !disabled && !loading;

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    const measurement = measurementRef.current;
    if (!textarea || !measurement || textarea.value !== currentValue) return;

    const lineHeight = 24;
    const nextHeight = Math.min(
      Math.max(measurement.scrollHeight, minRows * lineHeight),
      maxRows * lineHeight,
    );
    const height = `${nextHeight}px`;
    if (textarea.style.height !== height) textarea.style.height = height;
    setMultiline(nextHeight > lineHeight);
  }, [currentValue, maxRows, minRows]);

  useLayoutEffect(() => {
    resizeTextarea();
  }, [resizeTextarea]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(resizeTextarea);
    observer.observe(textarea);
    return () => observer.disconnect();
  }, [resizeTextarea]);

  const setValue = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const setModel = (next: string) => {
    if (model === undefined) setInternalModel(next);
    onModelChange?.(next);
  };

  const submit = (event?: { preventDefault(): void }) => {
    event?.preventDefault();
    const prompt = currentValue.trim();
    if (!prompt || disabled || loading) return;

    void onSubmit?.(prompt, currentModelValue);
    if (value === undefined) setInternalValue('');
    textareaRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.key !== 'Enter' ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }
    event.preventDefault();
    submit();
  };

  return (
    <form
      data-slot="prompt-input"
      data-layout={layout}
      data-multiline={multiline}
      onSubmit={submit}
      className={cn(
        'relative w-full rounded-2xl border border-border/80 bg-background p-2 transition-colors focus-within:border-foreground/25',
        disabled && 'opacity-60',
        className,
      )}
    >
      <div
        ref={measurementRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-2 top-0 whitespace-pre-wrap px-2 text-sm leading-6 [overflow-wrap:break-word]"
      >
        {`${currentValue}\u200b`}
      </div>
      <textarea
        ref={textareaRef}
        data-slot="prompt-input-textarea"
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        rows={minRows}
        {...textareaProps}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'scrollbar-hide block w-full resize-none overflow-y-auto bg-transparent px-2 pt-1.5 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/55',
          layout === 'inline' && 'order-2 min-w-0 flex-1',
        )}
      />

      <div
        data-slot="prompt-input-toolbar"
        className={cn(
          'mt-1 flex min-h-8 items-center gap-1',
          layout === 'inline' && 'contents',
        )}
      >
        {actions.length ? (
          <MorphPopover
            open={actionsOpen}
            onOpenChange={setActionsOpen}
            className={cn(
              'prompt-input__actions min-w-0',
              layout === 'inline' && 'order-1 shrink-0',
            )}
          >
            {currentAction ? (
              <motion.button
                key={currentAction.value}
                type="button"
                disabled={disabled || loading}
                aria-label={clearCurrentActionLabel}
                title={clearCurrentActionLabel}
                data-slot="prompt-input-action-bubble"
                onClick={() => {
                  onSelectedActionClear?.();
                  requestAnimationFrame(() =>
                    textareaRef.current?.focus({ preventScroll: true }),
                  );
                }}
                initial={
                  reduce ? { opacity: 1 } : { opacity: 0, scale: 0.88, x: -4 }
                }
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={reduce ? { duration: 0 } : SPRING_SWAP}
                className="group flex h-8 min-w-0 max-w-44 shrink-0 items-center gap-1.5 rounded-full border border-border/75 bg-muted/80 px-2.5 text-xs text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {currentAction.icon ? (
                  <span
                    aria-hidden="true"
                    className="grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-3.5"
                  >
                    {currentAction.icon}
                  </span>
                ) : null}
                <span
                  data-slot="prompt-input-action-label"
                  className="truncate"
                >
                  {currentAction.label}
                </span>
                <X
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                />
              </motion.button>
            ) : (
              <MorphPopoverTrigger>
                <Button
                  data-slot="prompt-input-actions-trigger"
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled || loading}
                  aria-label="Add to prompt"
                  className="size-8 rounded-full"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: actionsOpen ? 45 : 0 }}
                    transition={reduce ? { duration: 0 } : SPRING_SWAP}
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </Button>
              </MorphPopoverTrigger>
            )}

            <MorphPopoverContent
              side="top"
              align="start"
              sideOffset={8}
              radius={12}
              className="w-56 p-1.5"
            >
              {actions.map((action) => (
                <button
                  key={action.value}
                  type="button"
                  disabled={action.disabled}
                  onClick={() => {
                    onAction?.(action.value);
                    setActionsOpen(false);
                    requestAnimationFrame(() =>
                      textareaRef.current?.focus({ preventScroll: true }),
                    );
                  }}
                  className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left outline-none transition-colors hover:bg-muted focus-visible:bg-muted disabled:pointer-events-none disabled:opacity-50"
                >
                  {action.icon ? (
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4">
                      {action.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-sm text-foreground">
                      {action.label}
                    </span>
                    {action.description ? (
                      <span className="mt-0.5 block text-xs leading-4 text-muted-foreground">
                        {action.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </MorphPopoverContent>
          </MorphPopover>
        ) : null}
        {leadingAction ? (
          <span
            data-slot="prompt-input-leading-action"
            className={cn(
              'inline-flex shrink-0',
              layout === 'inline' && 'order-3',
            )}
          >
            {leadingAction}
          </span>
        ) : null}
        {models.length ? (
          <Select
            value={currentModelValue}
            onValueChange={setModel}
            disabled={disabled || loading}
            className={cn(
              'prompt-input__model min-w-0',
              layout === 'inline' && 'order-3 shrink-0',
            )}
          >
            <SelectTrigger className="h-8 w-auto max-w-52 rounded-xl border-0 bg-transparent px-2 py-0 text-xs hover:bg-muted focus-visible:ring-2">
              <span className="flex min-w-0 items-center gap-1.5">
                {currentModel?.icon ? (
                  <span className="grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-3.5">
                    {currentModel.icon}
                  </span>
                ) : null}
                <span className="truncate text-muted-foreground">
                  {currentModel?.label ?? 'Choose model'}
                </span>
              </span>
            </SelectTrigger>
            <SelectContent className="right-auto w-52 shadow-none">
              {models.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="py-2"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {option.icon ? (
                      <span className="grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4">
                        {option.icon}
                      </span>
                    ) : null}
                    <span className="min-w-0 truncate text-sm text-foreground">
                      {option.label}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
        {trailingAction ? (
          <span
            data-slot="prompt-input-trailing-action"
            className={cn(
              'inline-flex shrink-0',
              layout === 'inline' && 'order-4',
            )}
          >
            {trailingAction}
          </span>
        ) : null}

        <Button
          data-slot="prompt-input-submit"
          type={loading ? 'button' : 'submit'}
          size="icon"
          disabled={loading ? !onStop : !canSubmit}
          aria-label={loading ? 'Stop generating' : 'Send prompt'}
          onClick={loading ? onStop : undefined}
          className={cn(
            'ml-auto size-8 rounded-full',
            layout === 'inline' && 'order-5 ml-0 shrink-0',
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={loading ? 'stop' : 'send'}
              initial={
                reduce ? { opacity: 1 } : { opacity: 0, y: 3, scale: 0.8 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -3, scale: 0.8 }}
              transition={reduce ? { duration: 0 } : SPRING_SWAP}
              className="grid place-items-center"
            >
              {loading ? (
                <Square className="size-3 fill-current" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </form>
  );
}
