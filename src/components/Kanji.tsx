// Decorative Japanese label. Hidden from screen readers because the English
// heading next to it carries the meaning.
export function Kanji({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`kanji jp ${className}`.trim()} lang="ja" aria-hidden="true">
      {children}
    </span>
  );
}
