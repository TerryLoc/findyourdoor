import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FOR_YOU_ITEMS } from '@/constants/content';
import styles from './ForYou.module.css';

function ForYou() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="for-you" className={styles.section} ref={ref}>
      <div className="container section-pad">
        <p className={styles.eyebrow}>Does this sound like you?</p>
        <h2 className={styles.headline}>You already know something needs to change.</h2>
        <div className={styles.grid}>
          {FOR_YOU_ITEMS.map((item, idx) => (
            <motion.article
              key={item.text}
              className={styles.card}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              {item.text}
            </motion.article>
          ))}
        </div>
        <p className={styles.closing}>If you're still reading, this is probably for you.</p>
      </div>
    </section>
  );
}

export default ForYou;
