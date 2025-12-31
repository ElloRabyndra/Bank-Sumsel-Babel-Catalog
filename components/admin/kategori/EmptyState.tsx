// components/admin/kategori/EmptyState.tsx
import React from "react";
import { Image as ImageIcon } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">Belum ada kategori</p>
    </div>
  );
};