import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { GoogleAnalyticsService } from '../../services/googleAnalyticsService';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent implements OnInit {
  mapUrlSafe!: SafeResourceUrl;

  lojaInfo = {
    nome: 'Leda Cosméticos',
    endereco: 'Estr. da Água Branca, 4497 - Bangu',
    cidade: 'Rio de Janeiro - RJ',
    cep: '21862-371',
    whatsapp: '5521997883761',
    email: 'contato@ledacosmeticos.com.br',
    instagramUrl: 'https://instagram.com/ledacosmeticos__',
    facebookUrl: 'https://web.facebook.com/profile.php?id=100029668196851',
    horarios: [
      { dia: 'Segunda a Sexta', hora: '08:00 - 18:00' },
      { dia: 'Sábado', hora: '08:00 - 14:00' },
      { dia: 'Domingo', hora: 'Fechado' }
    ]
  };

  currentYear = new Date().getFullYear();

  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    const rawMapUrl = 'https://maps.google.com/maps?q=Estr.+da+%C3%81gua+Branca,+4497+-+Bangu,+Rio+de+Janeiro+-+RJ&t=&z=15&ie=UTF8&iwloc=&output=embed';
    this.mapUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(rawMapUrl);
  }

  formatPhone(phone: string): string {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 13) {
      return cleaned.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  }

  copyToClipboard(text: string, type: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.toastr.success(`${type} copiado para a área de transferência!`);
    });
  }

  openDirections(): void {
    this.googleAnalyticsService.reportarEventoPersonalizado('click_get_directions');
    const address = encodeURIComponent(`${this.lojaInfo.endereco}, ${this.lojaInfo.cidade}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  }
}