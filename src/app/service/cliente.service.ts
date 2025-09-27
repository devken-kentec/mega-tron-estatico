import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly api = `${environment.api}/rtmec-kentec-6a6b6c2d6b656e7465632d32303235/api/proprietario/v1`;
  private http = inject(HttpClient);
  private sharedService = inject(SharedService);

  constructor() {
    console.log(this.sharedService.getTokenRequisicao());
  }


}
