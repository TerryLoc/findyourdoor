import { useEffect, useState } from 'react';
import SEO from '@/components/SEO/SEO';
import terryPhoto from '@/assets/images/hero.jpeg';
import { createEmailTemplateData, sendContactEmail } from '@/utils/email';
import styles from './WorryResetProgramme.module.css';

const worksheetCover = '/10min%20WRW%20p1.png';

const programmeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id':
        'https://findyourdoor.ie/services/the-worry-reset-programme/#webpage',
      url: 'https://findyourdoor.ie/services/the-worry-reset-programme/',
      name: 'The Worry Reset Programme | Find Your Door',
      description:
        'A calm six-week programme from Find Your Door for men who feel stuck in worry, overthinking, avoidance, procrastination or loss of confidence.',
      isPartOf: {
        '@id': 'https://findyourdoor.ie/#website',
      },
      about: {
        '@id':
          'https://findyourdoor.ie/services/the-worry-reset-programme/#course',
      },
      inLanguage: 'en-IE',
    },
    {
      '@type': 'BreadcrumbList',
      '@id':
        'https://findyourdoor.ie/services/the-worry-reset-programme/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://findyourdoor.ie/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'The Worry Reset Programme',
          item: 'https://findyourdoor.ie/services/the-worry-reset-programme/',
        },
      ],
    },
    {
      '@type': 'Course',
      '@id':
        'https://findyourdoor.ie/services/the-worry-reset-programme/#course',
      name: 'The Worry Reset Programme',
      description:
        'A calm six-week guided self-paced programme with four weeks of teaching, one mid-course reflection week and one final integration week.',
      image: 'https://findyourdoor.ie/og-image.jpg',
      provider: {
        '@id': 'https://findyourdoor.ie/#business',
      },
      audience: {
        '@type': 'Audience',
        audienceType:
          'Men in their 30s and 40s who feel stuck in worry, overthinking, avoidance or loss of confidence',
      },
      teaches: [
        'Separating real problems from mental noise',
        'Calming the system with gentle regulation tools',
        'Using the DOOR Method to choose one honest next step',
        'Rebuilding confidence through action',
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'P6W',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://findyourdoor.ie/#business',
      name: 'Find Your Door',
      url: 'https://findyourdoor.ie/',
      logo: 'https://findyourdoor.ie/main_logo.png',
      founder: {
        '@type': 'Person',
        name: 'Terry Loughran',
      },
    },
  ],
};

const recognitionItems = [
  'You replay conversations long after they happen',
  'You avoid decisions, messages, bills or conversations',
  'You lie awake thinking about work, money, health or relationships',
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
    'Sorting the Worry',
    'Separate real problems from mental noise, calm the system and begin the 5-Minute Peace Practice.',
  ],
  [
    'Week 3',
    'Reflection Week',
    'No new modules. Catch up, repeat the worksheets, practise calming tools and notice what is changing.',
  ],
  [
    'Week 4',
    'Taking Back Control',
    'Turn worry into one clear next step and rebuild confidence through action.',
  ],
  [
    'Week 5',
    'Integration',
    'Handle setbacks without spiralling and create a simple 30-day plan.',
  ],
  [
    'Week 6',
    'Reflection, Review and Next Door',
    'Complete your personal journey reflection, share feedback, identify the next door and choose whether to book a free call.',
  ],
];

const included = [
  '8 calm, guided modules',
  'Four weeks of teaching over six weeks',
  'A mid-course reflection week',
  'A final integration and review week',
  'Short video lessons',
  'Audio reflections for quiet reflection',
  'A 5-Minute Peace Practice to carry through the programme',
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
  'You are looking for someone else to make the choice for you',
  'You need therapy, clinical treatment or urgent support',
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

function ContactCaptureForm({
  formId,
  buttonText,
  interestType,
  message,
  successHeading,
  successBody,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    _honey: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData._honey) return;
    if (sending) return;

    setSending(true);

    try {
      await sendContactEmail(
        createEmailTemplateData({
          fromName: formData.name,
          fromEmail: formData.email,
          message,
          interestType,
          sourcePage: 'The Worry Reset Programme page',
        })
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', _honey: '' });
    } catch (submitError) {
      console.error('EmailJS error:', submitError);
      setError(
        'Something went wrong. Please check your details and try again.'
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.formSuccess} role="status">
        <p>{successHeading}</p>
        <span>{successBody}</span>
      </div>
    );
  }

  return (
    <form className={styles.worksheetForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
        value={formData._honey}
        onChange={(event) =>
          setFormData({ ...formData, _honey: event.target.value })
        }
      />

      <div className={styles.fieldGroup}>
        <label htmlFor={`${formId}-name`}>First name</label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="given-name"
          required
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor={`${formId}-email`}>Email address</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </div>

      <button type="submit" disabled={sending}>
        {sending ? 'Sending...' : buttonText}
      </button>
      {error && <p className={styles.formError}>{error}</p>}
    </form>
  );
}

function WorryResetProgramme() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <SEO
        title="The Worry Reset Programme | Find Your Door"
        description="A calm six-week programme from Find Your Door for men who feel stuck in worry, overthinking, avoidance, procrastination or loss of confidence. Start with the free 10-Minute Worry Reset Worksheet."
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
                A calm six-week programme designed to give you space to learn,
                pause, practise and reflect.
              </p>
              <p className={styles.heroBody}>
                This is not about pretending everything is positive. It is about
                slowing down, telling yourself the truth and choosing one
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
                alt="Cover of The 10-Minute Worry Reset Worksheet"
                width="1055"
                height="1491"
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
              <p className={styles.eyebrow}>If this feels familiar</p>
              <h2>When worry starts shaping your life</h2>
              <p>
                Worry does not always look like panic. Sometimes it looks like
                delay, silence, irritability, checking out or avoiding the
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
                You are never without choice — even when it feels that way
              </h2>
              <p>
                Worry can make life feel narrow. It can convince you there are
                no options, no way forward and no door to open.
              </p>
              <p>
                But the first choice is not always a big dramatic life change.
                Sometimes it is pausing, breathing, telling yourself the truth
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
                It is about helping you pause, tell yourself the truth and find
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
            <div className={styles.videoAction}>
              <p>
                Watch the short message, then start with the free worksheet.
              </p>
              <ButtonLink href="#worksheet">
                Download the Free Worksheet
              </ButtonLink>
            </div>
          </div>
        </section>

        <section id="programme" className={styles.programmeSection}>
          <div className="container section-pad">
            <div className={styles.programmeIntro}>
              <p className={styles.eyebrow}>The programme</p>
              <h2>A simple six-week rhythm</h2>
              <p>
                The Worry Reset Programme is a calm six-week journey. You
                receive the first four modules over two weeks, then take a
                reflection week to catch up and practise. The final four modules
                are released over the following two weeks, followed by a final
                reflection week where you review your journey, share feedback
                and have the option to book a free call.
              </p>
              <p>
                The pause weeks are part of the work. They give you time to
                catch up, reflect, practise and let the changes settle.
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
                  alt="Cover of The 10-Minute Worry Reset Worksheet"
                  loading="lazy"
                  width="1055"
                  height="1491"
                />
              </figure>

              <div className={styles.worksheetContent}>
                <p className={styles.eyebrow}>Free worksheet</p>
                <h2>Not ready for the full programme yet? Start here.</h2>
                <p>
                  The 10-Minute Worry Reset Worksheet helps you get out of your
                  head, calm the noise and find one honest next step.
                </p>
                <p>
                  If it helps, the full programme gives you the deeper six-week
                  path.
                </p>
                <ContactCaptureForm
                  formId="worksheet-request"
                  buttonText="Request the Free Worksheet"
                  interestType="Worry Reset Worksheet request"
                  message="I would like to receive the 10-Minute Worry Reset Worksheet."
                  successHeading="Thank you. Your worksheet request has been received."
                  successBody="I will make sure you get access as soon as the worksheet delivery is ready."
                />
                <p className={styles.quietLine}>
                  No pressure. No overwhelm. Just ten quiet minutes with
                  yourself.
                </p>
                <p className={styles.quietLine}>
                  This programme is designed to be lived, not binged.
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
                <h2>A man looking to support other men</h2>
                <p>
                  I am Terry Loughran, Life & Mindset Coach for Men and founder
                  of Find Your Door. I support men in their 30s and 40s who feel
                  stuck, have lost confidence or are carrying more than they
                  let on.
                </p>
                <p>
                  This programme was created to give men a calm, practical way
                  to face worry, understand the pattern and take one honest step
                  towards the next door.
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
                  <h3>This may not be the right fit if:</h3>
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
              <ButtonLink href="#worksheet">
                Download the Free Worksheet
              </ButtonLink>
            </div>
            <div className={styles.enquiryPanel}>
              <h3>Ask About The Worry Reset Programme</h3>
              <p>
                Leave your details and I will come back to you personally about
                the programme.
              </p>
              <ContactCaptureForm
                formId="programme-enquiry"
                buttonText="Ask About The Worry Reset Programme"
                interestType="Worry Reset Programme enquiry"
                message="I would like to know more about The Worry Reset Programme."
                successHeading="Thank you. Your enquiry has been received."
                successBody="I will reply personally as soon as I can."
              />
            </div>
          </div>
        </section>

        <section className={styles.disclaimerSection}>
          <div className="container">
            <aside
              className={styles.disclaimer}
              aria-label="Important programme note"
            >
              <h3>Important note</h3>
              <p>
                The Worry Reset Programme and 10-Minute Worry Reset Worksheet
                are for reflection, education and personal development. They
                are not therapy, medical advice or a replacement for
                professional mental health support. If anxiety feels severe,
                persistent, unmanageable or you feel at risk of harming
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
