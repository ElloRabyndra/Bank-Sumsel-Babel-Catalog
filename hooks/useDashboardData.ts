// hooks/useDashboardData.ts
import { useMemo } from "react";
import { useCatalog } from "@/contexts/CatalogContext";
import { Package, FolderTree, Eye, FileEdit } from "lucide-react";

export function useDashboardData() {
  const { categories, products, getCategoryById } = useCatalog();

  const publishedProducts = useMemo(
    () => products.filter((p) => p.isPublished),
    [products]
  );

  const draftProducts = useMemo(
    () => products.filter((p) => !p.isPublished),
    [products]
  );

  const recentProducts = useMemo(
    () =>
      [...products]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 5),
    [products]
  );

  const stats = useMemo(
    () => [
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
    ],
    [
      categories.length,
      products.length,
      publishedProducts.length,
      draftProducts.length,
    ]
  );

  return {
    stats,
    recentProducts,
    getCategoryById,
  };
}
