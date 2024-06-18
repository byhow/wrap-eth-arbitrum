import { render, fireEvent, screen } from "@testing-library/react";
import SwapButton from "./SwapButton";
import { vi, describe, it, expect } from "vitest";

describe("SwapButton", () => {
  it("renders the button with the correct text when canSwap is true and isWrap is true", () => {
    render(
      <SwapButton
        canSwap={true}
        isWrap={true}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    expect(screen.getByText("Wrap")).toBeInTheDocument();
  });

  it("renders the button with the correct text when canSwap is true and isWrap is false", () => {
    render(
      <SwapButton
        canSwap={true}
        isWrap={false}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    expect(screen.getByText("Unwrap")).toBeInTheDocument();
  });

  it("calls the correct handler when clicked and isWrap is true", () => {
    const handleWrap = vi.fn();
    render(
      <SwapButton
        canSwap={true}
        isWrap={true}
        handleWrap={handleWrap}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    fireEvent.click(screen.getByText("Wrap"));
    expect(handleWrap).toHaveBeenCalled();
  });

  it("calls the correct handler when clicked and isWrap is false", () => {
    const handleUnwrap = vi.fn();
    render(
      <SwapButton
        canSwap={true}
        isWrap={false}
        handleWrap={() => {}}
        handleUnwrap={handleUnwrap}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    fireEvent.click(screen.getByText("Unwrap"));
    expect(handleUnwrap).toHaveBeenCalled();
  });

  it("renders 'Please connect wallet' when isWalletDisconnected is true", () => {
    render(
      <SwapButton
        canSwap={false}
        isWrap={true}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={true}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    expect(screen.getByText("Please Connect Wallet")).toBeInTheDocument();
  });

  it("renders 'Enter amount' when amountIsZero is true", () => {
    render(
      <SwapButton
        canSwap={false}
        isWrap={true}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={true}
      />
    );
    expect(screen.getByText("Enter Amount...")).toBeInTheDocument();
  });

  it("renders 'Loading' when isFetchingBalance is true", () => {
    render(
      <SwapButton
        canSwap={false}
        isWrap={true}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={true}
        isFetchingBalanceError={false}
        amountIsZero={true}
      />
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders 'Insufficient Balance' when amountIsZero is true", () => {
    render(
      <SwapButton
        canSwap={false}
        isWrap={true}
        handleWrap={() => {}}
        handleUnwrap={() => {}}
        isWalletDisconnected={false}
        isFetchingBalance={false}
        isFetchingBalanceError={false}
        amountIsZero={false}
      />
    );
    expect(screen.getByText("Insufficient Balance")).toBeInTheDocument();
  });
});
