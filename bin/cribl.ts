#!/usr/bin/env node
import { buildProgram } from "../src/cli.js";

const program = buildProgram();
program.parseAsync(process.argv).catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
