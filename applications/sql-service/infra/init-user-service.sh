#!/bin/bash

echo ""
echo "🚀 Initializing User Service Structure"
echo "-------------------------------------"

# -----------------------------
# Logging Functions
# -----------------------------
log_create() {
  echo "➡️  Creating: $1"
}

log_success() {
  echo "✅ Created: $1"
}

log_skip() {
  echo "⚠️  Skipped (already exists): $1"
}

# -----------------------------
# Create Folder (Safe)
# -----------------------------
create_folder() {
  if [ ! -d "$1" ]
  then {
    log_create "Folder -> $1"
    mkdir -p "$1"
    log_success "Folder -> $1"
  }
  else {
    log_skip "Folder -> $1"
  }
  fi
}

# -----------------------------
# Create File (Safe)
# -----------------------------
create_file() {
  if [ ! -f "$1" ]
  then {
    log_create "File   -> $1"
    touch "$1"
    log_success "File   -> $1"
  }
  else {
    log_skip "File   -> $1"
  }
  fi
}

# -----------------------------
# Root Files
# -----------------------------
create_file ".env"
create_file ".env.example"
create_file "package.json"
create_file "README.md"
create_file ".sequelizerc"
create_file "ecosystem.config.js"

# -----------------------------
# SRC Base
# -----------------------------
create_folder "src"
create_file   "src/app.js"
create_file   "src/server.js"

# -----------------------------
# Configs
# -----------------------------
create_folder "src/configs"
create_file   "src/configs/database.js"
create_file   "src/configs/sequelize.js"
create_file   "src/configs/env.js"
create_file   "src/configs/jwt.config.js"
create_file   "src/configs/twofa.config.js"

# -----------------------------
# Models (Sequelize CLI)
# -----------------------------
create_folder "src/models"
create_file   "src/models/index.js"
create_file   "src/models/user.js"

# -----------------------------
# Migrations & Seeders
# -----------------------------
create_folder "src/migrations"
create_folder "src/seeders"

# -----------------------------
# Routes
# -----------------------------
create_folder "src/routes"
create_file   "src/routes/index.js"
create_file   "src/routes/user.routes.js"

# -----------------------------
# Controllers
# -----------------------------
create_folder "src/controllers"
create_file   "src/controllers/user.controller.js"

# -----------------------------
# Services
# -----------------------------
create_folder "src/services"
create_file   "src/services/user.service.js"
create_file   "src/services/auth.service.js"
create_file   "src/services/twofa.service.js"

# -----------------------------
# Middlewares
# -----------------------------
create_folder "src/middlewares"
create_file   "src/middlewares/auth.middleware.js"
create_file   "src/middlewares/error.middleware.js"
create_file   "src/middlewares/validate.middleware.js"

# -----------------------------
# Utils
# -----------------------------
create_folder "src/utils"
create_file   "src/utils/password.util.js"
create_file   "src/utils/token.util.js"
create_file   "src/utils/response.util.js"
create_file   "src/utils/logger.util.js"

# -----------------------------
# Constants
# -----------------------------
create_folder "src/constants"
create_file   "src/constants/user-status.js"
create_file   "src/constants/roles.js"

# -----------------------------
# Validations
# -----------------------------
create_folder "src/validations"
create_file   "src/validations/user.validation.js"

# -----------------------------
# Jobs
# -----------------------------
create_folder "src/jobs"
create_file   "src/jobs/cleanup.job.js"

echo ""
echo "🎉 User Service Structure Ready"
echo "-------------------------------------"
