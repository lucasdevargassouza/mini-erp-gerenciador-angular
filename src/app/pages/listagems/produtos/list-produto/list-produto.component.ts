import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, DeleteDadosDatabaseService, AvisoService, ConstantesService } from 'src/app/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css'],
  animations: [
    trigger('inicializaList', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class ListProdutoComponent implements OnInit {
  private configFuncoesBasicas = {
    tipoItem: this.CONSTS.PRODUTOS.PRODUTO,
    rota: '/pages/cadastros/produtos/cadproduto/'
  }
  public itemdoBanco = [];

  constructor(
    private deleteDados: DeleteDadosDatabaseService,
    private readDados: ReadDadosDatabaseService,
    private avisoService: AvisoService,
    private CONSTS: ConstantesService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.carregaListaItens();
  }

  public editarItem(idItem) {
    this.route.navigate([this.configFuncoesBasicas.rota + idItem])
  }

  public daletarItem(id) {
    this.deleteDados.deleteDados(this.configFuncoesBasicas.tipoItem, id).subscribe(
      data => {
        this.carregaListaItens();
        EmissorEventosService.loadBar.emit(false);
      }, error => {
        this.avisaErroConexao();
        EmissorEventosService.loadBar.emit(false);
      }
    );
  }

  private carregaListaItens() {
    this.readDados.carregaDados(this.configFuncoesBasicas.tipoItem).subscribe(
      data => {
        this.itemdoBanco = data;
        EmissorEventosService.loadBar.emit(false);
      }, error => {
        this.avisaErroConexao();
        EmissorEventosService.loadBar.emit(false);
      }
    )
  }

  private avisaErroConexao() {
    this.avisoService.createDialog(450, 150, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
  }
}
