
import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Check the api/.env file.');
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: true,
  },
});
