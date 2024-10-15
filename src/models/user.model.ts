import { IStatus } from "./status.model";

export interface IUser {
  admissionDate?: Date;
  cpf: string;
  email: string;
  employeeName: string;
  id: number;
  status: IStatus;
}
