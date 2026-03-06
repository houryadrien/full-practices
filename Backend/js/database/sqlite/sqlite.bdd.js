import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DATABASE_PATH = "../data/fleet.db"
//V1
//const CREATE_DB_REQUEST = `CREATE TABLE IF NOT EXISTS fleets (id TEXT PRIMARY KEY)`;
//V2
const CREATE_DB_REQUEST =`
    CREATE TABLE IF NOT EXISTS fleets (
      id TEXT PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS vehicles (
      plate_number TEXT,
      fleet_id TEXT,
      PRIMARY KEY (plate_number, fleet_id)
    );
    CREATE TABLE IF NOT EXISTS locations (
      plate_number TEXT PRIMARY KEY,
      lat REAL,
      lng REAL,
      alt REAL
    );
  `;

export async function connectDb(database) {
  let db;
  if (database) {
    db = await open({filename:database, driver: sqlite3.Database});
  } else {
    db = await open({filename:DATABASE_PATH, driver: sqlite3.Database});
  } 
  await db.exec(CREATE_DB_REQUEST);
  return db;
}