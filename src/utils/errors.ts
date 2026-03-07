import { AxiosError } from "axios";

export class CriblApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "CriblApiError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class DryRunAbort extends Error {
  constructor(message = "Dry run complete") {
    super(message);
    this.name = "DryRunAbort";
  }
}

export function handleError(err: unknown): never {
  if (err instanceof DryRunAbort) {
    process.exit(0);
  }

  if (err instanceof CriblApiError) {
    process.stderr.write(
      JSON.stringify({ error: err.message, statusCode: err.statusCode, details: err.body }, null, 2) + "\n"
    );
    process.exit(1);
  }

  if (err instanceof AuthenticationError) {
    process.stderr.write(
      JSON.stringify({ error: err.message, type: "AuthenticationError" }, null, 2) + "\n"
    );
    process.exit(1);
  }

  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 0;
    const data = err.response?.data;
    const message = typeof data === "object" && data?.message
      ? (data as { message: string }).message
      : err.message;

    process.stderr.write(
      JSON.stringify({ error: message, statusCode: status }, null, 2) + "\n"
    );
    process.exit(1);
  }

  if (err instanceof Error) {
    process.stderr.write(
      JSON.stringify({ error: err.message }, null, 2) + "\n"
    );
    process.exit(1);
  }

  process.stderr.write(JSON.stringify({ error: String(err) }, null, 2) + "\n");
  process.exit(1);
}
