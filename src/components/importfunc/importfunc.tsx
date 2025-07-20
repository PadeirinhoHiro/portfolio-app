// Define a interface para o retorno de require.context
export interface WebpackRequireContext {
  keys(): string[];
  <T = unknown>(id: string): T;
}

/**
 * Importa os arquivos indexados por nome
 */
export function importIndexAll<T = unknown>(
  r: WebpackRequireContext
): Record<string, T> {
  const images: Record<string, T> = {};
  r.keys().forEach((item: string) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

/**
 * Importa todos os arquivos como array
 */
export function importAll<T = unknown>(r: WebpackRequireContext): T[] {
  return r.keys().map((key) => r<T>(key));
}
