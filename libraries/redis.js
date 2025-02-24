const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(
  "rediss://default:36324d3c8f944be898442b5fb132a650@gusc1-careful-oriole-30679.upstash.io:30679"
);

async function run() {
  try {
    await redis.set("foo", "bar");
    console.log("Key was kept");
  } catch (err) {
    console.error("Redis bilan ishlashda xatolik:", err);
  }
}

run();

module.exports = redis;
