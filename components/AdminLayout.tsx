import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Home,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/kategori", label: "Kategori", icon: FolderTree },
  { href: "/admin/produk", label: "Produk", icon: Package },
];

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 h-10">
                {/* <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    BSB
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-foreground">
                    Admin Panel
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    Bank Sumsel Babel
                  </span>
                </div> */}
                <img src="/public/logo.png" alt="" className="w-full h-full" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Navigation */}
        <nav className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
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
        <main>{children || <Outlet />}</main>
      </div>
    </div>
  );
};
