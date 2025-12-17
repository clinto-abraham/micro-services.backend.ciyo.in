# REDIS COMMANDS

redis-cli --user default -a CURRENT_PASSWORD

ACL SETUSER default >NEW_STRONG_PASSWORD

redis-cli --user default -a redisIsStartedOnDec15Of2025

CONFIG SET requirepass redisIsStartedOnDec15Of2025

ACL SETUSER default on >redisIsStartedOnDec15Of2025 ~* +@all


CONFIG SET requirepass redisIsStartedOnDec15Of2025
CONFIG REWRITE

exit
redis-cli --user default -a redisIsStartedOnDec15Of2025 PING
