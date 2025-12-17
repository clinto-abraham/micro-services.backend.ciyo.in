sql-service/
│
├── src/
│   ├── app.js
│   ├── server.js
│
│   ├── configs/
│   │   ├── database.js
│   │   ├── sequelize.js
│   │   ├── env.js
│   │   ├── jwt.config.js
│   │   └── twofa.config.js
│
│   ├── models/                 # Sequelize CLI managed
│   │   ├── index.js
│   │   └── user.js
│
│   ├── migrations/             # Sequelize CLI
│   ├── seeders/
│
│   ├── routes/
│   │   ├── index.js
│   │   └── user.routes.js
│
│   ├── controllers/
│   │   └── user.controller.js
│
│   ├── services/
│   │   ├── user.service.js
│   │   ├── auth.service.js
│   │   └── twofa.service.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│
│   ├── utils/
│   │   ├── password.util.js
│   │   ├── token.util.js
│   │   ├── response.util.js
│   │   └── logger.util.js
│
│   ├── constants/
│   │   ├── user-status.js
│   │   └── roles.js
│
│   ├── validations/
│   │   └── user.validation.js
│
│   └── jobs/
│       └── cleanup.job.js
│
├── .env
├── .env.example
├── ecosystem.config.js
├── .sequelizerc
├── package.json
└── README.md


# Migrations
npx sequelize-cli db:migrate

# SEEDERS
npx sequelize-cli seed:generate --name users
npx sequelize-cli seed:generate --name products
npx sequelize-cli seed:generate --name stocks
npx sequelize-cli seed:generate --name carts
npx sequelize-cli seed:generate --name cart-items
npx sequelize-cli seed:generate --name user-addresses
npx sequelize-cli seed:generate --name two-factor-auth
npx sequelize-cli seed:generate --name rooms
npx sequelize-cli seed:generate --name events
npx sequelize-cli seed:generate --name room-bookings
npx sequelize-cli seed:generate --name seats


# TERMINAL
psql -U server-user postgres

CREATE DATABASE database_development;
CREATE DATABASE database_test;
CREATE DATABASE database_production;
