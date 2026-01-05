"use client"; 

import { useLayoutEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageBreadcrumb } from "@/components/kategori/PageBreadcrumb";
import { ProductHeader } from "@/components/produk/ProductHeader";
import { ProductVideoSection } from "@/components/produk/ProductVideoSection";
import { ProductTabs } from "@/components/produk/ProductTabs";
import { RelatedProducts } from "@/components/produk/RelatedProducts";
import { useCatalog } from "@/contexts/CatalogContext"; 
import { Product } from "@/types";


export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const { getProductBySlug, getProductsByType, isLoading } = useCatalog();
  
  // State lokal untuk menyimpan data produk yang ditemukan
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useLayoutEffect(() => {
    if (!isLoading && slug) {
      const foundProduct = getProductBySlug(slug);
      setProduct(foundProduct); 
      
      // Update document title langsung di sini
      if (foundProduct) {
        document.title = `${foundProduct.title} - Bank Sumsel Babel`;
      } else {
        document.title = "Produk tidak ditemukan - Bank Sumsel Babel";
      }
    }
  }, [slug, getProductBySlug, isLoading]);

  if (isLoading || product === undefined) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-lg">Memuat produk...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByType(product.type)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const heroImage = product.featuredImageUrl || product.thumbnailUrl;
  const isLayanan = product.type === "layanan";

  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    { label: isLayanan ? "Layanan" : "Produk", href: "/" },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <PageBreadcrumb items={breadcrumbItems} />
          <ProductHeader product={product} heroImage={heroImage} />
          <ProductVideoSection videoUrl={product.youtubeVideoUrl} />
          <ProductTabs product={product} />
          <RelatedProducts products={relatedProducts} productType={product.type} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
