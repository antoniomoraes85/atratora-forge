export interface NavItem {
  label: string;
  path: string;
  iconName: 'Home' | 'Wrench' | 'BookOpen' | 'FolderGit2' | 'Info';
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral' | 'accent';
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Visão geral',
    path: '/',
    iconName: 'Home',
  },
  {
    label: 'Catálogo',
    path: '/tools',
    iconName: 'Wrench',
  },
  {
    label: 'Guias',
    path: '/guides',
    iconName: 'BookOpen',
  },
  {
    label: 'Projetos locais',
    path: '/projects',
    iconName: 'FolderGit2',
    badge: 'Futuro',
    badgeType: 'neutral',
  },
  {
    label: 'Sobre',
    path: '/about',
    iconName: 'Info',
  },
];
