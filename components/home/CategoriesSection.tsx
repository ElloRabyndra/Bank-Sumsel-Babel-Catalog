"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import { Category } from "@/types";

interface CategoriesSectionProps {
  categories: Category[];
  getProductCount: (categoryId: string) => number;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  getProductCount,
}) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Produk & Layanan Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai produk dan layanan perbankan yang sesuai dengan
            kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={getProductCount(category.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
