# micro-services.backend.ciyo.in
This is a combination of node and go-lang backend programms coupled around with each micro-services

# Microservices (gateway, user-service, api-service, ai-service, cron-service)

## Quick local setup (native) — recommended for Mac M1

1. Install prerequisites (Homebrew): node, postgres, mongo, redis.
2. Start DBs:
   - Postgres: `brew services start postgresql`
   - MongoDB: `brew services start mongodb/brew/mongodb-community`
   - Redis: `brew services start redis`
3. For each service folder:
   ```bash
   cd gateway
   npm install
   # repeat for user-service, api-service, ai-service, cron-service
4. # Microservices Application 

Ports:
- Gateway: 2000
- User: 3000
- API (Mongo): 4000
- AI: 5000
- WebSocket: 6000
- Cron: 7000
- Payment: 8000
- Go-service: optional

Run locally (recommended on Mac M1 with Homebrew DBs):
5. Start DBs:
   - Postgres, MongoDB, Redis (via brew services)
6. Install dependencies per service:

   - `cd ai-service && npm i && \
     cd ../cron-service && npm i && \
     cd ../go-service && go mod tidy && \
     cd ../payment-service && npm i && \
     cd ../user-service && npm i && \
     cd ../api-service && npm i && \
     cd ../gateway && npm i && \
     cd ../websocket-service && npm i && \
     cd ..`

7. Start with PM2:
   - `cd infra && pm2 start ecosystem.config.js`
8. Check health endpoints:
   - `curl http://localhost:2000/health`, etc.

9. Notes:
- Services validate internal token header `X-Internal-Token` signed with `SERVICE_JWT_SECRET`.
- AI service supports OpenAI and local LLM.
- WebSocket service uses Socket.IO.
10. `chmod +x start-all.sh`
    `./start-all.sh`