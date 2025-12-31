// app/admin/produk/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductHeader } from "@/components/admin/produk/ProductHeader";
import { ProductFilters } from "@/components/admin/produk/ProductFilters";
import { ProductList } from "@/components/admin/produk/ProductList";
import { DeleteProductDialog } from "@/components/admin/produk/DeleteProductDialog";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useCatalog } from "@/contexts/CatalogContext";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const {
    products,
    categories,
    deleteProduct,
    togglePublish,
    getCategoryById,
  } = useCatalog();
  const { toast } = useToast();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    searchQuery,
    categoryFilter,
    statusFilter,
    currentPage,
    filteredProducts,
    paginatedProducts,
    totalPages,
    setSearchQuery,
    setCategoryFilter,
    setStatusFilter,
    setCurrentPage,
    itemsPerPage,
  } = useProductFilters({ products });

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    togglePublish(id);
    toast({
      title: "Berhasil",
      description: currentStatus
        ? "Produk disimpan sebagai draft"
        : "Produk berhasil dipublikasi",
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/produk/edit/${id}`);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      toast({ title: "Berhasil", description: "Produk berhasil dihapus" });
      setDeleteId(null);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return getCategoryById(categoryId)?.name;
  };

  const hasFilters =
    searchQuery !== "" ||
    categoryFilter !== "all" ||
    statusFilter !== "all";

  return (
    <>
      <div className="space-y-6">
        <ProductHeader />

        <ProductFilters
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          categories={categories}
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />

        <ProductList
          products={paginatedProducts}
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          hasFilters={hasFilters}
          getCategoryName={getCategoryName}
          onTogglePublish={handleTogglePublish}
          onEdit={handleEdit}
          onDelete={setDeleteId}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteProductDialog
        isOpen={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminProducts;