#!/bin/bash

# -----------------------------
# Logging Function
# -----------------------------
log_action() 
{
  local action="$1"
  local target="$2"

  echo "➡️  GOING TO: $action - $target"

  if eval "$action"
  then 
    echo "✔️  DONE: $target"
  else
    echo "❌ FAILED: $target"
  fi

  echo ""
}

# -----------------------------
# Create Folder (with check)
# -----------------------------
create_folder() 
{
  local folder="$1"

  if [ ! -d "$folder" ]
  then {
    log_action "mkdir -p \"$folder\"" "$folder"
  }
  else {
    echo "⚠️  SKIPPED: Folder already exists -> $folder"
  }
  fi
}

# -----------------------------
# Create File (with check)
# -----------------------------
create_file() 
{
  local file="$1"

  if [ ! -f "$file" ]
  then {
    log_action "touch \"$file\"" "$file"
  }
  else {
    echo "⚠️  SKIPPED: File already exists -> $file"
  }
  fi
}

# -----------------------------
# Base Structure
# -----------------------------
ROOT="applications"

echo "📁 Creating microservices structure..."
create_folder "$ROOT"

# -----------------------------
# Gateway Service (PORT 2000)
# -----------------------------
create_folder "$ROOT/gateway"
create_file   "$ROOT/gateway/package.json"
create_file   "$ROOT/gateway/index.js"

# Security folder
create_folder "$ROOT/gateway/security"
create_file   "$ROOT/gateway/security/spikeProtector.js"
create_file   "$ROOT/gateway/security/aiTrafficGuard.js"
create_file   "$ROOT/gateway/security/rateLimiter.js"

# Middleware folder
create_folder "$ROOT/gateway/middleware"
create_file   "$ROOT/gateway/middleware/internalAuth.js"

create_file   "$ROOT/gateway/.env.example"


# -----------------------------
# User Service (PORT 3000)
# -----------------------------
create_folder "$ROOT/user-service"
create_file   "$ROOT/user-service/package.json"
create_file   "$ROOT/user-service/index.js"
create_file   "$ROOT/user-service/db.js"
create_file   "$ROOT/user-service/.env.example"

# -----------------------------
# API Service (Mongo) (PORT 4000)
# -----------------------------
create_folder "$ROOT/api-service"
create_file   "$ROOT/api-service/package.json"
create_file   "$ROOT/api-service/index.js"

create_folder "$ROOT/api-service/models"
create_file   "$ROOT/api-service/models/Seat.js"
create_file   "$ROOT/api-service/models/Show.js"
create_file   "$ROOT/api-service/models/Ticket.js"

create_file   "$ROOT/api-service/db.js"
create_file   "$ROOT/api-service/.env.example"


# -----------------------------
# AI Service (PORT 5000)
# -----------------------------
create_folder "$ROOT/ai-service"
create_file   "$ROOT/ai-service/package.json"
create_file   "$ROOT/ai-service/index.js"

# AI logic files
create_file   "$ROOT/ai-service/chatgpt.js"
create_file   "$ROOT/ai-service/localLLM.js"
create_file   "$ROOT/ai-service/pubsub.js"

create_file   "$ROOT/ai-service/.env.example"


# -----------------------------
# WebSocket Service (PORT 6000)
# -----------------------------
create_folder "$ROOT/websocket-service"
create_file   "$ROOT/websocket-service/package.json"
create_file   "$ROOT/websocket-service/index.js"
create_file   "$ROOT/websocket-service/.env.example"


# -----------------------------
# Cron Service (PORT 7000)
# -----------------------------
create_folder "$ROOT/cron-service"
create_file   "$ROOT/cron-service/package.json"
create_file   "$ROOT/cron-service/index.js"
create_file   "$ROOT/cron-service/.env.example"


# -----------------------------
# Payment Service (PORT 8000)
# -----------------------------
create_folder "$ROOT/payment-service"
create_file   "$ROOT/payment-service/package.json"
create_file   "$ROOT/payment-service/index.js"
create_file   "$ROOT/payment-service/razorpay.js"
create_file   "$ROOT/payment-service/verifyWebhook.js"
create_file   "$ROOT/payment-service/.env.example"


# -----------------------------
# Go Service (Optional Microservice)
# -----------------------------
create_folder "$ROOT/go-service"

create_file   "$ROOT/go-service/go.mod"

create_folder "$ROOT/go-service/cmd/server"
create_file   "$ROOT/go-service/cmd/server/main.go"

create_folder "$ROOT/go-service/internal/config"
create_file   "$ROOT/go-service/internal/config/config.go"

create_folder "$ROOT/go-service/internal/database"
create_file   "$ROOT/go-service/internal/database/mongo.go"

create_folder "$ROOT/go-service/internal/models"
create_file   "$ROOT/go-service/internal/models/item.go"

create_file "$ROOT/go-service/.env.example"


# -----------------------------
# Infra Folder
# -----------------------------
create_folder "$ROOT/infra"
create_file   "$ROOT/infra/ecosystem.config.js"
create_file   "$ROOT/infra/start-all.sh"


# -----------------------------
# Root README File
# -----------------------------
create_file "$ROOT/README.md"

echo "🎉 Microservices architecture structure created successfully!"
