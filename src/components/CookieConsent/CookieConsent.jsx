import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'fyd_cookie_consent_v1';
const OPEN_SETTINGS_EVENT = 'fyd:open-cookie-settings';

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

function readStoredConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState(defaultConsent);

  const preferencesDate = useMemo(
    () => new Date().toISOString(),
    [isVisible, showCustomize, preferences.analytics, preferences.marketing]
  );

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
      setShowCustomize(true);
      setIsVisible(true);
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  if (!isVisible) return null;

  const applyAndClose = (nextConsent) => {
    const consent = { ...nextConsent, necessary: true, updatedAt: preferencesDate };
    saveConsent(consent);
    setPreferences(consent);
    setIsVisible(false);
    setShowCustomize(false);
  };

  return (
    <aside className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <div className={styles.inner}>
        <p className={styles.title}>Your privacy choices</p>
        <p className={styles.body}>
          We use essential cookies to keep this site secure and working. Optional analytics and marketing
          cookies are off by default and only used if you consent. Read our <Link to="/cookie-policy">Cookie Policy</Link>{' '}
          and <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        {showCustomize && (
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
          <button type="button" onClick={() => setShowCustomize((prev) => !prev)}>
            {showCustomize ? 'Hide options' : 'Customize'}
          </button>
          {showCustomize ? (
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
