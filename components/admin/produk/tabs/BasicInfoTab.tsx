import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { ProductType, Category } from "@/types";
import type { UpdateFieldFunction } from "@/types/productForm";

interface BasicInfoTabProps {
  formData: {
    categoryId: string;
    isPublished: boolean;
    title: string;
    shortDescription: string;
  };
  productType: ProductType;
  categories: Category[];
  onFieldUpdate: UpdateFieldFunction;
  onProductTypeChange: (type: ProductType) => void;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  productType,
  categories,
  onFieldUpdate,
  onProductTypeChange,
}) => {
  return (
    <TabsContent value="basic" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Kategori *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(v) => onFieldUpdate("categoryId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status Publikasi</Label>
              <div className="flex items-center gap-3 h-10">
                <Switch
                  checked={formData.isPublished}
                  onCheckedChange={(v) => onFieldUpdate("isPublished", v)}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.isPublished ? "Dipublikasikan" : "Draft"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block mb-2">Tipe *</Label>
            <RadioGroup
              value={productType}
              onValueChange={(value) =>
                onProductTypeChange(value as ProductType)
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="produk" id="produk" />
                <Label htmlFor="produk" className="cursor-pointer font-normal">
                  Produk
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="layanan" id="layanan" />
                <Label htmlFor="layanan" className="cursor-pointer font-normal">
                  Layanan
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              {productType === "produk"
                ? "Produk perbankan seperti Tabungan, Giro, Kredit"
                : "Layanan perbankan seperti Mobile Banking, Internet Banking"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>
              Judul {productType === "produk" ? "Produk" : "Layanan"} *
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => onFieldUpdate("title", e.target.value)}
              placeholder={
                productType === "produk"
                  ? "Contoh: Tabungan SimPel"
                  : "Contoh: BSB Mobile Banking"
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Deskripsi Singkat *</Label>
            <Textarea
              value={formData.shortDescription}
              onChange={(e) =>
                onFieldUpdate("shortDescription", e.target.value.slice(0, 200))
              }
              placeholder="Deskripsi singkat produk (maks. 200 karakter)"
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.shortDescription.length}/200
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
