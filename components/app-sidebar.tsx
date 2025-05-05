'use client';

import {
  Icon,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import * as React from 'react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { siteConfig } from '@/constants/siteConfig';
import { IdCard, School } from 'lucide-react';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
      roles: ['ADMIN', 'PARENT'],
    },
    { title: 'Lifecycle', url: '#', icon: IconListDetails, roles: ['ADMIN'] },
    { title: 'Analytics', url: '#', icon: IconChartBar, roles: ['ADMIN'] },
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: IconFolder,
      roles: ['ADMIN', 'CANTEEN_MANAGER'],
    },
    {
      title: 'Transactions',
      url: '/dashboard/transactions',
      icon: IconUsers,
      roles: ['ADMIN', 'CANTEEN_MANAGER', 'PARENT'],
    },
    {
      title: 'Wallet',
      url: '/dashboard/wallet',
      icon: IdCard,
      roles: ['ADMIN', 'CANTEEN_MANAGER', 'PARENT'],
    },
    {
      title: 'Children',
      url: '/dashboard/children',
      icon: School,
      roles: ['ADMIN', 'CANTEEN_MANAGER', 'PARENT'],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: IconSettings,
      roles: ['ADMIN', 'PARENT', 'CANTEEN_MANAGER'],
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
      roles: ['ADMIN', 'PARENT', 'CANTEEN_MANAGER'],
    },
    {
      title: 'Search',
      url: '/dashboard/search',
      icon: IconSearch,
      roles: ['ADMIN', 'PARENT', 'CANTEEN_MANAGER'],
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
      roles: ['ADMIN', 'CANTEEN_MANAGER'],
    },
    { name: 'Reports', url: '#', icon: IconReport, roles: ['ADMIN'] },
    {
      name: 'Word Assistant',
      url: '/dashboard#',
      icon: IconFileWord,
      roles: ['ADMIN', 'PARENT'],
    },
  ],
};

export function AppSidebar({
  userRole,
  user,
  ...props
}: {
  userRole: string;
  user: {
    email: string;
    name: string;
    avatar: string;
  };
} & React.ComponentProps<typeof Sidebar>) {
  const filteredNavMain = data.navMain
    .filter((item) => item.roles.includes(userRole))
    .map((item) => ({
      ...item,
      icon: item.icon as unknown as Icon, // Cast to match the expected type
    }));
  const filteredNavSecondary = data.navSecondary.filter((item) =>
    item.roles.includes(userRole),
  );
  const filteredDocuments = data.documents.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img
                  src="/logo.svg"
                  alt={siteConfig.name}
                  className="!size-8"
                />
                <span className="text-base font-semibold">
                  {siteConfig.name}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavDocuments items={filteredDocuments} />
        <NavSecondary items={filteredNavSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
