import { describe, expect, it } from "vitest";

const mockFunction = () => {
  return "mockTest";
};

describe("Mock function", () => {
  it("shuould be a function", () => {
    expect(typeof mockFunction).toBe("function");
  });

  it("should return mockTest string", () => {
    expect(mockFunction()).toBe("mockTest");
  });
});