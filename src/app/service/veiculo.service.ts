import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { Veiculo } from '../domain/veiculo.domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

    private readonly api = `${environment.api}/rtmec-kentec-6a6b6c2d6b656e7465632d32303235/api/veiculo/v1`;
    private http = inject(HttpClient);
    private sharedService = inject(SharedService);

  constructor() { }

    public findAll(): Observable<Veiculo[]> {
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.get<Veiculo[]>(`${this.api}/listarVeiculos`, { headers });
    }

    public loadById(id: number): Observable<Veiculo> {
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.get<Veiculo>(`${this.api}/buscarVeiculoPorId/${id}`, { headers });
    }

    public save(veiculo: Veiculo): Observable<Veiculo> {
      if (veiculo.id > 0 ) {
        return this.update(veiculo);
      } else {
        return this.create(veiculo);
      }
    }

    private create(veiculo: Veiculo): Observable<Veiculo>{
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.post<Veiculo>(`${this.api}`, veiculo, { headers });
    }

    private update(veiculo: Veiculo): Observable<Veiculo>{
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.put<Veiculo>(`${this.api}`, veiculo, { headers });
    }
}
