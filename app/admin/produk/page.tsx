// app/admin/produk/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Kelola Produk
            </h1>
            <p className="text-muted-foreground">
              Tambah, edit, atau hapus produk
            </p>
          </div>
          <Link href="/admin/produk/tambah">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Produk
            </Button>
          </Link>
        </div>

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