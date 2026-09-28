import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list';
import { ProductService, Produto } from '../../services/product';
import { CategoryService, Categoria } from '../../services/category';
import { ReviewsComponent } from '../../components/reviews/reviews';
import { CampaignBannerComponent } from '../../components/campaign/campaign-banner.component';
import { CampaignShowcaseComponent } from '../../components/campaign-showcase/campaign-showcase.component'; // ajuste o caminho
import { campanhaAtiva } from '../../components/campaign/campaign';

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductListComponent,
    ReviewsComponent,
    CampaignBannerComponent,
    CampaignShowcaseComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  banner = campanhaAtiva();
  produtosEmDestaque: Produto[] = [];
  categoriasDePresente: Categoria[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.listarProdutos().subscribe(data => {
      this.produtosEmDestaque = data.slice(0, 8);
    });

    this.categoryService.listarCategorias('PRESENTE').subscribe(data => {
      this.categoriasDePresente = data;
    });
  }

  /** Acha a categoria de presente pelo nome (funciona em dev e em produção). */
  paramsFaixa(termo: string): { categoria: string } | null {
    const cat = this.categoriasDePresente.find(c => normalizar(c.nome).includes(termo));
    return cat ? { categoria: cat.id } : null;
  }
}