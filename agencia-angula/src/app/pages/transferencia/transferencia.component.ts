import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  formTransferencia: FormGroup = new FormGroup({
    agenciaDestino: new FormControl('', Validators.required),
    agenciaOrigem: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required),
  });


  constructor(private contasService: ContasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  transferir(){
    const transferencia: ITransferencia = this.formTransferencia.value;
    this.contasService.transferir(transferencia).subscribe((result) => {
      Swal.fire('Sucesso!', 'Transferencia realizado com sucesso!', 'success');
      this.router.navigate(['/contas']);
      console.log(result);
    });
  }
}
