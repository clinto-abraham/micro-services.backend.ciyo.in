Request
  ↓
[1] Logging & tracing
  ↓
[2] Spike protection (sudden floods)
  ↓
[3] Rate limiting (steady abuse)
  ↓
[4] AI traffic guard (pattern / bot detection)
  ↓
[5] JWT validation
  ↓
[6] Proxy to service


## Middlewares to protect whole micro-services from api gateway:
| Scenario            | Blocked by        |
| ------------------- | ----------------- |
| Sudden 200 req/sec  | spikeProtector    |
| 1000 req in 10 mins | rateLimiter       |
| Curl / bot          | aiTrafficGuard    |
| Invalid token       | auth.middleware   |
| Dead service        | health.middleware |
