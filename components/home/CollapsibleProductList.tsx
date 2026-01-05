"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LucideIcon } from "lucide-react";
import ClientOnly from "@/components/shared/ClientOnly";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CollapsibleProductListProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: Product[];
  itemType: "produk" | "layanan";
}

export const CollapsibleProductList: React.FC<CollapsibleProductListProps> = ({
  title,
  description,
  icon: Icon,
  items,
  itemType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-4 p-6 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-7 h-7" />
          </div>
          <div className="text-left">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {title}
            </h2>
            <ClientOnly>
              <p className="text-muted-foreground text-sm md:text-base">
                {description}
              </p>
            </ClientOnly>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-6 h-6 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Expanded Content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-border/50">
            <ClientOnly>
              {items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {items.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/produk/${product.slug}`}
                      className="group animate-slide-up"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-md transition-all duration-200">
                        <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-muted">
                          <Image
                            src={product.thumbnailUrl}
                            alt={product.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Belum ada {itemType}
                </p>
              )}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
};
