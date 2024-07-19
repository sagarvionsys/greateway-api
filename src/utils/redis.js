import { createClient } from "redis";

const redisClient = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (err) =>
  console.error("Redis Connection error -", err)
);

(async () => {
  await redisClient.connect();
})();

export { redisClient };
