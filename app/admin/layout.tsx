"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, FolderTree, Package, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/kategori", label: "Kategori", icon: FolderTree },
  { href: "/admin/konten", label: "Konten", icon: Package },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname?.startsWith(href)
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      
      toast({
        title: "Berhasil",
        description: "Anda telah keluar dari sistem",
      })
      
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 h-10">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Navigation */}
        <nav className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                isActive(item.href, item.exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Content */}
        <main>{children}</main>
      </div>
    </div>
  )
}