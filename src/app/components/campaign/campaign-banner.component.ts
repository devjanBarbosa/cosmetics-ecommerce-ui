import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CampaignBanner {
  id: string;                 // usado no tracking, ex.: 'dia-do-professor-2026'
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string | any[];
  ctaQueryParams?: Record<string, string>;
  image: 'dia-do-professor.jpg';
  imageAlt: string;
  note?: string;
  whatsappText?: string;
  menuLabel?: string; 
  categoriaNome?: string;                      // nome da categoria no painel
  categoriaTipo?: 'PRODUTO' | 'PRESENTE';
  
}

@Component({
  selector: 'app-campaign-banner',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="banner" [attr.aria-label]="banner.title">
      <div class="text">
        <h2>{{ banner.title }}</h2>
        <p class="sub">{{ banner.subtitle }}</p>

        <div class="actions">
          <a class="btn btn-light" [routerLink]="banner.ctaLink"
             [queryParams]="banner.ctaQueryParams" (click)="ctaClick.emit(banner)">
            {{ banner.ctaLabel }}
          </a>
          @if (banner.whatsappText) {
            <a class="btn btn-outline" [href]="whatsappHref" target="_blank" rel="noopener noreferrer"
               (click)="whatsappClick.emit(banner)">
              <i class="bi bi-whatsapp"></i> Personalizar cartão
            </a>
          }
        </div>

        @if (banner.note) { <p class="note">{{ banner.note }}</p> }
      </div>

      <div class="media">
        @if (!imgFailed) {
  <img [src]="banner.image" [alt]="banner.imageAlt" width="1200" height="900"
       [attr.fetchpriority]="priority ? 'high' : null" [attr.loading]="priority ? 'eager' : 'lazy'"
       (error)="imgFailed = true" />
}
      </div>
    </section>
  `,
  styleUrl: './campaign-banner.scss'
})
export class CampaignBannerComponent {
  imgFailed = false;
  @Input({ required: true }) banner!: CampaignBanner;
  /** true no primeiro slide/banner da página (melhora o carregamento). */
  @Input() priority = false;
  @Input() whatsappNumber = '5521997883761';

  @Output() ctaClick = new EventEmitter<CampaignBanner>();
  @Output() whatsappClick = new EventEmitter<CampaignBanner>();

  get whatsappHref(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.banner.whatsappText ?? '')}`;
  }
}