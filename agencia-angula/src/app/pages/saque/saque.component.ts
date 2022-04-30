import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  formSaque: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required),
  });

  constructor(private contasService: ContasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  sacar(){
    const saque: IDepositoSaque = this.formSaque.value;
    this.contasService.sacar(saque).subscribe((result) => {
      Swal.fire('Sucesso!', 'Saque realizado com sucesso!', 'success');
      this.router.navigate(['/contas']);
      console.log(result);
    });
  }
}
