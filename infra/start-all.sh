#!/usr/bin/env bash
set -e

echo "🚀 Starting all services via PM2..."

# Check if PM2 exists
if ! command -v pm2 &> /dev/null
then
  echo "❌ PM2 is not installed. Install using: sudo npm install -g pm2"
  exit 1
fi

# Start all services from ecosystem file
pm2 start ./ecosystem.config.js

# Save current PM2 list for restart on reboot
pm2 save

# Show status table
pm2 status
