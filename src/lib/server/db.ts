import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

const dbPath = env.RAILWAY_VOLUME_MOUNT_PATH
    ? `${env.RAILWAY_VOLUME_MOUNT_PATH}/local.db`
    : './local.db';

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT
  )
`);

export default db;