POST /internal/ai/chat
│
├─ auth.middleware (internal token)
├─ rateLimit.middleware
├─ controller
│   ├─ validate input
│   ├─ enqueue job
│   └─ return jobId
│
└─ worker
    ├─ call LLM
    ├─ store logs
    └─ emit WS event




AI Strategy (Very Important)
🔹 Phase 1 — Simple

Single model (OpenAI)

Non-streaming

Store logs in DB

🔹 Phase 2 — Scalable

Streaming responses

WebSocket notifications

Redis caching for repeated prompts

🔹 Phase 3 — Cost Optimized

Prompt fingerprinting

Semantic cache

Model fallback (GPT → cheaper model)

🔹 Phase 4 — Enterprise

Per-tenant quotas

AI audit logs

AI explainability & moderation



| Data          | DB             |
| ------------- | -------------- |
| AI logs       | MongoDB        |
| Usage metrics | PostgreSQL     |
| Cache         | Redis          |
| Jobs          | BullMQ (Redis) |




ai-service/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── ai.config.js
│   │   ├── redis.config.js
│   │   └── queue.config.js
│   │
│   ├── server.js
│   ├── app.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   └── ai.routes.js
│   │
│   ├── controllers/
│   │   └── ai.controller.js
│   │
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── event.service.js
│   │   ├── cache.service.js
│   │   └── llm/
│   │       ├── openai.provider.js
│   │       ├── local.provider.js
│   │       └── index.js
│   │
│   ├── queues/
│   │   ├── ai.queue.js
│   │   └── ai.worker.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── tokenizer.js
│   │   └── httpClient.js
│   │
│   └── constants/
│       ├── ai.constants.js
│       └── events.constants.js
│
├── .env.example
├── package.json
└── README.md
