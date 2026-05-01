import { neon } from "@neondatabase/serverless";
import { env } from "./env";

export function getDb() {
  return neon(env.DATABASE_URL);
}
