import { HashRouter, useHistory } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { SearchBar, SearchBarProps } from "..";
import userEvent from "@testing-library/user-event";
import routes from "~/router/routes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

const SearchBarComponent = (props: SearchBarProps) => (
  <HashRouter>
    <SearchBar {...props} />
  </HashRouter>
);

describe("Searchbar", () => {
  it("should render the searchbar", () => {
    render(<SearchBarComponent onSearch={jest.fn()} />);
    expect(
      screen.getByPlaceholderText("Digite um CPF válido")
    ).toBeInTheDocument();
  });

  it("sould call history when click on back Nova Admissão", async () => {
    const historyMock = { push: jest.fn() };
    (useHistory as jest.Mock).mockReturnValue(historyMock);

    render(<SearchBarComponent onSearch={jest.fn()} />);

    const newButton = screen.getByText("Nova Admissão");
    await userEvent.click(newButton);

    expect(historyMock.push).toHaveBeenCalledWith(routes.newUser);
  });

  it("should call onSearch when user types a valid cpf", () => {
    const onSearch = jest.fn();
    render(<SearchBarComponent onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Digite um CPF válido");
    userEvent.type(input, "123.456.789-00");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
