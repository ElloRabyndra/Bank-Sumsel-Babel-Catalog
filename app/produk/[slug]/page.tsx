// app/produk/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageBreadcrumb } from "@/components/kategori/PageBreadcrumb";
import { YouTubeEmbed } from "@/components/produk/YouTubeEmbed";
import { ImageLightbox } from "@/components/admin/produk/ImageLightbox";
import {
  getProductBySlug,
  getCategoryById,
  getProductsByCategory,
} from "@/lib/catalog";
import { truncate } from "@/lib/utils";
import { ProductTabs } from "../../../components/produk/ProductTabs";
import { ProductHero } from "../../../components/produk/ProductHero";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produk tidak ditemukan" };
  }

  return {
    title: `${product.title} - Bank Sumsel Babel`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  const relatedProducts = category
    ? getProductsByCategory(category.id)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const heroImage = product.featuredImageUrl || product.thumbnailUrl;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[
              { label: "Beranda", href: "/" },
              ...(category
                ? [{ label: category.name, href: `/kategori/${category.slug}` }]
                : []),
              { label: product.title },
            ]}
          />

          {/* Product Header */}
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Hero Image - Client Component */}
            <ProductHero
              heroImage={heroImage}
              productTitle={product.title}
              galleryImages={product.galleryImages}
            />

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.shortDescription}
              </p>
            </div>
          </div>

          {/* YouTube Video */}
          {product.youtubeVideoUrl && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Video Produk
              </h2>
              <YouTubeEmbed url={product.youtubeVideoUrl} />
            </div>
          )}

          {/* Content Tabs - Client Component */}
          <ProductTabs product={product} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Produk Lainnya
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/produk/${p.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={p.thumbnailUrl}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {truncate(p.shortDescription, 80)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
