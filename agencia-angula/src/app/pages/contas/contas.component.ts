import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contaService: ContasService) { }
  contas: IConta[] = []

  ngOnInit(): void {
    this.listarTodas();
  }

  listarTodas(){
    this.contaService.listarTodasContas().subscribe((result: IConta[]) => {
      this.contas = result;
      console.log(this.contas);
    });
  }
  confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja encerrar esta conta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#30B5d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contaService.remover(id).subscribe(result => {
          Swal.fire({
            title: 'Operação Finalizada!',
            text: "Conta Encerrada com sucesso",
            icon: 'success',
          });
          this.listarTodas();
        }, error => {
          console.error(error);
        });
      }
    })
  }
}
