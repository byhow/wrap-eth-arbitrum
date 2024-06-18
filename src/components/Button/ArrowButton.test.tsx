// ArrowButton.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import ArrowButton from "./ArrowButton";
import { describe, vi, expect, it } from "vitest";

describe("ArrowButton", () => {
  it("renders arrow down icon when isWrap is true", async () => {
    render(<ArrowButton isWrap={true} onClick={() => {}} />);
    const arrowDownIcon = await screen.findByTestId("arrow-icon-down");
    expect(arrowDownIcon).toBeInTheDocument();
  });

  it("renders arrow up icon when isWrap is false", async () => {
    render(<ArrowButton isWrap={false} onClick={() => {}} />);
    const arrowUpIcon = await screen.findByTestId("arrow-icon-up");
    expect(arrowUpIcon).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ArrowButton isWrap={true} onClick={onClick} />
    );

    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
