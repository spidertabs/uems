// data/headerNavLinks.ts
export interface NavLink {
  title: string;
  href: string;
  emoji?: string;
  roles?: string[]; // Restrict by user role
}

const headerNavLinks: NavLink[] = [
  {
    title: '📊 Dashboard',
    href: '/',
    emoji: '📊',
    roles: ['lecturer', 'hod', 'exam_master', 'admin'],
  },
    {
    href: '/profile',
    title: '👤 Profile',
    emoji: '👤',
  },
  {
    title: '📝 Question Bank',
    href: '/question-bank',
    emoji: '📝',
    roles: ['lecturer', 'hod', 'admin'],
  },
  {
    title: '📄 Exam Papers',
    href: '/exam-papers',
    emoji: '📄',
    roles: ['lecturer', 'hod', 'exam_master', 'admin'],
  },
  {
    title: '✅ Approvals',
    href: '/approvals',
    emoji: '✅',
    roles: ['hod', 'admin'],
  },
  {
    title: '📚 Courses',
    href: '/courses',
    emoji: '📚',
    roles: ['admin', 'hod'],
  },
  {
    title: '📬 Notifications',
    href: '/notifications/inbox',
    emoji: '📬',
    roles: ['lecturer', 'hod', 'exam_master', 'admin'],
  },
    {
    href: '/reports',
    title: '📊 Reports',
    emoji: '📊',
    roles: ['hod', 'dean', 'exam_master', 'admin'],
  },

];

export default headerNavLinks;
