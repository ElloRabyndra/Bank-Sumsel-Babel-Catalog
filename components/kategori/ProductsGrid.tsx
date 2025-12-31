"use client";

import React from "react";
import { ProductCard } from "./ProductCard";
import { EmptyProducts } from "./EmptyProducts";
import { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};