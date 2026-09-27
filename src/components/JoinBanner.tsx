import { links, site } from "../data/site";
import { Kanji } from "./Kanji";

export function JoinBanner() {
  return (
    <section className="join-band">
      <div className="container join-inner" data-reveal>
        <Kanji className="join-kanji">入会</Kanji>
        <div>
          <h2>Join for {site.membershipPrice} a year.</h2>
          <p>
            Pay online through the Union, or in cash at any event. You get
            a membership card, free language classes and our weekly email.
          </p>
        </div>
        <a className="btn light" href={links.union} target="_blank" rel="noreferrer">
          Join on the Union site <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
