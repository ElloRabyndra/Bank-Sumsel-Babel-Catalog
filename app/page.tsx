"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Package, HandHelping, ChevronDown } from "lucide-react";
import ClientOnly from "@/components/shared/ClientOnly";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useCatalog } from "@/contexts/CatalogContext";
import { cn } from "@/lib/utils";

const Index: React.FC = () => {
  const { products } = useCatalog();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<
    "produk" | "layanan" | null
  >(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleSection = (section: "produk" | "layanan") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  // Filter published products by type
  const publishedProducts = products.filter((p) => p.isPublished);
  const produkList = publishedProducts.filter((p) => p.type === "produk");
  const layananList = publishedProducts.filter((p) => p.type === "layanan");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E' )] opacity-40"></div>

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
                Katalog Digital Produk & Layanan
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-slide-up">
                Akses informasi lengkap produk dan layanan perbankan Bank Sumsel
                Babel dalam satu platform yang mudah dan praktis
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-xl mx-auto animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari produk atau layanan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-32 h-14 text-base rounded-full bg-background border-0 shadow-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10"
                  >
                    Cari
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="hsl(var(--background ))"
              />
            </svg>
          </div>
        </section>

        {/* Produk & Layanan Sections */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-4 space-y-6">
            {/* Produk Section */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection("produk")}
                className="w-full flex items-center justify-between gap-4 p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Package className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Produk
                    </h2>
                    <ClientOnly>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {produkList.length} produk perbankan untuk kebutuhan
                        Anda
                      </p>
                    </ClientOnly>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-6 h-6 text-muted-foreground transition-transform duration-300",
                    expandedSection === "produk" && "rotate-180"
                  )}
                />
              </button>

              {/* Expanded Content */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  expandedSection === "produk"
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 border-t border-border/50">
                    <ClientOnly>
                      {produkList.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {produkList.map((product, index) => (
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
                          Belum ada produk
                        </p>
                      )}
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>

            {/* Layanan Section */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection("layanan")}
                className="w-full flex items-center justify-between gap-4 p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <HandHelping className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Layanan
                    </h2>
                    <ClientOnly>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {layananList.length} layanan perbankan untuk kemudahan
                        transaksi
                      </p>
                    </ClientOnly>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-6 h-6 text-muted-foreground transition-transform duration-300",
                    expandedSection === "layanan" && "rotate-180"
                  )}
                />
              </button>

              {/* Expanded Content */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  expandedSection === "layanan"
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 border-t border-border/50">
                    <ClientOnly>
                      {" "}
                      {layananList.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {layananList.map((product, index) => (
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
                          Belum ada layanan
                        </p>
                      )}
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
