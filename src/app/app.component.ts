import { SharedService } from './shared/shared.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MegaTron';

  private sharedService = inject(SharedService);
  private router = inject(Router);

  public open: boolean = false;
  public anoCorrente!: number;
   public url_atual!: string;

  ngOnInit() {
    this.anoCorrente = new Date().getFullYear();
    this.pegarTokenRequisicao();
    this.url_atual = window.location.href;
    if((this.url_atual === 'http://localhost:4200/' || this.url_atual === 'http://localhost:4200/home') || (this.url_atual === 'https://wwww.rtmec.kentec.com.br/' || this.url_atual === 'https://wwww.rtmec.kentec.com.br/home')){
      this.router.navigate(['/home']);
      console.log(this.url_atual);
    }
    //console.log(this.sharedService.getTokenRequisicao());
  }

  public pegarTokenRequisicao(): void {
    let tokens = this.sharedService.token[Math.floor(Math.random() * this.sharedService.token.length)];
    this.sharedService.setTokenRequisicao(tokens);
  }

  public abrirMenu() {
    this.open = !this.open;
  }
}
