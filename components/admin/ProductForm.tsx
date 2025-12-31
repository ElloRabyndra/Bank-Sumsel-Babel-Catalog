"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ImageUpload } from "@/components/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";
import { extractYouTubeID } from "@/lib/utils";
import { Product } from "@/types";

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

  const [formData, setFormData] = useState<
    Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">
  >({
    categoryId: "",
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
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        categoryId: existingProduct.categoryId,
        title: existingProduct.title,
        thumbnailUrl: existingProduct.thumbnailUrl,
        shortDescription: existingProduct.shortDescription,
        kenaliProduk: existingProduct.kenaliProduk,
        namaPenerbit: existingProduct.namaPenerbit,
        fiturUtama: existingProduct.fiturUtama,
        manfaat: existingProduct.manfaat,
        risiko: existingProduct.risiko,
        persyaratan: existingProduct.persyaratan,
        biaya: existingProduct.biaya,
        informasiTambahan: existingProduct.informasiTambahan,
        featuredImageUrl: existingProduct.featuredImageUrl,
        youtubeVideoUrl: existingProduct.youtubeVideoUrl,
        galleryImages: existingProduct.galleryImages,
        isPublished: existingProduct.isPublished,
        orderIndex: existingProduct.orderIndex,
      });
    }
  }, [existingProduct]);

  const updateField = useCallback(
    <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setHasChanges(true);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast({
        title: "Error",
        description: "Kategori wajib dipilih",
        variant: "destructive",
      });
      return;
    }
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul produk wajib diisi",
        variant: "destructive",
      });
      return;
    }
    if (!formData.thumbnailUrl) {
      toast({
        title: "Error",
        description: "Thumbnail wajib diupload",
        variant: "destructive",
      });
      return;
    }
    if (!formData.kenaliProduk || formData.kenaliProduk === "<p></p>") {
      toast({
        title: "Error",
        description: "Kenali Produk wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && productId) {
      updateProduct(productId, formData);
      toast({ title: "Berhasil", description: "Produk berhasil diperbarui" });
    } else {
      addProduct(formData);
      toast({ title: "Berhasil", description: "Produk berhasil ditambahkan" });
    }

    setHasChanges(false);
    router.push("/admin/produk");
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm("Ada perubahan yang belum disimpan. Yakin ingin keluar?")
      ) {
        router.push("/admin/produk");
      }
    } else {
      router.push("/admin/produk");
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
              {isEditing ? "Edit Produk" : "Tambah Produk"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? "Perbarui informasi produk"
                : "Buat produk baru untuk katalog"}
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
          <TabsTrigger value="basic" className="flex-1 min-w-[140px]">
            Informasi Dasar
          </TabsTrigger>
          <TabsTrigger value="media" className="flex-1 min-w-[100px]">
            Media
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-1 min-w-[140px]">
            Konten Produk
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
                <Label>Judul Produk *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Contoh: Tabungan SimPel"
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

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Konten Produk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RichTextEditor
                value={formData.kenaliProduk}
                onChange={(v) => updateField("kenaliProduk", v)}
                label="Kenali Produk"
                required
              />
              <div className="space-y-2">
                <Label>Nama Penerbit *</Label>
                <Input
                  value={formData.namaPenerbit}
                  onChange={(e) => updateField("namaPenerbit", e.target.value)}
                />
              </div>
              <RichTextEditor
                value={formData.fiturUtama}
                onChange={(v) => updateField("fiturUtama", v)}
                label="Fitur Utama"
                required
              />
              <RichTextEditor
                value={formData.manfaat}
                onChange={(v) => updateField("manfaat", v)}
                label="Manfaat"
                required
              />
              <RichTextEditor
                value={formData.risiko}
                onChange={(v) => updateField("risiko", v)}
                label="Risiko"
                required
              />
              <RichTextEditor
                value={formData.persyaratan}
                onChange={(v) => updateField("persyaratan", v)}
                label="Persyaratan"
                required
              />
              <RichTextEditor
                value={formData.biaya}
                onChange={(v) => updateField("biaya", v)}
                label="Biaya"
                required
              />
              <RichTextEditor
                value={formData.informasiTambahan}
                onChange={(v) => updateField("informasiTambahan", v)}
                label="Informasi Tambahan (Opsional)"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default ProductForm;
