import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { TESTIMONIALS } from '@/constants/content';
import styles from './Testimonials.module.css';

function Testimonials() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section className={styles.section} ref={ref}>
      <div className="container section-pad">
        <p className={styles.note}>
          Placeholder testimonials below - replace with real client feedback as it comes in.
        </p>
        <div className={styles.grid}>
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.quote}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
            >
              <span className={styles.mark}>“</span>
              <p className={styles.quote}>{item.quote}</p>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.detail}>{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
