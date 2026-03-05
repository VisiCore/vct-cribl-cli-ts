import Table from "cli-table3";

export interface FormatOptions {
  table?: boolean;
  columns?: string[];
}

export function formatOutput(data: unknown, opts: FormatOptions = {}): string {
  if (!opts.table) {
    return JSON.stringify(data, null, 2);
  }

  if (Array.isArray(data)) {
    return formatTable(data, opts.columns);
  }

  // Single object — show as key/value pairs
  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data as Record<string, unknown>);
    const table = new Table({ head: ["Key", "Value"] });
    for (const [k, v] of entries) {
      table.push([k, typeof v === "object" ? JSON.stringify(v) : String(v ?? "")]);
    }
    return table.toString();
  }

  return String(data);
}

function formatTable(items: Record<string, unknown>[], columns?: string[]): string {
  if (items.length === 0) return "(no results)";

  const cols = columns ?? Object.keys(items[0]).filter((k) => {
    // Exclude deeply nested objects from default table view
    const val = items[0][k];
    return val === null || val === undefined || typeof val !== "object";
  });

  if (cols.length === 0) {
    // Fallback: show all keys
    const allKeys = Object.keys(items[0]);
    const table = new Table({ head: allKeys });
    for (const item of items) {
      table.push(allKeys.map((k) => truncate(String(item[k] ?? ""), 60)));
    }
    return table.toString();
  }

  const table = new Table({ head: cols });
  for (const item of items) {
    table.push(cols.map((c) => truncate(formatValue(item[c]), 60)));
  }
  return table.toString();
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
