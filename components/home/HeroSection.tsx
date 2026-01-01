"use client";

import React from "react";
import { SearchBar } from "@/components/shared/SearchBar";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  return (
    <section className="relative overflow-visible bg-linear-to-br from-primary via-primary to-primary/80 py-20 lg:py-28 mb-16 sm:mb-20 md:mb-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Katalog Digital Produk & Layanan
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-slide-up">
            Akses informasi lengkap produk dan layanan perbankan Bank Sumsel
            Babel dalam satu platform yang mudah dan praktis
          </p>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={onSearch}
            className="max-w-xl mx-auto animate-slide-up"
          />
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute -bottom-1 left-0 right-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20 md:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"
            fill="#fafafa"
          />
        </svg>
      </div>
    </section>
  );
};
