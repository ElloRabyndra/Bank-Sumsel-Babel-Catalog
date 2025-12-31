"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Cari produk atau layanan...",
  className = "",
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-32 h-14 text-base rounded-full bg-background border-0 shadow-lg"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10"
        >
          Cari
        </Button>
      </div>
    </form>
  );
};