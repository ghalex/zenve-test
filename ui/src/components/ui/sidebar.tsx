import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import { Slot } from 'radix-ui'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'

interface SidebarContextValue {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  state: 'expanded' | 'collapsed'
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

function SidebarProvider({ className, style, children, ...props }: React.ComponentProps<'div'>) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)
  const state = open ? 'expanded' : 'collapsed'

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((currentOpen) => !currentOpen)
    } else {
      setOpen((currentOpen) => !currentOpen)
    }
  }, [isMobile])

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      state,
      toggleSidebar,
    }),
    [isMobile, open, openMobile, state, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn('group/sidebar-wrapper flex min-h-screen w-full bg-background', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar()

  const renderMobile = () => (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        side="left"
        showCloseButton={false}
        className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground"
        style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Primary dashboard navigation.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  )

  const renderDesktop = () => (
    <div className="group peer hidden text-sidebar-foreground md:block" data-state={state} data-slot="sidebar">
      <div className="relative w-(--sidebar-width) transition-[width] duration-200 ease-linear group-data-[state=collapsed]:w-(--sidebar-width-icon)" />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 left-0 z-10 hidden h-screen w-(--sidebar-width) border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-linear md:flex group-data-[state=collapsed]:w-(--sidebar-width-icon)',
          className,
        )}
        {...props}
      >
        <div data-sidebar="sidebar" className="flex h-full w-full flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )

  const renderMain = () => {
    if (isMobile) {
      return renderMobile()
    }

    return renderDesktop()
  }

  return renderMain()
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-8', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return <main data-slot="sidebar-inset" className={cn('relative flex min-w-0 flex-1 flex-col bg-background', className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex flex-col gap-2 p-3', className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-content" data-sidebar="content" className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2', className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2 border-t border-sidebar-border p-3', className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn('relative flex w-full min-w-0 flex-col gap-1', className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-label" className={cn('px-2 py-1 text-xs font-medium text-sidebar-foreground/70', className)} {...props} />
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" className={cn('w-full text-sm', className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn('group/menu-item relative', className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[state=collapsed]:size-8 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: {
        default: 'h-8',
        lg: 'h-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : 'button'
  const { isMobile, state } = useSidebar()
  const button = <Comp data-slot="sidebar-menu-button" data-active={isActive} className={cn(sidebarMenuButtonVariants({ className }))} {...props} />

  const renderMain = () => {
    if (!tooltip) {
      return button
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }

  return renderMain()
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
}
