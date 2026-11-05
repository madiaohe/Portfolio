export type MarkdownHeading = { id: string; label: string; line: number };

export function markdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const used = new Map<string, number>();
  let fence: { character: string; length: number } | undefined;
  markdown.split('\n').forEach((line, index) => {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { character: marker[1][0], length: marker[1].length };
      else if (
        marker[1][0] === fence.character &&
        marker[1].length >= fence.length
      )
        fence = undefined;
      return;
    }
    if (fence) return;
    const heading = line.match(/^ {0,3}##\s+(.+?)(?:\s+#+)?\s*$/);
    if (!heading) return;
    const label = heading[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '');
    const base =
      label
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-') || 'section';
    const occurrence = used.get(base) ?? 0;
    used.set(base, occurrence + 1);
    headings.push({
      id: occurrence ? `${base}-${occurrence + 1}` : base,
      label,
      line: index + 1,
    });
  });
  return headings;
}
