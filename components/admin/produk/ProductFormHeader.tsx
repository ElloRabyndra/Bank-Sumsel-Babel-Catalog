import React from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFormHeaderProps {
  isEditing: boolean;
  onCancel: () => void;
}

export const ProductFormHeader: React.FC<ProductFormHeaderProps> = ({
  isEditing,
  onCancel,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? "Edit Konten" : "Tambah Konten"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Perbarui informasi Konten"
              : "Buat Konten baru untuk katalog"}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Batal
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Simpan
        </Button>
      </div>
    </div>
  );
};
