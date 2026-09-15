'use client';

import { ArrowUp, Mic } from 'lucide-react';
import Image from 'next/image';
import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import './floating-input.css';

export interface CapsuleInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onSubmit'
  | 'size'
  | 'type'
  | 'children'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  icon?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  onVoiceClick?: () => void;
  voiceActive?: boolean;
  voiceLabel?: string;
  /** Accessible name of the circular submit button. */
  sendLabel?: string;
  /** Custom submit icon. Defaults to an upward arrow. */
  sendIcon?: ReactNode;
}

/** A single-line composer. Voice capture and submission belong to the caller. */
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
  className,
  disabled = false,
  readOnly = false,
  placeholder = '随心输入',
  'aria-label': ariaLabel = placeholder,
  enterKeyHint = 'send',
  onKeyDown,
  ...inputProps
}: CapsuleInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  return (
    <form
      className={cn('ui-scope capsule-input', className)}
      data-slot="capsule-input"
      data-disabled={disabled || undefined}
      onSubmit={(event) => {
        event.preventDefault();
        if (!disabled && !readOnly && currentValue.trim()) {
          onSubmit?.(currentValue.trim());
        }
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
      <input
        {...inputProps}
        ref={inputRef}
        type="text"
        data-slot="capsule-input-field"
        aria-label={ariaLabel}
        enterKeyHint={enterKeyHint}
        placeholder={placeholder}
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          setInternalValue(event.target.value);
          onValueChange?.(event.target.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          // Enter confirms an IME candidate before it submits a prompt.
          if (
            event.key === 'Enter' &&
            // oxlint-disable-next-line typescript/no-deprecated -- Safari can clear isComposing on the IME confirmation key.
            (event.nativeEvent.isComposing || event.keyCode === 229)
          ) {
            event.preventDefault();
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
    </form>
  );
}
