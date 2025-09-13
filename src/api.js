const express = require('express');
const db = require('./db');

function createApi(port = 3000) {
  const app = express();
  app.use(express.json());

  app.get('/opportunities', (req, res) => {
    const limit = parseInt(req.query.limit || '50', 10);
    const rows = db.prepare("SELECT * FROM trades ORDER BY timestamp DESC LIMIT ?").all(limit);
    res.json(rows);
  });

  app.get('/health', (req, res) => res.json({ ok: true }));

  return app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

module.exports = { createApi };
