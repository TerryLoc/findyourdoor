import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'fyd_cookie_consent_v1';
const CONSENT_VERSION = 1;
const OPEN_SETTINGS_EVENT = 'fyd:open-cookie-settings';
const CONSENT_UPDATED_EVENT = 'fyd:cookie-consent-updated';

const defaultConsent = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

function normalizeConsent(consent) {
  if (!consent || consent.version !== CONSENT_VERSION) return null;

  return {
    ...defaultConsent,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    updatedAt: consent.updatedAt || null,
  };
}

function readStoredConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? normalizeConsent(JSON.parse(stored)) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    return false;
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, {
      detail: consent,
    })
  );

  return true;
}

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomise, setShowCustomise] = useState(false);
  const [preferences, setPreferences] = useState(defaultConsent);

  useEffect(() => {
    const stored = readStoredConsent();

    if (stored) {
      setPreferences(stored);
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      const stored = readStoredConsent();
      if (stored) {
        setPreferences(stored);
      }
      setShowCustomise(true);
      setIsVisible(true);
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showCustomise) {
        setShowCustomise(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, showCustomise]);

  if (!isVisible) return null;

  const applyAndClose = (nextConsent) => {
    const consent = {
      ...defaultConsent,
      ...nextConsent,
      version: CONSENT_VERSION,
      necessary: true,
      updatedAt: new Date().toISOString(),
    };
    saveConsent(consent);
    setPreferences(consent);
    setIsVisible(false);
    setShowCustomise(false);
  };

  return (
    <aside
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className={styles.inner}>
        <p className={styles.title} id="cookie-consent-title">
          Your privacy choices
        </p>
        <p className={styles.body} id="cookie-consent-description">
          We use essential storage to keep this site secure and remember your choices. Optional analytics
          and marketing tools stay off unless you choose them. Read our{' '}
          <Link to="/cookie-policy">Cookie Policy</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>

        {showCustomise && (
          <div className={styles.options}>
            <label>
              <input type="checkbox" checked disabled />
              <span>Strictly necessary cookies (always on)</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, analytics: event.target.checked }))
                }
              />
              <span>Analytics cookies</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, marketing: event.target.checked }))
                }
              />
              <span>Marketing cookies</span>
            </label>
          </div>
        )}

        <div className={styles.actions}>
          <button type="button" onClick={() => applyAndClose({ ...preferences, analytics: false, marketing: false })}>
            Reject optional
          </button>
          <button type="button" onClick={() => setShowCustomise((prev) => !prev)}>
            {showCustomise ? 'Hide options' : 'Customise'}
          </button>
          {showCustomise ? (
            <button type="button" className={styles.primary} onClick={() => applyAndClose(preferences)}>
              Save choices
            </button>
          ) : (
            <button
              type="button"
              className={styles.primary}
              onClick={() => applyAndClose({ ...preferences, analytics: true, marketing: true })}
            >
              Accept all
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default CookieConsent;
