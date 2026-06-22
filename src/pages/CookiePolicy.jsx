import { Link } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import { usePageTitle } from '@/hooks/usePageTitle';
import styles from './LegalPage.module.css';

const updatedAt = '19 June 2026';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://findyourdoor.ie/cookie-policy#webpage',
      name: 'Cookie Policy - Find Your Door',
      url: 'https://findyourdoor.ie/cookie-policy',
      isPartOf: {
        '@id': 'https://findyourdoor.ie/#website',
      },
      inLanguage: 'en-IE',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://findyourdoor.ie/cookie-policy#breadcrumb',
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
          name: 'Cookie Policy',
          item: 'https://findyourdoor.ie/cookie-policy',
        },
      ],
    },
  ],
};

function CookiePolicy() {
  usePageTitle('Cookie Policy');

  return (
    <div className={styles.page}>
      <SEO
        title="Cookie Policy | Find Your Door"
        description="Cookie categories, purpose and your consent choices on Find Your Door."
        pathname="/cookie-policy"
        type="article"
        structuredData={schema}
      />

      <main id="main-content" role="main" className={styles.main}>
        <div className="container">
          <header className={styles.heading}>
            <p className={styles.kicker}>Legal</p>
            <h1>Cookie Policy</h1>
            <p className={styles.updated}>Last updated: {updatedAt}</p>
          </header>

          <article className={styles.content}>
            <section>
              <h2>What are cookies</h2>
              <p>
                Cookies and similar browser storage are small pieces of information stored on your device
                when you visit a website. They help websites function correctly, remember choices and can
                support analytics or marketing only when consent is given.
              </p>
            </section>

            <section>
              <h2>Cookies we use</h2>
              <ul>
                <li>
                  Strictly necessary storage: required for core site functionality, security and your cookie
                  preference settings. This includes remembering your cookie choices.
                </li>
                <li>
                  Analytics cookies: optional and off by default. If enabled, they help understand website
                  usage and improve experience.
                </li>
                <li>
                  Marketing cookies: optional and off by default. If enabled, they support relevant outreach
                  campaigns.
                </li>
              </ul>
            </section>

            <section>
              <h2>How consent works</h2>
              <p>
                On your first visit, you can accept all cookies, reject optional cookies or customise preferences.
                You can reopen cookie settings at any time from the website footer.
              </p>
              <p>
                Your preference is stored in your browser under the key <code>fyd_cookie_consent_v1</code>.
                If you clear browser storage, you may be asked to choose again.
              </p>
            </section>

            <section>
              <h2>Managing cookies in your browser</h2>
              <p>
                You can also block or delete cookies using your browser settings. Blocking strictly necessary
                cookies may affect site functionality.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For questions about cookie use or privacy rights, contact us via the details in our Privacy Policy.
              </p>
            </section>
          </article>

          <Link to="/" className={styles.backLink}>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CookiePolicy;
