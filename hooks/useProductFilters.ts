import { useState, useMemo } from "react";
import { Product } from "@/types";

interface UseProductFiltersProps {
  products: Product[];
  itemsPerPage?: number;
}

export const useProductFilters = ({
  products,
  itemsPerPage = 10,
}: UseProductFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.categoryId === categoryFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && product.isPublished) ||
        (statusFilter === "draft" && !product.isPublished);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return {
    searchQuery,
    categoryFilter,
    statusFilter,
    currentPage,
    filteredProducts,
    paginatedProducts,
    totalPages,
    setSearchQuery: handleSearchChange,
    setCategoryFilter: handleCategoryChange,
    setStatusFilter: handleStatusChange,
    setCurrentPage,
    itemsPerPage,
  };
};