import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeiculoService } from '../../../service/veiculo.service';
import { take } from 'rxjs';
import { Veiculo } from '../../../domain/veiculo.domain';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
  ],
  templateUrl: './veiculo-form.component.html',
  styleUrl: './veiculo-form.component.css',
  preserveWhitespaces: true
})
export class VeiculoFormComponent {
      private fb = inject(FormBuilder);
      private veiculoService = inject(VeiculoService);
      private sharedService = inject(SharedService);
      private route = inject(ActivatedRoute);

      public veiculoForm: FormGroup

      constructor() {
          this.veiculoForm = this.fb.group({
              id: [''],
              marca: [''],
              modelo: [''],
              status: [''],
              detalhe: ['']
          });
          this.preencherFormulario();
      }

      public preencherFormulario(): void {
        const routeParams = this.route.snapshot.params;
        if(routeParams["id"] > 0){
          this.veiculoService.loadById(routeParams["id"]).pipe(
            take(1)
          ).subscribe((res: Veiculo)=>{
            this.veiculoForm.patchValue(res);
          });
        }
      }

      public onSubmit(): void {
          let veiculo = this.veiculoForm;
          if(veiculo.valid){
            this.veiculoService.save(veiculo.value).pipe(take(1)).subscribe({
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
          veiculo.reset();
        }
    }
