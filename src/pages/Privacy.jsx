import styles from './Privacy.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SEO from '@/components/SEO/SEO';

const privacySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://findyourdoor.ie/privacy#webpage',
      name: 'Privacy Policy - Find Your Door',
      url: 'https://findyourdoor.ie/privacy',
      isPartOf: {
        '@id': 'https://findyourdoor.ie/#website',
      },
      inLanguage: 'en-IE',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://findyourdoor.ie/privacy#breadcrumb',
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
          name: 'Privacy Policy',
          item: 'https://findyourdoor.ie/privacy',
        },
      ],
    },
  ],
};

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <SEO
        title="Privacy Policy | Find Your Door"
        description="How Find Your Door collects, uses and protects personal data in line with GDPR."
        pathname="/privacy"
        type="article"
        structuredData={privacySchema}
      />

      <main id="main-content" role="main" className={styles.privacy}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: March 2025</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Who we are</h2>
              <p>
                This website is operated by Terry Loughran trading as Find Your Door, a life and
                mindset coaching service based in Wicklow, Ireland.
              </p>
              <p>
                Website: <a href="https://findyourdoor.ie">findyourdoor.ie</a>
                <br />
                Email: <a href="mailto:findyourdoor.ie@gmail.com">findyourdoor.ie@gmail.com</a>
              </p>
            </section>

            <section className={styles.section}>
              <h2>What information we collect</h2>
              <p>We collect only the information you choose to give us. This includes:</p>
              <ul>
                <li>Your name and email address when you submit the contact form</li>
                <li>Any information you include in your message to us</li>
                <li>Your name and email address when you book a discovery call via Calendly</li>
              </ul>
              <p>
                We do not use advertising trackers. If analytics or marketing tools are added, they
                are only used where you have given consent through the cookie settings.
              </p>
            </section>

            <section className={styles.section}>
              <h2>How we use your information</h2>
              <p>We use the information you provide solely to:</p>
              <ul>
                <li>Respond to your enquiry or message</li>
                <li>Arrange and confirm discovery calls or coaching sessions</li>
                <li>Communicate with you about your coaching engagement</li>
              </ul>
              <p>
                We will never sell, rent or share your personal information with third parties for
                marketing purposes.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Third party services</h2>
              <p>This website uses the following third party services:</p>
              <ul>
                <li>
                  <strong>EmailJS</strong> — processes contact form submissions. Messages are sent
                  directly to our email and are not stored on EmailJS servers beyond transmission.
                </li>
                <li>
                  <strong>Calendly</strong> — used for booking discovery calls. When you book a
                  call, Calendly&apos;s own privacy policy applies.
                </li>
                <li>
                  <strong>Netlify</strong> — hosts this website. Standard server logs may be
                  retained.
                </li>
                <li>
                  <strong>Google Fonts</strong> — fonts are loaded from Google&apos;s servers which
                  may log your IP address. No personal data is stored.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Cookies</h2>
              <p>
                This website uses essential storage to keep the site working and remember your cookie
                choices. Optional analytics and marketing tools are off by default and only used if
                you choose them in the cookie settings. You can change your choices at any time from
                the website footer.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Your rights under GDPR</h2>
              <p>
                You have the right to access, correct or delete the personal data we hold about
                you and to object to its processing. To exercise any of these rights contact us at{' '}
                <a href="mailto:findyourdoor.ie@gmail.com">findyourdoor.ie@gmail.com</a>. We will
                respond within 30 days.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Confidentiality in coaching</h2>
              <p>
                All coaching conversations are strictly confidential. Nothing discussed in a
                coaching session will be shared with any third party without your explicit consent
                except where required by law.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated date.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Contact</h2>
              <p>
                <strong>Terry Loughran — Find Your Door</strong>
                <br />
                Wicklow, Ireland
                <br />
                <a href="mailto:findyourdoor.ie@gmail.com">findyourdoor.ie@gmail.com</a>
              </p>
            </section>

          </div>
          <div className={styles.back}>
            <Link to="/">← Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
