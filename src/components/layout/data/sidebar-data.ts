import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Class Application',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      titleKey: 'groups.general',
      items: [
        {
          titleKey: 'items.dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          titleKey: 'items.tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          titleKey: 'items.apps',
          url: '/apps',
          icon: Package,
        },
        {
          titleKey: 'items.chats',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          titleKey: 'items.users',
          url: '/users',
          icon: Users,
        },
        {
          titleKey: 'items.securedByClerk',
          icon: ClerkLogo,
          items: [
            {
              titleKey: 'items.signIn',
              url: '/clerk/sign-in',
            },
            {
              titleKey: 'items.signUp',
              url: '/clerk/sign-up',
            },
            {
              titleKey: 'items.userManagement',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      titleKey: 'groups.pages',
      items: [
        {
          titleKey: 'items.auth',
          icon: ShieldCheck,
          items: [
            {
              titleKey: 'items.signIn',
              url: '/sign-in',
            },
            {
              titleKey: 'items.signInTwoColumns',
              url: '/sign-in-2',
            },
            {
              titleKey: 'items.signUp',
              url: '/sign-up',
            },
            {
              titleKey: 'items.forgotPassword',
              url: '/forgot-password',
            },
            {
              titleKey: 'items.otp',
              url: '/otp',
            },
          ],
        },
        {
          titleKey: 'items.errors',
          icon: Bug,
          items: [
            {
              titleKey: 'items.unauthorized',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              titleKey: 'items.forbidden',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              titleKey: 'items.notFound',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              titleKey: 'items.internalServerError',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              titleKey: 'items.maintenanceError',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      titleKey: 'groups.other',
      items: [
        {
          titleKey: 'items.settings',
          icon: Settings,
          items: [
            {
              titleKey: 'items.profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              titleKey: 'items.account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              titleKey: 'items.appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              titleKey: 'items.notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              titleKey: 'items.display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          titleKey: 'items.helpCenter',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
