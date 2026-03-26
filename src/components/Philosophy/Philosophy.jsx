import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PHILOSOPHY } from '@/constants/content';
import styles from './Philosophy.module.css';

function Philosophy() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="philosophy" className={styles.section} ref={ref}>
      <div className="container section-pad">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.decorativeQuote} aria-hidden="true">
            “
          </span>
          <p className={styles.eyebrow}>{PHILOSOPHY.eyebrow}</p>
          <h2 className={styles.headline}>{PHILOSOPHY.headline}</h2>
          <p className={styles.author}>{PHILOSOPHY.author}</p>
          <p className={styles.body}>{PHILOSOPHY.body}</p>
          <blockquote className={styles.quote}>{PHILOSOPHY.quote}</blockquote>
        </motion.div>
      </div>
    </section>
  );
}

export default Philosophy;
