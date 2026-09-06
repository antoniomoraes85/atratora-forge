export interface NavItem {
  label: string;
  path: string;
  iconName: 'Home' | 'Wrench' | 'FileImage' | 'FolderGit2' | 'Info';
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
    label: 'Conversor .CROQUI',
    path: '/tools/croqui-converter',
    iconName: 'FileImage',
    badge: 'Disponível',
    badgeType: 'success',
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
