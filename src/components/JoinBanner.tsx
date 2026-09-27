import { links, site } from "../data/site";
import { Kanji } from "./Kanji";
import { ExternalArrow } from "./ExternalArrow";

export function JoinBanner() {
  return (
    <section className="join-band">
      <div className="container join-inner" data-reveal>
        <Kanji className="join-kanji">入会</Kanji>
        <div>
          <h2>Join for {site.membershipPrice} a year.</h2>
          <p>
            Pay online through the Union, or bring cash to any event. You'll
            get a membership card, free language classes, and we'll add you
            to our weekly email.
          </p>
        </div>
        <a className="btn light" href={links.union} target="_blank" rel="noreferrer">
          Join on the Union site <ExternalArrow />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
