import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Produto } from '../../services/product';
 // ajuste o path se necessário

@Component({
  selector: 'app-campaign-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-showcase.component.html',
  styleUrls: ['./campaign-showcase.component.scss']
})
export class CampaignShowcaseComponent implements OnInit {
  private productService = inject(ProductService);

  // Inputs para reutilizar em qualquer campanha
  @Input({ required: true }) categoriaTermo: string = ''; // Ex: 'professores', 'infantil'
  @Input() categoriaId?: string;                           // UUID caso prefira filtrar direto pelo backend
  @Input() tagCampanha: string = 'Coleção Especial';
  @Input() titulo: string = 'Presentes Especiais';
  @Input() subtitulo: string = 'Opções exclusivas selecionadas para presentear com carinho.';
  @Input() linkVerTodos: string = '/produtos';
  @Input() categoriaSlug: string = '';
  @Input() textoWhatsappCampanha: string = 'Dia dos Professores';

  produtos: Produto[] = [];
  carregando: boolean = true;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;

    // Se você passar categoriaId, ele filtra direto na query do backend.
    // Senão, ele traz a listagem pública e filtra pelo termo do nome da categoria.
    this.productService.listarProdutos(this.categoriaId).subscribe({
      next: (dados: Produto[]) => {
        const termo = this.categoriaTermo.trim().toLowerCase();
        
        this.produtos = dados.filter(p => {
          const nomeCategoria = p.categoria?.nome?.toLowerCase() || '';
          const categoriaBate = termo ? nomeCategoria.includes(termo) : true;
          return p.ativo && categoriaBate;
        });

        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar vitrine da campanha:', err);
        this.carregando = false;
      }
    });
  }

  comprarViaWhatsapp(produto: Produto): void {
    const texto = encodeURIComponent(
      `Olá! Tenho interesse no kit "${produto.nome}" (R$ ${Number(produto.preco).toFixed(2)}) referente à campanha de ${this.textoWhatsappCampanha}.`
    );
    window.open(`https://wa.me/5521997883761?text=${texto}`, '_blank');
  }
}