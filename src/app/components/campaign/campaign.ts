import { CampaignBanner } from './campaign-banner.component';

export interface Campanha extends CampaignBanner {
  inicio: string; // 'AAAA-MM-DD'
  fim: string;
}

export const CAMPANHAS: Campanha[] = [
  {
    id: 'dia-do-professor-2026',
    inicio: '2026-09-28',
    fim: '2026-10-15',
    title: 'um presente para quem ensina',
    subtitle: 'kits prontos com cartão de agradecimento. entrega grátis em Bangu a partir de R$ 50.',
    ctaLabel: 'ver kits para professores',
    ctaLink: ['/produtos'],
    ctaQueryParams: { categoria: 'kits' },
    image: 'dia-do-professor.jpg',
    imageAlt: 'Kit de hidratante e sabonete com cartão de agradecimento',
    whatsappText: 'Olá, Leda! Quero um kit para professor(a) com cartão personalizado.',
    categoriaNome: 'Dia dos Professores',
    categoriaTipo: 'PRESENTE' 
  },
  // próxima data: copie o bloco acima, troque os campos e as datas
];

export const CAMPANHA_PADRAO: CampaignBanner = {
  id: 'padrao',
  title: 'o kit certo para a sua rotina',
  subtitle: 'kits prontos de skincare e maquiagem, pensados para você.',
  menuLabel: 'Dia dos Professores',
  ctaLabel: 'ver kits',
  ctaLink: ['/produtos'],
  ctaQueryParams: { categoria: 'kits' },
  image: 'dia-do-professor.jpg',
  imageAlt: 'Kits Leda Cosméticos',
  
};

export function campanhaAtiva(hoje = new Date()): CampaignBanner {
  const d = hoje.toISOString().slice(0, 10);
  return CAMPANHAS.find(c => d >= c.inicio && d <= c.fim) ?? CAMPANHA_PADRAO;
}