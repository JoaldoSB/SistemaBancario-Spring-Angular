import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { IContaCad } from 'src/app/interfaces/contaCad';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-cadastrar-editar',
  templateUrl: './contas-cadastrar-editar.component.html',
  styleUrls: ['./contas-cadastrar-editar.component.css']
})
export class ContasCadastrarEditarComponent implements OnInit {

  emptyConta: IContaCad = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
  }

  formConta: FormGroup = this.preencheFormGroup(this.emptyConta);
  clientes: ICliente[] = [];
  clientePorCPF: any = null;

  constructor(
    private clienteService: ClientesService,
    private contaService: ContasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const cpf = this.activatedRoute.snapshot.paramMap.get('cpf');
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.contaService.buscarContaPorId(id).subscribe((result: IContaCad) => {
        this.formConta = this.preencheFormGroup(result);
      },
        (error) => console.log(error)
      );
    }
    if (!cpf) {
      return this.buscarClientes();
    }
    this.buscarPorCpf(cpf);
  }

  buscarClientes(){
    this.clienteService.listarTodosClientes().subscribe( result => {
      this.clientes = result;
    });
  }

  buscarPorCpf(cpf: string) {
    this.clienteService.buscarPorCPF(cpf).subscribe(result => {
      this.clientePorCPF = result;
      this.formConta.get('idCliente')?.setValue(result.id);
    });
  }

  preencheFormGroup(conta: IContaCad): FormGroup {
    return new FormGroup({
      id: new FormControl(conta.id ? conta.id : null),
      agencia: new FormControl(conta.agencia ? conta.agencia : '', Validators.required),
      numero: new FormControl(conta.numero ? conta.numero : '', Validators.required),
      saldo: new FormControl(conta.saldo ? conta.saldo : 0, Validators.required),
      idCliente: new FormControl(null, Validators.required)
    });
  }

  enviar() {
    const conta: IContaCad = {
      agencia: this.formConta.get('agencia')?.value,
      numero: this.formConta.get('numero')?.value,
      saldo: this.formConta.get('saldo')?.value,
      cliente: { id: this.formConta.get('idCliente')?.value } as ICliente
    }
    this.contaService.cadastrarConta(conta).subscribe(result => {
      Swal.fire('Sucesso',
      `${this.estaEditando() ? 'Editada' : 'Cadastrada'} com Sucesso!`, 'success');
    });
    this.router.navigate(['/contas']);
  }

  estaEditando(){
    return !!this.formConta.get('id')?.value;
  }
}
