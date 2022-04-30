import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';
import { IConta } from '../interfaces/conta';
import { IContaCad } from '../interfaces/contaCad';
import { IDepositoSaque } from '../interfaces/deposito-saque';
import { IExtrato } from '../interfaces/extrato';
import { ITransferencia } from '../interfaces/transferencia';



@Injectable({
  providedIn: 'root'
})
export class ContasService {
  api = environment.api;
  endpoint = 'contas';

  constructor(private http: HttpClient) { }

  listarTodasContas() {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/`);
  }

  cadastrarConta(conta: IContaCad) {
    if (conta.id){
      return this.http.put(`${this.api}/${this.endpoint}/${conta.id}`, conta);
    }
    return this.http.post(`${this.api}/${this.endpoint}/`, conta);
  }

  atualizarConta(conta: IConta) {
    return this.http.put(`${this.api}/${conta.id}/`, conta);
}

  buscarContaPorId(id: number): Observable<IConta> {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarClientePorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`);
  }

  remover(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  depositar(deposito: IDepositoSaque) {
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, deposito);
  }

  sacar(sacar: IDepositoSaque) {
    return this.http.put(`${this.api}/${this.endpoint}/saque`, sacar);
  }

  transferir(transferir: ITransferencia) {
    return this.http.put(`${this.api}/${this.endpoint}/transferencia`, transferir);
  }

  OpExtrair(agencia: string, conta: string, dataInicio: string, dataFinal: string): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/operacoes/buscarExtratoPorConta`)
  }


}
