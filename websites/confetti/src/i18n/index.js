import DOMPurify from 'dompurify';

const jsonFiles = import.meta.glob('./*.json', { eager: true, import: 'default' });

const messages = {};

Object.entries(jsonFiles).forEach(([path, mod]) => {
  const match = path.match(/([a-z]{2})\.json$/i);

  if (match) {
    messages[match[1]] = mod;
  }
});

const STORAGE_KEY = 'tsparticles-confetti/locale';

function detectLocale() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('lang');

  if (fromUrl && messages[fromUrl]) {
    return fromUrl;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored && messages[stored]) {
    return stored;
  }

  const nav = (navigator.language || 'en').toLowerCase().split('-')[0];

  return messages[nav] ? nav : 'en';
}

export const supportedLocales = Object.keys(messages);

export const currentLocale = detectLocale();

export function getLanguageName(locale) {
  return messages[locale]?.languageName ?? locale;
}

export function setLocale(locale) {
  localStorage.setItem(STORAGE_KEY, locale);

  window.location.search = `?lang=${locale}`;
}

export function t(key) {
  const dict = messages[currentLocale] || messages.en;

  const value = key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict);

  if (value != null) {
    return value;
  }

  return key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), messages.en) ?? key;
}

export function applyTranslations() {
  document.documentElement.lang = currentLocale;

  document.title = t('title');

  document.querySelectorAll('meta[data-i18n]').forEach((meta) => {
    const key = meta.getAttribute('data-i18n');

    if (key) {
      meta.setAttribute('content', t(key));
    }
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');

    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');

    if (key) {
      el.innerHTML = DOMPurify.sanitize(t(key));
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');

    if (key) {
      el.title = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');

    if (key) {
      el.setAttribute('aria-label', t(key));
    }
  });
}
