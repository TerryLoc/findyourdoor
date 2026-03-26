import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import SEO from '@/components/SEO/SEO';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.page}>
      <SEO
        title="Page Not Found | Find Your Door"
        description="The page you are looking for cannot be found. Return to Find Your Door home."
        pathname="/404"
        noIndex
      />

      <Navbar />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.panel}>
            <p className={styles.kicker}>404</p>
            <h1>The door you looked for is not here.</h1>
            <p>
              The page may have moved, the link may be out of date, or the address might be incorrect.
              You can head back home and keep moving forward.
            </p>
            <div className={styles.actions}>
              <Link to="/" className={styles.primaryCta}>
                Back to home
              </Link>
              <a href="/#book" className={styles.secondaryCta}>
                Book a call
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
