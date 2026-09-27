import { JoinBanner } from "../components/JoinBanner";
import { Kanji } from "../components/Kanji";
import { LessonTable } from "../components/LessonTable";
import { lessonsIntro } from "../data/lessons";
import { site } from "../data/site";
import { asset } from "../lib/asset";

export function Language() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <Kanji className="page-kanji">日本語</Kanji>
          <h1 data-reveal>Language lessons</h1>
          <p className="lead" data-reveal>
            {lessonsIntro}
          </p>
        </div>
      </section>

      <figure className="photo band" data-reveal>
        <img src={asset("/photos/language.webp")} alt="" decoding="async" width="1600" height="1200" />
      </figure>

      <section className="section">
        <div className="container split">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>時間</Kanji>
              <h2>When, where and which level</h2>
            </div>
          </div>
          <LessonTable />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>案内</Kanji>
              <h2>How it works</h2>
            </div>
          </div>
          <div className="prose" data-reveal>
            <h3>What does it cost?</h3>
            <p>
              Free for members, just show your membership card at the start
              of each lesson. £2 per class for non-members. Membership is{" "}
              {site.membershipPrice} for the year.
            </p>
            <h3>Teach with us</h3>
            <p>
              Demand for our language classes is high this year, and we're
              especially looking for teachers for our beginner class. No
              teaching experience needed, just enthusiasm for the language.
              Email{" "}
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              if you're interested.
            </p>
            <h3>Questions?</h3>
            <p>
              Email{" "}
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or message us on Instagram.
            </p>
          </div>
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
