import { render, screen } from "@testing-library/react";
import { ConfirmModal } from "..";

describe("ConfirmModal", () => {
  it("should render the ConfirmModal", () => {
    render(
      <ConfirmModal
        isOpen
        message="Are you sure?"
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should not render the ConfirmModal", () => {
    render(
      <ConfirmModal
        isOpen={false}
        message="Are you sure?"
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />
    );
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  it("should call onCancel and onConfirm", () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    render(
      <ConfirmModal
        isOpen
        message="Are you sure?"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
    screen.getByRole("button", { name: /cancelar/i }).click();
    screen.getByRole("button", { name: /confirmar/i }).click();
    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalled();
  });
});
