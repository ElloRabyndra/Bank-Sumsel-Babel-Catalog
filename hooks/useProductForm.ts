import { useState, useCallback } from "react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

type ProductFormData = Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">;

interface UseProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
}

export function useProductForm({ initialData, onSubmit }: UseProductFormProps) {
  const { toast } = useToast();

  const defaultData: ProductFormData = {
    categoryId: "",
    type: "produk",
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
    orderIndex: 0,
  };

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || defaultData
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update single field
  const updateField = useCallback(
    <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setHasChanges(true);
    },
    []
  );

  // Update multiple fields at once
  const updateFields = useCallback((updates: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialData || defaultData);
    setHasChanges(false);
  }, [initialData]);

  // Validation
  const validate = useCallback((): boolean => {
    if (!formData.categoryId) {
      toast({
        title: "Error",
        description: "Kategori wajib dipilih",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul produk wajib diisi",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.thumbnailUrl) {
      toast({
        title: "Error",
        description: "Thumbnail wajib diupload",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.kenaliProduk || formData.kenaliProduk === "<p></p>") {
      toast({
        title: "Error",
        description: "Kenali Produk wajib diisi",
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [formData, toast]);

  // Handle submit
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setHasChanges(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menyimpan produk",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate, onSubmit, toast]
  );

  return {
    formData,
    hasChanges,
    isSubmitting,
    updateField,
    updateFields,
    resetForm,
    handleSubmit,
    validate,
  };
}
