import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SITE_URL = 'https://findyourdoor.ie';
const SITE_NAME = 'Find Your Door';
const DEFAULT_IMAGE_PATH = '/og-image.jpg';
const DEFAULT_IMAGE_ALT =
  'Find Your Door - Life and Mindset Coaching for Men with Terry Loughran';
const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, follow';

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';

  const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return cleanPathname.split('#')[0].split('?')[0];
}

function absoluteUrl(path) {
  if (!path) return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(path)) return path;

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

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

function upsertLink(rel, href, attributes = {}) {
  const hreflang = attributes.hreflang;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let link = document.head.querySelector(selector);

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);

  Object.entries(attributes).forEach(([name, value]) => {
    if (value) {
      link.setAttribute(name, value);
    }
  });
}

function upsertJsonLd(id, data) {
  let script = document.head.querySelector(`script[data-seo-id="${id}"]`);

  if (!data) {
    script?.remove();
    return;
  }

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
  imagePath = DEFAULT_IMAGE_PATH,
  imageAlt = DEFAULT_IMAGE_ALT,
  type = 'website',
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    const normalizedPathname = normalizePathname(pathname);
    const pageUrl = absoluteUrl(normalizedPathname);
    const imageUrl = absoluteUrl(imagePath);

    document.title = title;
    upsertLink('canonical', pageUrl);
    upsertLink('alternate', pageUrl, { hreflang: 'en-IE' });
    upsertLink('alternate', pageUrl, { hreflang: 'x-default' });

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? NOINDEX_ROBOTS : INDEX_ROBOTS);

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_IE');
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:secure_url', imageUrl);
    upsertMeta('property', 'og:image:type', 'image/jpeg');
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', imageAlt);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', imageAlt);

    upsertJsonLd('page-schema', structuredData);
  }, [description, imageAlt, imagePath, noIndex, pathname, structuredData, title, type]);

  return null;
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  imagePath: PropTypes.string,
  imageAlt: PropTypes.string,
  type: PropTypes.string,
  noIndex: PropTypes.bool,
  structuredData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};

export default SEO;
