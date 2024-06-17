// components/WrapEth.tsx
"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
  useAccount,
} from "wagmi";
import { type ChangeEvent, useEffect, useState } from "react";
import { parseAbi, parseEther } from "viem";
import { Icon } from "@iconify/react"; // FIXME: use actual icons locally. iconify only works client side
import { isNonNullAddress } from "@/lib/utils";
import { SuccessDialog } from "@/components/Dialog/Success";
import cn from "classnames";
import { ErrorDialog } from "@/components/Dialog/Error";

// TODO: use the correct WETH contract ABI without parsing it
const abi = parseAbi([
  // only adding the relevant WETH contract ABI here
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address owner) view returns (uint)",
]);

// TODO: since no 0x api can be used, we will hardcode the exchange rate
const EXCHANGE_RATE = 0.9; // 1 ETH = 0.9 WETH

const WETH_ADDRESS = process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS;

const address = isNonNullAddress(WETH_ADDRESS)
  ? WETH_ADDRESS
  : "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"; // hardcoded WETH contract address

const WrapEth = () => {
  const [ethAmount, setEthAmount] = useState("0.0001");
  const [wethAmount, setWethAmount] = useState("0.0001");

  const { address: userAddress, isDisconnected } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const {
    data: receipt,
    isSuccess,
    isFetching,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 1_000, // 1 second
  });
  const [isWrap, setIsWrap] = useState(false); // wrap is true, unwrap is false
  const amountIsZero = isWrap
    ? parseEther(ethAmount) === BigInt(0)
    : parseEther(wethAmount) === BigInt(0);

  const {
    data: balance,
    isFetching: isFetchingBalance,
    isSuccess: isFetchingBalanceSuccess,
    isError: isFetchingBalanceError,
  } = useBalance({
    address: userAddress,
  });

  const [canSwap, setCanSwap] = useState(false);

  const truncateTo7Digits = (num: number) => {
    let str = num.toString();
    if (str.length > 7) {
      const decimalIndex = str.indexOf(".");
      const decimalPlaces =
        decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
      const totalPlaces = 7;
      const placesAfterDecimal = Math.max(
        0,
        totalPlaces - (str.length - decimalPlaces)
      );
      str = num.toFixed(placesAfterDecimal);
    }
    str = parseFloat(str).toString();
    return str;
  };

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

  // will have to hardcode function name for viem to parse the function signature
  const handleWrap = () => {
    writeContract({
      abi,
      address,
      functionName: "deposit",
      value: parseEther(ethAmount),
    });
  };

  const handleUnwrap = () => {
    writeContract({
      abi,
      address,
      functionName: "withdraw",
      args: [parseEther(wethAmount)],
    });
  };

  return (
    <div className="flex flex-col items-center justify-between p-24 space-y-6 border-2 rounded-3xl">
      <p className="text-sm text-gray-500 mb-2">
        Click on the arrow choose which currency you want to swap to &#58;&#41;
      </p>
      <div className="relative">
        <input
          type="text"
          placeholder="Amount in ETH"
          value={ethAmount}
          onChange={handleEthAmountChange}
          className={cn("border border-gray-300 p-2 rounded-md pr-8", {
            "bg-gray-100": !isWrap,
          })} // Added pr-8 to make room for the ETH string
          disabled={!isWrap}
        />
        <span className="absolute inset-y-0 right-2 flex items-center text-sm">
          ETH
        </span>
      </div>

      <button
        onClick={() => setIsWrap(!isWrap)}
        className="border border-gray-300 rounded-3xl p-1"
      >
        {isWrap ? (
          <Icon icon="mdi:arrow-down" className="text-3xl" />
        ) : (
          <Icon icon="mdi:arrow-up" className="text-3xl" />
        )}
      </button>

      <div className="relative">
        <input
          type="text"
          placeholder="Amount in WETH"
          value={wethAmount}
          onChange={handleWethAmountChange}
          className={cn("border border-gray-300 p-2 rounded-md pr-8", {
            "bg-gray-100": isWrap,
          })} // Added pr-8 to make room for the WETH string
          disabled={isWrap}
        />
        <span className="absolute inset-y-0 right-2 flex items-center text-sm">
          WETH
        </span>
      </div>

      <button
        onClick={isWrap ? handleWrap : handleUnwrap}
        className={cn(
          "transition duration-500 ease-in-out delay-150 border border-gray-300 p-3 rounded-3xl w-full",
          {
            "text-white": canSwap,
            "bg-black": canSwap,
            "text-black": !canSwap,
            "bg-gray-100": !canSwap,
          }
        )}
        disabled={
          !canSwap ||
          amountIsZero ||
          isFetchingBalance ||
          isFetchingBalanceError
        }
      >
        {isDisconnected
          ? "Please Connect Wallet"
          : isFetchingBalance
          ? "Loading"
          : amountIsZero
          ? "Enter Amount..."
          : canSwap
          ? isWrap
            ? "Wrap"
            : "Unwrap"
          : "Insufficient Balance"}
      </button>

      {isFetching && ( // TODO: decouple this loading and waiting for transaction receipt logic into a separate component
        <p>Waiting for transaction to be confirmed...</p>
      )}

      {isSuccess && <SuccessDialog open={isSuccess} receipt={receipt} />}
      {isError && <ErrorDialog open={isError} address={userAddress} />}
    </div>
  );
};

export default WrapEth;
