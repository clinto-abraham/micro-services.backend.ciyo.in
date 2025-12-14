// # ----------------------------------
// # App
// # ----------------------------------
const NODE_ENV="production"
const PORT = "3000"
const SERVICE_NAME   = "user-service"

// # ----------------------------------
// # Database
// # ----------------------------------
const DB_HOST= "localhost"
const DB_PORT= "5432"
const DB_NAME= "user_service"
const DB_USER= "postgres"
const DB_PASSWORD= "postgres"

// # ----------------------------------
// # JWT
// # ----------------------------------
const JWT_SECRET = "super-long-random-secret-key"
const JWT_EXPIRES_IN = "15m"
const JWT_REFRESH_EXPIRES_IN = "7d"

// # ----------------------------------
// # Security
// # ----------------------------------
const BCRYPT_SALT_ROUNDS = "12"

// # ----------------------------------
// # 2FA
// # ----------------------------------
const TWO_FA_ISSUER  = "CIYO_USER_SERVICE"

// # ----------------------------------
// # Rate Limiting (Gateway)
// # ----------------------------------
const RATE_LIMIT_MAX = "100"
const RATE_LIMIT_WINDOW  = "15"
