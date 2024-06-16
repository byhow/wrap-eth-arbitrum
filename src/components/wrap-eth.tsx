// components/WrapEth.tsx
"use client";

import { useSendTransaction, useWriteContract } from "wagmi";
import { useState } from "react";
import { parseAbi, parseEther } from "viem";
import Link from "next/link";
import { write } from "fs";

const abi = parseAbi([
  // only adding the relevant WETH contract ABI here
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address owner) view returns (uint)",
]);

const address =
  (process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS as `0x{string}`) ||
  "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";

const WrapEth = () => {
  // const { data } = useSimulateContract({
  //   abi: parseAbi(WETH_ABI),
  //   address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  //   functionName: "balanceOf",
  //   args: ["0x3eAa3AaB7Cd7d5893213897bA750A8ee31E90d9a"],
  // });
  const [amount, setAmount] = useState("0.0001");
  const { data: wrapHash } = useSendTransaction();
  const { writeContract, data: unwrapHash } = useWriteContract();

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
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 p-2 w-48 rounded-md"
      />
      <button
        onClick={handleWrap}
        className="border border-gray-300 p-2 rounded-md"
      >
        Wrap
      </button>
      <button
        onClick={handleUnwrap}
        className="border border-gray-300 p-2 rounded-md"
      >
        Unwrap
      </button>
      {wrapHash && (
        <div>
          View wrapped transaction on{" "}
          <Link
            href={`https://arbiscan.io/tx/${wrapHash}`}
            className="hover:text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arbitrum Scan
          </Link>
        </div>
      )}
      {unwrapHash && (
        <div>
          View wrapped transaction on{" "}
          <Link
            href={`https://arbiscan.io/tx/${unwrapHash}`}
            className="hover:text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arbitrum Scan
          </Link>
        </div>
      )}
    </div>
  );
};

export default WrapEth;
