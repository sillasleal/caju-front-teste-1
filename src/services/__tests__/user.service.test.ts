import { IStatus } from "~/models/status.model";
import { apiBaseURL, saveUser } from "../user.service";

describe("user.service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should save a user", async () => {
    const user = {
      id: 1,
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: new Date(),
      status: IStatus.REVIEW,
    };

    // Mock da resposta do fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    const response = await saveUser(user);
    expect(response).toEqual(user);

    // Verifica se o fetch foi chamado com os parâmetros corretos
    expect(global.fetch).toHaveBeenCalledWith(`${apiBaseURL}/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  });
});