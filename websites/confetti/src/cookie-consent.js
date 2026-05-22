const CONSENT_KEY = 'tsparticles-confetti/cookie-consent-v1';
const GA_MEASUREMENT_ID = 'G-80MY3TZM79';
const ADSENSE_CLIENT_ID = 'ca-pub-1784552607103901';
const ADSENSE_NON_PERSONALIZED_ON_REJECT = true;
const ANALYTICS_COOKIELESS_ON_REJECT = true;

const defaultConsent = {
  analytics: false,
  adsense: false,
};

let consent = readConsent();
let adsenseInitialized = false;
let analyticsInitialized = false;

function readConsent() {
  try {
    const rawConsent = localStorage.getItem(CONSENT_KEY);

    if (!rawConsent) {
      return undefined;
    }

    const parsed = JSON.parse(rawConsent);

    if (typeof parsed !== 'object' || !parsed) {
      return undefined;
    }

    return {
      analytics: !!parsed.analytics,
      adsense: !!parsed.adsense,
    };
  } catch (err) {
    console.warn('Cannot read cookie consent preferences.', err);

    return undefined;
  }
}

function writeConsent(nextConsent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(nextConsent));
}

function hasUserChoice() {
  return !!consent;
}

function loadScript(id, src, attributes) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');

  script.id = id;
  script.src = src;
  script.async = true;

  Object.entries(attributes || {}).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
}

function initAnalytics() {
  if (analyticsInitialized) {
    return;
  }

  loadScript(
    'google-analytics',
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  );

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  const analyticsGranted = consent?.analytics;
  const adsGranted = consent?.adsense;

  // Consent Mode v2 default
  window.gtag('consent', 'default', {
    ad_storage: adsGranted ? 'granted' : 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_user_data: adsGranted ? 'granted' : 'denied',
    ad_personalization: adsGranted ? 'granted' : 'denied',
  });

  window.gtag('js', new Date());

  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });

  analyticsInitialized = true;
}

function initAdSense() {
  if (adsenseInitialized) {
    return;
  }

  window.adsbygoogle = window.adsbygoogle || [];

  // NPA mode
  window.adsbygoogle.requestNonPersonalizedAds =
    consent?.adsense || !ADSENSE_NON_PERSONALIZED_ON_REJECT ? 0 : 1;

  loadScript(
    'adsense-script',
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`,
    {
      crossorigin: 'anonymous',
    }
  );

  adsenseInitialized = true;
}

function updateConsentMode(activeConsent) {
  if (!window.gtag) {
    return;
  }

  window.gtag('consent', 'update', {
    ad_storage: activeConsent.adsense ? 'granted' : 'denied',
    analytics_storage: activeConsent.analytics ? 'granted' : 'denied',
    ad_user_data: activeConsent.adsense ? 'granted' : 'denied',
    ad_personalization: activeConsent.adsense ? 'granted' : 'denied',
  });
}

function applyConsent(activeConsent) {
  if (activeConsent.analytics || ANALYTICS_COOKIELESS_ON_REJECT) {
    initAnalytics();
  }

  updateConsentMode(activeConsent);

  if (activeConsent.adsense || ADSENSE_NON_PERSONALIZED_ON_REJECT) {
    initAdSense();
  }
}

function closeBanner() {
  const banner = document.getElementById('cookieConsentBanner');

  if (banner) {
    banner.remove();
  }
}

function saveAndApply(nextConsent) {
  consent = nextConsent;

  try {
    writeConsent(nextConsent);
  } catch (err) {
    console.warn('Cannot persist cookie consent preferences.', err);
  }

  window.tsParticlesConfettiConsent.get = () => consent || defaultConsent;

  applyConsent(nextConsent);

  closeBanner();
}

function createBanner() {
  if (document.getElementById('cookieConsentBanner')) {
    return;
  }

  const banner = document.createElement('div');
  const consentState = consent || defaultConsent;

  banner.id = 'cookieConsentBanner';
  banner.className = 'cookie-consent-banner';

  banner.innerHTML = `
    <div class="cookie-consent-content">
      <p class="cookie-consent-title">Privacy settings</p>
      <p class="cookie-consent-text">
        Choose how this site can use analytics and advertising technologies.
        If analytics cookies are disabled, anonymous cookieless measurement remains enabled.
        Read the
        <a
          class="cookie-consent-link"
          href="/cookie-policy.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          cookie policy
        </a>.
      </p>
      <label class="cookie-consent-option">
        <input
          id="cookieConsentAnalytics"
          type="checkbox"
          ${consentState.analytics ? 'checked' : ''}
        />
        <span>Analytics cookies</span>
      </label>
      <label class="cookie-consent-option">
        <input
          id="cookieConsentAdsense"
          type="checkbox"
          ${consentState.adsense ? 'checked' : ''}
        />
        <span>Google AdSense</span>
      </label>
      <div class="cookie-consent-actions">
        <button id="cookieConsentReject" type="button">
          Reject all
        </button>
        <button id="cookieConsentSave" type="button">
          Save choices
        </button>
        <button
          id="cookieConsentAccept"
          type="button"
          class="cookie-consent-primary"
        >
          Accept all
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('cookieConsentReject').addEventListener('click', () => {
    saveAndApply({
      analytics: false,
      adsense: false,
    });
  });

  document.getElementById('cookieConsentAccept').addEventListener('click', () => {
    saveAndApply({
      analytics: true,
      adsense: true,
    });
  });

  document.getElementById('cookieConsentSave').addEventListener('click', () => {
    saveAndApply({
      analytics: document.getElementById('cookieConsentAnalytics').checked,
      adsense: document.getElementById('cookieConsentAdsense').checked,
    });
  });
}

window.tsParticlesConfettiConsent = {
  get() {
    return consent || defaultConsent;
  },

  allowsCookielessAnalytics: ANALYTICS_COOKIELESS_ON_REJECT,
};

document.addEventListener('DOMContentLoaded', () => {
  if (hasUserChoice()) {
    applyConsent(consent);
  } else {
    applyConsent(defaultConsent);

    createBanner();
  }

  const preferencesButton = document.getElementById('cookiePreferencesButton');

  if (preferencesButton) {
    preferencesButton.addEventListener('click', () => {
      createBanner();
    });
  }
});
