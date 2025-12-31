"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { truncate } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Card className="h-full overflow-hidden card-hover border-border/50 hover:border-primary/30">
        <div className="aspect-16/10 relative overflow-hidden">
          <img
            src={product.thumbnailUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
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
};