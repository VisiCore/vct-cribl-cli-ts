/**
 * Parse and validate a port number string.
 * Throws a clear error if the value is not a valid port (1–65535).
 */
export function parsePort(value: string, label = "port"): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 65535) {
    throw new Error(`Invalid ${label}: "${value}". Must be an integer between 1 and 65535.`);
  }
  return n;
}

/**
 * Parse a JSON string with a user-friendly error message.
 * Wraps JSON.parse to replace cryptic "Unexpected token" errors.
 */
export function parseJSON(value: string, label = "config"): Record<string, unknown> {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(
      `Invalid JSON for ${label}: ${value.length > 80 ? value.slice(0, 80) + "..." : value}\n` +
      `Hint: ensure the value is valid JSON (check for trailing commas, missing quotes, or unescaped characters).`
    );
  }
}
