import { BOOK, SITE } from '@/constants/content';
import styles from './BookCall.module.css';

function BookCall() {
  return (
    <section id="book" className={styles.section}>
      <div className="container section-pad">
        <div className={styles.content}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.line} aria-hidden="true" />
            <p className={styles.eyebrow}>{BOOK.eyebrow}</p>
            <span className={styles.line} aria-hidden="true" />
          </div>
          <h2 className={styles.headline}>{BOOK.headline}</h2>
          <p className={styles.body}>{BOOK.body}</p>
          <a href={SITE.calendly} className={styles.cta} target="_blank" rel="noreferrer">
            {BOOK.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export default BookCall;
