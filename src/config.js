require("dotenv").config();
const { ethers } = require("ethers");

let provider;

if (process.env.ALCHEMY_URL) {
  provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
} else if (process.env.INFURA_KEY) {
  provider = new ethers.JsonRpcProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`
  );
} else {
  throw new Error("❌ No RPC provider set. Please set INFURA_KEY or ALCHEMY_URL in .env");
}

module.exports = { provider };
