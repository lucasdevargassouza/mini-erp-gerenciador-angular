import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatGridListModule,
  MatCheckboxModule,
  MatStepperModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatChipsModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material';

// Meus componentes e servicos.
import { AppComponent } from './app.component';
import {
  ListDespesasFornecedorComponent,
  ListDespesasFuncionarioComponent,
  CadDespesaFuncionarioComponent,
  CadDespesaFornecedorComponent,
  PaginaNaoEncontradaComponent,
  ListDespesaGeralComponent,
  CadDespesaGeralComponent,
  ListFuncionarioComponent,
  ListFornecedorComponent,
  CadFuncionarioComponent,
  ListCategoriaComponent,
  CadFornecedorComponent,
  ContaEmpresaComponent,
  CadCategoriaComponent,
  ListComissaoComponent,
  ConfiguracaoComponent,
  CadComissaoComponent,
  ListProdutoComponent,
  ListClienteComponent,
  CadProdutoComponent,
  CadClienteComponent,
  ListModeloComponent,
  ListMarcaComponent,
  ListCargoComponent,
  DashboardComponent,
  CadModeloComponent,
  ListVendaComponent,
  CadMarcaComponent,
  CadCargoComponent,
  CadVendaComponent,
  ListPecaComponent,
  RegistroComponent,
  CadPecaComponent,
  AguardeComponent,
  LoginComponent,
  ContaComponent,
  SobreComponent,

} from './pages';

import {
  // Componentes.
  ActionBarComponent,
  AvisoErroComponent,
  TabsMenuComponent,


  // Serviços.
  DeleteDadosDatabaseService,
  ReadDadosDatabaseService,
  UpdateDatabaseService,
  PostDatabaseService,
  ConstantesService,
  AvisoService,
  LoginService,
  EmissorEventosService,

} from './share';

@NgModule({
  declarations: [
    AppComponent,
    ListDespesasFuncionarioComponent,
    ListDespesasFornecedorComponent,
    CadDespesaFuncionarioComponent,
    CadDespesaFornecedorComponent,
    PaginaNaoEncontradaComponent,
    ListDespesaGeralComponent,
    CadDespesaGeralComponent,
    ListFuncionarioComponent,
    ListFornecedorComponent,
    CadFuncionarioComponent,
    CadFornecedorComponent,
    ListCategoriaComponent,
    ListComissaoComponent,
    CadCategoriaComponent,
    ContaEmpresaComponent,
    ConfiguracaoComponent,
    ListClienteComponent,
    CadComissaoComponent,
    ListProdutoComponent,
    ListModeloComponent,
    CadProdutoComponent,
    CadClienteComponent,
    ListCargoComponent,
    CadModeloComponent,
    ListMarcaComponent,
    AvisoErroComponent,
    ListVendaComponent,
    ActionBarComponent,
    DashboardComponent,
    TabsMenuComponent,
    CadMarcaComponent,
    CadCargoComponent,
    CadVendaComponent,
    ListPecaComponent,
    RegistroComponent,
    CadPecaComponent,
    AguardeComponent,
    LoginComponent,
    ContaComponent,
    SobreComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // Angular
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatGridListModule,
    MatStepperModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    DragDropModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,


  ],
  providers: [
    DeleteDadosDatabaseService,
    ReadDadosDatabaseService,
    UpdateDatabaseService,
    EmissorEventosService,
    PostDatabaseService,
    ConstantesService,
    AvisoService,
    LoginService,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ AvisoErroComponent ]
})
export class AppModule { }