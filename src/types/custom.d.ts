// webpack.d.ts
declare function require<T = any>(path: string): T;

declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp,
      mode?: 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'
    ): WebpackRequireContext;
  }
}

interface WebpackRequireContext {
  keys(): string[];
  <T = unknown>(id: string): T;
}
