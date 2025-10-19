/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_DEV: string
  // add more env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
