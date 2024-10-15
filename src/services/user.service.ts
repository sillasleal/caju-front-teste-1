import { IStatus } from "~/models/status.model";
import { IUser } from "~/models/user.model";

export const apiBaseURL = "http://localhost:3000";

export const saveUser = async (user: IUser) =>
  await fetch(`${apiBaseURL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, status: IStatus.REVIEW }),
  }).then((j) => j.json());

export const getUsers = async (cpf?: string) => {
  const url = new URL(`${apiBaseURL}/registrations`);
  if (cpf) {
    url.searchParams.append("cpf", cpf);
  }

  return await fetch(url.toString()).then((j) => j.json());
};

export const updateUser = async (user: IUser) =>
  await fetch(`${apiBaseURL}/registrations/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((j) => j.json());

export const deleteUser = async (id: string) =>
  await fetch(`${apiBaseURL}/registrations/${id}`, {
    method: "DELETE",
  }).then((j) => j.json());
