import { ICliente } from "./cliente";

export interface IContaCad {
  id?: number;
  agencia: string;
  numero: string;
  saldo: number;
  cliente?: ICliente;
}
