import { SharedService } from './shared/shared.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MegaTron';

  private sharedService = inject(SharedService);

  public open: boolean = false;
  public anoCorrente!: number;

  ngOnInit() {
    this.anoCorrente = new Date().getFullYear();
    this.pegarTokenRequisicao();
    //console.log(this.sharedService.getTokenRequisicao());
  }


  public pegarTokenRequisicao(): void {
    let tokens = this.sharedService.token[Math.floor(Math.random() * this.sharedService.token.length)];
    this.sharedService.setTokenRequisicao(tokens);
  }
}
