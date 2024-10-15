import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import RegistrationCard from "..";
import { IStatus } from "~/models/status.model";
import { updateUser, deleteUser } from "~/services/user.service";

jest.mock("~/services/user.service");

describe("RegistrationCard", () => {
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

    (updateUser as jest.Mock).mockResolvedValueOnce(user);

    const updateUserMock = jest.fn();

    await act(async () => {
      render(<RegistrationCard data={user} onUpdate={updateUserMock} />);
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

    (deleteUser as jest.Mock).mockResolvedValueOnce(user);

    const updateUserMock = jest.fn();

    await act(async () => {
      render(<RegistrationCard data={user} onUpdate={updateUserMock} />);
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

    render(<RegistrationCard data={user} onUpdate={jest.fn()} />);
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

    render(<RegistrationCard data={user} onUpdate={jest.fn()} />);
    const approveButton = screen.queryByText("Aprovar");
    const disapproveButton = screen.queryByText("Reprovar");
    const reviewButton = screen.queryByText("Revisar novamente");

    expect(approveButton).not.toBeInTheDocument();
    expect(disapproveButton).not.toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });
});
