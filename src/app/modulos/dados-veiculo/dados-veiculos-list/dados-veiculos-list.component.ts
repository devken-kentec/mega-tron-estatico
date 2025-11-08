import { DadosVeiculoService } from './../../../service/dados-veiculo.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { DadosVeiculo } from '../../../domain/dados-veiculo.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-dados-veiculos-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './dados-veiculos-list.component.html',
  styleUrl: './dados-veiculos-list.component.css',
  preserveWhitespaces: true
})
export class DadosVeiculosListComponent {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private dadosVeiculoService = inject(DadosVeiculoService);

    public dadosVeiculos: DadosVeiculo[] = [];
    public carregando: boolean = false;

    public ngOnInit(): void {
      this.listarDadosVeiculo();
    }

  public listarDadosVeiculo(): void{
      this.dadosVeiculoService.findAll().pipe(take(1)).subscribe((response: DadosVeiculo[]) => {
        this.carregando = true;
        this.dadosVeiculos = response;
      });
    }

    public editar(id: number): void{
      this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    public recuperarDados(dadosVeiculo: DadosVeiculo): void{

    }
}
