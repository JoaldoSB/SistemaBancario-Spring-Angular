import { Component, OnInit } from '@angular/core';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  agencia: string = "";
  conta: string = "";
  dataInicio = "";
  dataFinal = "";
  extrato: IExtrato[] = [];

  constructor(private contaSevice: ContasService) { }


  ngOnInit(): void {
    this.OpExtrair();
  }

  OpExtrair() {
    this.contaSevice.OpExtrair(this.agencia, this.conta, this.dataInicio, this.dataFinal).subscribe((result: IExtrato[]) => {
      this.extrato = result;
    })
  }

}
