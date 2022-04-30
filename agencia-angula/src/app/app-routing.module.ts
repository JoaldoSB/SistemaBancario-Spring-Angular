import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasCadastrarEditarComponent } from './pages/contas/contas-cadastrar-editar/contas-cadastrar-editar.component';
import { ContasComponent } from './pages/contas/contas.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HomeComponent } from './pages/home/home.component';
import { SaqueComponent } from './pages/saque/saque.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/cadastrar', component: ClientesCadastrarEditarComponent },
  { path: 'clientes/editar/:id', component: ClientesCadastrarEditarComponent},
  { path: 'contas', component: ContasComponent },
  { path: 'contas/cadastrar', component: ContasCadastrarEditarComponent},
  { path: 'contas/editar/:id', component: ContasCadastrarEditarComponent},

  { path: 'deposito', component: DepositoComponent },
  { path: 'saque', component: SaqueComponent},
  { path: 'transferencia', component: TransferenciaComponent},
  { path: 'extrato', component: ExtratoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
