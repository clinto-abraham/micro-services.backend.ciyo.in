#!/usr/bin/env bash
set -e

echo "🚀 Starting micro-services one by one via PM2 (production)..."

# Check if PM2 exists
if ! command -v pm2 &> /dev/null
then
  echo "❌ PM2 is not installed. Install using: sudo npm install -g pm2"
  exit 1
fi

# Optional: show PM2 version
echo "ℹ️ PM2 version: $(pm2 -v)"

# Start services one by one (isolated)
pm2 start ./ecosystem.config.js --only api-gateway --env production
sleep 2

pm2 start ./ecosystem.config.js --only sql-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only mongo-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only ai-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only websocket-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only cron-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only payment-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only mail-service --env production

# Save PM2 process list for restart on reboot
pm2 save

# Show final status
pm2 status

echo "✅ All services started successfully in production mode"
