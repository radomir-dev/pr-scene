declare const __APP_VERSION__: string;
declare const __REPO_URL__: string;

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
