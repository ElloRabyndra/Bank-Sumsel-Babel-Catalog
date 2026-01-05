"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { truncate } from "@/lib/utils";
import type { Product, Category } from "@/types";

interface SearchResultsProps {
  results: Product[];
  initialQuery: string;
  categoryFilter: string;
  categories: Category[];
  getCategoryById: (id: string) => Category | undefined;
  onClearSearch: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  initialQuery,
  categoryFilter,
  categories,
  getCategoryById,
  onClearSearch,
}) => {
  // Show results
  if (results.length > 0) {
    return (
      <>
        <p className="text-muted-foreground mb-6">
          {results.length} hasil untuk &quot;{initialQuery}&quot;
          {categoryFilter !== "all" &&
            ` dalam ${categories.find((c) => c.id === categoryFilter)?.name}`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product, index) => {
            const category = getCategoryById(product.categoryId);
            return (
              <Link
                key={product.id}
                href={`/produk/${product.slug}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className="h-full overflow-hidden card-hover border-border/50 hover:border-primary/30">
                  <div className="aspect-16/10 relative overflow-hidden">
                    <Image
                      src={product.thumbnailUrl}
                      alt={product.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-background/90 text-xs font-medium rounded-full">
                        {category.name}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {truncate(product.shortDescription, 100)}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  // No results with query
  if (initialQuery) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <SearchIcon className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Tidak ada hasil
        </h2>
        <p className="text-muted-foreground mb-6">
          Coba kata kunci lain atau hapus filter kategori
        </p>
        <Button variant="outline" onClick={onClearSearch}>
          Reset Pencarian
        </Button>
      </div>
    );
  }

  // Initial state - no query
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
        <SearchIcon className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Mulai Pencarian
      </h2>
      <p className="text-muted-foreground">
        Masukkan kata kunci untuk mencari produk dan layanan
      </p>
    </div>
  );
};
