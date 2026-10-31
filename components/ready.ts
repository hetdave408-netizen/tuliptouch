/** Coordinates the intro curtain (Loader) with the page motion (motion.ts). */
export const BOOT_KEY = 'tulip-booted-v6';

let ready: Promise<void> | null = null;

/** Resolves once the intro curtain starts lifting (or instantly when no curtain plays). */
export function pageReady(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (!ready) {
    ready = new Promise<void>((resolve) => {
      if (document.documentElement.dataset.booted === '1') return resolve();
      document.documentElement.addEventListener('tulip:ready', () => resolve(), { once: true });
      setTimeout(resolve, 6000); // never hold the page hostage
    });
  }
  return ready;
}

/** Called by the Loader when the curtain starts lifting (or when it is skipped). */
export function markPageReady() {
  if (typeof document === 'undefined' || document.documentElement.dataset.booted === '1') return;
  document.documentElement.dataset.booted = '1';
  document.documentElement.dispatchEvent(new Event('tulip:ready'));
}
