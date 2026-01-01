"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Filter, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { PageBreadcrumb } from "../kategori/PageBreadcrumb";
import { useCatalog } from "@/contexts/CatalogContext";
import { truncate } from "@/lib/utils";
import Image from "next/image";

type Props = {
  initialQuery: string;
};

const SearchPageClient: React.FC<Props> = ({ initialQuery }) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { searchProducts, categories, getCategoryById } = useCatalog();

  const results = useMemo(() => {
    let filtered = searchProducts(initialQuery);
    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.categoryId === categoryFilter);
    }
    return filtered;
  }, [initialQuery, categoryFilter, searchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    router.push("/search");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <PageBreadcrumb items={[{ label: "Pencarian" }]} />

          <div className="mt-8 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Cari Produk
            </h1>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari produk atau layanan..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-10 h-12"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-45 h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" size="lg" className="h-12">
                  Cari
                </Button>
              </div>
            </form>

            {/* Results */}
            {initialQuery && (
              <p className="text-muted-foreground mb-6">
                {results.length} hasil untuk "{initialQuery}"
                {categoryFilter !== "all" &&
                  ` dalam ${
                    categories.find((c) => c.id === categoryFilter)?.name
                  }`}
              </p>
            )}
          </div>

          {results.length > 0 ? (
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
          ) : initialQuery ? (
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
              <Button variant="outline" onClick={clearSearch}>
                Reset Pencarian
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPageClient;
