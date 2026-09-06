export interface NavItem {
  label: string;
  path: string;
  iconName: 'Home' | 'Wrench' | 'BookOpen' | 'FolderGit2' | 'Info';
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral' | 'accent';
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Início',
    path: '/',
    iconName: 'Home',
  },
  {
    label: 'Ferramentas',
    path: '/tools',
    iconName: 'Wrench',
  },
  {
    label: 'Guias',
    path: '/guides',
    iconName: 'BookOpen',
  },
  {
    label: 'Projetos',
    path: '/projects',
    iconName: 'FolderGit2',
    badge: 'Em breve',
    badgeType: 'neutral',
  },
  {
    label: 'Sobre',
    path: '/about',
    iconName: 'Info',
  },
];
