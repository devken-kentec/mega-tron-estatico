import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs';
import { SharedService } from '../../../shared/shared.service';
import { Cliente } from '../../../domain/cliente.domian';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMaskDirective
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
  preserveWhitespaces: true
})
export class ClienteFormComponent {
    private fb = inject(FormBuilder);
    private clienteService = inject(ClienteService);
    private sharedService = inject(SharedService);
    private route = inject(ActivatedRoute);

    public clienteForm: FormGroup

    constructor() {
      this.clienteForm = this.fb.group({
        id: [null],
        nome: [''],
        apelido: [''],
        dataNascimento: [''],
        fone: [''],
        whatsapp: [''],
        email: [''],
        cep: [''],
        endereco: [''],
        complemento: [''],
        chaveUsuario: [''],
        senhaUsuario: [''],
        role: [''],
        status: ['Ativo']
      });
      this.preencherFormulario();
    }

  public preencherFormulario(): void {
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.clienteService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: Cliente)=>{
        this.clienteForm.patchValue(res);
      });
    }
  }

  public onSubmit(): void {
    //console.log(this.clienteForm.value);
    let cliente = this.clienteForm;
    if(cliente.valid){
    this.clienteService.save(cliente.value).pipe(take(1)).subscribe({
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
      cliente.reset();
    }
}
