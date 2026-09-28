import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome';
import { ProductListComponent } from '../../components/product-list/product-list';
import { ProductService, Produto } from '../../services/product';
import { CategoryService, Categoria } from '../../services/category';
import { ReviewsComponent } from '../../components/reviews/reviews';
import { CampaignBannerComponent } from '../../components/campaign/campaign-banner.component';
import { campanhaAtiva } from '../../components/campaign/campaign';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WelcomeComponent,
    ProductListComponent,
    ReviewsComponent,
    CampaignBannerComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  
  banner = campanhaAtiva();
  produtosEmDestaque: Produto[] = [];
  produtosKits: Produto[] = [];
  categoriasDeProduto: Categoria[] = [];
  categoriasDePresente: Categoria[] = [];
  kitsCategoriaId: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.listarProdutos().subscribe(data => {
      this.produtosEmDestaque = data.slice(0, 8);
    });

    this.categoryService.listarCategorias('PRODUTO').subscribe(data => {
      this.categoriasDeProduto = data;

      // Localiza a categoria "Kits" entre as categorias de produto já carregadas
      const categoriaKits = data.find(c => c.nome.toLowerCase() === 'kits');
      if (categoriaKits) {
        this.kitsCategoriaId = categoriaKits.id;
        this.productService.listarProdutos(categoriaKits.id, 'PRODUTO').subscribe(produtos => {
          this.produtosKits = produtos.slice(0, 8);
        });
      }
    });

    this.categoryService.listarCategorias('PRESENTE').subscribe(data => {
      this.categoriasDePresente = data;
    });
  }
}