'use client';

import Image from 'next/image';
import {
  Children,
  Fragment,
  cloneElement,
  type MouseEventHandler,
  type ReactNode,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import type { CapsuleSize } from '@/components/ui/capsule-input';
import { useDismiss } from '@/lib/hooks/use-dismiss';
import { useHoverCapable } from '@/lib/hooks/use-hover-capable';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { useHoverGesture } from '@/lib/hooks/use-hover-gesture';
import './floating-input.css';

export type FloatingActionPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'end';

export interface FloatingAction {
  id: string;
  /** Accessible name and tooltip for the icon button. */
  label: string;
  icon: ReactNode;
  /** Custom control rendered in this toolbar slot, such as a segmented tab list. */
  content?: ReactNode;
  /** Slot on the fan arc. Defaults by index: top-right, top, top-left. */
  position?: FloatingActionPosition;
  onSelect?: (trigger: HTMLButtonElement) => void;
  controls?: string;
  expanded?: boolean;
  /** Visual group boundary in toolbar layout; omitted for the first action. */
  separatorBefore?: boolean | 'inline';
  /** Toggled state, e.g. the active language. */
  active?: boolean;
  disabled?: boolean;
}

const TOOLBAR_SLOTS: FloatingActionPosition[] = [
  'left',
  'top-right',
  'top-left',
  'top',
  'right',
  'end',
];

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
  /** Compact shared surface for larger action sets; fan remains the default. */
  actionLayout?: 'fan' | 'toolbar';
  /** Keep actions visible while an attached panel is in use. */
  actionsOpen?: boolean;
  /** Always show a toolbar without the bottom launcher. */
  persistent?: boolean;
  /** Actions revealed on hover, focus, or tap. */
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
  actionLayout = 'fan',
  actionsOpen = false,
  persistent = false,
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
  // Measured size of the composer child; drives the surface as a definite
  // length so the open/close size transition interpolates smoothly.
  const [composerSize, setComposerSize] = useState<CapsuleSize | null>(null);
  // Whether the focus that landed inside the fan is keyboard focus. A mouse
  // click focuses a fan button too, but a hover-driven fan should still close
  // when the pointer leaves; only real keyboard focus pins it open.
  const [keyboardFocusWithin, setKeyboardFocusWithin] = useState(false);
  // Escape closes a keyboard-opened fan; returning focus to the launcher would
  // immediately reopen it, so the close is remembered until the user engages
  // the widget again (hover, tap, or re-entering from outside).
  const [dismissedByEscape, setDismissedByEscape] = useState(false);

  const persistentToolbar = persistent && actionLayout === 'toolbar';
  const expanded = Boolean(children) && (open ?? internalOpen);
  const fanOpen =
    !disabled &&
    (persistentToolbar ||
      actionsOpen ||
      (canHover ? hovered : false) ||
      tapOpen ||
      (focusWithin && keyboardFocusWithin && !dismissedByEscape));

  const surfaceRef = useRef<HTMLFieldSetElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const contentId = useId();
  const fanId = useId();
  const hoverTimerRef = useRef<number | undefined>(undefined);

  const focusReturnTarget = useCallback(() => {
    const target =
      triggerRef.current ??
      scopeRef.current?.querySelector<HTMLButtonElement>(
        '.floating-button__action[data-action="top"]',
      );
    target?.focus({ preventScroll: true });
  }, []);

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

  const handleComposerSize = useCallback((size: CapsuleSize) => {
    setComposerSize((prev) =>
      prev &&
      prev.width === size.width &&
      prev.height === size.height &&
      prev.multiline === size.multiline
        ? prev
        : size,
    );
  }, []);
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
    focusReturnTarget();
  }, [expanded, focusReturnTarget]);

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
        focusReturnTarget();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded, changeOpen, tapOpen, focusWithin, focusReturnTarget]);

  const composer = children
    ? Children.map(children, (child) =>
        isValidElement<{ onSizeChange?: (size: CapsuleSize) => void }>(child)
          ? cloneElement(child, { onSizeChange: handleComposerSize })
          : child,
      )
    : children;

  const positionedActions = actions.map((action, index) => ({
    action,
    position: action.position ?? FAN_SLOTS[index % FAN_SLOTS.length],
  }));
  if (actionLayout === 'toolbar')
    positionedActions.sort(
      (a, b) =>
        TOOLBAR_SLOTS.indexOf(a.position) - TOOLBAR_SLOTS.indexOf(b.position),
    );
  const actionGroups: (typeof positionedActions)[] = [];
  for (const item of positionedActions) {
    if (
      !actionGroups.length ||
      (actionLayout === 'toolbar' && item.action.separatorBefore === true)
    )
      actionGroups.push([]);
    actionGroups[actionGroups.length - 1].push(item);
  }
  function renderAction({
    action,
    position,
  }: (typeof positionedActions)[number]) {
    if (actionLayout === 'toolbar' && action.content !== undefined)
      return (
        <div key={action.id} className="floating-button__custom-action">
          {action.content}
        </div>
      );
    const button = (
      <FloatingActionButton
        key={action.id}
        action={action}
        position={position}
        disabled={disabled || action.disabled}
        visible={fanOpen && !expanded}
        onSelect={(trigger) => {
          setTapOpen(false);
          action.onSelect?.(trigger);
        }}
      />
    );
    return actionLayout === 'toolbar' && action.separatorBefore === 'inline' ? (
      <Fragment key={action.id}>
        <span className="floating-button__separator" aria-hidden="true" />
        {button}
      </Fragment>
    ) : (
      button
    );
  }

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
      data-action-layout={actionLayout}
      data-persistent-toolbar={persistentToolbar || undefined}
      data-wide-fan={
        actions.some(
          (action) => action.position === 'left' || action.position === 'right',
        ) || undefined
      }
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
          hidden={persistentToolbar && !expanded}
          aria-label={label}
          disabled={disabled}
          style={
            expanded && composerSize
              ? {
                  width: `${composerSize.width}px`,
                  height: `${composerSize.height}px`,
                }
              : undefined
          }
          onMouseEnter={enterHover}
          onMouseLeave={leaveHover}
        >
          {!persistentToolbar && (
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
          )}
          {children && (
            <div
              id={contentId}
              className="floating-button__content"
              aria-hidden={!expanded}
              inert={!expanded}
            >
              {composer}
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
            aria-hidden={!fanOpen || expanded || undefined}
            inert={!fanOpen || expanded}
          >
            {actionLayout === 'toolbar'
              ? actionGroups.map((group, index) => (
                  <Fragment key={group[0].action.id}>
                    {index > 0 && (
                      <span
                        className="floating-button__separator"
                        aria-hidden="true"
                      />
                    )}
                    <div className="floating-button__action-group">
                      {group.map(renderAction)}
                    </div>
                  </Fragment>
                ))
              : positionedActions.map(renderAction)}
          </fieldset>
        )}
      </div>
    </div>
  );

  if (placement === 'fixed')
    return mounted ? createPortal(layer, document.body) : null;
  return layer;
}

/** Controlled Tooltip keeps the button itself as the positioned element. */
function FloatingActionButton({
  action,
  position,
  disabled,
  visible,
  onSelect,
}: {
  action: FloatingAction;
  position: FloatingActionPosition;
  disabled?: boolean;
  visible: boolean;
  onSelect: (trigger: HTMLButtonElement) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipId = useId();
  const hover = useHoverGesture();
  const [tipOpen, setTipOpen] = useState(false);
  const showTip = visible && !disabled && tipOpen;
  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="floating-button__action"
        data-action={position}
        aria-label={action.label}
        aria-describedby={showTip ? tooltipId : undefined}
        aria-pressed={action.active || undefined}
        aria-controls={action.controls}
        aria-expanded={action.expanded}
        disabled={disabled}
        onPointerEnter={(event) => {
          if (hover.enter(event)) setTipOpen(true);
        }}
        onPointerLeave={(event) => {
          if (hover.leave(event)) setTipOpen(false);
        }}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) setTipOpen(true);
        }}
        onBlur={() => setTipOpen(false)}
        onClick={(event) => {
          event.stopPropagation();
          setTipOpen(false);
          onSelect(event.currentTarget);
        }}
      >
        <span className="floating-button__action-icon" aria-hidden="true">
          {action.icon}
        </span>
      </button>
      <Tooltip
        id={tooltipId}
        anchorRef={buttonRef}
        open={showTip}
        onOpenChange={setTipOpen}
        content={action.label}
        side="top"
      />
    </>
  );
}
