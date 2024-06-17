// components/WrapEth.tsx
"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
  useAccount,
} from "wagmi";
import { useState } from "react";
import { parseAbi, parseEther } from "viem";

import { isNonNullAddress } from "@/lib/utils";
import { SuccessDialog } from "@/components/Dialog/Success";

// TODO: use the correct WETH contract ABI without parsing it
const abi = parseAbi([
  // only adding the relevant WETH contract ABI here
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address owner) view returns (uint)",
]);

const WETH_ADDRESS = process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS;

const address = isNonNullAddress(WETH_ADDRESS)
  ? WETH_ADDRESS
  : "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"; // hardcoded WETH contract address

const WrapEth = () => {
  const [amount, setAmount] = useState("0.0001");
  const { address: userAddress } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const {
    data: receipt,
    isSuccess,
    isFetching,
  } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 1_000, // 1 second
  });
  const [isWrap, setIsWrap] = useState(false); // wrap is true, unwrap is false
  const arrow = isWrap ? "↓" : "↑";
  const {
    data: balance,
    isSuccess: isFetchingBalanceSuccess,
    isError: isFetchingBalanceError,
  } = useBalance({
    address: userAddress,
  });

  const canSwap =
    isFetchingBalanceError ||
    (isFetchingBalanceSuccess && parseEther(amount) > balance.value);

  // will have to hardcode function name for viem to parse the function signature
  const handleWrap = () => {
    writeContract({
      abi,
      address,
      functionName: "deposit",
      value: parseEther(amount),
    });
  };

  const handleUnwrap = () => {
    writeContract({
      abi,
      address,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
  };

  return (
    <div className="flex flex-col items-center justify-between p-24 space-y-4">
      <div>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 w-24 rounded-md mr-4"
        />
        ETH
      </div>

      <button
        onClick={() => setIsWrap(!isWrap)}
        className="border border-gray-300 p-2 rounded-md"
      >
        {arrow}
      </button>
      <div className="flex-row">
        <input
          type="text"
          placeholder="Amount in WETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 w-24 rounded-md mr-4"
        />
        WETH
      </div>
      <button
        onClick={isWrap ? handleWrap : handleUnwrap}
        className={`border border-gray-300 p-2 rounded-md ${
          canSwap ? "text-grey-300" : "text-black"
        }`}
        disabled={canSwap}
      >
        Swap
      </button>

      {isFetching && ( // TODO: decouple this loading and waiting for transaction receipt logic into a separate component
        <p>Waiting for transaction to be confirmed...</p>
      )}

      <SuccessDialog open={isSuccess} receipt={receipt} />
    </div>
  );
};

export default WrapEth;
