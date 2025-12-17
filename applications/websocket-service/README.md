websocket-service/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── redis.config.js
│
│   ├── redis/
│   │   └── client.js
│
│   ├── websocket/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── connection.js
│   │   └── router.js
│
│   ├── handlers/
│   │   ├── chat.handler.js
│   │   ├── payment.handler.js
│   │   └── notification.handler.js
│
│   ├── services/
│   │   └── socket.registry.js
│
│   ├── utils/
│   │   └── logger.js
│
│   ├── http.js
│   └── server.js
│
├── package.json
├── .env.example
└── README.md



src/
├── server.js          # entry point
├── http.js            # HTTP + health
├── websocket/
│   ├── index.js       # WS init
│   ├── router.js      # ← YOUR CODE LIVES HERE
│   ├── auth.js
│   └── connection.js
│
├── handlers/
│   ├── chat.handler.js
│   ├── payment.handler.js
│   └── notification.handler.js
