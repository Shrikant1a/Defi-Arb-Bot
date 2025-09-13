const Database = require("better-sqlite3");

const db = new Database("arb_bot.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    pair TEXT,
    profit REAL
  )
`);

module.exports = db;
