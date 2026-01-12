// components/admin/kategori/CategoryTableRow.tsx
import React from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CategoryIcon } from "./CategoryIcon";
import { Category } from "@/types";

interface CategoryTableRowProps {
  category: Category;
  productCount: number;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryTableRow: React.FC<CategoryTableRowProps> = ({
  category,
  productCount,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">
        <Image
          src={category.thumbnailUrl}
          alt={category.name}
          width={64}
          height={48}
          className="rounded-lg object-cover"
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <CategoryIcon iconName={category.icon} />
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">
        {category.description}
      </TableCell>
      <TableCell>{productCount}</TableCell>
      <TableCell className="text-center">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(category)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(category.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};