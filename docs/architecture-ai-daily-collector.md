# Architecture overview: ai-daily-collector (backend for data scraping and API)

Purpose
- Provide a concise reference of the backend architecture that collects data via scraping and exposes API endpoints for consumption.

Scope
- Covers data sources, scraping pipeline, storage, API surface, scheduling, deployment, and testing approaches.

1) Target tech stack (assumptions)
- Language/runtime: Node.js / Python / Go (to be confirmed by repository inspection)
- Scraping mechanism: Puppeteer/Playwright (headless browser) or requests-based parsers (BeautifulSoup, Cheerio, etc.)
- Data storage: PostgreSQL/MongoDB/SQLite (to be confirmed)
- API framework: Express/FastAPI/Fiber/Gin (to be confirmed)
- Message queue / scheduling: BullMQ/RabbitMQ/Celery or cron
- Deployment: Docker/Kubernetes, environment variables via .env

2) Core architectural components
- Scraper modules: responsible for fetching data from configured sources
- Processor / Normalizer: transform raw scrape results into a structured data model
- Storage layer: persistence of raw/normalized data
- API layer: REST endpoints for querying scraped data, job status, and metrics
- Scheduler/Orchestrator: enqueues scrape jobs, handles retries, rate limits
- Logger/Observability: structured logs, tracing, metrics
- Tests: unit/integration tests around scraping logic and API endpoints

3) Data model (conceptual)
- SourceConfig: { id, name, fetchUrl, authDetails, rateLimit, parsingRules }
- ScrapeJob: { id, sourceId, status, startedAt, completedAt, attempts, error }
- ScrapedItem: { id, sourceId, sourceUrl, title, content, metadata, scrapedAt }
- ProcessedData: normalized representation for API consumers
- AuditLog: events for operations and data lineage

4) Data flow (end-to-end)
- SourceConfig defines sources to scrape
- Scheduler enqueues ScrapeJob(s)
- Scraping service fetches pages (or APIs), emits raw data to Processing stage
- Processing/Normalization normalizes fields, stores in DB
- API serves endpoints to retrieve items, sources, job status, and statistics
- Optional: background workers perform retries and backoffs

5) API surface (typical endpoints)
- GET /api/v1/items?source={id}&limit=100
- GET /api/v1/sources
- POST /api/v1/jobs (create scrape job)
- GET /api/v1/jobs/{id}
- GET /healthz / metrics

6) Scheduling & reliability
- Periodic scraping via cron or queue-driven workers
- Retries with exponential backoff
- Idempotent scraping where possible

7) Observability
- Structured logging, request tracing, metrics (e.g., via Prometheus)
- Health checks and readiness probes for API and worker services

8) Security & data integrity
- Secrets management for API credentials
- Input validation on incoming data
- Access controls for API endpoints (if auth is in scope)

9) Deployment considerations
- Docker compose / Kubernetes manifests
- Migration strategy for evolving schemas
- Backward-compatibility and data migrations

10) Gaps and next steps
- Confirm technology choices by inspecting the repo (package.json, requirements.txt, go.mod, etc.)
- Map actual file layout to the architectural components above
- Draft a concrete module map with absolute file paths
- Create a minimal runbook for local development and testing

11) Representative file-path map (to verify)
- Scraper/config: sources and rules
- Worker/processor: data transformation
- Storage/db: models and migrations
- API/server: routes and controllers
- Tests: unit/integration tests
- Deployment: Docker/K8s manifests

- If you want, I can fill this document with concrete file paths once the repository structure is confirmed.
