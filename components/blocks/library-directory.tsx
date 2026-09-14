import { HookSidebar } from '@/components/ui/hook-sidebar';

/**
 * Reusable left directory for the component library: one group of
 * individual components and a second group of composed blocks.
 */
export function LibraryDirectory({
  componentsLabel,
  blocksLabel,
  componentItems,
  blockItems,
  componentValue,
  blockValue,
  onComponentChange,
  onBlockChange,
}: {
  componentsLabel: string;
  blocksLabel: string;
  componentItems: string[];
  blockItems: string[];
  componentValue: number;
  blockValue: number;
  onComponentChange: (index: number) => void;
  onBlockChange: (index: number) => void;
}) {
  return (
    <div className="library-directory">
      <HookSidebar
        label={componentsLabel}
        items={componentItems}
        value={componentValue}
        onChange={onComponentChange}
      />
      <div className="mt-6">
        <HookSidebar
          label={blocksLabel}
          items={blockItems}
          value={blockValue}
          onChange={onBlockChange}
        />
      </div>
    </div>
  );
}
