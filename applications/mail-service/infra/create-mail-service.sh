#!/bin/bash

set -e

ROOT="../mail-service"
SRC="$ROOT/src"

echo "📨 Creating mail-service structure..."

# Root folders
mkdir -p $ROOT/{tests,logs}

# Core src folders
mkdir -p $SRC/{config,controllers,routes,services,templates,middlewares,utils}

# Template folders
mkdir -p $SRC/templates/{emails,partials}

# Create src files
touch $SRC/app.js
touch $SRC/server.js

# Config files
touch $SRC/config/{env.js,mail.config.js,sms.config.js}

# Controllers
touch $SRC/controllers/{mail.controller.js,sms.controller.js}

# Routes
touch $SRC/routes/{index.js,mail.routes.js,sms.routes.js}

# Services
touch $SRC/services/{template.service.js,mail.service.js,sms.service.js}

# Templates
touch $SRC/templates/emails/{welcome.mjml.hbs,otp.mjml.hbs}
touch $SRC/templates/partials/{header.mjml.hbs,footer.mjml.hbs}

# Middlewares
touch $SRC/middlewares/{auth.internal.js,rateLimiter.js,validate.js}

# Utils
touch $SRC/utils/{logger.js,response.js}

# Other project files
touch $ROOT/{.env,.env.example,package.json,ecosystem.config.js,README.md}

# Logs
touch $ROOT/logs/{combined.log,error.log}

# Tests
touch $ROOT/tests/health.test.js

echo "✅ mail-service created successfully"
