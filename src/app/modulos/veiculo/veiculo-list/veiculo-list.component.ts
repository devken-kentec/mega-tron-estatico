import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { Veiculo } from '../../../domain/veiculo.domain';
import { VeiculoService } from '../../../service/veiculo.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './veiculo-list.component.html',
  styleUrl: './veiculo-list.component.css',
  preserveWhitespaces: true
})
export class VeiculoListComponent {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private veiculoService = inject(VeiculoService);

    public veiculos: Veiculo[] = [];
    public carregando: boolean = false;

    ngOnInit() {
      this.listarVeiculos();
    }

    public listarVeiculos(): void{
      this.veiculoService.findAll().pipe(take(1)).subscribe((response: Veiculo[]) => {
        this.carregando = true;
        this.veiculos = response;
      });
    }

    public editar(id: number): void{
      this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    public recuperarDados(veiculo: Veiculo): void{

    }

    public incluirLancamento(){

    }
}
