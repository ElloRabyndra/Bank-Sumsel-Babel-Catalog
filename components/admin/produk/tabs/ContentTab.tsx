import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/admin/produk/RichTextEditor";
import type { ProductType } from "@/types";
import type { UpdateFieldFunction } from "@/types/productForm";

interface ContentTabProps {
  formData: {
    kenaliProduk: string;
    namaPenerbit: string;
    fiturUtama: string;
    manfaat: string;
    persyaratan: string;
    biaya: string;
    informasiTambahan: string;
  };
  productType: ProductType;
  onFieldUpdate: UpdateFieldFunction;
}

export const ContentTab: React.FC<ContentTabProps> = ({
  formData,
  productType,
  onFieldUpdate,
}) => {
  return (
    <TabsContent value="content" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Konten {productType === "produk" ? "Produk" : "Layanan"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Kenali Produk / Deskripsi Layanan - Always show */}
          <RichTextEditor
            value={formData.kenaliProduk}
            onChange={(v) => onFieldUpdate("kenaliProduk", v)}
            label={
              productType === "layanan" ? "Deskripsi Layanan" : "Kenali Produk"
            }
            required
          />

          {/* Nama Penerbit - Only for Produk */}
          {productType === "produk" && (
            <div className="space-y-2">
              <Label>Nama Penerbit *</Label>
              <Input
                value={formData.namaPenerbit}
                onChange={(e) => onFieldUpdate("namaPenerbit", e.target.value)}
              />
            </div>
          )}

          {/* Fitur Utama - Always show */}
          <RichTextEditor
            value={formData.fiturUtama}
            onChange={(v) => onFieldUpdate("fiturUtama", v)}
            label="Fitur Utama"
            required={productType === "produk"}
          />

          {/* Manfaat - Only for Produk */}
          {productType === "produk" && (
            <RichTextEditor
              value={formData.manfaat}
              onChange={(v) => onFieldUpdate("manfaat", v)}
              label="Manfaat"
              required
            />
          )}

          {/* Persyaratan / Langkah-langkah - Always show */}
          <RichTextEditor
            value={formData.persyaratan}
            onChange={(v) => onFieldUpdate("persyaratan", v)}
            label={
              productType === "layanan" ? "Langkah-langkah" : "Persyaratan"
            }
            required
          />

          {/* Biaya - Only for Produk */}
          {productType === "produk" && (
            <RichTextEditor
              value={formData.biaya}
              onChange={(v) => onFieldUpdate("biaya", v)}
              label="Biaya"
              required
            />
          )}

          {/* Info Tambahan - Only for Produk */}
          {productType === "produk" && (
            <RichTextEditor
              value={formData.informasiTambahan}
              onChange={(v) => onFieldUpdate("informasiTambahan", v)}
              label="Informasi Tambahan (Opsional)"
            />
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
