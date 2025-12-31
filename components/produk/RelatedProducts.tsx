// components/produk/RelatedProducts.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { truncate } from "@/lib/utils";
import Image from "next/image";
interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Produk Lainnya
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/produk/${product.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={product.thumbnailUrl}
                  alt={product.title}
                  width={500}
                  height={312}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {truncate(product.shortDescription, 80)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}