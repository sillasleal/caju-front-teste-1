import { formatCPF } from "../format";

describe("format", () => {
  it("should format a number as a CPF", () => {
    expect(formatCPF("12345678909")).toBe("123.456.789-09");
  });
});
