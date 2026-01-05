// components/admin/dashboard/RecentProductsTable.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, Category } from "@/types";
import { formatDate, truncate } from "@/lib/utils";

interface RecentProductsTableProps {
  products: Product[];
  getCategoryById: (id: string) => Category | undefined;
}

export function RecentProductsTable({
  products,
  getCategoryById,
}: RecentProductsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Konten Terbaru</CardTitle>
        <Link href="/admin/konten">
          <Button variant="ghost" size="sm">
            Lihat Semua
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Konten</TableHead>
                <TableHead className="hidden sm:table-cell">Kategori</TableHead>
                <TableHead className="hidden md:table-cell">
                  Diperbarui
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => {
                const category = getCategoryById(product.categoryId);

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.thumbnailUrl}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {truncate(product.title, 30)}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {category?.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {category?.name}
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {formatDate(product.updatedAt)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={product.isPublished ? "default" : "secondary"}
                      >
                        {product.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Belum ada Konten
          </div>
        )}
      </CardContent>
    </Card>
  );
}
