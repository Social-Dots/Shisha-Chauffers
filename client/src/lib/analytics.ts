// Google Analytics 4 helpers.
//
// The gtag.js snippet lives in client/index.html and creates window.dataLayer
// plus window.gtag before this module ever runs. Every function here degrades
// to a no-op when gtag is missing (ad blockers, SSR, tests), so callers never
// need to guard.

const MEASUREMENT_ID = "G-B5VRGDQKVQ";

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag(...args);
}

/**
 * Record a page view. The snippet in index.html fires the first one on load;
 * this is for client-side route changes, where no document load happens.
 */
export function trackPageView(path: string) {
  gtag("config", MEASUREMENT_ID, {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** Record an arbitrary GA4 event. */
export function trackEvent(name: string, params: GtagParams = {}) {
  gtag("event", name, params);
}

/**
 * A visitor tapped a tel: link. `location` names the placement (footer,
 * refined-hero, ...) so the same conversion can be split by where it happened.
 */
export function trackPhoneClick(location: string) {
  trackEvent("phone_click", {
    event_category: "engagement",
    event_label: location,
  });
}

/** A visitor pressed a booking call-to-action, before the form is filled in. */
export function trackBookingStart(location: string) {
  trackEvent("booking_start", {
    event_category: "engagement",
    event_label: location,
  });
}

/**
 * A booking request was accepted by the API. This is the conversion event —
 * fire it only after the request succeeds, not on form submit.
 */
export function trackBookingSubmit(params: GtagParams = {}) {
  trackEvent("booking_submit", {
    event_category: "conversion",
    ...params,
  });
}

/** A booking request was rejected. Useful for spotting a broken form. */
export function trackBookingError(message: string) {
  trackEvent("booking_error", {
    event_category: "error",
    event_label: message,
  });
}
