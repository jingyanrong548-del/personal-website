/** Vite-injected globals for Open Thermal AI. */
declare const __APP_VERSION__: string;

interface Window {
  gtag?: (...args: unknown[]) => void;
}

declare function gtag(...args: unknown[]): void;
