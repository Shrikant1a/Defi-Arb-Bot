# Defi-Arb-Bot
The DeFi Arbitrage Trading Bot is a Node.js tool that scans decentralized exchanges (DEXs) like Uniswap and SushiSwap for price differences, detects profitable arbitrage opportunities, and can execute trades automatically. It features real-time monitoring, SQLite logging, and configurable gas, slippage, and profit thresholds.





## 📂 Project Structure



defi-arb-bot/
│── node_modules/ # Dependencies
│── src/
│ ├── api.js # API endpoints / integrations
│ ├── config.js # Configuration settings
│ ├── db.js # SQLite database handler
│ ├── detector.js # Arbitrage detection logic
│ ├── eth.js # Ethereum utilities
│ ├── fetcher.js # Fetch blockchain & DEX data
│ ├── index.js # Main entry point
│ ├── priceFetcher.js # Price fetching logic
│ ├── provider.js # Web3 provider setup
│ ├── univ2PairAbi.json # Uniswap V2 pair ABI
│ ├── utils.js # Helper functions
│── .env # Environment variables
│── arb_bot.db # SQLite database
│── package.json # Project metadata & dependencies
│── package-lock.json # Dependency lock file




---

## 🚀 Features
- Real-time price fetching from Ethereum DEXs (Uniswap, SushiSwap, etc.)
- Arbitrage opportunity detection across trading pairs
- Automatic or simulated trade execution
- Trade & opportunity logging into SQLite database
- Configurable gas, slippage, and profit thresholds

---

## 📦 Installation

### 1. Clone repository
```bash
git clone https://github.com/yourusername/defi-arb-bot.git
cd defi-arb-bot




npm install




CREATEE .env

INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
PUBLIC_ADDRESS=your_wallet_public_address
NETWORK=mainnet          # or goerli, sepolia for testing
SLIPPAGE=0.005           # 0.5% slippage tolerance
MIN_PROFIT=0.01          # Minimum profit in ETH




node src/index.js



[INFO] Connecting to Ethereum mainnet...
[INFO] Monitoring ETH/USDC across Uniswap and SushiSwap...
[FOUND] Buy 1 ETH on Uniswap at $1,735, sell on SushiSwap at $1,742
[TRADE] Executed swap. Profit: 0.0034 ETH (~$6.00)

