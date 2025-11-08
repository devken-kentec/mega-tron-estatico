import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';
import { Cliente } from '../domain/cliente.domian';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly api = `${environment.api}/rtmec-kentec-6a6b6c2d6b656e7465632d32303235/api/proprietario/v1`;
  private http = inject(HttpClient);
  private sharedService = inject(SharedService);

  constructor() {
    //console.log(this.sharedService.getTokenRequisicao());
  }

  public findAll(): Observable<Cliente[]> {
    const headers = new HttpHeaders({
      'Token': this.sharedService.getTokenRequisicao()
    });
    return this.http.get<Cliente[]>(`${this.api}/listarClientes`, { headers });
  }

  public loadById(id: number): Observable<Cliente> {
    const headers = new HttpHeaders({
      'Token': this.sharedService.getTokenRequisicao()
    });
    return this.http.get<Cliente>(`${this.api}/buscarClientePorId/${id}`, { headers });
  }

  public save(cliente: Cliente): Observable<Cliente> {
    if (cliente.id === 0 || cliente.id === null) {
      return this.create(cliente);
    } else {
      return this.update(cliente);
    }
  }

  private create(cliente: Cliente): Observable<Cliente>{
    const headers = new HttpHeaders({
      'Token': this.sharedService.getTokenRequisicao()
    });
    return this.http.post<Cliente>(`${this.api}`, cliente, { headers });
  }

  private update(cliente: Cliente): Observable<Cliente>{
    const headers = new HttpHeaders({
      'Token': this.sharedService.getTokenRequisicao()
    });
    return this.http.put<Cliente>(`${this.api}`, cliente, { headers });
  }
}
