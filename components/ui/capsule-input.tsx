'use client';

import { ArrowUp, Mic } from 'lucide-react';
import Image from 'next/image';
import {
  type CSSProperties,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import './floating-input.css';

export interface CapsuleSize {
  /** Desired outer (border-box) width of the capsule, including its border. */
  width: number;
  height: number;
  multiline: boolean;
}

export interface CapsuleInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'children' | 'rows'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  icon?: ReactNode;
  inputRef?: Ref<HTMLTextAreaElement>;
  onVoiceClick?: () => void;
  voiceActive?: boolean;
  voiceLabel?: string;
  /** Accessible name of the circular submit button. */
  sendLabel?: string;
  /** Custom submit icon. Defaults to an upward arrow. */
  sendIcon?: ReactNode;
  /** Resting capsule width. Defaults to 224px. */
  minWidth?: number;
  /** Widest the capsule grows before wrapping. Defaults to 550px (homepage column). */
  maxWidth?: number;
  /** Maximum visible rows in the wrapped composer. */
  maxRows?: number;
  /** Reports the measured capsule size so a host can animate its shell. */
  onSizeChange?: (size: CapsuleSize) => void;
}

const LINE_HEIGHT = 20;
/** Fixed side chrome beside the text: icon 28 + actions 64 + form padding 16. */
const SIDE_CHROME = 108;

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }
  };
}

/** A capsule that widens with its text, then wraps and grows upward like
 *  Prompt Input once it reaches the max width. */
export function CapsuleInput({
  value,
  defaultValue = '',
  onValueChange,
  onSubmit,
  icon,
  inputRef,
  onVoiceClick,
  voiceActive = false,
  voiceLabel = '语音输入',
  sendLabel = '发送',
  sendIcon,
  minWidth = 224,
  maxWidth = 550,
  maxRows = 8,
  onSizeChange,
  className,
  disabled = false,
  readOnly = false,
  placeholder = '随心输入',
  'aria-label': ariaLabel = placeholder,
  enterKeyHint = 'send',
  onKeyDown,
  ...textareaProps
}: CapsuleInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nowrapMeasureRef = useRef<HTMLDivElement>(null);
  const wrapMeasureRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(maxWidth);
  const [multiline, setMultiline] = useState(false);
  const [capsuleWidth, setCapsuleWidth] = useState(minWidth);

  const effectiveMax = Math.max(minWidth, Math.min(maxWidth, availableWidth));

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    // Inside the FloatingButton the surface shrink-wraps this capsule, so the
    // relevant width is the launcher host; standalone it is the parent box.
    const host = form.closest<HTMLElement>('[data-slot="floating-button"]');
    const target = host ?? form.parentElement;
    if (!target) return;
    const update = () => {
      const base = host
        ? host.getBoundingClientRect().width
        : target.clientWidth;
      setAvailableWidth(Math.max(minWidth, Math.min(maxWidth, base - 32)));
    };
    update();
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(target);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [maxWidth, minWidth]);

  const resize = useCallback(() => {
    const textarea = textareaRef.current;
    const nowrap = nowrapMeasureRef.current;
    const wrap = wrapMeasureRef.current;
    if (!textarea || !nowrap || !wrap || textarea.value !== currentValue) return;

    const textWidth = nowrap.scrollWidth;
    const wrapHeight = wrap.scrollHeight;
    // Only switch to the stacked layout once the text actually wraps at the
    // max width; between filling the capsule and wrapping it stays one row.
    const isMultiline = wrapHeight > LINE_HEIGHT;
    const width = isMultiline
      ? effectiveMax
      : Math.max(minWidth, Math.min(effectiveMax, SIDE_CHROME + textWidth));
    setMultiline(isMultiline);
    setCapsuleWidth(width);

    const height = isMultiline
      ? Math.min(Math.max(wrapHeight, LINE_HEIGHT), maxRows * LINE_HEIGHT)
      : LINE_HEIGHT;
    if (textarea.style.height !== `${height}px`) {
      textarea.style.height = `${height}px`;
    }
    onSizeChange?.({
      // Outer size: content width + borders, and the stacked layout height
      // (padding 16 + text + gap 8 + bottom bar 28 + border 2).
      width: width + 2,
      height: isMultiline ? height + 54 : 48,
      multiline: isMultiline,
    });
  }, [currentValue, effectiveMax, maxRows, minWidth, onSizeChange]);

  useLayoutEffect(() => {
    resize();
  }, [resize]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(resize);
    observer.observe(textarea);
    return () => observer.disconnect();
  }, [resize]);

  const submit = useCallback(() => {
    if (disabled || readOnly) return;
    const prompt = currentValue.trim();
    if (!prompt) return;
    onSubmit?.(prompt);
  }, [currentValue, disabled, onSubmit, readOnly]);

  return (
    <form
      ref={formRef}
      className={cn(
        'ui-scope capsule-input',
        multiline && 'capsule-input--multiline',
        className,
      )}
      data-slot="capsule-input"
      data-multiline={multiline || undefined}
      data-disabled={disabled || undefined}
      style={
        {
          '--capsule-input-width': `${capsuleWidth}px`,
          '--capsule-input-content-width': `${effectiveMax - 16}px`,
        } as CSSProperties
      }
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <span className="capsule-input__icon" aria-hidden="true">
        {icon ?? (
          <Image
            src="/media/floating-agent-logo.svg"
            width={16}
            height={16}
            alt=""
            className="floating-input-logo"
          />
        )}
      </span>
      <textarea
        {...textareaProps}
        ref={mergeRefs(textareaRef, inputRef)}
        data-slot="capsule-input-field"
        aria-label={ariaLabel}
        enterKeyHint={enterKeyHint}
        placeholder={placeholder}
        value={currentValue}
        rows={1}
        wrap={multiline ? 'soft' : 'off'}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          setInternalValue(event.target.value);
          onValueChange?.(event.target.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          // Enter confirms an IME candidate before it submits a prompt;
          // Shift+Enter inserts a line break so the capsule grows upward.
          if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.defaultPrevented &&
            // oxlint-disable-next-line typescript/no-deprecated -- Safari can clear isComposing on the IME confirmation key.
            !(event.nativeEvent.isComposing || event.keyCode === 229)
          ) {
            event.preventDefault();
            submit();
          }
        }}
      />
      <div className="capsule-input__actions">
        <button
          type="button"
          className="capsule-input__voice"
          data-slot="capsule-input-voice"
          aria-label={voiceLabel}
          aria-pressed={voiceActive}
          title={voiceLabel}
          disabled={disabled || readOnly || !onVoiceClick}
          onClick={onVoiceClick}
        >
          <Mic aria-hidden="true" size={16} strokeWidth={1.65} />
        </button>
        <button
          type="submit"
          className="capsule-input__send"
          data-slot="capsule-input-send"
          aria-label={sendLabel}
          title={sendLabel}
          disabled={disabled || readOnly || !currentValue.trim()}
        >
          {sendIcon ?? (
            <ArrowUp aria-hidden="true" size={16} strokeWidth={2} />
          )}
        </button>
      </div>
      <div
        ref={nowrapMeasureRef}
        aria-hidden="true"
        className="capsule-input__measure capsule-input__measure--nowrap"
      >
        {`${currentValue}\u200b`}
      </div>
      <div
        ref={wrapMeasureRef}
        aria-hidden="true"
        className="capsule-input__measure capsule-input__measure--wrap"
      >
        {`${currentValue}\u200b`}
      </div>
    </form>
  );
}
