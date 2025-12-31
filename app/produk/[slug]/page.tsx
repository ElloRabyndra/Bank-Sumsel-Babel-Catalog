// app/produk/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageBreadcrumb } from "@/components/kategori/PageBreadcrumb";
import { ProductHeader } from "@/components/produk/ProductHeader";
import { ProductVideoSection } from "@/components/produk/ProductVideoSection";
import { ProductTabs } from "@/components/produk/ProductTabs";
import { RelatedProducts } from "@/components/produk/RelatedProducts";
import {
  getProductBySlug,
  getCategoryById,
  getProductsByCategory,
} from "@/lib/catalog";

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

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    ...(category
      ? [{ label: category.name, href: `/kategori/${category.slug}` }]
      : []),
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

          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}