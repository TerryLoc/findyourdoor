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
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://findyourdoor.ie/#website',
      name: 'Find Your Door',
      url: 'https://findyourdoor.ie/',
      inLanguage: 'en-IE',
      publisher: {
        '@id': 'https://findyourdoor.ie/#business',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://findyourdoor.ie/#business',
      name: 'Find Your Door',
      url: 'https://findyourdoor.ie/',
      logo: 'https://findyourdoor.ie/main_logo.png',
      image: 'https://findyourdoor.ie/og-image.jpg',
      email: 'findyourdoor.ie@gmail.com',
      description:
        'Life and mindset coaching for men who feel stuck, flat or disconnected from themselves.',
      areaServed: {
        '@type': 'Country',
        name: 'Ireland',
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Wicklow',
        addressCountry: 'IE',
      },
      founder: {
        '@id': 'https://findyourdoor.ie/#terry-loughran',
      },
      serviceType: [
        'Life coaching',
        'Mindset coaching',
        'Choice Theory coaching',
        'Worry and confidence support',
      ],
      priceRange: '€€',
    },
    {
      '@type': 'Person',
      '@id': 'https://findyourdoor.ie/#terry-loughran',
      name: 'Terry Loughran',
      jobTitle: 'Life and Mindset Coach for Men',
      url: 'https://findyourdoor.ie/',
      sameAs: ['https://www.linkedin.com/in/terryloughran/'],
      worksFor: {
        '@id': 'https://findyourdoor.ie/#business',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://findyourdoor.ie/#webpage',
      url: 'https://findyourdoor.ie/',
      name: 'Find Your Door | Life & Mindset Coaching for Men',
      description:
        'Life and mindset coaching for men with Terry Loughran. Honest, practical support to regain clarity, confidence and direction.',
      isPartOf: {
        '@id': 'https://findyourdoor.ie/#website',
      },
      about: {
        '@id': 'https://findyourdoor.ie/#business',
      },
      inLanguage: 'en-IE',
    },
  ],
};

function Home() {
  return (
    <div className={styles.pageWrap}>
      <SEO
        title="Find Your Door | Life & Mindset Coaching for Men"
        description="Life & mindset coaching for men with Terry Loughran. Honest, practical support to regain clarity, confidence and direction."
        pathname="/"
        structuredData={homeSchema}
      />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <ForYou />
        <Philosophy />
        <BookCall />
        <Testimonials />
        <Offer />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
