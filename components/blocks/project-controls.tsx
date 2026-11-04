'use client';

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { RotateCcw, X } from 'lucide-react';
import { usePopoverPortalPosition } from '@/lib/hooks/use-popover-portal-position';
import { useDismiss } from '@/lib/hooks/use-dismiss';
import type { ProjectPrototypeControls } from '@/lib/projects';
import './project-controls.css';

export function ProjectControls({
  open,
  id,
  controls,
  triggerRef,
  zh,
  scenario,
  onScenarioChange,
  onRestart,
  onClose,
}: {
  open: boolean;
  id: string;
  controls: ProjectPrototypeControls;
  triggerRef: RefObject<HTMLButtonElement | null>;
  zh: boolean;
  scenario: string;
  onScenarioChange: (value: string) => void;
  onRestart: () => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDialogElement>(null);
  const groupId = useId();
  const scenarios = controls.scenarios ?? [];
  const dismiss = useCallback(() => {
    if (panelRef.current?.contains(document.activeElement))
      triggerRef.current?.focus({ preventScroll: true });
    onClose();
  }, [onClose, triggerRef]);
  const ignoreTrigger = useCallback(
    (target: Element) => Boolean(triggerRef.current?.contains(target)),
    [triggerRef],
  );
  useDismiss(open, dismiss, panelRef, { ignore: ignoreTrigger });
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() =>
      panelRef.current
        ?.querySelector<HTMLElement>(
          'input:checked, .project-controls__restart',
        )
        ?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [open]);
  const layout = usePopoverPortalPosition(triggerRef, panelRef, open);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    maxHeight: number;
    side: 'right' | 'top';
  } | null>(null);

  useLayoutEffect(() => {
    if (!open || !layout) return;
    const gap = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--space-sm'),
    );
    const viewport = document.documentElement;
    const { trigger, content } = layout;
    const right = trigger.left + trigger.width + gap;
    const fitsRight = right + content.width <= viewport.clientWidth - gap;
    const toolbarTop =
      triggerRef.current?.closest('fieldset')?.getBoundingClientRect().top ??
      trigger.top;
    const availableBottom = fitsRight
      ? viewport.clientHeight - gap
      : toolbarTop - gap;
    const maxHeight = Math.max(0, availableBottom - gap);
    const height = Math.min(content.height, maxHeight);
    setPosition({
      left: fitsRight
        ? right
        : Math.max(
            gap,
            Math.min(
              trigger.left + trigger.width - content.width,
              viewport.clientWidth - gap - content.width,
            ),
          ),
      top: fitsRight
        ? Math.max(
            gap,
            Math.min(
              trigger.top + trigger.height - height,
              viewport.clientHeight - gap - height,
            ),
          )
        : Math.max(gap, toolbarTop - gap - height),
      maxHeight,
      side: fitsRight ? 'right' : 'top',
    });
  }, [layout, open, triggerRef]);

  return (
    <dialog
      ref={panelRef}
      id={id}
      className="project-controls ui-scope"
      open={open}
      aria-labelledby={`${id}-title`}
      hidden={!open}
      data-side={position?.side}
      style={{
        left: position?.left,
        top: position?.top,
        maxHeight: position?.maxHeight,
        visibility: position ? 'visible' : 'hidden',
      }}
    >
      <header className="project-controls__header">
        <h2 id={`${id}-title`}>{zh ? '原型控制台' : 'Prototype controls'}</h2>
        <button
          type="button"
          className="project-controls__close"
          aria-label={zh ? '关闭控制台' : 'Close controls'}
          onClick={dismiss}
        >
          <X size={16} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </header>
      {scenarios.length > 0 && (
        <fieldset
          className="project-controls__scenes"
          aria-label={zh ? '场景选择' : 'Scenario selection'}
        >
          {scenarios.map((item) => (
            <label
              className="project-controls__scene"
              key={item.value}
              aria-label={item.label[zh ? 'zh' : 'en']}
            >
              <input
                type="radio"
                name={groupId}
                value={item.value}
                checked={scenario === item.value}
                onChange={() => onScenarioChange(item.value)}
              />
              <span>
                <span className="project-controls__scene-title">
                  {item.label[zh ? 'zh' : 'en']}
                </span>
                {item.description && (
                  <span className="project-controls__scene-description">
                    {item.description[zh ? 'zh' : 'en']}
                  </span>
                )}
              </span>
            </label>
          ))}
        </fieldset>
      )}
      <footer className="project-controls__footer">
        <button
          type="button"
          className="project-controls__restart"
          onClick={onRestart}
        >
          <RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" />
          {zh ? '重新开始' : 'Restart demo'}
        </button>
        {Boolean(controls.credentials?.length) && (
          <div className="project-controls__passwords">
            <span>{zh ? '演示密码' : 'Demo PINs'}</span>
            {controls.credentials?.map((credential) => (
              <span key={credential.label.en}>
                {credential.label[zh ? 'zh' : 'en']}{' '}
                <code>{credential.value}</code>
              </span>
            ))}
          </div>
        )}
      </footer>
    </dialog>
  );
}
