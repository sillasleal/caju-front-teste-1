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
