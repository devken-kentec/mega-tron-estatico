import { Component, inject } from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';
import { Cliente } from '../../../domain/cliente.domian';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    RouterModule,
    NgxMaskPipe
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
  preserveWhitespaces: true
})
export class ClienteListComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

  public clientes: Cliente[] = [];
  public carregando: boolean = false;

  ngOnInit() {
    this.listarClientes();
  }

  public listarClientes(): void{
    this.clienteService.findAll().pipe(take(1)).subscribe((response: Cliente[]) => {
      this.carregando = true;
      this.clientes = response;
    });
  }

  public editar(id: number): void{
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  public recuperarDados(cliente: Cliente): void{

  }

  public incluirLancamento(){

  }
}
