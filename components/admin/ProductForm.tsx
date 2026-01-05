"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageUpload } from "@/components/admin/kategori/ImageUpload";
import { RichTextEditor } from "@/components/admin/produk/RichTextEditor";
import { YouTubeEmbed } from "@/components/produk/YouTubeEmbed";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";
import { useProductForm } from "@/hooks/useProductForm";
import { extractYouTubeID } from "@/lib/utils";
import type { ProductType } from "@/types";

interface ProductFormProps {
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { categories, products, addProduct, updateProduct, getProductById } =
    useCatalog();

  const isEditing = !!productId;
  const existingProduct = isEditing ? getProductById(productId) : undefined;

  if (isEditing && !existingProduct) notFound();

  // Prepare initial data
  const initialData = existingProduct || {
    categoryId: "",
    type: "produk" as ProductType,
    title: "",
    thumbnailUrl: "",
    shortDescription: "",
    kenaliProduk: "",
    namaPenerbit:
      "PT Bank Pembangunan Daerah Sumatera Selatan dan Bangka Belitung",
    fiturUtama: "",
    manfaat: "",
    risiko: "",
    persyaratan: "",
    biaya: "",
    informasiTambahan: "",
    featuredImageUrl: "",
    youtubeVideoUrl: "",
    galleryImages: [],
    isPublished: false,
    orderIndex: products.length + 1,
  };

  // State for product type
  const [productType, setProductType] = useState<ProductType>(
    initialData.type || "produk"
  );

  // Use custom hook for form management
  const { formData, hasChanges, updateField, handleSubmit } = useProductForm({
    initialData,
    onSubmit: (data) => {
      // Include type in submission
      const productData = {
        ...data,
        type: productType,
      };

      if (isEditing && productId) {
        updateProduct(productId, productData);
        toast({ title: "Berhasil", description: "Produk berhasil diperbarui" });
      } else {
        addProduct(productData);
        toast({
          title: "Berhasil",
          description: "Produk berhasil ditambahkan",
        });
      }
      router.push("/admin/konten");
    },
  });

  // Sync productType with formData
  useEffect(() => {
    updateField("type", productType);
  }, [productType]);

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm("Ada perubahan yang belum disimpan. Yakin ingin keluar?")
      ) {
        router.push("/admin/konten");
      }
    } else {
      router.push("/admin/konten");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCancel}
          >
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
          <Button type="button" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Batal
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Simpan
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Alert>
          <AlertDescription>
            Ada perubahan yang belum disimpan. Pastikan untuk menyimpan sebelum
            meninggalkan halaman.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="basic" className="flex-1 min-w-35">
            Informasi Dasar
          </TabsTrigger>
          <TabsTrigger value="media" className="flex-1 min-w-25">
            Media
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-1 min-w-35">
            Konten
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
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
                    onValueChange={(v) => updateField("categoryId", v)}
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
                      onCheckedChange={(v) => updateField("isPublished", v)}
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
                    setProductType(value as ProductType)
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="produk" id="produk" />
                    <Label
                      htmlFor="produk"
                      className="cursor-pointer font-normal"
                    >
                      Produk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="layanan" id="layanan" />
                    <Label
                      htmlFor="layanan"
                      className="cursor-pointer font-normal"
                    >
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
                  onChange={(e) => updateField("title", e.target.value)}
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
                    updateField(
                      "shortDescription",
                      e.target.value.slice(0, 200)
                    )
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

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gambar & Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUpload
                value={formData.thumbnailUrl}
                onChange={(url) => updateField("thumbnailUrl", url)}
                label="Thumbnail"
                required
              />

              <div className="space-y-2">
                <Label>URL Video YouTube (Opsional)</Label>
                <Input
                  value={formData.youtubeVideoUrl}
                  onChange={(e) =>
                    updateField("youtubeVideoUrl", e.target.value)
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {formData.youtubeVideoUrl &&
                  extractYouTubeID(formData.youtubeVideoUrl) && (
                    <div className="mt-4">
                      <YouTubeEmbed url={formData.youtubeVideoUrl} />
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab - CONDITIONAL RENDERING */}
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
                onChange={(v) => updateField("kenaliProduk", v)}
                label={
                  productType === "layanan"
                    ? "Deskripsi Layanan"
                    : "Kenali Produk"
                }
                required
              />

              {/* Nama Penerbit - Only for Produk */}
              {productType === "produk" && (
                <div className="space-y-2">
                  <Label>Nama Penerbit *</Label>
                  <Input
                    value={formData.namaPenerbit}
                    onChange={(e) =>
                      updateField("namaPenerbit", e.target.value)
                    }
                  />
                </div>
              )}

              {/* Fitur Utama - Always show */}
              <RichTextEditor
                value={formData.fiturUtama}
                onChange={(v) => updateField("fiturUtama", v)}
                label="Fitur Utama"
                required={productType === "produk"}
              />

              {/* Manfaat - Only for Produk */}
              {productType === "produk" && (
                <RichTextEditor
                  value={formData.manfaat}
                  onChange={(v) => updateField("manfaat", v)}
                  label="Manfaat"
                  required
                />
              )}

              {/* Persyaratan / Langkah-langkah - Always show */}
              <RichTextEditor
                value={formData.persyaratan}
                onChange={(v) => updateField("persyaratan", v)}
                label={
                  productType === "layanan" ? "Langkah-langkah" : "Persyaratan"
                }
                required
              />

              {/* Biaya - Only for Produk */}
              {productType === "produk" && (
                <RichTextEditor
                  value={formData.biaya}
                  onChange={(v) => updateField("biaya", v)}
                  label="Biaya"
                  required
                />
              )}

              {/* Info Tambahan - Only for Produk */}
              {productType === "produk" && (
                <RichTextEditor
                  value={formData.informasiTambahan}
                  onChange={(v) => updateField("informasiTambahan", v)}
                  label="Informasi Tambahan (Opsional)"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default ProductForm;
