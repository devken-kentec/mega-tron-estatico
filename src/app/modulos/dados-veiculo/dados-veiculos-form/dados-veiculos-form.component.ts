import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { VeiculoService } from '../../../service/veiculo.service';
import { Veiculo } from '../../../domain/veiculo.domain';
import { take } from 'rxjs';
import { Cliente } from '../../../domain/cliente.domian';
import { ClienteService } from '../../../service/cliente.service';
import { DadosVeiculoService } from '../../../service/dados-veiculo.service';
import { DadosVeiculo } from '../../../domain/dados-veiculo.domain';

@Component({
  selector: 'app-dados-veiculos-form',
  standalone: true,
  imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
  ],
  templateUrl: './dados-veiculos-form.component.html',
  styleUrl: './dados-veiculos-form.component.css',
  preserveWhitespaces: true
})
export class DadosVeiculosFormComponent {
  private fb = inject(FormBuilder);
  private veiculoService = inject(VeiculoService);
  private sharedService = inject(SharedService);
  private clienteService = inject(ClienteService);
  private dadosVeiculoService = inject(DadosVeiculoService);
  private route = inject(ActivatedRoute);

  public dadosVeiculoForm: FormGroup;
  public veiculos: Veiculo[] = [];
  public proprietarios: Cliente[] = [];
  public detalhe = '';

  constructor() {
    this.dadosVeiculoForm = this.fb.group({
      id: [''],
      ano: [''],
      cor: [''],
      placa: [''],
      combustivel: [''],
      proprietarioId: [''],
      veiculoId: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.carrecarComboBoxVeiculos();
    this.carregarComboBoxProprietarios();
    this.preencherFormulario();
  }

  public preencherFormulario(): void {
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.dadosVeiculoService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: DadosVeiculo)=>{
        this.dadosVeiculoForm.patchValue(res);
      });
    }
  }

  public carrecarComboBoxVeiculos(): void {
    this.veiculoService.findAll().pipe(take(1)).subscribe((response: Veiculo[]) => {
      this.veiculos = response;
    });
  }

  public carregarComboBoxProprietarios(): void {
      this.clienteService.findAll().pipe(take(1)).subscribe((response: Cliente[]) => {
      this.proprietarios = response;
    });
  }

  public pegarMarca(): void {
    this.veiculos.forEach(v => {
      if(v.id == this.dadosVeiculoForm.get('veiculoId')?.value){
        this.detalhe = v.detalhe;
      }
    })
  }

  public onSubmit(): void {
    let dadosVeiculo = this.dadosVeiculoForm;
    if(dadosVeiculo.valid){
          this.dadosVeiculoService.save(dadosVeiculo.value).pipe(take(1)).subscribe({
            next: (res) => {
              //console.log(res);
              this.sharedService.saveShow("Seus dados foram enviados!", "Sucesso!!");
            },
            error: (err) => {
              //console.log(err);
              this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
            },
        });
    }
    dadosVeiculo.reset();
  }

}
