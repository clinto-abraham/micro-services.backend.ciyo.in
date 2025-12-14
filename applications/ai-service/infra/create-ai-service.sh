#!/bin/bash

log() {
  echo "➡️  $1"
}

create_dir() {
  mkdir -p "$1" && echo "✔️  Created dir: $1"
}

create_file() {
  touch "$1" && echo "✔️  Created file: $1"
}

log "Creating AI-Service structure..."

BASE="ai-service"

create_dir "$BASE/src/config"
create_dir "$BASE/src/routes"
create_dir "$BASE/src/controllers"
create_dir "$BASE/src/services/llm"
create_dir "$BASE/src/services"
create_dir "$BASE/src/queues"
create_dir "$BASE/src/middlewares"
create_dir "$BASE/src/utils"
create_dir "$BASE/src/constants"

FILES=(
  src/server.js
  src/app.js
  src/config/env.js
  src/config/ai.config.js
  src/config/redis.config.js
  src/config/queue.config.js
  src/routes/index.js
  src/routes/ai.routes.js
  src/controllers/ai.controller.js
  src/services/ai.service.js
  src/services/event.service.js
  src/services/llm/openai.provider.js
  src/services/llm/local.provider.js
  src/services/llm/index.js
  src/queues/ai.queue.js
  src/queues/ai.worker.js
  src/middlewares/auth.middleware.js
  src/middlewares/rateLimit.middleware.js
  src/middlewares/error.middleware.js
  src/utils/logger.js
  src/utils/tokenizer.js
  src/utils/httpClient.js
  .env.example
  package.json
  README.md
)

for file in "${FILES[@]}"; do
  create_file "$BASE/$file"
done

log "✅ AI-Service structure created successfully"
