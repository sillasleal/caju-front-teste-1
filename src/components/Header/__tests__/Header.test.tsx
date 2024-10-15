import { render, waitFor } from "@testing-library/react";
import { Header } from "..";

describe("Header", () => {
  it("should render the header with the loading animagion", () => {
    const { container } = render(<Header loading />);
    const header = container.querySelector("header");
    const loadingBar = container.querySelector("header::after");
    waitFor(() => {
      expect(header).toBeInTheDocument();
      expect(loadingBar).toBeInTheDocument();
    });
  });
});
