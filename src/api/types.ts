export interface ApiListResponse<T> {
  items: T[];
  count?: number;
}

export interface WorkerGroup {
  id: string;
  name?: string;
  description?: string;
  workerCount?: number;
  [key: string]: unknown;
}

export interface Source {
  id: string;
  type: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface Destination {
  id: string;
  type: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface SearchJob {
  id: string;
  query?: string;
  status?: string;
  [key: string]: unknown;
}

export interface SearchResult {
  [key: string]: unknown;
}

export interface Dataset {
  id: string;
  [key: string]: unknown;
}

export interface Notebook {
  id: string;
  [key: string]: unknown;
}

export interface Alert {
  id: string;
  [key: string]: unknown;
}

export interface SystemMetrics {
  [key: string]: unknown;
}

export interface SavedSearch {
  id: string;
  [key: string]: unknown;
}

export interface Pipeline {
  id: string;
  conf?: { functions?: unknown[] };
  description?: string;
  [key: string]: unknown;
}

export interface Route {
  id: string;
  name?: string;
  routes?: unknown[];
  [key: string]: unknown;
}

export interface Pack {
  id: string;
  name?: string;
  description?: string;
  version?: string;
  [key: string]: unknown;
}

export interface Lookup {
  id: string;
  fileInfo?: unknown;
  [key: string]: unknown;
}

export interface Job {
  id: string;
  status?: string;
  [key: string]: unknown;
}

export interface JobConfig {
  id: string;
  type?: string;
  [key: string]: unknown;
}

export interface User {
  id: string;
  username?: string;
  first?: string;
  last?: string;
  email?: string;
  roles?: string[];
  disabled?: boolean;
  [key: string]: unknown;
}

export interface Role {
  id: string;
  policy?: unknown;
  [key: string]: unknown;
}

export interface Secret {
  id: string;
  description?: string;
  [key: string]: unknown;
}

export interface VersionInfo {
  branch?: string;
  commit?: string;
  [key: string]: unknown;
}

export interface SystemInfo {
  [key: string]: unknown;
}

export interface Dashboard {
  id: string;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

export interface EdgeContainer {
  id: string;
  [key: string]: unknown;
}

export interface EdgeProcess {
  pid: number;
  [key: string]: unknown;
}

export interface EventBreakerRuleset {
  id: string;
  [key: string]: unknown;
}

export interface Parser {
  id: string;
  [key: string]: unknown;
}

export interface GlobalVariable {
  id: string;
  value?: unknown;
  [key: string]: unknown;
}

export interface Schema {
  id: string;
  [key: string]: unknown;
}

export interface RegexPattern {
  id: string;
  [key: string]: unknown;
}

export interface GrokPattern {
  id: string;
  [key: string]: unknown;
}

export interface DatabaseConnection {
  id: string;
  type?: string;
  [key: string]: unknown;
}

export interface CriblFunction {
  id: string;
  [key: string]: unknown;
}

export interface Certificate {
  id: string;
  [key: string]: unknown;
}

export interface Credential {
  id: string;
  [key: string]: unknown;
}

export interface Sample {
  id: string;
  [key: string]: unknown;
}

export interface Script {
  id: string;
  [key: string]: unknown;
}

export interface License {
  id: string;
  [key: string]: unknown;
}

export interface Team {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface Policy {
  id: string;
  [key: string]: unknown;
}

export interface NotificationTarget {
  id: string;
  type?: string;
  [key: string]: unknown;
}

// Batch 1.1 - Group-scoped resources
export interface Collector {
  id: string;
  type?: string;
  [key: string]: unknown;
}

export interface Condition {
  id: string;
  [key: string]: unknown;
}

export interface Executor {
  id: string;
  [key: string]: unknown;
}

export interface ParquetSchema {
  id: string;
  [key: string]: unknown;
}

export interface ProtobufLib {
  id: string;
  [key: string]: unknown;
}

export interface HmacFunction {
  id: string;
  [key: string]: unknown;
}

export interface SdsRule {
  id: string;
  [key: string]: unknown;
}

export interface SdsRuleset {
  id: string;
  [key: string]: unknown;
}

export interface AppscopeConfig {
  id: string;
  [key: string]: unknown;
}

export interface PreviewResult {
  [key: string]: unknown;
}

export interface LoggerConfig {
  [key: string]: unknown;
}

export interface ProfilerInfo {
  [key: string]: unknown;
}

// Batch 1.2 - Global resources
export interface Banner {
  id: string;
  [key: string]: unknown;
}

export interface EncryptionKey {
  id: string;
  [key: string]: unknown;
}

export interface Message {
  id: string;
  [key: string]: unknown;
}

export interface Subscription {
  id: string;
  [key: string]: unknown;
}

export interface KmsConfig {
  [key: string]: unknown;
}

export interface FeatureFlag {
  id: string;
  [key: string]: unknown;
}

export interface AuthSettings {
  [key: string]: unknown;
}

export interface GitSettings {
  [key: string]: unknown;
}

export interface AiSettings {
  id: string;
  [key: string]: unknown;
}

export interface Workspace {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface Outpost {
  id: string;
  [key: string]: unknown;
}

// Batch 1.3 - Search-scoped resources
export interface DatasetProvider {
  id: string;
  [key: string]: unknown;
}

export interface Macro {
  id: string;
  [key: string]: unknown;
}

export interface DashboardCategory {
  id: string;
  [key: string]: unknown;
}

export interface TrustPolicy {
  id: string;
  [key: string]: unknown;
}

export interface UsageGroup {
  id: string;
  [key: string]: unknown;
}

export interface Datatype {
  id: string;
  [key: string]: unknown;
}

// Batch 3 - Lake resources
export interface LakeDataset {
  id: string;
  [key: string]: unknown;
}

export interface StorageLocation {
  id: string;
  [key: string]: unknown;
}
