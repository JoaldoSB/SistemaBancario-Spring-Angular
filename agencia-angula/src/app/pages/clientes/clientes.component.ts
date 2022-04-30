import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }
  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }
  confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja remover este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#30B5d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.remover(id).subscribe(result => {
          Swal.fire({
            title: 'Operação Finalizada!',
            text: "Cliente removido com sucesso",
            icon: 'success',
          });
          this.listarTodos();
        }, error => {
          console.error(error);
        });
      }
    })
  }
}
