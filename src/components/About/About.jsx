import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import terryPhoto from '@/assets/hero.png';
import { ABOUT } from '@/constants/content';
import styles from './About.module.css';

function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container section-pad">
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <div className={styles.imageFrame}>
              <img
                src={terryPhoto}
                alt="Terry Loughran, life coach for men based in Wicklow, Ireland"
                className={styles.image}
                loading="lazy"
                width="660"
                height="880"
              />
              <div className={styles.imageBorder} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>{ABOUT.eyebrow}</p>
            <h2 className={styles.headline}>{ABOUT.headline}</h2>
            <div className={styles.paragraphs}>
              {ABOUT.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={paragraph.slice(0, 24)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <p className={styles.signature}>I'm just here to help you find your door.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
