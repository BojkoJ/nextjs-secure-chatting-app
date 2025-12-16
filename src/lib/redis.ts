import { Redis } from "@upstash/redis";

// fromEnv si to automaticky načte z .env souboru, je to jednodušší než to dělat manuálně
export const redis = Redis.fromEnv()