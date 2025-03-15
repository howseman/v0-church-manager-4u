import type React from "react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>{/* Add sidebar content here */}</SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav />
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <UserNav />
              </div>
            </div>
          </header>
          <main className="container py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

{/* <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
        <Toaster /> */}