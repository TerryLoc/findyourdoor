import { motion } from 'framer-motion';
import { HERO } from '@/constants/content';
import styles from './Hero.module.css';

const item = (delay) => ({
  initial: { y: 22, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay },
});

function Hero() {
  const scrollToSection = (event, selector) => {
    event.preventDefault();
    const target = document.querySelector(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.content}>
          <div className={styles.accent} aria-hidden="true" />
          <motion.p className={styles.eyebrow} {...item(0.1)}>
            {HERO.eyebrow}
          </motion.p>
          <motion.h1 className={styles.headline} {...item(0.25)}>
            The choice is
            <br />
            <em>always</em> yours.
          </motion.h1>
          <motion.p className={styles.subheadline} {...item(0.4)}>
            {HERO.subheadline}
          </motion.p>
          <motion.p className={styles.body} {...item(0.55)}>
            {HERO.body}
          </motion.p>
          <motion.div className={styles.actions} {...item(0.7)}>
            <a
              className={styles.primaryCta}
              href="#book"
              aria-label="Book a free 30-minute coaching call"
              onClick={(event) => scrollToSection(event, '#book')}
            >
              {HERO.cta}
            </a>
            <a
              className={styles.secondaryCta}
              href="#about"
              aria-label="Read Terry's story"
              onClick={(event) => scrollToSection(event, '#about')}
            >
              {HERO.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </div>
      <motion.a
        className={styles.scrollHint}
        href="#about"
        aria-label="Scroll to about section"
        onClick={(event) => scrollToSection(event, '#about')}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span>⌄</span>
      </motion.a>
    </section>
  );
}

export default Hero;
