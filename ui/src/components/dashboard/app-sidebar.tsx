import { CalendarDays, LogOut, Settings2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { selectCurrentUser, signOut } from '@/store/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

interface DashboardNavItem {
  href: string
  icon: LucideIcon
  label: string
}

const dashboardNavItems: DashboardNavItem[] = [
  {
    href: '/',
    icon: CalendarDays,
    label: 'Events',
  },
  {
    href: '/settings',
    icon: Settings2,
    label: 'Settings',
  },
]

export default function AppSidebar() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const location = useLocation()
  const userEmail = currentUser?.email || 'Signed in host'

  const handleSignOut = () => {
    void dispatch(signOut())
  }

  const renderNavItems = () => (
    <SidebarMenu>
      {dashboardNavItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.href

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
              <Link to={item.href}>
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )

  const renderMain = () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-10 items-center rounded-md border border-sidebar-border bg-background/70 px-3 font-editorial text-lg text-sidebar-foreground">
          Zenve
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>{renderNavItems()}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="min-w-0 px-1">
          <p className="editorial-eyebrow">signed in</p>
          <p className="truncate text-sm text-sidebar-foreground">{userEmail}</p>
        </div>
        <Button type="button" variant="outline" className="justify-start rounded-md bg-background/70" onClick={handleSignOut}>
          <LogOut className="size-4" />
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )

  return renderMain()
}
