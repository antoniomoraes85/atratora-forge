export type NavIcon =
  | 'Home' | 'LayoutGrid' | 'Wrench' | 'BookOpen' | 'CircleHelp'
  | 'Target' | 'Info' | 'Mail' | 'Route' | 'FolderGit2';

export interface NavItem {
  label: string;
  path: string;
  iconName: NavIcon;
  description?: string;
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral' | 'accent';
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

/** Menu editorial; caminhos e ferramentas operacionais existentes são preservados. */
export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'explorar', title: 'EXPLORAR', items: [
      { label: 'Home', path: '/', iconName: 'Home', description: 'Apresentação e acesso rápido' },
      { label: 'Funcionalidades', path: '/features', iconName: 'LayoutGrid', description: 'Descubra cada recurso' },
      { label: 'Catálogo', path: '/tools', iconName: 'Wrench', description: 'Todas as ferramentas' },
    ],
  },
  {
    id: 'aprender', title: 'APRENDER', items: [
      { label: 'Guias', path: '/guides', iconName: 'BookOpen', description: 'Tutoriais e documentação' },
      { label: 'Perguntas frequentes', path: '/faq', iconName: 'CircleHelp', description: 'Dúvidas e orientações' },
    ],
  },
  {
    id: 'institucional', title: 'INSTITUCIONAL', items: [
      { label: 'Missão, visão e valores', path: '/institutional', iconName: 'Target', description: 'Nossos princípios' },
      { label: 'Sobre', path: '/about', iconName: 'Info', description: 'Origem e escopo' },
      { label: 'Contato', path: '/contact', iconName: 'Mail', description: 'Feedback e sugestões' },
    ],
  },
  {
    id: 'evolucao', title: 'EVOLUÇÃO', items: [
      { label: 'Roadmap', path: '/roadmap', iconName: 'Route', description: 'Próximas entregas' },
      { label: 'Projetos locais', path: '/projects', iconName: 'FolderGit2', badge: 'Futuro', badgeType: 'neutral' },
    ],
  },
];

/** Lista plana para possíveis consumidores do menu legado. */
export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap(section => section.items);
