import { trackingConfig } from "./config";
import type { CookieConsentPreferences } from "./consent";

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: 0 | 1 };
};

const GA_SCRIPT_ID = "tsparticles-ga-loader";
const ADSENSE_SCRIPT_ID = "tsparticles-adsense-loader";

let gaInitialized = false;
let adSenseInitialized = false;
let consentApplied: CookieConsentPreferences | undefined;
let consentDefaultsInitialized = false;

function getTrackingWindow(): TrackingWindow | undefined {
  if (typeof globalThis.window === "undefined") {
    return undefined;
  }

  return globalThis.window as TrackingWindow;
}

function ensureGtagStub(): TrackingWindow | undefined {
  const trackingWindow = getTrackingWindow();

  if (!trackingWindow) {
    return undefined;
  }

  trackingWindow.dataLayer ??= [];

  if (!trackingWindow.gtag) {
    trackingWindow.gtag = (...args: unknown[]) => {
      trackingWindow.dataLayer?.push(args);
    };
  }

  return trackingWindow;
}

function initConsentModeDefaults(): void {
  if (consentDefaultsInitialized) {
    return;
  }

  const trackingWindow = ensureGtagStub();

  if (!trackingWindow?.gtag) {
    return;
  }

  trackingWindow.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  consentDefaultsInitialized = true;
}

function loadScriptOnce(id: string, src: string): void {
  const trackingWindow = getTrackingWindow();

  if (!trackingWindow || trackingWindow.document.getElementById(id)) {
    return;
  }

  const scriptElement = trackingWindow.document.createElement("script");

  scriptElement.id = id;
  scriptElement.async = true;
  scriptElement.src = src;
  trackingWindow.document.head.append(scriptElement);
}

function initGoogleAnalytics(): void {
  if (!trackingConfig.isAnalyticsEnabled || gaInitialized) {
    return;
  }

  const trackingWindow = ensureGtagStub();

  if (!trackingWindow) {
    return;
  }

  loadScriptOnce(GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${trackingConfig.gaMeasurementId}`);
  trackingWindow.gtag?.("js", new Date());
  trackingWindow.gtag?.("config", trackingConfig.gaMeasurementId, {
    send_page_view: false,
  });

  gaInitialized = true;
}

function initGoogleAdSense(): void {
  if (!trackingConfig.isAdSenseEnabled || adSenseInitialized) {
    return;
  }

  // Load the AdSense script with the client ID in the URL.
  // Auto-ads are configured via the AdSense dashboard; the script enables them
  // automatically when loaded with ?client=ca-pub-XXXXX — no manual push needed.
  loadScriptOnce(
    ADSENSE_SCRIPT_ID,
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${trackingConfig.googleAdSenseClientId}`,
  );

  const trackingWindow = getTrackingWindow();

  if (!trackingWindow) {
    return;
  }

  trackingWindow.adsbygoogle ??= [];

  adSenseInitialized = true;
}

function updateAdSensePersonalization(preferences: CookieConsentPreferences): void {
  if (!trackingConfig.isAdSenseEnabled) {
    return;
  }

  const trackingWindow = getTrackingWindow();

  if (!trackingWindow) {
    return;
  }

  trackingWindow.adsbygoogle ??= [];
  trackingWindow.adsbygoogle.requestNonPersonalizedAds =
    !preferences.adsense && trackingConfig.adSenseNonPersonalizedOnReject ? 1 : 0;
}

function updateConsentMode(preferences: CookieConsentPreferences): void {
  if (!trackingConfig.isAnalyticsEnabled && !trackingConfig.isAdSenseEnabled) {
    return;
  }

  initConsentModeDefaults();

  const trackingWindow = ensureGtagStub();

  if (!trackingWindow?.gtag) {
    return;
  }

  trackingWindow.gtag("consent", "update", {
    ad_storage: preferences.adsense ? "granted" : "denied",
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_user_data: preferences.adsense ? "granted" : "denied",
    ad_personalization: preferences.adsense ? "granted" : "denied",
  });
}

function sameConsent(a: CookieConsentPreferences, b: CookieConsentPreferences): boolean {
  return a.analytics === b.analytics && a.adsense === b.adsense;
}

function canTrackAnalytics(): boolean {
  if (!trackingConfig.isAnalyticsEnabled || !consentApplied) {
    return false;
  }

  return consentApplied.analytics || trackingConfig.analyticsCookielessOnReject;
}

export function applyConsent(preferences: CookieConsentPreferences): void {
  if (consentApplied && sameConsent(consentApplied, preferences)) {
    return;
  }

  updateConsentMode(preferences);
  updateAdSensePersonalization(preferences);

  initGoogleAnalytics();

  if (preferences.adsense || trackingConfig.adSenseNonPersonalizedOnReject) {
    initGoogleAdSense();
  }

  consentApplied = preferences;
}

export function trackPageView(path: string): void {
  if (!canTrackAnalytics()) {
    return;
  }

  const trackingWindow = getTrackingWindow();

  trackingWindow?.gtag?.("event", "page_view", {
    page_location: trackingWindow.location.href,
    page_path: path,
    page_title: trackingWindow.document.title,
  });
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!canTrackAnalytics()) {
    return;
  }

  const trackingWindow = getTrackingWindow();

  trackingWindow?.gtag?.("event", eventName, params ?? {});
}
