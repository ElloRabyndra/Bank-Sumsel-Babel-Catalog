"use client";

import React from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types";

interface SearchFormProps {
  query: string;
  categoryFilter: string;
  categories: Category[];
  onQueryChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  query,
  categoryFilter,
  categories,
  onQueryChange,
  onCategoryChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari produk atau layanan..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-12 pr-10 h-12"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex gap-4">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
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
  );
};
