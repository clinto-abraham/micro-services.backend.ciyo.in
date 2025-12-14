#!/bin/bash

BASE="cron-service"

folders=(
  "src/config"
  "src/scheduler"
  "src/queues"
  "src/workers"
  "src/jobs/payment"
  "src/jobs/user"
  "src/jobs/verification"
  "src/services"
  "src/utils"
  "src/health"
  "scripts"
  "logs"
)

files=(
  "src/config/env.js"
  "src/config/redis.config.js"
  "src/config/cron.config.js"
  "src/config/services.config.js"

  "src/scheduler/index.js"
  "src/scheduler/payment.scheduler.js"
  "src/scheduler/user.scheduler.js"
  "src/scheduler/verification.scheduler.js"
  "src/scheduler/maintenance.scheduler.js"

  "src/queues/index.js"
  "src/queues/payment.queue.js"
  "src/queues/user.queue.js"
  "src/queues/verification.queue.js"

  "src/workers/payment.worker.js"
  "src/workers/user.worker.js"
  "src/workers/verification.worker.js"
  "src/workers/maintenance.worker.js"

  "src/services/mail.service.js"
  "src/services/user.service.js"
  "src/services/payment.service.js"
  "src/services/verification.service.js"

  "src/utils/logger.js"
  "src/utils/axios.js"
  "src/utils/idempotency.js"
  "src/utils/time.js"

  "src/health/health.route.js"

  "src/app.js"
  "src/server.js"

  ".env"
  ".env.example"
  "ecosystem.config.js"
  "package.json"
  "README.md"
)

echo "🚀 Creating Cron Service Structure..."

mkdir -p "$BASE"
cd "$BASE" || exit

for dir in "${folders[@]}"; do
  mkdir -p "$dir"
done

for file in "${files[@]}"; do
  touch "$file"
done

chmod +x scripts/*.sh

echo "✅ Cron Service structure created successfully"
