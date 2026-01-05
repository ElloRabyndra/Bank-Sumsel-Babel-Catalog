import React from "react";
import Image from "next/image";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { truncate, formatDate } from "@/lib/utils";
import { Product } from "@/types";

interface ProductTableRowProps {
  product: Product;
  categoryName?: string;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  categoryName,
  onTogglePublish,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            width={56}
            height={40}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-foreground">
              {truncate(product.title, 35)}
            </p>
            <p className="text-xs text-muted-foreground md:hidden">
              {categoryName}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground">
        {categoryName}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-muted-foreground">
        {formatDate(product.updatedAt)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge variant={product.isPublished ? "default" : "secondary"}>
          {product.isPublished ? "Published" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTogglePublish(product.id, product.isPublished)}
            title={product.isPublished ? "Unpublish" : "Publish"}
          >
            {product.isPublished ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};