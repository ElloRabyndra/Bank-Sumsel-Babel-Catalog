"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useCatalog } from "@/contexts/CatalogContext";
import { LucideIconName } from "@/types";

const Index: React.FC = () => {
  const { categories, getProductCount } = useCatalog();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[
      iconName as keyof typeof Icons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>

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
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Categories Section */}
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
                <Link
                  key={category.id}
                  href={`/kategori/${category.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full overflow-hidden card-hover border-border/50 hover:border-primary/30">
                    <div className="aspect-4/3 relative overflow-hidden">
                      <img
                        src={category.thumbnailUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center text-primary-foreground">
                            {getIcon(category.icon)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-background">
                              {category.name}
                            </h3>
                            <p className="text-sm text-background/70">
                              {getProductCount(category.id)} produk
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
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
