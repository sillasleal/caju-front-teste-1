import { HashRouter, useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import NewUser from "..";
import { act } from "react";
import routes from "~/router/routes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

const NewUserPage = () => (
  <HashRouter>
    <NewUser />
  </HashRouter>
);

describe("NewUser", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", () => {
    render(<NewUserPage />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Data de admissão")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("should call history when click on back button", async () => {
    const historyMock = { push: jest.fn() };
    (useHistory as jest.Mock).mockReturnValue(historyMock);

    act(() => {
      render(<NewUserPage />);
    });

    const backButton = screen.getByLabelText("back");
    await userEvent.click(backButton);

    expect(historyMock.push).toHaveBeenCalledWith(routes.dashboard);
  });

  describe("Name Validation", () => {
    it("should show a error message when name is empty", async () => {
      render(<NewUserPage />);

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Nome obrigatório")).toBeInTheDocument();
    });

    it("should show a error message when the name does not have at least 2 names", async () => {
      render(<NewUserPage />);

      const nameInput = screen.getByLabelText("Nome");
      await userEvent.type(nameInput, "Test");
      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Nome inválido")).toBeInTheDocument();
    });

    it("should show a message error when the name starts with a number", async () => {
      render(<NewUserPage />);

      const nameInput = screen.getByLabelText("Nome");
      await userEvent.type(nameInput, "1Test Test");
      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Nome inválido")).toBeInTheDocument();
    });

    it("should show a message error when one of the names has less than 2 characters", async () => {
      render(<NewUserPage />);

      const nameInput = screen.getByLabelText("Nome");
      await userEvent.type(nameInput, "Te T");
      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Nome inválido")).toBeInTheDocument();
    });

    it("should not show error message when name is valid", async () => {
      render(<NewUserPage />);

      const nameInput = screen.getByLabelText("Nome");
      await userEvent.type(nameInput, "Test Test");
      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.queryByText("Nome inválido")).not.toBeInTheDocument();
    });
  });

  describe("Email validation", () => {
    it("should show a error message when email is empty", async () => {
      render(<NewUserPage />);

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Email obrigatório")).toBeInTheDocument();
    });

    it("should show error message when email is invalid", async () => {
      render(<NewUserPage />);

      const emailInput = screen.getByLabelText("Email");
      await userEvent.type(emailInput, "invalid_email");

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Email inválido")).toBeInTheDocument();
    });

    it("should not show error message when email is valid", async () => {
      render(<NewUserPage />);

      const emailInput = screen.getByLabelText("Email");
      await userEvent.type(emailInput, "test@test.com");
      await userEvent.click(screen.getByText("Cadastrar"));

      expect(
        await screen.queryByText("Email inválido")
      ).not.toBeInTheDocument();
    });
  });

  describe("CPF validation", () => {
    it("should show a error message when cpf is empty", async () => {
      render(<NewUserPage />);

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("CPF obrigatório")).toBeInTheDocument();
    });

    it("should show a error message when cpf is invalid", async () => {
      render(<NewUserPage />);

      const cpfInput = screen.getByLabelText("CPF");
      await userEvent.type(cpfInput, "123.456.789-00");

      await userEvent.click(screen.getByText("Cadastrar"));
      expect(await screen.findByText("CPF invalido")).toBeInTheDocument();
    });

    it("should not show error message when cpf is valid", async () => {
      render(<NewUserPage />);

      const cpfInput = screen.getByLabelText("CPF");
      await userEvent.type(cpfInput, "123.456.789-09");

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.queryByText("CPF invalido")).not.toBeInTheDocument();
    });
  });

  describe("Save user", () => {
    it("should call save user when all fields are valid, after that, redirect to dashboard", async () => {
      const user = {
        employeeName: "Test Save User",
        email: "test@test.com",
        cpf: "123.456.789-09",
        admissionDate: "",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          employeeName: "Test User",
          email: "test@test.com",
          cpf: "123.456.789-00",
          admissionDate: "",
          status: "REVIEW",
        }),
      });

      const historyMock = { push: jest.fn() };
      (useHistory as jest.Mock).mockReturnValue(historyMock);

      render(<NewUserPage />);

      const nameInput = screen.getByLabelText("Nome");
      const emailInput = screen.getByLabelText("Email");
      const cpfInput = screen.getByLabelText("CPF");

      await userEvent.type(nameInput, user.employeeName);
      await userEvent.type(emailInput, user.email);
      await userEvent.type(cpfInput, user.cpf);

      await userEvent.click(screen.getByText("Cadastrar"));

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations",
        {
          body: JSON.stringify({ ...user, status: "REVIEW" }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );
      await waitFor(() => {
        expect(historyMock.push).toHaveBeenCalledWith(routes.dashboard);
      }, { timeout: 3000 });
    });
  });
});
