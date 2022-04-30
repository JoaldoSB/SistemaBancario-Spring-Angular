import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  formDeposito: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required),
  });

  constructor(private contasService: ContasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  depositar(){
    const deposito: IDepositoSaque = this.formDeposito.value;
    this.contasService.depositar(deposito).subscribe((result) => {
      Swal.fire('Sucesso!', 'Depósito realizado com sucesso!', 'success');
      this.router.navigate(['/contas']);
      console.log(result);
    });
  }
}
