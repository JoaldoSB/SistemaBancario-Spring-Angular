import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  api = environment.api;
  endpoint = 'clientes';
  constructor(private http: HttpClient) { }

  listarTodosClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}/`);
  }

  cadastrar(cliente: ICliente) {
    if (cliente.id){
      return this.http.put(`${this.api}/${this.endpoint}/${cliente.id}`, cliente);
    }
    return this.http.post(`${this.api}/${this.endpoint}/`, cliente);
  }

  remover(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarPorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarPorCPF(cpf: string) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/buscarPorCpf/${cpf}`);
  }

}
