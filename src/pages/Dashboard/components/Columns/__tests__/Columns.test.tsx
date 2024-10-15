import { render, screen } from "@testing-library/react";
import Columns from "..";
import { IStatus } from "~/models/status.model";

describe("Columns", () => {
  it("should render the columns with registrations", () => {
    render(
      <Columns
        registrations={[
          {
            employeeName: "John Doe",
            cpf: "123.456.789-00",
            status: IStatus.APPROVED,
            id: 1,
            email: "test@test.com",
          },
        ]}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
  });
});
