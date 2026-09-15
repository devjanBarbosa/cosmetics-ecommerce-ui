import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';
import { FooterComponent } from "./components/footer/footer";
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    WhatsappButtonComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'frontend';

  // 1. Mudamos apenas o 'router' para public para o HTML conseguir enxergá-lo
  constructor(
    public router: Router,
    private seoService: SeoService 
  ) {}

  ngOnInit(): void {
    this.seoService.init(); 
  }

  get isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}