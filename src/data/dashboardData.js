// Mock snapshot for the health dashboard. Replace these exports with an API
// client when a backend is available; components only receive plain data.

export const verticalName = "Green Golf vertical";
// Healthy checks that sit outside the environment table.
// 12 hidden passing checks + 11 healthy rows = 23 passing, with 1 failing = 96%.
export const ADDITIONAL_PASSING_CHECKS = 12;

const CHECKS = [
  {
    id: "email-db",
    status: "down",
    name: "Email database",
    detail: "mail-prod · ECONNREFUSED",
    summary: "Email database (mail-prod) · ECONNREFUSED on ip-172-31-19-249",
    group: "Database",
    latency: null,
    uptime: "Down 3 min",
    lastChecked: "11:22 AM",
    error: "Email DB (unknown) connection failed: ECONNREFUSED",
    host: "ip-172-31-19-249",
    instance: "ip-172-31-19-249.us-east-2.compute.internal",
    service: "EMAILSQL",
    failedAt: "Nov 12 @ 11:34 AM",
  },
  {
    id: "process",
    status: "up",
    name: "Process running",
    detail: null,
    group: "Environment",
    latency: null,
    uptime: "Running",
    lastChecked: "11:22 AM",
  },
  {
    id: "pt-server-env",
    status: "up",
    name: "PT_SERVER_ENV",
    detail: null,
    group: "Environment",
    latency: null,
    uptime: "Set",
    lastChecked: "11:22 AM",
  },
  {
    id: "auth",
    status: "up",
    name: "Auth",
    detail: null,
    group: "Database",
    latency: "12 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "new-auth",
    status: "up",
    name: "New auth",
    detail: null,
    group: "Database",
    latency: "9 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "auth-blue",
    status: "up",
    name: "Auth blue",
    detail: null,
    group: "Database",
    latency: "11 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "ai",
    status: "up",
    name: "AI",
    detail: null,
    group: "Database",
    latency: "18 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "core",
    status: "up",
    name: "Core",
    detail: null,
    group: "Database",
    latency: "7 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "data",
    status: "up",
    name: "Data",
    detail: null,
    group: "Database",
    latency: "14 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "static-blast",
    status: "up",
    name: "Static blast",
    detail: null,
    group: "Database",
    latency: "10 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "dynamic-blast",
    status: "up",
    name: "Dynamic blast",
    detail: null,
    group: "Database",
    latency: "13 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
  {
    id: "mcp",
    status: "up",
    name: "MCP",
    detail: null,
    group: "Database",
    latency: "8 ms",
    uptime: "14d",
    lastChecked: "11:22 AM",
  },
];

export function createChecks() {
  return CHECKS.map((check) => ({ ...check }));
}

export const databaseInfo = {
  name: "Green",
  host: "pictorm-dev-v3-green",
};

export const loadByRange = {
  "1h": {
    cpu: 36,
    connections: 115,
    connectionLimit: 500,
    freeStorageGb: 185,
    freeStoragePercent: 62,
    freeMemoryMb: 677,
    readIops: 0.26,
    writeIops: 10.07,
    readLatencyMs: 0.16,
    writeLatencyMs: 0.57,
  },
  "6h": {
    cpu: 42,
    connections: 148,
    connectionLimit: 500,
    freeStorageGb: 181,
    freeStoragePercent: 60,
    freeMemoryMb: 612,
    readIops: 0.48,
    writeIops: 14.22,
    readLatencyMs: 0.22,
    writeLatencyMs: 0.71,
  },
  "24h": {
    cpu: 51,
    connections: 186,
    connectionLimit: 500,
    freeStorageGb: 174,
    freeStoragePercent: 58,
    freeMemoryMb: 540,
    readIops: 0.91,
    writeIops: 18.64,
    readLatencyMs: 0.31,
    writeLatencyMs: 0.84,
  },
};

export const slowQueries = [
  {
    id: "orders",
    database: "core",
    query: "SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC",
    calls: 1284,
    avgSeconds: 2.41,
  },
  {
    id: "users",
    database: "auth",
    query:
      "SELECT u.*, r.name FROM users u JOIN roles r ON r.id = u.role_id WHERE u.last_login < ?",
    calls: 612,
    avgSeconds: 1.87,
  },
  {
    id: "events",
    database: "data",
    query: "UPDATE events SET status = 'processed' WHERE batch_id IN (...)",
    calls: 340,
    avgSeconds: 1.52,
  },
];

export const failureHistory = [
  {
    id: "email-refused",
    time: "Nov 12 @ 11:34 AM",
    instance: "ip-172-31-19-249.us-east-2.compute.internal",
    service: "EMAILSQL",
    reason: "Email DB (unknown) connection failed: ECONNREFUSED",
  },
];

export function formatChecked(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatClock(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
