import React from "react";
import { Package } from "lucide-react";

interface ProductEmptyStateProps {
  hasFilters: boolean;
}

export const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({
  hasFilters,
}) => {
  return (
    <div className="text-center py-12">
      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">
        {hasFilters
          ? "Tidak ada konten yang cocok dengan filter"
          : "Belum ada konten"}
      </p>
    </div>
  );
};