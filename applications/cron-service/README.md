| Business Need          | Data Source   |
| ---------------------- | ------------- |
| Payment reminders      | sql-service   |
| Overdue dues           | sql-service   |
| Inactive users         | mongo-service |
| Login-based inactivity | mongo-service |
| Verification status    | sql-service   |
| Verification attempts  | mongo-service |
| Notification history   | mongo-service |


| Layer           | Tool                       |
| --------------- | -------------------------- |
| Scheduler       | **node-cron**              |
| Queue           | **BullMQ**                 |
| Queue Store     | **Redis**                  |
| Runtime         | Node.js                    |
| Process Manager | PM2                        |
| Communication   | HTTP / Internal JWT        |
| Observability   | Winston + Prometheus ready |
| Idempotency     | JobId + DB locks           |



cron-service/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── redis.config.js
│   │   ├── cron.config.js
│   │   └── services.config.js
│   │
│   ├── scheduler/
│   │   ├── index.js                # Register all cron schedules
│   │   ├── payment.scheduler.js
│   │   ├── user.scheduler.js
│   │   ├── verification.scheduler.js
│   │   └── maintenance.scheduler.js
│   │
│   ├── queues/
│   │   ├── index.js
│   │   ├── payment.queue.js
│   │   ├── user.queue.js
│   │   └── verification.queue.js
│   │
│   ├── workers/
│   │   ├── payment.worker.js
│   │   ├── user.worker.js
│   │   ├── verification.worker.js
│   │   └── maintenance.worker.js
│   │
│   ├── jobs/
│   │   ├── payment/
│   │   │   ├── sendReminder.job.js
│   │   │   └── markOverdue.job.js
│   │   │
│   │   ├── user/
│   │   │   ├── inactiveUser.job.js
│   │   │   └── deactivateUser.job.js
│   │   │
│   │   └── verification/
│   │       └── verifyEmployee.job.js
│   │
│   ├── services/
│   │   ├── mail.service.js
│   │   ├── user.service.js
│   │   ├── payment.service.js
│   │   └── verification.service.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── axios.js
│   │   ├── idempotency.js
│   │   └── time.js
│   │
│   ├── health/
│   │   └── health.route.js
│   │
│   ├── app.js
│   └── server.js
│
├── scripts/
│   ├── start-workers.sh
│   └── seed-jobs.sh
│
├── logs/
│
├── .env
├── .env.example
├── ecosystem.config.js
├── package.json
└── README.md




# FLOW

node-cron
   ↓
payment.scheduler.js
   ↓
payment.queue.add("SEND_REMINDER")
   ↓
BullMQ Redis Queue
   ↓
payment.worker.js
   ↓
payment.service.js → mail.service.js




