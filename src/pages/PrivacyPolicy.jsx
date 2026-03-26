import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import SEO from '@/components/SEO/SEO';
import { SITE } from '@/constants/content';
import styles from './LegalPage.module.css';

const updatedAt = '26 March 2026';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'Privacy Policy - Find Your Door',
  url: 'https://findyourdoor.ie/privacy-policy',
  publisher: {
    '@type': 'Person',
    name: 'Terry Loughran',
  },
};

function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <SEO
        title="Privacy Policy | Find Your Door"
        description="How Find Your Door collects, uses, and protects personal data in line with GDPR."
        pathname="/privacy-policy"
        type="article"
        structuredData={schema}
      />
      <Navbar />

      <main className={styles.main}>
        <div className="container">
          <header className={styles.heading}>
            <p className={styles.kicker}>Legal</p>
            <h1>Privacy Policy</h1>
            <p className={styles.updated}>Last updated: {updatedAt}</p>
          </header>

          <article className={styles.content}>
            <section>
              <h2>Who we are</h2>
              <p>
                Find Your Door is operated by Terry Loughran in Wicklow, Ireland. If you have questions
                about this policy or your personal data, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </section>

            <section>
              <h2>What data we collect</h2>
              <ul>
                <li>Contact details you submit (such as name, email, phone).</li>
                <li>Message content you provide through forms, email, or booking requests.</li>
                <li>Basic technical data required for site security and performance.</li>
              </ul>
            </section>

            <section>
              <h2>How we use your data</h2>
              <ul>
                <li>To respond to your enquiries and provide coaching services.</li>
                <li>To schedule calls and communicate with you about your request.</li>
                <li>To maintain site security, prevent abuse, and troubleshoot issues.</li>
              </ul>
            </section>

            <section>
              <h2>Legal basis under GDPR</h2>
              <ul>
                <li>Consent: where you choose to submit information or accept optional cookies.</li>
                <li>Contractual necessity: when processing is needed to deliver requested services.</li>
                <li>Legitimate interests: for secure and reliable operation of this website.</li>
              </ul>
            </section>

            <section>
              <h2>Data sharing</h2>
              <p>
                We do not sell personal data. Data may be shared with trusted processors required to run this
                website and services (for example, hosting, booking, and communication tools), under contractual
                safeguards.
              </p>
            </section>

            <section>
              <h2>Data retention</h2>
              <p>
                We keep personal data only as long as needed for the purpose collected, legal obligations, or
                legitimate business records. When no longer required, data is deleted or anonymised.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>Under GDPR, you may request access, correction, deletion, restriction, portability, or objection.</p>
              <p>
                To exercise your rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You also have the
                right to lodge a complaint with your local data protection authority.
              </p>
            </section>

            <section>
              <h2>International transfers</h2>
              <p>
                Some service providers may process data outside the EEA. Where this happens, we rely on approved
                safeguards such as Standard Contractual Clauses.
              </p>
            </section>

            <section>
              <h2>Policy updates</h2>
              <p>
                We may update this policy from time to time. The latest version is always available on this page
                with the revision date above.
              </p>
            </section>
          </article>

          <Link to="/" className={styles.backLink}>
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
