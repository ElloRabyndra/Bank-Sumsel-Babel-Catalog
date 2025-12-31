// app/admin/kategori/page.tsx
"use client";

import React, { useState } from "react";
import { CategoryHeader } from "@/components/admin/kategori/CategoryHeader";
import { CategoryList } from "@/components/admin/kategori/CategoryList";
import { CategoryFormDialog } from "@/components/admin/kategori/CategoryFormDialog";
import { DeleteCategoryDialog } from "@/components/admin/kategori/DeleteCategoryDialog";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";
import { Category, LucideIconName } from "@/types";

const AdminCategories = () => {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductCount,
  } = useCatalog();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Wallet" as LucideIconName,
    thumbnailUrl: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "Wallet",
      thumbnailUrl: "",
    });
    setEditingCategory(null);
  };

  const openCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon as LucideIconName,
      thumbnailUrl: category.thumbnailUrl,
    });
    setIsDialogOpen(true);
  };

  const handleFormChange = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Nama kategori wajib diisi",
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

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      toast({ title: "Berhasil", description: "Kategori berhasil diperbarui" });
    } else {
      addCategory({ ...formData, orderIndex: categories.length + 1 });
      toast({
        title: "Berhasil",
        description: "Kategori berhasil ditambahkan",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      toast({ title: "Berhasil", description: "Kategori berhasil dihapus" });
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <CategoryHeader onAddClick={openCreate} />

        <CategoryList
          categories={categories}
          getProductCount={getProductCount}
          onEdit={openEdit}
          onDelete={setDeleteId}
        />
      </div>

      <CategoryFormDialog
        isOpen={isDialogOpen}
        isEditing={!!editingCategory}
        formData={formData}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />

      <DeleteCategoryDialog
        isOpen={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminCategories;
