import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService, UtilidadesService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-fornecedor',
  templateUrl: './cad-fornecedor.component.html',
  styleUrls: ['./cad-fornecedor.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadFornecedorComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.PESSOAS.FORNECEDOR,
    rota: 'pages/listagems/pessoal/listfornecedor'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    enderecoItem: "",
    numeroCasaItem: "",
    cidadeItem: "",
    bairroItem: "",
    estadoItem: "",
    telefoneItem: "",
    emailItem: "",
    emailConfirmaItem: "",
    razaoSocial: "",
    cnpjItem: "",
    siteItem: "",
    cepItem: "",
  };

  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private updateDados: UpdateDatabaseService,
    private activeRouter: ActivatedRoute,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.verificaEditar();
  }

  ngOnInit() {
  }

  public salvarItem() {
    if (this.verificacoes()) {
      if (this.editarItem.editar === false) {
        let item = {
          Nome: this.itemGravar.nomeItem,
          Rua: this.itemGravar.enderecoItem,
          Numero: Number(this.itemGravar.numeroCasaItem),
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
          Email: this.itemGravar.emailItem,
          RazaoSocial: this.itemGravar.razaoSocial,
          Cnpj: UtilidadesService.removeTudoNaoNumero(this.itemGravar.cnpjItem),
          Site: this.itemGravar.siteItem,
          Cep: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)),
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
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          Id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          Rua: this.itemGravar.enderecoItem,
          Numero: Number(this.itemGravar.numeroCasaItem),
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
          Email: this.itemGravar.emailItem,
          RazaoSocial: this.itemGravar.razaoSocial,
          Cnpj: UtilidadesService.removeTudoNaoNumero(this.itemGravar.cnpjItem),
          Site: this.itemGravar.siteItem,
          Cep: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)),
        }
        this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_ATUALIZADO_OK,
            );
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      }
    }
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id !== undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              console.log(data)
              this.editarItem.id = data.id;
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.razaoSocial = data.razaoSocial;
              this.itemGravar.emailItem = data.email;
              this.itemGravar.emailConfirmaItem = data.email;
              this.itemGravar.enderecoItem = data.rua;
              this.itemGravar.bairroItem = data.bairro;
              this.itemGravar.cidadeItem = data.cidade;
              this.itemGravar.estadoItem = data.estado;
              this.itemGravar.siteItem = data.site;
              this.itemGravar.cnpjItem = data.cnpj;
              this.itemGravar.cepItem = data.cep;
              this.itemGravar.numeroCasaItem = data.numero;
              this.itemGravar.telefoneItem = data.telefone;
            });
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }

  private verificacoes(): boolean {
    let retorno: boolean = true;
    let arrayEmail;
    let arrayEmailPonto;
    let cpfString = "";
    try {
      arrayEmail = this.itemGravar.emailItem.split('@');
      arrayEmailPonto = arrayEmail[1].split('.');
      try {
        cpfString = UtilidadesService.removeTudoNaoNumero(this.itemGravar.cnpjItem);
      } catch (e) { cpfString = "" }
    } catch (e) { }
    if (this.itemGravar.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FOR_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FOR_MENOR3,
      );
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem) == "" || String(this.itemGravar.numeroCasaItem) == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CASA_CAD_FOR_VASIO,
      )
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem).length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CASA_CAD_FOR_MENOR2,
      );
      retorno = false;
    } else if (this.itemGravar.enderecoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_FOR_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.enderecoItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_FOR_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_FOR_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_FOR_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_FOR_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_FOR_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.estadoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_ESTADO_CAD_FOR_VASIO
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)).length != 8) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CEP_INVALIDOS,
      );
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "0" || String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUMERO_TELEFONE_CAD_FOR_VASIO,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_FOR_MENOR2,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length > 12) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_FOR_MAIOR12,
      )
      retorno = false;
    } else if (String(cpfString).length != 14) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CNPJ_CAD_FOR_TAMANHO,
      )
      retorno = false;
    } else if (this.itemGravar.emailItem != this.itemGravar.emailConfirmaItem) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_EMAILS_ERRADOS,
      )
      retorno = false;
    } else if (arrayEmail.length < 2 || arrayEmailPonto.length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_EMAILS_INVALIDOS,
      );
      retorno = false;
    } else {
      retorno = true;
    }
    return retorno;
  }

  public onCnpjKeyPress() {
    this.itemGravar.cnpjItem = UtilidadesService.maskCnpj(this.itemGravar.cnpjItem);
  }

  public onCepKeyPress() {
    this.itemGravar.cepItem = UtilidadesService.maskCnpj(this.itemGravar.cepItem);
  }

  public onTelefoneKeyPress() {
    this.itemGravar.telefoneItem = UtilidadesService.maskTelefone(this.itemGravar.telefoneItem);
  }
}
