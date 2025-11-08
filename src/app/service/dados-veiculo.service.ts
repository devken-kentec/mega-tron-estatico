import { DadosVeiculo } from './../domain/dados-veiculo.domain';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosVeiculoService {

  private readonly api = `${environment.api}/rtmec-kentec-6a6b6c2d6b656e7465632d32303235/api/dados-veiculo/v1`;
  private http = inject(HttpClient);
  private sharedService = inject(SharedService);

  constructor() { }

    public loadById(id: number): Observable<DadosVeiculo> {
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.get<DadosVeiculo>(`${this.api}/buscarDadosVeiculoPorId/${id}`, { headers });
    }

    public findAll(): Observable<DadosVeiculo[]> {
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.get<DadosVeiculo[]>(`${this.api}/listarDadosVeiculo`, { headers });
    }

    public save(dadosVeiculo: DadosVeiculo): Observable<DadosVeiculo> {
      if (dadosVeiculo.id > 0) {
        return this.update(dadosVeiculo);
      } else {
        return this.create(dadosVeiculo);
      }
    }

    private create(dadosVeiculo: DadosVeiculo): Observable<DadosVeiculo>{
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.post<DadosVeiculo>(`${this.api}`, dadosVeiculo, { headers });
    }

    private update(dadosVeiculo: DadosVeiculo): Observable<DadosVeiculo>{
      const headers = new HttpHeaders({
        'Token': this.sharedService.getTokenRequisicao()
      });
      return this.http.put<DadosVeiculo>(`${this.api}`, dadosVeiculo, { headers });
    }
}
