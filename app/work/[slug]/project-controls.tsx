'use client';

import { useLayoutEffect, useState, type RefObject } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { usePopoverPortalPosition } from '@/lib/hooks/use-popover-portal-position';

const scenarios = [
  {
    value: 'normal',
    zh: '正常运行',
    en: 'Normal operation',
    descriptionZh: '查看设备稳定运行时的状态',
    descriptionEn: 'Steady equipment operation.',
  },
  {
    value: 'warning',
    zh: '运行报警',
    en: 'Warning',
    descriptionZh: '设备继续运行，提示异常读数',
    descriptionEn: 'Running with a warning.',
  },
  {
    value: 'fault',
    zh: '故障停机',
    en: 'Fault shutdown',
    descriptionZh: '查看故障停机与报警反馈',
    descriptionEn: 'Stopped after a fault.',
  },
];

export function ProjectControls({
  open,
  panelRef,
  triggerRef,
  zh,
  scenario,
  onScenarioChange,
  onRestart,
  onClose,
}: {
  open: boolean;
  panelRef: RefObject<HTMLDialogElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  zh: boolean;
  scenario: string;
  onScenarioChange: (value: string) => void;
  onRestart: () => void;
  onClose: () => void;
}) {
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
      id="project-scenario-panel"
      className="project-experience__scenarios"
      open={open}
      aria-labelledby="project-controls-title"
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
        <h2 id="project-controls-title">
          {zh ? '原型控制台' : 'Prototype controls'}
        </h2>
        <button
          type="button"
          className="project-controls__close"
          aria-label={zh ? '关闭控制台' : 'Close controls'}
          onClick={onClose}
        >
          <X size={16} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </header>
      <fieldset
        className="project-controls__scenes"
        aria-label={zh ? '场景选择' : 'Scenario selection'}
      >
        {scenarios.map((item) => (
          <label
            className="project-controls__scene"
            key={item.value}
            aria-label={zh ? item.zh : item.en}
          >
            <input
              type="radio"
              name="project-scenario"
              value={item.value}
              checked={scenario === item.value}
              onChange={() => onScenarioChange(item.value)}
            />
            <span>
              <span className="project-controls__scene-title">
                {zh ? item.zh : item.en}
              </span>
              <span className="project-controls__scene-description">
                {zh ? item.descriptionZh : item.descriptionEn}
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <footer className="project-controls__footer">
        <button
          type="button"
          className="project-controls__restart"
          onClick={onRestart}
        >
          <RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" />
          {zh ? '重新开始' : 'Restart demo'}
        </button>
        <div className="project-controls__passwords">
          <span>{zh ? '演示密码' : 'Demo PINs'}</span>
          <span>
            {zh ? '用户' : 'User'} <code>1234</code>
          </span>
          <span>
            {zh ? '厂家' : 'Factory'} <code>8888</code>
          </span>
        </div>
      </footer>
    </dialog>
  );
}
