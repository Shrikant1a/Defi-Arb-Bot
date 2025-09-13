const { getPrices } = require("./priceFetcher");

async function checkArbOnce() {
  try {
    const prices = await getPrices();
    if (!prices) {
      console.log("⚠️ Could not fetch prices, skipping...");
      return null;
    }

    const { uniPrice, sushiPrice } = prices;
    console.log(`💹 Uniswap Price: ${uniPrice} | Sushi Price: ${sushiPrice}`);

    const diff = uniPrice - sushiPrice;
    if (Math.abs(diff) > 2) { // Arbitrage threshold
      console.log(`🚀 Arbitrage opportunity detected! Difference: ${diff.toFixed(2)}`);
      return { opportunity: true, diff };
    } else {
      console.log("⚖️ No arbitrage opportunity right now.");
      return { opportunity: false, diff };
    }
  } catch (err) {
    console.error("❌ Error during arbitrage check:", err.message);
    return null;
  }
}

module.exports = { checkArbOnce };
