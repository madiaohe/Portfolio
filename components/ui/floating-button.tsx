'use client';

import Image from 'next/image';
import {
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/lib/hooks/use-dismiss';
import { useHoverCapable } from '@/lib/hooks/use-hover-capable';
import { cn } from '@/lib/utils';
import './floating-input.css';

export type FloatingActionPosition = 'top-left' | 'top' | 'top-right';

export interface FloatingAction {
  id: string;
  /** Accessible name and tooltip for the icon button. */
  label: string;
  icon: ReactNode;
  /** Slot on the fan arc. Defaults by index: top-right, top, top-left. */
  position?: FloatingActionPosition;
  onSelect?: () => void;
  /** Toggled state, e.g. the active language. */
  active?: boolean;
  disabled?: boolean;
}

const FAN_SLOTS: FloatingActionPosition[] = ['top-right', 'top', 'top-left'];

export interface FloatingButtonProps {
  /** Contained placement needs a positioned parent with overflow: hidden. */
  placement?: 'fixed' | 'contained';
  /** Optional composer revealed by one of the fan actions. */
  children?: ReactNode;
  icon?: ReactNode;
  /** Accessible name of the launcher button. */
  label?: string;
  /** Accessible name of the fan action group. */
  actionsLabel?: string;
  className?: string;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Radial actions fanned out on hover, focus, or tap. */
  actions?: FloatingAction[];
}

const subscribeToBrowser = () => () => undefined;

/** A bottom-edge launcher. Its actions fan out on hover (or tap/focus), and a
 *  fan action can expand the launcher into a supplied composer. */
export function FloatingButton({
  placement = 'fixed',
  children,
  icon,
  label = '快捷操作',
  actionsLabel = '快捷操作',
  className,
  disabled = false,
  open,
  defaultOpen = false,
  onOpenChange,
  onClick,
  actions = [],
}: FloatingButtonProps) {
  const mounted = useSyncExternalStore(
    subscribeToBrowser,
    () => true,
    () => false,
  );
  const canHover = useHoverCapable();

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [tapOpen, setTapOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  // Whether the focus that landed inside the fan is keyboard focus. A mouse
  // click focuses a fan button too, but a hover-driven fan should still close
  // when the pointer leaves; only real keyboard focus pins it open.
  const [keyboardFocusWithin, setKeyboardFocusWithin] = useState(false);
  // Escape closes a keyboard-opened fan; returning focus to the launcher would
  // immediately reopen it, so the close is remembered until the user engages
  // the widget again (hover, tap, or re-entering from outside).
  const [dismissedByEscape, setDismissedByEscape] = useState(false);

  const expanded = Boolean(children) && (open ?? internalOpen);
  const fanOpen =
    !disabled &&
    ((canHover ? hovered : false) ||
      tapOpen ||
      (focusWithin && keyboardFocusWithin && !dismissedByEscape));

  const surfaceRef = useRef<HTMLFieldSetElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const contentId = useId();
  const fanId = useId();
  const hoverTimerRef = useRef<number | undefined>(undefined);

  const changeOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const dismissEmpty = useCallback(() => {
    const fields = surfaceRef.current?.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >('input, textarea');
    if (fields && Array.from(fields).some((field) => field.value.trim()))
      return;
    changeOpen(false);
  }, [changeOpen]);

  useDismiss(expanded, dismissEmpty, surfaceRef, { escape: false });
  const dismissFan = useCallback(() => setTapOpen(false), []);
  useDismiss(tapOpen && !expanded, dismissFan, scopeRef, { escape: false });

  const enterHover = useCallback(() => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    setDismissedByEscape(false);
    setHovered(true);
  }, []);
  const leaveHover = useCallback(() => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setHovered(false), 120);
  }, []);
  useEffect(
    () => () => {
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!expanded) return;
    const frame = requestAnimationFrame(() => {
      surfaceRef.current
        ?.querySelector('.floating-button__content')
        ?.querySelector<HTMLElement>(
          'input:not(:disabled), textarea:not(:disabled), button:not(:disabled)',
        )
        ?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [expanded]);

  // Escape must hand focus back to the launcher after the surface commits
  // its closed state. A rAF here runs before the CSS visibility transition
  // has made the trigger focusable again, so the request is flagged here and
  // honored by an effect that runs after commit.
  const closeViaEscapeRef = useRef(false);
  const wasExpandedRef = useRef(expanded);
  useEffect(() => {
    const wasOpen = wasExpandedRef.current;
    wasExpandedRef.current = expanded;
    if (!wasOpen || expanded || !closeViaEscapeRef.current) return;
    closeViaEscapeRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [expanded]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.isComposing || event.defaultPrevented)
        return;
      if (expanded) {
        if (
          !(event.target instanceof Node) ||
          !surfaceRef.current?.contains(event.target)
        )
          return;
        event.preventDefault();
        closeViaEscapeRef.current = true;
        changeOpen(false);
        return;
      }
      if (tapOpen || focusWithin) {
        event.preventDefault();
        setDismissedByEscape(true);
        setTapOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded, changeOpen, tapOpen, focusWithin]);

  const layer = (
    <div
      className={cn(
        'ui-scope floating-button',
        `floating-button--${placement}`,
        className,
      )}
      data-slot="floating-button"
      data-state={expanded ? 'open' : 'closed'}
      data-fan={fanOpen && !expanded ? 'open' : 'closed'}
      data-disabled={disabled || undefined}
      onFocus={(event) => {
        const enteredFromOutside =
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget);
        if (enteredFromOutside) setDismissedByEscape(false);
        setFocusWithin(true);
        setKeyboardFocusWithin(
          event.target instanceof Element &&
            event.target.matches(':focus-visible'),
        );
      }}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          event.currentTarget.contains(event.relatedTarget)
        )
          return;
        setFocusWithin(false);
        setKeyboardFocusWithin(false);
      }}
    >
      <div ref={scopeRef} className="floating-button__scope">
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- hover tracking over the launcher */}
        <fieldset
          ref={surfaceRef}
          className="floating-button__surface"
          aria-label={label}
          disabled={disabled}
          onMouseEnter={enterHover}
          onMouseLeave={leaveHover}
        >
          <button
            ref={triggerRef}
            type="button"
            className="floating-button__trigger"
            data-slot="floating-button-trigger"
            aria-label={label}
            aria-expanded={actions.length ? fanOpen : undefined}
            aria-controls={actions.length ? fanId : undefined}
            aria-hidden={expanded || undefined}
            inert={expanded}
            disabled={disabled}
            onClick={(event) => {
              onClick?.(event);
              if (event.defaultPrevented) return;
              setDismissedByEscape(false);
              setTapOpen((value) => !value);
            }}
          >
            <span className="floating-button__icon" aria-hidden="true">
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
          </button>
          {children && (
            <div
              id={contentId}
              className="floating-button__content"
              aria-hidden={!expanded}
              inert={!expanded}
            >
              {children}
            </div>
          )}
        </fieldset>

        {actions.length > 0 && (
          /* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- hover tracking over the fan area */
          <fieldset
            id={fanId}
            aria-label={actionsLabel}
            className="floating-button__fan"
            onMouseEnter={enterHover}
            onMouseLeave={leaveHover}
            aria-hidden={(!fanOpen || expanded) || undefined}
            inert={!fanOpen || expanded}
          >
            {actions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className="floating-button__action"
                data-action={action.position ?? FAN_SLOTS[index % FAN_SLOTS.length]}
                aria-label={action.label}
                aria-pressed={action.active || undefined}
                title={action.label}
                disabled={disabled || action.disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  setTapOpen(false);
                  action.onSelect?.();
                }}
              >
                <span className="floating-button__action-icon" aria-hidden="true">
                  {action.icon}
                </span>
              </button>
            ))}
          </fieldset>
        )}
      </div>
    </div>
  );

  if (placement === 'fixed')
    return mounted ? createPortal(layer, document.body) : null;
  return layer;
}
