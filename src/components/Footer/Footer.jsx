import { NAV_LINKS, SITE } from '@/constants/content';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span>FYD</span>
            <span>{SITE.domain}</span>
          </div>

          <nav className={styles.links}>
            {NAV_LINKS.filter((link) => !link.cta).map((link) => (
              <a key={link.label} href={location.pathname === '/' ? link.href : `/${link.href}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.contact}>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              in
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>

        <div className={styles.legalLinks}>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event('fyd:open-cookie-settings'))}>
            Cookie settings
          </button>
        </div>

        <p className={styles.copy}>© 2025 Terry Loughran · All rights reserved</p>
        <p className={styles.bottom}>Built with intention · Wicklow, Ireland</p>
      </div>
    </footer>
  );
}

export default Footer;
