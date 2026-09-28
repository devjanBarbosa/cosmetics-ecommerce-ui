import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ProductService, Produto } from '../../services/product';
import { CategoryService } from '../../services/category';
import { ProductListComponent } from '../product-list/product-list';

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

@Component({
  selector: 'app-campaign-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './campaign-showcase.component.html',
  styleUrls: ['./campaign-showcase.component.scss']
})
export class CampaignShowcaseComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input({ required: true }) categoriaNome!: string;
  @Input() tipo: 'PRODUTO' | 'PRESENTE' = 'PRESENTE';
  @Input() tagCampanha = 'Coleção especial';
  @Input() titulo = 'Presentes especiais';
  @Input() subtitulo = '';
  @Input() linkVerTodos = '/presentes';
  @Input() limite = 8;

  produtos: Produto[] = [];
  categoriaId: string | null = null;
  carregando = true;

  ngOnInit(): void {
    this.categoryService.listarCategorias(this.tipo).pipe(
      switchMap(cats => {
        const alvo = normalizar(this.categoriaNome);
        const cat = cats.find(c => normalizar(c.nome) === alvo);
        if (!cat) return of([] as Produto[]);
        this.categoriaId = cat.id;
        return this.productService.listarProdutos(cat.id, this.tipo);
      })
    ).subscribe({
      next: dados => {
        this.produtos = dados.filter(p => p.ativo).slice(0, this.limite);
        this.carregando = false;
      },
      error: err => {
        console.error('Erro ao carregar vitrine da campanha:', err);
        this.carregando = false;
      }
    });
  }
}