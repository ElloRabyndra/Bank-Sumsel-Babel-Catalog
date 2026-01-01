"use client";

import React, { useState } from "react";
import { CategoryHeader } from "@/components/admin/kategori/CategoryHeader";
import { CategoryList } from "@/components/admin/kategori/CategoryList";
import { CategoryFormDialog } from "@/components/admin/kategori/CategoryFormDialog";
import { DeleteCategoryDialog } from "@/components/admin/kategori/DeleteCategoryDialog";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";
import { useDialogState } from "@/hooks/useDialogState";
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

  // Use custom hooks for dialog management
  const formDialog = useDialogState<Category>();
  const deleteDialog = useDialogState<string>();

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
  };

  const openCreate = () => {
    resetForm();
    formDialog.open();
  };

  const openEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon as LucideIconName,
      thumbnailUrl: category.thumbnailUrl,
    });
    formDialog.open(category);
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

    if (formDialog.data) {
      // Edit mode
      updateCategory(formDialog.data.id, formData);
      toast({ title: "Berhasil", description: "Kategori berhasil diperbarui" });
    } else {
      // Create mode
      addCategory({ ...formData, orderIndex: categories.length + 1 });
      toast({
        title: "Berhasil",
        description: "Kategori berhasil ditambahkan",
      });
    }

    formDialog.close();
    resetForm();
  };

  const handleDelete = () => {
    if (deleteDialog.data) {
      deleteCategory(deleteDialog.data);
      toast({ title: "Berhasil", description: "Kategori berhasil dihapus" });
      deleteDialog.close();
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
          onDelete={(id) => deleteDialog.open(id)}
        />
      </div>

      <CategoryFormDialog
        isOpen={formDialog.isOpen}
        isEditing={!!formDialog.data}
        formData={formData}
        onOpenChange={(open) => {
          if (!open) {
            formDialog.close();
            resetForm();
          }
        }}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />

      <DeleteCategoryDialog
        isOpen={deleteDialog.isOpen}
        onOpenChange={(open) => !open && deleteDialog.close()}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminCategories;
