import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import ForYou from '@/components/ForYou/ForYou';
import Philosophy from '@/components/Philosophy/Philosophy';
import Offer from '@/components/Offer/Offer';
import Testimonials from '@/components/Testimonials/Testimonials';
import BookCall from '@/components/BookCall/BookCall';
import Contact from '@/components/Contact/Contact';
import SEO from '@/components/SEO/SEO';
import styles from './Home.module.css';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Find Your Door',
  url: 'https://findyourdoor.ie',
  image: 'https://findyourdoor.ie/og-image.jpg',
  description:
    'Life and mindset coaching for men who feel stuck, flat, or disconnected from themselves.',
  areaServed: 'Ireland',
  founder: {
    '@type': 'Person',
    name: 'Terry Loughran',
  },
};

function Home() {
  return (
    <div className={styles.pageWrap}>
      <SEO
        title="Find Your Door | Life & Mindset Coaching for Men"
        description="Life & mindset coaching for men with Terry Loughran. Honest, practical support to regain clarity, confidence, and direction."
        pathname="/"
        structuredData={homeSchema}
      />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <ForYou />
        <Philosophy />
        <Offer />
        <Testimonials />
        <BookCall />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
