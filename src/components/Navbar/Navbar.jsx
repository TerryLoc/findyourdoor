import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/content';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const updateActiveSection = () => {
      const offset = 130;
      let currentSection = sectionIds[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top - offset <= 0) {
          currentSection = section.id;
        }
      });

      setActiveSection(`#${currentSection}`);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location.pathname]);

  const handleNavClick = (event, linkHref) => {
    setMenuOpen(false);

    if (location.pathname !== '/' || !linkHref.startsWith('#')) return;

    const target = document.querySelector(linkHref);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(linkHref);
  };

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
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            {NAV_LINKS.map((link) => {
              const href = location.pathname === '/' ? link.href : `/${link.href}`;
              const isActive = !link.cta && location.pathname === '/' && activeSection === link.href;

              return (
                <a
                  key={link.label}
                  href={href}
                  className={`${link.cta ? styles.cta : styles.link} ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
