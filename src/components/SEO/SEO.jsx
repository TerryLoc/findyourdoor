import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SITE_URL = 'https://findyourdoor.ie';

function upsertMeta(attribute, key, content) {
  if (!content) return;

  let meta = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function upsertCanonical(pathname) {
  const href = `${SITE_URL}${pathname}`;
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  if (!data) return;

  let script = document.head.querySelector(`script[data-seo-id="${id}"]`);

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-id', id);
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

function SEO({
  title,
  description,
  pathname = '/',
  imagePath = '/og-image.jpg',
  type = 'website',
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    const imageUrl = `${SITE_URL}${imagePath}`;

    document.title = title;
    upsertCanonical(pathname);

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    upsertMeta('property', 'og:site_name', 'Find Your Door');
    upsertMeta('property', 'og:locale', 'en_IE');
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}${pathname}`);
    upsertMeta('property', 'og:image', imageUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (structuredData) {
      upsertJsonLd('page-schema', structuredData);
    }
  }, [description, imagePath, noIndex, pathname, structuredData, title, type]);

  return null;
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  imagePath: PropTypes.string,
  type: PropTypes.string,
  noIndex: PropTypes.bool,
  structuredData: PropTypes.object,
};

export default SEO;
