"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProductFormHeader } from "@/components/admin/produk/ProductFormHeader";
import { BasicInfoTab } from "@/components/admin/produk/tabs/BasicInfoTab";
import { MediaTab } from "@/components/admin/produk/tabs/MediaTab";
import { ContentTab } from "@/components/admin/produk/tabs/ContentTab";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";
import { useProductForm } from "@/hooks/useProductForm";
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
  }, [productType, updateField]);

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
      <ProductFormHeader isEditing={isEditing} onCancel={handleCancel} />

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

        <BasicInfoTab
          formData={formData}
          productType={productType}
          categories={categories}
          onFieldUpdate={updateField}
          onProductTypeChange={setProductType}
        />

        <MediaTab formData={formData} onFieldUpdate={updateField} />

        <ContentTab
          formData={formData}
          productType={productType}
          onFieldUpdate={updateField}
        />
      </Tabs>
    </form>
  );
};

export default ProductForm;
