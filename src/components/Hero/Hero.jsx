import { motion } from 'framer-motion';
import { HERO } from '@/constants/content';
import styles from './Hero.module.css';

const item = (delay) => ({
  initial: { y: 22, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay },
});

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
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
            <a className={styles.primaryCta} href="#book">
              {HERO.cta}
            </a>
            <a className={styles.secondaryCta} href="#about">
              {HERO.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </div>
      <a className={styles.scrollHint} href="#about" aria-label="Scroll to about section">
        <span>⌄</span>
      </a>
    </section>
  );
}

export default Hero;
