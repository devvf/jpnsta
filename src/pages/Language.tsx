import { JoinBanner } from "../components/JoinBanner";
import { LessonTable } from "../components/LessonTable";
import { lessonsIntro } from "../data/lessons";
import { site } from "../data/site";

export function Language() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow jp" data-reveal>日本語</span>
          <h1 data-reveal>Language lessons</h1>
          <p className="lead" data-reveal style={{ marginTop: "1rem" }}>
            {lessonsIntro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>Weekly timetable</h2>
          </div>
          <LessonTable />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2>How it works</h2>
          </div>
          <div className="prose" data-reveal>
            <h3>Who teaches?</h3>
            <p>
              Lessons are run by members, including native and advanced speakers.
              They're informal and free with membership.
            </p>
            <h3>What level am I?</h3>
            <p>
              If you can't read hiragana yet, start at Beginner. If you've done
              a year or so of study, try Intermediate. Conversation is open to
              everyone.
            </p>
            <h3>What should I bring?</h3>
            <p>A notebook and yourself. Materials are shared in the session.</p>
            <h3>Questions?</h3>
            <p>
              Email <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a> or
              message us on Instagram.
            </p>
          </div>
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
