"use client";
import React, { ChangeEvent, useState } from "react";

const TokenSwap = () => {
  const [isEthToWeth, setIsEthToWeth] = useState(true);
  const [amount, setAmount] = useState("");

  const handleSwapDirection = () => {
    setIsEthToWeth(!isEthToWeth);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl mb-6">Swap</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <label className="mb-2">Sell</label>
            <input
              type="number"
              value={isEthToWeth ? amount : ""}
              onChange={handleAmountChange}
              className="w-24 p-2 mb-2 text-black"
              placeholder="Enter ETH amount"
            />
            <span className="text-xl">ETH</span>
          </div>
          <button
            className="text-2xl cursor-pointer transform transition-transform hover:scale-110"
            onClick={handleSwapDirection}
          >
            ⇅
          </button>
          <div className="flex flex-col items-center">
            <label className="mb-2">Buy</label>
            <input
              type="number"
              value={!isEthToWeth ? amount : ""}
              onChange={handleAmountChange}
              className="w-24 p-2 mb-2 text-black"
              placeholder="Enter WETH amount"
            />
            <span className="text-xl">WETH</span>
          </div>
        </div>
        <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">
          {isEthToWeth ? "Wrap" : "Unwrap"}
        </button>
      </div>
    </div>
  );
};

export default TokenSwap;
