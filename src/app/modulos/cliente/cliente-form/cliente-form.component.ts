import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

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
    }

    public onSubmit(): void {
      console.log(this.clienteForm.value);
    }

}
