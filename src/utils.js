const { ethers } = require("ethers");

// Get Uniswap pair address using CREATE2
function getPairAddress(tokenA, tokenB, factoryAddress, initCodeHash) {
  const [token0, token1] =
    tokenA.toLowerCase() < tokenB.toLowerCase()
      ? [tokenA, tokenB]
      : [tokenB, tokenA];

  const salt = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(["address", "address"], [token0, token1])
  );

  return ethers.getCreate2Address(factoryAddress, salt, initCodeHash);
}

module.exports = { getPairAddress };
