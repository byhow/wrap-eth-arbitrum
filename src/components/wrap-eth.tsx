// components/WrapEth.tsx
"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { parseAbi, parseEther } from "viem";
import Link from "next/link";
import { isNonNullAddress } from "@/lib/utils";
import { SuccessDialog } from "@/components/success-dialog";

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
  const { writeContract, data: hash } = useWriteContract();
  const { data: receipt, status } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 1_000, // 1 second
  });

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
      {hash && ( // TODO: decouple this loading and waiting for transaction receipt logic into a separate component
        <div>
          View transaction on{" "}
          <Link
            href={`https://arbiscan.io/tx/${hash}`}
            className="hover:text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arbitrum Scan
          </Link>
        </div>
      )}
      <SuccessDialog open={status === "success"} />
    </div>
  );
};

export default WrapEth;
