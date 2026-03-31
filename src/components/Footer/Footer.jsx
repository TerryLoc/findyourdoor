import { NAV_LINKS, SITE } from '@/constants/content';
import { Link, useLocation } from 'react-router-dom';
import primaryLogo from '@/assets/images/primary_logo.png';
import styles from './Footer.module.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={primaryLogo} alt="Find Your Door logo" className={styles.brandLogo} />
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
            
          </div>
        </div>

        <div className={styles.legalLinks}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event('fyd:open-cookie-settings'))}>
            Cookie settings
          </button>
        </div>

        <p className={styles.copy}>© {new Date().getFullYear()} Terry Loughran · All rights reserved</p>
        <p className={styles.bottom}>Life coach for men in Ireland · Wicklow, Ireland</p>
      </div>
    </footer>
  );
}

export default Footer;
