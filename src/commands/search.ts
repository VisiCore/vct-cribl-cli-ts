import { Command } from "commander";
import { getClient } from "../api/client.js";
import {
  runSearch,
  listSearchJobs,
  getSearchResults,
  listSavedSearches,
  getSearchJobStatus,
  getSearchTimeline,
  getSearchFieldSummary,
  getSearchJobLogs,
  getSearchJobMetrics,
  getSearchJobDiag,
} from "../api/endpoints/search.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function registerSearchCommand(program: Command): void {
  const search = program.command("search").description("Search operations");

  search
    .command("run")
    .description("Run a search query")
    .argument("<query>", "Search query string")
    .option("-g, --group <name>", "Worker group name")
    .option("--earliest <time>", "Earliest time", "-24h@h")
    .option("--latest <time>", "Latest time", "now")
    .option("--wait", "Wait for results (poll until complete)")
    .option("--poll-interval <ms>", "Poll interval in ms", "2000")
    .option("--table", "Table output")
    .action(async (query: string, opts) => {
      try {
        const client = getClient();
        const job = await runSearch(client, {
          query,
          earliest: opts.earliest,
          latest: opts.latest,
          group: opts.group,
        });

        if (!opts.wait) {
          console.log(formatOutput(job, { table: opts.table }));
          return;
        }

        // Poll until complete
        const interval = parseInt(opts.pollInterval as string, 10);
        const group = opts.group as string | undefined;
        let status = job;

        process.stderr.write(`Search job ${job.id} started. Polling...\n`);

        while (status.status !== "completed" && status.status !== "failed") {
          await sleep(interval);
          status = await getSearchJobStatus(client, job.id, group);
          process.stderr.write(`  Status: ${status.status}\n`);
        }

        if (status.status === "failed") {
          console.error(formatOutput({ error: "Search job failed", job: status }));
          process.exit(1);
        }

        const results = await getSearchResults(client, job.id, group);
        console.log(formatOutput(results, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("jobs")
    .description("List search jobs")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listSearchJobs(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("results")
    .description("Get search job results")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchResults(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("saved")
    .description("List saved searches")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listSavedSearches(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("timeline")
    .description("Get search job timeline")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchTimeline(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("field-summary")
    .description("Get search job field summary")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchFieldSummary(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("job-logs")
    .description("Get search job logs")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchJobLogs(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("job-metrics")
    .description("Get search job metrics")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchJobMetrics(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  search
    .command("job-diag")
    .description("Get search job diagnostics")
    .argument("<job-id>", "Search job ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (jobId: string, opts) => {
      try {
        const data = await getSearchJobDiag(getClient(), jobId, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
