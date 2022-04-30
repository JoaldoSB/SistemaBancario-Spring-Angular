import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SaqueComponent } from './pages/saque/saque.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { ContasCadastrarEditarComponent } from './pages/contas/contas-cadastrar-editar/contas-cadastrar-editar.component';
import { TesteComponent } from './pages/contas/teste/teste.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ContasComponent,
    ClientesCadastrarEditarComponent,
    SidebarComponent,
    FooterComponent,
    SaqueComponent,
    TransferenciaComponent,
    ExtratoComponent,
    DepositoComponent,
    ContasCadastrarEditarComponent,
    TesteComponent,
    LoaderComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
