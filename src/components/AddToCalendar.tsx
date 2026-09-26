import type { SocietyEvent } from "../data/events";
import {
  googleCalendarUrl,
  icsFilename,
  icsHref,
  preferredCalendar,
} from "../lib/calendar";

export function AddToCalendar({ event }: { event: SocietyEvent }) {
  const kind = preferredCalendar();

  const apple = (label: string, className: string) => (
    <a className={className} href={icsHref(event)} download={icsFilename(event)}>
      {label}
      <span className="sr-only"> for {event.title}</span>
    </a>
  );

  const google = (label: string, className: string) => (
    <a className={className} href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
      {label}
      <span className="sr-only"> for {event.title} (opens in new tab)</span>
    </a>
  );

  return (
    <div className="add-cal">
      {kind === "apple"
        ? apple("Add to calendar", "add-cal-main")
        : google("Add to calendar", "add-cal-main")}
      {kind === "apple"
        ? google("Google", "add-cal-alt")
        : apple("Apple / Outlook", "add-cal-alt")}
    </div>
  );
}
