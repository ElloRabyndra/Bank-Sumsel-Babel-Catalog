"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, FolderTree, Eye, FileEdit, Plus } from "lucide-react";

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

import { useCatalog } from "@/contexts/CatalogContext";
import { cn, formatDate, truncate } from "@/lib/utils"; // Import cn dari utils

const AdminDashboard = () => {
  const { categories, products, getCategoryById } = useCatalog();
  const [mounted, setMounted] = React.useState(false);

  // Tunggu sampai component mounted di client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const publishedProducts = products.filter((p) => p.isPublished);
  const draftProducts = products.filter((p) => !p.isPublished);

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const stats = [
    {
      label: "Total Kategori",
      value: categories.length,
      icon: FolderTree,
      color: "text-primary",
    },
    {
      label: "Total Produk",
      value: products.length,
      icon: Package,
      color: "text-primary",
    },
    {
      label: "Dipublikasi",
      value: publishedProducts.length,
      icon: Eye,
      color: "text-green-600",
    },
    {
      label: "Draft",
      value: draftProducts.length,
      icon: FileEdit,
      color: "text-amber-600",
    },
  ];

  // Tampilkan loading state sampai client-side hydration selesai
  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Kelola katalog produk Bank Sumsel Babel
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 animate-pulse bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Kelola katalog produk Bank Sumsel Babel
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/admin/kategori">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Kategori
            </Button>
          </Link>

          <Link href="/admin/produk/tambah">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Produk
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={cn("p-3 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Produk Terbaru</CardTitle>
          <Link href="/admin/produk">
            <Button variant="ghost" size="sm">
              Lihat Semua
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          {recentProducts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Kategori
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Diperbarui
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentProducts.map((product) => {
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
                          variant={
                            product.isPublished ? "default" : "secondary"
                          }
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
              Belum ada produk
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
