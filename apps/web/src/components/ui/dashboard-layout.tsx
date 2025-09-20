"use client"

import type React from "react"

import { useEffect } from "react"
import { Sidebar } from "./sidebar"
import { useMobile } from "@/hooks/use-mobile"
// Removed mobile toggle row; keeping imports clean
import { useSidebar } from "@/components/ui/sidebar-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen: sidebarOpen, close: closeSidebar, setOpen } = useSidebar()
  const isMobile = useMobile()

  // Ensure sidebar default states per device
  useEffect(() => {
    // Mobile default closed, Desktop default open
    setOpen(!isMobile)
  }, [isMobile, setOpen])

  return (
    <div className="flex  bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isMobile={isMobile} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile toggle row removed; handled in Navbar */}

        {/* Page content */}
        <main className="flex-1">
          <div >{children}</div>
        </main>
      </div>
    </div>
  )
}
