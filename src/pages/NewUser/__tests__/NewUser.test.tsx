import { HashRouter, useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import NewUser from "..";
import { act } from "react";
import routes from "~/router/routes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

describe("NewUser", () => {
  it("should render", () => {
    render(
      <HashRouter>
        <NewUser />
      </HashRouter>
    );
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Data de admissão")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("sould call history when click on back button", async () => {
    const historyMock = { push: jest.fn() };
    (useHistory as jest.Mock).mockReturnValue(historyMock);

    act(() => {
      render(
        <HashRouter>
          <NewUser />
        </HashRouter>
      );
    });

    const backButton = screen.getByLabelText("back");
    await userEvent.click(backButton);

    expect(historyMock.push).toHaveBeenCalledWith(routes.dashboard);
  });

  describe("Email validation", () => {
    it("should show a error message when email is empty", async () => {
      render(
        <HashRouter>
          <NewUser />
        </HashRouter>
      );

      userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Email obrigatório")).toBeInTheDocument();
    });

    it("should show error message when email is invalid", async () => {
      render(
        <HashRouter>
          <NewUser />
        </HashRouter>
      );

      const emailInput = screen.getByLabelText("Email");
      userEvent.type(emailInput, "invalid-email");
      userEvent.click(screen.getByText("Cadastrar"));

      expect(await screen.findByText("Email inválido")).toBeInTheDocument();
    });

    it("should not show error message when email is valid", async () => {
      render(
        <HashRouter>
          <NewUser />
        </HashRouter>
      );

      const emailInput = screen.getByLabelText("Email");
      userEvent.type(emailInput, "test@test.com");
      userEvent.click(screen.getByText("Cadastrar"));

      expect(
        await screen.queryByText("Email inválido")
      ).not.toBeInTheDocument();
    });
  });
});
