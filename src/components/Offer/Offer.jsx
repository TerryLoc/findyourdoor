import { OFFER } from '@/constants/content';
import styles from './Offer.module.css';

function Offer() {
  const handleBookClick = (event) => {
    event.preventDefault();
    const target = document.querySelector('#book');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="offer" className={styles.section}>
      <div className="container section-pad">
        <p className={styles.eyebrow}>{OFFER.eyebrow}</p>
        <h2 className={styles.headline}>{OFFER.headline}</h2>
        <p className={styles.subheadline}>{OFFER.subheadline}</p>

        <div className={styles.card}>
          <span className={styles.badge}>Applications open</span>
          <h3 className={styles.listTitle}>What is included</h3>
          <ul className={styles.list}>
            {OFFER.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.outcome}>{OFFER.outcome}</div>

          <div className={styles.priceWrap}>
            <p className={styles.price}>{OFFER.price}</p>
            <p className={styles.priceSub}>{OFFER.priceSub}</p>
          </div>

          <a href="#book" className={styles.cta} onClick={handleBookClick}>
            {OFFER.cta}
          </a>
          <p className={styles.note}>{OFFER.note}</p>
        </div>
      </div>
    </section>
  );
}

export default Offer;
