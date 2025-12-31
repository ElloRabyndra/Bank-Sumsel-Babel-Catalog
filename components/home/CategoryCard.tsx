"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { Category } from "@/types";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
  productCount: number;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  productCount,
  index,
}) => {
  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="h-full overflow-hidden card-hover border-border/50 hover:border-primary/30">
        <div className="aspect-4/3 relative overflow-hidden">
          <Image
            src={category.thumbnailUrl}
            alt={category.name}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center text-primary-foreground">
                {getIcon(category.icon, "w-8 h-8")}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-background">
                  {category.name}
                </h3>
                <p className="text-sm text-background/70">
                  {productCount} produk
                </p>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-1 text-primary mt-3 text-sm font-medium group-hover:gap-2 transition-all">
            Lihat Produk
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
