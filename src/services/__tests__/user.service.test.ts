import { IStatus } from "~/models/status.model";
import { apiBaseURL, deleteUser, getUsers, saveUser, updateUser } from "../user.service";

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

  it("should get users", async () => {
    const users = [
      {
        id: 1,
        employeeName: "Test User",
        email: "test@test.com",
        cpf: "123.456.789-00",
        admissionDate: new Date(),
        status: IStatus.REVIEW,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => users,
    });

    const response = await getUsers();
    expect(response).toEqual(users);

    expect(global.fetch).toHaveBeenCalledWith(`${apiBaseURL}/registrations`);
  });

  it("should get users by cpf", async () => {
    const users = [
      {
        id: 1,
        employeeName: "Test User",
        email: "test@test.com",
        cpf: "123.456.789-00",
        admissionDate: new Date(),
        status: IStatus.REVIEW,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => users,
    });

    const response = await getUsers("123.456.789-00");
    expect(response).toEqual(users);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiBaseURL}/registrations?cpf=123.456.789-00`
    );
  });

  it("should update a user", async () => {
    const user = {
      id: "1",
      employeeName: "Test User",
      email: "test@test.com",
      cpf: "123.456.789-00",
      admissionDate: new Date(),
      status: IStatus.REVIEW,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    const response = await updateUser(user);
    expect(response).toEqual(user);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiBaseURL}/registrations/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
  });

  it("should delete a user", async () => {
    const id = "1";

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => id,
    });

    const response = await deleteUser(id);
    expect(response).toEqual(id);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiBaseURL}/registrations/${id}`,
      {
        method: "DELETE",
      }
    );
  });
});
