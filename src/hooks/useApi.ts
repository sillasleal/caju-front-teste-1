import { useState } from "react";
import { IStatus } from "~/models/status.model";
import { IUser } from "~/models/user.model";

export const apiBaseURL = "http://localhost:3000";

const useApi = () => {
  const [loading, setLoading] = useState(false);

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
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  return { loading, saveUser, getUsers, updateUser, deleteUser };
};

export default useApi;