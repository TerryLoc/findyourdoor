import { useEffect, useState } from 'react';
import SEO from '@/components/SEO/SEO';
import { SITE } from '@/constants/content';
import terryPhoto from '@/assets/images/hero.jpeg';
import styles from './WorryResetProgramme.module.css';

const worksheetCover = '/10min%20WRW%20p1.png';

const programmeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'The Worry Reset Programme',
  description:
    'A calm, practical four-week programme from Find Your Door for men who feel stuck in worry, overthinking, avoidance, procrastination, or loss of confidence.',
  provider: {
    '@type': 'Organization',
    name: 'Find Your Door',
    sameAs: 'https://findyourdoor.ie',
  },
};

const recognitionItems = [
  'You replay conversations long after they happen',
  'You avoid decisions, messages, bills, or conversations',
  'You lie awake thinking about work, money, health, or relationships',
  'You have lost confidence in yourself, but you are not sure when it happened',
];

const doorMethod = [
  ['D', 'Define the worry', 'Name what is actually going on.'],
  ['O', 'Own what is controllable', 'Separate what is yours from what is not.'],
  [
    'O',
    'Open one next step',
    'Choose one small action that moves you forward.',
  ],
  [
    'R',
    'Release what is not yours',
    'Stop feeding what you cannot solve today.',
  ],
];

const weeks = [
  [
    'Week 1',
    'Awareness',
    'See where worry is showing up and what it is costing you.',
  ],
  [
    'Week 2',
    'Understanding',
    'Separate real problems from mental noise and steady the system.',
  ],
  [
    'Week 3',
    'Action',
    'Turn worry into one clear next step and rebuild confidence through action.',
  ],
  [
    'Week 4',
    'Integration',
    'Handle setbacks without spiralling and create a simple 30-day plan.',
  ],
];

const included = [
  '8 calm, guided modules',
  '2 modules released each week',
  'Short video lessons',
  'Audio reflections for quiet reflection',
  'Downloadable worksheets',
  'The DOOR Method framework',
  'Practical exercises for worry and avoidance',
  'A 30-day reset plan',
];

const fitItems = [
  'You are tired of living in your head',
  'You want a calm, practical way to handle worry',
  'You are willing to pause and be honest with yourself',
  'You want one small step instead of trying to fix everything overnight',
];

const notFitItems = [
  'You are looking for a quick fix',
  'You want someone else to make your choices for you',
  'You need therapy, clinical treatment, or urgent support',
  'You are not willing to pause and reflect honestly',
];

function ButtonLink({ href, children, variant = 'primary' }) {
  return (
    <a
      className={
        variant === 'secondary' ? styles.secondaryButton : styles.primaryButton
      }
      href={href}
    >
      {children}
    </a>
  );
}

function WorksheetOptIn() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect this placeholder to MailerLite, Mailchimp, ConvertKit, EmailJS, or another provider.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.formSuccess} role="status">
        <p>Thank you. Your details have been received.</p>
        <span>
          Once the worksheet delivery is connected, this will send
          automatically.
        </span>
      </div>
    );
  }

  return (
    <form className={styles.worksheetForm} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label htmlFor="worksheet-name">First name</label>
        <input
          id="worksheet-name"
          name="name"
          type="text"
          autoComplete="given-name"
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="worksheet-email">Email address</label>
        <input
          id="worksheet-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <button type="submit">Download the Free Worksheet</button>
      <p className={styles.formNote}>
        Worksheet delivery provider to be connected before launch.
      </p>
    </form>
  );
}

function WorryResetProgramme() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Temporary join link. Replace with checkout, booking, or contact route before launch if available.
  const joinHref = `mailto:${SITE.email}?subject=The%20Worry%20Reset%20Programme`;

  return (
    <div className={styles.page}>
      <SEO
        title="The Worry Reset Programme | Find Your Door"
        description="A calm, practical four-week programme from Find Your Door for men who feel stuck in worry, overthinking, avoidance, procrastination, or loss of confidence. Start with the free 10-Minute Worry Reset Worksheet."
        pathname="/services/the-worry-reset-programme/"
        structuredData={programmeSchema}
      />

      <main id="main-content" role="main">
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>A Find Your Door Programme</p>
              <h1>The Worry Reset Programme</h1>
              <p className={styles.subheadline}>
                A calm four-week programme for men caught in worry,
                overthinking, avoidance, and feeling stuck.
              </p>
              <p className={styles.heroBody}>
                This is not about pretending everything is positive. It is about
                slowing down, telling yourself the truth, and choosing one
                honest next step.
              </p>
              <div className={styles.actions}>
                <ButtonLink href="#worksheet">
                  Download the Free Worksheet
                </ButtonLink>
                <ButtonLink href="#programme" variant="secondary">
                  Learn About the Programme
                </ButtonLink>
              </div>
            </div>

            <figure className={styles.heroCover}>
              <img
                src={worksheetCover}
                alt="The 10-Minute Worry Reset Worksheet"
              />
            </figure>
          </div>
        </section>

        <section className={styles.softEntry}>
          <div className="container">
            <p>
              Not ready for the full programme yet? Start with the free
              10-Minute Worry Reset Worksheet. No pressure. No overwhelm. Just
              ten quiet minutes with yourself.
            </p>
            <ButtonLink href="#worksheet">
              Download the Free Worksheet
            </ButtonLink>
          </div>
        </section>

        <section className={styles.recognition}>
          <div className="container section-pad">
            <div className={styles.centerBlock}>
              <p className={styles.eyebrow}>Recognition</p>
              <h2>When worry starts shaping your life</h2>
              <p>
                Worry does not always look like panic. Sometimes it looks like
                delay, silence, irritability, checking out, or avoiding the
                thing you know needs your attention.
              </p>
            </div>

            <div className={styles.recognitionList}>
              {recognitionItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.choiceSection}>
          <div className="container section-pad">
            <div className={styles.choiceBlock}>
              <p className={styles.eyebrow}>Choice Theory</p>
              <h2>
                You are never without choice - even when it feels that way
              </h2>
              <p>
                Worry can make life feel narrow. It can convince you there are
                no options, no way forward, and no door to open.
              </p>
              <p>
                But the first choice is not always a big dramatic life change.
                Sometimes it is pausing, breathing, telling yourself the truth,
                and asking what you can actually do next.
              </p>
              <p>
                The work is not forcing the choice. The work is finding the
                place inside you that wants to make it.
              </p>
              <blockquote>
                &quot;I cannot change the wind, but I can adjust my sails.&quot;
              </blockquote>
              <p className={styles.decision}>
                That is not just philosophy. That is a decision.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.videoSection}>
          <div className="container section-pad">
            <div className={styles.centerBlock}>
              <p className={styles.eyebrow}>A message from Terry</p>
              <h2>This is not about fixing you</h2>
              <p>
                It is about helping you pause, tell yourself the truth, and find
                the next door.
              </p>
            </div>

            <div
              className={styles.videoPlaceholder}
              role="img"
              aria-label="Promo video coming soon"
            >
              <span>Promo video coming soon</span>
            </div>
          </div>
        </section>

        <section id="programme" className={styles.programmeSection}>
          <div className="container section-pad">
            <div className={styles.programmeIntro}>
              <p className={styles.eyebrow}>The programme</p>
              <h2>A simple four-week rhythm</h2>
              <p>
                You receive two modules each week, enough to build momentum
                without flooding you with too much at once. The programme is
                designed to be lived, not binged.
              </p>
            </div>

            <div className={styles.programmeGrid}>
              <div className={styles.methodPanel}>
                <h3>The DOOR Method</h3>
                <p>
                  A simple framework to move from worry to one practical next
                  step.
                </p>
                <div className={styles.methodList}>
                  {doorMethod.map(([letter, title, body]) => (
                    <article key={`${letter}-${title}`}>
                      <span>{letter}</span>
                      <div>
                        <h4>{title}</h4>
                        <p>{body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.weekList}>
                {weeks.map(([week, title, body]) => (
                  <article key={week}>
                    <span>{week}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <ul className={styles.includedList}>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="worksheet" className={styles.worksheetSection}>
          <div className="container section-pad">
            <div className={styles.worksheetGrid}>
              <figure className={styles.worksheetCover}>
                <img
                  src={worksheetCover}
                  alt="The 10-Minute Worry Reset Worksheet"
                />
              </figure>

              <div className={styles.worksheetContent}>
                <p className={styles.eyebrow}>Free worksheet</p>
                <h2>Not ready for the full programme yet? Start here.</h2>
                <p>
                  The 10-Minute Worry Reset Worksheet helps you get out of your
                  head, calm the noise, and find one honest next step.
                </p>
                <p>
                  If it helps, the full programme gives you the deeper four-week
                  path.
                </p>
                <WorksheetOptIn />
                <p className={styles.quietLine}>
                  No pressure. No overwhelm. Just ten quiet minutes with
                  yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className="container section-pad">
            <div className={styles.aboutGrid}>
              <img
                src={terryPhoto}
                alt="Terry Loughran, Life and Mindset Coach for Men"
                loading="lazy"
                width="267"
                height="566"
              />

              <div>
                <p className={styles.eyebrow}>About Terry</p>
                <h2>A man looking to support other men</h2>
                <p>
                  I am Terry Loughran, Life & Mindset Coach for Men and founder
                  of Find Your Door. I support men in their 30s and 40s who feel
                  stuck, have lost confidence, or are carrying more than they
                  let on.
                </p>
                <p>
                  This programme was created to give men a calm, practical way
                  to face worry, understand the pattern, and reclaim one small
                  piece of ground.
                </p>

                <div className={styles.fitBox}>
                  <h3>This may be for you if:</h3>
                  <ul>
                    {fitItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.fitBox}>
                  <h3>This may not be for you if:</h3>
                  <ul>
                    {notFitItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className="container">
            <p className={styles.eyebrow}>One door at a time</p>
            <h2>You do not need to solve your whole life today</h2>
            <p>
              Start by telling yourself the truth. Then choose one honest next
              step.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={joinHref}>
                Join The Worry Reset Programme
              </ButtonLink>
              <ButtonLink href="#worksheet" variant="secondary">
                Download the Free Worksheet
              </ButtonLink>
            </div>

            <aside
              className={styles.disclaimer}
              aria-label="Important programme note"
            >
              <h3>Important note</h3>
              <p>
                The Worry Reset Programme and 10-Minute Worry Reset Worksheet
                are for reflection, education, and personal development. They
                are not therapy, medical advice, or a replacement for
                professional mental health support. If anxiety feels severe,
                persistent, unmanageable, or you feel at risk of harming
                yourself or someone else, please contact a qualified health
                professional or emergency support service in your area.
              </p>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WorryResetProgramme;
