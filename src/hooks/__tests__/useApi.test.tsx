import { renderHook } from "@testing-library/react";
import LoadingProvider from "~/providers/loading.provider";
import useApi from "../useApi";
import { IStatus } from "~/models/status.model";
import { act } from "react";

const userMock = {
  id: "1",
  employeeName: "Test User",
  email: "test@test.com",
  cpf: "123.456.789-00",
  admissionDate: "2021-09-01",
  status: IStatus.REVIEW,
};

describe("useApi", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call getUsers and return a list of users", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [userMock],
    });
    const { result } = renderHook(() => useApi(), {
      wrapper: LoadingProvider,
    });
    await act(async () => {
      const users = await result.current.getUsers();
      expect(users).toEqual([userMock]);
    });
  });
  it("should call saveUser and return the saved user", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => userMock,
    });
    const { result } = renderHook(() => useApi(), {
      wrapper: LoadingProvider,
    });
    await act(async () => {
      const savedUser = await result.current.saveUser(userMock);
      expect(savedUser).toEqual(userMock);
    });
  });

  it("should call updateUser and return the updated user", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => userMock,
    });
    const { result } = renderHook(() => useApi(), {
      wrapper: LoadingProvider,
    });

    await act(async () => {
      const updatedUser = await result.current.updateUser(userMock);
      expect(updatedUser).toEqual(userMock);
    });
  });

  it("should call deleteUser and return the deleted user", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => userMock,
    });
    const { result } = renderHook(() => useApi(), {
      wrapper: LoadingProvider,
    });
    await act(async () => {
      const deletedUser = await result.current.deleteUser(userMock.id);
      expect(deletedUser).toEqual(userMock);
    });
  });
});
