import { render, screen } from "@testing-library/react";
import TransactionStatus from "./TransactionState";
import { describe, expect, it } from "vitest";
import { mockDialogFn } from "../Dialog/helper";

describe("TransactionStatus", () => {
  beforeAll(mockDialogFn);
  it("renders waiting message when isFetching is true", () => {
    render(
      <TransactionStatus
        isFetching={true}
        isSuccess={false}
        isError={false}
        receipt={null}
      />
    );
    expect(
      screen.getByText("Waiting for transaction to be confirmed...")
    ).toBeInTheDocument();
  });

  it("renders SuccessDialog when isSuccess is true", () => {
    render(
      <TransactionStatus
        isFetching={false}
        isSuccess={true}
        isError={false}
        receipt={{}}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders ErrorDialog when isError is true", () => {
    render(
      <TransactionStatus
        isFetching={false}
        isSuccess={false}
        isError={true}
        receipt={null}
        userAddress="0x123"
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders nothing when isFetching, isSuccess, and isError are all false", () => {
    const { container } = render(
      <TransactionStatus
        isFetching={false}
        isSuccess={false}
        isError={false}
        receipt={null}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
