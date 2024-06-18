import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, expect, it } from "vitest";
import AmountInput from "./AmountInput";

describe("AmountInput", () => {
  it("renders the input field with the correct placeholder", () => {
    render(<AmountInput value="" onChange={() => {}} currency="USD" />);
    const inputElement = screen.getByPlaceholderText("Amount in USD");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the input field with the provided value", () => {
    render(<AmountInput value="10" onChange={() => {}} currency="USD" />);
    const inputElement = screen.getByDisplayValue("10");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange callback when the input value changes", () => {
    const handleChange = vi.fn();
    render(<AmountInput value="" onChange={handleChange} currency="USD" />);
    const inputElement = screen.getByPlaceholderText("Amount in USD");
    fireEvent.change(inputElement, { target: { value: "20" } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("disables the input field when disabled prop is true", () => {
    render(
      <AmountInput value="" onChange={() => {}} currency="USD" disabled />
    );
    const inputElement = screen.getByPlaceholderText("Amount in USD");
    expect(inputElement).toBeDisabled();
  });

  it("renders the currency symbol next to the input field", () => {
    render(<AmountInput value="" onChange={() => {}} currency="USD" />);
    const currencyElement = screen.getByText("USD");
    expect(currencyElement).toBeInTheDocument();
  });
});
