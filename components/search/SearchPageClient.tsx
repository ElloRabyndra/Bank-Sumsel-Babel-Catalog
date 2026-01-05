"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { PageBreadcrumb } from "../kategori/PageBreadcrumb";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { useCatalog } from "@/contexts/CatalogContext";

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

            <SearchForm
              query={query}
              categoryFilter={categoryFilter}
              categories={categories}
              onQueryChange={setQuery}
              onCategoryChange={setCategoryFilter}
              onSubmit={handleSearch}
            />
          </div>

          <SearchResults
            results={results}
            initialQuery={initialQuery}
            categoryFilter={categoryFilter}
            categories={categories}
            getCategoryById={getCategoryById}
            onClearSearch={clearSearch}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPageClient;
