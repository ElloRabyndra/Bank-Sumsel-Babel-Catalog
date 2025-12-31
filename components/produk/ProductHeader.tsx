import { Product } from "@/types";
import { ProductHero } from "./ProductHero";

interface ProductHeaderProps {
  product: Product;
  heroImage: string;
}

export function ProductHeader({ product, heroImage }: ProductHeaderProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      {/* Hero Image Section */}
      <ProductHero
        heroImage={heroImage}
        productTitle={product.title}
        galleryImages={product.galleryImages}
      />

      {/* Product Info Section */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {product.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {product.shortDescription}
        </p>
      </div>
    </div>
  );
}