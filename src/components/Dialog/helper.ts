import { vi } from "vitest";
import { type UseWaitForTransactionReceiptReturnType } from "wagmi";

export const RECEIPT: NonNullable<UseWaitForTransactionReceiptReturnType["data"]> = {
  blockHash:
    "0xb765aa19701a385718c14106f21928aa9785798c9b7c76e9591c7d1884cc63f5",
  blockNumber: BigInt(222960295),
  chainId: 42161,
  contractAddress: null,
  cumulativeGasUsed: BigInt(598230),
  effectiveGasPrice: BigInt(10000000),
  from: "0x3eaa3aab7cd7d5893213897ba750a8ee31e90d9a",
  gasUsed: BigInt(75647),
  logs: [
    {
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      blockHash:
        "0xb765aa19701a385718c14106f21928aa9785798c9b7c76e9591c7d1884cc63f5",
      blockNumber: BigInt(222960295),
      data: "0x00000000000000000000000000000000000000000000000000005af3107a4000",
      logIndex: 7,
      removed: false,
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000003eaa3aab7cd7d5893213897ba750a8ee31e90d9a",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
      transactionHash:
        "0xcfb4196c0c84f95895a70fe44da28724068668746b84ad36de86251ab7b10910",
      transactionIndex: 3,
    },
  ],
  logsBloom:
    "0x00000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000004000000000000000000000000000000000010000000000000008000000000000000000000000000000000000000000000000020000000000000400000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000001",
  status: "success",
  to: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  transactionHash:
    "0xcfb4196c0c84f95895a70fe44da28724068668746b84ad36de86251ab7b10910",
  transactionIndex: 3,
  type: "eip1559",
};

export const mockDialogFn = () => {
  HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = false;
  });
}