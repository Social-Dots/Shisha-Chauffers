// Google Analytics 4 helpers.
//
// The gtag.js snippet lives in client/index.html and creates window.dataLayer
// plus window.gtag before this module ever runs. Every function here degrades
// to a no-op when gtag is missing (ad blockers, SSR, tests), so callers never
// need to guard.

const MEASUREMENT_ID = "G-DW23YFQKHB";

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
    placement: location,
  });
}

/**
 * A visitor began filling in the booking form. Fired once per mount, on the
 * first field interaction. This is deliberately separate from booking_start:
 * that event only records the CTA that scrolls a visitor to the form, while
 * this one records real typing, so the two together expose the scroll-to-type
 * drop-off.
 */
export function trackBookingFormStart(location: string) {
  trackEvent("booking_form_start", {
    event_category: "engagement",
    event_label: location,
    placement: location,
  });
}

/** A visitor passed a form step's validation and moved on to the next one. */
export function trackBookingStepComplete(step: number, stepName: string) {
  trackEvent("booking_step_complete", {
    event_category: "engagement",
    event_label: `step_${step}_${stepName}`,
    step_number: step,
    step_name: stepName,
  });
}

/** A visitor tried to advance a step but validation blocked them. */
export function trackBookingStepError(step: number, stepName: string, missingFields: string) {
  trackEvent("booking_step_error", {
    event_category: "error",
    event_label: `step_${step}_${stepName}`,
    step_number: step,
    step_name: stepName,
    missing_fields: missingFields,
  });
}

/**
 * The visitor pressed the final submit button, before the API has answered.
 * Pairs with booking_submit (accepted) and booking_error (rejected) so the
 * number of attempts can be compared with the number of leads that actually
 * landed.
 */
export function trackBookingSubmitAttempt(params: GtagParams = {}) {
  trackEvent("booking_submit_attempt", {
    event_category: "conversion",
    ...params,
  });
}

/**
 * A booking request was accepted by the API. This is the conversion event:
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
