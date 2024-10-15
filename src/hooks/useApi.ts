import { useContext, useState } from "react";
import { IStatus } from "~/models/status.model";
import { IUser } from "~/models/user.model";
import { LoadingContext } from "~/providers/loading.provider";

export const apiBaseURL = "http://localhost:3000";

const useApi = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  const saveUser = async (user: IUser) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseURL}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, status: IStatus.REVIEW }),
      });
      // adiciona um delay de 2 segundos para simular o tempo do request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async (cpf?: string) => {
    setLoading(true);
    try {
      const url = new URL(`${apiBaseURL}/registrations`);
      if (cpf) {
        url.searchParams.append("cpf", cpf);
      }
      const response = await fetch(url.toString());
      // adiciona um delay de 2 segundos para simular o tempo do request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (user: IUser) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseURL}/registrations/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // adiciona um delay de 2 segundos para simular o tempo do request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseURL}/registrations/${id}`, {
        method: "DELETE",
      });
      // adiciona um delay de 2 segundos para simular o tempo do request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  return { loading, saveUser, getUsers, updateUser, deleteUser };
};

export default useApi;
