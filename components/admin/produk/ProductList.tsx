// components/admin/produk/ProductList.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTableRow } from "./ProductTableRow";
import { ProductEmptyState } from "./ProductEmptyState";
import { ProductPagination } from "./ProductPagination";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasFilters: boolean;
  getCategoryName: (categoryId: string) => string | undefined;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  totalProducts,
  currentPage,
  totalPages,
  itemsPerPage,
  hasFilters,
  getCategoryName,
  onTogglePublish,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        {products.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Konten</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Kategori
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Diperbarui
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                    onTogglePublish={onTogglePublish}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </TableBody>
            </Table>

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalProducts}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <ProductEmptyState hasFilters={hasFilters} />
        )}
      </CardContent>
    </Card>
  );
};
