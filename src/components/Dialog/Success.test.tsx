import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SuccessDialog from "./Success";
import "@testing-library/jest-dom";
import { RECEIPT } from "./helper";

describe("SuccessDialog", () => {
  beforeAll(() => {
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
  });

  it("should show the dialog when open is true", () => {
    render(<SuccessDialog open={true} receipt={RECEIPT} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();
  });

  it("should close the dialog when open is false", () => {
    render(<SuccessDialog open={false} receipt={RECEIPT} />);

    const dialog = screen.queryByRole("dialog");
    // Note: closed dialog might not be in the DOM, hence using queryByRole
    expect(dialog).toBe(null);
  });

  it("should contain the transaction link with the correct URL", () => {
    render(<SuccessDialog open={true} receipt={RECEIPT} />);

    const link = screen.getByText(/Arbitrum Scan/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `https://arbiscan.io/tx/${RECEIPT.transactionHash}`
    );
  });

  it("should close the dialog when the Close button is clicked", () => {
    render(<SuccessDialog open={true} receipt={RECEIPT} />);

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBe(null);
  });
});
