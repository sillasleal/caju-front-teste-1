import { IStatus } from "./status.model";

export interface IUser {
  admissionDate: string;
  cpf: string;
  email: string;
  employeeName: string;
  id: string;
  status: IStatus;
}
