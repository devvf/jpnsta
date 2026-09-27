import { ExternalArrow } from "./ExternalArrow";

export type IndexItem = {
  label: string;
  note?: string;
  href: string;
  external?: boolean;
};

// Large typographic list of links, separated by hairline rules.
export function IndexList({ items }: { items: IndexItem[] }) {
  return (
    <ul className="index-list">
      {items.map((item) => (
        <li key={item.label} data-reveal>
          <a
            href={item.href}
            {...(item.external === false ? {} : { target: "_blank", rel: "noreferrer" })}
          >
            <span className="index-label">{item.label}</span>
            {item.note && <span className="index-note">{item.note}</span>}
            <span className="index-arrow" aria-hidden="true">
              {item.external === false ? "→" : <ExternalArrow />}
            </span>
            {item.external !== false && <span className="sr-only">(opens in new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
