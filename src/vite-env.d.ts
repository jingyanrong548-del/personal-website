/** Vite-injected globals for Open Thermal AI. */
declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_AI_API_BASE?: string;
  readonly VITE_AI_USE_PROXY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
}

declare function gtag(...args: unknown[]): void;
