# Edge Node Management

The `cribl edge` commands let you manage and inspect Cribl Edge nodes remotely through the Cribl Cloud API. Commands are split into **fleet-scoped** (operate on a fleet/group) and **node-scoped** (target a specific node by hostname or ID).

## Listing Nodes

```bash
# List all edge nodes
cribl edge nodes

# Filter by fleet
cribl edge nodes -f pi

# Table output
cribl edge nodes --table
```

## System Info

Get a snapshot of CPU, memory, disk, and load for a specific node:

```bash
cribl edge system-info pi5-cribl
```

Output includes CPU usage percentages, memory used/free, disk usage, load averages, and uptime. For the full raw JSON (per-core breakdown, network interfaces):

```bash
cribl edge system-info-raw pi5-cribl
```

## Historical Metrics

Time-series CPU, memory, disk, and load data:

```bash
# Last hour (default)
cribl edge metrics pi5-cribl

# Last 15 minutes
cribl edge metrics pi5-cribl -d 15m

# Summary (min/max/avg) instead of time series
cribl edge metrics pi5-cribl -d 4h --summary
```

Durations: `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `12h`, `1d`

## Inputs & Outputs

See what sources and destinations are running on a node:

```bash
cribl edge inputs pi5-cribl
cribl edge outputs pi5-cribl
```

## File Operations

### Browse directories

```bash
# List directory contents on a node
cribl edge node-ls pi5-cribl /home/cribl/Documents

# With file stats (size, permissions, timestamps)
cribl edge node-ls pi5-cribl /home/cribl/Documents --stats
```

### Inspect a file

Get stat info, MD5/SHA256 hashes, a head preview, and hexdump:

```bash
cribl edge fileinspect pi5-cribl /home/cribl/scripts/my-script.sh
```

### Read or search file contents

```bash
# Read full file
cribl edge file-search pi5-cribl /home/cribl/scripts/my-script.sh --raw

# Search for a string
cribl edge file-search pi5-cribl /opt/cribl/log/cribl3.log -q "error" --raw

# Paginate (50 lines starting at offset 100)
cribl edge file-search pi5-cribl /var/log/syslog -l 50 -o 100

# Full JSON output with metadata (_time, host, source)
cribl edge file-search pi5-cribl /opt/cribl/log/cribl3.log -q "error"
```

## Fleet-Scoped Commands

These operate on an entire fleet rather than a single node:

```bash
cribl edge containers -f pi        # List containers
cribl edge processes -f pi          # List processes
cribl edge logs -f pi               # List log files
cribl edge metadata -f pi           # Get fleet metadata
cribl edge events -f pi             # Get edge events
cribl edge ls /some/path -f pi      # List directory (fleet-wide)
cribl edge files /some/path -f pi   # Browse files (fleet-wide)
cribl edge kube-logs -f pi          # Kubernetes logs
```

## Node Identification

Node-scoped commands accept either a **hostname** or **node ID**:

```bash
# By hostname (case-insensitive)
cribl edge system-info pi5-cribl

# By node ID
cribl edge system-info 8b59d35e-dddb-4631-b694-42841291d8fd
```

If a hostname isn't found, the CLI lists available nodes so you can pick the right one.
