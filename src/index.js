const { checkArbOnce } = require("./detector");
const { createApi } = require("./api");
const db = require("./db");

// Start API server
const PORT = 3000;
createApi(PORT);

// Run arbitrage check every 10 seconds
setInterval(async () => {
  const result = await checkArbOnce();

  if (result && result.opportunity) {
    // Save to DB
    db.prepare(
      "INSERT INTO trades (pair, profit) VALUES (?, ?)"
    ).run("WETH/USDC", result.diff);

    console.log("💾 Saved arbitrage opportunity to DB!");
  }
}, 10000);

console.log("✅ Bot started and watching for arbitrage opportunities...");
