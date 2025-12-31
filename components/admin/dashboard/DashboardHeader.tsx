// components/admin/dashboard/DashboardHeader.tsx
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Kelola katalog produk Bank Sumsel Babel
        </p>
      </div>

      <div className="flex gap-2">
        <Link href="/admin/kategori">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Kategori
          </Button>
        </Link>

        <Link href="/admin/produk/tambah">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Produk
          </Button>
        </Link>
      </div>
    </div>
  );
}