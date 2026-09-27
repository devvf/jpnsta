import { IndexList } from "../components/IndexList";
import { JoinBanner } from "../components/JoinBanner";
import { Kanji } from "../components/Kanji";
import { links, site } from "../data/site";
import { asset } from "../lib/asset";

// TODO: fill in the current committee.
const committee: { role: string; name: string }[] = [
  { role: "President", name: "TBC" },
  { role: "Vice President", name: "TBC" },
  { role: "Secretary", name: "TBC" },
  { role: "Treasurer", name: "TBC" },
  { role: "Events", name: "TBC" },
  { role: "Language", name: "TBC" },
];

export function About() {
  const named = committee.filter((c) => c.name && c.name !== "TBC");

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Kanji className="page-kanji">紹介</Kanji>
          <h1 data-reveal>About the society</h1>
          <p className="lead" data-reveal>
            {site.blurb}
          </p>
        </div>
      </section>

      <figure className="photo band" data-reveal>
        <img src={asset("/photos/about.webp")} alt="" decoding="async" width="1600" height="1200" />
      </figure>

      <section className="section">
        <div className="container split">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>活動</Kanji>
              <h2>What we do</h2>
            </div>
          </div>
          <div className="prose" data-reveal>
            <p>
              There's something on most weeks, usually a social, a language
              café or a language class. We're also planning a karaoke night,
              matcha and sake tastings, onigiri making and a film screening
              with Film Society. We'll post dates once they're confirmed.
            </p>
            <p>
              We also run a careers account for anyone thinking about working
              or studying in Japan.
            </p>
            <p>
              Everyone is welcome, even if you don't speak Japanese and just
              want to hang out.
            </p>
            <h3>Membership</h3>
            <p>
              Membership is {site.membershipPrice} for the 2026/27 academic
              year. Pay online via the{" "}
              <a className="text-link" href={links.union} target="_blank" rel="noreferrer">
                Union page
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              , or bring {site.membershipPrice} in cash to any event.
            </p>
            <p>
              You'll get a membership card, our weekly email, free language
              classes and discounts with our sponsors. More on the discounts
              soon.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>委員会</Kanji>
              <h2>Who runs it</h2>
            </div>
          </div>
          {named.length > 0 ? (
            <dl className="roster" data-reveal>
              {named.map((c) => (
                <div key={c.role}>
                  <dt>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="prose" data-reveal>
              <p>
                We're run by a student committee. General Committee Members
                are elected at our EGM on Wednesday 7 October.
              </p>
              <p>
                Questions in the meantime? Email{" "}
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>書類</Kanji>
              <h2>Documents and contact</h2>
            </div>
          </div>
          <IndexList
            items={[
              { label: "Constitution", note: "How the society is run", href: links.constitution },
              { label: "Union page", note: `Membership, ${site.membershipPrice} a year, online or cash at any event`, href: links.union },
              { label: "Email us", note: site.email, href: `mailto:${site.email}`, external: false },
              { label: "Linktree", note: "All our other links, in one place", href: links.linktree },
            ]}
          />
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
