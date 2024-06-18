"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
  useAccount,
} from "wagmi";
import { type ChangeEvent, useEffect, useState } from "react";
import { parseAbi, parseEther } from "viem";
import ArrowButton from "@/components/Button/ArrowButton";
import TransactionStatus from "@/components/Swap/TransactionState";
import AmountInput from "@/components/Swap/AmountInput";
import SwapButton from "@/components/Button/SwapButton";
import { safeGetWethAddress } from "@/lib/config";
import { truncateTo7Digits } from "@/lib/utils";

// TODO: use the correct WETH contract ABI without parsing it
const abi = parseAbi([
  // only adding the relevant WETH contract ABI here
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address owner) view returns (uint)",
]);

// TODO: since no 0x api can be used, we will hardcode the exchange rate
const EXCHANGE_RATE = 0.9; // 1 ETH = 0.9 WETH
export default function Home() {
  const [ethAmount, setEthAmount] = useState("0.0001");
  const [wethAmount, setWethAmount] = useState("0.0001");
  const [canSwap, setCanSwap] = useState(false);
  const [isWrap, setIsWrap] = useState(false); // wrap is true, unwrap is false

  const { address: userAddress, isDisconnected: isWalletDisconnected } =
    useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const {
    data: receipt,
    isSuccess: isTransactionSuccess,
    isFetching: isFetchingTransaction,
    isError: isTransactionError,
  } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 1_000, // 1 second
  });
  const {
    data: balance,
    isFetching: isFetchingBalance,
    isSuccess: isFetchingBalanceSuccess,
    isError: isFetchingBalanceError,
  } = useBalance({
    address: userAddress,
  });

  const amountIsZero = isWrap
    ? parseEther(ethAmount) === BigInt(0)
    : parseEther(wethAmount) === BigInt(0);

  const handleEthAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9.]*$/.test(val) && val.length <= 7) {
      setEthAmount(val);
      const parsedVal = parseFloat(val);
      if (isNaN(parsedVal)) {
        setWethAmount("0");
      } else {
        setWethAmount(truncateTo7Digits(parsedVal * EXCHANGE_RATE));
      }
    }
  };

  const handleWethAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9.]*$/.test(val) && val.length <= 7) {
      setWethAmount(val);
      const parsedVal = parseFloat(val);
      if (isNaN(parsedVal)) {
        setEthAmount("0");
      } else {
        setEthAmount(truncateTo7Digits(parsedVal / EXCHANGE_RATE));
      }
    }
  };

  // will have to hardcode function name for viem to parse the function signature
  const handleWrap = () => {
    writeContract({
      abi,
      address: safeGetWethAddress(),
      functionName: "deposit",
      value: parseEther(ethAmount),
    });
  };

  const handleUnwrap = () => {
    writeContract({
      abi,
      address: safeGetWethAddress(),
      functionName: "withdraw",
      args: [parseEther(wethAmount)],
    });
  };

  useEffect(() => {
    setCanSwap(
      isFetchingBalanceSuccess &&
        (isWrap
          ? parseEther(ethAmount) < balance.value
          : parseEther(wethAmount) < balance.value) &&
        !amountIsZero
    );
  }, [
    ethAmount,
    wethAmount,
    isFetchingBalanceError,
    isFetchingBalanceSuccess,
    balance,
    amountIsZero,
    isWrap,
  ]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-between p-24 space-y-6 border-2 rounded-3xl">
        <p className="text-sm text-gray-500 mb-2">
          Click on the arrow choose which currency you want to swap to
          &#58;&#41;
        </p>
        <AmountInput
          value={ethAmount}
          onChange={handleEthAmountChange}
          disabled={!isWrap}
          currency="ETH"
        />
        <ArrowButton isWrap={isWrap} onClick={() => setIsWrap(!isWrap)} />
        <AmountInput
          value={wethAmount}
          onChange={handleWethAmountChange}
          disabled={isWrap}
          currency="WETH"
        />

        <SwapButton
          canSwap={canSwap}
          isWrap={isWrap}
          handleWrap={handleWrap}
          handleUnwrap={handleUnwrap}
          isWalletDisconnected={isWalletDisconnected}
          isFetchingBalance={isFetchingBalance}
          isFetchingBalanceError={isFetchingBalanceError}
          amountIsZero={amountIsZero}
        />

        <TransactionStatus
          isFetching={isFetchingTransaction}
          isSuccess={isTransactionSuccess}
          isError={isTransactionError}
          receipt={receipt}
          userAddress={userAddress}
        />
      </div>
    </main>
  );
}
