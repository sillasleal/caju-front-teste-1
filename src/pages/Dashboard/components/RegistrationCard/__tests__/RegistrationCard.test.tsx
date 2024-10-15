import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import RegistrationCard, { RegistrationCardProps } from "..";
import { IStatus } from "~/models/status.model";
import LoadingProvider from "~/providers/loading.provider";

const RegistrationCardTest = (props: RegistrationCardProps) => (
  <LoadingProvider>
    <RegistrationCard {...props} />
  </LoadingProvider>
);

describe("RegistrationCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update the user status", async () => {
    const user = {
      id: "1",
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: "",
      status: IStatus.REVIEW,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    const updateUserMock = jest.fn();

    await act(async () => {
      render(<RegistrationCardTest data={user} onUpdate={updateUserMock} />);
    });

    const approveButton = screen.getByText("Aprovar");
    userEvent.click(approveButton);

    waitFor(() => {
      expect(updateUserMock).toHaveBeenCalled();
    });
  });

  it("should delete the user", async () => {
    const user = {
      id: "1",
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: "",
      status: IStatus.REVIEW,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    const updateUserMock = jest.fn();

    await act(async () => {
      render(<RegistrationCardTest data={user} onUpdate={updateUserMock} />);
    });

    const deleteButton = screen.getByLabelText("delete");
    userEvent.click(deleteButton);

    waitFor(() => {
      expect(updateUserMock).toHaveBeenCalled();
    });
  });

  it("should show the buttons according to the user status, REVIEW", () => {
    const user = {
      id: "1",
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: "",
      status: IStatus.REVIEW,
    };

    render(<RegistrationCardTest data={user} onUpdate={jest.fn()} />);
    const approveButton = screen.queryByText("Aprovar");
    const disapproveButton = screen.queryByText("Reprovar");
    const reviewButton = screen.queryByText("Revisar novamente");

    expect(approveButton).toBeInTheDocument();
    expect(disapproveButton).toBeInTheDocument();
    expect(reviewButton).not.toBeInTheDocument();
  });

  it("should show the buttons according to the user status, APPROVED", () => {
    const user = {
      id: "1",
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: "",
      status: IStatus.APPROVED,
    };

    render(<RegistrationCardTest data={user} onUpdate={jest.fn()} />);
    const approveButton = screen.queryByText("Aprovar");
    const disapproveButton = screen.queryByText("Reprovar");
    const reviewButton = screen.queryByText("Revisar novamente");

    expect(approveButton).not.toBeInTheDocument();
    expect(disapproveButton).not.toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });
});
