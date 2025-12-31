// components/admin/produk/ProductHeader.tsx
import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Kelola Produk
        </h1>
        <p className="text-muted-foreground">
          Tambah, edit, atau hapus produk
        </p>
      </div>
      <Link href="/admin/produk/tambah">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </Link>
    </div>
  );
};