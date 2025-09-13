const { ethers } = require("ethers");
const { provider } = require("./provider");

// ✅ Normalize all addresses
const UNISWAP_ROUTER_ADDRESS = ethers.getAddress("0x7a250d5630b4cf539739df2c5dacb4c659f2488d");
const SUSHISWAP_ROUTER_ADDRESS = ethers.getAddress("0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f");
const WETH = ethers.getAddress("0xc02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"); // already correct
const USDC = ethers.getAddress("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
// Only need getAmountsOut from router
const routerAbi = [
  "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)"
];

const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, routerAbi, provider);
const sushiswapRouter = new ethers.Contract(SUSHISWAP_ROUTER_ADDRESS, routerAbi, provider);

async function getPrice(router, amountIn, path, dexName) {
  try {
    const amounts = await router.getAmountsOut(amountIn, path);
    return Number(ethers.formatUnits(amounts[1], 6)); // USDC has 6 decimals
  } catch (err) {
    console.error(`⚠️ ${dexName} price fetch failed:`, err.reason || err.message || err);
    return null;
  }
}

async function getPrices() {
  const amountIn = ethers.parseEther("1"); // 1 WETH
  const path = [WETH, USDC];

  const [uniPrice, sushiPrice] = await Promise.all([
    getPrice(uniswapRouter, amountIn, path, "Uniswap"),
    getPrice(sushiswapRouter, amountIn, path, "Sushiswap")
  ]);

  if (!uniPrice && !sushiPrice) {
    console.warn("⚠️ Could not fetch prices from either DEX.");
    return null;
  }

  return { uniPrice, sushiPrice };
}

module.exports = { getPrices };
