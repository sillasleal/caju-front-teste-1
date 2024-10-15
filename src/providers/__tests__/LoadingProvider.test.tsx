import { renderHook } from "@testing-library/react";
import LoadingProvider, { LoadingContext } from "../loading.provider";
import { act, useContext } from "react";

describe("LoadingProvider", () => {
  it("should change the loading state", () => {
    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper: LoadingProvider,
    });
    expect(result.current.loading).toBe(false);
    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.loading).toBe(true);
  });
});
