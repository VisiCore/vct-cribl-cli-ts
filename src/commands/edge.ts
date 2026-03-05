import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listContainers, listProcesses, getEdgeLogs, getEdgeMetadata, getEdgeEvents, getEdgeFile, listEdgeFiles, getEdgeKubeLogs } from "../api/endpoints/edge.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerEdgeCommand(program: Command): void {
  const cmd = program.command("edge").description("Cribl Edge fleet management");

  cmd
    .command("containers")
    .description("List containers on edge nodes")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listContainers(getClient(), opts.fleet);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("processes")
    .description("List processes on edge nodes")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listProcesses(getClient(), opts.fleet);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("logs")
    .description("Get edge node logs")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .action(async (opts) => {
      try {
        const data = await getEdgeLogs(getClient(), opts.fleet);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("metadata")
    .description("Get edge node metadata")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getEdgeMetadata(getClient(), opts.fleet);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("events")
    .description("Get edge events")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getEdgeEvents(getClient(), opts.fleet);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("files")
    .description("Browse edge files")
    .argument("<path>", "File path")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (filePath: string, opts) => {
      try {
        const data = await getEdgeFile(getClient(), opts.fleet, filePath);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("ls")
    .description("List edge directory contents")
    .argument("<path>", "Directory path")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (dirPath: string, opts) => {
      try {
        const data = await listEdgeFiles(getClient(), opts.fleet, dirPath);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("kube-logs")
    .description("Get Kubernetes logs")
    .requiredOption("-f, --fleet <name>", "Fleet/group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getEdgeKubeLogs(getClient(), opts.fleet);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
