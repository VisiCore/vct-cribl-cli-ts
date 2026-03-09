/**
 * Unwrap a Cribl API response that wraps a single item in `{ items: [...] }`.
 * Falls back to the raw data if `items` is missing or empty.
 */
export function unwrapItem<T>(data: { items?: T[] } & T): T {
  return (data.items?.[0] ?? data) as T;
}
