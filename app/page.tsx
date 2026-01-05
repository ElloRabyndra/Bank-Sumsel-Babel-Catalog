"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, HandHelping } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CollapsibleProductList } from "@/components/home/CollapsibleProductList";
import { useCatalog } from "@/contexts/CatalogContext";

const Index: React.FC = () => {
  const router = useRouter();
  const { products } = useCatalog();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Filter published products by type
  const publishedProducts = products.filter((p) => p.isPublished);
  const produkList = publishedProducts.filter((p) => p.type === "produk");
  const layananList = publishedProducts.filter((p) => p.type === "layanan");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />

        {/* Produk & Layanan Sections */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-4 space-y-6">
            <CollapsibleProductList
              title="Produk"
              description={`${produkList.length} produk perbankan untuk kebutuhan Anda`}
              icon={Package}
              items={produkList}
              itemType="produk"
            />

            <CollapsibleProductList
              title="Layanan"
              description={`${layananList.length} layanan perbankan untuk kemudahan transaksi`}
              icon={HandHelping}
              items={layananList}
              itemType="layanan"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
