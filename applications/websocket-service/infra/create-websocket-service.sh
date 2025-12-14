#!/bin/bash

SERVICE="websocket-service"

echo "🚀 Creating $SERVICE structure..."

mkdir -p $SERVICE/src/{config,websocket,handlers,redis,services,utils,routes,logs}

touch $SERVICE/src/server.js
touch $SERVICE/src/http.js

# Config
touch $SERVICE/src/config/{env.js,redis.config.js,ws.config.js}

# WebSocket core
touch $SERVICE/src/websocket/{index.js,auth.js,connection.js,router.js,heartbeat.js}

# Handlers
touch $SERVICE/src/handlers/{chat.handler.js,payment.handler.js,notification.handler.js}

# Redis
touch $SERVICE/src/redis/{client.js,pub.js,sub.js}

# Services
touch $SERVICE/src/services/socket.registry.js
touch $SERVICE/src/services/broadcaster.js

# Utils
touch $SERVICE/src/utils/{logger.js,constants.js}

# Routes
touch $SERVICE/src/routes/health.route.js

# Root files

touch $SERVICE/README.md
touch $SERVICE/.env

echo "✅ websocket-service structure created successfully"
