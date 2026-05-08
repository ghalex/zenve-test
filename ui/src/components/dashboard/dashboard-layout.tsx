import { Outlet } from 'react-router-dom'
import AppSidebar from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout() {
  const renderHeader = () => (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-border/80 bg-background/90 px-4 backdrop-blur sm:px-6 md:hidden">
      <SidebarTrigger className="rounded-md" />
      <span className="ml-3 font-editorial text-lg text-foreground">Zenve</span>
    </header>
  )

  const renderMain = () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {renderHeader()}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )

  return renderMain()
}
