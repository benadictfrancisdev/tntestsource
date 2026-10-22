export type FormAnalyticsEvent =
  | 'form_start'
  | 'form_step_complete'
  | 'form_submit_success'
  | 'form_submit_error';

export function trackFormEvent(event: FormAnalyticsEvent, payload?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Custom event dispatch for analytics listeners
  try {
    const customEvent = new CustomEvent('connecthf_form_analytics', {
      detail: { event, ...payload, timestamp: new Date().toISOString() }
    });
    window.dispatchEvent(customEvent);

    // Push to Google Analytics dataLayer if available
    if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({ event, ...payload });
    }
  } catch (err) {
    console.debug('Analytics dispatch notice', err);
  }
}
