// components/admin/kategori/CategoryHeader.tsx
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
  onAddClick: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  onAddClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Kelola Kategori
        </h1>
        <p className="text-muted-foreground">
          Tambah, edit, atau hapus kategori produk
        </p>
      </div>
      <Button onClick={onAddClick} className="gap-2">
        <Plus className="w-4 h-4" />
        Tambah Kategori
      </Button>
    </div>
  );
};