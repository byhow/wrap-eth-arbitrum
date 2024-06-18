import { ABI } from "@/lib/abi";
import { describe } from "vitest";

describe("ABI", () => {
  it('should be an array', () => {
    expect(Array.isArray(ABI)).toBe(true);
  });

  it('should have the correct length', () => {
    expect(ABI.length).toBe(16);
  });
})