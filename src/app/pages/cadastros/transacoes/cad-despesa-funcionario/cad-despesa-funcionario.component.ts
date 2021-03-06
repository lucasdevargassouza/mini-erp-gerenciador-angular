import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-despesa-funcionario',
  templateUrl: './cad-despesa-funcionario.component.html',
  styleUrls: ['./cad-despesa-funcionario.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadDespesaFuncionarioComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.DESPESAS.DESPESA_FUNCIONARIO,
    rota: 'pages/listagems/transacoes/listdespesafuncionario'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    valor: 0,
    data: "",
    selectFuncionario: "",
    descricao: "",
  };

  public resSelect = {
    selectFuncionario: []
  }

  public serverAtual = this.CONSTS.OUTROS.SERVIDOR_ATUAL;

  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private updateDados: UpdateDatabaseService,
    private activeRouter: ActivatedRoute,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.inicializaSelects();
    this.verificaEditar();
  }

  ngOnInit() {

  }

  public salvarItem() {
    if (this.verificacoes()) {
      if (this.editarItem.editar === false) {
        let item = {
          Nome: this.itemGravar.nomeItem,
          Valor: this.itemGravar.valor,
          Data: this.itemGravar.data,
          IdFuncionario: this.itemGravar.selectFuncionario,
          Descricao: this.itemGravar.descricao,
        }
        this.postDados.gravaDados(item, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_P.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_P.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_OK,
            );
            this.router.navigate([this.configFuncoesBasicas.rota]);
            EmissorEventosService.loadBar.emit(false);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          Valor: this.itemGravar.valor,
          Data: this.itemGravar.data,
          IdFuncionario: this.itemGravar.selectFuncionario,
          Descricao: this.itemGravar.descricao,
        }
        this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_ATUALIZADO_OK,
            );
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      }
    }
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id != undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.valor = data.valor;
              this.itemGravar.data = data.data;
              this.itemGravar.selectFuncionario = data.idFuncionario;
              this.itemGravar.descricao = data.descricao;
              EmissorEventosService.loadBar.emit(false);
            }
          );
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }

  public inicializaSelects() {
    this.readDados.carregaDados(this.CONSTS.PESSOAS.FUNCIONARIO).subscribe(
      data => {
        this.resSelect.selectFuncionario = data;
        EmissorEventosService.loadBar.emit(false);
      },
      error => {
        this.avisoErro.createDialog(
          this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTS.AVISO.TIPOERROAVISO.ERRO,
          this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR
        );
        EmissorEventosService.loadBar.emit(false);
      }
    );
  }

  private verificacoes(): boolean {
    let retorno: boolean = true;
    if (this.itemGravar.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_DESP_FUNC_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_DESP_FUNC_MENOR3,
      );
      retorno = false;
    } else if (this.itemGravar.valor == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_VALOR_CAD_DESP_FUNC_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.data == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_DATA_CAD_DESP_FUNC_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.selectFuncionario == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_FUNCIONARIO_CAD_DESP_FUNC_VASIO,
      );
      retorno = false;
    } else {
      retorno = true;
    }
    return retorno;
  }
}
