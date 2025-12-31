// components/admin/kategori/CategoryList.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryTableRow } from "./CategoryTableRow";
import { EmptyState } from "./EmptyState";
import { Category } from "@/types";

interface CategoryListProps {
  categories: Category[];
  getProductCount: (categoryId: string) => number;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  getProductCount,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        {categories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="hidden md:table-cell">
                  Deskripsi
                </TableHead>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  productCount={getProductCount(category.id)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
};