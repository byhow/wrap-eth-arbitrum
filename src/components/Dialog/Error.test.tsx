import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorDialog } from "./Error";
import "@testing-library/jest-dom";
import { mockDialogFn, RECEIPT } from "./helper";

describe("ErrorDialog", () => {
  beforeAll(mockDialogFn);
  const ADDRESS = "0x2cc017e8cd08a2f949fc0a1903ea21a8387f2834";

  it("should show the dialog when open is true", () => {
    render(<ErrorDialog open={true} address={ADDRESS} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();
  });

  it("should close the dialog when open is false", () => {
    render(<ErrorDialog open={false} address={ADDRESS} />);

    const dialog = screen.queryByRole("dialog");
    // Note: closed dialog might not be in the DOM, hence using queryByRole
    expect(dialog).toBe(null);
  });

  it("should contain the transaction link with the correct URL", () => {
    render(<ErrorDialog open={true} address={ADDRESS} />);

    const link = screen.getByText(/Arbitrum Scan/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `https://arbiscan.io/address/${ADDRESS}`
    );
  });

  it("should close the dialog when the Close button is clicked", () => {
    render(<ErrorDialog open={true} address={ADDRESS} />);

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBe(null);
  });
});
