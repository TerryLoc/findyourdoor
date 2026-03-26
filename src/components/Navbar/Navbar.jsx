import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/content';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className={styles.navInner}>
          <a
            href={location.pathname === '/' ? '#hero' : '/#hero'}
            className={styles.brand}
            aria-label="Find Your Door home"
          >
            FYD
          </a>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={location.pathname === '/' ? link.href : `/${link.href}`}
                className={link.cta ? styles.cta : styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
